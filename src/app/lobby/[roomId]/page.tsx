"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { getGameList } from "@/games";
import { GameConfig } from "@/engine/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { 
  ChevronLeft, Users, UserPlus, Trash2, Play, Sparkles, 
  QrCode, Share2, Check, AlertCircle, RefreshCw, Smartphone, Globe
} from "lucide-react";
import { sfxTap, sfxSuccess, sfxError } from "@/lib/audio";
import { 
  UndercoverIllustration, WerewolfIllustration, BlindTestIllustration, 
  TodIllustration, FlagQuizIllustration, TuPreferesIllustration, SaboteurIllustration, 
  WordMasterIllustration, PunchlinesIllustration, VyloPartyIllustration, FakeArtistIllustration 
} from "@/components/illustrations/GameIllustrations";

const GAME_ART_MAP: Record<string, { themeColor: string; hex: string; illustration: React.ReactNode }> = {
  "undercover": { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-16 h-16" /> },
  "fake-artist": { themeColor: "green", hex: "#10B981", illustration: <FakeArtistIllustration className="w-16 h-16" /> },
  "werewolf": { themeColor: "blue", hex: "#2563EB", illustration: <WerewolfIllustration className="w-16 h-16" /> },
  "blind-test": { themeColor: "green", hex: "#10B981", illustration: <BlindTestIllustration className="w-16 h-16" /> },
  "truth-or-dare": { themeColor: "orange", hex: "#F97316", illustration: <TodIllustration className="w-16 h-16" /> },
  "flag-quiz": { themeColor: "yellow", hex: "#FACC15", illustration: <FlagQuizIllustration className="w-16 h-16" /> },
  "tu-preferes": { themeColor: "red", hex: "#EF4444", illustration: <TuPreferesIllustration className="w-16 h-16" /> },
  "saboteur": { themeColor: "cyan", hex: "#06B6D4", illustration: <SaboteurIllustration className="w-16 h-16" /> },
  "word-master": { themeColor: "pink", hex: "#EC4899", illustration: <WordMasterIllustration className="w-16 h-16" /> },
  "punchlines": { themeColor: "purple", hex: "#8B5CF6", illustration: <PunchlinesIllustration className="w-16 h-16" /> },
  "vylo-party": { themeColor: "pink", hex: "#EC4899", illustration: <VyloPartyIllustration className="w-16 h-16" /> },
};

const EMOJI_AVATARS = ["😎", "🦊", "🐯", "🦁", "🐉", "🦄", "🐼", "🤖", "👽", "👑", "🔥", "🚀"];

export default function UniversalLobbyPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { savedGroup, addPlayerToSavedGroup, removePlayerFromSavedGroup, setSavedGroup } = useAppStore();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<string>("undercover");
  const [copiedCode, setCopiedCode] = useState(false);
  const [playMode, setPlayMode] = useState<"local" | "online">("local");

  const allGames = getGameList();
  const currentGame = allGames.find(g => g.id === selectedGameId) || allGames[0];
  const art = GAME_ART_MAP[currentGame.id] || GAME_ART_MAP["undercover"];

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    addPlayerToSavedGroup(newPlayerName.trim(), EMOJI_AVATARS[savedGroup.length % EMOJI_AVATARS.length]);
    setNewPlayerName("");
    sfxTap();
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(roomId);
      setCopiedCode(true);
      sfxSuccess();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleStartGame = () => {
    if (savedGroup.length < currentGame.players.min) {
      sfxError();
      alert(`Il faut au moins ${currentGame.players.min} joueurs pour lancer ${currentGame.name} !`);
      return;
    }

    sfxSuccess();
    if (playMode === "local") {
      router.push(`/play/${currentGame.id}/${roomId}`);
    } else {
      router.push(`/online/${currentGame.id}/${roomId}`);
    }
  };

  const isPlayerCountValid = savedGroup.length >= currentGame.players.min && savedGroup.length <= currentGame.players.max;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-36 max-w-md md:max-w-3xl mx-auto relative text-center">
      <LivingBackground accentColor={art.hex} />

      {/* Navigation Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <button 
          onClick={() => { sfxTap(); router.push("/"); }} 
          className="h-10 px-4 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Accueil
        </button>

        <div className="flex items-center gap-2 bg-surface/90 border border-white/10 px-4 py-1.5 rounded-full shadow-soft">
          <span className="text-[10px] font-black text-foreground/50 uppercase tracking-widest">Salon</span>
          <span className="text-sm font-black text-primary tracking-widest">#{roomId}</span>
          <button onClick={handleCopyCode} className="text-foreground/50 hover:text-primary ml-1 transition-colors">
            {copiedCode ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
          </button>
        </div>

        <div className="w-20 shrink-0" />
      </div>

      {/* Titre Principal */}
      <div className="w-full mb-6 z-10 text-left">
        <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
          <Sparkles className="text-primary" size={28} /> Salon de Partie Universel
        </h1>
        <p className="text-xs md:text-sm font-bold text-foreground/60 mt-1">
          Ajoutez tous vos joueurs, puis choisissez le jeu auquel vous voulez jouer !
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* ÉTAPE 1 : AJOUT ET GESTION DES JOUEURS */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="w-full mb-8 z-10 text-left">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-extrabold uppercase tracking-widest text-primary flex items-center gap-2">
            <Users size={16} /> 1. Les Joueurs ({savedGroup.length})
          </label>

          {savedGroup.length < 2 && (
            <span className="text-[11px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
              Ajoutez au moins 2 joueurs
            </span>
          )}
        </div>

        {/* Input d'ajout */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Prénom du joueur..."
            className="flex-1 bg-surface/90 border-2 border-white/10 rounded-2xl px-4 py-3.5 font-bold text-foreground focus:border-primary outline-none text-sm transition-all shadow-soft"
            onKeyDown={(e) => { if (e.key === "Enter") handleAddPlayer(); }}
          />
          <Button variant="primary" className="px-5 rounded-2xl gap-1.5 shadow-summer-glow" onClick={handleAddPlayer}>
            <UserPlus size={18} /> Ajouter
          </Button>
        </div>

        {/* Preset Rapide si la liste est vide */}
        {savedGroup.length === 0 && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center mb-4">
            <p className="text-xs font-bold text-foreground/60 mb-2">Pas encore de joueurs ? Ajoutez un groupe rapide :</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setSavedGroup([
                    { name: "Alex", avatar: "😎" },
                    { name: "Sam", avatar: "🦊" },
                    { name: "Léa", avatar: "🐯" },
                    { name: "Hugo", avatar: "🦁" }
                  ]);
                  sfxSuccess();
                }}
                className="px-3.5 py-2 bg-surface border border-white/10 rounded-xl text-xs font-black text-primary hover:bg-white/10 transition-all"
              >
                + 4 Joueurs démo
              </button>
            </div>
          </div>
        )}

        {/* Liste des Joueurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {savedGroup.map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center bg-surface/90 border border-white/10 p-3.5 rounded-2xl shadow-soft">
              <span className="font-black text-sm flex items-center gap-3 text-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-lg shrink-0">
                  {p.avatar || "😎"}
                </span>
                <span className="truncate">{p.name}</span>
              </span>
              <button 
                onClick={() => { removePlayerFromSavedGroup(p.id); sfxTap(); }} 
                className="text-foreground/40 hover:text-red-400 p-1.5 transition-colors"
                title="Supprimer le joueur"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* ÉTAPE 2 : SELECTION DU JEU */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="w-full mb-8 z-10 text-left">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-extrabold uppercase tracking-widest text-primary flex items-center gap-2">
            <Sparkles size={16} /> 2. Choisir le Jeu
          </label>
          
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => { setPlayMode("local"); sfxTap(); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                playMode === "local" ? "bg-primary text-white shadow-soft" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Smartphone size={12} /> Local (1 Téléphone)
            </button>
            <button
              onClick={() => { setPlayMode("online"); sfxTap(); }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                playMode === "online" ? "bg-cyan-500 text-white shadow-soft" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Globe size={12} /> En Ligne (Chacun son tel)
            </button>
          </div>
        </div>

        {/* Grille des Jeux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allGames.map((game) => {
            const isSelected = game.id === selectedGameId;
            const isCompatible = savedGroup.length === 0 || (savedGroup.length >= game.players.min && savedGroup.length <= game.players.max);
            const gameArt = GAME_ART_MAP[game.id] || GAME_ART_MAP["undercover"];

            return (
              <Card
                key={game.id}
                onClick={() => { setSelectedGameId(game.id); sfxTap(); }}
                className={`p-4 cursor-pointer transition-all border flex items-center justify-between text-left relative overflow-hidden ${
                  isSelected 
                    ? "bg-gradient-to-r from-surface via-primary/10 to-surface border-primary shadow-glow scale-[1.02]" 
                    : "bg-surface/90 border-white/10 hover:border-white/20"
                } ${!isCompatible ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    {gameArt.illustration}
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className="text-sm font-black text-foreground flex items-center gap-1.5">
                      {game.name}
                      {isSelected && <Check size={16} className="text-primary shrink-0" />}
                    </span>
                    <span className="text-[11px] font-bold text-foreground/50 truncate max-w-[170px]">
                      {game.category} • {game.players.min}-{game.players.max} Joueurs
                    </span>
                  </div>
                </div>

                {!isCompatible && (
                  <span className="text-[9px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                    Min {game.players.min}
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* BARRE FIXE DU BAS : LANCEMENT DE LA PARTIE */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {!isPlayerCountValid && savedGroup.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 py-1.5 px-3 rounded-xl border border-amber-500/20">
              <AlertCircle size={14} /> 
              {savedGroup.length < currentGame.players.min 
                ? `Il faut au moins ${currentGame.players.min} joueurs pour ${currentGame.name}`
                : `Maximum ${currentGame.players.max} joueurs pour ${currentGame.name}`
              }
            </div>
          )}

          <Button 
            variant="primary" 
            className="w-full h-16 text-lg gap-2 shadow-summer-glow"
            onClick={handleStartGame}
          >
            <Play size={22} className="fill-white" /> 
            Lancer {currentGame.name} ({savedGroup.length} Joueur{savedGroup.length > 1 ? "s" : ""})
          </Button>
        </div>
      </div>
    </main>
  );
}
