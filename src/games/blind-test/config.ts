import { GameConfig } from "@/engine/types";

export const blindTestConfig: GameConfig = {
  id: "blind-test",
  name: "Blind Test Musical",
  description: "Testez votre culture musicale ! Écoutez 30s d'extraits officiels de Rap FR, Latino & Hits et choisissez la bonne réponse !",
  category: "Social",
  players: {
    min: 2,
    max: 16,
  },
  durationMins: 15,
  difficulty: "Facile",
  modes: ["local", "online"],
  themeColor: "pink",
};
