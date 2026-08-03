import { GameConfig } from "@/engine/types";

export const wordMasterConfig: GameConfig = {
  id: "word-master",
  name: "Le Maître des Mots",
  description: "Faites deviner le mot secret à votre équipe sans jamais prononcer les 4 mots interdits (Tabou) !",
  category: "Créativité",
  players: {
    min: 2,
    max: 16,
  },
  durationMins: 15,
  difficulty: "Facile",
  modes: ["local"],
  themeColor: "pink",
};
