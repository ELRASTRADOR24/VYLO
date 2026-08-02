"use client";

import { Hand, ExternalLink } from "lucide-react";
import { sfxTap } from "@/lib/audio";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-surface/50 backdrop-blur-md mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-2 text-sm font-black text-foreground/80">
          <span>Développé avec</span>
          <span className="inline-flex items-center justify-center text-base animate-bounce">🖐️</span>
          <span>par</span>
          <a
            href="https://www.xn--dynaceglobalsant-top-q2b.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfxTap()}
            className="text-primary font-black hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/30 transition-all hover:bg-primary/20 active:scale-95"
          >
            Johanson <ExternalLink size={12} />
          </a>
        </div>
        <p className="text-[11px] text-foreground/40 font-bold">
          VYLO © 2026 — Plateforme Premium de Jeux de Soirée (Version Bêta)
        </p>
      </div>
    </footer>
  );
}
