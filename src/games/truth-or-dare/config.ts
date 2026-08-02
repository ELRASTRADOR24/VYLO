import { GameConfig } from "@/engine/types";

export const truthOrDareConfig: GameConfig = {
  id: "truth-or-dare",
  name: "Action ou Vérité",
  description: "Le grand classique pour des soirées inoubliables.",
  category: "Action",
  players: {
    min: 2,
    max: 20
  },
  durationMins: 30,
  difficulty: "Moyen",
  modes: ["local", "online"],
  themeColor: "pink"
};
