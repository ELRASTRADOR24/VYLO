"use client";

import React from "react";

// Mascotte Officielle VYLO (Esprit Vector Mignon)
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
      </defs>
      <circle cx="60" cy="60" r="55" fill="url(#mascotGlow)" />
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
    </svg>
  );
}

// Composant Helper pour les rayons de soleil arrière-plan (Sunburst)
function SunburstRays({ color = "#FFFFFF", opacity = 0.15 }: { color?: string; opacity?: number }) {
  const rays = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    return (
      <line
        key={i}
        x1="100"
        y1="110"
        x2={100 + 120 * Math.cos((angle * Math.PI) / 180)}
        y2={110 + 120 * Math.sin((angle * Math.PI) / 180)}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity={opacity}
      />
    );
  });
  return <g>{rays}</g>;
}

// 1. Carte Tarot / Vector Undercover (Agent & Ombre)
export function UndercoverIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#1E1233] border-4 border-[#A855F7] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        {/* Arrière-plan & Sunburst */}
        <rect width="200" height="280" fill="#2E1B4E" />
        <SunburstRays color="#C084FC" opacity={0.25} />
        <circle cx="100" cy="110" r="60" fill="#7E22CE" opacity="0.3" />

        {/* Cadre Ornemental Vector */}
        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#F0ABFC" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        <circle cx="15" cy="15" r="3" fill="#F0ABFC" />
        <circle cx="185" cy="15" r="3" fill="#F0ABFC" />
        <circle cx="15" cy="265" r="3" fill="#F0ABFC" />
        <circle cx="185" cy="265" r="3" fill="#F0ABFC" />

        {/* Illustration Centrale : Deux Silhouettes Back-to-Back */}
        <g transform="translate(0, -10)">
          {/* Agent 1 */}
          <path d="M60 170C60 135 75 115 90 108C82 104 78 92 78 80C78 60 90 48 100 48C110 48 122 60 122 80C122 92 118 104 110 108C125 115 140 135 140 170H60Z" fill="#0F172A" />
          {/* Veste Néon */}
          <path d="M85 112C95 105 105 105 115 112C130 125 136 150 136 170H118C118 145 110 128 100 128C90 128 82 145 82 170H64C64 150 70 125 85 112Z" fill="#C084FC" />
          {/* Lunettes Espion */}
          <rect x="84" y="75" width="14" height="6" rx="2" fill="#F0ABFC" />
          <rect x="102" y="75" width="14" height="6" rx="2" fill="#F0ABFC" />
          <line x1="98" y1="78" x2="102" y2="78" stroke="#F0ABFC" strokeWidth="2" />
        </g>

        {/* Ruban Bannière Titre en Bas */}
        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#7E22CE" stroke="#F0ABFC" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="2">
            UNDERCOVER
          </text>
        </g>
      </svg>
    </div>
  );
}

// 2. Carte Tarot / Vector Loup-Garou (Loup sous la Lune)
export function WerewolfIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#0F172A] border-4 border-[#3B82F6] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        {/* Arrière-plan & Sunburst */}
        <rect width="200" height="280" fill="#1E293B" />
        <SunburstRays color="#60A5FA" opacity={0.25} />
        <circle cx="100" cy="100" r="50" fill="#93C5FD" opacity="0.9" />

        {/* Cadre Ornemental Vector */}
        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        <circle cx="15" cy="15" r="3" fill="#93C5FD" />
        <circle cx="185" cy="15" r="3" fill="#93C5FD" />
        <circle cx="15" cy="265" r="3" fill="#93C5FD" />
        <circle cx="185" cy="265" r="3" fill="#93C5FD" />

        {/* Illustration Centrale : Tête de Loup Hurlant */}
        <g transform="translate(0, -5)">
          <path d="M60 185C70 150 85 130 95 115C98 105 92 90 84 83C92 80 104 87 112 80C120 73 116 60 108 53C124 61 132 77 128 93C136 105 144 130 155 185H60Z" fill="#020617" />
          <path d="M95 115C105 125 115 145 120 185H100C95 150 85 130 70 185H60C70 150 85 130 95 115Z" fill="#3B82F6" opacity="0.6" />
          <circle cx="100" cy="78" r="3" fill="#60A5FA" />
        </g>

        {/* Ruban Bannière Titre en Bas */}
        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#1E40AF" stroke="#93C5FD" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="2">
            LOUP-GAROU
          </text>
        </g>
      </svg>
    </div>
  );
}

// 3. Carte Tarot / Vector Blind Test (Enceinte & Soundwaves)
export function BlindTestIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#022C22] border-4 border-[#10B981] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        {/* Arrière-plan & Sunburst */}
        <rect width="200" height="280" fill="#064E3B" />
        <SunburstRays color="#6EE7B7" opacity={0.25} />
        <circle cx="100" cy="105" r="55" fill="#10B981" opacity="0.3" />

        {/* Cadre Ornemental Vector */}
        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        {/* Illustration Centrale : Enceinte Vector */}
        <g transform="translate(0, -10)">
          <rect x="65" y="45" width="70" height="120" rx="14" fill="#022C22" stroke="#34D399" strokeWidth="3" />
          <circle cx="100" cy="75" r="14" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <circle cx="100" cy="125" r="24" fill="#064E3B" stroke="#34D399" strokeWidth="3" />
          <circle cx="100" cy="125" r="8" fill="#34D399" />

          {/* Ondes Musicales */}
          <path d="M35 125C35 95 50 75 75 75" stroke="#6EE7B7" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M165 125C165 95 150 75 125 75" stroke="#6EE7B7" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* Ruban Bannière Titre en Bas */}
        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#047857" stroke="#6EE7B7" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="2">
            BLIND TEST
          </text>
        </g>
      </svg>
    </div>
  );
}

// 4. Carte Tarot / Vector Action ou Vérité (Masque & Flamme)
export function TodIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#451A03] border-4 border-[#F97316] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        {/* Arrière-plan & Sunburst */}
        <rect width="200" height="280" fill="#7C2D12" />
        <SunburstRays color="#FDBA74" opacity={0.25} />
        <circle cx="100" cy="105" r="55" fill="#F97316" opacity="0.3" />

        {/* Cadre Ornemental Vector */}
        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#FDBA74" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        {/* Illustration Centrale : Flamme Royale Vector */}
        <g transform="translate(0, -10)">
          <path d="M100 45C100 45 125 80 125 115C125 135 110 150 95 150C80 150 70 135 70 115C70 80 100 45 100 45Z" fill="#F97316" stroke="#FDBA74" strokeWidth="2" />
          <path d="M100 70C100 70 115 95 115 120C115 133 108 140 98 140C88 140 82 133 82 120C82 95 100 70 100 70Z" fill="#FACC15" />
        </g>

        {/* Ruban Bannière Titre en Bas */}
        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#C2410C" stroke="#FDBA74" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
            ACTION OU VÉRITÉ
          </text>
        </g>
      </svg>
    </div>
  );
}

// 5. Carte Tarot / Vector Devine le Drapeau (Globe Or)
export function FlagQuizIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#451A03] border-4 border-[#FACC15] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#78350F" />
        <SunburstRays color="#FDE047" opacity={0.25} />
        <circle cx="100" cy="105" r="55" fill="#FACC15" opacity="0.3" />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#FDE047" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <circle cx="100" cy="105" r="42" fill="#B45309" stroke="#FDE047" strokeWidth="3" />
          <ellipse cx="100" cy="105" rx="42" ry="18" stroke="#FDE047" strokeWidth="2" opacity="0.6" />
          <ellipse cx="100" cy="105" rx="18" ry="42" stroke="#FDE047" strokeWidth="2" opacity="0.6" />
          {/* Drapeau */}
          <line x1="60" y1="45" x2="60" y2="155" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 50H125L108 72L125 95H60V50Z" fill="#F59E0B" stroke="#FDE047" strokeWidth="2" />
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#D97706" stroke="#FDE047" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
            DEVINE LE DRAPEAU
          </text>
        </g>
      </svg>
    </div>
  );
}

// 6. Carte Tarot / Vector Tu Préfères ? (Cœur Séparé Rouge vs Bleu)
export function TuPreferesIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#4C0519] border-4 border-[#EF4444] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#881337" />
        <SunburstRays color="#FDA4AF" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#FDA4AF" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <path d="M100 140L86 126C62 102 62 74 82 60C91 50 100 60 100 60C100 60 109 50 118 60C138 74 138 102 114 126L100 140Z" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="3" />
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#BE123C" stroke="#FDA4AF" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="1">
            TU PRÉFÈRES ?
          </text>
        </g>
      </svg>
    </div>
  );
}

// 7. Carte Tarot / Vector Le Saboteur (Pioche & Gemme Cyan)
export function SaboteurIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#083344] border-4 border-[#06B6D4] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#155E75" />
        <SunburstRays color="#67E8F9" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#67E8F9" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <path d="M100 45L130 95L100 160L70 95L100 45Z" fill="#0891B2" stroke="#67E8F9" strokeWidth="3" />
          <line x1="50" y1="160" x2="150" y2="60" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#0E7490" stroke="#67E8F9" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="1">
            LE SABOTEUR
          </text>
        </g>
      </svg>
    </div>
  );
}

// 8. Carte Tarot / Vector Le Maître des Mots (Lettres M-O-T)
export function WordMasterIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#500724] border-4 border-[#EC4899] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#831843" />
        <SunburstRays color="#F472B6" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#F472B6" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <rect x="40" y="85" width="36" height="36" rx="8" fill="#BE185D" stroke="#F472B6" strokeWidth="2" transform="rotate(-8 58 103)" />
          <text x="58" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" transform="rotate(-8 58 103)">M</text>

          <rect x="82" y="75" width="36" height="36" rx="8" fill="#9D174D" stroke="#F472B6" strokeWidth="2" />
          <text x="100" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900">O</text>

          <rect x="124" y="85" width="36" height="36" rx="8" fill="#BE185D" stroke="#F472B6" strokeWidth="2" transform="rotate(8 142 103)" />
          <text x="142" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" transform="rotate(8 142 103)">T</text>
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#BE185D" stroke="#F472B6" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
            MAÎTRE DES MOTS
          </text>
        </g>
      </svg>
    </div>
  );
}

// 9. Carte Tarot / Vector VYLO Cards — Punchlines
export function PunchlinesIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#2E1065] border-4 border-[#8B5CF6] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#4C1D95" />
        <SunburstRays color="#C4B5FD" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <rect x="45" y="60" width="60" height="95" rx="10" fill="#581C87" stroke="#A855F7" strokeWidth="2" transform="rotate(-12 75 107)" />
          <rect x="85" y="50" width="60" height="95" rx="10" fill="#7E22CE" stroke="#F472B6" strokeWidth="3" transform="rotate(10 115 97)" />
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#6D28D9" stroke="#C4B5FD" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="1">
            VYLO CARDS
          </text>
        </g>
      </svg>
    </div>
  );
}

// 10. Carte Tarot / Vector VYLO Party (Smartphone & Éclairs)
export function VyloPartyIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#500724] border-4 border-[#EC4899] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#831843" />
        <SunburstRays color="#F472B6" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#F472B6" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        <g transform="translate(0, -10)">
          <rect x="65" y="45" width="70" height="120" rx="14" fill="#1F2937" stroke="#F472B6" strokeWidth="3" />
          <rect x="73" y="55" width="54" height="90" rx="6" fill="#831843" />
          <path d="M100 75L90 100H104L96 125L114 96H100L107 75H100Z" fill="#FACC15" />
        </g>

        <g transform="translate(0, 220)">
          <path d="M25 10L100 0L175 10L165 35L100 25L35 35L25 10Z" fill="#BE185D" stroke="#F472B6" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="1">
            VYLO PARTY
          </text>
        </g>
      </svg>
    </div>
  );
}

// 11. Carte Tarot / Vector Faux Artiste (Palette, Pinceau & Toile)
export function FakeArtistIllustration({ className = "w-full h-56" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#064E3B] border-4 border-[#10B981] p-2 shadow-2xl ${className}`}>
      <svg className="w-full h-full rounded-xl overflow-hidden" viewBox="0 0 200 280" fill="none">
        <rect width="200" height="280" fill="#047857" />
        <SunburstRays color="#6EE7B7" opacity={0.25} />

        <rect x="8" y="8" width="184" height="264" rx="8" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        {/* Palette & Pinceau central */}
        <g transform="translate(0, 0)">
          {/* Palette de peinture */}
          <path d="M100 60C60 60 40 85 45 125C48 150 70 170 95 165C105 163 112 150 122 155C132 160 140 170 155 160C170 150 175 120 170 95C165 70 140 60 100 60Z" fill="#1E293B" stroke="#6EE7B7" strokeWidth="3" />
          
          {/* Trou pour le pouce */}
          <ellipse cx="75" cy="140" rx="8" ry="12" fill="#047857" stroke="#6EE7B7" strokeWidth="2" />
          
          {/* Taches de couleur */}
          <circle cx="80" cy="85" r="7" fill="#EF4444" />
          <circle cx="110" cy="78" r="7" fill="#3B82F6" />
          <circle cx="140" cy="90" r="7" fill="#F59E0B" />
          <circle cx="150" cy="120" r="7" fill="#EC4899" />
          <circle cx="130" cy="145" r="7" fill="#8B5CF6" />

          {/* Pinceau traversant */}
          <g transform="rotate(35 100 110)">
            <rect x="96" y="25" width="8" height="90" rx="3" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
            <rect x="95" y="115" width="10" height="15" fill="#94A3B8" />
            <path d="M95 130C95 140 105 140 105 130Z" fill="#10B981" />
          </g>
        </g>

        {/* Ruban Inférieur */}
        <g transform="translate(0, 220)">
          <path d="M20 10L100 0L180 10L170 35L100 25L30 35L20 10Z" fill="#065F46" stroke="#6EE7B7" strokeWidth="2" />
          <text x="100" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
            FAUX ARTISTE
          </text>
        </g>
      </svg>
    </div>
  );
}

