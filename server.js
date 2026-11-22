
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');

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
