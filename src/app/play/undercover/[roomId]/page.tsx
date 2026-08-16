"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";
import { 
  UndercoverRole, UndercoverPlayer, CATEGORIES, CategoryName, 
  validateRoleConfig, getRandomWordPair, generateRolesFromConfig, 
  generateMysteryRoles, generateRolesFromConfigExtended,
  shuffleSpeakingOrder, assignRolesFairly, shuffleArray, checkMrWhiteGuess
} from "@/games/undercover/logic";
import { undercoverConfig } from "@/games/undercover/config";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Eye, EyeOff, Skull, Trophy, Share, Users, 
  Smartphone, Check, Clock, UserCheck, ShieldAlert, RotateCcw, Volume2,
  HelpCircle, Vote, RefreshCw, BookOpen, Zap, Lock, Unlock, AlertCircle, CheckCircle, XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";

type PassPhase = 
  | "CONFIG"             // 1. Choix catégorie, nb joueurs & rôles
  | "PASS_TO_PLAYER"     // 2. Interstitiel "Passez le téléphone..."
  | "ENTER_NAME"         // 3. Carte cliquable -> Saisie prénom
  | "SHOW_WORD"          // 4. "Voir mon mot secret" -> suspense -> mot -> "J'ai mémorisé"
  | "SPEAKING_TURNS"     // 5. Tour de parole mélangé ("C'est au tour de X")
  | "TURN_DECISION"      // 6. Choix après chaque tour : Voter ou Refaire un tour
  | "VOTING_CIRCULATE"   // 7. Circulation du téléphone pour vote individuel
  | "MR_WHITE_GUESS"     // 8. Ultime devinette de Mr. White
  | "VOTE_SUMMARY"       // 9. Résultats du vote & annonce de l'éliminé
  | "END_GAME";          // 10. Bilan, rôles révélés & attribution des points

export default function UndercoverLocalGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat, savedGroup, setSavedGroup } = useAppStore();

  // Rejouer instantanément avec la même équipe
  const handleReplaySameTeam = () => {
    const wordPair = getRandomWordPair(selectedCategories);
    setCurrentCivilianWord(wordPair.civilian);
    const existingNames = playerList.map(p => p.name).filter(n => n.length > 0);
    const count = existingNames.length > 0 ? existingNames.length : playerCount;
    const playerNames = existingNames.length > 0 ? existingNames : Array.from({ length: count }, (_, i) => `Joueur ${i + 1}`);

    const roles = generateRolesFromConfigExtended(count, undercoverCount, mrWhiteCount, jokerCount, cameleonCount, doubleAgentCount);
    const assignedRoles = assignRolesFairly(playerNames, roles);

    const newPlayers: UndercoverPlayer[] = playerNames.map((name, i) => {
      const role = assignedRoles[name] || "Civilian";
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else if (role === "MrWhite") word = "Vous êtes Mr. White";
      else if (role === "Joker") word = "🃏 Vous êtes le JOKER ! Faites-vous éliminer au TOUT PREMIER VOTE (Tour 1) pour GAGNER !";
      else if (role === "Cameleon") word = "🪞 Vous êtes le CAMÉLÉON ! Copiez la description du 1er joueur !";
      else if (role === "DoubleAgent") word = `${wordPair.civilian} (💣 DOUBLE-AGENT : si vous mourez au vote, vous éliminez 1 joueur avec vous !)`;

      return {
        id: `player_${i}_${Date.now()}`,
        name,
        isHost: i === 0,
        isReady: true,
        isConnected: true,
        score: 0,
        scorePoints: 0,
        gameRole: role,
        word,
        isEliminated: false,
      };
    });

    // Mélange aléatoire de l'ordre des joueurs pour la distribution du mot secret !
    const shuffledPlayers = shuffleArray(newPlayers);

    setPlayerList(shuffledPlayers);
    setCurrentDistIndex(0);
    setTempName(shuffledPlayers[0]?.name || "");
    setIsWordRevealed(false);
    sfxSuspense();
    setPhase("PASS_TO_PLAYER");
  };

  // --- Configuration State ---
  const [phase, setPhase] = useState<PassPhase>("CONFIG");
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>(["Toutes les catégories"]);
  const [playerCount, setPlayerCount] = useState<number>(() => savedGroup.length >= 3 ? savedGroup.length : 4);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhiteCount, setMrWhiteCount] = useState(0);
  const [jokerCount, setJokerCount] = useState(0);
  const [cameleonCount, setCameleonCount] = useState(0);
  const [doubleAgentCount, setDoubleAgentCount] = useState(0);
  const [isMysteryMode, setIsMysteryMode] = useState(false);
  const [votingMode, setVotingMode] = useState<"EXPRESS" | "CIRCULATE">("EXPRESS");
  const [speakingTimerMax, setSpeakingTimerMax] = useState<number>(0); // 0 = sans limite

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

  // --- Game Session State ---
  const [playerList, setPlayerList] = useState<UndercoverPlayer[]>([]);
  const [currentDistIndex, setCurrentDistIndex] = useState(0);
  const [tempName, setTempName] = useState("");
  const [isWordRevealed, setIsWordRevealed] = useState(false);
  const [currentCivilianWord, setCurrentCivilianWord] = useState("");

  // --- Gameplay State ---
  const [speakingOrder, setSpeakingOrder] = useState<UndercoverPlayer[]>([]);
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [clueRoundNumber, setClueRoundNumber] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // --- Voting & Special Phase State ---
  const [voterIndex, setVoterIndex] = useState(0);
  const [votesMap, setVotesMap] = useState<Record<string, string>>({}); // voterId -> targetId
  const [eliminatedPlayer, setEliminatedPlayer] = useState<UndercoverPlayer | null>(null);
  const [winnerTeam, setWinnerTeam] = useState<"CIVILIANS" | "UNDERCOVER" | "JOKER" | null>(null);
  const [mrWhiteGuess, setMrWhiteGuess] = useState("");
  const [showJournalModal, setShowJournalModal] = useState(false);

  // Validation de la configuration
  const configValidation = validateRoleConfig(playerCount, undercoverCount, mrWhiteCount);

  // Chronomètre pour le tour de parole
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => (s !== null && s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // ─────────────────────────────────────────────────────────
  // 1. LANCEMENT DE LA DISTRIBUTION DES RÔLES
  // ─────────────────────────────────────────────────────────
  const handleStartDistribution = () => {
    if (!configValidation.isValid) return;

    // 1. Choix des mots (Multi-catégories)
    const wordPair = getRandomWordPair(selectedCategories);
    setCurrentCivilianWord(wordPair.civilian);

    // 2. Génération des rôles (Mode Mystère ou Paramétré)
    const roles = isMysteryMode 
      ? generateMysteryRoles(playerCount)
      : generateRolesFromConfigExtended(playerCount, undercoverCount, mrWhiteCount, jokerCount, cameleonCount, doubleAgentCount);

    const playerIdentifiers = Array.from({ length: playerCount }, (_, i) => `Joueur ${i + 1}`);
    const assignedRoles = assignRolesFairly(playerIdentifiers, roles);

    // 3. Première partie : les noms sont vides pour forcer la saisie manuelle de chaque joueur
    const initialPlayers: UndercoverPlayer[] = roles.map((role, i) => {
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else if (role === "MrWhite") word = "Vous êtes Mr. White";
      else if (role === "Joker") word = "🃏 Vous êtes le JOKER ! Faites-vous éliminer au TOUT PREMIER VOTE (Tour 1) pour GAGNER !";
      else if (role === "Cameleon") word = "🪞 Vous êtes le CAMÉLÉON ! Copiez la description du 1er joueur !";
      else if (role === "DoubleAgent") word = `${wordPair.civilian} (💣 DOUBLE-AGENT : si vous mourez au vote, vous éliminez 1 joueur avec vous !)`;

      return {
        id: `player_${i}_${Date.now()}`,
        name: "", // Premier tour : saisie manuelle requise
        isHost: i === 0,
        isReady: true,
        isConnected: true,
        score: 0,
        scorePoints: 0,
        gameRole: role,
        word,
        isEliminated: false,
      };
    });

    // Mélange aléatoire de l'ordre des joueurs pour la distribution du mot secret !
    const shuffledInitial = shuffleArray(initialPlayers);

    setPlayerList(shuffledInitial);
    setCurrentDistIndex(0);
    setTempName(shuffledInitial[0]?.name || "");
    setIsWordRevealed(false);
    sfxSuspense();
    setPhase("PASS_TO_PLAYER");
  };

  // ─────────────────────────────────────────────────────────
  // 2. VALIDATION D'UN PRÉNOM ET DÉCOUVERTE DU MOT
  // ─────────────────────────────────────────────────────────
  const handleConfirmName = () => {
    if (!tempName.trim()) return;
    sfxTap();
    
    setPlayerList(prev => {
      const copy = [...prev];
      copy[currentDistIndex].name = tempName.trim();
      return copy;
    });
    
    setPhase("SHOW_WORD");
  };

  const handleRevealWord = () => {
    sfxReveal();
    setIsWordRevealed(true);
  };

  const handleMemorized = () => {
    sfxTap();
    setIsWordRevealed(false);

    if (currentDistIndex < playerList.length - 1) {
      const nextIdx = currentDistIndex + 1;
      setCurrentDistIndex(nextIdx);
      setTempName(playerList[nextIdx]?.name || "");
      setPhase("PASS_TO_PLAYER");
    } else {
      // TOUS LES JOUEURS ONT LEUR MOT ➔ LANCEMENT DU TOUR DE PAROLE
      startSpeakingPhase(playerList);
    }
  };

  // ─────────────────────────────────────────────────────────
  // 3. DÉBUT DE LA PHASE DE PAROLE (Ordre de parole 100% aléatoire)
  // ─────────────────────────────────────────────────────────
  const startSpeakingPhase = (players: UndercoverPlayer[]) => {
    // Seuls les joueurs vivants parlent, mélangés aléatoirement
    const alivePlayers = players.filter(p => !p.isEliminated);
    const order = shuffleSpeakingOrder(alivePlayers);
    setSpeakingOrder(order);
    setCurrentSpeakerIdx(0);
    setClueRoundNumber(1);

    if (speakingTimerMax > 0) {
      setTimerSeconds(speakingTimerMax);
      setTimerActive(true);
    } else {
      setTimerSeconds(null);
      setTimerActive(false);
    }

    sfxSuccess();
    setPhase("SPEAKING_TURNS");
  };

  const handleNextSpeaker = () => {
    sfxTap();
    if (currentSpeakerIdx < speakingOrder.length - 1) {
      setCurrentSpeakerIdx(prev => prev + 1);
      if (speakingTimerMax > 0) {
        setTimerSeconds(speakingTimerMax);
        setTimerActive(true);
      }
    } else {
      setTimerActive(false);
      setPhase("TURN_DECISION");
    }
  };

  const startAnotherClueRound = () => {
    sfxTap();
    const alivePlayers = speakingOrder.filter(p => !p.isEliminated);
    const newOrder = shuffleSpeakingOrder(alivePlayers);
    setSpeakingOrder(newOrder);
    setClueRoundNumber(prev => prev + 1);
    setCurrentSpeakerIdx(0);

    if (speakingTimerMax > 0) {
      setTimerSeconds(speakingTimerMax);
      setTimerActive(true);
    }

    setPhase("SPEAKING_TURNS");
  };

  // ─────────────────────────────────────────────────────────
  // 4. PHASE DE VOTE (Circulation ou Express)
  // ─────────────────────────────────────────────────────────
  const startVotingPhase = () => {
    setTimerActive(false);
    setVoterIndex(0);
    setVotesMap({});
    sfxSuspense();
    setPhase("VOTING_CIRCULATE");
  };

  const handleCastVote = (voterId: string, targetId: string) => {
    sfxTap();
    const updated = { ...votesMap, [voterId]: targetId };
    setVotesMap(updated);

    const activeVoters = speakingOrder.filter(p => !p.isEliminated);
    if (voterIndex < activeVoters.length - 1) {
      setVoterIndex(prev => prev + 1);
    } else {
      // Dépouillement des votes
      tallyVotes(updated);
    }
  };

  // ─────────────────────────────────────────────────────────
  // 5. DÉPOUILLEMENT, TENTATIVE DE MR. WHITE & VICTOIRES
  // ─────────────────────────────────────────────────────────
  const tallyVotes = (finalVotes: Record<string, string>) => {
    const voteCounts: Record<string, number> = {};
    Object.values(finalVotes).forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });

    let maxVotes = 0;
    let eliminatedId = "";
    Object.entries(voteCounts).forEach(([id, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = id;
      }
    });

    const eliminated = speakingOrder.find(p => p.id === eliminatedId) || speakingOrder[0];
    handleEliminatePlayer(eliminated);
  };

  const handleEliminatePlayer = (eliminated: UndercoverPlayer) => {
    setEliminatedPlayer(eliminated);

    // Si Mr. White se fait éliminer au vote, il a droit à une devinette ultime !
    if (eliminated.gameRole === "MrWhite") {
      setMrWhiteGuess("");
      sfxSuspense();
      setPhase("MR_WHITE_GUESS");
      return;
    }

    continueAfterElimination(eliminated);
  };

  const handleMrWhiteGuessSubmit = () => {
    if (!mrWhiteGuess.trim() || !eliminatedPlayer) return;
    sfxTap();

    const isCorrect = checkMrWhiteGuess(mrWhiteGuess, currentCivilianWord);
    if (isCorrect) {
      sfxVictory();
      setWinnerTeam("UNDERCOVER");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");

      const updatedList = speakingOrder.map(p => 
        p.id === eliminatedPlayer.id 
          ? { ...p, isEliminated: true, scorePoints: p.scorePoints + 300 } 
          : p
      );
      setSpeakingOrder(updatedList);
      setPhase("END_GAME");
    } else {
      sfxError();
      continueAfterElimination(eliminatedPlayer);
    }
  };

  const continueAfterElimination = (eliminated: UndercoverPlayer) => {
    const updatedList = speakingOrder.map(p => 
      p.id === eliminated.id ? { ...p, isEliminated: true } : p
    );
    setSpeakingOrder(updatedList);
    setPlayerList(prev => prev.map(p => p.id === eliminated.id ? { ...p, isEliminated: true } : p));

    // Le Joker gagne UNIQUEMENT s'il se fait éliminer au TOUT PREMIER VOTE (Tour 1) !
    if (eliminated.gameRole === "Joker" && clueRoundNumber === 1) {
      sfxVictory();
      setWinnerTeam("JOKER");
      incrementStat("gamesPlayed");
      setPhase("END_GAME");
      return;
    }

    // Vérification de victoire
    const remainingAlive = updatedList.filter(p => !p.isEliminated);
    const undercoversLeft = remainingAlive.filter(p => p.gameRole === "Undercover" || p.gameRole === "MrWhite").length;
    const civiliansLeft = remainingAlive.filter(p => p.gameRole === "Civilian").length;

    if (undercoversLeft === 0) {
      awardPoints(updatedList, "CIVILIANS");
      sfxVictory();
      setWinnerTeam("CIVILIANS");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("civilianWins");
      setPhase("END_GAME");
    } else if (undercoversLeft >= civiliansLeft) {
      awardPoints(updatedList, "UNDERCOVER");
      sfxVictory();
      setWinnerTeam("UNDERCOVER");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");
      setPhase("END_GAME");
    } else {
      sfxError();
      setPhase("VOTE_SUMMARY");
    }
  };

  const awardPoints = (finalPlayers: UndercoverPlayer[], winner: "CIVILIANS" | "UNDERCOVER") => {
    finalPlayers.forEach(p => {
      if (winner === "CIVILIANS" && p.gameRole === "Civilian") {
        p.scorePoints += 100;
      } else if (winner === "UNDERCOVER" && (p.gameRole === "Undercover" || p.gameRole === "MrWhite")) {
        p.scorePoints += 200;
      }
    });
  };

  // ─────────────────────────────────────────────────────────
  // 🎨 SÉRIGRAPHIE DES ÉCRANS SELON LA PHASE
  // ─────────────────────────────────────────────────────────

  // --- ÉCRAN 1 : CONFIGURATION DU JEU ---
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto relative">
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
          <div className="flex-1 text-center font-black text-xl">Undercover Local</div>
          <div className="w-16" />
        </div>

        {/* Grille Responsive (1 colonne Mobile / 2 colonnes Desktop) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Colonne Gauche : Catégories & Nombre de Joueurs */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Choix de la Catégorie (Sélection multiple) */}
            <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50">
                  Catégories de mots
                </label>
                <span className="text-[10px] font-black uppercase bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                  {selectedCategories.includes("Toutes les catégories") 
                    ? "Toutes" 
                    : `${selectedCategories.length} sélectionnée(s)`}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 flex-wrap max-h-60 overflow-y-auto">
                {CATEGORIES.map(cat => {
                  const isAllSelected = selectedCategories.includes("Toutes les catégories");
                  const isThisSelected = selectedCategories.includes(cat);

                  return (
                    <button
                      key={cat}
                      onClick={() => handleToggleCategory(cat)}
                      className={`px-3.5 py-2 rounded-full text-xs font-black transition-all border ${
                        cat === "Toutes les catégories"
                          ? isAllSelected
                            ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow"
                            : "bg-surface border-white/5 text-foreground/40 hover:text-foreground/70"
                          : isThisSelected && !isAllSelected
                            ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow"
                            : isAllSelected
                              ? "bg-white/5 border-white/5 text-foreground/30 opacity-50 grayscale"
                              : "bg-surface border-white/5 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {cat} {isThisSelected && !isAllSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Nombre de Joueurs */}
            <Card className="w-full p-6 flex items-center justify-between bg-surface/90 border border-white/10 shadow-soft">
              <div>
                <span className="font-extrabold text-lg block">Participants</span>
                <span className="text-xs text-foreground/50 font-bold">Minimum 3 joueurs</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => { setPlayerCount(Math.max(3, playerCount - 1)); sfxTap(); }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:scale-90"
                >-</button>
                <span className="text-2xl font-black text-primary">{playerCount}</span>
                <button 
                  onClick={() => { setPlayerCount(Math.min(20, playerCount + 1)); sfxTap(); }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:scale-90"
                >+</button>
              </div>
            </Card>
          </div>

            {/* CARTE MODE DE VOTE (EXPRESS VS CIRCULANT) */}
            <Card className="w-full p-5 bg-surface/90 border border-white/10 shadow-soft">
              <div className="flex flex-col text-left space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Vote size={16} /> Mode de Vote
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setVotingMode("EXPRESS"); sfxTap(); }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      votingMode === "EXPRESS"
                        ? "bg-primary/20 border-primary text-white shadow-glow"
                        : "bg-surface/50 border-white/5 text-foreground/50 hover:text-white"
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1">
                      <Zap size={14} className="text-amber-400" /> Express (Table)
                    </span>
                    <span className="text-[10px] opacity-70 mt-1">Main levée à voix haute</span>
                  </button>

                  <button
                    onClick={() => { setVotingMode("CIRCULATE"); sfxTap(); }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      votingMode === "CIRCULATE"
                        ? "bg-primary/20 border-primary text-white shadow-glow"
                        : "bg-surface/50 border-white/5 text-foreground/50 hover:text-white"
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1">
                      <Lock size={14} className="text-blue-400" /> Circulant (Téléphone)
                    </span>
                    <span className="text-[10px] opacity-70 mt-1">Vote secret individuel</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* CARTE CHRONOMÈTRE DE PAROLE */}
            <Card className="w-full p-5 bg-surface/90 border border-white/10 shadow-soft">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
                    <Clock size={16} /> Chrono de parole
                  </span>
                  <span className="text-[11px] text-foreground/60 font-medium">Temps d'indice par joueur</span>
                </div>

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                  {[0, 15, 30, 45, 60].map(sec => (
                    <button
                      key={sec}
                      onClick={() => { setSpeakingTimerMax(sec); sfxTap(); }}
                      className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                        speakingTimerMax === sec
                          ? "bg-primary text-white shadow-sm"
                          : "text-foreground/50 hover:text-white"
                      }`}
                    >
                      {sec === 0 ? "Off" : `${sec}s`}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* CARTE MODE MYSTÈRE ALÉATOIRE */}
            <Card className="w-full p-5 bg-gradient-to-r from-amber-950/80 via-surface to-purple-950/80 border-2 border-amber-500/40 shadow-glow">
              <div className="flex items-center justify-between">
                <div className="flex flex-col text-left pr-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5 mb-1">
                    🎲 Mode Mystère (Aléatoire)
                  </span>
                  <p className="text-[11px] font-extrabold text-foreground/70 leading-snug">
                    Personne ne saura combien il y a d'Undercovers, de Mr. White ou de Jokers !
                  </p>
                </div>

                <button
                  onClick={() => { setIsMysteryMode(!isMysteryMode); sfxTap(); }}
                  className={`h-11 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border shrink-0 ${
                    isMysteryMode
                      ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow"
                      : "bg-surface/80 border-white/10 text-foreground/50 hover:text-white"
                  }`}
                >
                  {isMysteryMode ? "ACTIF 🎲" : "Désactivé"}
                </button>
              </div>
            </Card>

            {/* Répartition des Rôles */}
            <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-soft">
              <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-4 block">
                {isMysteryMode ? "Mode Mystère Sélectionné" : `Répartition Manuelle (${playerCount} Joueurs)`}
              </span>

              {isMysteryMode ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold space-y-2 text-left">
                  <span className="block font-black uppercase tracking-wider text-amber-400">🎲 Répartition 100% Secrète</span>
                  <p className="text-[11px] leading-relaxed text-foreground/80">
                    VYLO va distribuer aléatoirement les rôles (Civils, Undercovers, Mr. White, Jokers, Caméléons) en gardant une majorité de Civils. Le nombre exact d'imposteurs reste inconnu de tous !
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Civils (Calculé automatiquement) */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-blue-400"></span> Civils
                    </span>
                    <span className="font-extrabold text-blue-400 text-base">
                      {Math.max(1, playerCount - undercoverCount - mrWhiteCount - jokerCount - cameleonCount - doubleAgentCount)}
                    </span>
                  </div>

                  {/* Undercover */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span> Undercover
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => { setUndercoverCount(Math.max(0, undercoverCount - 1)); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >-</button>
                      <span className="font-extrabold text-red-500 text-sm">{undercoverCount}</span>
                      <button 
                        onClick={() => { setUndercoverCount(undercoverCount + 1); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >+</button>
                    </div>
                  </div>

                  {/* Mr. White */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-purple-400"></span> Mr. White
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => { setMrWhiteCount(Math.max(0, mrWhiteCount - 1)); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >-</button>
                      <span className="font-extrabold text-purple-400 text-sm">{mrWhiteCount}</span>
                      <button 
                        onClick={() => { setMrWhiteCount(mrWhiteCount + 1); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >+</button>
                    </div>
                  </div>

                  {/* Le Joker */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span> 🃏 Le Joker
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => { setJokerCount(Math.max(0, jokerCount - 1)); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >-</button>
                      <span className="font-extrabold text-amber-400 text-sm">{jokerCount}</span>
                      <button 
                        onClick={() => { setJokerCount(jokerCount + 1); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >+</button>
                    </div>
                  </div>

                  {/* Le Caméléon */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-cyan-400"></span> 🪞 Caméléon
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => { setCameleonCount(Math.max(0, cameleonCount - 1)); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >-</button>
                      <span className="font-extrabold text-cyan-400 text-sm">{cameleonCount}</span>
                      <button 
                        onClick={() => { setCameleonCount(cameleonCount + 1); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >+</button>
                    </div>
                  </div>

                  {/* Double Agent */}
                  <div className="flex justify-between items-center bg-white/5 p-3.5 rounded-2xl border border-white/5">
                    <span className="font-bold flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-pink-400"></span> 💣 Double-Agent
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => { setDoubleAgentCount(Math.max(0, doubleAgentCount - 1)); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >-</button>
                      <span className="font-extrabold text-pink-400 text-sm">{doubleAgentCount}</span>
                      <button 
                        onClick={() => { setDoubleAgentCount(doubleAgentCount + 1); sfxTap(); }}
                        className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs active:scale-90"
                      >+</button>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Indicateur d'erreur de config */}
            {!configValidation.isValid && (
              <div className="w-full bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2">
                <ShieldAlert size={18} /> {configValidation.error}
              </div>
            )}
          </div>

        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md md:max-w-lg mx-auto">
            <Button 
              variant="primary" 
              className="w-full h-16 text-lg shadow-summer-glow"
              disabled={!configValidation.isValid}
              onClick={handleStartDistribution}
            >
              Distribuer les mots secret ({playerCount} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 2 : INTERSTITIEL SECURISE ("PASSEZ LE TÉLÉPHONE") ---
  if (phase === "PASS_TO_PLAYER") {
    const currentPlayerHasName = playerList[currentDistIndex]?.name?.trim().length > 0;
    const displayName = currentPlayerHasName ? playerList[currentDistIndex].name : `Joueur n°${currentDistIndex + 1}`;

    const handlePassReady = () => {
      if (currentPlayerHasName) {
        // Le nom est déjà connu (replay ou lobby) → direct au mot secret
        setPhase("SHOW_WORD");
      } else {
        // Nouveau joueur → demander le prénom
        setPhase("ENTER_NAME");
      }
    };

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto relative">
        <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 animate-pulse">
          <Smartphone size={48} />
        </div>
        <h2 className="text-3xl font-black mb-3">Passez le téléphone</h2>
        <p className="text-foreground/50 text-base mb-12">
          Donnez le smartphone à <span className="font-extrabold text-primary">{displayName}</span>.
        </p>

        <Button 
          variant="primary" 
          className="w-full py-5 text-lg"
          onClick={handlePassReady}
        >
          {currentPlayerHasName ? `C'est moi, ${playerList[currentDistIndex].name} ! 👋` : "C'est moi ! 👋"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 3 : CARTE FERMÉE & SAISIE DU PRÉNOM ---
  if (phase === "ENTER_NAME") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-black mb-2 text-center">Identification</h2>
        <p className="text-foreground/50 text-sm mb-8 text-center">Inscris ton prénom pour recevoir ton mot.</p>

        <Card className="w-full p-8 flex flex-col items-center mb-8 border border-white/10 shadow-glow">
          <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-3xl font-black mb-6">
            {tempName.trim() ? tempName.trim().charAt(0).toUpperCase() : "?"}
          </div>
          
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Quel est ton prénom ?"
            className="w-full bg-surface border-2 border-white/5 rounded-2xl px-5 py-4 text-center font-bold text-lg focus:border-primary outline-none transition-colors"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter" && tempName.trim()) handleConfirmName(); }}
          />
        </Card>

        <Button 
          variant="primary" 
          className="w-full py-5 text-lg"
          disabled={!tempName.trim()}
          onClick={handleConfirmName}
        >
          Valider mon prénom
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 4 : DÉCOUVERTE DU MOT SECRET ---
  if (phase === "SHOW_WORD") {
    const currentPlayer = playerList[currentDistIndex];

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-foreground/50 mb-1">Mot secret de</h2>
        <h1 className="text-4xl font-black text-primary mb-8">{currentPlayer?.name}</h1>

        <Card className="w-full aspect-square flex flex-col items-center justify-center p-8 mb-8 border border-white/10 relative overflow-hidden shadow-glow">
          {isWordRevealed ? (
            <div className="animate-in fade-in zoom-in duration-300">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-4 block">Ton mot secret</span>
              <h2 className="text-4xl font-black mb-6">{currentPlayer?.word}</h2>
              <p className="text-xs text-foreground/40 font-medium">Ne le répète à personne !</p>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer" onClick={handleRevealWord}>
              <EyeOff size={56} className="text-white/20 mb-4 animate-pulse" />
              <p className="text-lg font-bold">Appuie pour voir ton mot</p>
            </div>
          )}
        </Card>

        <Button 
          variant={isWordRevealed ? "primary" : "surface"} 
          className="w-full py-5 text-lg"
          onClick={() => {
            if (!isWordRevealed) handleRevealWord();
            else handleMemorized();
          }}
        >
          {isWordRevealed ? "J'ai mémorisé mon mot ✓" : "Voir mon mot secret"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 5 : TOUR DE PAROLE MÉLANGÉ ---
  if (phase === "SPEAKING_TURNS") {
    const aliveSpeakers = speakingOrder.filter(p => !p.isEliminated);
    const speaker = aliveSpeakers[currentSpeakerIdx];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-8 px-6 max-w-md mx-auto relative">
        {/* Header avec Journal d'Indices & Numéro de tour */}
        <div className="w-full flex justify-between items-center">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block">Tour d'indices n°{clueRoundNumber}</span>
            <h1 className="text-xl font-black">Joueur {currentSpeakerIdx + 1} / {aliveSpeakers.length}</h1>
          </div>

          <button
            onClick={() => { setShowJournalModal(true); sfxTap(); }}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-all flex items-center gap-1.5 font-extrabold text-xs"
          >
            <BookOpen size={16} /> Journal
          </button>
        </div>

        {/* Chronomètre dynamique si configuré */}
        {speakingTimerMax > 0 && timerSeconds !== null && (
          <div className="w-full my-2 bg-surface/80 p-3 rounded-2xl border border-white/10 flex items-center justify-between shadow-soft">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400">
              <Clock size={16} className="animate-pulse" /> Temps d'indice
            </div>
            <div className="text-lg font-black text-white">
              {timerSeconds}s
            </div>
          </div>
        )}

        <Card className="w-full p-8 flex flex-col items-center text-center border border-white/10 shadow-glow my-auto relative">
          <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-black mb-4">
            {speaker?.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm font-bold text-foreground/50 mb-1">C'est au tour de</p>
          <h2 className="text-3xl font-black text-primary mb-4">{speaker?.name}</h2>
          <p className="text-xs text-foreground/50 max-w-xs mb-6">
            Donne <span className="font-bold text-foreground">un nouveau mot indice</span> sur ton mot secret à voix haute.
          </p>

          {/* Bouton pour revoir son mot en cas d'oubli */}
          <button
            onMouseDown={() => setIsWordRevealed(true)}
            onMouseUp={() => setIsWordRevealed(false)}
            onTouchStart={() => setIsWordRevealed(true)}
            onTouchEnd={() => setIsWordRevealed(false)}
            className="w-full py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-primary hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <Eye size={16} /> {isWordRevealed ? `Mot : ${speaker?.word}` : "Maintenir pour revoir ton mot 👁️"}
          </button>
        </Card>

        <Button variant="primary" className="w-full py-5 text-lg" onClick={() => { setIsWordRevealed(false); handleNextSpeaker(); }}>
          {currentSpeakerIdx < aliveSpeakers.length - 1 ? "Joueur suivant →" : "Terminer le tour d'indices ✓"}
        </Button>

        {/* MODALE JOURNAL D'INDICES & COMPOSITION DE L'ÉQUIPE */}
        {showJournalModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <Card className="w-full max-w-sm p-6 border border-white/15 bg-surface/95 shadow-glow flex flex-col max-h-[80vh]">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                <h3 className="font-black text-lg flex items-center gap-2 text-primary">
                  <BookOpen size={20} /> Journal de Partie
                </h3>
                <button 
                  onClick={() => setShowJournalModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm"
                >✕</button>
              </div>

              <div className="overflow-y-auto space-y-3 pr-1 text-left flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-foreground/50">Joueurs vivants ({speakingOrder.filter(p => !p.isEliminated).length})</span>
                <div className="space-y-1.5">
                  {speakingOrder.filter(p => !p.isEliminated).map(p => (
                    <div key={p.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-bold">
                      <span>{p.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold">VIVANT</span>
                    </div>
                  ))}
                </div>

                {speakingOrder.some(p => p.isEliminated) && (
                  <>
                    <span className="text-[11px] font-black uppercase tracking-wider text-red-400 block pt-2">Joueurs éliminés</span>
                    <div className="space-y-1.5">
                      {speakingOrder.filter(p => p.isEliminated).map(p => (
                        <div key={p.id} className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-xs font-bold">
                          <span>{p.name}</span>
                          <span className="text-[10px] font-extrabold text-red-400">{p.gameRole}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Button variant="surface" className="w-full mt-4 py-3 text-sm" onClick={() => setShowJournalModal(false)}>
                Fermer le journal
              </Button>
            </Card>
          </div>
        )}
      </main>
    );
  }

  // --- ÉCRAN : DÉCISION ENTRE VOTER ET REFAIRE UN TOUR D'INDICES ---
  if (phase === "TURN_DECISION") {
    const alivePlayers = speakingOrder.filter(p => !p.isEliminated);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-8 px-6 max-w-md mx-auto text-center">
        <div className="w-full text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Fin du tour d'indices n°{clueRoundNumber}</span>
          <h1 className="text-3xl font-black mt-1">Que voulez-vous faire ?</h1>
        </div>

        {votingMode === "EXPRESS" ? (
          <div className="w-full my-auto space-y-4">
            <Card className="w-full p-5 text-left bg-primary/10 border border-primary/30">
              <h3 className="font-extrabold text-sm text-primary flex items-center gap-1.5 mb-1">
                <Zap size={16} /> Vote Express à Main Levée
              </h3>
              <p className="text-xs text-foreground/70">
                Débattez ensemble à la table, puis touchez le nom du joueur désigné par la majorité pour l'éliminer :
              </p>
            </Card>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {alivePlayers.map(player => (
                <Card
                  key={player.id}
                  className="p-4 flex justify-between items-center cursor-pointer hover:border-red-500/50 bg-surface/80 active:scale-[0.98] transition-all"
                  onClick={() => { sfxTap(); handleEliminatePlayer(player); }}
                >
                  <span className="font-bold text-base">{player.name}</span>
                  <span className="text-xs font-extrabold text-red-400 flex items-center gap-1">
                    Éliminer <Skull size={16} />
                  </span>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="w-full p-8 flex flex-col items-center border border-white/10 shadow-glow my-auto">
            <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
              <HelpCircle size={40} />
            </div>
            <h2 className="text-xl font-extrabold mb-2">Tous les joueurs ont donné leur indice.</h2>
            <p className="text-foreground/60 text-xs leading-relaxed max-w-xs">
              Vous pouvez passer au vote secret sur téléphone ou faire un nouveau tour d'indices.
            </p>
          </Card>
        )}

        <div className="w-full flex flex-col gap-3">
          {votingMode === "CIRCULATE" && (
            <Button variant="primary" className="w-full py-5 text-lg gap-2" onClick={startVotingPhase}>
              <Vote size={20} /> Lancer le vote secret au téléphone
            </Button>
          )}
          <Button variant="surface" className="w-full py-4 text-md gap-2" onClick={startAnotherClueRound}>
            <RefreshCw size={18} /> Faire le tour n°{clueRoundNumber + 1} d'indices
          </Button>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 6 : VOTE INDIVIDUEL ET DISCRET (MODE CIRCULANT) ---
  if (phase === "VOTING_CIRCULATE") {
    const activeVoters = speakingOrder.filter(p => !p.isEliminated);
    const currentVoter = activeVoters[voterIndex];

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-foreground/50 mb-1">Vote secret ({voterIndex + 1}/{activeVoters.length})</h2>
        <h1 className="text-3xl font-black text-red-500 mb-8">{currentVoter?.name}, qui éliminer ?</h1>

        <div className="w-full space-y-3 mb-8">
          {activeVoters.map(target => {
            if (target.id === currentVoter?.id) return null; // Impossible de voter pour soi-même
            return (
              <Card
                key={target.id}
                className="p-5 flex justify-between items-center cursor-pointer hover:border-red-500/50 transition-all active:scale-[0.98]"
                onClick={() => handleCastVote(currentVoter.id, target.id)}
              >
                <span className="font-bold text-lg">{target.name}</span>
                <Skull className="text-white/20" size={20} />
              </Card>
            );
          })}
        </div>
      </main>
    );
  }

  // --- ÉCRAN 7 : ULTIME CHANCE DE MR. WHITE (DEVINETTE DU MOT) ---
  if (phase === "MR_WHITE_GUESS" && eliminatedPlayer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 animate-pulse">
          <ShieldAlert size={48} />
        </div>
        <h1 className="text-3xl font-black mb-2 text-purple-400">{eliminatedPlayer.name} était Mr. White !</h1>
        <p className="text-foreground/70 text-sm mb-8 leading-relaxed">
          Mr. White a été démasqué ! Mais il peut encore <span className="font-extrabold text-white">voler la victoire</span> s'il arrive à deviner le mot secret des Civils !
        </p>

        <Card className="w-full p-6 flex flex-col items-center mb-6 border border-purple-500/30 shadow-glow">
          <label className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3 block">
            Quelle est la devinette de Mr. White ?
          </label>
          <input
            type="text"
            value={mrWhiteGuess}
            onChange={(e) => setMrWhiteGuess(e.target.value)}
            placeholder="Tapez le mot des Civils..."
            className="w-full bg-surface border-2 border-purple-500/20 rounded-2xl px-5 py-4 text-center font-black text-xl focus:border-purple-400 outline-none transition-colors mb-2"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter" && mrWhiteGuess.trim()) handleMrWhiteGuessSubmit(); }}
          />
        </Card>

        <Button
          variant="primary"
          className="w-full py-5 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-glow"
          disabled={!mrWhiteGuess.trim()}
          onClick={handleMrWhiteGuessSubmit}
        >
          Valider la devinette ✨
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 8 : RÉSULTATS DU VOTE (SI LA PARTIE CONTINUE) ---
  if (phase === "VOTE_SUMMARY" && eliminatedPlayer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <Skull size={64} className="text-red-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-black mb-2">{eliminatedPlayer.name} est éliminé !</h1>
        <p className="text-foreground/50 text-base mb-8">
          Rôle révélé : <span className="font-bold text-red-400">{eliminatedPlayer.gameRole}</span> ({eliminatedPlayer.word})
        </p>

        <Button variant="primary" className="w-full py-5 text-lg gap-2" onClick={() => startSpeakingPhase(speakingOrder)}>
          <RefreshCw size={20} /> Repartir pour un tour d'indices
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 8 : FIN DE PARTIE & RÉSULTATS DE SCORE ---
  if (phase === "END_GAME") {
    const isCivilianWin = winnerTeam === "CIVILIANS";

    const handleShare = async () => {
      const shareData = {
        title: "Soirée VYLO — Undercover Local",
        text: `Partie géniale d'Undercover ! Les ${isCivilianWin ? "Civils" : "Imposteurs"} ont gagné. rejoins-nous sur vylo.app`,
        url: "https://vylo.app"
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch {}
      }
    };

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <h1 className="text-3xl font-black mb-8">Résultats de la partie</h1>

        <Card className="w-full flex flex-col items-center p-8 mb-8 relative shadow-glow overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-2 ${isCivilianWin ? 'bg-blue-400' : 'bg-red-500'}`}></div>
          <Trophy size={48} className={isCivilianWin ? "text-blue-400 mb-4" : "text-red-400 mb-4"} />
          <h2 className="text-2xl font-black mb-2 text-center">
            Victoire des {isCivilianWin ? "Civils" : "Imposteurs"} !
          </h2>

          <div className="w-full space-y-3 mt-6">
            {speakingOrder.map(p => (
              <div key={p.id} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  {p.isEliminated && <Skull size={14} className="text-red-500" />}
                  <span className="font-bold">{p.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-extrabold ${p.gameRole === "Civilian" ? "text-blue-400" : "text-red-400"}`}>
                    {p.gameRole} ({p.word})
                  </span>
                  <span className="text-xs font-black bg-white/5 px-2 py-1 rounded-full text-yellow-400">
                    +{p.scorePoints} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <EndGameActionsCard
          onReplaySameTeam={handleReplaySameTeam}
          onEditTeam={() => setPhase("CONFIG")}
          onChangeTeam={() => setPhase("CONFIG")}
        />
      </main>
    );
  }

  return null;
}
