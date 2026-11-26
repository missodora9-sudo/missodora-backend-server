// data/produitsData.js
// CATALOGUE OFFICIEL — Version BACKEND (CommonJS)

const getDubaiImage = (nom) =>
  `https://raw.githubusercontent.com/missodora9-sudo/missodora-backend-server/main/dubai/${nom}.png`;

const produitsParMarque = {

  "OUD DE DUBAI": [
    { id: "101", collection: "OUD DE DUBAI", nom: "DUBAI OUD ROYAL", type: "Eau de Parfum Homme", prix: 149.99, image: getDubaiImage("dubai-oud-royal1"), contenances: ["30ml", "50ml", "100ml"], description: "Un oud royal d'exception." },
    { id: "102", collection: "OUD DE DUBAI", nom: "MIDNIGHT OUD NOIR", type: "Eau de Parfum Homme", prix: 159.99, image: getDubaiImage("dubai-midnight-oud1"), contenances: ["50ml", "100ml"], description: "Oud noir mystérieux." },
    { id: "103", collection: "OUD DE DUBAI", nom: "OUD SAHARA", type: "Eau de Parfum Unisexe", prix: 139.99, image: getDubaiImage("dubai-oud-sahara1"), contenances: ["50ml", "100ml"], description: "Sables dorés du Sahara." },
    { id: "104", collection: "OUD DE DUBAI", nom: "AL KHALEEJ OUD", type: "Extrait de Parfum", prix: 249.99, image: getDubaiImage("dubai-al-khaleej-oud1"), contenances: ["15ml", "30ml"], status: "LIMITÉ", description: "Extrait pur d'oud du Golfe." }
  ],
    "GOLD DE DUBAI": [
    { id: "201", collection: "GOLD DE DUBAI", nom: "DUBAI GOLD ELIXIR", type: "Eau de Parfum Homme", prix: 179.99, image: getDubaiImage("dubai-gold-elixir1"), contenances: ["50ml", "100ml"], description: "Élixir doré aux paillettes d'or 24K." },
    { id: "202", collection: "GOLD DE DUBAI", nom: "BURJ KHALIFA GOLD", type: "Eau de Parfum Homme", prix: 199.99, image: getDubaiImage("dubai-burj-khalifa-gold1"), contenances: ["100ml"], description: "Inspiré par la plus haute tour du monde." },
    { id: "203", collection: "GOLD DE DUBAI", nom: "DESERT GOLD", type: "Eau de Parfum Femme", prix: 169.99, image: getDubaiImage("dubai-desert-gold1"), contenances: ["50ml", "100ml"], description: "L'or du désert en parfum." }
  ],
    "DESERT DE DUBAI": [
    { id: "301", collection: "DESERT DE DUBAI", nom: "DESERT NIGHT", type: "Eau de Parfum Homme", prix: 155.5, image: getDubaiImage("dubai-desert-night1"), contenances: ["50ml", "100ml"], description: "La nuit dans le désert d'Arabie." },
    { id: "302", collection: "DESERT DE DUBAI", nom: "SAHARA WINDS", type: "Eau de Parfum Unisexe", prix: 134.99, image: getDubaiImage("dubai-sahara-winds1"), contenances: ["100ml"], description: "Le vent chaud du Sahara." },
    { id: "303", collection: "DESERT DE DUBAI", nom: "OASIS SECRET", type: "Eau de Parfum Femme", prix: 149.99, image: getDubaiImage("dubai-oasis-secret1"), contenances: ["50ml", "100ml"], description: "Le secret d'une oasis cachée." }
  ],
    "ROYAL DE DUBAI": [
    { id: "401", collection: "ROYAL DE DUBAI", nom: "ROYAL BOUQUET", type: "Eau de Parfum Femme", prix: 192.99, image: getDubaiImage("dubai-royal-bouquet1"), contenances: ["50ml", "100ml"], description: "Bouquet royal de fleurs précieuses." },
    { id: "402", collection: "ROYAL DE DUBAI", nom: "EMIRI", type: "Extrait de Parfum", prix: 299.99, image: getDubaiImage("dubai-emiri1"), contenances: ["30ml"], status: "EXCLUSIF", description: "Extrait de parfum créé pour la famille royale." },
    { id: "403", collection: "ROYAL DE DUBAI", nom: "SHEIKH", type: "Eau de Parfum Homme", prix: 189.99, image: getDubaiImage("dubai-sheikh1"), contenances: ["100ml"], description: "Le parfum du pouvoir." }
  ],
    "LATTAFA PRIDE": [
    { id: "501", collection: "LATTAFA PRIDE", nom: "SHAHEEN SILVER", type: "Eau de Parfum Unisexe", prix: 39.00, image: getDubaiImage("lattafa-shaheen-silver1"), contenances: ["100ml"], status: "POPULAIRE", description: "Un best-seller du Moyen-Orient." },
    { id: "502", collection: "LATTAFA PRIDE", nom: "SHAHEEN GOLD", type: "Eau de Parfum", prix: 42.00, image: getDubaiImage("lattafa-shaheen-goldd1"), contenances: ["100ml"], description: "Version dorée du Shaheen." },
    { id: "503", collection: "LATTAFA PRIDE", nom: "AWAAN", type: "Eau de Parfum Unisexe", prix: 47.00, image: getDubaiImage("lattafa-awaam1"), contenances: ["100ml"], description: "Le nuage parfumé." },
    { id: "504", collection: "LATTAFA PRIDE", nom: "THARWAH SILVER", type: "Eau de Parfum Homme", prix: 48.00, image: getDubaiImage("lattafa-tharwah-silver"), contenances: ["100ml"], description: "Trésor argenté." },
    { id: "505", collection: "LATTAFA PRIDE", nom: "AL QIAM GOLD", type: "Eau de Parfum Unisexe", prix: 59.00, image: getDubaiImage("lattafa-al-qiam-gold1"), contenances: ["100ml"], description: "La valeur en or." }
  ],
    "MUSK COLLECTION": [
    { id: "601", collection: "MUSK COLLECTION", nom: "BLUEBERRY MUSK", type: "Eau de Parfum", prix: 49.00, image: getDubaiImage("musk-blueberry1"), contenances: ["100ml"], description: "Mûres bleues juteuses." },
    { id: "602", collection: "MUSK COLLECTION", nom: "CRANBERRY MUSK", type: "Eau de Parfum", prix: 13.00, image: getDubaiImage("musk-cranberry1"), contenances: ["100ml"], description: "Canneberges acidulées." },
    { id: "603", collection: "MUSK COLLECTION", nom: "ROYAL MUSK PURPLE", type: "Eau de Parfum", prix: 13.00, image: getDubaiImage("musk-royal-purple1"), contenances: ["100ml"], description: "Musc royal violet." },
    { id: "604", collection: "MUSK COLLECTION", nom: "ROYAL MUSK BLUE", type: "Eau de Parfum", prix: 13.00, image: getDubaiImage("musk-royal-blue1"), contenances: ["100ml"], description: "Musc royal bleu." },
    { id: "605", collection: "MUSK COLLECTION", nom: "ROYAL MUSK RUMAN", type: "Eau de Parfum", prix: 13.00, image: getDubaiImage("musk-royal-ruman1"), contenances: ["100ml"], description: "Musc romain." },
    { id: "606", collection: "MUSK COLLECTION", nom: "SILKY MUSK", type: "Eau de Parfum", prix: 14.00, image: getDubaiImage("musk-silky1"), contenances: ["100ml"], description: "Musc soyeux." },
    { id: "607", collection: "MUSK COLLECTION", nom: "MUSK MOOD", type: "Eau de Parfum", prix: 13.00, image: getDubaiImage("musk-mood1"), contenances: ["100ml"], description: "L'humeur en musc." },
    { id: "608", collection: "MUSK COLLECTION", nom: "PURE MUSK LAIT", type: "Eau de Parfum", prix: 8.00, image: getDubaiImage("musk-pure-lait1"), contenances: ["100ml"], description: "Musc pur lacté." }
  ],
    "KHAIR COLLECTION": [
    { id: "701", collection: "KHAIR COLLECTION", nom: "KHAIR FUSION", type: "Eau de Parfum", prix: 14.00, image: getDubaiImage("khair-fusion1"), contenances: ["100ml"], description: "Fusion moderne de notes orientales." },
    { id: "702", collection: "KHAIR COLLECTION", nom: "KHAIR PISTACHIO", type: "Eau de Parfum", prix: 14.00, image: getDubaiImage("khair-pistachio1"), contenances: ["100ml"], description: "Pistache gourmande." },
    { id: "703", collection: "KHAIR COLLECTION", nom: "KHAIR", type: "Eau de Parfum", prix: 14.00, image: getDubaiImage("khair-original1"), contenances: ["100ml"], description: "Le classique Khair." }
  ]

};

module.exports = { produitsParMarque };