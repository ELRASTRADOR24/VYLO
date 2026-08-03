export type MostLikelyToCategory = 
  | "Toutes"
  | "Soirée & Fête"
  | "Vie Quotidienne & Absurde"
  | "Révélations & Dossiers"
  | "Futur & Rêves";

export interface MostLikelyToPrompt {
  id: string;
  question: string;
  category: MostLikelyToCategory;
}

export const MOST_LIKELY_TO_CATEGORIES: MostLikelyToCategory[] = [
  "Toutes",
  "Soirée & Fête",
  "Vie Quotidienne & Absurde",
  "Révélations & Dossiers",
  "Futur & Rêves"
];

export const MOST_LIKELY_TO_DATABASE: MostLikelyToPrompt[] = [
  // --- Soirée & Fête ---
  { id: "s1", question: "Qui est le plus susceptible de perdre sa veste ou sa sacoche en soirée ?", category: "Soirée & Fête" },
  { id: "s2", question: "Qui est le plus susceptible de lancer une chorégraphie improvisée sur la table ?", category: "Soirée & Fête" },
  { id: "s3", question: "Qui est le plus susceptible d'oublier où il a garé sa voiture ?", category: "Soirée & Fête" },
  { id: "s4", question: "Qui est le plus susceptible de commander à manger à 4h du matin pour tout le monde ?", category: "Soirée & Fête" },
  { id: "s5", question: "Qui est le plus susceptible d'arriver en retard avec une excuse bidon ?", category: "Soirée & Fête" },

  // --- Vie Quotidienne & Absurde ---
  { id: "v1", question: "Qui est le plus susceptible de perdre ses clés 3 fois dans la même semaine ?", category: "Vie Quotidienne & Absurde" },
  { id: "v2", question: "Qui est le plus susceptible de s'endormir en plein milieu d'un film au cinéma ?", category: "Vie Quotidienne & Absurde" },
  { id: "v3", question: "Qui est le plus susceptible de marcher sur ses propres lacets ?", category: "Vie Quotidienne & Absurde" },
  { id: "v4", question: "Qui est le plus susceptible de répondre 'toi aussi' à un serveur qui dit 'bon appétit' ?", category: "Vie Quotidienne & Absurde" },
  { id: "v5", question: "Qui est le plus susceptible de casser son téléphone la semaine où il l'a acheté ?", category: "Vie Quotidienne & Absurde" },

  // --- Révélations & Dossiers ---
  { id: "r1", question: "Qui est le plus susceptible d'envoyer un message compromettant à la mauvaise personne ?", category: "Révélations & Dossiers" },
  { id: "r2", question: "Qui est le plus susceptible de stalker son ex sur les réseaux jusqu'à 3h du matin ?", category: "Révélations & Dossiers" },
  { id: "r3", question: "Qui est le plus susceptible de rire au pire moment lors d'un événement sérieux ?", category: "Révélations & Dossiers" },
  { id: "r4", question: "Qui est le plus susceptible d'avoir le plus de secrets inavouables ?", category: "Révélations & Dossiers" },
  { id: "r5", question: "Qui est le plus susceptible de bouder pour une histoire de nourriture ?", category: "Révélations & Dossiers" },

  // --- Futur & Rêves ---
  { id: "f1", question: "Qui est le plus susceptible de tout plaquer pour ouvrir un bar sur une plage tropicale ?", category: "Futur & Rêves" },
  { id: "f2", question: "Qui est le plus susceptible de devenir millionnaire par accident ?", category: "Futur & Rêves" },
  { id: "f3", question: "Qui est le plus susceptible de passer à la télévision ou dans les faits divers ?", category: "Futur & Rêves" },
  { id: "f4", question: "Qui est le plus susceptible d'adopter 12 chats ou chiens dans sa maison ?", category: "Futur & Rêves" },
  { id: "f5", question: "Qui est le plus susceptible de devenir un influenceur star sans le faire exprès ?", category: "Futur & Rêves" }
];

const usedPromptIdsHistory = new Set<string>();

/** Tirer une question aléatoire sans répétition */
export function getRandomMostLikelyPrompt(category: MostLikelyToCategory = "Toutes"): MostLikelyToPrompt {
  let pool = MOST_LIKELY_TO_DATABASE;
  if (category !== "Toutes") {
    pool = MOST_LIKELY_TO_DATABASE.filter(p => p.category === category);
  }
  if (pool.length === 0) pool = MOST_LIKELY_TO_DATABASE;

  // Filtrer les questions déjà tirées dans cette session
  let availablePool = pool.filter(p => !usedPromptIdsHistory.has(p.id));

  if (availablePool.length === 0) {
    pool.forEach(p => usedPromptIdsHistory.delete(p.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedPromptIdsHistory.add(chosen.id);

  return chosen;
}
