import { GameConfig } from "@/engine/types";
import { undercoverConfig } from "./undercover/config";
import { truthOrDareConfig } from "./truth-or-dare/config";
import { werewolfConfig } from "./werewolf/config";
import { saboteurConfig } from "./saboteur/config";
import { blindTestConfig } from "./blind-test/config";
import { tuPreferesConfig } from "./tu-preferes/config";
import { flagQuizConfig } from "./flag-quiz/config";
import { wordMasterConfig } from "./word-master/config";
import { punchlinesConfig } from "./punchlines/config";
import { vyloPartyConfig } from "./vylo-party/config";
import { fakeArtistConfig } from "./fake-artist/config";
import { mostLikelyToConfig } from "./most-likely-to/config";

// Catalogue complet des 12 jeux disponibles
export const gameRegistry: Record<string, GameConfig> = {
  [undercoverConfig.id]: undercoverConfig,
  [werewolfConfig.id]: werewolfConfig,
  [blindTestConfig.id]: blindTestConfig,
  [fakeArtistConfig.id]: fakeArtistConfig,
  [truthOrDareConfig.id]: truthOrDareConfig,
  [tuPreferesConfig.id]: tuPreferesConfig,
  [flagQuizConfig.id]: flagQuizConfig,
  [saboteurConfig.id]: saboteurConfig,
  [wordMasterConfig.id]: wordMasterConfig,
  [punchlinesConfig.id]: punchlinesConfig,
  [vyloPartyConfig.id]: vyloPartyConfig,
  [mostLikelyToConfig.id]: mostLikelyToConfig,
};

export const getGameList = (): GameConfig[] => Object.values(gameRegistry);
export const getGameConfig = (id: string): GameConfig | undefined => gameRegistry[id];
