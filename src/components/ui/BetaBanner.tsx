"use client";

import { useState } from "react";
import { FlaskConical, X, Sparkles } from "lucide-react";

export function BetaBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/90 via-indigo-950/90 to-purple-900/90 border-b border-purple-500/30 text-white text-xs font-bold py-2 px-4 flex items-center justify-between shadow-soft z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center gap-2 text-center">
        <span className="flex items-center gap-1.5 bg-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-purple-400/40">
          <FlaskConical size={12} className="animate-pulse text-purple-300" /> Version Bêta
        </span>
        <span className="text-foreground/90 font-medium">
          VYLO est actuellement en version de test. De nouveaux jeux & améliorations sont ajoutés en continu ! 🧪✨
        </span>
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-foreground/40 hover:text-foreground p-1 rounded-lg transition-colors"
        title="Masquer le message"
      >
        <X size={14} />
      </button>
    </div>
  );
}
