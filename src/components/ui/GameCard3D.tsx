"use client";

import React from "react";
import { Users, Clock, Play } from "lucide-react";
import { VBubble } from "./VBubble";
import { sfxTap } from "@/lib/audio";

export interface GameCard3DProps {
  title: string;
  description: string;
  playersMin: number;
  playersMax: number;
  durationMins: number;
  themeColor: "purple" | "blue" | "green" | "orange" | "yellow" | "red" | "cyan" | "pink";
  accentHex: string;
  illustration: React.ReactNode;
  onClick: () => void;
  onHover?: (hex: string) => void;
}

const COLOR_CLASSES = {
  purple: {
    border: "border-purple-500/40 hover:border-purple-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]",
    buttonBg: "bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white shadow-[0_4px_0_#581C87]",
  },
  blue: {
    border: "border-blue-500/40 hover:border-blue-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(59,130,246,0.45)]",
    buttonBg: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-[0_4px_0_#1E3A8A]",
  },
  green: {
    border: "border-emerald-500/40 hover:border-emerald-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.45)]",
    buttonBg: "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-[0_4px_0_#064E3B]",
  },
  orange: {
    border: "border-orange-500/40 hover:border-orange-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]",
    buttonBg: "bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white shadow-[0_4px_0_#7C2D12]",
  },
  yellow: {
    border: "border-yellow-500/40 hover:border-yellow-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(250,204,21,0.45)]",
    buttonBg: "bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black shadow-[0_4px_0_#78350F]",
  },
  red: {
    border: "border-red-500/40 hover:border-red-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.45)]",
    buttonBg: "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-[0_4px_0_#7F1D1D]",
  },
  cyan: {
    border: "border-cyan-500/40 hover:border-cyan-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]",
    buttonBg: "bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-[0_4px_0_#164E63]",
  },
  pink: {
    border: "border-pink-500/40 hover:border-pink-400",
    glow: "group-hover:shadow-[0_0_35px_rgba(236,72,153,0.45)]",
    buttonBg: "bg-pink-600 hover:bg-pink-500 active:bg-pink-700 text-white shadow-[0_4px_0_#831843]",
  },
};

export function GameCard3D({
  title,
  description,
  playersMin,
  playersMax,
  durationMins,
  themeColor,
  accentHex,
  illustration,
  onClick,
  onHover,
}: GameCard3DProps) {
  const styles = COLOR_CLASSES[themeColor];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfxTap();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => onHover && onHover(accentHex)}
      className={`group relative p-3 rounded-3xl bg-surface/90 border-2 transition-all duration-200 transform hover:-translate-y-1.5 active:scale-98 cursor-pointer flex flex-col justify-between overflow-hidden shadow-xl ${styles.border} ${styles.glow}`}
    >
      {/* Container de la Carte Tarot / Vector Héroïque */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-2.5">
        {illustration}

        {/* VBubble d'aide en haut à droite */}
        <div className="absolute top-2.5 right-2.5 z-20" onClick={(e) => e.stopPropagation()}>
          <VBubble title={title} description={description} />
        </div>
      </div>

      {/* Titre & Badges Info */}
      <div className="flex flex-col gap-2 px-1 pb-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold text-foreground/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
          <span className="flex items-center gap-1">
            <Users size={12} className="text-primary" /> {playersMin}-{playersMax} joueurs
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-primary" /> {durationMins} min
          </span>
        </div>

        {/* Bouton Tactile Jouer */}
        <button 
          onClick={handleClick}
          className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:translate-y-0.5 ${styles.buttonBg}`}
        >
          <Play size={14} fill="currentColor" /> Jouer
        </button>
      </div>
    </div>
  );
}
