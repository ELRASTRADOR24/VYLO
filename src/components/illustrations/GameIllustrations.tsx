"use client";

import React from "react";

// Mascotte Officielle VYLO (Esprit 3D Violet Mignon & Luminescent)
export function VyloMascot({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mascotGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) scale(55)">
          <stop stopColor="#A855F7" stopOpacity="0.5" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mascotBody" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8B4FE" />
          <stop offset="0.5" stopColor="#A855F7" />
          <stop offset="1" stopColor="#6B21A8" />
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <circle cx="60" cy="60" r="55" fill="url(#mascotGlow)" />

      <g filter="url(#softShadow)">
        <path
          d="M60 18C38 18 24 34 24 58C24 78 30 98 42 98C48 98 52 90 60 90C68 90 72 98 78 98C90 98 96 78 96 58C96 34 82 18 60 18Z"
          fill="url(#mascotBody)"
        />
        <ellipse cx="46" cy="52" rx="6" ry="8" fill="#0F172A" />
        <ellipse cx="74" cy="52" rx="6" ry="8" fill="#0F172A" />
        <circle cx="44" cy="49" r="2.5" fill="#FFFFFF" />
        <circle cx="72" cy="49" r="2.5" fill="#FFFFFF" />
        <ellipse cx="38" cy="60" rx="4" ry="2.5" fill="#F472B6" opacity="0.7" />
        <ellipse cx="82" cy="60" rx="4" ry="2.5" fill="#F472B6" opacity="0.7" />
        <path d="M54 62C54 66 66 66 66 62" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 1. Illustration Undercover 3D Supercell (Agents Silhouettes & Néon Violet)
export function UndercoverIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 border border-purple-500/40 shadow-inner ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <defs>
          <linearGradient id="purpleGlow" x1="0" y1="0" x2="200" y2="240">
            <stop stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="1" stopColor="#3B0764" />
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill="#0B0914" />
        <circle cx="100" cy="110" r="75" fill="#9333EA" fillOpacity="0.25" />
        {/* Silhouette Agent 1 */}
        <path d="M40 220C40 170 60 140 85 130C75 125 70 110 70 95C70 70 85 55 100 55C115 55 130 70 130 95C130 110 125 125 115 130C140 140 160 170 160 220H40Z" fill="#1E1B4B" />
        {/* Ombres et contours Néon */}
        <path d="M75 140C90 130 110 130 125 140C145 155 155 185 155 220H135C135 190 125 165 100 165C75 165 65 190 65 220H45C45 185 55 155 75 140Z" fill="url(#purpleGlow)" />
        <circle cx="100" cy="95" r="22" fill="#C084FC" opacity="0.3" />
        {/* Lunettes lumineuses */}
        <rect x="80" y="90" width="16" height="8" rx="3" fill="#E9D5FF" />
        <rect x="104" y="90" width="16" height="8" rx="3" fill="#E9D5FF" />
        <line x1="96" y1="94" x2="104" y2="94" stroke="#E9D5FF" strokeWidth="2" />
      </svg>
    </div>
  );
}

// 2. Illustration Loup-Garou 3D Supercell (Loup & Pleine Lune Bleue)
export function WerewolfIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 border border-blue-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#070A13" />
        {/* Lune Bleue Géante Lumineuse */}
        <circle cx="100" cy="95" r="60" fill="#60A5FA" fillOpacity="0.2" />
        <circle cx="100" cy="95" r="48" fill="#DBEAFE" fillOpacity="0.9" />
        <circle cx="85" cy="80" r="10" fill="#BFDBFE" opacity="0.5" />
        <circle cx="120" cy="105" r="7" fill="#BFDBFE" opacity="0.4" />
        {/* Silhouette Loup Sauvage */}
        <path d="M50 240C60 200 80 170 95 150C98 140 92 125 84 118C92 115 104 122 112 115C120 108 116 95 108 88C124 96 132 112 128 128C136 140 144 165 155 240H50Z" fill="#1E293B" />
        <path d="M95 150C105 160 115 180 120 240H100C95 190 85 170 70 240H50C60 200 80 170 95 150Z" fill="#3B82F6" opacity="0.6" />
        {/* Yeux lumineux */}
        <circle cx="100" cy="110" r="3" fill="#60A5FA" />
      </svg>
    </div>
  );
}

// 3. Illustration Blind Test Musical 3D Supercell (Enceinte Néo-Verte & Ondes)
export function BlindTestIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 border border-emerald-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#04120D" />
        <circle cx="100" cy="120" r="70" fill="#10B981" fillOpacity="0.2" />
        {/* Enceinte 3D */}
        <rect x="55" y="45" width="90" height="150" rx="20" fill="#064E3B" stroke="#34D399" strokeWidth="4" />
        <rect x="65" y="58" width="70" height="35" rx="8" fill="#022C22" />
        {/* Barres d'égaliseur */}
        <rect x="75" y="70" width="6" height="15" fill="#34D399" />
        <rect x="85" y="65" width="6" height="20" fill="#34D399" />
        <rect x="95" y="60" width="6" height="25" fill="#34D399" />
        <rect x="105" y="68" width="6" height="17" fill="#34D399" />
        <rect x="115" y="72" width="6" height="13" fill="#34D399" />
        {/* Boomer principal */}
        <circle cx="100" cy="140" r="35" fill="#022C22" stroke="#34D399" strokeWidth="5" />
        <circle cx="100" cy="140" r="14" fill="#34D399" />
        <circle cx="100" cy="140" r="5" fill="#FFFFFF" />
        {/* Ondes sonores néon */}
        <path d="M30 140C30 100 50 70 80 70" stroke="#6EE7B7" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <path d="M170 140C170 100 150 70 120 70" stroke="#6EE7B7" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}

// 4. Illustration Action ou Vérité 3D Supercell (Cartes Flamboyantes Orange)
export function TodIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-red-950 via-slate-950 to-orange-950 border border-orange-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#140602" />
        <circle cx="100" cy="120" r="65" fill="#F97316" fillOpacity="0.2" />
        {/* Carte 1 Flamboyante */}
        <rect x="45" y="60" width="70" height="110" rx="12" fill="#7C2D12" stroke="#F97316" strokeWidth="3" transform="rotate(-15 80 115)" />
        {/* Carte 2 Flamboyante */}
        <rect x="85" y="50" width="70" height="110" rx="12" fill="#C2410C" stroke="#FDBA74" strokeWidth="4" transform="rotate(12 120 105)" />
        {/* Flammes 3D */}
        <path d="M100 40C100 40 125 75 125 110C125 130 110 145 95 145C80 145 70 130 70 110C70 75 100 40 100 40Z" fill="#F97316" />
        <path d="M100 65C100 65 115 90 115 115C115 128 108 135 98 135C88 135 82 128 82 115C82 90 100 65 100 65Z" fill="#FDE047" />
      </svg>
    </div>
  );
}

// 5. Illustration Devine le Drapeau 3D Supercell (Globe & Drapeaux Or)
export function FlagQuizIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-slate-950 to-yellow-950 border border-yellow-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#140E03" />
        <circle cx="100" cy="120" r="65" fill="#FACC15" fillOpacity="0.2" />
        {/* Globe 3D */}
        <circle cx="100" cy="120" r="48" fill="#B45309" stroke="#FDE047" strokeWidth="4" />
        <ellipse cx="100" cy="120" rx="48" ry="20" stroke="#FDE047" strokeWidth="2" opacity="0.6" />
        <ellipse cx="100" cy="120" rx="20" ry="48" stroke="#FDE047" strokeWidth="2" opacity="0.6" />
        {/* Mât de drapeau */}
        <line x1="60" y1="50" x2="60" y2="170" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 55H130L110 80L130 105H60V55Z" fill="#F59E0B" stroke="#FDE047" strokeWidth="3" />
        <circle cx="60" cy="45" r="7" fill="#FDE047" />
      </svg>
    </div>
  );
}

// 6. Illustration Tu Préfères 3D Supercell (Cœur Néon Rouge vs Bleu)
export function TuPreferesIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950 via-slate-950 to-blue-950 border border-rose-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#12040A" />
        {/* Côté Rouge vs Côté Bleu */}
        <path d="M40 40L90 200H30L10 40H40Z" fill="#EF4444" opacity="0.8" />
        <path d="M160 40L110 200H170L190 40H160Z" fill="#3B82F6" opacity="0.8" />
        {/* Cœur 3D central */}
        <path d="M100 150L85 135C60 110 60 80 80 65C90 55 100 65 100 65C100 65 110 55 120 65C140 80 140 110 115 135L100 150Z" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    </div>
  );
}

// 7. Illustration Le Saboteur 3D Supercell (Pioche & Cristal Cyan)
export function SaboteurIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-950 to-teal-950 border border-cyan-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#031217" />
        <circle cx="100" cy="120" r="65" fill="#06B6D4" fillOpacity="0.2" />
        {/* Cristal géant */}
        <path d="M100 50L135 110L100 180L65 110L100 50Z" fill="#0891B2" stroke="#67E8F9" strokeWidth="4" />
        <path d="M100 50L100 180" stroke="#CFFAFE" strokeWidth="3" opacity="0.6" />
        {/* Pioche de mineur */}
        <line x1="50" y1="180" x2="150" y2="70" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
        <path d="M120 40C135 45 165 70 170 85L150 95C140 80 125 65 110 60L120 40Z" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="3" />
      </svg>
    </div>
  );
}

// 8. Illustration Le Maître des Mots 3D Supercell (Blocs M-O-T)
export function WordMasterIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950 via-slate-950 to-purple-950 border border-pink-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#14040D" />
        <circle cx="100" cy="120" r="65" fill="#EC4899" fillOpacity="0.2" />
        {/* Blocs 3D */}
        <rect x="35" y="90" width="42" height="42" rx="10" fill="#BE185D" stroke="#F472B6" strokeWidth="3" transform="rotate(-10 56 111)" />
        <text x="56" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" transform="rotate(-10 56 111)">M</text>

        <rect x="79" y="80" width="42" height="42" rx="10" fill="#9D174D" stroke="#F472B6" strokeWidth="3" />
        <text x="100" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900">O</text>

        <rect x="123" y="90" width="42" height="42" rx="10" fill="#BE185D" stroke="#F472B6" strokeWidth="3" transform="rotate(10 144 111)" />
        <text x="144" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" transform="rotate(10 144 111)">T</text>
      </svg>
    </div>
  );
}

// 9. Illustration VYLO Cards — Punchlines 3D Supercell (Cartes Violettes)
export function PunchlinesIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950 via-slate-950 to-pink-950 border border-purple-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#0C0314" />
        <circle cx="100" cy="120" r="65" fill="#8B5CF6" fillOpacity="0.2" />
        <rect x="45" y="60" width="70" height="110" rx="12" fill="#581C87" stroke="#A855F7" strokeWidth="3" transform="rotate(-15 80 115)" />
        <rect x="85" y="50" width="70" height="110" rx="12" fill="#7E22CE" stroke="#F472B6" strokeWidth="4" transform="rotate(12 120 105)" />
        <text x="120" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontWeight="900" transform="rotate(12 120 105)">⚡</text>
      </svg>
    </div>
  );
}

// 10. Illustration VYLO Party 3D Supercell (Smartphone & Éclairs)
export function VyloPartyIllustration({ className = "w-full h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-950 via-slate-950 to-purple-950 border border-pink-500/40 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 200 240" fill="none">
        <rect width="200" height="240" fill="#14030F" />
        <circle cx="100" cy="120" r="65" fill="#EC4899" fillOpacity="0.2" />
        {/* Smartphone 3D */}
        <rect x="65" y="45" width="70" height="140" rx="16" fill="#1F2937" stroke="#F472B6" strokeWidth="4" />
        <rect x="73" y="57" width="54" height="106" rx="8" fill="#831843" />
        {/* Éclair central */}
        <path d="M100 80L90 110H105L95 140L115 105H100L108 80H100Z" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    </div>
  );
}
