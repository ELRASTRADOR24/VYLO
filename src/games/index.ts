import { GameConfig } from "@/engine/types";
import { undercoverConfig } from "./undercover/config";
import { truthOrDareConfig } from "./truth-or-dare/config";
import { werewolfConfig } from "./werewolf/config";
import { saboteurConfig } from "./saboteur/config";
import { blindTestConfig } from "./blind-test/config";

// On stocke tous les jeux disponibles
export const gameRegistry: Record<string, GameConfig> = {
  [undercoverConfig.id]: undercoverConfig,
  [blindTestConfig.id]: blindTestConfig,
  [saboteurConfig.id]: saboteurConfig,
  [werewolfConfig.id]: werewolfConfig,
  [truthOrDareConfig.id]: truthOrDareConfig,
};

export const getGameList = (): GameConfig[] => Object.values(gameRegistry);
export const getGameConfig = (id: string): GameConfig | undefined => gameRegistry[id];
