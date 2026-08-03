"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
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
    sm: "w-5 h-5 text-[9px]",
    md: "w-6 h-6 text-[10px]",
    lg: "w-8 h-8 text-xs",
  }[size];

  return (
    <span className={`inline-flex items-center ${className}`} onClick={(e) => e.stopPropagation()}>
      {/* Pastille V Néon Luminescente avec Pulse Glow */}
      <button
        type="button"
        onClick={handleOpen}
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-primary/40 via-purple-500/30 to-secondary/30 border border-primary/60 hover:border-primary flex items-center justify-center text-primary font-black animate-pulse-glow transition-all cursor-pointer active-press z-20 hover:scale-125`}
        aria-label={`V Bubble : ${title}`}
      >
        V
      </button>

      {/* Modal Overlay V Bubble */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-lg flex items-center justify-center p-5"
          onClick={handleClose}
        >
          <div 
            className="w-full max-w-sm bg-surface border-2 border-primary/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-left animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles size={12} /> V·BUBBLE
              </span>
              <button 
                type="button"
                onClick={handleClose}
                className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-foreground/50 hover:text-foreground active-press"
              >
                <X size={14} />
              </button>
            </div>

            {/* Contenu */}
            <div>
              <h3 className="text-lg font-black text-foreground mb-2">{title}</h3>
              <p className="text-xs font-semibold text-foreground/80 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
                {description}
              </p>
            </div>

            <Button variant="primary" size="sm" className="w-full py-2.5 text-xs" onClick={handleClose}>
              Compris 👍
            </Button>
          </div>
        </div>
      )}
    </span>
  );
}
