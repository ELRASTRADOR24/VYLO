import { GameConfig } from "@/engine/types";

export const blindTestConfig: GameConfig = {
  id: "blind-test",
  name: "Blind Test Musical",
  description: "Devinez l'artiste et le titre des morceaux en 30 secondes chrono ! Relevez le défi Rap FR, Latino & Hits !",
  category: "Action",
  players: {
    min: 2,
    max: 16,
  },
  durationMins: 15,
  difficulty: "Facile",
  modes: ["local"],
  themeColor: "pink",
};
