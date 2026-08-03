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
  // --- Pop Culture & Cinéma ---
  {
    id: "pc1",
    targetWord: "Harry Potter",
    forbiddenWords: ["Sorcier", "Magie", "Poudlard", "Lunettes"],
    category: "Pop Culture & Cinéma"
  },
  {
    id: "pc2",
    targetWord: "Titanic",
    forbiddenWords: ["Bateau", "Iceberg", "Noyade", "Film"],
    category: "Pop Culture & Cinéma"
  },
  {
    id: "pc3",
    targetWord: "Star Wars",
    forbiddenWords: ["Espace", "Sabre", "Vador", "Jedi"],
    category: "Pop Culture & Cinéma"
  },
  {
    id: "pc4",
    targetWord: "Batman",
    forbiddenWords: ["Chauve-souris", "Héros", "Joker", "Gotham"],
    category: "Pop Culture & Cinéma"
  },
  {
    id: "pc5",
    targetWord: "Netflix",
    forbiddenWords: ["Série", "Film", "Streaming", "Écran"],
    category: "Pop Culture & Cinéma"
  },

  // --- Vie Quotidienne & Cuisine ---
  {
    id: "vq1",
    targetWord: "Pizza",
    forbiddenWords: ["Italie", "Fromage", "Pâte", "Sauce"],
    category: "Vie Quotidienne & Cuisine"
  },
  {
    id: "vq2",
    targetWord: "Café",
    forbiddenWords: ["Chaud", "Matin", "Tasse", "Expresso"],
    category: "Vie Quotidienne & Cuisine"
  },
  {
    id: "vq3",
    targetWord: "Réveil",
    forbiddenWords: ["Matin", "Alarme", "Lit", "Dormir"],
    category: "Vie Quotidienne & Cuisine"
  },
  {
    id: "vq4",
    targetWord: "Chocolat",
    forbiddenWords: ["Cacao", "Sucré", "Noir", "Gâteau"],
    category: "Vie Quotidienne & Cuisine"
  },
  {
    id: "vq5",
    targetWord: "Smartphone",
    forbiddenWords: ["Téléphone", "Écran", "Appeler", "SMS"],
    category: "Vie Quotidienne & Cuisine"
  },

  // --- Sports & Célébrités ---
  {
    id: "sc1",
    targetWord: "Football",
    forbiddenWords: ["Ballon", "But", "Joueur", "Stade"],
    category: "Sports & Célébrités"
  },
  {
    id: "sc2",
    targetWord: "Tennis",
    forbiddenWords: ["Raquette", "Balle", "Filet", "Roland-Garros"],
    category: "Sports & Célébrités"
  },
  {
    id: "sc3",
    targetWord: "Kylian Mbappé",
    forbiddenWords: ["Foot", "PSG", "Real", "Attaquant"],
    category: "Sports & Célébrités"
  },
  {
    id: "sc4",
    targetWord: "Natation",
    forbiddenWords: ["Eau", "Piscine", "Nager", "Maillot"],
    category: "Sports & Célébrités"
  },
  {
    id: "sc5",
    targetWord: "Boxe",
    forbiddenWords: ["Gants", "Ring", "Combat", "Coup"],
    category: "Sports & Célébrités"
  },

  // --- Voyages & Nature ---
  {
    id: "vn1",
    targetWord: "Plage",
    forbiddenWords: ["Sable", "Mer", "Soleil", "Vacances"],
    category: "Voyages & Nature"
  },
  {
    id: "vn2",
    targetWord: "Avion",
    forbiddenWords: ["Voler", "Ciel", "Pilote", "Aéroport"],
    category: "Voyages & Nature"
  },
  {
    id: "vn3",
    targetWord: "Montagne",
    forbiddenWords: ["Neige", "Ski", "Sommet", "Altitude"],
    category: "Voyages & Nature"
  },
  {
    id: "vn4",
    targetWord: "Forêt",
    forbiddenWords: ["Arbres", "Bois", "Feuilles", "Nature"],
    category: "Voyages & Nature"
  },
  {
    id: "vn5",
    targetWord: "Désert",
    forbiddenWords: ["Sable", "Chaud", "Chameau", "Dune"],
    category: "Voyages & Nature"
  }
];

const usedTabooIdsHistory = new Set<string>();

/** Tirer une carte Tabou aléatoire sans répétition */
export function getRandomTabooCard(category: WordMasterCategory = "Toutes"): TabooCard {
  let pool = TABOO_DATABASE;
  if (category !== "Toutes") {
    pool = TABOO_DATABASE.filter(c => c.category === category);
  }
  if (pool.length === 0) pool = TABOO_DATABASE;

  // Filtrer les cartes déjà tirées dans cette session
  let availablePool = pool.filter(c => !usedTabooIdsHistory.has(c.id));

  if (availablePool.length === 0) {
    pool.forEach(c => usedTabooIdsHistory.delete(c.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedTabooIdsHistory.add(chosen.id);

  return chosen;
}
