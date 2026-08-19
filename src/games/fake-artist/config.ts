import { GameConfig } from "@/engine/types";

export const fakeArtistConfig: GameConfig = {
  id: "fake-artist",
  name: "Faux Artiste",
  description: "Tout le monde dessine le même mot secret trait par trait... sauf un imposteur qui tente de s'infiltrer sans se faire repérer !",
  category: "Créativité",
  players: {
    min: 3,
    max: 12,
  },
  durationMins: 10,
  difficulty: "Facile",
  modes: ["local", "online"],
  themeColor: "accent",
};
