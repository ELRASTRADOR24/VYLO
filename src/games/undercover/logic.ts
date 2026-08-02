import { Player } from "@/engine/types";

export type UndercoverRole = "Civilian" | "Undercover" | "MrWhite";

export interface UndercoverPlayer extends Player {
  gameRole?: UndercoverRole;
  word?: string; // Le mot qu'il reçoit
  isEliminated: boolean;
}

export interface UndercoverWordPair {
  civilian: string;
  undercover: string;
  category: string;
}

export function generateRoles(playerCount: number): UndercoverRole[] {
  let undercoverCount = 1;
  let mrWhiteCount = 0;

  if (playerCount >= 5) mrWhiteCount = 1;
  if (playerCount >= 7) undercoverCount = 2;
  if (playerCount >= 10) undercoverCount = 3;
  if (playerCount >= 14) mrWhiteCount = 2;

  const civilianCount = playerCount - undercoverCount - mrWhiteCount;
  
  const roles: UndercoverRole[] = [];
  for (let i = 0; i < undercoverCount; i++) roles.push("Undercover");
  for (let i = 0; i < mrWhiteCount; i++) roles.push("MrWhite");
  for (let i = 0; i < civilianCount; i++) roles.push("Civilian");

  // Shuffle roles
  return roles.sort(() => Math.random() - 0.5);
}

export function assignWords(
  players: Record<string, UndercoverPlayer>, 
  roles: UndercoverRole[],
  wordPair: UndercoverWordPair
): Record<string, UndercoverPlayer> {
  const updatedPlayers: Record<string, UndercoverPlayer> = {};
  
  const playerIds = Object.keys(players);
  
  playerIds.forEach((id, index) => {
    const role = roles[index];
    let word = "";
    
    if (role === "Civilian") word = wordPair.civilian;
    else if (role === "Undercover") word = wordPair.undercover;
    else if (role === "MrWhite") word = "^^"; // Mr White ne voit rien

    updatedPlayers[id] = {
      ...players[id],
      gameRole: role,
      word,
      isEliminated: false,
    };
  });

  return updatedPlayers;
}
