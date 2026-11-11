"use client";

import { use, useEffect, useRef, useState } from "react";
import { useOnlineRoom } from "@/hooks/useOnlineRoom";
import { OnlineRoomGuard, ReconnectingBanner } from "@/components/online/OnlineRoomGuard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  EyeOff,
  Skull,
  Trophy,
  Share,
  Wifi,
  WifiOff,
  Users,
  Crown,
  QrCode,
  Play,
  Flame,
  ShieldAlert,
  Mic,
  Vote,
  RefreshCw,
  ArrowRight,
  Check,
  ChevronLeft,
  X,
  Clock,
  ShieldCheck,
  Search,
  MessageSquare,
  Send,
  Scale,
} from "lucide-react";
import {
  CATEGORIES,
  CategoryName,
  generateMysteryRoles,
  generateRolesFromConfigExtended,
  getRandomWordPair,
  validateRoleConfigExtended,
  UNDERCOVER_ROLE_META,
  generateDetectiveClue,
  shuffleArray,
  UndercoverRole,
  UndercoverPlayer,
} from "@/games/undercover/logic";
import {
  sfxTap,
  sfxReveal,
  sfxVictory,
  sfxError,
  sfxSuspense,
  sfxSuccess,
  sfxJoin,
} from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineUndercoverGame({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const online = useOnlineRoom(roomId, "undercover");
  const {
    playerId,
    isConnected,
    connectionStatus,
    roomState,
    secretData,
    toggleReady,
    kickPlayer,
    startUndercover,
    nextSpeaker,
    continueDebate,
    startVote,
    closeVote,
    castVote,
    protectWithGuardian,
    submitDoubleAgentTarget,
    submitMrWhiteGuess,
    continueRound,
    restartLobby,
    leaveRoomAndGo,
  } = online;

  // Paramètres Lobby (Hôte)
  const [showSecret, setShowSecret] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>([
    "Toutes les catégories",
  ]);
  const [undercoverCount, setUndercoverCount] = useState<number>(1);
  const [includeMrWhite, setIncludeMrWhite] = useState<boolean>(false);
  const [jokerCount, setJokerCount] = useState<number>(0);
  const [cameleonCount, setCameleonCount] = useState<number>(0);
  const [doubleAgentCount, setDoubleAgentCount] = useState<number>(0);
  const [detectiveCount, setDetectiveCount] = useState<number>(0);
  const [guardianAngelCount, setGuardianAngelCount] = useState<number>(0);
  const [turnTimerSec, setTurnTimerSec] = useState<number>(30);
  const [minRoundsBeforeVote, setMinRoundsBeforeVote] = useState<number>(1);
  const [hideCategory, setHideCategory] = useState<boolean>(false);
  const [revealRoleOnElimination, setRevealRoleOnElimination] = useState<boolean>(true);
  const [enableUndercoverAlliance, setEnableUndercoverAlliance] = useState<boolean>(false);
  const [isMysteryMode, setIsMysteryMode] = useState<boolean>(false);

  // États interactifs en cours de partie
  const [clueInput, setClueInput] = useState<string>("");
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [mrWhiteGuessInput, setMrWhiteGuessInput] = useState<string>("");
  const [remainingTimerSec, setRemainingTimerSec] = useState<number | null>(null);
  const expiredAlertFiredRef = useRef<string | null>(null);

  const handleToggleCategory = (cat: CategoryName) => {
    sfxTap();
    if (cat === "Toutes les catégories") {
      setSelectedCategories(["Toutes les catégories"]);
      return;
    }

    setSelectedCategories((prev) => {
      let current = prev.filter((c) => c !== "Toutes les catégories");
      if (current.includes(cat)) {
        current = current.filter((c) => c !== cat);
      } else {
        current.push(cat);
      }
      if (current.length === 0) return ["Toutes les catégories"];
      return current;
    });
  };

  // Sons d'arrivée et de fin
  const playerCount = roomState?.players.length || 0;
  useEffect(() => {
    if (playerCount > 1) sfxJoin();
  }, [playerCount]);

  useEffect(() => {
    if (roomState?.state === "END_GAME") {
      sfxVictory();
    } else if (roomState?.state === "LOBBY") {
      setShowSecret(false);
    }
    setSelectedTargetId(null);
    if (roomState?.state === "MR_WHITE_GUESS") {
      setMrWhiteGuessInput("");
    }
  }, [roomState?.state, roomState?.isTieBreakerVote]);

  // Réinitialiser la saisie d'indice à chaque nouveau speaker ou tour
  useEffect(() => {
    setClueInput("");
  }, [roomState?.currentSpeakerIndex, roomState?.clueRound, roomState?.state]);

  // Compte à rebours temps réel synchronisé via turnDeadlineAt
  useEffect(() => {
    const deadline = roomState?.turnDeadlineAt;
    if (roomState?.state !== "PLAYING_DEBATE" || !deadline) {
      setRemainingTimerSec(null);
      return;
    }

    const updateTick = () => {
      const diff = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemainingTimerSec(diff);
      const deadlineKey = String(deadline);
      if (diff === 0 && expiredAlertFiredRef.current !== deadlineKey) {
        expiredAlertFiredRef.current = deadlineKey;
        sfxError();
      }
    };

    updateTick();
    const interval = setInterval(updateTick, 400);
    return () => clearInterval(interval);
  }, [roomState?.state, roomState?.turnDeadlineAt]);

  if (!online.isRoomReady || !roomState) {
    return <OnlineRoomGuard online={online} />;
  }

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
      url: `${window.location.origin}/online/undercover/${roomId}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      handleCopyCode();
    }
  };

  const players = roomState.players || [];
  const meInRoom = online.me;
  const isHost = online.isHost;

  const activePlayers = players.filter((p) => !p.isEliminated);
  const guests = players.filter((p) => !p.isHost);
  const guestsReadyCount = guests.filter((p) => p.isReady).length;
  const totalCount = players.length;

  const mrWhiteCount = includeMrWhite ? 1 : 0;
  const roleValidation = isMysteryMode
    ? {
        isValid: totalCount >= 3,
        error: totalCount < 3 ? "Il faut au moins 3 joueurs pour lancer Undercover." : undefined,
      }
    : validateRoleConfigExtended(totalCount, {
        undercoverCount,
        mrWhiteCount,
        jokerCount,
        cameleonCount,
        doubleAgentCount,
        detectiveCount,
        guardianAngelCount,
      });

  const canStart =
    totalCount >= 3 &&
    roleValidation.isValid &&
    (guests.length === 0 || guestsReadyCount === guests.length);

  // Lancement de la partie par l'hôte
  const handleHostStart = () => {
    if (totalCount < 3 || !roleValidation.isValid) {
      sfxError();
      return;
    }

    const roles: UndercoverRole[] = isMysteryMode
      ? generateMysteryRoles(totalCount)
      : generateRolesFromConfigExtended(
          totalCount,
          undercoverCount,
          mrWhiteCount,
          jokerCount,
          cameleonCount,
          doubleAgentCount,
          detectiveCount,
          guardianAngelCount
        );

    const wordPair = getRandomWordPair(selectedCategories);
    const speakingOrder = shuffleArray(players.map((p) => p.id));

    const simulatedPlayers: UndercoverPlayer[] = players.map((p, index) => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      isHost: p.isHost,
      isReady: p.isReady,
      isConnected: p.isConnected ?? true,
      score: 0,
      scorePoints: 0,
      gameRole: roles[index],
      isEliminated: false,
    }));

    const undercoverNames = simulatedPlayers
      .filter((p) => p.gameRole === "Undercover")
      .map((p) => p.name);

    const playerSecrets: Record<
      string,
      {
        role: UndercoverRole;
        word: string;
        category: string;
        detectiveClue?: string;
        allies?: string[];
      }
    > = {};

    simulatedPlayers.forEach((p) => {
      const role = p.gameRole || "Civilian";
      let word = "";
      if (
        role === "Civilian" ||
        role === "DoubleAgent" ||
        role === "Detective" ||
        role === "GuardianAngel"
      ) {
        word = wordPair.civilian;
      } else if (role === "Undercover") {
        word = wordPair.undercover;
      }

      const secretEntry: {
        role: UndercoverRole;
        word: string;
        category: string;
        detectiveClue?: string;
        allies?: string[];
      } = {
        role,
        word,
        category: wordPair.category,
      };

      if (role === "Detective") {
        secretEntry.detectiveClue = generateDetectiveClue(
          wordPair.undercover,
          simulatedPlayers
        );
      }

      if (role === "Undercover" && enableUndercoverAlliance && undercoverNames.length >= 2) {
        secretEntry.allies = undercoverNames.filter((n) => n !== p.name);
      }

      playerSecrets[p.id] = secretEntry;
    });

    sfxSuspense();
    startUndercover(
      roomId,
      playerSecrets,
      speakingOrder,
      wordPair.category,
      wordPair.civilian,
      wordPair.undercover,
      {
        turnTimerSec,
        hideCategory,
        revealRoleOnElimination,
        minRoundsBeforeVote,
      }
    );
  };

  const handleNextSpeakerSubmit = () => {
    const activeIds = (roomState?.speakingOrder || []).filter(
      (id) => !(roomState?.players || []).find((p) => p.id === id)?.isEliminated
    );
    const activeIdx = Math.min(
      roomState?.currentSpeakerIndex || 0,
      Math.max(0, activeIds.length - 1)
    );
    const expectedSpeakerId = activeIds[activeIdx];
    sfxTap();
    nextSpeaker(roomId, clueInput.trim() || undefined, expectedSpeakerId);
    setClueInput("");
  };

  const handleCastVoteSubmit = () => {
    if (!selectedTargetId) return;
    sfxSuccess();
    castVote(roomId, selectedTargetId);
  };

  const handleMrWhiteGuessSubmit = () => {
    if (!mrWhiteGuessInput.trim()) return;
    sfxReveal();
    submitMrWhiteGuess(roomId, mrWhiteGuessInput);
  };

  // Rendu réutilisable de la carte secrète privée (ne révèle JAMAIS Civil vs Undercover !)
  const renderSecretCard = () => {
    const role = secretData?.role || "HIDDEN";
    const meta = UNDERCOVER_ROLE_META[role as UndercoverRole];
    const isClassicHidden = role === "HIDDEN" || role === "Civilian" || role === "Undercover";
    const hasWord = Boolean(secretData?.word && secretData.word.trim().length > 0);
    const displayWord = hasWord
      ? secretData?.word
      : role === "MrWhite"
        ? "Aucun mot !"
        : role === "Joker"
          ? "Carte Joker 🃏"
          : role === "Cameleon"
            ? "Carte Caméléon 🪞"
            : "...";

    return (
      <Card className="w-full p-5 text-center bg-surface border border-border shadow-glow my-3">
        {showSecret ? (
          <div className="animate-fade-up space-y-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
              {hasWord ? "Votre mot secret" : "Votre identité"}
            </span>
            <h2 className="text-3xl font-black text-foreground">{displayWord}</h2>

            {isClassicHidden ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border">
                <span className="text-[11px] text-muted font-bold">
                  🤫 Rôle masqué — Civil ou Undercover ? Écoutez les indices !
                </span>
              </div>
            ) : (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                  meta?.badgeClass || "bg-[#EEF2FF] text-[#4338CA] border border-secondary/25"
                }`}
              >
                <span>{meta?.emoji || "🎭"}</span>
                <span>{meta?.label || role}</span>
              </div>
            )}

            {role === "MrWhite" && (
              <p className="text-xs text-[#4338CA] font-bold">
                Bluffez ! Écoutez les autres pour deviner le mot des Civils.
              </p>
            )}
            {role === "Joker" && (
              <p className="text-xs text-[#B45309] font-bold">
                Faites-vous éliminer dès le tout premier vote (Tour 1) pour gagner seul !
              </p>
            )}
            {role === "Cameleon" && (
              <p className="text-xs text-[#0E7490] font-bold">
                Pas de mot au départ : inspirez-vous de l&apos;indice du 1er joueur !
              </p>
            )}
            {role === "DoubleAgent" && (
              <p className="text-xs text-[#BE185D] font-bold">
                💣 Camp Civil : si vous êtes éliminé au vote, vous emportez un joueur avec vous.
              </p>
            )}

            {role === "Detective" && secretData?.detectiveClue && (
              <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-emerald-500/30 text-left">
                <span className="text-[10px] font-black uppercase text-[#047857] flex items-center gap-1 mb-0.5">
                  <Search size={12} /> Indice d&apos;Enquêteur secret
                </span>
                <p className="text-xs font-bold text-foreground">
                  {secretData.detectiveClue}
                </p>
              </div>
            )}

            {secretData?.allies && secretData.allies.length > 0 && (
              <div className="p-2.5 rounded-xl bg-[#FEEBEB] border border-primary/25 text-xs font-bold text-[#C22E2E]">
                🤝 Coéquipier Undercover : {secretData.allies.join(", ")}
              </div>
            )}

            {role === "GuardianAngel" && (roomState.eliminationRound || 1) === 1 && (
              <div className="p-3 rounded-2xl bg-[#EEF2FF] border border-indigo-500/30 text-left space-y-2">
                <span className="text-[10px] font-black uppercase text-[#4338CA] flex items-center gap-1">
                  <ShieldCheck size={13} /> Bouclier Ange Gardien (1er vote)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activePlayers.map((p) => {
                    const isProtected = secretData?.guardianProtectedId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          sfxTap();
                          protectWithGuardian(roomId, p.id);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                          isProtected
                            ? "bg-secondary text-white border-secondary shadow-sm"
                            : "bg-surface border-border text-foreground hover:border-secondary/45"
                        }`}
                      >
                        {p.name} {isProtected ? "🛡️" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center justify-between cursor-pointer px-2"
            onClick={() => {
              sfxReveal();
              setShowSecret(true);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-primary shrink-0">
                <EyeOff size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-foreground">Voir mon mot secret</p>
                <p className="text-[11px] text-muted font-semibold">
                  Toucher pour révéler discrètement
                </p>
              </div>
            </div>
            <Button size="sm" variant="surface" className="text-xs rounded-full">
              Révéler
            </Button>
          </div>
        )}

        {showSecret && (
          <Button
            size="sm"
            variant="ghost"
            className="mt-2.5 text-xs text-muted rounded-full"
            onClick={() => setShowSecret(false)}
          >
            Masquer
          </Button>
        )}
      </Card>
    );
  };

  // =========================================================================
  // 1. PHASE LOBBY (Attente & Configuration des paramètres)
  // =========================================================================
  if (roomState.state === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-8 w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto pb-36">
        <ReconnectingBanner status={connectionStatus} />
        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} roomCode={roomId} />

        {/* Status bar */}
        <div className="w-full flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              sfxTap();
              leaveRoomAndGo("/library");
            }}
            className="h-10 px-4 bg-surface border border-border rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] active-press transition-all shadow-sm cursor-pointer z-50"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div
            className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border ${
              isConnected
                ? "bg-[#ECFDF5] text-[#047857] border-emerald-500/30"
                : "bg-[#FEEBEB] text-[#C22E2E] border-primary/30"
            }`}
          >
            {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isConnected ? "En ligne" : "Connexion..."}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Colonne Gauche : Code Salon + Joueurs connectés */}
          <div className={isHost ? "md:col-span-5 flex flex-col gap-6" : "md:col-span-12 max-w-xl mx-auto w-full flex flex-col gap-6"}>
            {/* Code du Salon */}
            <Card className="w-full p-7 text-center bg-surface border border-border shadow-soft">
              <p className="text-xs font-extrabold text-muted uppercase tracking-[0.25em] mb-2">
                Salon Multijoueur
              </p>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-[0.28em] text-primary mb-6">
                {roomId}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="surface"
                  size="sm"
                  className="gap-1.5 rounded-full px-4 text-xs"
                  onClick={() => setShowQR(true)}
                >
                  <QrCode size={14} /> QR Code
                </Button>
                <Button
                  variant="surface"
                  size="sm"
                  className="gap-1.5 rounded-full px-4 text-xs"
                  onClick={handleCopyCode}
                >
                  {copied ? "Copié !" : "Copier"}
                </Button>
                <Button
                  variant="surface"
                  size="sm"
                  className="gap-1.5 rounded-full px-4 text-xs"
                  onClick={handleShare}
                >
                  <Share size={14} /> Inviter
                </Button>
              </div>
            </Card>

            {/* Liste des Joueurs */}
            <Card className="w-full p-5 sm:p-6 bg-surface border border-border shadow-soft">
              <h2 className="font-display text-base font-extrabold text-foreground flex items-center gap-2 mb-3.5">
                <Users size={18} className="text-primary" /> Joueurs Connectés ({totalCount}/20)
              </h2>

              <div className="space-y-2.5">
                {players.map((p) => {
                  const isMePlayer = p.id === playerId;
                  const isOffline = p.isConnected === false;
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-surface-elevated p-3 rounded-2xl border border-border gap-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center font-black text-sm border border-secondary/20 shrink-0">
                          {p.avatar && (p.avatar.startsWith("http") || p.avatar.startsWith("data:")) ? (
                            <img
                              src={p.avatar}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{p.avatar || p.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <span className="font-bold text-sm text-foreground flex items-center gap-1.5 truncate">
                            <span className="truncate">{p.name}</span>
                            {isMePlayer && (
                              <span className="text-[11px] font-extrabold text-primary shrink-0">
                                (Vous)
                              </span>
                            )}
                            {p.isHost && (
                              <Crown size={14} className="text-[#D97706] fill-[#F59E0B] shrink-0" />
                            )}
                          </span>
                          {isOffline && (
                            <span className="text-[10px] font-bold text-[#B45309]">
                              Reconnexion...
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                            p.isReady
                              ? "bg-[#ECFDF5] text-[#047857] border-emerald-500/25"
                              : "bg-surface text-muted border-border"
                          }`}
                        >
                          {p.isReady ? "Prêt ✓" : "En attente"}
                        </span>
                        {isHost && !isMePlayer && (
                          <button
                            type="button"
                            onClick={() => {
                              sfxTap();
                              kickPlayer(roomId, p.id);
                            }}
                            title={`Retirer ${p.name}`}
                            aria-label={`Retirer ${p.name}`}
                            className="w-7 h-7 rounded-full bg-surface border border-border hover:bg-[#FEEBEB] text-muted hover:text-[#C22E2E] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Colonne Droite : Panneau de configuration (Hôte uniquement) */}
          {isHost && (
            <div className="md:col-span-7">
              <Card className="w-full p-6 bg-surface border border-border shadow-soft space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-primary flex items-center gap-2">
                  <Flame size={16} /> Options de Partie (Hôte)
                </h3>

                {/* Choix catégories (Sélection multiple) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-muted">
                      Thème des mots (Sélection multiple)
                    </label>
                    <span className="text-[11px] font-bold bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 px-2.5 py-0.5 rounded-full">
                      {selectedCategories.includes("Toutes les catégories")
                        ? "Toutes"
                        : `${selectedCategories.length} sélec.`}
                    </span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 flex-wrap max-h-48 overflow-y-auto">
                    {CATEGORIES.map((cat) => {
                      const isAllSelected = selectedCategories.includes("Toutes les catégories");
                      const isThisSelected = selectedCategories.includes(cat);

                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleToggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            cat === "Toutes les catégories"
                              ? isAllSelected
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-surface-elevated border-border text-muted hover:text-foreground"
                              : isThisSelected && !isAllSelected
                                ? "bg-primary text-white border-primary shadow-sm"
                                : isAllSelected
                                  ? "bg-surface-elevated border-border text-muted hover:text-foreground"
                                  : "bg-surface border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {cat} {isThisSelected && !isAllSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rôles classiques & spéciaux (masqués si Mode Mystère actif) */}
                {!isMysteryMode && (
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Nombre d&apos;Undercover</span>
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              sfxTap();
                              setUndercoverCount(num);
                            }}
                            className={`w-9 h-9 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                              undercoverCount === num
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-surface-elevated border-border text-muted hover:text-foreground"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {undercoverCount >= 2 && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#C22E2E]">
                          🤝 Alliance Undercover
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            sfxTap();
                            setEnableUndercoverAlliance(!enableUndercoverAlliance);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            enableUndercoverAlliance
                              ? "bg-[#FEEBEB] text-[#C22E2E] border-primary/35"
                              : "bg-surface-elevated border-border text-muted"
                          }`}
                        >
                          {enableUndercoverAlliance ? "Activée 🤝" : "Désactivée"}
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure Mr. White</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setIncludeMrWhite(!includeMrWhite);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          includeMrWhite
                            ? "bg-[#EEF2FF] text-[#4338CA] border-secondary/35"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {includeMrWhite ? "Activé 🤍" : "Désactivé"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure 🃏 Le Joker</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setJokerCount(jokerCount > 0 ? 0 : 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          jokerCount > 0
                            ? "bg-[#FEF3C7] text-[#B45309] border-amber-500/40"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {jokerCount > 0 ? "Activé 🃏" : "Désactivé"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure 🪞 Caméléon</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setCameleonCount(cameleonCount > 0 ? 0 : 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          cameleonCount > 0
                            ? "bg-[#ECFEFF] text-[#0E7490] border-cyan-500/35"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {cameleonCount > 0 ? "Activé 🪞" : "Désactivé"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure 💣 Double-Agent</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setDoubleAgentCount(doubleAgentCount > 0 ? 0 : 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          doubleAgentCount > 0
                            ? "bg-[#FDF2F8] text-[#BE185D] border-pink-500/35"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {doubleAgentCount > 0 ? "Activé 💣" : "Désactivé"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure 👁️ Enquêteur</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setDetectiveCount(detectiveCount > 0 ? 0 : 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          detectiveCount > 0
                            ? "bg-[#ECFDF5] text-[#047857] border-emerald-500/35"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {detectiveCount > 0 ? "Activé 👁️" : "Désactivé"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">Inclure 🛡️ Ange Gardien</span>
                      <button
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setGuardianAngelCount(guardianAngelCount > 0 ? 0 : 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          guardianAngelCount > 0
                            ? "bg-[#EEF2FF] text-[#4338CA] border-indigo-500/35"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {guardianAngelCount > 0 ? "Activé 🛡️" : "Désactivé"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Chronomètre par tour & Tours min avant vote */}
                <div className="flex items-center justify-between border-t border-border pt-3 gap-2">
                  <span className="text-xs font-bold text-foreground">Chrono par indice</span>
                  <div className="flex gap-1.5">
                    {[
                      { sec: 0, label: "∞" },
                      { sec: 30, label: "30s" },
                      { sec: 45, label: "45s" },
                      { sec: 60, label: "60s" },
                    ].map((opt) => (
                      <button
                        key={opt.sec}
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setTurnTimerSec(opt.sec);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          turnTimerSec === opt.sec
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-foreground">Tours d&apos;indices avant vote</span>
                  <div className="flex gap-1.5">
                    {[1, 2].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          sfxTap();
                          setMinRoundsBeforeVote(n);
                        }}
                        className={`w-9 h-9 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          minRoundsBeforeVote === n
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thème aux joueurs */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-foreground">Thème aux joueurs</span>
                  <button
                    type="button"
                    onClick={() => {
                      sfxTap();
                      setHideCategory(!hideCategory);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      hideCategory
                        ? "bg-[#FEF3C7] text-[#B45309] border-amber-500/40"
                        : "bg-surface-elevated border-border text-foreground"
                    }`}
                  >
                    {hideCategory ? "Caché 🤫" : "Visible 💡"}
                  </button>
                </div>

                {/* Mode Mystère */}
                <div className="flex items-center justify-between border-t border-border pt-3 gap-2">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-[#B45309]">
                      🎲 Mode Mystère (Rôles Aléatoires)
                    </span>
                    <span className="text-[11px] text-muted font-semibold">
                      La répartition exacte reste 100% inconnue !
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sfxTap();
                      setIsMysteryMode(!isMysteryMode);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all shrink-0 cursor-pointer ${
                      isMysteryMode
                        ? "bg-[#F59E0B] text-[#161824] border-amber-600 shadow-sm"
                        : "bg-surface-elevated border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {isMysteryMode ? "ACTIF 🎲" : "Désactivé"}
                  </button>
                </div>

                {/* Rôle à l'élimination */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-foreground">Rôle à l&apos;élimination</span>
                  <button
                    type="button"
                    onClick={() => {
                      sfxTap();
                      setRevealRoleOnElimination(!revealRoleOnElimination);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      revealRoleOnElimination
                        ? "bg-[#ECFEFF] text-[#0E7490] border-cyan-500/35"
                        : "bg-[#FEEBEB] text-[#C22E2E] border-primary/35"
                    }`}
                  >
                    {revealRoleOnElimination ? "Révélé 👁️" : "Masqué 🙈 (Hardcore)"}
                  </button>
                </div>

                {!roleValidation.isValid && totalCount >= 3 && (
                  <div className="w-full bg-[#FEEBEB] border border-primary/30 p-3 rounded-2xl text-[#C22E2E] text-xs font-bold flex items-center gap-2">
                    <ShieldAlert size={16} className="shrink-0" /> {roleValidation.error}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>

        {/* Action Bar fixe */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            {isHost ? (
              <Button
                variant="primary"
                className="w-full h-14 sm:h-16 text-base sm:text-lg font-extrabold gap-2 rounded-full"
                onClick={handleHostStart}
                disabled={!canStart}
              >
                <Play size={20} className="fill-current" />
                {totalCount < 3
                  ? "Attente de 3 joueurs min."
                  : !roleValidation.isValid
                    ? "Répartition invalide"
                    : canStart
                      ? `Lancer la partie (${totalCount} joueurs) 🚀`
                      : `En attente de prêts (${guestsReadyCount}/${guests.length})`}
              </Button>
            ) : (
              <Button
                variant={meInRoom?.isReady ? "surface" : "primary"}
                className="w-full h-14 sm:h-16 text-base sm:text-lg font-extrabold rounded-full"
                onClick={() => {
                  sfxTap();
                  toggleReady(roomId);
                }}
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
    const activeOrderIds = speakingOrderIds.filter(
      (id) => !players.find((p) => p.id === id)?.isEliminated
    );
    const safeSpeakerIdx = Math.min(
      roomState.currentSpeakerIndex || 0,
      Math.max(0, activeOrderIds.length - 1)
    );
    const currentSpeakerId = activeOrderIds[safeSpeakerIdx];
    const currentSpeakerPlayer = players.find((p) => p.id === currentSpeakerId);
    const isMyTurn = currentSpeakerId === playerId && !meInRoom?.isEliminated;
    const currentRoundClues = (roomState.cluesHistory || []).filter(
      (c) => c.round === (roomState.clueRound || 1)
    );

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-5 w-full max-w-md mx-auto pb-40">
        <ReconnectingBanner status={connectionStatus} />

        {/* Header */}
        <div className="w-full text-center py-1">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
            <Flame size={14} className="fill-primary" /> VYLO Undercover
          </div>
          <h1 className="font-display text-2xl font-black text-foreground mt-1">
            Tour de Parole #{roomState.clueRound || 1}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
            {secretData?.category && (
              <span className="text-xs text-muted font-bold">
                Thème : <span className="text-primary">{secretData.category}</span>
              </span>
            )}
            {remainingTimerSec !== null && (
              <span
                className={`text-xs font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                  remainingTimerSec === 0
                    ? "bg-[#FEEBEB] text-[#C22E2E] border-primary/35 animate-pulse"
                    : remainingTimerSec <= 5
                      ? "bg-[#FEF3C7] text-[#B45309] border-amber-500/40"
                      : "bg-surface border-border text-foreground"
                }`}
              >
                <Clock size={12} />
                {remainingTimerSec === 0 ? "Temps écoulé !" : `${remainingTimerSec}s`}
              </span>
            )}
          </div>
        </div>

        {/* Bandeau Spectateur si éliminé */}
        {meInRoom?.isEliminated && (
          <div className="w-full p-3 rounded-2xl bg-[#FEEBEB] border border-primary/25 text-center text-xs font-bold text-[#C22E2E] my-1">
            💀 Vous êtes éliminé — vous suivez le débat en mode spectateur.
          </div>
        )}

        {/* Carte mot secret privée */}
        {renderSecretCard()}

        {/* Projecteur du joueur qui parle */}
        <Card
          className={`w-full p-5 text-center border transition-all ${
            isMyTurn
              ? "bg-[#FEEBEB]/65 border-2 border-primary shadow-glow"
              : "bg-surface border-border shadow-soft"
          }`}
        >
          <div className="flex flex-col items-center gap-2.5">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border ${
                isMyTurn
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-surface-elevated border-border text-foreground"
              }`}
            >
              <Mic size={22} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted mb-0.5">
                {isMyTurn ? "C'est votre tour !" : "Au tour de..."}
              </p>
              <h2 className="text-2xl font-black text-foreground">
                {currentSpeakerPlayer?.name || "Joueur"}
              </h2>
              <p className="text-xs text-muted font-bold mt-0.5">
                {isMyTurn
                  ? "Donnez un mot-indice (à l'oral ou ci-dessous) !"
                  : "Écoutez attentivement son indice..."}
              </p>
            </div>

            {isMyTurn && (
              <div className="w-full pt-2">
                <input
                  id="online-clue-input"
                  type="text"
                  maxLength={60}
                  value={clueInput}
                  onChange={(e) => setClueInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNextSpeakerSubmit();
                  }}
                  placeholder="Écrire votre indice (optionnel)..."
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-center text-sm font-bold text-foreground placeholder:text-muted/70 focus:outline-none focus:border-primary shadow-sm"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Ordre des joueurs & indices donnés sur ce tour */}
        <div className="w-full my-3">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2 text-center">
            Ordre des indices ({currentRoundClues.length}/{activeOrderIds.length})
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {activeOrderIds.map((id, idx) => {
              const p = players.find((player) => player.id === id);
              const isCurrent = id === currentSpeakerId;
              const entry = currentRoundClues.find((c) => c.playerId === id);
              return (
                <span
                  key={id}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    isCurrent
                      ? "bg-primary text-white border-primary shadow-sm"
                      : entry
                        ? "bg-[#ECFDF5] border-emerald-500/30 text-[#047857]"
                        : "bg-surface border-border text-muted"
                  }`}
                >
                  {idx + 1}. {p?.name} {isCurrent ? "🎤" : entry ? `✓ ${entry.clue}` : ""}
                </span>
              );
            })}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            {isMyTurn ? (
              <>
                <Button
                  variant="primary"
                  className="w-full h-14 text-base font-extrabold gap-2 rounded-full"
                  onClick={handleNextSpeakerSubmit}
                >
                  {clueInput.trim() ? (
                    <>
                      <Send size={18} /> Envoyer l&apos;indice &amp; Joueur suivant ✓
                    </>
                  ) : (
                    <>
                      <Mic size={18} /> J&apos;ai donné mon indice ➜ Joueur suivant
                    </>
                  )}
                </Button>
                {isHost && (
                  <Button
                    variant="surface"
                    className="w-full py-2.5 text-xs font-bold gap-1.5 rounded-full"
                    onClick={() => {
                      sfxTap();
                      startVote(roomId);
                    }}
                  >
                    <Vote size={14} /> Passer directement au Vote 🗳️
                  </Button>
                )}
              </>
            ) : isHost ? (
              <div className="flex gap-2">
                <Button
                  variant="surface"
                  className="flex-1 py-3.5 text-xs font-bold gap-1.5 rounded-full"
                  onClick={() => {
                    sfxTap();
                    nextSpeaker(roomId, undefined, currentSpeakerId);
                  }}
                >
                  Passer au suivant ⏭️
                </Button>
                <Button
                  variant="primary"
                  className="flex-1 py-3.5 text-xs font-bold gap-1.5 rounded-full"
                  onClick={() => {
                    sfxTap();
                    startVote(roomId);
                  }}
                >
                  <Vote size={15} /> Passer au Vote 🗳️
                </Button>
              </div>
            ) : (
              <div className="text-center py-2 text-xs font-bold text-muted animate-pulse">
                En attente de l&apos;indice de {currentSpeakerPlayer?.name}...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 2B. PHASE DE DISCUSSION (Tous les indices donnés -> Débat & Lancement Vote)
  // =========================================================================
  if (roomState.state === "DISCUSSION") {
    const history = roomState.cluesHistory || [];
    const currentRound = roomState.clueRound || 1;
    const roundClues = history.filter((c) => c.round === currentRound);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-5 w-full max-w-md mx-auto pb-40">
        <ReconnectingBanner status={connectionStatus} />

        <div className="w-full text-center py-2">
          <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center justify-center gap-1.5">
            <MessageSquare size={15} /> Phase de Discussion
          </span>
          <h1 className="font-display text-2xl font-black text-foreground mt-1">
            Débattez avant le vote ! 💬
          </h1>
          <p className="text-xs text-muted font-bold mt-1">
            Tous les indices du Tour #{currentRound} ont été donnés.
          </p>
        </div>

        {renderSecretCard()}

        {/* Récapitulatif des indices du tour */}
        <Card className="w-full p-5 bg-surface border border-border shadow-soft space-y-3 my-auto">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary">
            Récapitulatif des indices — Tour #{currentRound}
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {roundClues.length > 0 ? (
              roundClues.map((entry, idx) => (
                <div
                  key={`${entry.playerId}-${idx}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-elevated border border-border text-xs"
                >
                  <span className="font-bold text-foreground">{entry.playerName}</span>
                  <span className="font-black text-primary">{entry.clue}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted font-semibold">Indices donnés à l&apos;oral.</p>
            )}
          </div>
        </Card>

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            {isHost ? (
              <>
                <Button
                  variant="primary"
                  className="w-full h-14 text-base font-extrabold gap-2 rounded-full"
                  onClick={() => {
                    sfxTap();
                    startVote(roomId);
                  }}
                >
                  <Vote size={18} /> Passer au Vote 🗳️
                </Button>
                <Button
                  variant="surface"
                  className="w-full py-3 text-xs font-bold gap-1.5 rounded-full"
                  onClick={() => {
                    sfxTap();
                    continueDebate(roomId);
                  }}
                >
                  <RefreshCw size={14} /> Refaire un tour d&apos;indices (Tour #{currentRound + 1})
                </Button>
              </>
            ) : (
              <div className="text-center py-3 text-xs font-bold text-muted animate-pulse">
                Débat en cours ! L&apos;hôte va ouvrir le vote ou relancer un tour...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 3. PHASE DE VOTE SYNCHRONE (AVEC ÉGALITÉ & ABSTENTION)
  // =========================================================================
  if (roomState.state === "VOTING") {
    const votedIds = roomState.votedPlayerIds || roomState.votedSocketIds || [];
    const hasVoted = votedIds.includes(playerId);
    const votedCount = votedIds.length;
    const isTieBreaker = Boolean(roomState.isTieBreakerVote);
    const tiedIds = roomState.tiedPlayerIds || [];
    const isSpectator = Boolean(meInRoom?.isEliminated);
    const candidatePlayers = isTieBreaker
      ? activePlayers.filter((p) => tiedIds.includes(p.id))
      : activePlayers;
    const anyOfflineActive = activePlayers.some((p) => p.isConnected === false);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 w-full max-w-md mx-auto pb-40">
        <ReconnectingBanner status={connectionStatus} />

        <div className="w-full text-center py-2">
          <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center justify-center gap-1">
            {isTieBreaker ? <Scale size={16} /> : <Vote size={16} />}
            {isTieBreaker ? "Vote Décisif (Égalité)" : "Phase d'Élimination"}
          </span>
          <h1 className="font-display text-2xl font-black text-foreground mt-1">
            {isTieBreaker
              ? "Départagez les ex-aequo ⚖️"
              : "Votez pour éliminer un suspect 🗳️"}
          </h1>
          <p className="text-xs text-muted font-bold mt-1">
            {isTieBreaker
              ? "En cas de nouvelle égalité, personne ne sera éliminé."
              : "Qui vous semble le plus suspect ?"}
          </p>
        </div>

        {isSpectator ? (
          <Card className="w-full p-6 my-auto text-center bg-surface border border-primary/25 shadow-soft space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#FEEBEB] text-[#C22E2E] mx-auto flex items-center justify-center">
              <Skull size={32} />
            </div>
            <h2 className="font-display text-lg font-black text-foreground">
              Vous êtes éliminé
            </h2>
            <p className="text-xs text-muted font-bold">
              Les joueurs encore en vie votent secrètement...
            </p>
          </Card>
        ) : (
          <div className="w-full space-y-3 my-auto">
            {candidatePlayers.map((p) => {
              const isMe = p.id === playerId;
              const isSelected = selectedTargetId === p.id;

              return (
                <Card
                  key={p.id}
                  onClick={() => !hasVoted && !isMe && setSelectedTargetId(p.id)}
                  className={`p-4 flex items-center justify-between border transition-all ${
                    isSelected
                      ? "bg-[#FEEBEB] border-primary shadow-sm"
                      : "bg-surface border-border hover:border-primary/40"
                  } ${isMe ? "opacity-55 cursor-not-allowed" : "cursor-pointer active-press"}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-base text-foreground truncate">{p.name}</span>
                      {isMe && (
                        <span className="text-xs font-extrabold text-primary shrink-0">(Vous)</span>
                      )}
                    </div>
                  </div>

                  {!isMe && (
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-[var(--border-strong)] bg-surface-elevated"
                      }`}
                    >
                      {isSelected && <Check size={14} className="stroke-[3]" />}
                    </div>
                  )}
                </Card>
              );
            })}

            {!isTieBreaker && (
              <Card
                onClick={() => !hasVoted && setSelectedTargetId("ABSTAIN")}
                className={`p-4 flex items-center justify-between border border-dashed cursor-pointer transition-all ${
                  selectedTargetId === "ABSTAIN"
                    ? "bg-[#FEF3C7] border-amber-500"
                    : "bg-surface-elevated border-[var(--border-strong)]"
                }`}
              >
                <span className="font-bold text-sm text-foreground">
                  S&apos;abstenir (Vote blanc)
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTargetId === "ABSTAIN"
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-[var(--border-strong)] bg-surface"
                  }`}
                >
                  {selectedTargetId === "ABSTAIN" && <Check size={14} className="stroke-[3]" />}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Tracker des votes */}
        <div className="text-center text-xs font-bold text-muted mb-4">
          {votedCount}/{activePlayers.length} joueurs ont voté
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            {isSpectator ? (
              <div className="w-full py-3.5 bg-surface-elevated text-muted rounded-2xl font-bold text-center text-xs border border-border">
                En attente du verdict... ({votedCount}/{activePlayers.length})
              </div>
            ) : hasVoted ? (
              <div className="w-full py-4 bg-[#ECFDF5] text-[#047857] rounded-2xl font-black text-center text-sm border border-emerald-500/30">
                Votre vote est enregistré ! En attente des autres... ⏳
              </div>
            ) : (
              <Button
                variant="primary"
                className="w-full h-14 text-base font-extrabold gap-2 rounded-full"
                onClick={handleCastVoteSubmit}
                disabled={!selectedTargetId}
              >
                <Vote size={18} /> Valider mon vote 🗳️
              </Button>
            )}

            {isHost && votedCount > 0 && (anyOfflineActive || hasVoted || isSpectator) && (
              <Button
                variant="surface"
                className="w-full py-2.5 text-xs font-bold rounded-full"
                onClick={() => {
                  sfxTap();
                  closeVote(roomId);
                }}
              >
                Clôturer le vote maintenant ({votedCount}/{activePlayers.length})
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
    const elimPlayer = players.find((p) => p.id === roomState.eliminatedPlayer?.id);
    const isTargetedMrWhite =
      roomState.eliminatedPlayer?.id === playerId ||
      (isHost && Boolean(elimPlayer && !elimPlayer.isConnected));

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto text-center">
        <ReconnectingBanner status={connectionStatus} />
        <Card className="w-full p-8 bg-surface border border-secondary/30 shadow-glow space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EEF2FF] text-[#4338CA] border border-secondary/25 mx-auto flex items-center justify-center font-black text-3xl">
            🤍
          </div>

          <div>
            <h1 className="font-display text-2xl font-black text-foreground mb-2">
              {roomState.eliminatedPlayer?.name || "Mr. White"} était Mr. White !
            </h1>
            <p className="text-xs text-muted font-bold leading-relaxed">
              {isTargetedMrWhite
                ? "Dernière chance ! Saisissez le mot secret des Civils pour voler la victoire !"
                : "Mr. White tente sa dernière chance pour deviner le mot secret des Civils..."}
            </p>
          </div>

          {isTargetedMrWhite ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Entrez le mot secret..."
                value={mrWhiteGuessInput}
                onChange={(e) => setMrWhiteGuessInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && mrWhiteGuessInput.trim()) {
                    handleMrWhiteGuessSubmit();
                  }
                }}
                className="w-full bg-surface-elevated border-2 border-secondary/25 rounded-2xl p-4 text-center text-lg font-bold text-foreground placeholder:text-muted/70 focus:outline-none focus:border-secondary"
              />
              <Button
                variant="secondary"
                className="w-full py-4 text-md font-extrabold rounded-full"
                disabled={!mrWhiteGuessInput.trim()}
                onClick={handleMrWhiteGuessSubmit}
              >
                Tenter ma chance 💡
              </Button>
            </div>
          ) : (
            <div className="py-6 text-sm font-bold text-muted animate-pulse">
              En attente de la devinette de Mr. White...
            </div>
          )}
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 4B. VENGEANCE DU DOUBLE-AGENT
  // =========================================================================
  if (roomState.state === "DOUBLE_AGENT_REVENGE") {
    const agent = roomState.eliminatedPlayer;
    const agentPlayer = players.find((p) => p.id === agent?.id);
    const canChooseTarget =
      agent?.id === playerId ||
      (isHost && Boolean(agentPlayer && !agentPlayer.isConnected));

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto text-center">
        <ReconnectingBanner status={connectionStatus} />
        <Card className="w-full p-6 bg-surface border border-pink-500/30 shadow-glow space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F8] text-[#BE185D] border border-pink-500/25 mx-auto flex items-center justify-center text-3xl">
            💣
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-[#BE185D] mb-1">
              {agent?.name || "Le joueur"} était Double-Agent !
            </h1>
            <p className="text-xs text-muted font-bold">
              {canChooseTarget
                ? "Choisissez un survivant à emporter dans votre chute :"
                : "Il choisit qui emporter avec lui dans son élimination..."}
            </p>
          </div>

          {canChooseTarget ? (
            <div className="space-y-2.5 text-left">
              {activePlayers
                .filter((p) => p.id !== agent?.id)
                .map((target) => (
                  <Card
                    key={target.id}
                    onClick={() => {
                      sfxTap();
                      submitDoubleAgentTarget(roomId, target.id);
                    }}
                    className="p-4 flex items-center justify-between bg-surface-elevated border border-border hover:border-pink-500/50 cursor-pointer active-press"
                  >
                    <span className="font-bold text-base text-foreground">{target.name}</span>
                    <Skull size={18} className="text-[#BE185D]" />
                  </Card>
                ))}
            </div>
          ) : (
            <div className="py-4 text-sm font-bold text-muted animate-pulse">
              En attente du choix du Double-Agent...
            </div>
          )}
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 5. RÉSULTAT DU VOTE (Révèle uniquement le rôle, JAMAIS le mot secret)
  // =========================================================================
  if (roomState.state === "VOTE_RESULT") {
    const elim = roomState.eliminatedPlayer;
    const isGuardianSaved = Boolean(elim?.savedByGuardian);
    const isNoElimination = !elim;
    const isHardcoreHidden = elim?.role === "HIDDEN";
    const meta = elim?.role ? UNDERCOVER_ROLE_META[elim.role as UndercoverRole] : undefined;

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto text-center">
        <ReconnectingBanner status={connectionStatus} />
        <Card className="w-full p-8 bg-surface border border-border shadow-glow space-y-6">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border ${
              isGuardianSaved
                ? "bg-[#EEF2FF] text-[#4338CA] border-secondary/25"
                : isNoElimination
                  ? "bg-[#FEF3C7] text-[#B45309] border-amber-500/30"
                  : "bg-[#FEEBEB] text-[#C22E2E] border-primary/25"
            }`}
          >
            {isGuardianSaved ? (
              <ShieldCheck size={40} />
            ) : isNoElimination ? (
              <Scale size={40} />
            ) : (
              <Skull size={40} />
            )}
          </div>

          {isGuardianSaved ? (
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#4338CA] block mb-1">
                Sauvetage Miraculeux !
              </span>
              <h1 className="font-display text-2xl font-black text-foreground">
                {elim?.name} est immunisé !
              </h1>
              <p className="text-xs text-muted font-bold mt-2">
                L&apos;Ange Gardien a protégé ce joueur contre la première élimination !
              </p>
            </div>
          ) : isNoElimination ? (
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309] block mb-1">
                Résultat du vote
              </span>
              <h1 className="font-display text-2xl font-black text-foreground">
                Personne n&apos;est éliminé !
              </h1>
              <p className="text-xs text-muted font-bold mt-2">
                Égalité persistante ou vote blanc unanime — le jeu continue !
              </p>
            </div>
          ) : (
            <>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C22E2E] block mb-1">
                  Résultat du vote
                </span>
                <h1 className="font-display text-3xl font-black text-foreground">
                  {elim?.name} est éliminé !
                </h1>
                <p className="text-xs text-muted font-bold mt-1">
                  Votes reçus : {elim?.votes || 1}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-elevated border border-border">
                <p className="text-xs font-bold text-muted mb-1">
                  Son identité...
                </p>
                {isHardcoreHidden ? (
                  <span className="text-sm font-black text-[#C22E2E] tracking-wider uppercase">
                    🙈 Rôle masqué (Mode Hardcore)
                  </span>
                ) : (
                  <span
                    className={`text-xl font-black tracking-wider uppercase ${
                      meta?.textClass || "text-primary"
                    }`}
                  >
                    {meta ? `${meta.label} ${meta.emoji}` : elim?.role}
                  </span>
                )}
              </div>
            </>
          )}

          {isHost ? (
            <Button
              variant="primary"
              className="w-full py-4 text-md font-extrabold gap-2 rounded-full"
              onClick={() => {
                sfxTap();
                continueRound(roomId);
              }}
            >
              Continuer le tour suivant <ArrowRight size={18} />
            </Button>
          ) : (
            <p className="text-xs font-bold text-muted animate-pulse">
              L&apos;hôte va lancer le tour suivant...
            </p>
          )}
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 6. FIN DE PARTIE & VICTOIRE (Tableau complet des révélations)
  // =========================================================================
  if (roomState.state === "END_GAME") {
    const winner = roomState.winnerTeam;
    const title =
      winner === "CIVILIANS"
        ? "VICTOIRE DES CIVILS ! 🏆"
        : winner === "UNDERCOVER"
          ? "VICTOIRE DES UNDERCOVER ! 🕵️"
          : winner === "JOKER"
            ? "VICTOIRE DU JOKER ! 🃏"
            : "VICTOIRE DE MR. WHITE ! 🤍";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 w-full max-w-md mx-auto pb-32">
        <ReconnectingBanner status={connectionStatus} />
        <div className="w-full text-center py-6">
          <Trophy size={48} className="text-[#D97706] mx-auto mb-3" />
          <h1 className="font-display text-3xl font-black text-foreground mb-2">{title}</h1>
          <p className="text-xs font-bold text-muted">
            La partie est terminée ! Voici tous les rôles et les mots :
          </p>
        </div>

        {(roomState.civilianWord || roomState.undercoverWord) && (
          <Card className="w-full p-4 mb-4 bg-surface border border-border shadow-soft text-center space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">
              Les mots de la manche{" "}
              {roomState.category ? `(${roomState.category})` : ""}
            </p>
            <div className="flex items-center justify-around gap-3 text-sm font-black">
              <span className="text-[#1D4ED8]">
                Civils : {roomState.civilianWord || "—"}
              </span>
              <span className="text-[#C22E2E]">
                Undercover : {roomState.undercoverWord || "—"}
              </span>
            </div>
          </Card>
        )}

        {/* Tableau des révélations */}
        <Card className="w-full p-6 bg-surface border border-border shadow-glow space-y-3 my-auto">
          <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-3">
            Révélation complète des cartes
          </h3>

          <div className="space-y-2.5">
            {players.map((p) => {
              const role = p.role || "Civilian";
              const meta = UNDERCOVER_ROLE_META[role as UndercoverRole];
              const wordDisplay =
                role === "MrWhite"
                  ? "Aucun mot"
                  : role === "Joker" || role === "Cameleon"
                    ? "Sans mot"
                    : p.word || "—";

              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-2 p-3 rounded-xl bg-surface-elevated border border-border"
                >
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-bold text-sm text-foreground truncate">
                      {p.name} {p.isEliminated && "💀"}
                    </span>
                    <span
                      className={`text-[11px] font-black uppercase ${
                        meta?.textClass || "text-[#1D4ED8]"
                      }`}
                    >
                      {meta ? `${meta.emoji} ${meta.label}` : role}
                    </span>
                  </div>
                  <span className="text-sm font-black text-foreground text-right break-words max-w-[50%] shrink-0">
                    {wordDisplay}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md mx-auto">
            {isHost ? (
              <Button
                variant="primary"
                className="w-full h-14 sm:h-16 text-base sm:text-lg font-extrabold gap-2 rounded-full"
                onClick={() => {
                  sfxTap();
                  restartLobby(roomId);
                }}
              >
                <RefreshCw size={20} /> Rejouer une partie 🔄
              </Button>
            ) : (
              <div className="text-center py-3 text-xs font-bold text-muted animate-pulse">
                En attente que l&apos;hôte relance le salon...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return null;
}
