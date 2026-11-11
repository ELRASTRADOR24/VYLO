"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
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

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sfxTap();
    setIsOpen((prev) => !prev);
  };

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9",
  }[size];

  return (
    <span ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={`À propos de ${title}`}
        className={`${sizeClasses} rounded-full bg-surface border border-[var(--border-strong)] shadow-sm hover:border-primary/50 flex items-center justify-center text-muted hover:text-primary transition-colors cursor-pointer`}
      >
        <HelpCircle size={size === "sm" ? 14 : 16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={title}
          className="absolute top-full right-0 mt-2 w-64 bg-surface border border-[var(--border-strong)] p-4 rounded-2xl shadow-glow z-50 text-left animate-fade-up"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              En bref
            </span>
            <button
              type="button"
              onClick={handleToggle}
              aria-label="Fermer"
              className="h-6 w-6 rounded-full bg-surface-elevated flex items-center justify-center text-muted hover:text-foreground cursor-pointer"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>
          <h4 className="font-display text-sm font-bold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted leading-relaxed">{description}</p>
        </div>
      )}
    </span>
  );
}
