"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, X, Info } from "lucide-react";
import { sfxTap } from "@/lib/audio";

interface InfoTooltipProps {
  title: string;
  description: string;
  className?: string;
}

export function InfoTooltip({ title, description, className = "" }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sfxTap();
    setIsOpen(prev => !prev);
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Bouton Point d'Interrogation ? */}
      <button
        type="button"
        onClick={toggleInfo}
        onMouseEnter={() => setIsOpen(true)}
        className="w-7 h-7 rounded-full bg-white/10 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-foreground/70 hover:text-primary transition-all cursor-pointer active:scale-90"
        aria-label="En savoir plus"
      >
        <HelpCircle size={15} />
      </button>

      {/* Popover / Tooltip d'explications */}
      {isOpen && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 md:w-72 p-4 bg-surface/98 border border-primary/40 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
            <span className="text-xs font-black text-primary flex items-center gap-1">
              <Info size={13} /> {title}
            </span>
            <button 
              type="button" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
              className="text-foreground/40 hover:text-foreground p-0.5"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-xs font-semibold text-foreground/90 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
