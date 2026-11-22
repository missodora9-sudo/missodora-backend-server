
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

// ⚡ Configuration environnement
dotenv.config({ override: true });

// =====================================================
// 🔐 FIREBASE ADMIN
// =====================================================

const firebaseKeyPath =
  '/etc/secrets/missodora-c1ced-firebase-adminsdk-fbsvc-6713db9fbe.json';

if (getApps().length === 0) {
  if (fs.existsSync(firebaseKeyPath)) {
    const serviceAccount = require(firebaseKeyPath);

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('✅ Firebase Admin connecté avec succès');
  } else {
    console.error('❌ Fichier Firebase Admin introuvable sur Render');
  }
}

// =====================================================
// 🔐 FIREBASE AUTHENTICATION ADMIN
// =====================================================

const adminAuth = getApps().length > 0 ? getAuth() : null;

const ADMIN_UID = 'RjXNXKxqjUfOdzeR5rD1pvFYLkL2';

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
  'STRIPE_SECRET_KEY raw:',
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
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// =====================================================
// 🔐 CONFIGURATION INITIALE ADMIN
// ROUTE PROVISOIRE À SUPPRIMER APRÈS UTILISATION
// =====================================================

app.post('/admin/bootstrap', async (req, res) => {
  try {
    const secret = req.get('x-admin-bootstrap-secret');

    if (
      !process.env.ADMIN_BOOTSTRAP_SECRET ||
      !secret ||
      secret !== process.env.ADMIN_BOOTSTRAP_SECRET
    ) {
      return res.status(403).json({
        success: false,
        message: 'Accès interdit'
      });
    }

    if (!adminAuth) {
      return res.status(503).json({
        success: false,
        message: 'Firebase Admin indisponible'
      });
    }

    const user = await adminAuth.getUser(ADMIN_UID);

    if (
      !user.email ||
      user.email.toLowerCase() !== 'contact@missodora.com'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Identité administrateur incorrecte'
      });
    }

    if (user.customClaims?.admin === true) {
      return res.json({
        success: true,
        message: 'Administrateur déjà configuré'
      });
    }

    await adminAuth.setCustomUserClaims(ADMIN_UID, {
      ...user.customClaims,
      admin: true
    });

    console.log('✅ Rôle administrateur attribué');

    return res.json({
      success: true,
      message: 'Administrateur MissOdora configuré'
    });

  } catch (error) {
    console.error('❌ Erreur bootstrap admin:', error);

    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la configuration'
    });
  }
});

// =====================================================
// 🎁 CODES PROMOTIONNELS
// =====================================================

const promoCodes = {
  'PROMO10': 10,
  'PROMO20': 20,
  'BLACKFRIDAY': 50,
  'SOSO70': 70
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

  console.log(
    `🔍 Recherche code: "${upperCode}", trouvé: ${reduction}%`
  );

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
      currency: currency,
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

  } catch (err) {
    console.error('❌ Erreur Stripe:', err);

    return res.status(500).json({
      error: err.message || 'Impossible de créer PaymentIntent'
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
      '/admin/bootstrap'
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
      '/verify-promo'
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
  console.log('   POST /admin/bootstrap');
  console.log('   GET  /');
});

console.log('✅ Serveur Render démarré avec succès');
