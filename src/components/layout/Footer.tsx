"use client";

import { ExternalLink } from "lucide-react";
import { sfxTap } from "@/lib/audio";

export function Footer() {
  return (
    <footer className="w-full py-6 border-t border-white/10 bg-surface/50 backdrop-blur-md mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-4 text-xs font-bold text-foreground/70 mb-1">
          <a href="/rules" onClick={() => sfxTap()} className="hover:text-primary transition-colors text-white/80">
            📖 Guide & Règles des Jeux
          </a>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span>Développé par</span>
            <a
              href="https://johansonweb.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfxTap()}
              className="text-white font-extrabold hover:text-primary transition-colors flex items-center gap-1"
            >
              Johanson <ExternalLink size={12} />
            </a>
          </div>
        </div>
        <p className="text-[11px] text-foreground/40 font-medium">
          VYLO © 2026 — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
