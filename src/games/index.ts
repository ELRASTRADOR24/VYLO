import { GameConfig } from "@/engine/types";
import { undercoverConfig } from "./undercover/config";
import { truthOrDareConfig } from "./truth-or-dare/config";
import { werewolfConfig } from "./werewolf/config";
import { saboteurConfig } from "./saboteur/config";
import { blindTestConfig } from "./blind-test/config";
import { tuPreferesConfig } from "./tu-preferes/config";
import { flagQuizConfig } from "./flag-quiz/config";
import { wordMasterConfig } from "./word-master/config";
import { mostLikelyToConfig } from "./most-likely-to/config";

// On stocke tous les jeux disponibles
export const gameRegistry: Record<string, GameConfig> = {
  [undercoverConfig.id]: undercoverConfig,
  [blindTestConfig.id]: blindTestConfig,
  [tuPreferesConfig.id]: tuPreferesConfig,
  [mostLikelyToConfig.id]: mostLikelyToConfig,
  [wordMasterConfig.id]: wordMasterConfig,
  [flagQuizConfig.id]: flagQuizConfig,
  [saboteurConfig.id]: saboteurConfig,
  [werewolfConfig.id]: werewolfConfig,
  [truthOrDareConfig.id]: truthOrDareConfig,
};

export const getGameList = (): GameConfig[] => Object.values(gameRegistry);
export const getGameConfig = (id: string): GameConfig | undefined => gameRegistry[id];
