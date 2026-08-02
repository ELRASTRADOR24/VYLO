import { GameConfig } from "@/engine/types";
import { undercoverConfig } from "./undercover/config";
import { truthOrDareConfig } from "./truth-or-dare/config";
import { werewolfConfig } from "./werewolf/config";
import { saboteurConfig } from "./saboteur/config";

// On stocke tous les jeux disponibles
export const gameRegistry: Record<string, GameConfig> = {
  [undercoverConfig.id]: undercoverConfig,
  [truthOrDareConfig.id]: truthOrDareConfig,
  [werewolfConfig.id]: werewolfConfig,
  [saboteurConfig.id]: saboteurConfig,
};

export const getGameList = (): GameConfig[] => Object.values(gameRegistry);
export const getGameConfig = (id: string): GameConfig | undefined => gameRegistry[id];
