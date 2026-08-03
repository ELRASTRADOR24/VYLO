export type TuPreferesCategory = 
  | "Toutes"
  | "Vie Quotidienne & Pouvoirs"
  | "Absurde & Fous Rires"
  | "Soirée & Pop Culture"
  | "Dilemmes Cornéliens";

export interface TuPreferesDilemma {
  id: string;
  optionA: string;
  optionB: string;
  category: TuPreferesCategory;
}

export const TU_PREFERES_CATEGORIES: TuPreferesCategory[] = [
  "Toutes",
  "Vie Quotidienne & Pouvoirs",
  "Absurde & Fous Rires",
  "Soirée & Pop Culture",
  "Dilemmes Cornéliens"
];

export const TU_PREFERES_DATABASE: TuPreferesDilemma[] = [
  // --- Vie Quotidienne & Pouvoirs ---
  {
    id: "p1",
    optionA: "Avoir la capacité de te téléporter n'importe où instantanément",
    optionB: "Pouvoir lire dans les pensées mais seulement quand les gens dorment",
    category: "Vie Quotidienne & Pouvoirs"
  },
  {
    id: "p2",
    optionA: "Connaître le futur dans 10 ans",
    optionB: "Pouvoir revivre le passé et changer une seule décision",
    category: "Vie Quotidienne & Pouvoirs"
  },
  {
    id: "p3",
    optionA: "Avoir une mémoire photo absolue et ne rien oublier",
    optionB: "Pouvoir apprendre n'importe quelle langue en 5 minutes",
    category: "Vie Quotidienne & Pouvoirs"
  },
  {
    id: "p4",
    optionA: "Être invisible dès que tu fermes les yeux",
    optionB: "Pouvoir voler dans les airs mais à la vitesse d'une tortue",
    category: "Vie Quotidienne & Pouvoirs"
  },
  {
    id: "p5",
    optionA: "Ne plus jamais avoir besoin de dormir",
    optionB: "Ne plus jamais ressentir de fatigue physique ni de douleur",
    category: "Vie Quotidienne & Pouvoirs"
  },

  // --- Absurde & Fous Rires ---
  {
    id: "a1",
    optionA: "Parler avec une voix de canard aiguë pour le restant de tes jours",
    optionB: "Faire la danse du poulet pendant 10 secondes dès qu'on dit ton prénom",
    category: "Absurde & Fous Rires"
  },
  {
    id: "a2",
    optionA: "Devoir toujours porter des palmes aux pieds dans la rue",
    optionB: "Devoir toujours mettre un casque de chantier à chaque repas",
    category: "Absurde & Fous Rires"
  },
  {
    id: "a3",
    optionA: "Éternuer des confettis lumineux à chaque fois que tu ris",
    optionB: "Roter le refrain de 'Libérée, Délivrée' dès que tu es stressé",
    category: "Absurde & Fous Rires"
  },
  {
    id: "a4",
    optionA: "Avoir un lutin invisible qui commente ta vie à haute voix",
    optionB: "Avoir un bruit de tambourin dès que tu fais un pas",
    category: "Absurde & Fous Rires"
  },
  {
    id: "a5",
    optionA: "Manger des pâtes sans aucune sauce ni fromage pour toujours",
    optionB: "Boire toute boisson avec du sirop de menthe ajouté dedans",
    category: "Absurde & Fous Rires"
  },

  // --- Soirée & Pop Culture ---
  {
    id: "s1",
    optionA: "Ne plus jamais avoir accès à internet ni au WiFi",
    optionB: "Ne plus jamais pouvoir écouter de musique de ta vie",
    category: "Soirée & Pop Culture"
  },
  {
    id: "s2",
    optionA: "Supprimer définitivement Instagram et TikTok de la planète",
    optionB: "Supprimer définitivement Netflix et YouTube de la planète",
    category: "Soirée & Pop Culture"
  },
  {
    id: "s3",
    optionA: "Passer une semaine entière enfermé dans un IKEA avec ton ex",
    optionB: "Passer 24h menotté à ton pire ennemi dans une fête foraine",
    category: "Soirée & Pop Culture"
  },
  {
    id: "s4",
    optionA: "Révéler à voix haute ton historique de recherche Google devant le groupe",
    optionB: "Laisser le groupe envoyer n'importe quel message à ton 3ème contact WhatsApp",
    category: "Soirée & Pop Culture"
  },
  {
    id: "s5",
    optionA: "Gagner 1 million d'euros mais devoir habiter seul dans la creuse",
    optionB: "Gagner 50 000€ et habiter dans une grande métropole avec tes meilleurs potes",
    category: "Soirée & Pop Culture"
  },

  // --- Dilemmes Cornéliens ---
  {
    id: "c1",
    optionA: "Savoir exactement le jour et l'heure de ta mort",
    optionB: "Savoir exactement la cause de ta mort sans savoir quand",
    category: "Dilemmes Cornéliens"
  },
  {
    id: "c2",
    optionA: "Être la personne la plus intelligente au monde mais personne ne te croit",
    optionB: "Être la personne la plus drôle au monde mais personne ne prend au sérieux",
    category: "Dilemmes Cornéliens"
  },
  {
    id: "c3",
    optionA: "Pouvoir voyager dans le passé mais sans pouvoir revenir au présent",
    optionB: "Pouvoir voyager dans le futur mais sans savoir si tes proches y sont",
    category: "Dilemmes Cornéliens"
  },
  {
    id: "c4",
    optionA: "Sauver la vie de 5 inconnus au hasard dans le monde",
    optionB: "Offrir 100 000€ à chacun de tes proches et amis actuels",
    category: "Dilemmes Cornéliens"
  }
];

const usedDilemmaIdsHistory = new Set<string>();

/** Tirer un dilemme aléatoire sans répétition */
export function getRandomDilemma(category: TuPreferesCategory = "Toutes"): TuPreferesDilemma {
  let pool = TU_PREFERES_DATABASE;
  if (category !== "Toutes") {
    pool = TU_PREFERES_DATABASE.filter(d => d.category === category);
  }
  if (pool.length === 0) pool = TU_PREFERES_DATABASE;

  // Filtrer les dilemmes déjà tirés dans cette session
  let availablePool = pool.filter(d => !usedDilemmaIdsHistory.has(d.id));

  if (availablePool.length === 0) {
    pool.forEach(d => usedDilemmaIdsHistory.delete(d.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedDilemmaIdsHistory.add(chosen.id);

  return chosen;
}
