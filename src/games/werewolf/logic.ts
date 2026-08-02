export type WerewolfRole = 
  | "Villageois" 
  | "Loup-Garou" 
  | "Voyante" 
  | "Sorcière" 
  | "Chasseur" 
  | "Cupidon"
  | "Gardien";

export interface WerewolfPlayer {
  id: string;
  name: string;
  role: WerewolfRole;
  isAlive: boolean;
  isProtected: boolean;
  isInLove: boolean;
  loverId?: string;
}

export interface WerewolfRoleConfig {
  voyante: boolean;
  sorciere: boolean;
  chasseur: boolean;
  cupidon: boolean;
  gardien: boolean;
  undercoverWolvesCount: number;
}

/**
 * Génère la distribution des rôles basée sur la configuration sélectionnée.
 */
export function generateWerewolfRolesFromConfig(
  playerCount: number, 
  config?: Partial<WerewolfRoleConfig>
): WerewolfRole[] {
  const roles: WerewolfRole[] = [];

  // Nombre de loups (par défaut 1/3, ou selon la config)
  const wolfCount = config?.undercoverWolvesCount || Math.max(1, Math.floor(playerCount / 3));

  if (config?.voyante !== false) roles.push("Voyante");
  if (config?.sorciere && playerCount >= 6) roles.push("Sorcière");
  if (config?.chasseur && playerCount >= 7) roles.push("Chasseur");
  if (config?.cupidon && playerCount >= 8) roles.push("Cupidon");
  if (config?.gardien && playerCount >= 8) roles.push("Gardien");

  // Ajouter les Loups-Garous
  for (let i = 0; i < wolfCount; i++) {
    roles.push("Loup-Garou");
  }

  // Le reste est complété par des Villageois
  const remaining = playerCount - roles.length;
  for (let i = 0; i < remaining; i++) {
    roles.push("Villageois");
  }

  // Mélange Fisher-Yates
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}

/** Informations détaillées et narrations visuelles des rôles */
export const ROLE_INFO: Record<WerewolfRole, { 
  emoji: string; 
  title: string;
  description: string; 
  color: string;
  bgGradient: string;
  ambiance: string;
}> = {
  "Villageois": {
    emoji: "👨‍🌾",
    title: "Villageois",
    description: "Vous n'avez pas de pouvoir spécial. Écoutez les indices et démasquez les Loups lors des votes du village !",
    color: "text-amber-400",
    bgGradient: "from-amber-500/20 to-orange-950/40",
    ambiance: "Calme & Déduction"
  },
  "Loup-Garou": {
    emoji: "🐺",
    title: "Loup-Garou",
    description: "Chaque nuit, concertez-vous avec les autres Loups et dévorez une victime innocente sans vous faire démasquer !",
    color: "text-red-500",
    bgGradient: "from-red-600/30 to-slate-950",
    ambiance: "Férocité & Infiltration"
  },
  "Voyante": {
    emoji: "🔮",
    title: "Voyante",
    description: "Chaque nuit, la magie vous permet de scruter l'âme d'un joueur et de découvrir son véritable rôle secret.",
    color: "text-purple-400",
    bgGradient: "from-purple-600/30 to-indigo-950/50",
    ambiance: "Mystique & Éclairée"
  },
  "Sorcière": {
    emoji: "🧪",
    title: "Sorcière",
    description: "Vous possédez une Potion de Vie (pour ressusciter la victime) et une Potion de Mort (pour éliminer un joueur).",
    color: "text-emerald-400",
    bgGradient: "from-emerald-600/30 to-teal-950/50",
    ambiance: "Alchimie & Pouvoir"
  },
  "Chasseur": {
    emoji: "🏹",
    title: "Chasseur",
    description: "Si vous vous faites éliminer par les Loups ou par le village, votre dernier coup de fusil emportera un joueur avec vous !",
    color: "text-orange-400",
    bgGradient: "from-orange-600/30 to-amber-950/50",
    ambiance: "Vengeance & Précision"
  },
  "Cupidon": {
    emoji: "💘",
    title: "Cupidon",
    description: "Lors de la première nuit, désignez 2 Amoureux. Si l'un meurt, l'autre meurt de chagrin immédiatement !",
    color: "text-pink-400",
    bgGradient: "from-pink-600/30 to-rose-950/50",
    ambiance: "Passion & Destin"
  },
  "Gardien": {
    emoji: "🛡️",
    title: "Gardien / Salvateur",
    description: "Chaque nuit, choisissez un villageois à protéger. Il sera immunisé contre l'attaque des Loups-Garous !",
    color: "text-cyan-400",
    bgGradient: "from-cyan-600/30 to-blue-950/50",
    ambiance: "Protection & Vigilance"
  }
};
