import Dexie, { type EntityTable } from "dexie";

export interface GameScore {
  id?: number;
  gameId: string;
  players: Record<string, number>;
  date: Date;
}

export interface LocalPlayer {
  id: string;
  name: string;
  avatarId?: string;
  lastPlayedAt: Date;
}

export interface ContentHistory {
  id?: number;
  gameId: string;
  contentId: string; // Ex: ID d'un mot Undercover
  playedAt: Date;
}

export interface LocalPack {
  id: string; // Correspond à l'ObjectId de MongoDB
  name: string;
  gameId: string;
  version: number;
}

export interface LocalContent {
  id: string; // ObjectId MongoDB
  gameId: string;
  type: string;
  data: any;
  difficulty: number;
  packId: string;
}

const db = new Dexie("VYLO_Database") as Dexie & {
  scores: EntityTable<GameScore, "id">;
  players: EntityTable<LocalPlayer, "id">;
  contentHistory: EntityTable<ContentHistory, "id">;
  localPacks: EntityTable<LocalPack, "id">;
  localContent: EntityTable<LocalContent, "id">;
};

db.version(3).stores({
  scores: "++id, gameId, date",
  players: "id, name, lastPlayedAt",
  contentHistory: "++id, gameId, contentId, playedAt",
  localPacks: "id, gameId",
  localContent: "id, gameId, packId, type",
});

export { db };
