import { GameConfig } from "@/engine/types";

export const tuPreferesConfig: GameConfig = {
  id: "tu-preferes",
  name: "Tu Préfères ?",
  description: "Tranchez des dilemmes absurdes et hilarants entre amis ! Option A ou Option B ? Révélez vos vrais choix !",
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
