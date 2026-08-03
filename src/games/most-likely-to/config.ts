import { GameConfig } from "@/engine/types";

export const mostLikelyToConfig: GameConfig = {
  id: "most-likely-to",
  name: "Qui est le plus susceptible de... ?",
  description: "Désignez le joueur du groupe qui correspond le mieux à des situations hilarantes et absurdes !",
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
