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
    instruction: "Chacun votre tour, citez une vraie capitale de pays. Vous devez en trouver 4 sans répéter. Si quelqu'un se trompe ou répète, la mission échoue !",
    type: "WORD_CHAIN",
    timeLimitSec: 50,
    saboteurHint: "Cite une fausse capitale de manière très naturelle, ou répète une déjà dite en espérant que personne ne s'en souvient !"
  },
  {
    id: "c2",
    title: "Vrai ou Faux : Vitesse de la Lumière",
    instruction: "La vitesse de la lumière est d'environ 300 000 kilomètres par seconde. Le groupe doit se mettre d'accord et crier VRAI ou FAUX ensemble !",
    type: "TRIVIA_GUESS",
    timeLimitSec: 30,
    saboteurHint: "Insinue avec confiance que c'est plutôt 30 000 km/s pour pousser le groupe à répondre FAUX !"
  },
  {
    id: "c3",
    title: "Chaîne de Mots : Marques de Voitures",
    instruction: "Chacun votre tour, citez une marque de voiture différente. 5 marques sans répétition pour réussir la mission !",
    type: "WORD_CHAIN",
    timeLimitSec: 55,
    saboteurHint: "Répète exprès une marque déjà dite, mais attends 30 secondes pour que les gens l'aient oubliée !"
  },
  {
    id: "c4",
    title: "La Statue Synchro",
    instruction: "Au signal, tous les joueurs prennent une pose de statue immobile et tiennent 10 secondes complètes sans bouger, sans rire. Un seul mouvement et c'est raté !",
    type: "ACTION_MIME",
    timeLimitSec: 15,
    saboteurHint: "Fais un micro-mouvement discret, ou ricane tout doucement pour provoquer le fou rire du groupe !"
  },
  {
    id: "c5",
    title: "Vrai ou Faux : Le Cœur Humain",
    instruction: "Le cœur humain possède 4 cavités : 2 oreillettes et 2 ventricules. Vrai ou Faux ? Tout le groupe doit se mettre d'accord !",
    type: "TRIVIA_GUESS",
    timeLimitSec: 30,
    saboteurHint: "Affirme avec conviction qu'il n'y a que 2 cavités et citer de faux noms médicaux pour les perdre !"
  },
  {
    id: "c6",
    title: "Compte à Rebours Collectif",
    instruction: "Comptez ensemble à voix haute de 20 jusqu'à 0 en vous répartissant les chiffres. Chaque joueur dit le suivant à tour de rôle. Personne ne doit parler en même temps ou sauter un chiffre !",
    type: "SPEED_REFLEX",
    timeLimitSec: 70,
    saboteurHint: "Parle en même temps qu'un autre au bon moment ou saute un chiffre pour casser la chaîne !"
  },
  {
    id: "c7",
    title: "Chaîne de Mots : Fruits",
    instruction: "Chacun votre tour, citez un fruit différent. 5 fruits sans répétition pour réussir ! Attention, le Saboteur est aux aguets...",
    type: "WORD_CHAIN",
    timeLimitSec: 50,
    saboteurHint: "Cite une tomate et défends-la comme étant un légume, ou répète un fruit déjà cité !"
  },
  {
    id: "c8",
    title: "Vrai ou Faux : Les Océans",
    instruction: "L'Océan Pacifique est le plus grand océan de la planète. Vrai ou Faux ? Débattez en 30 secondes et donnez une réponse commune !",
    type: "TRIVIA_GUESS",
    timeLimitSec: 30,
    saboteurHint: "Argue que c'est l'Atlantique avec un air très sûr de toi, et fais douter les plus hésitants !"
  },
  {
    id: "c9",
    title: "Chaîne de Mots : Pays d'Europe",
    instruction: "Chacun votre tour, citez un pays européen différent. Trouvez-en 5 sans répétition pour valider la mission !",
    type: "WORD_CHAIN",
    timeLimitSec: 55,
    saboteurHint: "Cite un pays hors Europe comme le Maroc ou la Turquie d'un air très convaincu !"
  },
  {
    id: "c10",
    title: "Le Mime Interdit",
    instruction: "Le groupe doit mimer collectivement un objet choisi parmi : une bouteille, un avion ou un téléphone. Tout le groupe doit mimer le MÊME objet sans se concerter à voix haute !",
    type: "ACTION_MIME",
    timeLimitSec: 25,
    saboteurHint: "Mime un objet complètement différent de ceux proposés avec l'air très concentré !"
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
