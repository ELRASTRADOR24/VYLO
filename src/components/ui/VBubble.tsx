"use client";

import { useState } from "react";
import { Sparkles, X, Info } from "lucide-react";
import { sfxTap } from "@/lib/audio";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface VBubbleProps {
  title: string;
  description: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VBubble({ title, description, className = "", size = "md" }: VBubbleProps) {
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

  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-7 h-7 text-xs font-black",
    lg: "w-9 h-9 text-sm font-black",
  }[size];

  return (
    <span className={`inline-flex items-center ${className}`} onClick={(e) => e.stopPropagation()}>
      {/* Composant Propriétaire V Bubble (Pastille V Néon Luminescente) */}
      <button
        type="button"
        onClick={handleOpen}
        onMouseEnter={() => setIsOpen(true)}
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-secondary/30 border border-primary/50 hover:border-primary flex items-center justify-center text-primary font-black shadow-summer-glow transition-all cursor-pointer active-press z-20 hover:scale-110`}
        aria-label={`Explication V Bubble : ${title}`}
      >
        V
      </button>

      {/* Modal / Card V Bubble Fixe Overlay (Divulgation Progressive) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={handleClose}
        >
          <Card 
            className="w-full max-w-sm p-6 bg-surface/98 border-2 border-primary/50 shadow-summer-glow relative flex flex-col gap-4 text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header V Bubble */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles size={14} /> VYLO V-Bubble
              </span>
              <button 
                type="button"
                onClick={handleClose}
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground active-press"
              >
                <X size={16} />
              </button>
            </div>

            {/* Titre & Explication Courte */}
            <div>
              <h3 className="text-xl font-black text-foreground mb-2">{title}</h3>
              <p className="text-xs font-semibold text-foreground/90 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {description}
              </p>
            </div>

            <Button variant="primary" size="sm" className="w-full py-3 text-xs font-black" onClick={handleClose}>
              Compris 👍
            </Button>
          </Card>
        </div>
      )}
    </span>
  );
}
