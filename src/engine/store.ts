import { create } from "zustand";
import { GameState, GameMode, Player, GameConfig, EngineEvent } from "./types";

interface EngineStore {
  // Config
  activeGameConfig: GameConfig | null;
  mode: GameMode;
  roomId: string | null;

  // State
  gameState: GameState;
  round: number;
  players: Record<string, Player>;
  
  // Custom game-specific state (dynamique selon le jeu)
  gameData: Record<string, any>; 

  // Actions
  initGame: (config: GameConfig, mode: GameMode, roomId: string) => void;
  setGameState: (state: GameState) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, data: Partial<Player>) => void;
  nextRound: () => void;
  updateGameData: (data: Partial<Record<string, any>>) => void;
  
  // Event Emitter (Simple PubSub)
  emit: (event: EngineEvent) => void;
  
  // Reset
  endGame: () => void;
}

export const useEngineStore = create<EngineStore>((set, get) => ({
  activeGameConfig: null,
  mode: "local",
  roomId: null,
  
  gameState: "IDLE",
  round: 1,
  players: {},
  gameData: {},

  initGame: (config, mode, roomId) => set({
    activeGameConfig: config,
    mode,
    roomId,
    gameState: "LOBBY",
    round: 1,
    players: {},
    gameData: {}
  }),

  setGameState: (state) => set({ gameState: state }),

  addPlayer: (player) => set((state) => ({
    players: { ...state.players, [player.id]: player }
  })),

  removePlayer: (playerId) => set((state) => {
    const newPlayers = { ...state.players };
    delete newPlayers[playerId];
    return { players: newPlayers };
  }),

  updatePlayer: (playerId, data) => set((state) => ({
    players: {
      ...state.players,
      [playerId]: { ...state.players[playerId], ...data }
    }
  })),

  nextRound: () => set((state) => ({ round: state.round + 1 })),

  updateGameData: (data) => set((state) => ({
    gameData: { ...state.gameData, ...data }
  })),

  emit: (event) => {
    console.log("[Engine Event]", event.type, event.payload);
    // TODO: Brancher les effets sonores ou animations globales ici
  },

  endGame: () => set({
    gameState: "END"
  })
}));
