const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const { getApps, initializeApp, cert } = require('firebase-admin/app');
const fs = require('fs');

// ⚡ Forcer override pour éviter conflit avec variable Windows
dotenv.config({ override: true });

// 🔐 Connexion Firebase Admin avec le fichier sécurisé de Render
const firebaseKeyPath = '/etc/secrets/missodora-c1ced-firebase-adminsdk-fbsvc-6713db9fbe.json';

if (getApps().length === 0) {
  if (fs.existsSync(firebaseKeyPath)) {
    const serviceAccount = require(firebaseKeyPath);

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log('✅ Firebase Admin connecté avec succès');
  } else {
    console.error('⚠️ Fichier Firebase Admin introuvable sur Render');
  }
}

// Gestionnaires d'erreurs globaux POUR RENDER
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Debug : afficher la clé lue
console.log('STRIPE_SECRET_KEY raw:', process.env.STRIPE_SECRET_KEY ? '✓ Présente' : '✗ Manquante');

// Vérification de la clé Stripe - VERSION RENDER (ne pas quitter le processus)
let stripe;
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('❌ STRIPE_SECRET_KEY manquante ou incorrecte');
  console.log('⚠️  Le serveur démarre sans Stripe');
} else {
  stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe configuré');
}

const app = express();
const PORT = process.env.PORT || 10000; // ← PORT 10000 pour Render

// Configuration CORS - VERSION RENDER (autorise tout)
app.use(cors({
  origin: '*',  // ← AUTORISE TOUTES LES ORIGINES
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// --- Liste des codes promo ---
const promoCodes = {
  'PROMO10': 10,
  'PROMO20': 20,
  'BLACKFRIDAY': 50,
  'SOSO70': 70
};

// --- Endpoint vérification code promo ---
app.post('/verify-promo', (req, res) => {
  console.log('📨 Requête reçue sur /verify-promo:', req.body);
  
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ 
      valid: false, 
      message: 'Code promo manquant' 
    });
  }

  const upperCode = code.toUpperCase().trim();
  const reduction = promoCodes[upperCode];

  console.log(`🔍 Recherche code: "${upperCode}", trouvé: ${reduction}%`);

  if (reduction !== undefined) {
    return res.json({ 
      valid: true, 
      reduction, 
      message: `Code promo valide : ${reduction}% de réduction !` 
    });
  } else {
    return res.json({ 
      valid: false, 
      reduction: 0, 
      message: 'Code promo invalide' 
    });
  }
});

// Endpoint pour créer un PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  try {
    // Vérifier si Stripe est configuré
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe non configuré sur le serveur' });
    }

    const { amount, currency = 'eur' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Montant invalide' });
    }

    // ✅ CORRECTION : amount est DÉJÀ en centimes depuis l'app mobile !
    const amountInCents = Math.round(parseFloat(amount));
    
    console.log('💳 Création PaymentIntent:', {
      amountReçu: amount,
      amountEnCents: amountInCents,
      montantEnEuros: (amountInCents / 100) + ' €'
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // ← amount est DÉJÀ en centimes
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret, 
      paymentIntentId: paymentIntent.id 
    });
  } catch (err) {
    console.error('Erreur Stripe:', err);
    res.status(500).json({ error: err.message || 'Impossible de créer PaymentIntent' });
  }
});

// Endpoint de test Stripe
app.get('/test-stripe', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ status: 'ERROR', error: 'Stripe non configuré' });
    }
    
    const balance = await stripe.balance.retrieve();
    res.json({ status: 'SUCCESS', message: 'Connexion Stripe OK', balance });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

// Endpoint santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(), 
    stripe: !!stripe,
    port: PORT,
    environment: 'Render',
    routes: ['/health', '/test-stripe', '/create-payment-intent', '/verify-promo']
  });
});

app.get('/', (req, res) => res.json({ 
  message: 'Serveur Stripe MissOdora - Render', 
  environment: 'Production',
  endpoints: ['/health', '/test-stripe', '/create-payment-intent', '/verify-promo'] 
}));

// Démarrer le serveur - VERSION RENDER
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 URL Render: https://missodora-backend-server.onrender.com`);
  console.log(`📍 Health Check: https://missodora-backend-server.onrender.com/health`);
  console.log('📋 Routes disponibles:');
  console.log('   POST /verify-promo');
  console.log('   POST /create-payment-intent'); 
  console.log('   GET  /health');
  console.log('   GET  /test-stripe');
  console.log('   GET  /');
});

console.log('✅ Serveur Render démarré avec succès');
