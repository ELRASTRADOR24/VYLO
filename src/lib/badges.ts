export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  undercoverWins: number;
  civilianWins: number;
  totalPlayTimeMins: number;
}

export const BADGES: Badge[] = [
  {
    id: "debutant",
    name: "Débutant",
    description: "A joué sa première partie.",
    icon: "🎯",
    color: "bg-blue-500/20 text-blue-400",
    condition: (s) => s.gamesPlayed >= 1,
  },
  {
    id: "habitue",
    name: "Habitué",
    description: "A joué 10 parties.",
    icon: "🔥",
    color: "bg-orange-500/20 text-orange-400",
    condition: (s) => s.gamesPlayed >= 10,
  },
  {
    id: "detective",
    name: "Détective",
    description: "A gagné 5 fois en tant que Civil.",
    icon: "🕵️",
    color: "bg-cyan-500/20 text-cyan-400",
    condition: (s) => s.civilianWins >= 5,
  },
  {
    id: "fantome",
    name: "Fantôme",
    description: "A gagné 5 fois en tant qu'Undercover.",
    icon: "👻",
    color: "bg-purple-500/20 text-purple-400",
    condition: (s) => s.undercoverWins >= 5,
  },
  {
    id: "maitre",
    name: "Maître de Soirée",
    description: "A remporté 20 victoires au total.",
    icon: "👑",
    color: "bg-yellow-500/20 text-yellow-400",
    condition: (s) => s.wins >= 20,
  }
];

export function getUnlockedBadges(stats: UserStats): Badge[] {
  return BADGES.filter(badge => badge.condition(stats));
}
