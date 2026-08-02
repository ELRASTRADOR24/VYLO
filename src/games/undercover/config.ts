import { GameConfig } from "@/engine/types";

export const undercoverConfig: GameConfig = {
  id: "undercover",
  name: "Undercover",
  description: "Trouvez l'imposteur parmi vos amis. Attention à ce que vous dites...",
  category: "Bluff",
  players: {
    min: 3,
    max: 20
  },
  durationMins: 15,
  difficulty: "Moyen",
  modes: ["local", "online"],
  themeColor: "primary"
};
