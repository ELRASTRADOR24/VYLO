import React from "react";
import Link from "next/link";
import { Users, Clock, ArrowRight } from "lucide-react";
import { VBubble } from "./VBubble";

export interface GameCard3DProps {
  title: string;
  description: string;
  playersMin: number;
  playersMax: number;
  durationMins: number;
  themeColor: "purple" | "blue" | "green" | "orange" | "yellow" | "red" | "cyan" | "pink";
  accentHex?: string;
  illustration: React.ReactNode;
  modeBadge?: string;
  isWip?: boolean;
  href?: string;
  onClick?: () => void;
  onHover?: (hex: string) => void;
}

const ACCENT_MAP: Record<GameCard3DProps["themeColor"], { badgeBg: string; badgeText: string; hoverBorder: string }> = {
  purple: { badgeBg: "bg-[#EEF2FF]", badgeText: "text-[#4338CA]", hoverBorder: "hover:border-secondary/45" },
  blue: { badgeBg: "bg-[#EEF2FF]", badgeText: "text-[#4338CA]", hoverBorder: "hover:border-secondary/45" },
  green: { badgeBg: "bg-[#ECFDF5]", badgeText: "text-[#047857]", hoverBorder: "hover:border-green/45" },
  orange: { badgeBg: "bg-[#FEF3C7]", badgeText: "text-[#B45309]", hoverBorder: "hover:border-yellow/55" },
  yellow: { badgeBg: "bg-[#FEF3C7]", badgeText: "text-[#B45309]", hoverBorder: "hover:border-yellow/55" },
  red: { badgeBg: "bg-[#FEEBEB]", badgeText: "text-[#C22E2E]", hoverBorder: "hover:border-primary/45" },
  cyan: { badgeBg: "bg-[#EEF2FF]", badgeText: "text-[#4338CA]", hoverBorder: "hover:border-secondary/45" },
  pink: { badgeBg: "bg-[#FEEBEB]", badgeText: "text-[#C22E2E]", hoverBorder: "hover:border-primary/45" },
};

export function GameCard3D({
  title,
  description,
  playersMin,
  playersMax,
  durationMins,
  themeColor,
  illustration,
  modeBadge,
  isWip = false,
  href,
  onClick,
}: GameCard3DProps) {
  const styles = ACCENT_MAP[themeColor];

  const cardInner = (
    <>
      <div className="relative w-full aspect-[16/10] overflow-clip border-b border-border/80 bg-surface-elevated">
        <div
          className={
            isWip
              ? "w-full h-full grayscale-[42%] opacity-90 group-hover:grayscale-[18%] group-hover:opacity-100 transition-[filter,opacity] duration-150"
              : "w-full h-full"
          }
        >
          {illustration}
        </div>

        {isWip && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#9CA3B8]/20 transition-opacity group-hover:opacity-60"
            />
            <div
              role="note"
              aria-label="Jeu toujours en développement : jouable mais non terminé, bugs possibles"
              className="pointer-events-none select-none absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[16deg] w-[142%] z-10 bg-gradient-to-b from-[#ECEEF4]/95 via-[#DFE3EC]/95 to-[#CFD5E2]/95 backdrop-blur-[2px] border-y-2 border-[#7C849C]/85 ring-1 ring-inset ring-white/55 shadow-[0_3px_10px_rgba(22,24,36,0.18)] py-1.5 px-6 flex flex-col items-center justify-center text-center"
            >
              <span className="text-[10px] sm:text-[10.5px] font-black uppercase tracking-[0.06em] text-[#1E2235] leading-tight">
                Jeu toujours en développement
              </span>
              <span className="text-[9px] font-bold text-[#4B526B] leading-tight mt-0.5">
                Jouable · Non terminé (bugs possibles)
              </span>
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div>
          {modeBadge && (
            <span
              className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md mb-1.5 ${
                isWip ? "bg-[#E4E7F0] text-[#4B526B]" : `${styles.badgeBg} ${styles.badgeText}`
              }`}
            >
              {modeBadge}
            </span>
          )}
          <h3 className="font-display text-base sm:text-lg font-extrabold text-foreground leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-border text-xs font-bold text-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Users size={13} aria-hidden="true" />
              {playersMin}–{playersMax}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {durationMins}m
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
              isWip
                ? "bg-[#E4E7F0] text-[#454B63] group-hover:bg-[#5B6176] group-hover:text-white"
                : "bg-surface-elevated group-hover:bg-primary text-foreground group-hover:text-white"
            }`}
          >
            {isWip ? "Tester" : "Jouer"}
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article
      className={`group relative rounded-2xl border overflow-clip flex flex-col shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-[border-color,transform,box-shadow] duration-150 ${
        isWip
          ? "bg-[#F4F5F8] border-[#CFD5E3] hover:border-[#8E95AC]"
          : `bg-surface border-border ${styles.hoverBorder}`
      }`}
    >
      <div className="absolute top-2.5 right-2.5 z-20">
        <VBubble title={title} description={description} size="sm" />
      </div>

      {href ? (
        <Link href={href} prefetch={false} className="flex flex-col flex-1 focus-visible:outline-2 focus-visible:outline-primary">
          {cardInner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="flex flex-col flex-1 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
        >
          {cardInner}
        </button>
      )}
    </article>
  );
}
