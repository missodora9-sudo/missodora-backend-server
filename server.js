
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { getFirestore } = require('firebase-admin/firestore');

const {
  getApps,
  initializeApp,
  cert
} = require('firebase-admin/app');

const { getAuth } = require('firebase-admin/auth');
const fs = require('fs');

// =====================================================
// ⚡ CONFIGURATION ENVIRONNEMENT
// =====================================================

dotenv.config({ override: true });

const PORT = process.env.PORT || 10000;

// =====================================================
// 🔐 FIREBASE ADMIN
// =====================================================

const firebaseKeyPath =
  '/etc/secrets/missodora-c1ced-firebase-adminsdk-fbsvc-6713db9fbe.json';

if (getApps().length === 0) {
  if (fs.existsSync(firebaseKeyPath)) {
    const serviceAccount = require(firebaseKeyPath);

    initializeApp({
      credential: cert(serviceAccount)
    });

    console.log('✅ Firebase Admin connecté avec succès');
  } else {
    console.error('❌ Fichier Firebase Admin introuvable sur Render');
  }
}

const adminAuth = getApps().length > 0 ? getAuth() : null;
// =====================================================
// 📧 FIRESTORE ET ENVOI DES EMAILS
// =====================================================

const db = getApps().length > 0 ? getFirestore() : null;

const emailTransporter =
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
    : null;

console.log(
  emailTransporter
    ? '✅ Service e-mail OVH configuré'
    : '❌ Service e-mail OVH indisponible'
);

console.log(
  adminAuth
    ? '✅ Firebase Authentication Admin prêt'
    : '❌ Firebase Authentication Admin indisponible'
);

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
    if (!db || !emailTransporter) {
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
      await emailTransporter.sendMail({
        from: `"MissOdora" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: email,
        subject: 'Votre code de vérification MissOdora',
        text:
          `Bonjour,\n\n` +
          `Votre code de vérification MissOdora est : ${code}\n\n` +
          `Ce code est valable pendant 10 minutes.\n\n` +
          `Si vous n'avez pas demandé cette vérification, ignorez cet e-mail.\n\n` +
          `L'équipe MissOdora`,
        html: `
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
      });
    } catch (mailError) {
      await verificationRef.delete();

      console.error('Erreur envoi e-mail OVH:', mailError);

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

app.post('/create-payment-intent', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: 'Stripe non configuré sur le serveur'
      });
    }

    const { amount, currency = 'eur' } = req.body;
    const amountInCents = Number(amount);

    if (
      !Number.isSafeInteger(amountInCents) ||
      amountInCents <= 0
    ) {
      return res.status(400).json({
        error: 'Montant invalide'
      });
    }

    console.log('💳 Création PaymentIntent:', {
      amountReçu: amount,
      amountEnCents: amountInCents,
      montantEnEuros: (amountInCents / 100) + ' €'
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('❌ Erreur Stripe:', error);

    return res.status(500).json({
      error: error.message || 'Impossible de créer PaymentIntent'
    });
  }
});

// =====================================================
// 💳 TEST STRIPE
// =====================================================

app.get('/test-stripe', async (req, res) => {
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
    const pageToken = req.query.pageToken || undefined;

    const result = await adminAuth.listUsers(1000, pageToken);

    const users = result.users.map(user => ({
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      disabled: user.disabled,
      emailVerified: user.emailVerified,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      isAdmin: user.customClaims?.admin === true
    }));

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
      '/admin/users/:uid/unblock'
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
      '/admin/users/:uid/unblock'
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
