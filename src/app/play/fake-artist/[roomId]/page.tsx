"use client";

import { use, useState, useEffect, useRef, useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  FakeArtistRole, FakeArtistPlayer, DrawingStroke, DrawingPoint, 
  PLAYER_COLORS, FAKE_ARTIST_CATEGORIES, FakeArtistCategoryName,
  getRandomDrawingWord, generateFakeArtistRoles, checkFakeArtistGuess,
  DrawingWordItem
} from "@/games/fake-artist/logic";
import { fakeArtistConfig } from "@/games/fake-artist/config";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Eye, EyeOff, Trophy, Share, Users, 
  Smartphone, Check, Clock, RotateCcw, Volume2,
  HelpCircle, Vote, RefreshCw, BookOpen, Sparkles,
  Palette, Brush, Download, Undo, AlertCircle, CheckCircle, Flame
} from "lucide-react";
import { useRouter } from "next/navigation";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal } from "@/lib/audio";
import { voiceEngine } from "@/lib/voiceEngine";

type GamePhase = 
  | "CONFIG"
  | "PASS_TO_PLAYER"
  | "ENTER_NAME"
  | "SHOW_ROLE"
  | "DRAWING_BOARD"
  | "VOTING_PHASE"
  | "IMPOSTOR_GUESS"
  | "END_GAME";

export default function FakeArtistLocalGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat, savedGroup, setSavedGroup } = useAppStore();

  // --- Configuration State ---
  const [phase, setPhase] = useState<GamePhase>("CONFIG");
  const [selectedCategories, setSelectedCategories] = useState<FakeArtistCategoryName[]>(["Toutes les catégories"]);
  const [playerCount, setPlayerCount] = useState<number>(() => savedGroup.length >= 3 ? savedGroup.length : 5);
  const [fakeArtistCount, setFakeArtistCount] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(2); // 2 traits par joueur
  const [strokeTimerMax, setStrokeTimerMax] = useState<number>(0); // 0 = illimité
  const [enableVoiceNarrator, setEnableVoiceNarrator] = useState<boolean>(false);
  const [showCustomWordsModal, setShowCustomWordsModal] = useState<boolean>(false);
  const [customWords, setCustomWords] = useState<Array<{ word: string; category?: string; hint?: string }>>([]);
  const [newCustomWord, setNewCustomWord] = useState<string>("");
  const [newCustomCategory, setNewCustomCategory] = useState<string>("Objets du Quotidien");
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // --- Match State ---
  const [currentWordItem, setCurrentWordItem] = useState<DrawingWordItem>({ word: "", category: "" });
  const [playerList, setPlayerList] = useState<FakeArtistPlayer[]>([]);
  const [currentDistIndex, setCurrentDistIndex] = useState<number>(0);
  const [tempName, setTempName] = useState<string>("");
  const [isRoleRevealed, setIsRoleRevealed] = useState<boolean>(false);

  // --- Drawing State ---
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentDrawerIdx, setCurrentDrawerIdx] = useState<number>(0);
  const [allStrokes, setAllStrokes] = useState<DrawingStroke[]>([]);
  const [currentStrokePoints, setCurrentStrokePoints] = useState<DrawingPoint[]>([]);
  const [isDrawingActive, setIsDrawingActive] = useState<boolean>(false);
  const [hasCompletedCurrentStroke, setHasCompletedCurrentStroke] = useState<boolean>(false);
  const [strokeTimer, setStrokeTimer] = useState<number>(0);

  // --- Voting & Resolution State ---
  const [selectedAccusedId, setSelectedAccusedId] = useState<string | null>(null);
  const [accusedPlayer, setAccusedPlayer] = useState<FakeArtistPlayer | null>(null);
  const [impostorGuessInput, setImpostorGuessInput] = useState<string>("");
  const [winnerTeam, setWinnerTeam] = useState<"ARTISTS" | "FAKE_ARTIST">("ARTISTS");
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, number>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Validation de la configuration
  const configValidation = useMemo(() => {
    if (playerCount < 3) return { isValid: false, error: "Il faut au moins 3 joueurs." };
    if (fakeArtistCount >= playerCount - 1) return { isValid: false, error: "Trop de faux artistes par rapport au nombre de joueurs." };
    return { isValid: true };
  }, [playerCount, fakeArtistCount]);

  const handleToggleCategory = (cat: FakeArtistCategoryName) => {
    sfxTap();
    if (cat === "Toutes les catégories") {
      setSelectedCategories(["Toutes les catégories"]);
      return;
    }
    const filtered = selectedCategories.filter(c => c !== "Toutes les catégories");
    if (filtered.includes(cat)) {
      const next = filtered.filter(c => c !== cat);
      setSelectedCategories(next.length === 0 ? ["Toutes les catégories"] : next);
    } else {
      setSelectedCategories([...filtered, cat]);
    }
  };

  // ─────────────────────────────────────────────────────────
  // 1. LANCEMENT D'UNE PARTIE
  // ─────────────────────────────────────────────────────────
  const handleStartGame = () => {
    if (!configValidation.isValid) return;

    // 1. Tirage du mot
    const wordItem = getRandomDrawingWord(selectedCategories, customWords);
    setCurrentWordItem(wordItem);

    // 2. Génération des rôles
    const roles = generateFakeArtistRoles(playerCount, fakeArtistCount);

    // 3. Préparation des joueurs avec leurs couleurs
    const names = savedGroup.length >= playerCount 
      ? savedGroup.slice(0, playerCount) 
      : Array.from({ length: playerCount }, (_, i) => `Joueur ${i + 1}`);

    const newPlayers: FakeArtistPlayer[] = names.map((name, i) => ({
      id: `player_${i}_${Date.now()}`,
      name,
      isHost: i === 0,
      isReady: true,
      isConnected: true,
      score: 0,
      scorePoints: 0,
      gameRole: roles[i],
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      isEliminated: false,
    }));

    setPlayerList(newPlayers);
    setAllStrokes([]);
    setCurrentStrokePoints([]);
    setHasCompletedCurrentStroke(false);
    setCurrentDistIndex(0);
    setTempName(newPlayers[0]?.name || "");
    setIsRoleRevealed(false);

    sfxSuspense();
    if (enableVoiceNarrator) {
      voiceEngine.speak("La partie commence ! Passez le smartphone au premier artiste.", { tone: "ANNOUNCEMENT" });
    }
    setPhase("PASS_TO_PLAYER");
  };

  const handleReplaySameTeam = () => {
    const wordItem = getRandomDrawingWord(selectedCategories, customWords);
    setCurrentWordItem(wordItem);

    const count = playerList.length > 0 ? playerList.length : playerCount;
    const roles = generateFakeArtistRoles(count, fakeArtistCount);

    const replayedPlayers: FakeArtistPlayer[] = playerList.map((p, i) => ({
      ...p,
      gameRole: roles[i],
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      scorePoints: 0,
    }));

    setPlayerList(replayedPlayers);
    setAllStrokes([]);
    setCurrentStrokePoints([]);
    setHasCompletedCurrentStroke(false);
    setCurrentDistIndex(0);
    setTempName(replayedPlayers[0]?.name || "");
    setIsRoleRevealed(false);

    sfxSuspense();
    if (enableVoiceNarrator) {
      voiceEngine.speak("Nouvelle manche ! Passez le smartphone au premier artiste.", { tone: "ANNOUNCEMENT" });
    }
    setPhase("PASS_TO_PLAYER");
  };

  // ─────────────────────────────────────────────────────────
  // 2. DISTRIBUTION & MÉMORISATION DU MOT SECRET
  // ─────────────────────────────────────────────────────────
  const handlePassReady = () => {
    sfxTap();
    const currentP = playerList[currentDistIndex];
    if (currentP && currentP.name && !currentP.name.startsWith("Joueur ")) {
      setPhase("SHOW_ROLE");
    } else {
      setTempName(currentP?.name || "");
      setPhase("ENTER_NAME");
    }
  };

  const handleConfirmName = () => {
    if (!tempName.trim()) return;
    sfxTap();
    const updated = [...playerList];
    updated[currentDistIndex].name = tempName.trim();
    setPlayerList(updated);
    setSavedGroup(updated.map(p => p.name));
    setPhase("SHOW_ROLE");
  };

  const handleRevealRole = () => {
    sfxReveal();
    setIsRoleRevealed(true);
  };

  const handleRoleMemorized = () => {
    sfxTap();
    setIsRoleRevealed(false);

    if (currentDistIndex < playerList.length - 1) {
      setCurrentDistIndex(prev => prev + 1);
      setPhase("PASS_TO_PLAYER");
    } else {
      // Tous les joueurs ont vu leur rôle -> Début du dessin !
      setCurrentRound(1);
      setCurrentDrawerIdx(0);
      setCurrentStrokePoints([]);
      setHasCompletedCurrentStroke(false);
      sfxSuccess();
      if (enableVoiceNarrator) {
        voiceEngine.speak(`Tous les rôles sont attribués ! Place au dessin. ${playerList[0].name}, à toi de tracer le premier trait !`, { tone: "ANNOUNCEMENT" });
      }
      setPhase("DRAWING_BOARD");
    }
  };

  // ─────────────────────────────────────────────────────────
  // 3. TOILE DE DESSIN TACTILE (1 SEUL TRAIT)
  // ─────────────────────────────────────────────────────────
  const redrawCanvas = (strokesToDraw: DrawingStroke[], livePoints: DrawingPoint[] = [], liveColor: string = "") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fond blanc propre
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner tous les traits passés
    strokesToDraw.forEach(stroke => {
      if (stroke.points.length < 2) return;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });

    // Dessiner le trait en cours
    if (livePoints.length >= 2 && liveColor) {
      ctx.strokeStyle = liveColor;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(livePoints[0].x, livePoints[0].y);
      for (let i = 1; i < livePoints.length; i++) {
        ctx.lineTo(livePoints[i].x, livePoints[i].y);
      }
      ctx.stroke();
    }
  };

  // Redessiner quand allStrokes ou phase change
  useEffect(() => {
    if (phase === "DRAWING_BOARD" || phase === "VOTING_PHASE" || phase === "END_GAME") {
      const currentDrawer = playerList[currentDrawerIdx];
      redrawCanvas(allStrokes, currentStrokePoints, currentDrawer?.color?.hex || "#EF4444");
    }
  }, [phase, allStrokes, currentStrokePoints, currentDrawerIdx, playerList]);

  const getCanvasCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): DrawingPoint | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (hasCompletedCurrentStroke) return; // 1 seul trait autorisé
    const pt = getCanvasCoordinates(e);
    if (!pt) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDrawingActive(true);
    setCurrentStrokePoints([pt]);
    sfxTap();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingActive || hasCompletedCurrentStroke) return;
    const pt = getCanvasCoordinates(e);
    if (!pt) return;

    setCurrentStrokePoints(prev => {
      const updated = [...prev, pt];
      const currentDrawer = playerList[currentDrawerIdx];
      redrawCanvas(allStrokes, updated, currentDrawer?.color?.hex || "#EF4444");
      return updated;
    });
  };

  const handlePointerUp = () => {
    if (!isDrawingActive) return;
    setIsDrawingActive(false);
    if (currentStrokePoints.length >= 2) {
      setHasCompletedCurrentStroke(true);
      sfxSuccess();
    }
  };

  const handleUndoCurrentStroke = () => {
    sfxTap();
    setCurrentStrokePoints([]);
    setHasCompletedCurrentStroke(false);
    const currentDrawer = playerList[currentDrawerIdx];
    redrawCanvas(allStrokes, [], currentDrawer?.color?.hex || "#EF4444");
  };

  const handleValidateStroke = () => {
    if (currentStrokePoints.length < 2) return;
    sfxTap();

    const currentDrawer = playerList[currentDrawerIdx];
    const newStroke: DrawingStroke = {
      playerId: currentDrawer.id,
      playerName: currentDrawer.name,
      color: currentDrawer.color.hex,
      points: currentStrokePoints,
      round: currentRound,
    };

    const nextStrokes = [...allStrokes, newStroke];
    setAllStrokes(nextStrokes);
    setCurrentStrokePoints([]);
    setHasCompletedCurrentStroke(false);

    // Passer au joueur suivant ou au tour suivant
    if (currentDrawerIdx < playerList.length - 1) {
      const nextIdx = currentDrawerIdx + 1;
      setCurrentDrawerIdx(nextIdx);
      if (enableVoiceNarrator) {
        voiceEngine.speak(`C'est au tour de ${playerList[nextIdx].name} (${playerList[nextIdx].color.name})`, { tone: "ANNOUNCEMENT" });
      }
    } else {
      // Fin du tour pour tous les joueurs
      if (currentRound < totalRounds) {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        setCurrentDrawerIdx(0);
        if (enableVoiceNarrator) {
          voiceEngine.speak(`Début du tour de dessin numéro ${nextRound} ! ${playerList[0].name}, à toi.`, { tone: "ANNOUNCEMENT" });
        }
      } else {
        // Fin des 2 tours de dessin -> Phase de vote !
        sfxSuspense();
        if (enableVoiceNarrator) {
          voiceEngine.speak("Le dessin est terminé ! Observez la toile, débattez et démasquez le faux artiste !", { tone: "SUSPENSE" });
        }
        setPhase("VOTING_PHASE");
      }
    }
  };

  // ─────────────────────────────────────────────────────────
  // 4. VOTE & DÉPASSEMENT DU FAUX ARTISTE
  // ─────────────────────────────────────────────────────────
  const handleVoteSubmit = () => {
    if (!selectedAccusedId) return;
    sfxTap();
    const accused = playerList.find(p => p.id === selectedAccusedId);
    if (!accused) return;

    setAccusedPlayer(accused);

    if (accused.gameRole === "FakeArtist") {
      // Le Faux Artiste a été démasqué au vote ! Il a droit à sa devinette ultime.
      sfxSuspense();
      setImpostorGuessInput("");
      if (enableVoiceNarrator) {
        voiceEngine.speak(`Bien joué ! ${accused.name} était bien le Faux Artiste ! Mais il a une ultime chance de voler la victoire...`, { tone: "SUSPENSE" });
      }
      setPhase("IMPOSTOR_GUESS");
    } else {
      // Les artistes ont voté contre un innocent ! Le Faux Artiste gagne automatiquement.
      sfxError();
      setWinnerTeam("FAKE_ARTIST");
      awardScores("FAKE_ARTIST");
      incrementStat("gamesPlayed");
      if (enableVoiceNarrator) {
        const realFake = playerList.find(p => p.gameRole === "FakeArtist");
        voiceEngine.speak(`Erreur tragique ! ${accused.name} était un vrai artiste ! Le faux artiste était ${realFake?.name || "inconnu"}. Victoire du Faux Artiste !`, { tone: "DRAMA" });
      }
      setPhase("END_GAME");
    }
  };

  const handleImpostorGuessSubmit = () => {
    if (!impostorGuessInput.trim() || !accusedPlayer) return;
    sfxTap();

    const isCorrect = checkFakeArtistGuess(impostorGuessInput, currentWordItem.word);

    if (isCorrect) {
      // Le Faux Artiste a deviné le mot -> Victoire du Faux Artiste !
      sfxVictory();
      setWinnerTeam("FAKE_ARTIST");
      awardScores("FAKE_ARTIST", true);
      incrementStat("gamesPlayed");
      if (enableVoiceNarrator) {
        voiceEngine.speak(`Incroyable ! ${accusedPlayer.name} a deviné le mot secret (${currentWordItem.word}) et vole la victoire !`, { tone: "VICTORY" });
      }
    } else {
      // Le Faux Artiste a échoué -> Victoire des Vrais Artistes !
      sfxVictory();
      setWinnerTeam("ARTISTS");
      awardScores("ARTISTS");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      if (enableVoiceNarrator) {
        voiceEngine.speak(`Raté ! Le mot secret était ${currentWordItem.word}. Victoire éclatante des Vrais Artistes !`, { tone: "VICTORY" });
      }
    }
    setPhase("END_GAME");
  };

  const awardScores = (winner: "ARTISTS" | "FAKE_ARTIST", isGuessWin: boolean = false) => {
    const updatedList = playerList.map(p => {
      let pts = 0;
      if (winner === "ARTISTS" && p.gameRole === "Artist") {
        pts = 100;
      } else if (winner === "FAKE_ARTIST" && p.gameRole === "FakeArtist") {
        pts = isGuessWin ? 300 : 200;
      }
      return { ...p, scorePoints: pts };
    });

    setPlayerList(updatedList);
    updatedList.forEach(p => {
      if (p.scorePoints > 0) {
        setCumulativeScores(prev => ({ ...prev, [p.name]: (prev[p.name] || 0) + p.scorePoints }));
      }
    });
  };

  // Télécharger / Partager l'image du dessin
  const handleDownloadMasterpiece = () => {
    sfxSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `vylo-faux-artiste-${currentWordItem.word.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  };

  // ─────────────────────────────────────────────────────────
  // RENDU DES DIFFÉRENTES PHASES
  // ─────────────────────────────────────────────────────────

  // --- ÉCRAN 1 : CONFIGURATION ---
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-8 px-6 max-w-md mx-auto relative pb-32">
        <div className="w-full flex items-center justify-between mb-2">
          <button 
            onClick={() => { sfxTap(); router.back(); }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">🎨 Mode Local 1 Téléphone</span>
          </div>
          <button 
            onClick={() => { sfxTap(); setShowRulesModal(true); }}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-primary"
          >
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-glow">
            <Palette size={36} />
          </div>
          <h1 className="text-3xl font-black">{fakeArtistConfig.name}</h1>
          <p className="text-foreground/60 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
            Tout le monde dessine le mot secret trait par trait... sauf un imposteur qui tente de bluffer sans se faire démasquer !
          </p>
        </div>

        <div className="w-full space-y-4">
          {/* Nombre de joueurs */}
          <Card className="p-4 bg-surface/80 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-xs flex items-center gap-1.5 text-foreground/80">
                <Users size={14} className="text-emerald-400" /> Nombre de joueurs
              </span>
              <span className="font-black text-emerald-400 text-base">{playerCount}</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setPlayerCount(Math.max(3, playerCount - 1)); sfxTap(); }}
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-bold text-sm hover:bg-white/10"
              >-</button>
              <input 
                type="range" 
                min={3} 
                max={12} 
                value={playerCount} 
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="flex-1 accent-emerald-400"
              />
              <button 
                onClick={() => { setPlayerCount(Math.min(12, playerCount + 1)); sfxTap(); }}
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-bold text-sm hover:bg-white/10"
              >+</button>
            </div>
          </Card>

          {/* Nombre de tours de dessin */}
          <Card className="p-4 bg-surface/80 border border-white/10">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-xs flex items-center gap-1.5 text-foreground/80">
                  <Brush size={14} className="text-cyan-400" /> Traits par joueur
                </span>
                <span className="text-[10px] text-foreground/50">Nombre de fois où chacun pose son doigt</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(rounds => (
                  <button
                    key={rounds}
                    onClick={() => { setTotalRounds(rounds); sfxTap(); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      totalRounds === rounds 
                        ? "bg-cyan-500 text-white shadow-glow" 
                        : "bg-white/5 text-foreground/60 hover:text-white"
                    }`}
                  >
                    {rounds} {rounds > 1 ? "traits" : "trait"}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Faux artistes */}
          <Card className="p-4 bg-surface/80 border border-white/10">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-xs flex items-center gap-1.5 text-foreground/80">
                  <EyeOff size={14} className="text-red-400" /> Nombre de Faux Artistes
                </span>
                <span className="text-[10px] text-foreground/50">Imposteurs infiltrés dans la partie</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2].map(count => (
                  <button
                    key={count}
                    onClick={() => { setFakeArtistCount(count); sfxTap(); }}
                    disabled={count >= playerCount - 1}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      fakeArtistCount === count 
                        ? "bg-red-500 text-white shadow-glow" 
                        : "bg-white/5 text-foreground/60 hover:text-white disabled:opacity-30"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Sélecteur de catégories */}
          <Card className="p-4 bg-surface/80 border border-white/10">
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-bold text-xs flex items-center gap-1.5 text-foreground/80">
                <BookOpen size={14} className="text-amber-400" /> Thèmes & Catégories
              </span>
              <button 
                onClick={() => { setShowCustomWordsModal(true); sfxTap(); }}
                className="text-[10px] font-extrabold text-primary flex items-center gap-1 hover:underline"
              >
                <Sparkles size={12} /> Mots personnalisés ({customWords.length})
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {FAKE_ARTIST_CATEGORIES.map(cat => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleToggleCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                      isSelected 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-glow" 
                        : "bg-white/5 border-white/5 text-foreground/60 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Voix Narratrice toggle */}
          <Card className="p-4 bg-surface/80 border border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Volume2 size={16} />
                </div>
                <div>
                  <span className="font-bold text-xs block">Maître du Jeu Vocal</span>
                  <span className="text-[10px] text-foreground/50">Annonce les tours et le verdict à voix haute</span>
                </div>
              </div>
              <button
                onClick={() => { setEnableVoiceNarrator(!enableVoiceNarrator); sfxTap(); }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${enableVoiceNarrator ? "bg-purple-500" : "bg-white/10"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${enableVoiceNarrator ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </Card>
        </div>

        {/* Bouton de lancement fixe */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button 
              variant="primary" 
              className="w-full h-16 text-lg shadow-summer-glow bg-emerald-600 border-emerald-500"
              disabled={!configValidation.isValid}
              onClick={handleStartGame}
            >
              Distribuer les rôles ({playerCount} artistes) 🎨
            </Button>
          </div>
        </div>

        {/* MODALE RÈGLES */}
        {showRulesModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <Card className="w-full max-w-sm p-6 border border-white/15 bg-surface/95 shadow-glow flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h3 className="font-black text-lg flex items-center gap-2 text-emerald-400">
                  <Palette size={20} /> Règles du Faux Artiste
                </h3>
                <button 
                  onClick={() => setShowRulesModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm"
                >✕</button>
              </div>
              <div className="overflow-y-auto space-y-3 pr-1 text-left flex-1 text-xs leading-relaxed text-foreground/80">
                <p>🧑‍🎨 <strong>Les Vrais Artistes :</strong> Vous recevez le mot secret. À votre tour, vous tracez <strong>1 seul trait continu</strong> pour faire deviner le sujet à vos alliés sans que le faussaire comprenne !</p>
                <p>🎭 <strong>Le Faux Artiste :</strong> Vous ne connaissez que la catégorie. Vous devez observer ce que les autres dessinent et tracer un trait crédible pour vous fondre dans la masse !</p>
                <p>🎨 <strong>Couleurs distinctes :</strong> Chaque joueur possède sa propre couleur de feutre sur la toile.</p>
                <p>🗳️ <strong>Vote :</strong> Après 2 tours de dessin, tout le monde vote pour démasquer le Faux Artiste.</p>
                <p>✨ <strong>Devinette Ultime :</strong> Si le Faux Artiste est voté, il a une dernière chance : s'il devine le mot secret, <strong>il vole la victoire</strong> !</p>
              </div>
              <Button variant="surface" className="w-full mt-4 py-3 text-sm" onClick={() => setShowRulesModal(false)}>
                J'ai compris ! ✓
              </Button>
            </Card>
          </div>
        )}

        {/* MODALE MOTS PERSONNALISÉS */}
        {showCustomWordsModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <Card className="w-full max-w-sm p-6 border border-white/15 bg-surface/95 shadow-glow flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h3 className="font-black text-lg flex items-center gap-2 text-emerald-400">
                  <Sparkles size={20} /> Mots Personnalisés
                </h3>
                <button 
                  onClick={() => setShowCustomWordsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm"
                >✕</button>
              </div>

              <div className="space-y-2 mb-4 bg-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] font-black uppercase text-emerald-400 block">Nouveau mot à faire dessiner</span>
                <input
                  type="text"
                  value={newCustomWord}
                  onChange={(e) => setNewCustomWord(e.target.value)}
                  placeholder="Ex: Tour Eiffel, Licorne, Chien..."
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-emerald-400"
                />
                <Button
                  variant="primary"
                  className="w-full py-2 text-xs font-bold bg-emerald-600 border-emerald-500"
                  disabled={!newCustomWord.trim()}
                  onClick={() => {
                    if (newCustomWord.trim()) {
                      setCustomWords(prev => [...prev, { word: newCustomWord.trim(), category: "✨ Mots Personnalisés" }]);
                      setNewCustomWord("");
                      sfxSuccess();
                    }
                  }}
                >
                  Ajouter le mot +
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 max-h-48 pr-1">
                {customWords.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white/5 text-xs font-bold">
                    <span>{item.word}</span>
                    <button 
                      onClick={() => setCustomWords(customWords.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-xs font-black px-2"
                    >✕</button>
                  </div>
                ))}
              </div>

              <Button variant="surface" className="w-full mt-4 py-3 text-sm" onClick={() => setShowCustomWordsModal(false)}>
                Fermer
              </Button>
            </Card>
          </div>
        )}
      </main>
    );
  }

  // --- ÉCRAN 2 : PASSEZ LE TÉLÉPHONE ---
  if (phase === "PASS_TO_PLAYER") {
    const currentP = playerList[currentDistIndex];
    const isNamed = currentP?.name && !currentP.name.startsWith("Joueur ");

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className={`w-24 h-24 rounded-full ${currentP?.color?.bgClass || "bg-emerald-500"} text-white flex items-center justify-center mb-6 shadow-glow animate-pulse`}>
          <Smartphone size={44} />
        </div>
        <h2 className="text-3xl font-black mb-3">Passez le téléphone</h2>
        <p className="text-foreground/60 text-base mb-2">
          Donnez le smartphone à :
        </p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${currentP?.color?.badgeClass || "bg-white/10"} mb-12`}>
          <span className={`w-3 h-3 rounded-full ${currentP?.color?.bgClass}`} />
          <span className="text-xl font-black">{currentP?.name}</span>
        </div>

        <Button 
          variant="primary" 
          className="w-full py-5 text-lg shadow-summer-glow bg-emerald-600 border-emerald-500"
          onClick={handlePassReady}
        >
          {isNamed ? `C'est moi, ${currentP.name} ! 👋` : "C'est moi ! 👋"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 3 : SAISIE DU PRÉNOM ---
  if (phase === "ENTER_NAME") {
    const currentP = playerList[currentDistIndex];

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-black mb-2">Artiste n°{currentDistIndex + 1}</h2>
        <p className="text-foreground/50 text-sm mb-8">Inscris ton prénom pour recevoir ta couleur de feutre.</p>

        <Card className="w-full p-8 flex flex-col items-center mb-8 border border-white/10 shadow-glow">
          <div className={`w-20 h-20 rounded-full ${currentP?.color?.bgClass || "bg-emerald-500"} text-white flex items-center justify-center text-3xl font-black mb-6 shadow-glow`}>
            {tempName.trim() ? tempName.trim().charAt(0).toUpperCase() : (currentDistIndex + 1)}
          </div>
          
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Quel est ton prénom ?"
            className="w-full bg-surface border-2 border-white/10 rounded-2xl px-5 py-4 text-center font-bold text-lg focus:border-emerald-400 outline-none"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter" && tempName.trim()) handleConfirmName(); }}
          />
        </Card>

        <Button 
          variant="primary" 
          className="w-full py-5 text-lg bg-emerald-600 border-emerald-500"
          disabled={!tempName.trim()}
          onClick={handleConfirmName}
        >
          Valider mon prénom ✓
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 4 : RÉVÉLATION DU RÔLE ET DU MOT SECRET ---
  if (phase === "SHOW_ROLE") {
    const currentP = playerList[currentDistIndex];
    const isFake = currentP?.gameRole === "FakeArtist";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-3 h-3 rounded-full ${currentP?.color?.bgClass}`} />
          <span className="text-sm font-black uppercase tracking-widest text-foreground/60">{currentP?.name} ({currentP?.color?.name})</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-6">Votre consigne secrète</h1>

        <Card className="w-full min-h-[320px] flex flex-col items-center justify-center p-8 mb-8 border border-white/10 relative overflow-hidden shadow-glow">
          {isRoleRevealed ? (
            <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 mb-2">Thème : {currentWordItem.category}</span>
              
              {isFake ? (
                <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-center w-full">
                  <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
                    <EyeOff size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-red-400 mb-2">🎭 FAUX ARTISTE</h2>
                  <p className="text-xs text-foreground/80 font-bold leading-relaxed">
                    Vous ignorez le mot secret ! Observez les traits des autres artistes et bluffez avec un trait cohérent !
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center w-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-1">Mot secret à dessiner</span>
                  <h2 className="text-4xl font-black text-white mb-3">{currentWordItem.word}</h2>
                  <p className="text-xs text-foreground/70 font-medium">
                    Dessinez 1 seul trait continu par tour sans trop en dévoiler au faussaire !
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold">
                <span>Couleur de ton feutre :</span>
                <span className={`font-black ${currentP?.color?.textClass}`}>{currentP?.color?.name}</span>
                <span className={`w-3 h-3 rounded-full ${currentP?.color?.bgClass}`} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer" onClick={handleRevealRole}>
              <EyeOff size={56} className="text-white/20 mb-4 animate-pulse" />
              <p className="text-lg font-bold">Appuyez pour voir votre rôle & mot</p>
            </div>
          )}
        </Card>

        <Button 
          variant={isRoleRevealed ? "primary" : "surface"} 
          className="w-full py-5 text-lg bg-emerald-600 border-emerald-500"
          onClick={() => {
            if (!isRoleRevealed) handleRevealRole();
            else handleRoleMemorized();
          }}
        >
          {isRoleRevealed ? "J'ai mémorisé ma consigne ✓" : "Voir mon mot secret"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 5 : TOILE DE DESSIN TACTILE (1 SEUL TRAIT PAR TOUR) ---
  if (phase === "DRAWING_BOARD") {
    const currentDrawer = playerList[currentDrawerIdx];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-4 px-4 max-w-md mx-auto">
        {/* Header : Tour & Joueur actif */}
        <div className="w-full flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-foreground/50 block">Tour n°{currentRound} / {totalRounds}</span>
            <div className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 rounded-full ${currentDrawer?.color?.bgClass}`} />
              <h2 className="text-lg font-black text-white">{currentDrawer?.name}</h2>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-xl text-xs font-black border ${currentDrawer?.color?.badgeClass}`}>
            Feutre {currentDrawer?.color?.name}
          </div>
        </div>

        {/* Consigne d'action */}
        <div className="w-full text-center mb-2">
          {!hasCompletedCurrentStroke ? (
            <span className="text-xs font-extrabold text-emerald-400 animate-pulse flex items-center justify-center gap-1.5">
              <Brush size={14} /> Pose ton doigt et trace 1 seul trait continu !
            </span>
          ) : (
            <span className="text-xs font-extrabold text-cyan-400 flex items-center justify-center gap-1.5">
              <CheckCircle size={14} /> Trait tracé ! Valide ou recommence ton trait.
            </span>
          )}
        </div>

        {/* Canvas de dessin tactile */}
        <div className="w-full aspect-square max-w-[360px] bg-white rounded-3xl p-1 shadow-2xl border-4 border-white/10 relative touch-none overflow-hidden my-auto">
          <canvas
            ref={canvasRef}
            width={360}
            height={360}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full rounded-2xl cursor-crosshair touch-none"
          />
        </div>

        {/* Boutons d'action pour le joueur actif */}
        <div className="w-full space-y-2 mt-4">
          <div className="flex gap-2">
            <Button
              variant="surface"
              className="flex-1 py-4 text-xs font-bold gap-1.5"
              disabled={currentStrokePoints.length === 0}
              onClick={handleUndoCurrentStroke}
            >
              <RotateCcw size={16} /> Recommencer mon trait
            </Button>
            <Button
              variant="primary"
              className="flex-1 py-4 text-xs font-black gap-1.5 bg-emerald-600 border-emerald-500 shadow-glow"
              disabled={!hasCompletedCurrentStroke}
              onClick={handleValidateStroke}
            >
              <Check size={18} /> Valider mon trait ✓
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 6 : PHASE DE VOTE & DÉBAT SUR LA TOILE ---
  if (phase === "VOTING_PHASE") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 max-w-md mx-auto text-center pb-32">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block mb-1">Chef-d'œuvre achevé !</span>
          <h1 className="text-2xl font-black text-white">Qui est le Faux Artiste ?</h1>
          <p className="text-foreground/60 text-xs mt-1">Observez les couleurs et votez pour démasquer le faussaire :</p>
        </div>

        {/* Toile terminée */}
        <div className="w-full aspect-square max-w-[320px] bg-white rounded-3xl p-1 shadow-2xl border-4 border-white/10 my-4">
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            className="w-full h-full rounded-2xl"
          />
        </div>

        {/* Légende des joueurs et sélection pour le vote */}
        <div className="w-full space-y-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-foreground/50 block text-left">
            Touchez le suspect désigné par la table :
          </span>
          <div className="grid grid-cols-2 gap-2">
            {playerList.map(player => {
              const isSelected = selectedAccusedId === player.id;
              return (
                <button
                  key={player.id}
                  onClick={() => { setSelectedAccusedId(player.id); sfxTap(); }}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-red-500/20 border-red-500 text-white shadow-glow" 
                      : "bg-surface border-white/10 text-foreground/70 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full ${player.color.bgClass}`} />
                    <span className="font-bold text-xs">{player.name}</span>
                  </div>
                  {isSelected && <span className="text-xs text-red-400 font-black">Accusé 🎯</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bouton de confirmation du vote */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              className="w-full py-5 text-base bg-red-600 border-red-500 shadow-glow"
              disabled={!selectedAccusedId}
              onClick={handleVoteSubmit}
            >
              Confirmer l'accusation contre {playerList.find(p => p.id === selectedAccusedId)?.name || "l'artiste"} 🎯
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 7 : DEVINETTE ULTIME DU FAUX ARTISTE ---
  if (phase === "IMPOSTOR_GUESS" && accusedPlayer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4 animate-bounce">
          <EyeOff size={44} />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-red-400 mb-1">Démasqué ! Mais tout n'est pas perdu...</span>
        <h1 className="text-3xl font-black mb-2">{accusedPlayer.name}, à vous de jouer !</h1>
        <p className="text-foreground/70 text-xs mb-6 leading-relaxed">
          Si vous devinez le mot secret exact que tous les artistes ont dessiné, <strong>vous volez la victoire</strong> !
        </p>

        <Card className="w-full p-6 border border-white/10 mb-6 bg-surface/90 shadow-glow">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
            Indice de Catégorie : {currentWordItem.category}
          </span>
          <input
            type="text"
            value={impostorGuessInput}
            onChange={(e) => setImpostorGuessInput(e.target.value)}
            placeholder="Quel est le mot secret dessiné ?"
            className="w-full bg-surface border-2 border-white/10 rounded-2xl px-4 py-3.5 text-center font-black text-lg focus:border-emerald-400 outline-none mt-2"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter" && impostorGuessInput.trim()) handleImpostorGuessSubmit(); }}
          />
        </Card>

        <Button
          variant="primary"
          className="w-full py-5 text-lg bg-emerald-600 border-emerald-500 shadow-glow"
          disabled={!impostorGuessInput.trim()}
          onClick={handleImpostorGuessSubmit}
        >
          Valider ma devinette ✨
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 8 : FIN DE PARTIE & EXPORT DU CHEF-D'ŒUVRE ---
  if (phase === "END_GAME") {
    const isArtistsWin = winnerTeam === "ARTISTS";
    const fakeArtists = playerList.filter(p => p.gameRole === "FakeArtist");

    return (
      <main className="min-h-screen flex flex-col items-center py-8 px-4 max-w-md mx-auto text-center pb-12">
        <div className={`w-20 h-20 rounded-full ${isArtistsWin ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"} flex items-center justify-center mb-3 shadow-glow`}>
          <Trophy size={40} />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-foreground/50 block mb-1">Résultat final</span>
        <h1 className="text-3xl font-black mb-2">
          {isArtistsWin ? "Victoire des Vrais Artistes ! 🎨" : "Victoire du Faux Artiste ! 🎭"}
        </h1>

        <Card className="w-full p-4 bg-surface/90 border border-white/10 mb-4 text-center">
          <span className="text-[10px] font-black uppercase text-foreground/50 block mb-1">Le mot secret était</span>
          <h2 className="text-3xl font-black text-emerald-400 mb-2">{currentWordItem.word}</h2>
          <span className="text-xs text-foreground/70 font-bold block">
            Faux Artiste : <strong className="text-red-400">{fakeArtists.map(f => f.name).join(", ")}</strong>
          </span>
        </Card>

        {/* Toile dessinée avec bouton de téléchargement */}
        <div className="w-full aspect-square max-w-[280px] bg-white rounded-3xl p-1 shadow-2xl border-4 border-white/10 mb-3 relative">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="w-full h-full rounded-2xl"
          />
        </div>

        <Button
          variant="surface"
          className="w-full py-3.5 text-xs font-bold gap-2 mb-6 border-white/10 hover:border-emerald-400 text-emerald-400"
          onClick={handleDownloadMasterpiece}
        >
          <Download size={16} /> Télécharger le dessin de la soirée 📸
        </Button>

        {/* Scores de la partie */}
        <Card className="w-full p-4 mb-6 border border-white/10 text-left">
          <span className="text-[10px] font-black uppercase text-foreground/50 block mb-3">Détail des scores</span>
          <div className="space-y-2">
            {playerList.map(player => (
              <div key={player.id} className="flex justify-between items-center text-xs font-bold py-1 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${player.color.bgClass}`} />
                  <span>{player.name}</span>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${player.gameRole === "FakeArtist" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                    {player.gameRole === "FakeArtist" ? "Faux Artiste" : "Artiste"}
                  </span>
                </div>
                <span className="font-black text-yellow-400">+{player.scorePoints} pts</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Classement général cumulé */}
        {Object.keys(cumulativeScores).length > 0 && (
          <Card className="w-full p-4 mb-6 border border-white/10 text-left">
            <h3 className="text-xs font-black uppercase text-yellow-400 flex items-center gap-1.5 mb-3">
              <Trophy size={14} /> Classement de la Soirée
            </h3>
            <div className="space-y-1.5">
              {Object.entries(cumulativeScores)
                .sort(([, a], [, b]) => b - a)
                .map(([name, points], idx) => (
                  <div key={name} className="flex justify-between items-center text-xs font-bold py-1">
                    <span className="text-foreground/80">{idx + 1}. {name}</span>
                    <span className="font-black text-yellow-400">{points} pts</span>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Actions de fin */}
        <div className="w-full space-y-2">
          <Button
            variant="primary"
            className="w-full py-5 text-base bg-emerald-600 border-emerald-500 shadow-glow gap-2"
            onClick={handleReplaySameTeam}
          >
            <RefreshCw size={18} /> Rejouer avec les mêmes artistes (Nouveau mot)
          </Button>
          <Button
            variant="surface"
            className="w-full py-4 text-sm"
            onClick={() => setPhase("CONFIG")}
          >
            Modifier les paramètres / joueurs
          </Button>
        </div>
      </main>
    );
  }

  return null;
}
