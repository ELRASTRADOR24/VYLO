export type VyloPartyCategory = 
  | "Toutes"
  | "Défis Flash"
  | "Vérités Piquantes"
  | "Duels & Groupe"
  | "Chrono 5s";

export interface VyloPartyCard {
  id: string;
  template: string; // Ex: "⚡ {player1}, passe le téléphone à {player2} ! Il a 15s pour..."
  type: "SINGLE" | "TARGET" | "DUEL" | "GROUP";
  category: VyloPartyCategory;
}

export const VYLO_PARTY_CATEGORIES: VyloPartyCategory[] = [
  "Toutes",
  "Défis Flash",
  "Vérités Piquantes",
  "Duels & Groupe",
  "Chrono 5s"
];

export const VYLO_PARTY_DATABASE: VyloPartyCard[] = [
  // --- Défis Flash (Single & Target) ---
  {
    id: "df1",
    template: "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit imiter le cri d'un animal sauvage pendant 10 secondes sans rire.",
    type: "TARGET",
    category: "Défis Flash"
  },
  {
    id: "df2",
    template: "🔥 {player1}, tu as 15 secondes pour chanter un refrain de rap français avec la voix la plus aiguë possible !",
    type: "SINGLE",
    category: "Défis Flash"
  },
  {
    id: "df3",
    template: "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit laisser {player1} choisir son prochain surnom pour la soirée.",
    type: "TARGET",
    category: "Défis Flash"
  },
  {
    id: "df4",
    template: "🎭 {player1}, fais deviner un mot à {player2} uniquement en faisant du mime !",
    type: "DUEL",
    category: "Défis Flash"
  },
  {
    id: "df5",
    template: "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit raconter sa pire blague en gardant un visage totalement sérieux.",
    type: "TARGET",
    category: "Défis Flash"
  },

  // --- Vérités Piquantes ---
  {
    id: "vp1",
    template: "🌶️ {player1}, avoue la chose la plus embarrassante que tu as faite cette année ou prends un gage !",
    type: "SINGLE",
    category: "Vérités Piquantes"
  },
  {
    id: "vp2",
    template: "🔥 {player1}, désigne la personne dans la pièce qui selon toi s'habille avec le plus de style !",
    type: "SINGLE",
    category: "Vérités Piquantes"
  },
  {
    id: "vp3",
    template: "🌶️ {player1}, passe le téléphone à {player2} ! {player2} doit révéler son dernier message reçu ou prendre un gage.",
    type: "TARGET",
    category: "Vérités Piquantes"
  },
  {
    id: "vp4",
    template: "👀 {player1}, dis quelle est la première impression que tu as eue sur {player2} la première fois que tu l'as vu !",
    type: "DUEL",
    category: "Vérités Piquantes"
  },
  {
    id: "vp5",
    template: "🔥 {player1}, avoue quelle chanson honteuse tu écoutes en cachette sous la douche !",
    type: "SINGLE",
    category: "Vérités Piquantes"
  },

  // --- Duels & Groupe ---
  {
    id: "dg1",
    template: "🤝 DUEL ! {player1} et {player2} se font un duel de regard ! Le premier qui cligne des yeux ou rigole prend un gage !",
    type: "DUEL",
    category: "Duels & Groupe"
  },
  {
    id: "dg2",
    template: "👥 ACTION GROUPE ! Tout le monde pointe simultanément du doigt la personne la plus drôle de la soirée à 3... 1, 2, 3 !",
    type: "GROUP",
    category: "Duels & Groupe"
  },
  {
    id: "dg3",
    template: "🤝 CHORE ! {player1} et {player2} doivent improviser une danse de 10 secondes en synchronisation parfaite !",
    type: "DUEL",
    category: "Duels & Groupe"
  },
  {
    id: "dg4",
    template: "👥 VOTE GROUPE ! Désignez tous la personne qui risque le plus de perdre ses affaires d'ici la fin de la soirée !",
    type: "GROUP",
    category: "Duels & Groupe"
  },

  // --- Chrono 5s ---
  {
    id: "c5_1",
    template: "⏱️ {player1}, cite 3 marques de sneakers en moins de 5 secondes ! C'est parti !",
    type: "SINGLE",
    category: "Chrono 5s"
  },
  {
    id: "c5_2",
    template: "⏱️ {player1}, cite 3 rappeurs français en moins de 5 secondes !",
    type: "SINGLE",
    category: "Chrono 5s"
  },
  {
    id: "c5_3",
    template: "⏱️ {player1}, cite 3 trucs qu'on trouve au fond d'un frigo en 5 secondes !",
    type: "SINGLE",
    category: "Chrono 5s"
  },
  {
    id: "c5_4",
    template: "⏱️ {player1}, cite 3 séries Netflix cultes en 5 secondes !",
    type: "SINGLE",
    category: "Chrono 5s"
  }
];

const usedCardIdsHistory = new Set<string>();

/** Format de la carte avec remplacement dynamique des prénoms */
export function formatPartyCard(card: VyloPartyCard, player1Name: string, player2Name: string): string {
  return card.template
    .replace(/{player1}/g, player1Name)
    .replace(/{player2}/g, player2Name);
}

/** Tirer une carte de soirée sans répétition */
export function getRandomPartyCard(category: VyloPartyCategory = "Toutes"): VyloPartyCard {
  let pool = VYLO_PARTY_DATABASE;
  if (category !== "Toutes") {
    pool = VYLO_PARTY_DATABASE.filter(c => c.category === category);
  }
  if (pool.length === 0) pool = VYLO_PARTY_DATABASE;

  let availablePool = pool.filter(c => !usedCardIdsHistory.has(c.id));

  if (availablePool.length === 0) {
    pool.forEach(c => usedCardIdsHistory.delete(c.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedCardIdsHistory.add(chosen.id);

  return chosen;
}
