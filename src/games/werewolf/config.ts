import { GameConfig } from "@/engine/types";

export const werewolfConfig: GameConfig = {
  id: "werewolf",
  name: "Loup-Garou",
  description: "Les villageois doivent démasquer les loups avant qu'il ne soit trop tard.",
  category: "Bluff",
  players: {
    min: 6,
    max: 20
  },
  durationMins: 30,
  difficulty: "Moyen",
  modes: ["local", "online"],
  themeColor: "purple"
};
