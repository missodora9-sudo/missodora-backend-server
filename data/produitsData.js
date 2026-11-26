// data/produitsData.js
// CATALOGUE OFFICIEL — COLLECTION PARFUMS DE DUBAI 🕌
// ⚠️ AUCUN STOCK ICI — Firebase uniquement

/* ===================== IMAGES ===================== */

const getDubaiImage = (nom) =>
  `https://raw.githubusercontent.com/missodora9-sudo/missodora-backend-server/main/dubai/${nom}.png`;

/* ===================== PRODUITS ===================== */

const produitsParMarque = {

  /* ===================== OUD DE DUBAI ===================== */
  "OUD DE DUBAI": [
    {
      id: "101",
      collection: "OUD DE DUBAI",
      nom: "DUBAI OUD ROYAL",
      type: "Eau de Parfum Homme",
      prix: 149.99,
      image: getDubaiImage("dubai-oud-royal1"),
      contenances: ["30ml", "50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Un oud royal d'exception, vieilli en fût de chêne pendant 7 ans. Notes de safran, bois de santal et cuir vieilli. Tenue exceptionnelle de 12+ heures."
    },
    {
      id: "102",
      collection: "OUD DE DUBAI",
      nom: "MIDNIGHT OUD NOIR",
      type: "Eau de Parfum Homme",
      prix: 159.99,
      image: getDubaiImage("dubai-midnight-oud1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Oud noir mystérieux aux notes de cuir, patchouli et encens. Parfait pour les soirées élégantes et événements spéciaux."
    },
    {
      id: "103",
      collection: "OUD DE DUBAI",
      nom: "OUD SAHARA",
      type: "Eau de Parfum Unisexe",
      prix: 139.99,
      image: getDubaiImage("dubai-oud-sahara1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Inspired by the golden sands of the Sahara. Features notes of amber, cedarwood, and precious oud. Unisex elegance."
    },
    {
      id: "104",
      collection: "OUD DE DUBAI",
      nom: "AL KHALEEJ OUD",
      type: "Extrait de Parfum",
      prix: 249.99,
      image: getDubaiImage("dubai-al-khaleej-oud1"),
      contenances: ["15ml", "30ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "LIMITÉ",
      description: "Extrait pur d'oud du Golfe. Seulement 500 flacons produits annuellement. Notes animales, boisées, avec une touche de rose."
    }
  ],

  /* ===================== GOLD DE DUBAI ===================== */
  "GOLD DE DUBAI": [
    {
      id: "201",
      collection: "GOLD DE DUBAI",
      nom: "DUBAI GOLD ELIXIR",
      type: "Eau de Parfum Homme",
      prix: 179.99,
      image: getDubaiImage("dubai-gold-elixir1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Élixir doré aux paillettes d'or 24K. Notes de safran, ambre gris et vanille de Madagascar. Symbole de luxe absolu."
    },
    {
      id: "202",
      collection: "GOLD DE DUBAI",
      nom: "BURJ KHALIFA GOLD",
      type: "Eau de Parfum Homme",
      prix: 199.99,
      image: getDubaiImage("dubai-burj-khalifa-gold1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Inspiré par la plus haute tour du monde. Notes de cuir de Toscane, bois de oud et épices orientales. Édition limitée."
    },
    {
      id: "203",
      collection: "GOLD DE DUBAI",
      nom: "DESERT GOLD",
      type: "Eau de Parfum Femme",
      prix: 169.99,
      image: getDubaiImage("dubai-desert-gold1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "L'or du désert en parfum. Notes de jasmin d'Arabie, rose de Taïf et musc blanc. Élégance féminine et puissante."
    }
  ],

  /* ===================== DESERT DE DUBAI ===================== */
  "DESERT DE DUBAI": [
    {
      id: "301",
      collection: "DESERT DE DUBAI",
      nom: "DESERT NIGHT",
      type: "Eau de Parfum Homme",
      prix: 155.5,
      image: getDubaiImage("dubai-desert-night1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "La nuit dans le désert d'Arabie. Notes froides de menthe, bois sec et étoiles. Fraîcheur nocturne exceptionnelle."
    },
    {
      id: "302",
      collection: "DESERT DE DUBAI",
      nom: "SAHARA WINDS",
      type: "Eau de Parfum Unisexe",
      prix: 134.99,
      image: getDubaiImage("dubai-sahara-winds1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Le vent chaud du Sahara. Notes minérales, sable chaud et fleurs rares du désert. Unisexe et envoûtant."
    },
    {
      id: "303",
      collection: "DESERT DE DUBAI",
      nom: "OASIS SECRET",
      type: "Eau de Parfum Femme",
      prix: 149.99,
      image: getDubaiImage("dubai-oasis-secret1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Le secret d'une oasis cachée. Notes aqueuses, fruits exotiques et fleurs rares. Fraîcheur et mystère."
    }
  ],

  /* ===================== ROYAL DE DUBAI ===================== */
  "ROYAL DE DUBAI": [
    {
      id: "401",
      collection: "ROYAL DE DUBAI",
      nom: "ROYAL BOUQUET",
      type: "Eau de Parfum Femme",
      prix: 192.99,
      image: getDubaiImage("dubai-royal-bouquet1"),
      contenances: ["50ml", "100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Bouquet royal de fleurs précieuses. Rose de Bulgarie, jasmin de Grasse et orchidée. Pour les reines modernes."
    },
    {
      id: "402",
      collection: "ROYAL DE DUBAI",
      nom: "EMIRI",
      type: "Extrait de Parfum",
      prix: 299.99,
      image: getDubaiImage("dubai-emiri1"),
      contenances: ["30ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "EXCLUSIF",
      description: "Extrait de parfum créé pour la famille royale. Notes d'ambre gris, oud rare et safran. Disponibilité très limitée."
    },
    {
      id: "403",
      collection: "ROYAL DE DUBAI",
      nom: "SHEIKH",
      type: "Eau de Parfum Homme",
      prix: 189.99,
      image: getDubaiImage("dubai-sheikh1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Le parfum du pouvoir. Notes de bois de oud, tabac blond et cuir de veau. Prestige et autorité."
    }
  ],

  /* ===================== LATTAFA PRIDE COLLECTION ===================== */
  "LATTAFA PRIDE": [
    {
      id: "501",
      collection: "LATTAFA PRIDE",
      nom: "SHAHEEN SILVER",
      type: "Eau de Parfum Unisexe",
      prix: 39.00,
      image: getDubaiImage("lattafa-shaheen-silver1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "POPULAIRE",
      description: "Un best-seller du Moyen-Orient. Notes fraîches d'agrumes, musc blanc et bois précieux. Tenue impressionnante."
    },
    {
      id: "502",
      collection: "LATTAFA PRIDE",
      nom: "SHAHEEN GOLD",
      type: "Eau de Parfum",
      prix: 42.00,
      image: getDubaiImage("lattafa-shaheen-goldd1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Version dorée du Shaheen. Notes plus chaudes avec vanille, ambre et épices douces. Luxe abordable."
    },
    {
      id: "503",
      collection: "LATTAFA PRIDE",
      nom: "AWAAN",
      type: "Eau de Parfum Unisexe",
      prix: 47.00,
      image: getDubaiImage("lattafa-awaam1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Le nuage parfumé. Notes aériennes de fleurs blanches, musc et ambroxan. Léger mais présent."
    },
    {
      id: "504",
      collection: "LATTAFA PRIDE",
      nom: "THARWAH SILVER",
      type: "Eau de Parfum Homme",
      prix: 48.00,
      image: getDubaiImage("lattafa-tharwah-silver"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Trésor argenté. Notes aquatiques, gingembre et bois de cèdre. Fraîcheur orientale moderne."
    },
    {
      id: "505",
      collection: "LATTAFA PRIDE",
      nom: "AL QIAM GOLD",
      type: "Eau de Parfum Unisexe",
      prix: 59.00,
      image: getDubaiImage("lattafa-al-qiam-gold1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "La valeur en or. Notes riches de oud, rose et épices orientales. Parfum signature pour occasions spéciales."
    }
  ],

  /* ===================== MUSK COLLECTION ===================== */
  "MUSK COLLECTION": [
    {
      id: "601",
      collection: "MUSK COLLECTION",
      nom: "BLUEBERRY MUSK",
      type: "Eau de Parfum",
      prix: 49.00,
      image: getDubaiImage("musk-blueberry1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mûres bleues juteuses mélangées à un musc blanc propre. Fruité, frais et irrésistiblement doux."
    },
    {
      id: "602",
      collection: "MUSK COLLECTION",
      nom: "CRANBERRY MUSK",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("musk-cranberry1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Canneberges acidulées sur un lit de musc chaud. Énergisant, fruité avec une touche épicée."
    },
    {
      id: "603",
      collection: "MUSK COLLECTION",
      nom: "ROYAL MUSK PURPLE",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("musk-royal-purple1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc royal violet aux notes de lavande, iris et vanille. Noble, apaisant et sophistiqué."
    },
    {
      id: "604",
      collection: "MUSK COLLECTION",
      nom: "ROYAL MUSK BLUE",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("musk-royal-blue1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc royal bleu aux notes marines, bergamote et musc blanc. Fraîcheur océanique et propre."
    },
    {
      id: "605",
      collection: "MUSK COLLECTION",
      nom: "ROYAL MUSK RUMAN",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("musk-royal-ruman1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc romain aux notes épicées, boisées et ambrées. Chaud, réconfortant et enveloppant."
    },
    {
      id: "606",
      collection: "MUSK COLLECTION",
      nom: "SILKY MUSK",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("musk-silky1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc soyeux comme de la soie. Notes lactées, poudrées et ultra-douces. Délicat et sensuel."
    },
    {
      id: "607",
      collection: "MUSK COLLECTION",
      nom: "MUSK MOOD",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("musk-mood1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "L'humeur en musc. Notes changeantes de fruits, fleurs et épices selon votre journée. Adaptatif."
    },
    {
      id: "608",
      collection: "MUSK COLLECTION",
      nom: "PURE MUSK LAIT",
      type: "Eau de Parfum",
      prix: 8.00,
      image: getDubaiImage("musk-pure-lait1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc pur lacté. Ultra-doux, crémeux et réconfortant comme un nuage de lait chaud."
    }
  ],

  /* ===================== KHAIR COLLECTION ===================== */
  "KHAIR COLLECTION": [
    {
      id: "701",
      collection: "KHAIR COLLECTION",
      nom: "KHAIR FUSION",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("khair-fusion1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Fusion moderne de notes orientales et occidentales. Bois, épices et fruits en parfaite harmonie."
    },
    {
      id: "702",
      collection: "KHAIR COLLECTION",
      nom: "KHAIR PISTACHIO",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("khair-pistachio1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Pistache gourmande, vanille crémeuse et notes boisées. Doux, réconfortant et irrésistible."
    },
    {
      id: "703",
      collection: "KHAIR COLLECTION",
      nom: "KHAIR",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("khair-original1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Le classique Khair. Notes de bois précieux, musc et fleurs blanches. Élégance intemporelle."
    }
  ],

  /* ===================== GULF ORCHID COLLECTION ===================== */
  "GULF ORCHID": [
    {
      id: "801",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID REFLECTION",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-reflection1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Réflexion dans les eaux du Golfe. Notes aquatiques, orchidée et musc. Clair et lumineux."
    },
    {
      id: "802",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID ORIENTAL ROSE",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-oriental-rose1"),
      contenances: ["110ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Rose orientale en fleur. Rose de Taïf, safran et bois de santal. Romantique et passionné."
    },
    {
      id: "803",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID MEYDAN",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-meydan1"),
      contenances: ["110ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Inspiré des champs de courses de Meydan. Notes énergiques, sportives et élégantes."
    },
    {
      id: "804",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID HONEYMOON",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-honeymoon1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Lune de miel dans le Golfe. Notes de miel, fleurs d'oranger et vanille. Doux et romantique."
    },
    {
      id: "805",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID SUNSET KISS",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-sunset-kiss2"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Baiser du coucher de soleil. Notes chaudes d'ambre, vanille et épices douces. Envoûtant."
    },
    {
      id: "806",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID SARAB",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-sarab1"),
      contenances: ["110ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mirage dans le désert. Notes éthérées, minérales et légèrement fruitées. Mystérieux."
    },
    {
      id: "807",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID MOONLIGHT",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-moonlight1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Clair de lune sur le Golfe. Notes fraîches de fleurs nocturnes et musc lunaire. Poétique."
    },
    {
      id: "808",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID MUSK N°33",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-musk-331"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc N°33 signature. Propriétaire, chaud et légèrement animalique. Charismatique."
    },
    {
      id: "809",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID ISHQ",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-ishq"),
      contenances: ["110ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ishq - l'amour en arabe. Notes passionnées de rose, oud et épices. Intense et émotionnel."
    },
    {
      id: "810",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID SHAHM",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("gulf-orchid-shahm1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Shahm - la dignité. Notes nobles de bois précieux, cuir et épices rares. Majestueux."
    },
    {
      id: "811",
      collection: "GULF ORCHID",
      nom: "SWEET HEAVEN",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("gulf-orchid-sweet-heaven1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ciel sucré. Notes gourmandes de caramel, vanille et fruits confits. Délicieusement sucré."
    },
    {
      id: "812",
      collection: "GULF ORCHID",
      nom: "SWEET HEAVEN EXTREME",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("gulf-orchid-sweet-heaven-extreme1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Version extrême de Sweet Heaven. Plus intense, plus durable, plus gourmand. Pour les amateurs de sucré."
    },
    {
      id: "813",
      collection: "GULF ORCHID",
      nom: "SHEIKH AL OUD BLANC",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("gulf-orchid-sheikh-al-oud-blanc1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Sheikh Al Oud Blanc. Oud blanc propre, bois de santal et musc. Élégant et raffiné."
    },
    {
      id: "814",
      collection: "GULF ORCHID",
      nom: "SHEIKH AL OUD BORDEAUX",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("gulf-orchid-sheikh-al-oud-bordeaux1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Sheikh Al Oud Bordeaux. Oud riche, fruits rouges et épices chaudes. Profond et complexe."
    },
    {
      id: "815",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID ROSE KISS",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("gulf-orchid-rose-kiss1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Baiser de rose. Rose fraîche, pétales de rose et une touche de fruits rouges. Romantique et frais."
    },
    {
      id: "816",
      collection: "GULF ORCHID",
      nom: "GULF ORCHID ANNABEL",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("gulf-orchid-annabel1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Annabel - la grâce. Notes fleuries, poudrées et ultra-féminines. Élégant et délicat."
    }
  ],

  /* ===================== CREME ET SOINS ===================== */
  "CRÈME & SOINS": [
    {
      id: "901",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX RAHAF",
      type: "Crème",
      prix: 5.00,
      image: getDubaiImage("creme-gulf-orchid-rahaf"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Crème 3-en-1 pour corps, visage et cheveux Rahaf. Hydratation intense, parfum durable. Peau douce et soyeuse."
    },
    {
      id: "902",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX LAYLA",
      type: "Crème",
      prix: 5.00,
      image: getDubaiImage("creme-gulf-orchid-layla"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Crème Layla aux notes orientales. Riche en beurre de karité et huile d'argan. Nutrition profonde."
    },
    {
      id: "903",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX LULUT ALLAIL",
      type: "Crème",
      prix: 5.00,
      image: getDubaiImage("creme-gulf-orchid-lulut-allaill"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Lulut Allail - la nuit. Crème nocturne réparatrice. Action intensive pendant le sommeil."
    },
    {
      id: "904",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX LULUT ALHOB",
      type: "Crème",
      prix: 5.00,
      image: getDubaiImage("creme-gulf-orchid-lulut-alhob"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Lulut Alhob - l'amour. Crème romantique aux notes de rose et vanille. Sensuelle et enveloppante."
    },
    {
      id: "905",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX SHAGHAF ALROUH",
      type: "Crème",
      prix: 5.00,
      image: getDubaiImage("creme-gulf-orchid-shaghaf-alrouh"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Shaghaf Alrouh - passion de l'âme. Crème intense aux notes orientales complexes. Parfum durable 24h."
    },
    {
      id: "906",
      collection: "CRÈME & SOINS",
      nom: "CREME CORPS CHEVEUX SILKY MUSC",
      type: "Crème",
      prix: 6.50,
      image: getDubaiImage("creme-gulf-orchid-silky-musc"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Crème Silky Musk. Texture soyeuse, musc propre et doux. Pour une peau de velours."
    },
    {
      id: "907",
      collection: "CRÈME & SOINS",
      nom: "CREME MUSK COLLECTION TROPICAL",
      type: "Crème",
      prix: 6.50,
      image: getDubaiImage("creme-musk-tropical"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Crème Musk Tropical. Notes de fruits tropicaux, noix de coco et musc. Évasion paradisiaque."
    },
    {
      id: "908",
      collection: "CRÈME & SOINS",
      nom: "CREME MUSK COLLECTION BLUEBERRY",
      type: "Crème",
      prix: 6.50,
      image: getDubaiImage("creme-musk-blueberry"),
      contenances: ["200ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Crème Musk Blueberry. Myrtilles fraîches et musc propre. Fruité, frais et gourmand."
    }
  ],

  /* ===================== PARFUMS YARA ===================== */
  "YARA COLLECTION": [
    {
      id: "1001",
      collection: "YARA COLLECTION",
      nom: "YARA PINK",
      type: "Eau de Parfum Femme",
      prix: 16.00,
      image: getDubaiImage("yara-pink1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Yara Pink - la féminité en rose. Notes de fruits rouges, vanille et musc. Jeune, frais et romantique."
    },
    {
      id: "1002",
      collection: "YARA COLLECTION",
      nom: "YARA PINK MINI",
      type: "Eau de Parfum Femme",
      prix: 3.00,
      image: getDubaiImage("yara-pink-mini1"),
      contenances: ["50ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "MINI",
      description: "Mini version de Yara Pink. Parfait pour le sac à main, les voyages. Même parfum, format pratique."
    },
    {
      id: "1003",
      collection: "YARA COLLECTION",
      nom: "YARA MOI",
      type: "Eau de Parfum Femme",
      prix: 16.00,
      image: getDubaiImage("yara-moi1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Yara Moi - c'est moi. Notes personnalisées, signature unique. Pour la femme qui ose être elle-même."
    },
    {
      id: "1004",
      collection: "YARA COLLECTION",
      nom: "YARA ROSE",
      type: "Parfum Cheveux",
      prix: 7.00,
      image: getDubaiImage("yara-rose1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Parfum pour cheveux Yara Rose. Rose fraîche, cheveux parfumés toute la journée. Sans alcool."
    }
  ],

  /* ===================== AMEERAT COLLECTION ===================== */
  "AMEERAT COLLECTION": [
    {
      id: "1101",
      collection: "AMEERAT COLLECTION",
      nom: "AMEERAT AL ARAB",
      type: "Eau de Parfum Homme",
      prix: 11.00,
      image: getDubaiImage("ameerat-al-arab1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ameerat Al Arab - princesse arabe. Notes florales orientales, bois précieux. Noble et gracieux."
    },
    {
      id: "1102",
      collection: "AMEERAT COLLECTION",
      nom: "AMEERAT AL ARAB MINI",
      type: "Eau de Parfum Homme",
      prix: 3.00,
      image: getDubaiImage("ameerat-al-arab-mini1"),
      contenances: ["50ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "MINI",
      description: "Mini version d'Ameerat Al Arab. Format voyage, essai parfait. Élégance en miniature."
    },
    {
      id: "1103",
      collection: "AMEERAT COLLECTION",
      nom: "AMEERAT AL ARAB PINK",
      type: "Eau de Parfum Femme",
      prix: 11.00,
      image: getDubaiImage("ameerat-al-arab-pink1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ameerat Al Arab Pink. Version rose plus fruitée et jeune. Toujours noble, plus moderne."
    },
    {
      id: "1104",
      collection: "AMEERAT COLLECTION",
      nom: "PARFUM CHEVEUX AMEERAT AL ARAB",
      type: "Parfum Cheveux Femme",
      prix: 7.00,
      image: getDubaiImage("ameerat-al-arab-hair1"),
      contenances: ["50ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Parfum pour cheveux Ameerat Al Arab. Cheveux parfumés, brillants et soyeux. Soin et parfum."
    }
  ],

  /* ===================== OUD & ORIENTAL ===================== */
  "OUD & ORIENTAL": [
    {
      id: "1201",
      collection: "OUD & ORIENTAL",
      nom: "AMEER AL OUD",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("ameer-al-oud1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ameer Al Oud - prince de l'oud. Oud authentique, épices royales. Puissance et élégance."
    },
    {
      id: "1202",
      collection: "OUD & ORIENTAL",
      nom: "AMEER IMPERIUM",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("ameer-imperium1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ameer Imperium - l'empire. Notes impériales de bois, cuir et épices. Autorité et prestige."
    },
    {
      id: "1203",
      collection: "OUD & ORIENTAL",
      nom: "AMEER AL ARAB IMPERIUM",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("ameer-al-arab-imperium1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ameer Al Arab Imperium. Fusion arabe et impériale. Complexe, riche et mémorable."
    },
    {
      id: "1204",
      collection: "OUD & ORIENTAL",
      nom: "LONDON OUD",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("london-oud1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "London Oud. Oud sophistiqué à l'anglaise. Élégant, discret mais présent. British style."
    },
    {
      id: "1205",
      collection: "OUD & ORIENTAL",
      nom: "BLUE OUD",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("blue-oud1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Blue Oud. Oud bleu, frais et moderne. Notes aquatiques, bois bleu. Innovation orientale."
    },
    {
      id: "1206",
      collection: "OUD & ORIENTAL",
      nom: "OUD MOOD",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("oud-mood1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Oud Mood. L'humeur en oud. Notes changeantes selon l'heure. Mystérieux et évolutif."
    },
    {
      id: "1207",
      collection: "OUD & ORIENTAL",
      nom: "OUD 24H",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("oud-24h1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Oud 24H. Tenue exceptionnelle 24 heures. Oud concentré, économique et efficace."
    }
  ],

  /* ===================== FAKHAR COLLECTION ===================== */
  "FAKHAR COLLECTION": [
    {
      id: "1301",
      collection: "FAKHAR COLLECTION",
      nom: "FAKHAR NOIR",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("fakhar-noir1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Fakhar Noir - la fierté noire. Notes sombres, mystérieuses, intense. Pour les âmes audacieuses."
    },
    {
      id: "1302",
      collection: "FAKHAR COLLECTION",
      nom: "FAKHAR WOMEN",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("fakhar-women1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Fakhar Women. Fierté féminine, puissance douce. Notes florales, boisées, avec caractère."
    },
    {
      id: "1303",
      collection: "FAKHAR COLLECTION",
      nom: "FAKHAR MEN",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("fakhar-men1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Fakhar Men. Fierté masculine, confiance. Notes boisées, épicées, viriles mais raffinées."
    },
    {
      id: "1304",
      collection: "FAKHAR COLLECTION",
      nom: "ASAD",
      type: "Eau de Parfum Homme",
      prix: 16.00,
      image: getDubaiImage("asad1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Asad - le lion. Force, courage, leadership. Notes animales, boisées, indomptables."
    }
  ],

  /* ===================== PHILOS COLLECTION ===================== */
  "PHILOS COLLECTION": [
    {
      id: "1401",
      collection: "PHILOS COLLECTION",
      nom: "PHILOS RED",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("philos-red1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Philos Red - la philosophie rouge. Passion, énergie, vie. Notes fruitées, épicées, vibrantes."
    },
    {
      id: "1402",
      collection: "PHILOS COLLECTION",
      nom: "PHILOS BLACK",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("philos-black1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Philos Black - la philosophie noire. Mystère, profondeur, réflexion. Notes sombres, boisées, intrigantes."
    }
  ],

  /* ===================== ITHRA COLLECTION ===================== */
  "ITHRA COLLECTION": [
    {
      id: "1501",
      collection: "ITHRA COLLECTION",
      nom: "ITHRA POMEGRANATE",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("ithra-pomegranate1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ithra Pomegranate - grenade juteuse. Fruité, frais, vitaminé. Énergie et vitalité."
    },
    {
      id: "1502",
      collection: "ITHRA COLLECTION",
      nom: "ITHRA MANGO MUSK",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("ithra-mango1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ithra Mango - mangue tropicale. Exotique, sucré, ensoleillé. Évasion immédiate."
    },
    {
      id: "1503",
      collection: "ITHRA COLLECTION",
      nom: "ITHRA PISTACHIO MUSK",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("ithra-pistachio1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ithra Pistachio - pistache gourmande. Crémeux, doux, réconfortant. Comme un dessert."
    },
    {
      id: "1504",
      collection: "ITHRA COLLECTION",
      nom: "COTTON CANDY ITHRA MUSK",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("ithra-cotton-candy1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Cotton Candy Ithra - barbe à papa. Sucré, léger, joyeux. Nostalgie d'enfance."
    },
  ],

  /* ===================== COLLECTION DIVERS ===================== */
  "COLLECTION DIVERS": [
    {
      id: "1601",
      collection: "COLLECTION DIVERS",
      nom: "PEAR POTION",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("pear-potion1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Pear Potion - potion de poire. Poire juteuse, notes fraîches. Magie fruitée."
    },
    {
      id: "1602",
      collection: "COLLECTION DIVERS",
      nom: "QISSA BLUE",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("qissa-blue1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Qissa Blue - histoire bleue. Notes aquatiques, légèrement salines. Comme une histoire d'océan."
    },
    {
      id: "1603",
      collection: "COLLECTION DIVERS",
      nom: "BAB AL WARDI",
      type: "Eau de Parfum Femme",
      prix: 11.00,
      image: getDubaiImage("bab-al-wardi1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Bab Al Wardi - porte des roses. Jardin de roses, floraison abondante. Romantique à l'orientale."
    },
    {
      id: "1604",
      collection: "COLLECTION DIVERS",
      nom: "JUICY MELANGE",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("juicy-melange1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Juicy Melange - mélange juteux. Fruits tropicaux, agrumes pétillants. Fraîcheur explosive."
    },
    {
      id: "1605",
      collection: "COLLECTION DIVERS",
      nom: "OUD ZANZIBAR",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("zanzibar1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Oud Zanzibar. Oud + épices de Zanzibar. Exotique, épicé, mystérieux."
    },
    {
      id: "1606",
      collection: "COLLECTION DIVERS",
      nom: "MOUSUF AZURE",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("mousuf-azure1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mousuf Azure - azuréen. Ciel bleu infini, liberté. Fraîcheur aérienne."
    },
    {
      id: "1607",
      collection: "COLLECTION DIVERS",
      nom: "MUSK SALAMA",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("musk-salama1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musk Salama - paix en musc. Musc apaisant, réconfortant. Calme et sérénité."
    },
    {
      id: "1608",
      collection: "COLLECTION DIVERS",
      nom: "NOW BLACK",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("now-black1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Now Black - maintenant noir. Audacieux, moderne, sophistiqué. Pour l'instant présent."
    },
    {
      id: "1609",
      collection: "COLLECTION DIVERS",
      nom: "BAB AL HAMRA",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("bab-al-hamra1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Bab Al Hamra - porte rouge. Chaleureux, accueillant, traditionnel. Comme une maison arabe."
    },
    {
      id: "1610",
      collection: "COLLECTION DIVERS",
      nom: "SAFEER AL HUB",
      type: "Eau de Parfum",
      prix: 12.00,
      image: getDubaiImage("safeer-al-hub1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Safeer Al Hub - ambassadeur de l'amour. Romantique, passionné, captivant. Message d'amour."
    },
    {
      id: "1611",
      collection: "COLLECTION DIVERS",
      nom: "COTTON D'OR",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("cotton-dor1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Cotton d'Or - coton doré. Douceur, confort, luxe. Comme un tissu précieux."
    },
    {
      id: "1612",
      collection: "COLLECTION DIVERS",
      nom: "CONFIDENTIAL GOLD",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("confidential-gold1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Confidential Gold - or confidentiel. Secret, luxueux, précieux. Pour les initiés."
    },
    {
      id: "1613",
      collection: "COLLECTION DIVERS",
      nom: "TERIAQ",
      type: "Eau de Parfum",
      prix: 22.00,
      image: getDubaiImage("teriaq1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      status: "LUXE",
      description: "Teriaq - remède précieux. Exceptionnel, rare, pour connaisseurs. Le summum du luxe."
    },
    {
      id: "1614",
      collection: "COLLECTION DIVERS",
      nom: "MOUSUF",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("mousuf1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mousuf - le classique. Intemporel, raffiné, élégant. Simplement parfait."
    },
    {
      id: "1615",
      collection: "COLLECTION DIVERS",
      nom: "ANA ABIYEDH POUDRÉE",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("ana-abiydh-poudree1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ana Abiydh Poudrée - moi blanc poudré. Doux, enveloppant, délicat. Comme un nuage."
    },
    {
      id: "1616",
      collection: "COLLECTION DIVERS",
      nom: "MARINA",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("marina1"),
      contenances: ["50ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Marina. Fraîcheur marine, élégance urbaine. Yachts et sophistication."
    },
    {
      id: "1617",
      collection: "COLLECTION DIVERS",
      nom: "OPULENT RED",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("opulent-red1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Opulent Red - rouge opulent. Riche, passionné, captivant. Luxe coloré."
    },
    {
      id: "1618",
      collection: "COLLECTION DIVERS",
      nom: "MOUSUF WARDI",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("mousuf-wardi1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mousuf Wardi - Mousuf fleuri. Version florale du classique. Élégance fleurie."
    },
    {
      id: "1620",
      collection: "COLLECTION DIVERS",
      nom: "ANA ABIYEDH RED",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("ana-abiydh-red1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ana Abiydh Red - moi blanc rouge. Passion, intensité, caractère. Version audacieuse."
    },
    {
      id: "1621",
      collection: "COLLECTION DIVERS",
      nom: "NADJIA",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("nadjia1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Nadjia - celle qui appelle. Féminin, gracieux, élégant. Appel délicat."
    },
    {
      id: "1622",
      collection: "COLLECTION DIVERS",
      nom: "WASHWASHAH",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("washwashah1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Washwashah - murmure. Discret, envoûtant, délicat. Comme un secret chuchoté."
    },
    {
      id: "1623",
      collection: "COLLECTION DIVERS",
      nom: "HAYAATI GOLD ELIXIR",
      type: "Eau de Parfum Unisexe",
      prix: 13.00,
      image: getDubaiImage("hayati-gold-elixir1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Hayaati Gold Elixir - élixir d'or de ma vie. Précieux, vitalisant, célébratoire."
    },
    {
      id: "1624",
      collection: "COLLECTION DIVERS",
      nom: "DALOATE ANA",
      type: "Eau de Parfum",
      prix: 13.00,
      image: getDubaiImage("daloate-ana1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Daloate Ana - mon invitation. Personnel, unique, signature. Votre parfum-personnalité."
    },
    {
      id: "1625",
      collection: "COLLECTION DIVERS",
      nom: "AL DIRGHAM",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("al-dirgham1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Al Dirgham - broderie précieuse. Richement orné, détaillé, précieux. Art en parfum."
    },
    {
      id: "1626",
      collection: "COLLECTION DIVERS",
      nom: "ANDALEEB FLORA",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("andaleeb-flora1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Andaleeb Flora - rossignol fleuri. Mélodieux, naturel, printanier. Chant floral."
    },
    {
      id: "1627",
      collection: "COLLECTION DIVERS",
      nom: "OPULENT MUSK",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("opulent-musk1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Opulent Musk - musc opulent. Riche, sensuel, enveloppant. Luxe en musc."
    },
    {
      id: "1628",
      collection: "COLLECTION DIVERS",
      nom: "HAYA",
      type: "Eau de Parfum",
      prix: 19.00,
      image: getDubaiImage("haya1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Haya - modestie. Délicat, respectueux, élégant. Pudeur en parfum."
    },
    {
      id: "1629",
      collection: "COLLECTION DIVERS",
      nom: "JAANAA LAIT",
      type: "Eau de Parfum",
      prix: 8.00,
      image: getDubaiImage("jaanaa-lait1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Jaanaa Lait - bien-aimé laiteux. Doux, réconfortant, nourrissant. Comme un souvenir d'enfance."
    },
    {
      id: "1630",
      collection: "COLLECTION DIVERS",
      nom: "LARA MAISON ATTRI",
      type: "Eau de Parfum Femme",
      prix: 14.00,
      image: getDubaiImage("lara-maison-attri1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Lara Maison Attri. Création exclusive Attri. Sophistiqué, raffiné, unique."
    },
    {
      id: "1631",
      collection: "COLLECTION DIVERS",
      nom: "EMESSA MAISON ASRAR",
      type: "Eau de Parfum",
      prix: 14.00,
      image: getDubaiImage("emessa-maison-asrar1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Emessa Maison Asrar. Secrets de la Maison Asrar. Mystérieux, profond, initiatique."
    },
    {
      id: "1632",
      collection: "COLLECTION DIVERS",
      nom: "NOUF PARIS CORNER",
      type: "Eau de Parfum Unisexe",
      prix: 11.00,
      image: getDubaiImage("nouf-paris-corner1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Nouf Paris Corner. Un coin de Paris à Dubai. Élégance française, luxe oriental."
    },
    {
      id: "1633",
      collection: "COLLECTION DIVERS",
      nom: "ABAAN",
      type: "Eau de Parfum",
      prix: 11.00,
      image: getDubaiImage("abaann"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Abaan - clair et limpide. Frais, pur, revitalisant. Comme l'eau pure."
    },
    {
      id: "1634",
      collection: "COLLECTION DIVERS",
      nom: "SAKEENA",
      type: "Eau de Parfum",
      prix: 16.00,
      image: getDubaiImage("sakeena1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Sakeena - tranquillité. Apaisant, serein, paisible. Paix intérieure."
    },
    {
      id: "1635",
      collection: "COLLECTION DIVERS",
      nom: "QIMMAH WOMEN",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("qimmah-women1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Qimmah Women - dignité féminine. Noble, fort, gracieux. Féminité puissante."
    },
    {
      id: "1636",
      collection: "COLLECTION DIVERS",
      nom: "MUSC CANDY MY PERFUME",
      type: "Eau de Parfum Femme",
      prix: 13.00,
      image: getDubaiImage("musc-candy-my-perfume1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Musc Candy My Perfume. Musc sucré comme un bonbon. Ludique, irrésistible, joyeux."
    },
    {
      id: "1637",
      collection: "COLLECTION DIVERS",
      nom: "EMAAN",
      type: "Eau de Parfum",
      prix: 18.00,
      image: getDubaiImage("emaan1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Emaan - foi. Profond, spirituel, élevé. Parfum qui élève l'âme."
    },
    {
      id: "1638",
      collection: "COLLECTION DIVERS",
      nom: "AL NASHAMA",
      type: "Eau de Parfum",
      prix: 18.00,
      image: getDubaiImage("al-nashama"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Al Nashama - noblesse. Digne, généreux, majestueux. Noblesse en parfum."
    },
    {
      id: "1639",
      collection: "COLLECTION DIVERS",
      nom: "AJWAD PINK",
      type: "Eau de Parfum Femme",
      prix: 16.00,
      image: getDubaiImage("ajwad-pink1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Ajwad Pink - le plus généreux en rose. Généreux, romantique, floral. Rose abondante."
    },
    {
      id: "1640",
      collection: "COLLECTION DIVERS",
      nom: "MAYAR",
      type: "Eau de Parfum Femme",
      prix: 16.00,
      image: getDubaiImage("mayar1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      description: "Mayar - féminité résolue. Affirmé, élégant, présent. Féminité qui s'assume."
    }
  ],

  /* ===================== EAU DE MILKY ===================== */
  "EAU DE MILKY": [
    {
      id: "1701",
      collection: "EAU DE MILKY",
      nom: "EAU DE MILKY AHLAM AL ARAB",
      type: "Eau de Parfum",
      prix: 8.00,
      image: getDubaiImage("eau-de-milky-ahlam-al-arab1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "LAIT",
      description: "Ahlam Al Arab en version laiteuse. Rêves arabes, douceur lactée. Onirique et doux."
    },
    {
      id: "1702",
      collection: "EAU DE MILKY",
      nom: "EAU DE MILKY ANA ABIYEDH",
      type: "Eau de Parfum",
      prix: 8.00,
      image: getDubaiImage("eau-de-milky-ana-abiydh1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "LAIT",
      description: "Ana Abiydh en version laiteuse. Moi blanc lacté. Encore plus doux, plus crémeux."
    },
    {
      id: "1703",
      collection: "EAU DE MILKY",
      nom: "EAU DE MILKY MALAK",
      type: "Eau de Parfum",
      prix: 8.00,
      image: getDubaiImage("eau-de-milky-malak1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "LAIT",
      description: "Malak en version laiteuse - ange lacté. Douceur angélique, pureté lactée."
    },
    {
      id: "1704",
      collection: "EAU DE MILKY",
      nom: "EAU DE MILKY WASHWASHA",
      type: "Eau de Parfum Femme",
      prix: 8.00,
      image: getDubaiImage("eau-de-milky-washwasha1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "LAIT",
      description: "Washwasha en version laiteuse. Murmure lacté. Encore plus doux, plus discret."
    }
  ],

  /* ===================== COFFRETS ===================== */
  "COFFRETS": [
    {
      id: "1801",
      collection: "COFFRETS",
      nom: "COFFRET 4 PCS MUSC AL TAHARA",
      type: "Coffret",
      prix: 10.00,
      image: getDubaiImage("coffret-musc-al-tahara1"),
      contenances: ["4 pièces"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "COFFRET",
      description: "Coffret 4 pièces Musc Al Tahara. Parfum, crème, gel douche, savon. Routine complète de pureté."
    },
    {
      id: "1802",
      collection: "COFFRETS",
      nom: "COFFRET MUSK TAHARA VANILLE 3PCS",
      type: "Coffret",
      prix: 25.00,
      image: getDubaiImage("coffret-musk-tahara-vanille1"),
      contenances: ["3 pièces"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "COFFRET",
      description: "Coffret 3 pièces Musk Tahara Vanille. Parfum, crème corps, savon. Vanille gourmande et pure."
    },
    {
      id: "1803",
      collection: "COFFRETS",
      nom: "COFFRET MUSK BLUEBERRY 3PCS",
      type: "Coffret",
      prix: 25.00,
      image: getDubaiImage("coffret-musk-blueberry1"),
      contenances: ["3 pièces"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "COFFRET",
      description: "Coffret 3 pièces Musk Blueberry. Parfum, crème corps, savon. Fraîcheur de myrtilles."
    },
    {
      id: "1804",
      collection: "COFFRETS",
      nom: "COFFRET MUSK TROPICAL FRUIT 3PCS",
      type: "Coffret",
      prix: 25.00,
      image: getDubaiImage("coffret-musk-tropical-fruit1"),
      contenances: ["3 pièces"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "COFFRET",
      description: "Coffret 3 pièces Musk Tropical Fruit. Parfum, crème corps, savon. Évasion tropicale."
    },
    {
      id: "1805",
      collection: "COFFRETS",
      nom: "COFFRET MUSK POMEGRENATE 3PCS",
      type: "Coffret",
      prix: 25.00,
      image: getDubaiImage("coffret-musk-pomegranate1"),
      contenances: ["3 pièces"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "COFFRET",
      description: "Coffret 3 pièces Musk Pomegranate. Parfum, crème corps, savon. Énergie de grenade."
    }
  ],

  /* ===================== BRUMES ===================== */
  "BRUMES": [
    {
      id: "1901",
      collection: "BRUMES",
      nom: "BRUME MUSK TROPICAL",
      type: "Brume",
      prix: 6.50,
      image: getDubaiImage("brume-musk-tropical1"),
      contenances: ["250ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "BRUME",
      description: "Brume corporelle Musk Tropical. Nuage de fruits tropicaux, hydratation légère. Fraîcheur instantanée."
    },
    {
      id: "1902",
      collection: "BRUMES",
      nom: "BRUME MUSK POMEGRENATE",
      type: "Brume",
      prix: 6.50,
      image: getDubaiImage("brume-musk-pomegranate1"),
      contenances: ["250ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "BRUME",
      description: "Brume corporelle Musk Pomegranate. Éclat de grenade, vitalité. Revitalise corps et esprit."
    },
    {
      id: "1903",
      collection: "BRUMES",
      nom: "HAIR MIST BINT HOORAN",
      type: "Brume Cheveux",
      prix: 6.00,
      image: getDubaiImage("hair-mist-bint-hooran1"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Brume pour cheveux Bint Hooran. Parfum léger, brillance, discipline. Cheveux de houris."
    },
    {
      id: "1904",
      collection: "BRUMES",
      nom: "HAIR MIST AJMAL BLOOM",
      type: "Brume Cheveux",
      prix: 6.00,
      image: getDubaiImage("hair-mist-ajmal-bloom"),
      contenances: ["100ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "SOINS",
      description: "Brume pour cheveux Ajmal Bloom. Floraison, fraîcheur, légèreté. Comme une couronne de fleurs."
    }
  ],

  /* ===================== AIR FRESHENERS ===================== */
  "AIR FRESHENERS": [
    {
      id: "2001",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER MAAHIR BLACK",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-maahir-black1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Maahir Black. Noir élégant, notes boisées. Maison sophistiquée."
    },
    {
      id: "2002",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER BADEE AL OUD NOIR",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-badee-al-oud-noir1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Badee Al Oud Noir. Oud noir pour la maison. Ambiance orientale luxueuse."
    },
    {
      id: "2003",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER RAMZ SILVER",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-ramz-silver1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Ramz Silver. Argent moderne, notes fraîches. Maison contemporaine."
    },
    {
      id: "2004",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER RAED LUXE",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-raed-luxe1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Raed Luxe. Luxe pour la maison. Ambiance 5 étoiles."
    },
    {
      id: "2005",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER QIMMAH",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-qimmah1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Qimmah. Dignité pour la maison. Ambiance noble et raffinée."
    },
    {
      id: "2006",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER FAKHAR LATTAFA",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-fakhar-lattafa"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Fakhar Lattafa. Fierté pour la maison. Ambiance confiante."
    },
    {
      id: "2007",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER AMEERAT AL ARAB",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-ameerat-al-arab"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Ameerat Al Arab. Princesse arabe pour la maison. Ambiance royale."
    },
    {
      id: "2008",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER I AM WHITE POUDRÉE",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-i-am-white-poudree"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner I Am White Poudrée. Blanc poudré pour la maison. Ambiance douce et délicate."
    },
    {
      id: "2009",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER I AM WHITE ANA ABIYADH",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-i-am-white-ana-abiydh"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner I Am White Ana Abiydh. Moi blanc pour la maison. Ambiance pure et propre."
    },
    {
      id: "2010",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER I AM WHITE ROUGE",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-i-am-white-rouge"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner I Am White Rouge. Rouge passion pour la maison. Ambiance chaleureuse."
    },
    {
      id: "2011",
      collection: "AIR FRESHENERS",
      nom: "AIR FRESHNER BADEE AL OUD SUBLIME",
      type: "Air Freshner",
      prix: 2.00,
      image: getDubaiImage("air-freshner-badee-al-oud-sublime1"),
      contenances: ["300ml"],
      origine: "Dubai, Émirats Arabes Unis",
      categorie: "MAISON",
      description: "Air Freshner Badee Al Oud Sublime. Oud sublime pour la maison. Ambiance divine."
    }
  ]
};


const mapTypeKey = (type) => {
  const t = (type || '').toLowerCase();
  if (t.includes('toilette')) return 'eauDeToilette';
  if (t.includes('extract') || t.includes('extrait')) return 'extract';
  if (t.includes('parfum')) return 'eauDeParfum';
  return null;
};

const mapCollectionKey = (collection) => {
  switch (collection) {
    case 'OUD DE DUBAI': return 'collections.oud_de_dubai';
    case 'GOLD DE DUBAI': return 'collections.gold_de_dubai';
    case 'DESERT DE DUBAI': return 'collections.desert_de_dubai';
    case 'ROYAL DE DUBAI': return 'collections.royal_de_dubai';
    case 'LATTAFA PRIDE': return 'collections.lattafa_pride';
    case 'MUSK COLLECTION': return 'collections.musk_collection';
    case 'KHAIR COLLECTION': return 'collections.khair_collection';
    case 'GULF ORCHID': return 'collections.gulf_orchid';
    case 'YARA COLLECTION': return 'collections.yara_collection';
    case 'AMEERAT COLLECTION': return 'collections.ameerat_collection';
    case 'OUD & ORIENTAL': return 'collections.oud_oriental';
    case 'FAKHAR COLLECTION': return 'collections.fakhar_collection';
    case 'PHILOS COLLECTION': return 'collections.philos_collection';
    case 'ITHRA COLLECTION': return 'collections.ithra_collection';
    case 'CRÈME & SOINS': return 'collections.creme_soins';
    case 'COLLECTION DIVERS': return 'collections.collection_divers';
    case 'EAU DE MILKY': return 'collections.eau_de_milky';
    case 'COFFRETS': return 'collections.coffrets';
    case 'BRUMES': return 'collections.brumes';
    case 'AIR FRESHENERS': return 'collections.air_fresheners';
    default: return null;
  }
};

Object.entries(produitsParMarque).forEach(([marque, items]) => {
  items.forEach((p) => {
    if (!p.typeKey) p.typeKey = mapTypeKey(p.type);
    if (!p.collectionKey) p.collectionKey = mapCollectionKey(p.collection || marque);
  });
});

/* ===================== HELPERS ===================== */

const toutesLesMarques = Object.keys(produitsParMarque);

const getProduitsByMarque = (marque) =>
  produitsParMarque[marque] || [];

const getAllProduits = () =>
  Object.values(produitsParMarque).flat();

module.exports = { produitsParMarque, toutesLesMarques, getProduitsByMarque, getAllProduits };
