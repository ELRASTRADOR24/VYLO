"use client";

import React from "react";

// Mascotte Officielle VYLO (Petit Fantôme / Esprit Violet 3D Mignon & Lumuminescent)
export function VyloMascot({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mascotGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) scale(55)">
          <stop stopColor="#A855F7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mascotBody" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC" />
          <stop offset="0.5" stopColor="#9333EA" />
          <stop offset="1" stopColor="#6B21A8" />
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      <circle cx="60" cy="60" r="55" fill="url(#mascotGlow)" />

      <g filter="url(#softShadow)">
        <path
          d="M60 18C38 18 24 34 24 58C24 78 30 98 42 98C48 98 52 90 60 90C68 90 72 98 78 98C90 98 96 78 96 58C96 34 82 18 60 18Z"
          fill="url(#mascotBody)"
        />
        <ellipse cx="46" cy="52" rx="6" ry="8" fill="#1E1B4B" />
        <ellipse cx="74" cy="52" rx="6" ry="8" fill="#1E1B4B" />
        <circle cx="44" cy="49" r="2.5" fill="#FFFFFF" />
        <circle cx="72" cy="49" r="2.5" fill="#FFFFFF" />
        <ellipse cx="38" cy="60" rx="4" ry="2.5" fill="#F472B6" opacity="0.6" />
        <ellipse cx="82" cy="60" rx="4" ry="2.5" fill="#F472B6" opacity="0.6" />
        <path d="M54 62C54 66 66 66 66 62" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
        <circle cx="22" cy="35" r="2" fill="#F472B6" />
        <circle cx="98" cy="40" r="3" fill="#E9D5FF" />
        <path d="M90 24L92 28L96 30L92 32L90 36L88 32L84 30L88 28Z" fill="#FACC15" />
      </g>
    </svg>
  );
}

// Illustration Undercover (Agent Secret Néon Violet)
export function UndercoverIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/80 via-slate-950 to-indigo-950/80 border border-purple-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" fill="#A855F7" fillOpacity="0.15" />
        <path d="M50 15L20 85H80L50 15Z" fill="#1E1B4B" opacity="0.4" />
        <path d="M50 25C36 25 30 38 30 52C30 70 38 78 50 78C62 78 70 70 70 52C70 38 64 25 50 25Z" fill="#581C87" />
        <path d="M50 28C38 28 34 40 34 52C34 62 40 74 50 74C66 74 66 62 66 52C66 40 62 28 50 28Z" fill="#3B0764" />
        <rect x="36" y="48" width="12" height="7" rx="3" fill="#C084FC" />
        <rect x="52" y="48" width="12" height="7" rx="3" fill="#C084FC" />
        <line x1="48" y1="51" x2="52" y2="51" stroke="#C084FC" strokeWidth="2" />
      </svg>
    </div>
  );
}

// Illustration Blind Test Musical (Casque Néon & Vinyle Luminescent)
export function BlindTestIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950/80 via-slate-950 to-purple-950/80 border border-pink-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="38" fill="#EC4899" fillOpacity="0.15" />
        <circle cx="50" cy="50" r="28" fill="#18181B" stroke="#EC4899" strokeWidth="3" />
        <circle cx="50" cy="50" r="10" fill="#EC4899" />
        <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
        <path d="M22 50C22 34.5 34.5 22 50 22C65.5 22 78 34.5 78 50" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Illustration Tu Préfères ? (Dilemmes Rouge vs Bleu)
export function TuPreferesIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/80 via-slate-950 to-blue-950/80 border border-purple-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="38" fill="#864CBF" fillOpacity="0.15" />
        <path d="M30 25L45 75H25L10 25H30Z" fill="#E21B3C" />
        <path d="M70 25L55 75H75L90 25H70Z" fill="#1368CE" />
        <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900">?</text>
      </svg>
    </div>
  );
}

// Illustration Loup-Garou (Pleine Lune & Loup Mystique)
export function WerewolfIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-purple-950/90 to-slate-950 border border-indigo-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="45" r="32" fill="#E9D5FF" fillOpacity="0.85" />
        <circle cx="40" cy="38" r="6" fill="#D8B4FE" opacity="0.5" />
        <circle cx="62" cy="48" r="4" fill="#D8B4FE" opacity="0.4" />
        <path d="M30 85C35 70 42 62 48 55C50 52 48 45 44 42C48 40 54 44 58 40C62 36 60 30 56 26C64 30 68 38 66 46C70 52 74 65 80 85H30Z" fill="#1E1B4B" />
      </svg>
    </div>
  );
}

// Illustration Action ou Vérité (Flamme Kawaii & Dynamic Coral)
export function TodIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/80 via-slate-950 to-orange-950/80 border border-red-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="38" fill="#EF4444" fillOpacity="0.15" />
        <path d="M50 18C50 18 68 38 68 58C68 70 60 78 50 78C40 78 32 70 32 58C32 38 50 18 50 18Z" fill="#F97316" />
        <path d="M50 32C50 32 62 46 62 60C62 68 56 74 50 74C44 74 38 68 38 60C38 46 50 32 50 32Z" fill="#FACC15" />
        <ellipse cx="44" cy="56" rx="2.5" ry="4" fill="#7C2D12" />
        <ellipse cx="56" cy="56" rx="2.5" ry="4" fill="#7C2D12" />
        <path d="M47 62C47 64 53 64 53 62" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Illustration Le Saboteur (Détective / Hacker Fedora Dore & Ombre)
export function SaboteurIllustration({ className = "w-full h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-950 to-slate-950 border border-amber-500/30 ${className}`}>
      <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="38" fill="#F59E0B" fillOpacity="0.15" />
        <path d="M25 50H75L68 35H32L25 50Z" fill="#1E293B" />
        <ellipse cx="50" cy="50" rx="30" ry="6" fill="#0F172A" />
        <rect x="32" y="44" width="36" height="5" fill="#F59E0B" />
        <path d="M36 52C36 52 38 74 50 74C62 74 64 52 64 52H36Z" fill="#020617" />
        <ellipse cx="43" cy="58" rx="4" ry="2" fill="#F59E0B" />
        <ellipse cx="57" cy="58" rx="4" ry="2" fill="#F59E0B" />
      </svg>
    </div>
  );
}
