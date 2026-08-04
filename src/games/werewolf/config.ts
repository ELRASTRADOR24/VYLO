import { GameConfig } from "@/engine/types";

export const werewolfConfig: GameConfig = {
  id: "werewolf",
  name: "Loup-Garou",
  description: "Le village se réveille... Démasquez les loups-garous avant qu'ils ne dévorent tous les innocents !",
  category: "Bluff",
  players: {
    min: 4,
    max: 18,
  },
  durationMins: 30,
  difficulty: "Moyen",
  modes: ["local", "online"],
  themeColor: "purple",
};
