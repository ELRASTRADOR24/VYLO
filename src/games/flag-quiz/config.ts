import { GameConfig } from "@/engine/types";

export const flagQuizConfig: GameConfig = {
  id: "flag-quiz",
  name: "Devine le Drapeau",
  description: "Testez votre culture géographique ! Devinez le pays correspondant au drapeau affiché le plus vite possible !",
  category: "Social",
  players: {
    min: 2,
    max: 20,
  },
  durationMins: 15,
  difficulty: "Facile",
  modes: ["local"],
  themeColor: "purple",
};
