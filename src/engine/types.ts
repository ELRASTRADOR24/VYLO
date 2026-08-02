export type GameState = 
  | "IDLE" 
  | "LOBBY" 
  | "START" 
  | "PLAYING" 
  | "VOTING" 
  | "RESULT" 
  | "END";

export type GameMode = "local" | "online" | "hybrid";

export interface Player {
  id: string;
  name: string;
  avatarId?: string; // ID of the avatar illustration
  isHost: boolean;
  isReady: boolean;
  isConnected: boolean;
  score: number;
}

export interface GameRole {
  id: string;
  name: string;
  team: string;
  description?: string;
}

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  category: "Bluff" | "Humour" | "Réflexion" | "Créativité" | "Social" | "Action";
  players: {
    min: number;
    max: number;
  };
  durationMins: number;
  difficulty: "Facile" | "Moyen" | "Difficile";
  modes: GameMode[];
  themeColor: "primary" | "accent" | "secondary" | "pink" | "purple";
}

export interface EngineEvent {
  type: string;
  payload?: any;
}
