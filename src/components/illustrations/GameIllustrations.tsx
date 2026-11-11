import React from "react";

export interface IllustrationProps {
  className?: string;
  priority?: boolean;
  eager?: boolean;
}

function PhotoArtwork({
  src,
  alt,
  className = "w-full h-full",
  priority = false,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  eager?: boolean;
}) {
  return (
    <div className={`relative overflow-clip bg-surface-elevated ${className}`}>
      <img
        src={src}
        alt={alt}
        width={720}
        height={450}
        loading={priority || eager ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]"
      />
    </div>
  );
}

// Logo VYLO — L'As de Soirée (Cartes V)
export function VyloMascot({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#FFFFFF" />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="15.25"
        stroke="#161824"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
      <g transform="rotate(14 39 32)">
        <rect x="27" y="13" width="22" height="35" rx="6.5" fill="#4F46E5" />
        <circle cx="38" cy="24" r="3" fill="#EEF2FF" fillOpacity="0.55" />
      </g>
      <g transform="rotate(-11 25 33)">
        <rect
          x="13.5"
          y="14.5"
          width="23.5"
          height="36.5"
          rx="7"
          fill="#E84545"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <path
          d="M19.5 25.5H23.2L25.4 33.4L27.6 25.5H31.3L27.1 38.5H23.7L19.5 25.5Z"
          fill="#FFFFFF"
        />
      </g>
      <path
        d="M49 9.5L50.8 13.7L55 15.5L50.8 17.3L49 21.5L47.2 17.3L43 15.5L47.2 13.7L49 9.5Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function VyloWordmark({
  className = "h-5 w-auto",
  dotColor = "#E84545",
}: {
  className?: string;
  dotColor?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 125 34" fill="none" aria-hidden="true">
      <path d="M2 5H10.2L15.6 22.8L21 5H29.2L19.6 29.5H11.6L2 5Z" fill="currentColor" />
      <path d="M31.5 5H39.8L44.6 15.6L49.4 5H57.6L48.4 22.2V29.5H40.8V22.2L31.5 5Z" fill="currentColor" />
      <path d="M62 5H69.6V23H82.5V29.5H62V5Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104 4.2C93.8 4.2 86.5 10 86.5 17.2C86.5 24.4 93.8 30.2 104 30.2C114.2 30.2 121.5 24.4 121.5 17.2C121.5 10 114.2 4.2 104 4.2ZM104 10.6C98.2 10.6 94.3 13.4 94.3 17.2C94.3 21 98.2 23.8 104 23.8C109.8 23.8 113.7 21 113.7 17.2C113.7 13.4 109.8 10.6 104 10.6Z"
        fill="currentColor"
      />
      <circle cx="104" cy="17.2" r="3.4" fill={dotColor} />
    </svg>
  );
}

export function UndercoverIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/undercover.webp"
      alt="Illustration Undercover"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function WerewolfIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/werewolf.webp"
      alt="Illustration Loup-Garou"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function BlindTestIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/blind-test.webp"
      alt="Illustration Blind Test Musical"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function FakeArtistIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/fake-artist.webp"
      alt="Illustration Faux Artiste"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function TodIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/truth-or-dare.webp"
      alt="Illustration Action ou Vérité"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function TuPreferesIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/tu-preferes.webp"
      alt="Illustration Tu Préfères"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function FlagQuizIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/flag-quiz.webp"
      alt="Illustration Devine le Drapeau"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function SaboteurIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/saboteur.webp"
      alt="Illustration Le Saboteur"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function WordMasterIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/word-master.webp"
      alt="Illustration Le Maître des Mots"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function PunchlinesIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/punchlines.webp"
      alt="Illustration Punchlines"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function VyloPartyIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/vylo-party.webp"
      alt="Illustration VYLO Party"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export function MostLikelyToIllustration({ className, priority, eager }: IllustrationProps) {
  return (
    <PhotoArtwork
      src="/images/games/most-likely-to.webp"
      alt="Illustration Qui pourrait"
      className={className}
      priority={priority}
      eager={eager}
    />
  );
}

export interface GameVisualMeta {
  themeColor: "purple" | "blue" | "green" | "orange" | "yellow" | "red" | "cyan" | "pink";
  hex: string;
  renderIllustration: (props?: IllustrationProps) => React.ReactNode;
}

export const GAME_ART_REGISTRY: Record<string, GameVisualMeta> = {
  "undercover": {
    themeColor: "purple",
    hex: "#4F46E5",
    renderIllustration: (props) => <UndercoverIllustration {...props} />,
  },
  "werewolf": {
    themeColor: "blue",
    hex: "#4F46E5",
    renderIllustration: (props) => <WerewolfIllustration {...props} />,
  },
  "blind-test": {
    themeColor: "green",
    hex: "#10B981",
    renderIllustration: (props) => <BlindTestIllustration {...props} />,
  },
  "fake-artist": {
    themeColor: "green",
    hex: "#10B981",
    renderIllustration: (props) => <FakeArtistIllustration {...props} />,
  },
  "truth-or-dare": {
    themeColor: "red",
    hex: "#E84545",
    renderIllustration: (props) => <TodIllustration {...props} />,
  },
  "tu-preferes": {
    themeColor: "purple",
    hex: "#4F46E5",
    renderIllustration: (props) => <TuPreferesIllustration {...props} />,
  },
  "flag-quiz": {
    themeColor: "blue",
    hex: "#2563EB",
    renderIllustration: (props) => <FlagQuizIllustration {...props} />,
  },
  "saboteur": {
    themeColor: "yellow",
    hex: "#F59E0B",
    renderIllustration: (props) => <SaboteurIllustration {...props} />,
  },
  "word-master": {
    themeColor: "yellow",
    hex: "#F59E0B",
    renderIllustration: (props) => <WordMasterIllustration {...props} />,
  },
  "punchlines": {
    themeColor: "pink",
    hex: "#E84545",
    renderIllustration: (props) => <PunchlinesIllustration {...props} />,
  },
  "vylo-party": {
    themeColor: "orange",
    hex: "#F59E0B",
    renderIllustration: (props) => <VyloPartyIllustration {...props} />,
  },
  "most-likely-to": {
    themeColor: "purple",
    hex: "#4F46E5",
    renderIllustration: (props) => <MostLikelyToIllustration {...props} />,
  },
};

export function getGameVisualMeta(gameId: string): GameVisualMeta {
  return GAME_ART_REGISTRY[gameId] || GAME_ART_REGISTRY["undercover"];
}
