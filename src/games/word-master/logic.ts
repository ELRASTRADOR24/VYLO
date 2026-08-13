export type WordMasterCategory = 
  | "Toutes"
  | "Pop Culture & Cinéma"
  | "Vie Quotidienne & Cuisine"
  | "Sports & Célébrités"
  | "Voyages & Nature";

export interface TabooCard {
  id: string;
  targetWord: string;
  forbiddenWords: [string, string, string, string];
  category: WordMasterCategory;
}

export const WORD_MASTER_CATEGORIES: WordMasterCategory[] = [
  "Toutes",
  "Pop Culture & Cinéma",
  "Vie Quotidienne & Cuisine",
  "Sports & Célébrités",
  "Voyages & Nature"
];

export const TABOO_DATABASE: TabooCard[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 🎬 POP CULTURE & CINÉMA (25 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "pc1", targetWord: "Harry Potter", forbiddenWords: ["Sorcier", "Magie", "Poudlard", "Lunettes"], category: "Pop Culture & Cinéma" },
  { id: "pc2", targetWord: "Titanic", forbiddenWords: ["Bateau", "Iceberg", "Noyade", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc3", targetWord: "Star Wars", forbiddenWords: ["Espace", "Sabre", "Vador", "Jedi"], category: "Pop Culture & Cinéma" },
  { id: "pc4", targetWord: "Batman", forbiddenWords: ["Chauve-souris", "Héros", "Joker", "Gotham"], category: "Pop Culture & Cinéma" },
  { id: "pc5", targetWord: "Netflix", forbiddenWords: ["Série", "Film", "Streaming", "Écran"], category: "Pop Culture & Cinéma" },
  { id: "pc6", targetWord: "Spider-Man", forbiddenWords: ["Araignée", "Costume", "Peter", "Toile"], category: "Pop Culture & Cinéma" },
  { id: "pc7", targetWord: "Barbie", forbiddenWords: ["Rose", "Poupée", "Ken", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc8", targetWord: "Avengers", forbiddenWords: ["Marvel", "Héros", "Thor", "Thanos"], category: "Pop Culture & Cinéma" },
  { id: "pc9", targetWord: "Avatar", forbiddenWords: ["Bleu", "Pandora", "Cameron", "Cinéma"], category: "Pop Culture & Cinéma" },
  { id: "pc10", targetWord: "Squid Game", forbiddenWords: ["Corée", "Série", "Jeu", "Gagnant"], category: "Pop Culture & Cinéma" },
  { id: "pc11", targetWord: "Inception", forbiddenWords: ["Rêve", "Toupie", "DiCaprio", "Sommeil"], category: "Pop Culture & Cinéma" },
  { id: "pc12", targetWord: "Stranger Things", forbiddenWords: ["Eleven", "Démogorgon", "Série", "Monde"], category: "Pop Culture & Cinéma" },
  { id: "pc13", targetWord: "Shrek", forbiddenWords: ["Ogre", "Vert", "Âne", "Marais"], category: "Pop Culture & Cinéma" },
  { id: "pc14", targetWord: "Matrix", forbiddenWords: ["Pilule", "Neo", "Réalité", "Virtuel"], category: "Pop Culture & Cinéma" },
  { id: "pc15", targetWord: "La Reine des Neiges", forbiddenWords: ["Elsa", "Glace", "Chanson", "Neige"], category: "Pop Culture & Cinéma" },
  { id: "pc16", targetWord: "Super Mario", forbiddenWords: ["Plombier", "Casquette", "Nintendo", "Moustache"], category: "Pop Culture & Cinéma" },
  { id: "pc17", targetWord: "Pikachu", forbiddenWords: ["Jaune", "Éclair", "Pokémon", "Souris"], category: "Pop Culture & Cinéma" },
  { id: "pc18", targetWord: "Le Roi Lion", forbiddenWords: ["Simba", "Savane", "Hakuna", "Dessin"], category: "Pop Culture & Cinéma" },
  { id: "pc19", targetWord: "Jurassic Park", forbiddenWords: ["Dinosaure", "Parc", "T-Rex", "Île"], category: "Pop Culture & Cinéma" },
  { id: "pc20", targetWord: "Pirates des Caraïbes", forbiddenWords: ["Jack", "Bateau", "Capitaine", "Mer"], category: "Pop Culture & Cinéma" },
  { id: "pc21", targetWord: "Voldemort", forbiddenWords: ["Méchant", "Nez", "Serpent", "Harry"], category: "Pop Culture & Cinéma" },
  { id: "pc22", targetWord: "James Bond", forbiddenWords: ["Agent", "007", "Espion", "Martini"], category: "Pop Culture & Cinéma" },
  { id: "pc23", targetWord: "Fast & Furious", forbiddenWords: ["Voiture", "Course", "Vin Diesel", "Vitesse"], category: "Pop Culture & Cinéma" },
  { id: "pc24", targetWord: "Disney", forbiddenWords: ["Château", "Souris", "Dessin animé", "Parc"], category: "Pop Culture & Cinéma" },
  { id: "pc25", targetWord: "Game of Thrones", forbiddenWords: ["Trône", "Dragon", "Stark", "Série"], category: "Pop Culture & Cinéma" },

  // ══════════════════════════════════════════════════════════════════════════
  // 🍕 VIE QUOTIDIENNE & CUISINE (25 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "vq1", targetWord: "Pizza", forbiddenWords: ["Italie", "Fromage", "Pâte", "Sauce"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq2", targetWord: "Café", forbiddenWords: ["Chaud", "Matin", "Tasse", "Expresso"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq3", targetWord: "Réveil", forbiddenWords: ["Matin", "Alarme", "Lit", "Dormir"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq4", targetWord: "Chocolat", forbiddenWords: ["Cacao", "Sucré", "Noir", "Gâteau"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq5", targetWord: "Smartphone", forbiddenWords: ["Téléphone", "Écran", "Appeler", "SMS"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq6", targetWord: "Nutella", forbiddenWords: ["Pâte", "Noisette", "Chocolat", "Tartine"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq7", targetWord: "Baguette", forbiddenWords: ["Pain", "Boulangerie", "Farine", "Français"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq8", targetWord: "Frigo", forbiddenWords: ["Froid", "Cuisine", "Nourriture", "Glace"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq9", targetWord: "Machine à laver", forbiddenWords: ["Linge", "Propre", "Tambour", "Lessive"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq10", targetWord: "Hamburger", forbiddenWords: ["Fast-food", "Pain", "Steak", "Frites"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq11", targetWord: "Miroir", forbiddenWords: ["Reflet", "Glace", "Visage", "Regarder"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq12", targetWord: "Parapluie", forbiddenWords: ["Pluie", "Eau", "Gouttes", "Protéger"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq13", targetWord: "Croissant", forbiddenWords: ["Matin", "Beurre", "Viennoiserie", "Boulangerie"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq14", targetWord: "Lit", forbiddenWords: ["Dormir", "Sommeil", "Matelas", "Oreiller"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq15", targetWord: "Vélo", forbiddenWords: ["Roue", "Pédale", "Casque", "Guidon"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq16", targetWord: "Douche", forbiddenWords: ["Eau", "Savon", "Salle de bain", "Laver"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq17", targetWord: "Clé", forbiddenWords: ["Serrure", "Porte", "Fermer", "Trousseau"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq18", targetWord: "Lunettes", forbiddenWords: ["Yeux", "Vue", "Verres", "Nez"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq19", targetWord: "Tacos", forbiddenWords: ["Mexique", "Sauce", "Viande", "Galette"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq20", targetWord: "Gâteau", forbiddenWords: ["Anniversaire", "Bougie", "Sucre", "Dessert"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq21", targetWord: "Canapé", forbiddenWords: ["Salon", "Assis", "Télé", "Coussin"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq22", targetWord: "Aspirateur", forbiddenWords: ["Poussière", "Ménage", "Aspirer", "Bruit"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq23", targetWord: "Valise", forbiddenWords: ["Voyage", "Bagage", "Roulettes", "Vêtements"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq24", targetWord: "Ascenseur", forbiddenWords: ["Étage", "Bâtiment", "Monter", "Descendre"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq25", targetWord: "Horloge", forbiddenWords: ["Heure", "Temps", "Aiguille", "Mur"], category: "Vie Quotidienne & Cuisine" },

  // ══════════════════════════════════════════════════════════════════════════
  // ⚽ SPORTS & CÉLÉBRITÉS (25 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "sc1", targetWord: "Football", forbiddenWords: ["Ballon", "But", "Joueur", "Stade"], category: "Sports & Célébrités" },
  { id: "sc2", targetWord: "Tennis", forbiddenWords: ["Raquette", "Balle", "Filet", "Roland-Garros"], category: "Sports & Célébrités" },
  { id: "sc3", targetWord: "Kylian Mbappé", forbiddenWords: ["Foot", "PSG", "Real", "Attaquant"], category: "Sports & Célébrités" },
  { id: "sc4", targetWord: "Natation", forbiddenWords: ["Eau", "Piscine", "Nager", "Maillot"], category: "Sports & Célébrités" },
  { id: "sc5", targetWord: "Boxe", forbiddenWords: ["Gants", "Ring", "Combat", "Coup"], category: "Sports & Célébrités" },
  { id: "sc6", targetWord: "Basketball", forbiddenWords: ["Panier", "Ballon", "NBA", "Dribble"], category: "Sports & Célébrités" },
  { id: "sc7", targetWord: "Cristiano Ronaldo", forbiddenWords: ["CR7", "Portugal", "Foot", "But"], category: "Sports & Célébrités" },
  { id: "sc8", targetWord: "Lionel Messi", forbiddenWords: ["Argentine", "Ballon d'Or", "Barça", "Foot"], category: "Sports & Célébrités" },
  { id: "sc9", targetWord: "Formule 1", forbiddenWords: ["Voiture", "Circuit", "Pilote", "Vitesse"], category: "Sports & Célébrités" },
  { id: "sc10", targetWord: "Judo", forbiddenWords: ["Kimono", "Ceinture", "Tatami", "Combat"], category: "Sports & Célébrités" },
  { id: "sc11", targetWord: "Tour de France", forbiddenWords: ["Vélo", "Maillot jaune", "Étape", "Cyclisme"], category: "Sports & Célébrités" },
  { id: "sc12", targetWord: "Rugby", forbiddenWords: ["Ballon ovale", "Plaquage", "Essai", "Poteaux"], category: "Sports & Célébrités" },
  { id: "sc13", targetWord: "Équitation", forbiddenWords: ["Cheval", "Selle", "Galop", "Cavalier"], category: "Sports & Célébrités" },
  { id: "sc14", targetWord: "Skateboard", forbiddenWords: ["Roue", "Planche", "Trick", "Rampe"], category: "Sports & Célébrités" },
  { id: "sc15", targetWord: "Ski", forbiddenWords: ["Neige", "Montagne", "Piste", "Bâtons"], category: "Sports & Célébrités" },
  { id: "sc16", targetWord: "Marathon", forbiddenWords: ["Course", "42 km", "Courir", "Épuisement"], category: "Sports & Célébrités" },
  { id: "sc17", targetWord: "Beyoncé", forbiddenWords: ["Chanteuse", "Pop", "Queen", "Musique"], category: "Sports & Célébrités" },
  { id: "sc18", targetWord: "Michael Jackson", forbiddenWords: ["Pop", "Danse", "Moonwalk", "Chanteur"], category: "Sports & Célébrités" },
  { id: "sc19", targetWord: "Dwayne Johnson", forbiddenWords: ["The Rock", "Muscle", "Acteur", "Catch"], category: "Sports & Célébrités" },
  { id: "sc20", targetWord: "Zinedine Zidane", forbiddenWords: ["Tête", "1998", "Bleus", "Foot"], category: "Sports & Célébrités" },
  { id: "sc21", targetWord: "Golf", forbiddenWords: ["Trou", "Balle", "Club", "Gazon"], category: "Sports & Célébrités" },
  { id: "sc22", targetWord: "Surf", forbiddenWords: ["Vague", "Mer", "Planche", "Océan"], category: "Sports & Célébrités" },
  { id: "sc23", targetWord: "Gymnastique", forbiddenWords: ["Souplesse", "Équilibre", "Sol", "Poutre"], category: "Sports & Célébrités" },
  { id: "sc24", targetWord: "Céline Dion", forbiddenWords: ["Chanteuse", "Voix", "Titanic", "Québec"], category: "Sports & Célébrités" },
  { id: "sc25", targetWord: "Teddy Riner", forbiddenWords: ["Judo", "Champion", "Lourd", "Kimono"], category: "Sports & Célébrités" },

  // ══════════════════════════════════════════════════════════════════════════
  // 🌴 VOYAGES & NATURE (25 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "vn1", targetWord: "Plage", forbiddenWords: ["Sable", "Mer", "Soleil", "Vacances"], category: "Voyages & Nature" },
  { id: "vn2", targetWord: "Avion", forbiddenWords: ["Voler", "Ciel", "Pilote", "Aéroport"], category: "Voyages & Nature" },
  { id: "vn3", targetWord: "Montagne", forbiddenWords: ["Neige", "Ski", "Sommet", "Altitude"], category: "Voyages & Nature" },
  { id: "vn4", targetWord: "Forêt", forbiddenWords: ["Arbres", "Bois", "Feuilles", "Nature"], category: "Voyages & Nature" },
  { id: "vn5", targetWord: "Désert", forbiddenWords: ["Sable", "Chaud", "Chameau", "Dune"], category: "Voyages & Nature" },
  { id: "vn6", targetWord: "Tour Eiffel", forbiddenWords: ["Paris", "France", "Monument", "Fer"], category: "Voyages & Nature" },
  { id: "vn7", targetWord: "Pyramides", forbiddenWords: ["Égypte", "Pharaon", "Tombeau", "Désert"], category: "Voyages & Nature" },
  { id: "vn8", targetWord: "Volcan", forbiddenWords: ["Lave", "Éruption", "Magma", "Cendres"], category: "Voyages & Nature" },
  { id: "vn9", targetWord: "Océan", forbiddenWords: ["Mer", "Eau", "Poisson", "Vague"], category: "Voyages & Nature" },
  { id: "vn10", targetWord: "Neige", forbiddenWords: ["Hiver", "Blanc", "Froid", "Flocon"], category: "Voyages & Nature" },
  { id: "vn11", targetWord: "Cascade", forbiddenWords: ["Eau", "Chute", "Rivière", "Roche"], category: "Voyages & Nature" },
  { id: "vn12", targetWord: "Camping", forbiddenWords: ["Tente", "Sac de couchage", "Feu", "Nature"], category: "Voyages & Nature" },
  { id: "vn13", targetWord: "Passeport", forbiddenWords: ["Voyage", "Douane", "Visa", "Pays"], category: "Voyages & Nature" },
  { id: "vn14", targetWord: "Île", forbiddenWords: ["Eau", "Mer", "Plage", "Isolé"], category: "Voyages & Nature" },
  { id: "vn15", targetWord: "Soleil", forbiddenWords: ["Chaud", "Lumière", "Jour", "Étoile"], category: "Voyages & Nature" },
  { id: "vn16", targetWord: "Tempête", forbiddenWords: ["Vent", "Pluie", "Éclair", "Tonnerre"], category: "Voyages & Nature" },
  { id: "vn17", targetWord: "Coucher de soleil", forbiddenWords: ["Ciel", "Rouge", "Soir", "Horizon"], category: "Voyages & Nature" },
  { id: "vn18", targetWord: "Grotte", forbiddenWords: ["Sombre", "Roche", "Pierre", "Caverne"], category: "Voyages & Nature" },
  { id: "vn19", targetWord: "Arc-en-ciel", forbiddenWords: ["Couleurs", "Pluie", "Ciel", "Soleil"], category: "Voyages & Nature" },
  { id: "vn20", targetWord: "Globe terrestre", forbiddenWords: ["Pays", "Géographie", "Carte", "Continents"], category: "Voyages & Nature" },
  { id: "vn21", targetWord: "Statue de la Liberté", forbiddenWords: ["New York", "Amérique", "Torche", "Île"], category: "Voyages & Nature" },
  { id: "vn22", targetWord: "Jungle", forbiddenWords: ["Tarzan", "Animaux", "Arbres", "Tropical"], category: "Voyages & Nature" },
  { id: "vn23", targetWord: "Boussole", forbiddenWords: ["Nord", "Direction", "Aiguille", "Perdu"], category: "Voyages & Nature" },
  { id: "vn24", targetWord: "Lune", forbiddenWords: ["Nuit", "Ciel", "Cratère", "Étoiles"], category: "Voyages & Nature" },
  { id: "vn25", targetWord: "Aurore boréale", forbiddenWords: ["Vert", "Nuit", "Ciel", "Lumière"], category: "Voyages & Nature" },
];

const usedTabooIdsHistory = new Set<string>();

/** Réinitialiser l'historique des mots tirés */
export function resetWordMasterHistory(): void {
  usedTabooIdsHistory.clear();
}

/** Tirer une carte Tabou aléatoire sans répétition dans la session */
export function getRandomTabooCard(category: WordMasterCategory = "Toutes"): TabooCard {
  let pool = TABOO_DATABASE;
  if (category !== "Toutes") {
    pool = TABOO_DATABASE.filter(c => c.category === category);
  }
  if (pool.length === 0) pool = TABOO_DATABASE;

  // Filtrer les cartes déjà tirées dans cette session
  let availablePool = pool.filter(c => !usedTabooIdsHistory.has(c.id));

  // Si toutes les cartes de la catégorie ont été tirées, réinitialiser la mémoire de la catégorie
  if (availablePool.length === 0) {
    pool.forEach(c => usedTabooIdsHistory.delete(c.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedTabooIdsHistory.add(chosen.id);

  return chosen;
}
