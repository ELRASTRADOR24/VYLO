"use client";

import { use, useEffect, useState } from "react";
import { useSocket, PlayerOnline } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  Eye, EyeOff, Skull, Trophy, Share, Wifi, WifiOff, Users, Crown, QrCode, 
  Play, Flame, ShieldAlert, Mic, Vote, RefreshCw, ArrowRight, Check, Sparkles, ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { WORD_PAIRS_DATABASE, CATEGORIES, CategoryName, generateRolesFromConfig, generateMysteryRoles, generateRolesFromConfigExtended, getRandomWordPair } from "@/games/undercover/logic";
import { sfxTap, sfxReveal, sfxVictory, sfxError, sfxSuspense, sfxSuccess, sfxJoin } from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineUndercoverGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { 
    socket, isConnected, roomState, secretData, 
    joinRoom, toggleReady, startUndercover, nextSpeaker, 
    startVote, castVote, submitMrWhiteGuess, continueRound, restartLobby 
  } = useSocket();
  const { guestProfile } = useAppStore();
  const router = useRouter();

  // Local Component States
  const [showSecret, setShowSecret] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>(["Toutes les catégories"]);
  const [undercoverCount, setUndercoverCount] = useState<number>(1);
  const [includeMrWhite, setIncludeMrWhite] = useState<boolean>(false);
  const [jokerCount, setJokerCount] = useState<number>(0);
  const [cameleonCount, setCameleonCount] = useState<number>(0);
  const [doubleAgentCount, setDoubleAgentCount] = useState<number>(0);
  const [turnTimerSec, setTurnTimerSec] = useState<number>(30);
  const [hideCategory, setHideCategory] = useState<boolean>(false);
  const [revealRoleOnElimination, setRevealRoleOnElimination] = useState<boolean>(true);

  const handleToggleCategory = (cat: CategoryName) => {
    sfxTap();
    if (cat === "Toutes les catégories") {
      setSelectedCategories(["Toutes les catégories"]);
      return;
    }

    setSelectedCategories(prev => {
      let current = prev.filter(c => c !== "Toutes les catégories");
      if (current.includes(cat)) {
        current = current.filter(c => c !== cat);
      } else {
        current.push(cat);
      }
      if (current.length === 0) return ["Toutes les catégories"];
      return current;
    });
  };

  // Voting Selection State
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  // Mr White Guess State
  const [mrWhiteGuessInput, setMrWhiteGuessInput] = useState<string>("");

  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId, "undercover", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [isConnected, roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  // Sons & notifications
  const playerCount = roomState?.players.length || 0;
  useEffect(() => {
    if (playerCount > 1) sfxJoin();
  }, [playerCount]);

  useEffect(() => {
    if (roomState?.state === "END_GAME") {
      sfxVictory();
    }
  }, [roomState?.state]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    sfxTap();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Rejoins-moi sur VYLO !",
      text: `On joue à Undercover ! Code du salon : ${roomId}`,
      url: `${window.location.origin}/online/undercover/${roomId}`
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      handleCopyCode();
    }
  };

  // Identification précise du joueur courant & du rôle Hôte
  const players = roomState?.players || [];
  const meInRoom = players.find(p => p.id === socket?.id || p.name === guestProfile.pseudo);
  const isHost = meInRoom?.isHost || roomState?.isHost || (players.length > 0 && players[0].name === guestProfile.pseudo);

  const activePlayers = players.filter(p => !p.isEliminated);
  const guests = players.filter(p => !p.isHost);
  const guestsReadyCount = guests.filter(p => p.isReady).length;
  const totalCount = players.length;
  const canStart = totalCount >= 3 && (guests.length === 0 || guestsReadyCount === guests.length);

  const [isMysteryMode, setIsMysteryMode] = useState<boolean>(false);

  // Lancement de la partie par l'hôte
  const handleHostStart = () => {
    if (totalCount < 3) {
      sfxError();
      return alert("Il faut au moins 3 joueurs pour lancer un Undercover !");
    }

    const mrWhiteCount = includeMrWhite ? 1 : 0;
    const roles = isMysteryMode 
      ? generateMysteryRoles(totalCount)
      : generateRolesFromConfigExtended(totalCount, undercoverCount, mrWhiteCount, jokerCount, cameleonCount, doubleAgentCount);

    // Choix du mot (Multi-catégories)
    const wordPair = getRandomWordPair(selectedCategories);

    // Générer l'ordre de parole mélangé
    const speakingOrder = [...players.map(p => p.id)].sort(() => Math.random() - 0.5);

    const playerSecrets: Record<string, { role: string; word: string; category: string }> = {};

    players.forEach((p, index) => {
      const role = roles[index];
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else if (role === "MrWhite") word = "Mr. White";
      else if (role === "Joker") word = "🃏 Le Joker (Votre but : faites-vous éliminer au TOUT PREMIER VOTE du Tour 1 pour GAGNER !)";
      else if (role === "Cameleon") word = "🪞 Le Caméléon (Copiez la description du 1er joueur !)";
      else if (role === "DoubleAgent") word = `${wordPair.civilian} (💣 Double-Agent : emporte 1 joueur à sa mort)`;

      playerSecrets[p.id] = { role, word, category: wordPair.category };
    });

    sfxSuspense();
    startUndercover(roomId, playerSecrets, speakingOrder, wordPair.category, wordPair.civilian);
  };

  // Dépouillement du vote
  const handleCastVoteSubmit = () => {
    if (!selectedTargetId) return;
    sfxSuccess();
    castVote(roomId, selectedTargetId);
  };

  // Soumission de devinette Mr White
  const handleMrWhiteGuessSubmit = () => {
    if (!mrWhiteGuessInput.trim()) return;
    sfxReveal();
    submitMrWhiteGuess(roomId, mrWhiteGuessInput);
  };

  // =========================================================================
  // 1. PHASE LOBBY (Attente & Configuration des paramètres)
  // =========================================================================
  if (!roomState || roomState.state === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-8 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto pb-36">
        <QRCodeModal 
          isOpen={showQR} 
          onClose={() => setShowQR(false)} 
          roomCode={roomId} 
        />

        {/* Status bar */}
        <div className="w-full flex items-center justify-between mb-6">
          <button 
            onClick={() => {
              sfxTap();
              if (typeof window !== "undefined" && window.history.length > 1) router.back();
              else router.push("/library");
            }} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer z-50"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isConnected ? "En ligne" : "Connexion..."}
          </div>
        </div>

        {/* Code du Salon */}
        <Card className="w-full p-8 mb-6 text-center bg-surface/80 border border-white/10 shadow-soft">
          <p className="text-xs font-black text-foreground/50 uppercase tracking-[0.3em] mb-2">Salon Multijoueur</p>
          <div className="text-5xl font-black tracking-[0.4em] text-primary mb-6">{roomId}</div>
          <div className="flex gap-2 justify-center">
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={() => setShowQR(true)}>
              <QrCode size={14} /> QR Code
            </Button>
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleCopyCode}>
              {copied ? "Copié !" : "Copier"}
            </Button>
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleShare}>
              <Share size={14} /> Inviter
            </Button>
          </div>
        </Card>

        {/* Panneau de configuration (Seulement pour l'hôte) */}
        {isHost && (
          <Card className="w-full p-6 mb-6 bg-surface/90 border border-white/10 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-primary flex items-center gap-2">
              <Flame size={16} /> Options de Partie (Hôte)
            </h3>

            {/* Choix catégories (Sélection multiple) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-foreground/60">Thème des mots (Sélection multiple)</label>
                <span className="text-[10px] font-black uppercase bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                  {selectedCategories.includes("Toutes les catégories") ? "Toutes" : `${selectedCategories.length} sélec.`}
                </span>
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 flex-wrap max-h-48 overflow-y-auto">
                {CATEGORIES.map(cat => {
                  const isAllSelected = selectedCategories.includes("Toutes les catégories");
                  const isThisSelected = selectedCategories.includes(cat);

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 border ${
                        cat === "Toutes les catégories"
                          ? isAllSelected
                            ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow"
                            : "bg-white/5 border-white/10 text-foreground/40 hover:text-foreground/70"
                          : isThisSelected && !isAllSelected
                            ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow"
                            : isAllSelected
                              ? "bg-white/5 border-white/5 text-foreground/30 opacity-50 grayscale"
                              : "bg-white/5 border-white/10 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {cat} {isThisSelected && !isAllSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choix nb Undercover */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Nombre d'Undercover</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => setUndercoverCount(num)}
                    className={`w-9 h-9 rounded-xl font-black text-xs border transition-all ${undercoverCount === num ? 'bg-primary text-white border-primary shadow-summer-glow' : 'bg-white/5 border-white/10 text-foreground/50'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Mr White */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Inclure Mr. White</span>
              <button
                onClick={() => setIncludeMrWhite(!includeMrWhite)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${includeMrWhite ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {includeMrWhite ? "Activé 🤍" : "Désactivé"}
              </button>
            </div>

            {/* Toggle Joker */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Inclure 🃏 Le Joker</span>
              <button
                onClick={() => setJokerCount(jokerCount > 0 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${jokerCount > 0 ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {jokerCount > 0 ? "Activé 🃏" : "Désactivé"}
              </button>
            </div>

            {/* Toggle Caméléon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Inclure 🪞 Caméléon</span>
              <button
                onClick={() => setCameleonCount(cameleonCount > 0 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${cameleonCount > 0 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {cameleonCount > 0 ? "Activé 🪞" : "Désactivé"}
              </button>
            </div>

            {/* Toggle Double Agent */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Inclure 💣 Double-Agent</span>
              <button
                onClick={() => setDoubleAgentCount(doubleAgentCount > 0 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${doubleAgentCount > 0 ? 'bg-pink-500/20 text-pink-400 border-pink-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {doubleAgentCount > 0 ? "Activé 💣" : "Désactivé"}
              </button>
            </div>

            {/* Chronomètre par tour */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs font-bold">Chrono par indice</span>
              <div className="flex gap-1.5">
                {[
                  { sec: 0, label: "∞" },
                  { sec: 30, label: "30s" },
                  { sec: 45, label: "45s" },
                  { sec: 60, label: "60s" }
                ].map(opt => (
                  <button
                    key={opt.sec}
                    onClick={() => setTurnTimerSec(opt.sec)}
                    className={`px-2.5 py-1.5 rounded-xl font-black text-xs border transition-all ${turnTimerSec === opt.sec ? 'bg-accent text-slate-950 border-accent shadow-soft' : 'bg-white/5 border-white/10 text-foreground/50'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Mystère (Thème masqué) */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Thème aux joueurs</span>
              <button
                onClick={() => setHideCategory(!hideCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${hideCategory ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {hideCategory ? "Caché 🤫 (Mystère)" : "Visible 💡"}
              </button>
            </div>

            {/* Mode Mystère (Rôles & Imposteurs Aléatoires) */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-amber-300">🎲 Mode Mystère (Rôles Aléatoires)</span>
                <span className="text-[10px] text-foreground/50">La répartition exacte reste 100% inconnue !</span>
              </div>
              <button
                onClick={() => setIsMysteryMode(!isMysteryMode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all ${isMysteryMode ? 'bg-gradient-summer text-white border-primary shadow-summer-glow' : 'bg-white/5 border-white/10 text-foreground/40'}`}
              >
                {isMysteryMode ? "ACTIF 🎲" : "Désactivé"}
              </button>
            </div>

            {/* Mode Hardcore (Rôle Éliminé) */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Rôle à l'élimination</span>
              <button
                onClick={() => setRevealRoleOnElimination(!revealRoleOnElimination)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${revealRoleOnElimination ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'}`}
              >
                {revealRoleOnElimination ? "Révélé 👁️" : "Masqué 🙈 (Hardcore)"}
              </button>
            </div>
          </Card>
        )}

        {/* Liste des Joueurs */}
        <div className="w-full mb-6">
          <h2 className="text-md font-black flex items-center gap-2 mb-3">
            <Users size={18} className="text-primary" /> Joueurs Connectés ({totalCount}/20)
          </h2>

          <div className="space-y-2.5">
            {players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-surface/90 p-3.5 rounded-2xl border border-white/10 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-purple-500/20 text-white flex items-center justify-center font-black text-sm border border-white/10">
                    {p.avatar && (p.avatar.startsWith("http") || p.avatar.startsWith("data:")) ? (
                      <img src={p.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : p.name === guestProfile.pseudo && (guestProfile.avatar.startsWith("http") || guestProfile.avatar.startsWith("data:")) ? (
                      <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{p.avatar || (p.name === guestProfile.pseudo ? guestProfile.avatar : p.name.charAt(0).toUpperCase())}</span>
                    )}
                  </div>
                  <span className="font-bold text-sm flex items-center gap-2">
                    {p.name}
                    {p.isHost && <Crown size={14} className="text-amber-400 fill-amber-400" />}
                  </span>
                </div>
                <span className={`text-[11px] font-black px-3 py-1 rounded-full ${p.isReady ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-foreground/50 border border-white/10'}`}>
                  {p.isReady ? "Prêt ✓" : "En attente"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar fixe */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            {isHost ? (
              <Button
                variant="primary"
                className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
                onClick={handleHostStart}
                disabled={!canStart}
              >
                <Play size={20} className="fill-current" />
                {totalCount < 3 
                  ? "Attente de 3 joueurs min." 
                  : canStart 
                    ? `Lancer la partie (${totalCount} joueurs) 🚀` 
                    : `En attente de prêts (${guestsReadyCount}/${guests.length})`}
              </Button>
            ) : (
              <Button
                variant={meInRoom?.isReady ? "surface" : "primary"}
                className="w-full h-16 text-lg font-black shadow-summer-glow"
                onClick={() => { sfxTap(); toggleReady(roomId); }}
              >
                {meInRoom?.isReady ? "Annuler mon statut prêt" : "Je suis prêt ✓"}
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 2. PHASE DE DÉBAT (Tour de parole synchrone en temps réel)
  // =========================================================================
  if (roomState.state === "PLAYING_DEBATE") {
    const speakingOrderIds = roomState.speakingOrder || [];
    const activeOrderIds = speakingOrderIds.filter(id => !players.find(p => p.id === id)?.isEliminated);
    const currentSpeakerId = activeOrderIds[roomState.currentSpeakerIndex || 0];
    const currentSpeakerPlayer = players.find(p => p.id === currentSpeakerId);

    const isMyTurn = currentSpeakerId === socket?.id;
    const roleLabel = secretData?.role === "Civilian" ? "Civil" : secretData?.role === "Undercover" ? "Undercover" : "Mr. White";
    const roleColor = secretData?.role === "Civilian" ? "text-cyan-400" : secretData?.role === "Undercover" ? "text-red-400" : "text-purple-400";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto pb-32">
        {/* Header */}
        <div className="w-full text-center py-2">
          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1">
            <Flame size={14} className="fill-primary" /> VYLO Undercover Online
          </span>
          <h1 className="text-2xl font-black mt-1">Tour de Parole #{roomState.clueRound || 1}</h1>
          {secretData?.category && (
            <p className="text-xs text-foreground/50 font-bold mt-1">
              Thème : <span className="text-primary">{secretData.category}</span>
            </p>
          )}
        </div>

        {/* Mot Secret (Carte privée) */}
        <Card className="w-full p-6 text-center bg-surface/90 border border-white/10 shadow-summer-glow my-4">
          {showSecret ? (
            <div className="animate-in fade-in zoom-in duration-300">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">Votre mot secret</span>
              <h2 className="text-3xl font-black mb-3">{secretData?.word || "..."}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-[11px] text-foreground/60 font-bold">Rôle :</span>
                <span className={`text-[11px] font-black uppercase ${roleColor}`}>{roleLabel}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between cursor-pointer px-2" onClick={() => { sfxReveal(); setShowSecret(true); }}>
              <div className="flex items-center gap-3">
                <EyeOff size={24} className="text-primary/60" />
                <div className="text-left">
                  <p className="text-sm font-black">Voir mon mot secret</p>
                  <p className="text-[11px] text-foreground/40 font-bold">Toucher pour révéler discrètement</p>
                </div>
              </div>
              <Button size="sm" variant="surface" className="text-xs">Révéler</Button>
            </div>
          )}

          {showSecret && (
            <Button size="sm" variant="ghost" className="mt-3 text-xs text-foreground/40" onClick={() => setShowSecret(false)}>
              Masquer
            </Button>
          )}
        </Card>

        {/* Projecteur du joueur actuel qui parle */}
        <Card className={`w-full p-6 text-center border transition-all ${isMyTurn ? 'bg-primary/20 border-primary shadow-summer-glow animate-pulse' : 'bg-surface/80 border-white/10'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl shadow-lg ${isMyTurn ? 'bg-gradient-summer text-white' : 'bg-white/10 text-foreground'}`}>
              <Mic size={28} className={isMyTurn ? 'animate-bounce' : ''} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-foreground/50 mb-1">
                {isMyTurn ? "C'est votre tour !" : "Au tour de..."}
              </p>
              <h2 className="text-2xl font-black text-foreground">
                {currentSpeakerPlayer?.name || "Joueur"}
              </h2>
              <p className="text-xs text-foreground/60 font-bold mt-1">
                {isMyTurn ? "Donnez votre indice à voix haute !" : "Écoutez attentivement son indice..."}
              </p>
            </div>
          </div>
        </Card>

        {/* Ordre des joueurs */}
        <div className="w-full my-4">
          <p className="text-[11px] font-bold text-foreground/40 uppercase tracking-widest mb-2 text-center">Ordre des indices</p>
          <div className="flex flex-wrap justify-center gap-2">
            {activeOrderIds.map((id, idx) => {
              const p = players.find(player => player.id === id);
              const isCurrent = id === currentSpeakerId;
              return (
                <span 
                  key={id} 
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${isCurrent ? 'bg-primary text-white border-primary shadow-soft' : 'bg-white/5 border-white/5 text-foreground/50'}`}
                >
                  {idx + 1}. {p?.name} {isCurrent && "🎤"}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            {isMyTurn ? (
              <Button
                variant="primary"
                className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
                onClick={() => { sfxTap(); nextSpeaker(roomId); }}
              >
                <Mic size={20} /> J'ai donné mon indice 🎤 ➜ Joueur Suivant
              </Button>
            ) : isHost ? (
              <Button
                variant="surface"
                className="w-full py-3.5 text-xs font-black gap-2"
                onClick={() => { sfxTap(); startVote(roomId); }}
              >
                <Vote size={16} /> Passer directement au Vote 🗳️
              </Button>
            ) : (
              <div className="text-center py-2 text-xs font-bold text-foreground/50 animate-pulse">
                En attente de l'indice de {currentSpeakerPlayer?.name}...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 3. PHASE DE VOTE SYNCHRONE
  // =========================================================================
  if (roomState.state === "VOTING") {
    const hasVoted = (roomState.votedSocketIds || []).includes(socket?.id || "");
    const votedCount = (roomState.votedSocketIds || []).length;

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto pb-32">
        <div className="w-full text-center py-2">
          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1">
            <Vote size={16} /> Phase d'Élimination
          </span>
          <h1 className="text-2xl font-black mt-1">Votez pour éliminer un suspect 🗳️</h1>
          <p className="text-xs text-foreground/50 font-bold mt-1">Qui vous semble le plus louche ?</p>
        </div>

        {/* Sélection des suspects */}
        <div className="w-full space-y-3 my-auto">
          {activePlayers.map((p) => {
            const isMe = p.id === socket?.id;
            const isSelected = selectedTargetId === p.id;

            return (
              <Card
                key={p.id}
                onClick={() => !hasVoted && !isMe && setSelectedTargetId(p.id)}
                className={`p-4 flex items-center justify-between border cursor-pointer transition-all ${
                  isSelected ? 'bg-primary/20 border-primary shadow-summer-glow' : 'bg-surface/80 border-white/10'
                } ${isMe ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-summer text-white flex items-center justify-center font-black">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-base">{p.name} {isMe && "(Vous)"}</span>
                </div>

                {!isMe && (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-white/20'}`}>
                    {isSelected && <Check size={14} className="stroke-[3]" />}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Tracker des votes */}
        <div className="text-center text-xs font-bold text-foreground/50 mb-4">
          {votedCount}/{activePlayers.length} joueurs ont voté
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            {hasVoted ? (
              <div className="w-full py-4 bg-green-500/20 text-green-400 rounded-2xl font-black text-center text-sm border border-green-500/30">
                Votre vote est enregistré ! En attente des autres... ⏳
              </div>
            ) : (
              <Button
                variant="primary"
                className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
                onClick={handleCastVoteSubmit}
                disabled={!selectedTargetId}
              >
                <Vote size={20} /> Valider mon vote 🗳️
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 4. DEVINETTE SPÉCIALE MR WHITE
  // =========================================================================
  if (roomState.state === "MR_WHITE_GUESS") {
    const isMrWhite = secretData?.role === "MrWhite";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
        <Card className="w-full p-8 bg-surface/90 border border-purple-500/30 shadow-glow space-y-6">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-black">
            🤍
          </div>

          <div>
            <h1 className="text-2xl font-black mb-2">Mr. White a été démasqué !</h1>
            <p className="text-xs text-foreground/60 font-bold leading-relaxed">
              {isMrWhite 
                ? "Vous avez été éliminé par le vote ! Mais vous pouvez GAGNER si vous devinez le mot secret des Civils !" 
                : "Mr. White tente sa dernière chance pour deviner le mot secret des Civils..."}
            </p>
          </div>

          {isMrWhite ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Entrez le mot secret..."
                value={mrWhiteGuessInput}
                onChange={(e) => setMrWhiteGuessInput(e.target.value)}
                className="w-full bg-background border border-white/10 rounded-2xl p-4 text-center text-lg font-bold focus:outline-none focus:border-purple-500"
              />
              <Button
                variant="primary"
                className="w-full py-4 text-md font-black bg-purple-600 hover:bg-purple-500"
                onClick={handleMrWhiteGuessSubmit}
              >
                Tenter ma chance 💡
              </Button>
            </div>
          ) : (
            <div className="py-6 text-sm font-bold text-foreground/50 animate-pulse">
              En attente de la devinette de Mr. White...
            </div>
          )}
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 5. RÉSULTAT DU VOTE
  // =========================================================================
  if (roomState.state === "VOTE_RESULT") {
    const elim = roomState.eliminatedPlayer;
    const roleLabel = elim?.role === "Civilian" ? "CIVIL" : elim?.role === "Undercover" ? "UNDERCOVER" : "MR. WHITE";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
        <Card className="w-full p-8 bg-surface/90 border border-white/10 shadow-soft space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
            <Skull size={40} />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-1">Résultat du vote</span>
            <h1 className="text-3xl font-black">{elim?.name || "Un joueur"} est éliminé !</h1>
            <p className="text-xs text-foreground/50 font-bold mt-1">Nombre de votes contre lui : {elim?.votes || 1}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs font-bold text-foreground/60 mb-1">Son rôle secret était...</p>
            <span className="text-xl font-black text-primary tracking-wider uppercase">{roleLabel} 😱</span>
          </div>

          {isHost ? (
            <Button
              variant="primary"
              className="w-full py-4 text-md font-black gap-2 shadow-summer-glow"
              onClick={() => { sfxTap(); continueRound(roomId); }}
            >
              Continuer le tour suivant <ArrowRight size={18} />
            </Button>
          ) : (
            <p className="text-xs font-bold text-foreground/40 animate-pulse">L'hôte va lancer le tour suivant...</p>
          )}
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 6. FIN DE PARTIE & VICTOIRE (Tableau des révelations)
  // =========================================================================
  if (roomState.state === "END_GAME") {
    const winner = roomState.winnerTeam;
    const title = winner === "CIVILIANS" ? "VICTOIRE DES CIVILS ! 🏆" : winner === "UNDERCOVER" ? "VICTOIRE DES UNDERCOVER ! 🕵️" : "VICTOIRE DE MR. WHITE ! 🤍";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto pb-32">
        <div className="w-full text-center py-6">
          <Trophy size={48} className="text-amber-400 mx-auto mb-3 animate-bounce" />
          <h1 className="text-3xl font-black text-gradient-summer mb-2">{title}</h1>
          <p className="text-xs font-bold text-foreground/50">La partie est terminée ! Voici tous les rôles :</p>
        </div>

        {/* Tableau des révelations */}
        <Card className="w-full p-6 bg-surface/90 border border-white/10 space-y-3 my-auto">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-3">Révélation complète des cartes</h3>

          <div className="space-y-2.5">
            {players.map((p) => {
              const rLabel = p.role === "Civilian" ? "Civil" : p.role === "Undercover" ? "Undercover" : "Mr. White";
              const rColor = p.role === "Civilian" ? "text-cyan-400" : p.role === "Undercover" ? "text-red-400" : "text-purple-400";

              return (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{p.name} {p.isEliminated && "💀"}</span>
                    <span className={`text-[11px] font-black uppercase ${rColor}`}>{rLabel}</span>
                  </div>
                  <span className="text-sm font-black text-foreground/80">{p.word || "—"}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            {isHost ? (
              <Button
                variant="primary"
                className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
                onClick={() => { sfxTap(); restartLobby(roomId); }}
              >
                <RefreshCw size={20} /> Rejouer une partie 🔄
              </Button>
            ) : (
              <div className="text-center py-3 text-xs font-bold text-foreground/40 animate-pulse">
                En attente que l'hôte relance le salon...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return null;
}
