import { Player } from "@/engine/types";

export type SaboteurRole = "AGENT" | "SABOTEUR";

export interface SaboteurPlayer extends Player {
  gameRole?: SaboteurRole;
  isEliminated: boolean;
  scorePoints: number;
}

export type ChallengeType = "WORD_CHAIN" | "TRIVIA_GUESS" | "ACTION_MIME" | "SPEED_REFLEX";

export interface SaboteurChallenge {
  id: string;
  title: string;
  instruction: string;
  type: ChallengeType;
  timeLimitSec: number;
  saboteurHint: string; // Conseil secret donné uniquement au Saboteur pour piéger
}

export const SABOTEUR_CHALLENGES_DATABASE: SaboteurChallenge[] = [
  {
    id: "c1",
    title: "Chaîne de Mots : Capitales",
    instruction: "Citez 4 véritables capitales de pays en moins de 25 secondes à voix haute.",
    type: "WORD_CHAIN",
    timeLimitSec: 25,
    saboteurHint: "Cite une fausse capitale de manière très naturelle ou fais hésiter le groupe en coupant la parole."
  },
  {
    id: "c2",
    title: "Estimation : Vitesse de la Lumière",
    instruction: "La vitesse de la lumière est d'environ 300 000 km/s. L'équipe doit répondre 'VRAI' en 15s.",
    type: "TRIVIA_GUESS",
    timeLimitSec: 15,
    saboteurHint: "Insinue avec confiance que c'est 30 000 km/s et pousse le groupe à répondre 'FAUX' !"
  },
  {
    id: "c3",
    title: "Chaîne de Mots : Marque de Voitures",
    instruction: "Citez 5 marques de voitures différentes sans répéter la même marque.",
    type: "WORD_CHAIN",
    timeLimitSec: 20,
    saboteurHint: "Répète exprès une marque déjà dite 10 secondes plus tôt pour annuler le point !"
  },
  {
    id: "c4",
    title: "Action Groupe : La Statue Synchro",
    instruction: "Tous les joueurs doivent prendre une pose de statue sans bouger pendant 10 secondes.",
    type: "ACTION_MIME",
    timeLimitSec: 15,
    saboteurHint: "Fais un léger mouvement discret ou ris tout bas pour faire annuler la statue !"
  },
  {
    id: "c5",
    title: "Trivia : Le Cœur Humain",
    instruction: "Le cœur humain possède 4 cavités (oreillettes et ventricules). Vrai ou Faux ?",
    type: "TRIVIA_GUESS",
    timeLimitSec: 15,
    saboteurHint: "Soutiens fermement qu'il n'y a que 2 cavités pour induire en erreur l'équipe !"
  },
  {
    id: "c6",
    title: "Chrono Réflexe : Compter à Rebours",
    instruction: "Comptez à voix haute de 20 jusqu'à 0 sans qu'aucun joueur ne parle en même temps.",
    type: "SPEED_REFLEX",
    timeLimitSec: 20,
    saboteurHint: "Parle en même temps qu'un autre joueur à la dernière seconde pour casser le décompte !"
  },
  {
    id: "c7",
    title: "Chaîne de Mots : Fruits Rouges",
    instruction: "Citez 4 fruits de couleur rouge en moins de 15 secondes.",
    type: "WORD_CHAIN",
    timeLimitSec: 15,
    saboteurHint: "Propose la 'Banane' ou le 'Citron' en faisant semblant de paniquer sous la pression du chrono !"
  },
  {
    id: "c8",
    title: "Trivia : Les Océans",
    instruction: "L'Océan Pacifique est le plus grand océan du monde. Vrai ou Faux ?",
    type: "TRIVIA_GUESS",
    timeLimitSec: 15,
    saboteurHint: "Dis que c'est l'Océan Atlantique et fais douter tes voisins !"
  }
];

/** Générer les rôles pour la partie de Saboteur */
export function generateSaboteurRoles(totalPlayers: number, saboteurCount: number = 1): SaboteurRole[] {
  const roles: SaboteurRole[] = [];
  const actualSaboteurs = Math.min(saboteurCount, Math.floor(totalPlayers / 2));
  const agentCount = totalPlayers - actualSaboteurs;

  for (let i = 0; i < agentCount; i++) roles.push("AGENT");
  for (let i = 0; i < actualSaboteurs; i++) roles.push("SABOTEUR");

  // Mélange de Fisher-Yates
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}

/** Tirer un mini-défi aléatoire */
export function getRandomChallenge(): SaboteurChallenge {
  return SABOTEUR_CHALLENGES_DATABASE[Math.floor(Math.random() * SABOTEUR_CHALLENGES_DATABASE.length)];
}
