import { Player } from "@/engine/types";

export type FakeArtistRole = "Artist" | "FakeArtist";

export interface PlayerColor {
  hex: string;
  name: string;
  badgeClass: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const PLAYER_COLORS: PlayerColor[] = [
  { hex: "#EF4444", name: "Rouge", badgeClass: "bg-red-500/20 text-red-400 border-red-500/30", bgClass: "bg-red-500", borderClass: "border-red-500", textClass: "text-red-400" },
  { hex: "#3B82F6", name: "Bleu", badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30", bgClass: "bg-blue-500", borderClass: "border-blue-500", textClass: "text-blue-400" },
  { hex: "#10B981", name: "Vert", badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", bgClass: "bg-emerald-500", borderClass: "border-emerald-500", textClass: "text-emerald-400" },
  { hex: "#F59E0B", name: "Jaune", badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30", bgClass: "bg-amber-500", borderClass: "border-amber-500", textClass: "text-amber-400" },
  { hex: "#8B5CF6", name: "Violet", badgeClass: "bg-purple-500/20 text-purple-400 border-purple-500/30", bgClass: "bg-purple-500", borderClass: "border-purple-500", textClass: "text-purple-400" },
  { hex: "#EC4899", name: "Rose", badgeClass: "bg-pink-500/20 text-pink-400 border-pink-500/30", bgClass: "bg-pink-500", borderClass: "border-pink-500", textClass: "text-pink-400" },
  { hex: "#06B6D4", name: "Cyan", badgeClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", bgClass: "bg-cyan-500", borderClass: "border-cyan-500", textClass: "text-cyan-400" },
  { hex: "#F97316", name: "Orange", badgeClass: "bg-orange-500/20 text-orange-400 border-orange-500/30", bgClass: "bg-orange-500", borderClass: "border-orange-500", textClass: "text-orange-400" },
  { hex: "#84CC16", name: "Lime", badgeClass: "bg-lime-500/20 text-lime-400 border-lime-500/30", bgClass: "bg-lime-500", borderClass: "border-lime-500", textClass: "text-lime-400" },
  { hex: "#6366F1", name: "Indigo", badgeClass: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", bgClass: "bg-indigo-500", borderClass: "border-indigo-500", textClass: "text-indigo-400" },
  { hex: "#14B8A6", name: "Teal", badgeClass: "bg-teal-500/20 text-teal-400 border-teal-500/30", bgClass: "bg-teal-500", borderClass: "border-teal-500", textClass: "text-teal-400" },
  { hex: "#E11D48", name: "Framboise", badgeClass: "bg-rose-500/20 text-rose-400 border-rose-500/30", bgClass: "bg-rose-500", borderClass: "border-rose-500", textClass: "text-rose-400" },
];

export interface FakeArtistPlayer extends Player {
  gameRole: FakeArtistRole;
  color: PlayerColor;
  isEliminated: boolean;
  scorePoints: number;
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawingStroke {
  playerId: string;
  playerName: string;
  color: string;
  points: DrawingPoint[];
  round: number;
}

export interface DrawingWordItem {
  word: string;
  category: string;
  hint?: string;
}

export const FAKE_ARTIST_CATEGORIES = [
  "Toutes les catégories",
  "Nourriture & Boissons",
  "Animaux du Monde",
  "Objets du Quotidien",
  "Monuments & Lieux Célèbres",
  "Pop Culture, Manga & Super-Héros",
  "Sports, Métiers & Loisirs",
  "Mode Expert",
  "✨ Mots Personnalisés"
] as const;

export type FakeArtistCategoryName = typeof FAKE_ARTIST_CATEGORIES[number];

export const DRAWING_WORDS_DATABASE: DrawingWordItem[] = [
  // Nourriture & Boissons
  { word: "Pizza", category: "Nourriture & Boissons", hint: "Plat italien rond et découpé en parts" },
  { word: "Hamburger", category: "Nourriture & Boissons", hint: "Sandwich avec pain rond, steak et fromage" },
  { word: "Croissant", category: "Nourriture & Boissons", hint: "Viennoiserie française en forme de croissant de lune" },
  { word: "Sushi", category: "Nourriture & Boissons", hint: "Spécialité japonaise au riz et poisson cru" },
  { word: "Glace en cornet", category: "Nourriture & Boissons", hint: "Boules de crème glacée sur un cornet gaufré" },
  { word: "Tasse de café", category: "Nourriture & Boissons", hint: "Boisson chaude fumante dans une tasse" },
  { word: "Donut", category: "Nourriture & Boissons", hint: "Pâtisserie ronde avec un trou au milieu et glaçage" },
  { word: "Pop-corn", category: "Nourriture & Boissons", hint: "Maïs soufflé que l'on mange au cinéma" },
  { word: "Pomme", category: "Nourriture & Boissons", hint: "Fruit croquant rouge ou vert" },
  { word: "Banane", category: "Nourriture & Boissons", hint: "Fruit jaune courbé facile à éplucher" },
  { word: "Pastèque", category: "Nourriture & Boissons", hint: "Gros fruit vert avec chair rouge et pépins noirs" },
  { word: "Bouteille de champagne", category: "Nourriture & Boissons", hint: "Bouteille festive avec bouchon qui saute" },
  { word: "Avocat", category: "Nourriture & Boissons", hint: "Fruit vert à gros noyau" },
  { word: "Frites", category: "Nourriture & Boissons", hint: "Bâtonnets de pomme de terre croustillants" },
  { word: "Chocolat", category: "Nourriture & Boissons", hint: "Tablette découpée en carrés" },

  // Animaux du Monde
  { word: "Éléphant", category: "Animaux du Monde", hint: "Grand mammifère avec trompe et grandes oreilles" },
  { word: "Girafe", category: "Animaux du Monde", hint: "Animal au très long cou avec taches" },
  { word: "Chat", category: "Animaux du Monde", hint: "Félin domestique avec moustaches et oreilles pointues" },
  { word: "Chien", category: "Animaux du Monde", hint: "Animal fidèle qui remue la queue et aboie" },
  { word: "Requin", category: "Animaux du Monde", hint: "Prédateur des mers avec un aileron triangulaire" },
  { word: "Papillon", category: "Animaux du Monde", hint: "Insecte aux grandes ailes colorées et symétriques" },
  { word: "Lion", category: "Animaux du Monde", hint: "Roi de la savane avec une grande crinière" },
  { word: "Serpent", category: "Animaux du Monde", hint: "Reptile allongé sans pattes qui ondule" },
  { word: "Pingouin", category: "Animaux du Monde", hint: "Oiseau noir et blanc qui vit sur la banquise" },
  { word: "Tortue", category: "Animaux du Monde", hint: "Animal à carapace dure qui se déplace lentement" },
  { word: "Pieuvre", category: "Animaux du Monde", hint: "Créature marine à 8 tentacules et ventouses" },
  { word: "Dinosaure T-Rex", category: "Animaux du Monde", hint: "Monstre préhistorique aux petits bras et grandes dents" },
  { word: "Grenouille", category: "Animaux du Monde", hint: "Amphibien vert qui saute et coasse" },
  { word: "Abeille", category: "Animaux du Monde", hint: "Insecte rayé jaune et noir qui fait du miel" },
  { word: "Kangourou", category: "Animaux du Monde", hint: "Animal australien qui saute avec une poche ventrale" },

  // Objets du Quotidien
  { word: "Smartphone", category: "Objets du Quotidien", hint: "Écran rectangulaire tactile avec objectif photo" },
  { word: "Guitare", category: "Objets du Quotidien", hint: "Instrument de musique à cordes avec manche et caisse" },
  { word: "Vélo", category: "Objets du Quotidien", hint: "Deux roues, un guidon et des pédales" },
  { word: "Parapluie", category: "Objets du Quotidien", hint: "Toile courbée avec manche pour s'abriter de la pluie" },
  { word: "Lunettes de soleil", category: "Objets du Quotidien", hint: "Monture à verres foncés pour protéger les yeux" },
  { word: "Montre", category: "Objets du Quotidien", hint: "Cadran rond avec aiguilles et bracelet pour le poignet" },
  { word: "Clé", category: "Objets du Quotidien", hint: "Objet en métal cranté pour ouvrir une serrure" },
  { word: "Ciseaux", category: "Objets du Quotidien", hint: "Outil à deux lames croisées avec anneaux pour les doigts" },
  { word: "Chaussure à talon", category: "Objets du Quotidien", hint: "Chaussure élégante avec un talon haut pointu" },
  { word: "Ampoule", category: "Objets du Quotidien", hint: "Verre en poire avec filament qui s'illumine" },
  { word: "Brosse à dents", category: "Objets du Quotidien", hint: "Manche avec poils pour se laver les dents" },
  { word: "Casque audio", category: "Objets du Quotidien", hint: "Arceau avec deux écouteurs pour écouter de la musique" },
  { word: "Valise", category: "Objets du Quotidien", hint: "Bagage rectangulaire à roulettes et poignée rétractable" },
  { word: "Réveil", category: "Objets du Quotidien", hint: "Horloge avec deux cloches métalliques sur le dessus" },
  { word: "Crayon de papier", category: "Objets du Quotidien", hint: "Bâtonnet en bois avec mine taillée et gomme au bout" },

  // Monuments & Lieux Célèbres
  { word: "Tour Eiffel", category: "Monuments & Lieux Célèbres", hint: "Grande tour métallique parisienne à trois étages" },
  { word: "Pyramide d'Égypte", category: "Monuments & Lieux Célèbres", hint: "Monument triangulaire antique dans le désert" },
  { word: "Statue de la Liberté", category: "Monuments & Lieux Célèbres", hint: "Statue verte à New York avec torche et couronne" },
  { word: "Château fort", category: "Monuments & Lieux Célèbres", hint: "Forteresse médiévale avec tours crénelées et pont-levis" },
  { word: "Volcan en éruption", category: "Monuments & Lieux Célèbres", hint: "Montagne qui crache de la lave et de la fumée" },
  { word: "Phare de bord de mer", category: "Monuments & Lieux Célèbres", hint: "Haute tour rayée avec faisceau lumineux pour les bateaux" },
  { word: "Île déserte avec palmier", category: "Monuments & Lieux Célèbres", hint: "Bout de sable rond au milieu de l'eau avec 1 palmier" },
  { word: "Station spatiale", category: "Monuments & Lieux Célèbres", hint: "Laboratoire orbital avec panneaux solaires dans l'espace" },
  { word: "Moulin à vent", category: "Monuments & Lieux Célèbres", hint: "Bâtiment avec quatre grandes pales tournantes" },
  { word: "Pont suspendu", category: "Monuments & Lieux Célèbres", hint: "Pont tenu par de grands câbles au-dessus de l'eau" },

  // Pop Culture, Manga & Super-Héros
  { word: "Pikachu", category: "Pop Culture, Manga & Super-Héros", hint: "Souris jaune avec joues rouges et queue en éclair" },
  { word: "Batman", category: "Pop Culture, Manga & Super-Héros", hint: "Héros masqué avec oreilles de chauve-souris et cape" },
  { word: "Mario", category: "Pop Culture, Manga & Super-Héros", hint: "Plombier moustachu avec casquette rouge et salopette" },
  { word: "Harry Potter", category: "Pop Culture, Manga & Super-Héros", hint: "Sorcier à lunettes rondes avec cicatrice en éclair" },
  { word: "Sabre laser", category: "Pop Culture, Manga & Super-Héros", hint: "Arme de Jedi avec manche et lame d'énergie lumineuse" },
  { word: "Spider-Man", category: "Pop Culture, Manga & Super-Héros", hint: "Héros qui tisse des toiles avec masque à motif araignée" },
  { word: "Fusée spatiale", category: "Pop Culture, Manga & Super-Héros", hint: "Engin pointu avec ailerons et flammes au décollage" },
  { word: "Bonhomme de neige", category: "Pop Culture, Manga & Super-Héros", hint: "Trois boules de neige, nez en carotte et chapeau" },
  { word: "Fantôme", category: "Pop Culture, Manga & Super-Héros", hint: "Silhouette blanche flottante avec yeux noirs" },
  { word: "Licorne", category: "Pop Culture, Manga & Super-Héros", hint: "Cheval magique avec une corne torsadée sur le front" },

  // Sports, Métiers & Loisirs
  { word: "Ballon de football", category: "Sports, Métiers & Loisirs", hint: "Ballon sphérique avec pentagones noirs et blancs" },
  { word: "Planche de surf", category: "Sports, Métiers & Loisirs", hint: "Planche profilée qui glisse sur une vague" },
  { word: "Raquette de tennis", category: "Sports, Métiers & Loisirs", hint: "Cadre ovale avec cordage et balle jaune" },
  { word: "Skateboard", category: "Sports, Métiers & Loisirs", hint: "Planche en bois avec 4 petites roues pour rouler" },
  { word: "Gant de boxe", category: "Sports, Métiers & Loisirs", hint: "Gros gant rembourré en cuir rouge" },
  { word: "Pompier avec lance à eau", category: "Sports, Métiers & Loisirs", hint: "Casque brillant et jet d'eau puissant" },
  { word: "Astronaute", category: "Sports, Métiers & Loisirs", hint: "Combinaison blanche pressurisée avec grand casque vitré" },
  { word: "Médecin avec stéthoscope", category: "Sports, Métiers & Loisirs", hint: "Blouse blanche avec stéthoscope autour du cou" },
  { word: "Pêcheur avec canne à pêche", category: "Sports, Métiers & Loisirs", hint: "Canne courbée avec fil et poisson au bout" },
  { word: "Cuisinier avec toque", category: "Sports, Métiers & Loisirs", hint: "Grande toque blanche sur la tête et spatule" },

  // Mode Expert
  { word: "Mona Lisa", category: "Mode Expert", hint: "Portrait célèbre de Léonard de Vinci au sourire mystérieux" },
  { word: "Caméléon", category: "Mode Expert", hint: "Reptile aux yeux indépendants et queue en spirale" },
  { word: "Sous-marin", category: "Mode Expert", hint: "Vaisseau submersible avec périscope et hublots" },
  { word: "Soucoupe volante extraterrestre", category: "Mode Expert", hint: "Vaisseau discoïde avec dôme en verre et faisceau" },
  { word: "Sablier", category: "Mode Expert", hint: "Deux ampoules de verre avec du sable fin qui s'écoule" },
  { word: "Microscope", category: "Mode Expert", hint: "Appareil optique de laboratoire avec objectifs et platine" },
  { word: "Montgolfière", category: "Mode Expert", hint: "Grand ballon gonflé d'air chaud avec nacelle suspendue" },
  { word: "Sphinx", category: "Mode Expert", hint: "Créature égyptienne à corps de lion et tête humaine" },
  { word: "Chapeau de magicien avec lapin", category: "Mode Expert", hint: "Haut-de-forme noir duquel sortent deux oreilles" },
  { word: "Arc-en-ciel", category: "Mode Expert", hint: "Sept arches de couleurs qui traversent les nuages" },
];

const usedWordsHistory = new Set<string>();

/** Tirage aléatoire d'un mot selon les catégories */
export function getRandomDrawingWord(
  categories: FakeArtistCategoryName | FakeArtistCategoryName[],
  customWords: Array<{ word: string; category?: string; hint?: string }> = []
): DrawingWordItem {
  let pool = [...DRAWING_WORDS_DATABASE];

  if (customWords.length > 0) {
    const formattedCustom: DrawingWordItem[] = customWords.map(c => ({
      word: c.word,
      category: c.category || "✨ Mots Personnalisés",
      hint: c.hint || "Mot personnalisé"
    }));
    pool = [...pool, ...formattedCustom];
  }

  if (Array.isArray(categories)) {
    if (!categories.includes("Toutes les catégories") && categories.length > 0) {
      pool = pool.filter(w => categories.includes(w.category as FakeArtistCategoryName));
    }
  } else if (categories !== "Toutes les catégories") {
    pool = pool.filter(w => w.category === categories);
  }

  if (pool.length === 0) pool = DRAWING_WORDS_DATABASE;

  // Filtrer les mots déjà tirés dans cette session
  let availablePool = pool.filter(w => !usedWordsHistory.has(w.word.toLowerCase()));
  if (availablePool.length === 0) {
    usedWordsHistory.clear();
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedWordsHistory.add(chosen.word.toLowerCase());
  return chosen;
}

/** Génération aléatoire des rôles (Vrais Artistes vs Faux Artiste) */
export function generateFakeArtistRoles(
  playerCount: number,
  fakeArtistCount: number = 1
): FakeArtistRole[] {
  const roles: FakeArtistRole[] = [];
  const fakeCount = Math.max(1, Math.min(playerCount - 2, fakeArtistCount));
  const artistCount = playerCount - fakeCount;

  for (let i = 0; i < artistCount; i++) roles.push("Artist");
  for (let i = 0; i < fakeCount; i++) roles.push("FakeArtist");

  // Fisher-Yates shuffle
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}

/** Normalisation pour la vérification floue du mot deviné par le Faux Artiste */
export function normalizeWord(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/[^a-z0-9]/g, "")       // Garde lettres et chiffres
    .trim();
}

/** Vérifie si la devinette du Faux Artiste correspond au mot secret */
export function checkFakeArtistGuess(guess: string, secretWord: string): boolean {
  const normGuess = normalizeWord(guess);
  const normSecret = normalizeWord(secretWord);

  if (!normGuess || !normSecret) return false;
  if (normGuess === normSecret) return true;

  // Match si l'un est inclus dans l'autre avec au moins 3 caractères
  if (normGuess.length >= 3 && (normSecret.includes(normGuess) || normGuess.includes(normSecret))) {
    return true;
  }

  // Distance de Levenshtein pour tolérer 1 ou 2 fautes de frappe
  if (normSecret.length >= 4) {
    const dist = levenshteinDistance(normGuess, normSecret);
    if (dist <= 2) return true;
  }

  return false;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
