export type WerewolfRole = "Villageois" | "Loup-Garou" | "Voyante" | "Sorcière" | "Chasseur" | "Cupidon";

export interface WerewolfPlayer {
  id: string;
  name: string;
  role: WerewolfRole;
  isAlive: boolean;
  isProtected: boolean; // Potion de la sorcière
  isInLove: boolean;    // Cupidon
}

interface RoleDistribution {
  role: WerewolfRole;
  count: number;
}

/**
 * Génère la distribution des rôles en fonction du nombre de joueurs.
 * Règle de base : ~1/3 de loups, toujours au moins 1 Voyante.
 */
export function generateWerewolfRoles(playerCount: number): WerewolfRole[] {
  const roles: WerewolfRole[] = [];

  // Calcul du nombre de loups (~1/3, minimum 1)
  const wolfCount = Math.max(1, Math.floor(playerCount / 3));

  // Rôles spéciaux (ajoutés selon le nombre de joueurs)
  roles.push("Voyante"); // Toujours présente

  if (playerCount >= 8) {
    roles.push("Sorcière");
  }
  if (playerCount >= 10) {
    roles.push("Chasseur");
  }
  if (playerCount >= 12) {
    roles.push("Cupidon");
  }

  // Ajout des loups
  for (let i = 0; i < wolfCount; i++) {
    roles.push("Loup-Garou");
  }

  // Le reste = Villageois
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

/** Descriptions des rôles pour l'affichage */
export const ROLE_INFO: Record<WerewolfRole, { emoji: string; description: string; color: string }> = {
  "Villageois": {
    emoji: "🧑‍🌾",
    description: "Vous devez trouver et éliminer les Loups-Garous.",
    color: "text-blue-400"
  },
  "Loup-Garou": {
    emoji: "🐺",
    description: "Chaque nuit, dévorez un villageois sans vous faire démasquer.",
    color: "text-red-500"
  },
  "Voyante": {
    emoji: "🔮",
    description: "Chaque nuit, vous pouvez découvrir le rôle d'un joueur.",
    color: "text-purple-400"
  },
  "Sorcière": {
    emoji: "🧪",
    description: "Vous possédez une potion de vie et une potion de mort.",
    color: "text-green-400"
  },
  "Chasseur": {
    emoji: "🏹",
    description: "Si vous mourrez, vous emportez un joueur avec vous.",
    color: "text-orange-400"
  },
  "Cupidon": {
    emoji: "💘",
    description: "Au début, vous liez deux joueurs : si l'un meurt, l'autre aussi.",
    color: "text-pink-400"
  }
};
