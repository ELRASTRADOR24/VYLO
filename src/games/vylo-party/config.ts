import { GameConfig } from "@/engine/types";

export const vyloPartyConfig: GameConfig = {
  id: "vylo-party",
  name: "VYLO Party — Défis & Passe-Mobile",
  description: "Passez le téléphone de main en main ! Défis déjantés, vérités piquantes et duels survoltés entre amis !",
  category: "Social",
  players: {
    min: 2,
    max: 20,
  },
  durationMins: 20,
  difficulty: "Facile",
  modes: ["local"],
  themeColor: "pink",
};
