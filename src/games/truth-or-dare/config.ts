import { GameConfig } from "@/engine/types";

export const truthOrDareConfig: GameConfig = {
  id: "truth-or-dare",
  name: "Action ou Vérité",
  description: "Le jeu classique des secrets et des défis ! Choisissez entre révéler une vérité pimentée ou accomplir une action osée.",
  category: "Social",
  players: {
    min: 2,
    max: 20,
  },
  durationMins: 20,
  difficulty: "Facile",
  modes: ["local", "online"],
  themeColor: "primary",
};
