import { GameConfig } from "@/engine/types";

export const saboteurConfig: GameConfig = {
  id: "saboteur",
  name: "Le Saboteur",
  description: "Réussissez les défis d'équipe... sans vous faire piéger par le traître infiltré !",
  category: "Bluff",
  players: {
    min: 3,
    max: 16
  },
  durationMins: 15,
  difficulty: "Moyen",
  modes: ["local", "online"],
  themeColor: "primary"
};
