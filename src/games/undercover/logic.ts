import { Player } from "@/engine/types";

export type UndercoverRole = "Civilian" | "Undercover" | "MrWhite";

export interface UndercoverPlayer extends Player {
  gameRole?: UndercoverRole;
  word?: string; // Le mot secret reçu
  isEliminated: boolean;
  scorePoints: number;
}

export interface UndercoverWordPair {
  civilian: string;
  undercover: string;
  category: string;
}

export const CATEGORIES = [
  "Toutes les catégories",
  "Animaux",
  "Films & Séries",
  "Football & Sport",
  "Anime & Mangas",
  "Nourriture & Cuisine",
  "Objets du quotidien"
] as const;

export type CategoryName = typeof CATEGORIES[number];

export const WORD_PAIRS_DATABASE: UndercoverWordPair[] = [
  // Objets du quotidien
  { civilian: "Sac à main", undercover: "Sac à dos", category: "Objets du quotidien" },
  { civilian: "Stylo à bille", undercover: "Crayon à papier", category: "Objets du quotidien" },
  { civilian: "Lunettes de soleil", undercover: "Casquette", category: "Objets du quotidien" },
  { civilian: "Chaise", undercover: "Tabouret", category: "Objets du quotidien" },
  { civilian: "Montre", undercover: "Horloge", category: "Objets du quotidien" },
  { civilian: "Shampoing", undercover: "Gel douche", category: "Objets du quotidien" },
  { civilian: "Brosse à dents", undercover: "Cure-dents", category: "Objets du quotidien" },
  { civilian: "Parapluie", undercover: "Imperméable", category: "Objets du quotidien" },
  { civilian: "Oreiller", undercover: "Coussin", category: "Objets du quotidien" },
  { civilian: "Serviette de bain", undercover: "Peignoir", category: "Objets du quotidien" },
  { civilian: "Télécommande", undercover: "Manette de jeu", category: "Objets du quotidien" },
  { civilian: "Miroir", undercover: "Vitrine", category: "Objets du quotidien" },
  { civilian: "Briquet", undercover: "Allumette", category: "Objets du quotidien" },
  { civilian: "Casque audio", undercover: "Écouteurs", category: "Objets du quotidien" },
  { civilian: "Valise", undercover: "Sac de voyage", category: "Objets du quotidien" },
  { civilian: "Lit", undercover: "Canapé", category: "Objets du quotidien" },

  // Animaux
  { civilian: "Chien", undercover: "Loup", category: "Animaux" },
  { civilian: "Chat", undercover: "Tigre", category: "Animaux" },
  { civilian: "Dauphin", undercover: "Baleine", category: "Animaux" },
  { civilian: "Aigle", undercover: "Faucon", category: "Animaux" },
  { civilian: "Cheval", undercover: "Poney", category: "Animaux" },
  { civilian: "Pingouin", undercover: "Manchot", category: "Animaux" },
  { civilian: "Crapaud", undercover: "Grenouille", category: "Animaux" },
  { civilian: "Abeille", undercover: "Guêpe", category: "Animaux" },
  { civilian: "Crocodile", undercover: "Alligator", category: "Animaux" },
  { civilian: "Caméléon", undercover: "Iguane", category: "Animaux" },
  { civilian: "Serpent", undercover: "Lézard", category: "Animaux" },
  { civilian: "Singe", undercover: "Gorille", category: "Animaux" },
  { civilian: "Hamster", undercover: "Cochon d'Inde", category: "Animaux" },
  { civilian: "Requin", undercover: "Espadon", category: "Animaux" },

  // Films & Séries
  { civilian: "Batman", undercover: "Superman", category: "Films & Séries" },
  { civilian: "Harry Potter", undercover: "Gandalf", category: "Films & Séries" },
  { civilian: "Star Wars", undercover: "Star Trek", category: "Films & Séries" },
  { civilian: "Spider-Man", undercover: "Iron Man", category: "Films & Séries" },
  { civilian: "Netflix", undercover: "Prime Video", category: "Films & Séries" },
  { civilian: "Titanic", undercover: "Avatar", category: "Films & Séries" },
  { civilian: "Game of Thrones", undercover: "House of the Dragon", category: "Films & Séries" },
  { civilian: "Barbie", undercover: "Oppenheimer", category: "Films & Séries" },
  { civilian: "Stranger Things", undercover: "Mercredi", category: "Films & Séries" },
  { civilian: "James Bond", undercover: "Ethan Hunt", category: "Films & Séries" },
  { civilian: "Disney", undercover: "Pixar", category: "Films & Séries" },

  // Football & Sport
  { civilian: "Messi", undercover: "Cristiano Ronaldo", category: "Football & Sport" },
  { civilian: "Real Madrid", undercover: "FC Barcelone", category: "Football & Sport" },
  { civilian: "PSG", undercover: "OM", category: "Football & Sport" },
  { civilian: "Coupe du Monde", undercover: "Ligue des Champions", category: "Football & Sport" },
  { civilian: "Basket-ball", undercover: "Handball", category: "Football & Sport" },
  { civilian: "Tennis", undercover: "Ping-pong", category: "Football & Sport" },
  { civilian: "Mbappé", undercover: "Haaland", category: "Football & Sport" },
  { civilian: "Roland Garros", undercover: "Wimbledon", category: "Football & Sport" },
  { civilian: "Rugby", undercover: "Football Américain", category: "Football & Sport" },
  { civilian: "Nadal", undercover: "Djokovic", category: "Football & Sport" },

  // Anime & Mangas
  { civilian: "Naruto", undercover: "Sasuke", category: "Anime & Mangas" },
  { civilian: "Goku", undercover: "Vegeta", category: "Anime & Mangas" },
  { civilian: "One Piece", undercover: "Bleach", category: "Anime & Mangas" },
  { civilian: "Luffy", undercover: "Zoro", category: "Anime & Mangas" },
  { civilian: "Attack on Titan", undercover: "Demon Slayer", category: "Anime & Mangas" },
  { civilian: "Death Note", undercover: "Code Geass", category: "Anime & Mangas" },
  { civilian: "Pikachu", undercover: "Raichu", category: "Anime & Mangas" },
  { civilian: "Jujutsu Kaisen", undercover: "My Hero Academia", category: "Anime & Mangas" },
  { civilian: "Kirua", undercover: "Gon", category: "Anime & Mangas" },

  // Nourriture & Cuisine
  { civilian: "Croissant", undercover: "Pain au chocolat", category: "Nourriture & Cuisine" },
  { civilian: "Pizza", undercover: "Burger", category: "Nourriture & Cuisine" },
  { civilian: "Pâte à tartiner", undercover: "Beurre de cacahuète", category: "Nourriture & Cuisine" },
  { civilian: "McDo", undercover: "Burger King", category: "Nourriture & Cuisine" },
  { civilian: "Coca-Cola", undercover: "Pepsi", category: "Nourriture & Cuisine" },
  { civilian: "Frites", undercover: "Potatoes", category: "Nourriture & Cuisine" },
];

/** Validation stricte de la répartition des rôles */
export function validateRoleConfig(
  totalPlayers: number,
  undercoverCount: number,
  mrWhiteCount: number
): { isValid: boolean; error?: string } {
  const civilianCount = totalPlayers - undercoverCount - mrWhiteCount;

  if (civilianCount < 2) {
    return { isValid: false, error: "Il faut au moins 2 Civils dans la partie." };
  }

  if (totalPlayers === 3 && undercoverCount > 0 && mrWhiteCount > 0) {
    return { isValid: false, error: "À 3 joueurs, impossible d'avoir à la fois un Undercover et Mr. White." };
  }

  if (undercoverCount < 1 && mrWhiteCount < 1) {
    return { isValid: false, error: "Il faut au moins 1 Undercover ou 1 Mr. White." };
  }

  return { isValid: true };
}

/** Obtenir une paire de mots aléatoire selon la catégorie choisie */
export function getRandomWordPair(category: CategoryName): UndercoverWordPair {
  let pool = WORD_PAIRS_DATABASE;
  if (category !== "Toutes les catégories") {
    pool = WORD_PAIRS_DATABASE.filter(p => p.category === category);
  }
  if (pool.length === 0) pool = WORD_PAIRS_DATABASE;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Helper classique de génération automatique des rôles */
export function generateRoles(playerCount: number): UndercoverRole[] {
  let undercoverCount = 1;
  let mrWhiteCount = 0;
  if (playerCount >= 5) mrWhiteCount = 1;
  if (playerCount >= 7) undercoverCount = 2;
  if (playerCount >= 10) undercoverCount = 3;
  return generateRolesFromConfig(playerCount, undercoverCount, mrWhiteCount);
}

/** Génération mélangée des rôles */
export function generateRolesFromConfig(
  totalPlayers: number,
  undercoverCount: number,
  mrWhiteCount: number
): UndercoverRole[] {
  const civilianCount = totalPlayers - undercoverCount - mrWhiteCount;
  const roles: UndercoverRole[] = [];

  for (let i = 0; i < undercoverCount; i++) roles.push("Undercover");
  for (let i = 0; i < mrWhiteCount; i++) roles.push("MrWhite");
  for (let i = 0; i < civilianCount; i++) roles.push("Civilian");

  // Fisher-Yates shuffle
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}

/** Ordre de parole mélangé avec probabilité réduite que Mr White soit 1er */
export function shuffleSpeakingOrder(players: UndercoverPlayer[]): UndercoverPlayer[] {
  const shuffled = [...players];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Si le premier joueur est Mr. White, on applique 90% de chance de le permuter avec un autre joueur
  if (shuffled.length > 1 && shuffled[0].gameRole === "MrWhite" && Math.random() < 0.9) {
    const targetIdx = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[targetIdx]] = [shuffled[targetIdx], shuffled[0]];
  }

  return shuffled;
}
