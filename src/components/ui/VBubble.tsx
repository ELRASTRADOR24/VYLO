"use client";

import { useState, useRef, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { sfxTap } from "@/lib/audio";

interface VBubbleProps {
  title: string;
  description: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VBubble({ title, description, className = "", size = "md" }: VBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Fermeture si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sfxTap();
    setIsOpen(!isOpen);
  };

  const sizeClasses = {
    sm: "w-5 h-5 text-[9px]",
    md: "w-6 h-6 text-[10px]",
    lg: "w-8 h-8 text-xs",
  }[size];

  return (
    <span ref={containerRef} className={`relative inline-flex items-center ${className}`} onClick={(e) => e.stopPropagation()}>
      {/* Pastille V Néon Luminescente */}
      <button
        type="button"
        onClick={handleToggle}
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-primary/40 via-purple-500/30 to-secondary/30 border border-primary/60 hover:border-primary flex items-center justify-center text-primary font-black animate-pulse-glow transition-all cursor-pointer active-press z-20 hover:scale-110`}
        aria-label={`V Bubble : ${title}`}
      >
        V
      </button>

      {/* Popover Discret Positionné (Pas de Modal plein écran masquant le texte !) */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 md:w-72 bg-surface/95 border-2 border-primary/50 backdrop-blur-2xl p-4 rounded-2xl shadow-2xl z-50 animate-in zoom-in-95 fade-in duration-150 text-left">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
              <Sparkles size={11} /> V·BUBBLE
            </span>
            <button
              type="button"
              onClick={handleToggle}
              className="h-5 w-5 rounded-full bg-white/5 flex items-center justify-center text-foreground/50 hover:text-foreground"
            >
              <X size={12} />
            </button>
          </div>
          <h4 className="text-xs font-black text-foreground mb-1">{title}</h4>
          <p className="text-[11px] font-semibold text-foreground/80 leading-snug">
            {description}
          </p>
        </div>
      )}
    </span>
  );
}
