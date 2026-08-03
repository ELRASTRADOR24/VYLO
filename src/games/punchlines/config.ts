import { GameConfig } from "@/engine/types";

export const punchlinesConfig: GameConfig = {
  id: "punchlines",
  name: "VYLO Cards — Punchlines",
  description: "Complétez les phrases à trous avec les cartes les plus absurdes, piquantes et hilarantes entre amis !",
  category: "Social",
  players: {
    min: 2,
    max: 20,
  },
  durationMins: 20,
  difficulty: "Facile",
  modes: ["local"],
  themeColor: "purple",
};
