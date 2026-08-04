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
    border: "border-purple-500/30 hover:border-purple-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
    buttonBg: "bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white shadow-[0_6px_0_#581C87]",
    titleHover: "group-hover:text-purple-400",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
    buttonBg: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-[0_6px_0_#1E3A8A]",
    titleHover: "group-hover:text-blue-400",
  },
  green: {
    border: "border-emerald-500/30 hover:border-emerald-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
    buttonBg: "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-[0_6px_0_#064E3B]",
    titleHover: "group-hover:text-emerald-400",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]",
    buttonBg: "bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white shadow-[0_6px_0_#7C2D12]",
    titleHover: "group-hover:text-orange-400",
  },
  yellow: {
    border: "border-yellow-500/30 hover:border-yellow-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]",
    buttonBg: "bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black shadow-[0_6px_0_#78350F]",
    titleHover: "group-hover:text-yellow-400",
  },
  red: {
    border: "border-red-500/30 hover:border-red-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]",
    buttonBg: "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-[0_6px_0_#7F1D1D]",
    titleHover: "group-hover:text-red-400",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]",
    buttonBg: "bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white shadow-[0_6px_0_#164E63]",
    titleHover: "group-hover:text-cyan-400",
  },
  pink: {
    border: "border-pink-500/30 hover:border-pink-500",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]",
    buttonBg: "bg-pink-600 hover:bg-pink-500 active:bg-pink-700 text-white shadow-[0_6px_0_#831843]",
    titleHover: "group-hover:text-pink-400",
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

  const handleClick = () => {
    sfxTap();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => onHover && onHover(accentHex)}
      className={`group relative p-3.5 rounded-3xl bg-surface/90 border-2 transition-all duration-300 transform hover:-translate-y-2 active:scale-95 cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xl ${styles.border} ${styles.glow}`}
    >
      {/* Container de l'illustration Héroïque */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-3.5">
        {illustration}

        {/* VBubble d'aide en haut à droite */}
        <div className="absolute top-2.5 right-2.5 z-20" onClick={(e) => e.stopPropagation()}>
          <VBubble title={title} description={description} />
        </div>
      </div>

      {/* Titre & Badges */}
      <div className="flex flex-col gap-3 px-1 pb-1">
        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-black text-foreground transition-colors ${styles.titleHover}`}>
            {title}
          </h3>
        </div>

        {/* Badges Info (Joueurs & Durée) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs font-extrabold text-foreground/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="flex items-center gap-1">
              <Users size={13} className="text-foreground/50" /> {playersMin}-{playersMax}
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-foreground/50" /> {durationMins} min
            </span>
          </div>
        </div>

        {/* Bouton 3D Tactile Jouer (Style Supercell / Kahoot) */}
        <button className={`w-full py-3 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-1 ${styles.buttonBg}`}>
          <Play size={16} fill="currentColor" /> Jouer
        </button>
      </div>
    </div>
  );
}
