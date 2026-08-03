export type PunchlinesCategory = 
  | "Toutes"
  | "Soirée & Fête"
  | "Absurde & Pop Culture"
  | "Vie Quotidienne & Galères"
  | "Piquant & Dossiers";

export interface PunchlinePrompt {
  id: string;
  template: string; // Ex: "Ce qui a sauvé ma soirée vendredi, c'est... ______"
  category: PunchlinesCategory;
}

export const PUNCHLINES_CATEGORIES: PunchlinesCategory[] = [
  "Toutes",
  "Soirée & Fête",
  "Absurde & Pop Culture",
  "Vie Quotidienne & Galères",
  "Piquant & Dossiers"
];

export const PROMPTS_DATABASE: PunchlinePrompt[] = [
  // --- Soirée & Fête ---
  { id: "p1", template: "Ce qui a vraiment sauvé ma soirée vendredi dernier, c'est ______.", category: "Soirée & Fête" },
  { id: "p2", template: "La vraie raison pour laquelle Johanson est repassé chez lui à 3h du mat : ______.", category: "Soirée & Fête" },
  { id: "p3", template: "Hier soir en boîte, tout le monde s'est arrêté de danser quand il y a eu ______.", category: "Soirée & Fête" },
  { id: "p4", template: "Le cocktail secret du barman qui te fait oublier ton prénom contient ______. ", category: "Soirée & Fête" },
  { id: "p5", template: "Quand le DJ a coupé le son à 4h du matin, le groupe s'est mis à chanter ______.", category: "Soirée & Fête" },

  // --- Absurde & Pop Culture ---
  { id: "p6", template: "Le prochain feat incroyable de Jul et Ninho sera sur le thème de ______.", category: "Absurde & Pop Culture" },
  { id: "p7", template: "Ce que Batman cache sous sa cape quand il va faire ses courses : ______.", category: "Absurde & Pop Culture" },
  { id: "p8", template: "La seule chose capable de terrifier un influenceur TikTok : ______.", category: "Absurde & Pop Culture" },
  { id: "p9", template: "En 2030, la nouvelle monnaie mondiale officielle sera ______. ", category: "Absurde & Pop Culture" },
  { id: "p10", template: "Le motif d'arrestation le plus bizarre de l'année : ______.", category: "Absurde & Pop Culture" },

  // --- Vie Quotidienne & Galères ---
  { id: "p11", template: "Ma technique infaillible pour ne pas payer mon ticket de bus : ______.", category: "Vie Quotidienne & Galères" },
  { id: "p12", template: "Ce que je fais en premier quand le WiFi de l'appartement m'abandonne : ______.", category: "Vie Quotidienne & Galères" },
  { id: "p13", template: "L'excuse bidon ultime pour annuler un rendez-vous à la dernière minute : ______.", category: "Vie Quotidienne & Galères" },
  { id: "p14", template: "Le pire truc à retrouver au fond de son sac après un week-end : ______.", category: "Vie Quotidienne & Galères" },
  { id: "p15", template: "Mon rituel secret sous la douche quand personne ne regarde : ______.", category: "Vie Quotidienne & Galères" }
];

export const ANSWER_CARDS_DATABASE: string[] = [
  "Un kébab sauce algérienne avec frites supplément fromage à 4h du mat",
  "Le WiFi du voisin capté sans mot de passe depuis le balcon",
  "Raper tout le couplet de Tiakola sous la douche sans respirer",
  "L'historique de recherche Google à 3h du matin",
  "Un chausson au pomme réchauffé au micro-ondes",
  "Mon ex qui m'appelle par erreur à minuit",
  "Danser la macarena en plein milieu de la piste",
  "Une vidéo TikTok d'un chat qui fait du skateboard",
  "Manger des céréales directement dans le paquet sans lait",
  "Perdre son téléphone sous le siège de la voiture",
  "Devoir expliquer TikTok à ses grands-parents",
  "Un message vocal de 4 minutes livré en x2",
  "Oublier le mot de passe de son propre compte Instagram",
  "Un paquet de chips entamé depuis 3 semaines",
  "Faire semblant de parler au téléphone pour éviter quelqu'un",
  "Le livreur UberEats qui se trompe d'étage",
  "Une chaussette dépareillée portée en toute confiance",
  "Faire la sieste de 10 minutes qui dure 4 heures",
  "Un meme envoyé dans le groupe de travail par erreur",
  "Chanter faux mais avec une énergie de superstar"
];

const usedPromptIdsHistory = new Set<string>();

/** Tirer une phrase à trou sans répétition */
export function getRandomPunchlinePrompt(category: PunchlinesCategory = "Toutes"): PunchlinePrompt {
  let pool = PROMPTS_DATABASE;
  if (category !== "Toutes") {
    pool = PROMPTS_DATABASE.filter(p => p.category === category);
  }
  if (pool.length === 0) pool = PROMPTS_DATABASE;

  let availablePool = pool.filter(p => !usedPromptIdsHistory.has(p.id));

  if (availablePool.length === 0) {
    pool.forEach(p => usedPromptIdsHistory.delete(p.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedPromptIdsHistory.add(chosen.id);

  return chosen;
}

/** Tirer une main de N cartes réponses uniques */
export function drawAnswerCards(count: number = 5): string[] {
  const shuffled = [...ANSWER_CARDS_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
