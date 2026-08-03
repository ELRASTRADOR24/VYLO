"use client";

import { useState } from "react";
import { HelpCircle, X, Info, Sparkles } from "lucide-react";
import { sfxTap } from "@/lib/audio";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface InfoTooltipProps {
  title: string;
  description: string;
  className?: string;
}

export function InfoTooltip({ title, description, className = "" }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sfxTap();
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sfxTap();
    setIsOpen(false);
  };

  return (
    <span className={`inline-flex items-center ${className}`} onClick={(e) => e.stopPropagation()}>
      {/* Bouton Point d'Interrogation ? */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary/20 border border-white/15 hover:border-primary/50 flex items-center justify-center text-foreground/80 hover:text-primary transition-all cursor-pointer active:scale-90 z-20"
        aria-label={`Règles et explications pour ${title}`}
      >
        <HelpCircle size={15} />
      </button>

      {/* Modal Overlay Fixe (Ne se fait jamais rogner par overflow-hidden) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={handleClose}
        >
          <Card 
            className="w-full max-w-sm p-6 bg-surface/98 border border-primary/40 shadow-summer-glow relative flex flex-col gap-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du Modal Info */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-black text-primary flex items-center gap-2">
                <Sparkles size={16} /> Explication du jeu
              </span>
              <button 
                type="button"
                onClick={handleClose}
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Titre & Description */}
            <div>
              <h3 className="text-2xl font-black text-foreground mb-2">{title}</h3>
              <p className="text-xs font-bold text-foreground/80 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {description}
              </p>
            </div>

            <Button variant="primary" size="sm" className="w-full py-3 text-xs font-black" onClick={handleClose}>
              J'ai compris 👍
            </Button>
          </Card>
        </div>
      )}
    </span>
  );
}
