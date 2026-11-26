// scripts/flash-sale.js
// scripts/flash-sale.js
// Outil de gestion de la vente flash — réutilisable à chaque nouvelle vente.

const path = require('path');
const fs = require('fs');

// API modulaire (obligatoire avec firebase-admin v14)
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Charger la clé de service (local ou Render)
const localKey = path.resolve(__dirname, '../serviceAccountKey.json');
const renderKey = '/etc/secrets/missodora-c1ced-firebase-adminsdk-fbsvc-6713db9fbe.json';
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || (fs.existsSync(localKey) ? localKey : renderKey);

if (!fs.existsSync(keyPath)) {
  console.error('❌ Fichier service account introuvable :', keyPath);
  process.exit(1);
}

// Initialisation unique avec l'API modulaire
if (!getApps().length) {
  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

const { produitsParMarque } = require('../data/produitsData');
const ALL_PRODUCTS = Object.values(produitsParMarque).flat();
const PRODUCT_BY_ID = new Map(ALL_PRODUCTS.map((p) => [String(p.id), p]));
function parseArgs(argv) {
  const args = { _: [], apply: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') args.apply = true;
    else if (a.startsWith('--')) args[a.slice(2)] = argv[++i];
    else args._.push(a);
  }
  return args;
}

async function status() {
  const snap = await db.collection('flash_sales').doc('active_sale').get();
  if (!snap.exists) { console.log('Aucune vente flash active.'); return; }
  const d = snap.data();
  const now = Date.now();
  const expired = d.endTimestamp <= now;
  console.log('Titre     :', d.titre);
  console.log('Fin       :', new Date(d.endTimestamp).toISOString(), expired ? '(EXPIRÉE)' : '(active)');
  console.log('StockLeft :', d.stockLeft);
  console.log('produits  :', JSON.stringify(d.produits));
  if (Array.isArray(d.produitsDetail)) {
    console.log('produitsDetail :');
    for (const p of d.produitsDetail) {
      const prod = PRODUCT_BY_ID.get(String(p.productId));
      console.log(`  flashId=${p.flashId}  productId=${p.productId}  ${prod?.nom || '?'}  normal=${p.prixNormal}€  flash=${p.prixFlash}€`);
    }
  } else {
    console.log('produitsDetail : ABSENT (Phase A1 non faite)');
  }
}
async function setProducts(args) {
  const productsArg = args.products;
  const hours = Number(args.hours || 72);
  if (!productsArg) {
    console.error('❌ --products manquant. Format : "101:89.99,102:95.99"');
    process.exit(1);
  }
  const entries = productsArg.split(',').map((s) => s.trim()).filter(Boolean);
  const detail = [];
  const erreurs = [];

  for (const entry of entries) {
    const [productId, flashStr] = entry.split(':');
    const flash = Number(flashStr);
    const prod = PRODUCT_BY_ID.get(String(productId));
    if (!prod) { erreurs.push(`productId "${productId}" absent de produitsData.js`); continue; }
    if (!Number.isFinite(flash) || flash <= 0) { erreurs.push(`prixFlash invalide pour "${productId}"`); continue; }
    const prixNormal = prod.prix;
    if (typeof prixNormal !== 'number' || prixNormal <= 0) { erreurs.push(`prix normal invalide pour "${productId}"`); continue; }
    if (flash >= prixNormal) { erreurs.push(`flash (${flash}) >= normal (${prixNormal}) pour "${productId}"`); continue; }
    detail.push({
      flashId: String(detail.length + 1),
      productId: prod.id,
      contenance: (prod.contenances && prod.contenances[0]) || '100ml',
      prixFlash: flash,
      prixNormal,
    });
  }

  if (erreurs.length) {
    console.error('❌ Erreurs :');
    erreurs.forEach((e) => console.error('  -', e));
    process.exit(1);
  }

  console.log('Nouvelle vente flash :');
  for (const p of detail) {
    const prod = PRODUCT_BY_ID.get(String(p.productId));
    const remise = Math.round((1 - p.prixFlash / p.prixNormal) * 100);
    console.log(`  ${p.productId} ${prod.nom} | ${p.contenance} | normal=${p.prixNormal}€ flash=${p.prixFlash}€ (-${remise}%)`);
  }
  console.log(`Fin : dans ${hours}h`);
  console.log(`StockLeft : ${args.stock !== undefined ? args.stock : '(inchangé)'}`);

  if (!args.apply) {
    console.log('\n(dry-run — relance avec --apply pour écrire)');
    return;
  }

  const ref = db.collection('flash_sales').doc('active_sale');
  const update = {
    endTimestamp: Date.now() + hours * 3600 * 1000,
    produitsDetail: detail,
    produits: detail.map((p) => p.flashId),
    titre: args.title || 'Vente Flash',
  };
  if (args.stock !== undefined) update.stockLeft = Number(args.stock);
  await ref.set(update, { merge: true });
  console.log('✅ Vente flash mise à jour.');
}
async function clear(args) {
  console.log('Fin de la vente flash en cours.');
  if (!args.apply) {
    console.log('(dry-run — relance avec --apply)');
    return;
  }
  const ref = db.collection('flash_sales').doc('active_sale');
  await ref.set({ endTimestamp: Date.now() - 1, produitsDetail: [] }, { merge: true });
  console.log('✅ Vente flash terminée.');
}

(async () => {
  const args = parseArgs(process.argv);
  const cmd = args._[0];
  if (cmd === 'status') return status();
  if (cmd === 'set') return setProducts(args);
  if (cmd === 'clear') return clear(args);
  console.log('Usage: node scripts/flash-sale.js <status|set|clear> [options]');
  process.exit(1);
})().catch((e) => {
  console.error('❌', e);
  process.exit(1);
});