
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto');

const { getFirestore } = require('firebase-admin/firestore');

const {
  getApps,
  initializeApp,
  cert
} = require('firebase-admin/app');

const { getAuth } = require('firebase-admin/auth');

// =====================================================
// ⚡ CONFIGURATION ENVIRONNEMENT
// =====================================================

dotenv.config({ override: true });

// =====================================================
// 🔐 INITIALISATION UNIQUE FIREBASE ADMIN
// =====================================================

const firebaseKeyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  '/etc/secrets/missodora-c1ced-firebase-adminsdk-fbsvc-6713db9fbe.json';

let db = null;
let adminAuth = null;

try {
  if (!fs.existsSync(firebaseKeyPath)) {
    console.error('❌ Fichier Firebase Admin introuvable');
  } else {
    const serviceAccount = JSON.parse(
      fs.readFileSync(firebaseKeyPath, 'utf8')
    );

    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount)
      });
    }

    db = getFirestore();
    adminAuth = getAuth();

    console.log('✅ Firebase Admin connecté avec succès');
    console.log('✅ Firestore disponible');
    console.log('✅ Firebase Authentication Admin prêt');
  }
} catch (error) {
  console.error(
    '❌ Erreur initialisation Firebase Admin:',
    error.message
  );
}

const brevoConfigured = !!process.env.BREVO_API_KEY;

console.log(
  brevoConfigured
    ? '✅ Service e-mail Brevo configuré'
    : '❌ Clé API Brevo indisponible'
);

const PORT = process.env.PORT || 10000;

// =====================================================
// ⚠️ GESTION DES ERREURS
// =====================================================

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', promise, reason);
});

// =====================================================
// 💳 STRIPE
// =====================================================

console.log(
  'STRIPE_SECRET_KEY:',
  process.env.STRIPE_SECRET_KEY ? '✓ Présente' : '✗ Manquante'
);

let stripe;

if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_SECRET_KEY.startsWith('sk_')
) {
  console.error('❌ STRIPE_SECRET_KEY manquante ou incorrecte');
  console.log('⚠️ Serveur démarré sans Stripe');
} else {
  stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe configuré');
}

// =====================================================
// 🚀 EXPRESS
// =====================================================

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

	
 // =====================================================
 // 🔐 PROTECTION DES ROUTES ADMINISTRATEUR
 // =====================================================

const requireAdmin = async (req, res, next) => {
  try {
    if (!adminAuth) {
      return res.status(503).json({
        error: 'Firebase Authentication indisponible'
      });
    }

    const authorization = req.headers.authorization || '';
    const token = authorization.replace(/^Bearer\s+/i, '');

    if (!token || token === authorization) {
      return res.status(401).json({
        error: 'Authentification requise'
      });
    }

    const decodedToken = await adminAuth.verifyIdToken(token, true);

    if (decodedToken.admin !== true) {
      return res.status(403).json({
        error: 'Accès administrateur refusé'
      });
    }

    req.adminUid = decodedToken.uid;
    next();

  } catch (error) {
    console.error('Erreur authentification admin:', error.message);

    return res.status(401).json({
      error: 'Jeton invalide ou expiré'
    });
  }
};


// =====================================================
// 🔐 PROTECTION DES ROUTES CLIENTS CONNECTÉS
// =====================================================

const requireUser = async (req, res, next) => {
  try {
    if (!adminAuth) {
      return res.status(503).json({
        error: 'Firebase Authentication indisponible'
      });
    }

    const authorization = req.headers.authorization || '';
    const token = authorization.replace(/^Bearer\s+/i, '');

    if (!token || token === authorization) {
      return res.status(401).json({
        error: 'Authentification requise'
      });
    }

    const decodedToken = await adminAuth.verifyIdToken(token, true);

    req.uid = decodedToken.uid;
    next();

  } catch (error) {
    console.error('Erreur authentification client:', error.message);

    return res.status(401).json({
      error: 'Authentification invalide'
    });
  }
};


// =====================================================
// 📧 VÉRIFICATION DE L'ADRESSE E-MAIL DE CONTACT
// =====================================================

// ENVOYER UN CODE À L'ADRESSE DU PROFIL
app.post('/profile/email-verification/request', requireUser, async (req, res) => {
  try {
    if (!db || !brevoConfigured) {
      return res.status(503).json({
        error: 'Service e-mail temporairement indisponible'
      });
    }

    const userRef = db.collection('users').doc(req.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        error: 'Profil utilisateur introuvable'
      });
    }

    const userData = userDoc.data();
    const email = String(userData.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: 'Adresse e-mail de contact invalide'
      });
    }

    if (
      userData.emailContactVerified === true &&
      String(userData.verifiedContactEmail || '').toLowerCase() === email
    ) {
      return res.json({
        success: true,
        alreadyVerified: true,
        emailSentTo: email
      });
    }

    const verificationRef = db
      .collection('emailContactVerifications')
      .doc(req.uid);

    const previousDoc = await verificationRef.get();

    if (previousDoc.exists) {
      const previousData = previousDoc.data();

      if (
        previousData.lastSentAt &&
        Date.now() - previousData.lastSentAt.toMillis() < 60 * 1000
      ) {
        return res.status(429).json({
          error: 'Veuillez attendre une minute avant de demander un nouveau code.'
        });
      }
    }

    const code = crypto.randomInt(100000, 1000000).toString();
    const codeHash = crypto
      .createHash('sha256')
      .update(code)
      .digest('hex');

    const now = Date.now();

    await verificationRef.set({
      email,
      codeHash,
      expiresAt: new Date(now + 10 * 60 * 1000),
      lastSentAt: new Date(now),
      attempts: 0
    });

    
try {
  const brevoResponse = await fetch(
    'https://api.brevo.com/v3/smtp/email',
    {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'MissOdora',
          email: process.env.BREVO_SENDER_EMAIL || 'contact@missodora.com'
        },
        to: [
          { email }
        ],
        subject: 'Votre code de vérification MissOdora',
        textContent:
          `Bonjour,\n\n` +
          `Votre code de vérification MissOdora est : ${code}\n\n` +
          `Ce code est valable pendant 10 minutes.\n\n` +
          `Si vous n'avez pas demandé cette vérification, ignorez cet e-mail.\n\n` +
          `L'équipe MissOdora`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#222">
            <h2 style="color:#b08d45">MissOdora</h2>
            <p>Bonjour,</p>
            <p>Voici votre code de vérification :</p>
            <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:18px;background:#f7f3eb;text-align:center">
              ${code}
            </div>
            <p>Ce code est valable pendant <strong>10 minutes</strong>.</p>
            <p>Si vous n'avez pas demandé cette vérification, ignorez cet e-mail.</p>
            <p>L'équipe MissOdora</p>
          </div>
        `
      })
    }
  );

  if (!brevoResponse.ok) {
    const errorBody = await brevoResponse.text();

    console.error(
      'Erreur API Brevo:',
      brevoResponse.status,
      errorBody
    );

    throw new Error('Échec de l’envoi via Brevo');
  }

} 
  catch (mailError) {
  await verificationRef.delete();

  console.error('Erreur envoi e-mail Brevo:', mailError.message);

  return res.status(502).json({
    error: 'Impossible d’envoyer le code. Vérifiez votre adresse e-mail ou réessayez plus tard.'
  });
}

	
	

    console.log('📧 Code de vérification envoyé à :', email);

    return res.json({
      success: true,
      emailSentTo: email
    });

  } catch (error) {
    console.error('Erreur demande vérification e-mail:', error);

    return res.status(500).json({
      error: 'Erreur lors de la demande de vérification'
    });
  }
});


// CONFIRMER LE CODE REÇU
app.post('/profile/email-verification/confirm', requireUser, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({
        error: 'Base de données indisponible'
      });
    }

    const code = String(req.body.code || '').trim();

    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        error: 'Veuillez saisir un code à 6 chiffres.'
      });
    }

    const userRef = db.collection('users').doc(req.uid);
    const verificationRef = db
      .collection('emailContactVerifications')
      .doc(req.uid);

    const [userDoc, verificationDoc] = await Promise.all([
      userRef.get(),
      verificationRef.get()
    ]);

    if (!userDoc.exists || !verificationDoc.exists) {
      return res.status(400).json({
        error: 'Aucune demande de vérification en cours. Demandez un nouveau code.'
      });
    }

    const userData = userDoc.data();
    const verificationData = verificationDoc.data();

    const currentEmail = String(userData.email || '').trim().toLowerCase();

    // Le code ne doit plus fonctionner si l'adresse du profil a changé.
    if (!currentEmail || currentEmail !== verificationData.email) {
      await verificationRef.delete();

      return res.status(400).json({
        error: 'Votre adresse e-mail a changé. Demandez un nouveau code.'
      });
    }

    if (verificationData.expiresAt.toMillis() < Date.now()) {
      await verificationRef.delete();

      return res.status(400).json({
        error: 'Le code a expiré. Demandez un nouveau code.'
      });
    }

    if ((verificationData.attempts || 0) >= 5) {
      await verificationRef.delete();

      return res.status(429).json({
        error: 'Trop de tentatives. Demandez un nouveau code.'
      });
    }

    const submittedHash = crypto
      .createHash('sha256')
      .update(code)
      .digest('hex');

    const expectedHash = verificationData.codeHash;

    const submittedBuffer = Buffer.from(submittedHash, 'hex');
    const expectedBuffer = Buffer.from(expectedHash, 'hex');

    if (
      submittedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(submittedBuffer, expectedBuffer)
    ) {
      await verificationRef.update({
        attempts: (verificationData.attempts || 0) + 1
      });

      return res.status(400).json({
        error: 'Code incorrect.'
      });
    }

    await userRef.update({
      emailContactVerified: true,
      verifiedContactEmail: currentEmail,
      emailContactVerifiedAt: new Date()
    });

    await verificationRef.delete();

    console.log('✅ Adresse de contact vérifiée pour :', req.uid);

    return res.json({
      success: true,
      verified: true,
      emailVerified: currentEmail
    });

  } catch (error) {
    console.error('Erreur confirmation e-mail:', error);

    return res.status(500).json({
      error: 'Impossible de confirmer le code.'
    });
  }
});


// =====================================================
// 🎁 CODES PROMOTIONNELS
// =====================================================

const promoCodes = {
  PROMO10: 10,
  PROMO20: 20,
  BLACKFRIDAY: 50,
  SOSO70: 70
};

app.post('/verify-promo', (req, res) => {
  console.log('📨 Requête /verify-promo:', req.body);

  const { code } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      valid: false,
      message: 'Code promo manquant'
    });
  }

  const upperCode = code.toUpperCase().trim();
  const reduction = promoCodes[upperCode];

  if (reduction !== undefined) {
    return res.json({
      valid: true,
      reduction,
      message: `Code promo valide : ${reduction}% de réduction !`
    });
  }

  return res.json({
    valid: false,
    reduction: 0,
    message: 'Code promo invalide'
  });
});

// =====================================================
// 💳 CRÉATION PAYMENT INTENT
// =====================================================


// =====================================================
// 💳 CRÉATION PAYMENT INTENT — CLIENT VÉRIFIÉ OBLIGATOIRE
// =====================================================

// Index produitsData pour le recalcul serveur (source de vérité des prix)
const { produitsParMarque } = require('./data/produitsData');
const ALL_PRODUCTS = Object.values(produitsParMarque).flat();
const PRODUCT_BY_ID = new Map(ALL_PRODUCTS.map((p) => [String(p.id), p]));

// Statuts autorisés pour le paiement
const STATUTS_PAYABLES = ['en_attente', 'pending', 'en attente', 'non payé'];

function estStatutPayable(statut) {
  return STATUTS_PAYABLES.includes(String(statut || '').toLowerCase());
}

// Recalcul serveur du montant d'une commande.
// Retourne { montantCents, detail } ou lève une erreur avec { status, code, message }.
async function recalculerMontantCommande(commande) {
  const articles = Array.isArray(commande.articles) ? commande.articles : [];
  if (articles.length === 0) {
    const e = new Error('Commande sans article');
    e.status = 400; e.code = 'COMMANDE_VIDE';
    throw e;
  }

  // Charger la vente flash active (si elle existe)
  let flashSale = null;
  try {
    const flashSnap = await db.collection('flash_sales').doc('active_sale').get();
    if (flashSnap.exists) flashSale = flashSnap.data();
  } catch (_) {}

  const flashActive =
    flashSale &&
    Number.isFinite(flashSale.endTimestamp) &&
    flashSale.endTimestamp > Date.now() &&
    Number(flashSale.stockLeft || 0) > 0 &&
    Array.isArray(flashSale.produitsDetail);

  const flashParProductId = new Map();
  if (flashActive) {
    for (const p of flashSale.produitsDetail) {
      flashParProductId.set(String(p.productId), p);
    }
  }

  let totalCents = 0;
  const detail = [];

  for (const article of articles) {
    const productId = String(article.productId || article.id || '');
    const quantite = Math.max(1, Number(article.quantite || article.quantity || 1));
    const contenance = article.contenance || '100ml';

    if (!productId) {
      const e = new Error(`Article sans productId: ${JSON.stringify(article)}`);
      e.status = 400; e.code = 'ARTICLE_INVALIDE';
      throw e;
    }

    const prod = PRODUCT_BY_ID.get(productId);
    if (!prod) {
      const e = new Error(`Produit inconnu: ${productId}`);
      e.status = 400; e.code = 'PRODUIT_INCONNU';
      throw e;
    }

    // Prix de référence (catalogue officiel)
    const prixNormal = Number(prod.prix);
    if (!Number.isFinite(prixNormal) || prixNormal <= 0) {
      const e = new Error(`Prix invalide pour ${productId}`);
      e.status = 500; e.code = 'PRIX_INVALIDE';
      throw e;
    }

    // Prix appliqué : flash si éligible, sinon normal
    let prixUnitaire = prixNormal;
    let source = 'normal';

    const flash = flashParProductId.get(productId);
    if (article.estVenteFlash === true && flash) {
      const prixFlash = Number(flash.prixFlash);
      if (Number.isFinite(prixFlash) && prixFlash > 0 && prixFlash < prixNormal) {
        prixUnitaire = prixFlash;
        source = 'flash';
      }
    }

    const sousTotalCents = Math.round(prixUnitaire * quantite * 100);
    totalCents += sousTotalCents;

    detail.push({
      productId,
      nom: prod.nom,
      contenance,
      quantite,
      prixNormal,
      prixUnitaire,
      source,
      sousTotalCents,
    });
  }

  // Appliquer la réduction promo (si la commande en a une)
  const reduction = Number(commande.reductionAppliquee || 0);
  if (Number.isFinite(reduction) && reduction > 0 && reduction < 100) {
    totalCents = Math.round(totalCents * (1 - reduction / 100));
  }

  return { montantCents: totalCents, detail, reduction };
}

app.post('/create-payment-intent', requireUser, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Stripe non configuré sur le serveur'
      });
    }

    if (!db) {
      return res.status(503).json({
        error: 'Base de données indisponible'
      });
    }

    // Vérifier le profil du client connecté
    const userDoc = await db
      .collection('users')
      .doc(req.uid)
      .get();

    if (!userDoc.exists) {
      return res.status(403).json({
        error: 'Profil utilisateur introuvable. Veuillez vous reconnecter.'
      });
    }

    const userData = userDoc.data();

    const email = String(userData.email || '')
      .trim()
      .toLowerCase();

    const verifiedEmail = String(userData.verifiedContactEmail || '')
      .trim()
      .toLowerCase();

    // Vérification obligatoire de l'adresse de contact MissOdora
    const emailVerified =
      userData.emailContactVerified === true &&
      email !== '' &&
      email === verifiedEmail;

    if (!emailVerified) {
      return res.status(403).json({
        error: 'EMAIL_NOT_VERIFIED',
        message: 'Veuillez vérifier votre adresse e-mail de contact avant de procéder au paiement.'
      });
    }

    const { commandeId, expectedAmount, amount, currency = 'eur' } = req.body;

    // =====================================================
    // MODE SÉCURISÉ : commandeId fourni → recalcul serveur
    // =====================================================
    if (commandeId) {
      const commandeRef = db.collection('commandes').doc(String(commandeId));
      const commandeSnap = await commandeRef.get();

      if (!commandeSnap.exists) {
        return res.status(404).json({
          error: 'COMMANDE_INTROUVABLE',
          message: 'Cette commande est introuvable.'
        });
      }

      const commande = commandeSnap.data();

      // La commande doit appartenir au client authentifié
      if (String(commande.userId || '') !== req.uid) {
        return res.status(403).json({
          error: 'COMMANDE_NON_AUTORISEE',
          message: 'Cette commande ne vous appartient pas.'
        });
      }

      // La commande doit être payante (statut en attente)
      if (!estStatutPayable(commande.statut)) {
        return res.status(409).json({
          error: 'COMMANDE_NON_PAYABLE',
          message: `Cette commande n'est pas dans un état payable (statut: ${commande.statut || 'inconnu'}).`
        });
      }

      // Déjà payée ?
      if (commande.stripePaymentIntentId) {
        return res.status(409).json({
          error: 'COMMANDE_DEJA_PAYEE',
          message: 'Cette commande a déjà été payée.',
          paymentIntentId: commande.stripePaymentIntentId
        });
      }

      // Recalcul serveur
      let recalcul;
      try {
        recalcul = await recalculerMontantCommande(commande);
      } catch (e) {
        return res.status(e.status || 400).json({
          error: e.code || 'RECALCUL_IMPOSSIBLE',
          message: e.message
        });
      }

      // Comparer avec le montant attendu côté client (si fourni)
      const expected = Number(expectedAmount);
      if (Number.isFinite(expected) && expected > 0) {
        const ecart = Math.abs(recalcul.montantCents - expected);
        if (ecart > 1) {
          return res.status(409).json({
            error: 'MONTANT_MODIFIE',
            message: 'Le prix de votre commande a changé. Vérifiez le nouveau montant avant de payer.',
            montantRecalcule: recalcul.montantCents,
            montantAttendu: expected,
            detail: recalcul.detail,
            reduction: recalcul.reduction
          });
        }
      }

      console.log('💳 Création PaymentIntent autorisée (mode sécurisé):', {
        uid: req.uid,
        commandeId,
        montantRecalcule: recalcul.montantCents,
        montantEuros: (recalcul.montantCents / 100) + ' €',
        articles: recalcul.detail.length
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: recalcul.montantCents,
        currency,
        automatic_payment_methods: { enabled: true },
        metadata: {
          uid: req.uid,
          commandeId: String(commandeId),
          integration_check: 'accept_a_payment'
        }
      });

      // Marquer la commande comme liée au PaymentIntent (idempotence)
      await commandeRef.update({
        stripePaymentIntentId: paymentIntent.id,
        montantRecalcule: recalcul.montantCents,
        updatedAt: new Date()
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        montantRecalcule: recalcul.montantCents
      });
    }

    // =====================================================
    // MODE LEGACY : amount fourni → comportement actuel
    // (anciennes versions de l'app — à déprécier)
    // =====================================================
    const amountInCents = Number(amount);

    if (
      !Number.isSafeInteger(amountInCents) ||
      amountInCents <= 0
    ) {
      return res.status(400).json({
        error: 'Montant invalide ou commandeId manquant'
      });
    }

    console.warn('⚠️ [LEGACY] Mode amount utilisé — à migrer vers commandeId', {
      uid: req.uid,
      amountEnCents: amountInCents
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        uid: req.uid,
        integration_check: 'accept_a_payment'
      }
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('❌ Erreur création PaymentIntent:', error);

    return res.status(500).json({
      error: 'Impossible de créer le paiement'
    });
  }
});


// =====================================================
// 💳 TEST STRIPE
// =====================================================

app.get('/test-stripe', requireAdmin, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        status: 'ERROR',
        error: 'Stripe non configuré'
      });
    }

    const balance = await stripe.balance.retrieve();

    return res.json({
      status: 'SUCCESS',
      message: 'Connexion Stripe OK',
      balance
    });

  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// =====================================================
// 👑 ESPACE ADMINISTRATEUR
// =====================================================


// 📋 LISTE DES UTILISATEURS
app.get('/admin/users', requireAdmin, async (req, res) => {
  try {
    // Vérifier Firestore avant de récupérer les utilisateurs
    if (!db) {
      return res.status(503).json({
        error: 'Base de données Firestore indisponible'
      });
    }

    const pageToken = req.query.pageToken || undefined;

    const result = await adminAuth.listUsers(1000, pageToken);

    // Récupérer également les profils Firestore
    const users = await Promise.all(
      result.users.map(async (user) => {
        let profileData = {};

        try {
          const profileDoc = await db
            .collection('users')
            .doc(user.uid)
            .get();

          if (profileDoc.exists) {
            profileData = profileDoc.data();
          }
        } catch (profileError) {
          console.error(
            'Erreur lecture profil Firestore:',
            user.uid,
            profileError.message
          );
        }

       

        const contactEmail = String(
          profileData.email || ''
        ).trim().toLowerCase();

        const verifiedContactEmail = String(
          profileData.verifiedContactEmail || ''
        ).trim().toLowerCase();

        return {
          uid: user.uid,
          email: user.email || null,
          displayName: user.displayName || null,
          disabled: user.disabled,

          // Vérification de connexion Firebase
          emailVerified: user.emailVerified,

          // Vérification de l'adresse de contact par Brevo
          emailContactVerified:
            profileData.emailContactVerified === true &&
            contactEmail !== '' &&
            contactEmail === verifiedContactEmail,

          contactEmail: profileData.email || null,
          verifiedContactEmail:
            profileData.verifiedContactEmail || null,
          emailContactVerifiedAt:
            profileData.emailContactVerifiedAt || null,

          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          isAdmin: user.customClaims?.admin === true
        };
      })
    );

    return res.json({
      success: true,
      users,
      nextPageToken: result.pageToken || null
    });

  } catch (error) {
    console.error('Erreur liste utilisateurs:', error);

    return res.status(500).json({
      error: 'Impossible de récupérer les utilisateurs'
    });
  }
});


// 🔒 BLOQUER UN COMPTE CLIENT
app.post('/admin/users/:uid/block', requireAdmin, async (req, res) => {
  try {
    const uid = req.params.uid;

    if (!uid || uid === req.adminUid) {
      return res.status(400).json({
        error: 'Action impossible sur ce compte'
      });
    }

    const user = await adminAuth.getUser(uid);

    if (user.customClaims?.admin === true) {
      return res.status(403).json({
        error: 'Action impossible sur un compte administrateur'
      });
    }

    await adminAuth.updateUser(uid, {
      disabled: true
    });

    await adminAuth.revokeRefreshTokens(uid);

    console.log('🔒 Compte client bloqué:', uid);

    return res.json({
      success: true,
      message: 'Compte bloqué avec succès',
      uid
    });

  } catch (error) {
    console.error('Erreur blocage utilisateur:', error);

    return res.status(
      error.code === 'auth/user-not-found' ? 404 : 500
    ).json({
      error: 'Impossible de bloquer ce compte'
    });
  }
});

// 🔓 DÉBLOQUER UN COMPTE CLIENT
app.post('/admin/users/:uid/unblock', requireAdmin, async (req, res) => {
  try {
    const uid = req.params.uid;

    if (!uid || uid === req.adminUid) {
      return res.status(400).json({
        error: 'Action impossible sur ce compte'
      });
    }

    const user = await adminAuth.getUser(uid);

    if (user.customClaims?.admin === true) {
      return res.status(403).json({
        error: 'Action impossible sur un compte administrateur'
      });
    }

    await adminAuth.updateUser(uid, {
      disabled: false
    });

    console.log('🔓 Compte client débloqué:', uid);

    return res.json({
      success: true,
      message: 'Compte débloqué avec succès',
      uid
    });

  } catch (error) {
    console.error('Erreur déblocage utilisateur:', error);

    return res.status(
      error.code === 'auth/user-not-found' ? 404 : 500
    ).json({
      error: 'Impossible de débloquer ce compte'
    });
  }
});

// =====================================================
// ❤️ SANTÉ DU SERVEUR
// =====================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    stripe: !!stripe,
    firebaseAdmin: !!adminAuth,
    port: PORT,
    environment: 'Render',
    routes: [
      '/health',
      '/test-stripe',
      '/create-payment-intent',
      '/verify-promo',
      '/admin/users',
      '/admin/users/:uid/block',
      '/admin/users/:uid/unblock',
	  '/profile/email-verification/request',
      '/profile/email-verification/confirm',
    ]
  });
});

// =====================================================
// 🏠 ACCUEIL SERVEUR
// =====================================================

app.get('/', (req, res) => {
  res.json({
    message: 'Serveur MissOdora - Render',
    environment: 'Production',
    endpoints: [
      '/health',
      '/test-stripe',
      '/create-payment-intent',
      '/verify-promo',
      '/admin/users',
      '/admin/users/:uid/block',
      '/admin/users/:uid/unblock',
	  '/profile/email-verification/request',
      '/profile/email-verification/confirm',
    ]
  });
});

// =====================================================
// 🚀 DÉMARRAGE RENDER
// =====================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log(
    '📍 URL Render: https://missodora-backend-server.onrender.com'
  );

  console.log(
    '📍 Health Check: https://missodora-backend-server.onrender.com/health'
  );

  console.log('📋 Routes disponibles :');
  console.log('   POST /verify-promo');
  console.log('   POST /create-payment-intent');
  console.log('   GET  /health');
  console.log('   GET  /test-stripe');
  console.log('   GET  /');
  console.log('   GET  /admin/users');
  console.log('   POST /admin/users/:uid/block');
  console.log('   POST /admin/users/:uid/unblock');
});

console.log('✅ Serveur Render démarré avec succès');
