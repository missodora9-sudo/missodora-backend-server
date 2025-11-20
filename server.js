const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const dotenv = require('dotenv');

// ⚡ Forcer override pour éviter conflit avec variable Windows
dotenv.config({ override: true });

// Debug : afficher la clé lue
console.log('STRIPE_SECRET_KEY raw:', process.env.STRIPE_SECRET_KEY ? '✓ Présente' : '✗ Manquante');
console.log('Début de la clé:', process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...');
console.log('Longueur:', process.env.STRIPE_SECRET_KEY?.length);

// Vérification de la clé Stripe
if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('❌ STRIPE_SECRET_KEY manquante ou incorrecte dans .env');
  console.error('La clé doit commencer par "sk_"');
  process.exit(1);
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:19006', 'http://192.168.1.81:19006', 'exp://192.168.1.81:19000'],
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
    stripe: process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Missing',
    routes: ['/health', '/test-stripe', '/create-payment-intent', '/verify-promo']
  });
});

app.get('/', (req, res) => res.json({ 
  message: 'Serveur Stripe en ligne', 
  endpoints: ['/health', '/test-stripe', '/create-payment-intent', '/verify-promo'] 
}));

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 URL Local: http://localhost:${PORT}`);
  console.log(`📍 URL Réseau: http://192.168.1.81:${PORT}`);
  console.log('📋 Routes disponibles:');
  console.log('   POST /verify-promo');
  console.log('   POST /create-payment-intent'); 
  console.log('   GET  /health');
  console.log('   GET  /test-stripe');
  console.log('   GET  /');
});
