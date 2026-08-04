import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Nettoie automatiquement tout texte de jeu pour éliminer les numéros style (Révélation #136), (Anecdote #1), (#42) */
export function cleanPromptText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\s*\([^)]*#\d+[^)]*\)/gi, "")
    .replace(/\s*\([^)]*(Révélation|Anecdote|Défis?|Gage|Qst?|N°?)[^)]*\)/gi, "")
    .replace(/\s*\(joueur\s*#?\d+\)/gi, "")
    .replace(/\bjoueur\s*numéro\s*\d+\b/gi, "un autre joueur")
    .replace(/\bjoueur\s*#?\d+\b/gi, "un autre joueur")
    .replace(/\s+/g, " ")
    .trim();
}
