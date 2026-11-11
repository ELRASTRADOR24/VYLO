"use client";

import { use, useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";
import {
  UndercoverPlayer,
  CATEGORIES,
  CategoryName,
  validateRoleConfigExtended,
  getRandomWordPair,
  generateMysteryRoles,
  generateRolesFromConfigExtended,
  shuffleSpeakingOrder,
  assignRolesFairly,
  shuffleArray,
  checkMrWhiteGuess,
  getRandomConstraint,
  generateDetectiveClue,
  UNDERCOVER_ROLE_META,
  isInfiltratorRole,
  isCivilianTeamRole,
} from "@/games/undercover/logic";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Skull,
  Trophy,
  Smartphone,
  Clock,
  ShieldAlert,
  HelpCircle,
  Vote,
  RefreshCw,
  BookOpen,
  Zap,
  Lock,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  HeartHandshake,
  Search,
  ShieldCheck,
  Volume2,
  Scale,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  sfxTap,
  sfxSuccess,
  sfxError,
  sfxSuspense,
  sfxVictory,
  sfxReveal,
} from "@/lib/audio";
import { voiceEngine } from "@/lib/voiceEngine";

type PassPhase =
  | "CONFIG"
  | "PASS_TO_PLAYER"
  | "ENTER_NAME"
  | "SHOW_WORD"
  | "SPEAKING_TURNS"
  | "TURN_DECISION"
  | "VOTING_CIRCULATE"
  | "MR_WHITE_GUESS"
  | "VOTE_SUMMARY"
  | "VOTE_TIE"
  | "DOUBLE_AGENT_REVENGE"
  | "END_GAME";

type WinnerTeam = "CIVILIANS" | "UNDERCOVER" | "MR_WHITE" | "JOKER" | null;

function LocalModalDialog({
  open,
  onClose,
  ariaLabel,
  maxWidthClass = "max-w-md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={`vylo-modal ${maxWidthClass}`}
    >
      {open ? children : null}
    </dialog>
  );
}

function getUniqueLocalName(requested: string, takenLower: Set<string>): string {
  const clean = requested.trim();
  if (!takenLower.has(clean.toLowerCase())) {
    takenLower.add(clean.toLowerCase());
    return clean;
  }
  let suffix = 2;
  while (takenLower.has(`${clean} (${suffix})`.toLowerCase())) {
    suffix += 1;
  }
  const unique = `${clean} (${suffix})`;
  takenLower.add(unique.toLowerCase());
  return unique;
}

export default function UndercoverLocalGame({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  use(params);
  const router = useRouter();
  const {
    incrementStat,
    savedGroup,
    setSavedGroup,
    customWordPairs,
    addCustomWordPair,
    removeCustomWordPair,
  } = useAppStore();

  // --- Configuration State ---
  const [phase, setPhase] = useState<PassPhase>("CONFIG");
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>([
    "Toutes les catégories",
  ]);
  const [playerCount, setPlayerCount] = useState<number>(() =>
    savedGroup.length >= 3 ? Math.min(20, savedGroup.length) : 4
  );
  const [playerNames, setPlayerNames] = useState<string[]>(() => {
    const initialCount = savedGroup.length >= 3 ? Math.min(20, savedGroup.length) : 4;
    return Array.from({ length: initialCount }, (_, i) => savedGroup[i]?.name || "");
  });
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhiteCount, setMrWhiteCount] = useState(0);
  const [jokerCount, setJokerCount] = useState(0);
  const [cameleonCount, setCameleonCount] = useState(0);
  const [doubleAgentCount, setDoubleAgentCount] = useState(0);
  const [detectiveCount, setDetectiveCount] = useState(0);
  const [guardianAngelCount, setGuardianAngelCount] = useState(0);
  const [guardianProtectedId, setGuardianProtectedId] = useState<string | null>(null);
  const [savedByGuardianPlayer, setSavedByGuardianPlayer] =
    useState<UndercoverPlayer | null>(null);
  const [isMysteryMode, setIsMysteryMode] = useState(false);
  const [votingMode, setVotingMode] = useState<"EXPRESS" | "CIRCULATE">("CIRCULATE");
  const [speakingTimerMax, setSpeakingTimerMax] = useState<number>(30);
  const [minRoundsBeforeVote, setMinRoundsBeforeVote] = useState<number>(1);
  const [enableConstraintsMode, setEnableConstraintsMode] = useState(false);
  const [currentConstraint, setCurrentConstraint] = useState<string>("");
  const [enableUndercoverAlliance, setEnableUndercoverAlliance] = useState(false);
  const [enableVoiceNarrator, setEnableVoiceNarrator] = useState(false);
  const [revealRoleOnElimination, setRevealRoleOnElimination] = useState(true);
  const [showCustomWordsModal, setShowCustomWordsModal] = useState(false);
  const [newCivilianWord, setNewCivilianWord] = useState("");
  const [newUndercoverWord, setNewUndercoverWord] = useState("");

  // --- Game Session State ---
  const [playerList, setPlayerList] = useState<UndercoverPlayer[]>([]);
  const [currentDistIndex, setCurrentDistIndex] = useState(0);
  const [tempName, setTempName] = useState("");
  const [isWordRevealed, setIsWordRevealed] = useState(false);
  const [currentCivilianWord, setCurrentCivilianWord] = useState("");
  const [currentUndercoverWord, setCurrentUndercoverWord] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [detectiveCluesMap, setDetectiveCluesMap] = useState<Record<string, string>>({});

  // --- Gameplay State ---
  const [speakingOrder, setSpeakingOrder] = useState<UndercoverPlayer[]>([]);
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [clueRoundNumber, setClueRoundNumber] = useState(1);
  const [clueSubRound, setClueSubRound] = useState(1);
  const [eliminationRound, setEliminationRound] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // --- Voting & Special Phase State ---
  const [voterIndex, setVoterIndex] = useState(0);
  const [isVoterReady, setIsVoterReady] = useState(false);
  const [votesMap, setVotesMap] = useState<Record<string, string>>({});
  const [eliminatedPlayer, setEliminatedPlayer] = useState<UndercoverPlayer | null>(null);
  const [isRoleRevealedOnElimination, setIsRoleRevealedOnElimination] = useState(false);
  const [noEliminationReason, setNoEliminationReason] = useState<"TIE" | "ABSTAIN" | null>(null);
  const [winnerTeam, setWinnerTeam] = useState<WinnerTeam>(null);
  const [mrWhiteGuess, setMrWhiteGuess] = useState("");
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [tiedPlayers, setTiedPlayers] = useState<UndercoverPlayer[]>([]);
  const [expressConfirmTarget, setExpressConfirmTarget] =
    useState<UndercoverPlayer | null>(null);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [cumulativeScores, setCumulativeScores] = useState<Record<string, number>>({});
  const handledActionRef = useRef<string>("");

  // Synchroniser le tableau de prénoms quand playerCount change (safe pour tap rapide)
  const adjustPlayerCount = (delta: number) => {
    setPlayerCount((prev) => Math.max(3, Math.min(20, prev + delta)));
    sfxTap();
  };

  useEffect(() => {
    setPlayerNames((prev) => {
      if (prev.length === playerCount) return prev;
      const next = [...prev];
      while (next.length < playerCount) {
        next.push(savedGroup[next.length]?.name || "");
      }
      return next.slice(0, playerCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount]);

  // Pré-remplissage tardif depuis savedGroup si le store hydrate après le 1er rendu
  useEffect(() => {
    if (savedGroup.length >= 3 && playerNames.every((n) => !n.trim())) {
      setPlayerCount(Math.min(20, savedGroup.length));
      setPlayerNames(
        Array.from(
          { length: Math.min(20, savedGroup.length) },
          (_, i) => savedGroup[i]?.name || ""
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedGroup.length]);

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

  // Validation stricte étendue à tous les rôles spéciaux
  const configValidation = isMysteryMode
    ? {
        isValid: playerCount >= 3,
        error:
          playerCount < 3 ? "Il faut au moins 3 joueurs pour lancer Undercover." : undefined,
      }
    : validateRoleConfigExtended(playerCount, {
        undercoverCount,
        mrWhiteCount,
        jokerCount,
        cameleonCount,
        doubleAgentCount,
        detectiveCount,
        guardianAngelCount,
      });

  // Chronomètre de parole avec alerte audio à 0s
  useEffect(() => {
    if (!timerActive || timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setTimerActive(false);
      sfxError();
      return;
    }
    const timeout = setTimeout(() => {
      setTimerSeconds((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timerActive, timerSeconds]);

  // Vibration haptique lors du passage du téléphone
  useEffect(() => {
    if (
      (phase === "PASS_TO_PLAYER" ||
        ((phase === "VOTING_CIRCULATE" || phase === "VOTE_TIE") && !isVoterReady)) &&
      typeof navigator !== "undefined" &&
      navigator.vibrate
    ) {
      try {
        navigator.vibrate(150);
      } catch {}
    }
  }, [phase, currentDistIndex, voterIndex, isVoterReady]);

  // ─────────────────────────────────────────────────────────
  // UTILITAIRE DE CRÉATION D'UNE MANCHE
  // ─────────────────────────────────────────────────────────
  const initRoundWithNames = (rawNames: string[]) => {
    handledActionRef.current = "";
    const wordPair = getRandomWordPair(selectedCategories, customWordPairs);
    setCurrentCivilianWord(wordPair.civilian);
    setCurrentUndercoverWord(wordPair.undercover);
    setCurrentCategory(wordPair.category);
    setCurrentConstraint(enableConstraintsMode ? getRandomConstraint() : "");
    setGuardianProtectedId(null);
    setSavedByGuardianPlayer(null);
    setNoEliminationReason(null);
    setEliminatedPlayer(null);
    setTiedPlayers([]);
    setVotesMap({});
    setExpressConfirmTarget(null);
    setMrWhiteGuess("");
    setShowJournalModal(false);
    setWinnerTeam(null);
    setEliminationRound(1);
    setClueRoundNumber(1);
    setClueSubRound(1);

    const count = rawNames.length;
    const roles = isMysteryMode
      ? generateMysteryRoles(count)
      : generateRolesFromConfigExtended(
          count,
          undercoverCount,
          mrWhiteCount,
          jokerCount,
          cameleonCount,
          doubleAgentCount,
          detectiveCount,
          guardianAngelCount
        );

    const taken = new Set<string>();
    const resolvedNames = rawNames.map((n) =>
      n.trim().length > 0 ? getUniqueLocalName(n, taken) : ""
    );

    // Identifiants uniques pour assignRolesFairly (même si des noms sont encore vides)
    const fairKeys = resolvedNames.map((n, i) => n || `slot_${i + 1}`);
    const assignedRoles = assignRolesFairly(fairKeys, roles);

    const now = Date.now();
    const initialPlayers: UndercoverPlayer[] = fairKeys.map((fairKey, i) => {
      const role = assignedRoles[fairKey] || roles[i] || "Civilian";
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

      return {
        id: `player_${i}_${now}`,
        name: resolvedNames[i] || "",
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

    const shuffledPlayers = shuffleArray(initialPlayers);

    // Pré-calculer une seule fois les indices d'Enquêteur (stables)
    const cluesMap: Record<string, string> = {};
    shuffledPlayers.forEach((p) => {
      if (p.gameRole === "Detective") {
        cluesMap[p.id] = generateDetectiveClue(wordPair.undercover, shuffledPlayers);
      }
    });
    setDetectiveCluesMap(cluesMap);

    // Sauvegarder si tous les noms sont remplis
    if (resolvedNames.every((n) => n.length > 0)) {
      setSavedGroup(resolvedNames.map((name) => ({ name })));
    }

    setPlayerList(shuffledPlayers);
    setCurrentDistIndex(0);
    setTempName(shuffledPlayers[0]?.name || "");
    setIsWordRevealed(false);
    sfxSuspense();
    if (enableVoiceNarrator) {
      voiceEngine.speak(
        "Distribution des mots secrets ! Passez le smartphone au premier joueur.",
        { tone: "ANNOUNCEMENT" }
      );
    }
    setPhase("PASS_TO_PLAYER");
  };

  // Rejouer avec la même équipe
  const handleReplaySameTeam = () => {
    const existingNames = playerList.map((p) => p.name.trim()).filter((n) => n.length > 0);
    const names =
      existingNames.length >= 3
        ? existingNames
        : Array.from({ length: playerCount }, (_, i) => playerNames[i] || `Joueur ${i + 1}`);
    initRoundWithNames(names);
  };

  // 1. Lancement depuis CONFIG
  const handleStartDistribution = () => {
    if (!configValidation.isValid) return;
    initRoundWithNames(playerNames);
  };

  // 2. Validation d'un prénom (lorsqu'un joueur n'avait pas encore de nom)
  const handleConfirmName = () => {
    if (phase !== "ENTER_NAME" || !tempName.trim()) return;
    const actionKey = `NAME-${currentDistIndex}-${playerList[currentDistIndex]?.id || ""}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();

    const taken = new Set(
      playerList
        .filter((_, idx) => idx !== currentDistIndex)
        .map((p) => p.name.trim().toLowerCase())
        .filter(Boolean)
    );
    const uniqueName = getUniqueLocalName(tempName, taken);

    setPlayerList((prev) => {
      const copy = [...prev];
      copy[currentDistIndex] = { ...copy[currentDistIndex], name: uniqueName };
      const allNamed = copy.every((p) => p.name.trim().length > 0);
      if (allNamed) {
        setSavedGroup(copy.map((p) => ({ name: p.name })));
      }
      return copy;
    });

    setIsWordRevealed(false);
    setPhase("SHOW_WORD");
  };

  const handleRevealWord = () => {
    sfxReveal();
    setIsWordRevealed(true);
  };

  const handleMemorized = () => {
    if (phase !== "SHOW_WORD" || !isWordRevealed) return;
    const actionKey = `MEM-${currentDistIndex}-${playerList[currentDistIndex]?.id || ""}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();
    setIsWordRevealed(false);

    if (currentDistIndex < playerList.length - 1) {
      const nextIdx = currentDistIndex + 1;
      setCurrentDistIndex(nextIdx);
      setTempName(playerList[nextIdx]?.name || "");
      setPhase("PASS_TO_PLAYER");
    } else {
      startSpeakingPhase(playerList, { isNewEliminationTurn: false });
    }
  };

  // 3. Début de phase de parole
  const startSpeakingPhase = (
    players: UndercoverPlayer[],
    options: { isNewEliminationTurn?: boolean } = {}
  ) => {
    const alivePlayers = players.filter((p) => !p.isEliminated);
    const order = shuffleSpeakingOrder(alivePlayers);
    setSpeakingOrder(order);
    setCurrentSpeakerIdx(0);
    setIsWordRevealed(false);

    let nextClueNum = clueRoundNumber;
    if (options.isNewEliminationTurn) {
      setEliminationRound((prev) => prev + 1);
      setClueRoundNumber((prev) => prev + 1);
      setClueSubRound(1);
      nextClueNum = clueRoundNumber + 1;
      if (enableConstraintsMode) {
        setCurrentConstraint(getRandomConstraint());
      }
    }

    if (speakingTimerMax > 0) {
      setTimerSeconds(speakingTimerMax);
      setTimerActive(true);
    } else {
      setTimerSeconds(null);
      setTimerActive(false);
    }

    sfxSuccess();
    setPhase("SPEAKING_TURNS");
    if (enableVoiceNarrator && order[0]) {
      voiceEngine.speak(
        `Tour d'indices numéro ${nextClueNum}. C'est au tour de ${order[0].name} !`,
        { tone: "ANNOUNCEMENT" }
      );
    }
  };

  const handleNextSpeaker = () => {
    if (phase !== "SPEAKING_TURNS") return;
    const aliveSpeakers = speakingOrder.filter((p) => !p.isEliminated);
    const actionKey = `SPK-${clueRoundNumber}-${currentSpeakerIdx}-${aliveSpeakers[currentSpeakerIdx]?.id || ""}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();
    setIsWordRevealed(false);
    if (currentSpeakerIdx < aliveSpeakers.length - 1) {
      const nextIdx = currentSpeakerIdx + 1;
      setCurrentSpeakerIdx(nextIdx);
      if (speakingTimerMax > 0) {
        setTimerSeconds(speakingTimerMax);
        setTimerActive(true);
      }
      if (enableVoiceNarrator && aliveSpeakers[nextIdx]) {
        voiceEngine.speak(`C'est au tour de ${aliveSpeakers[nextIdx].name} !`, {
          tone: "ANNOUNCEMENT",
        });
      }
    } else {
      setTimerActive(false);
      setPhase("TURN_DECISION");
      if (enableVoiceNarrator) {
        voiceEngine.speak("Fin du tour d'indices ! Passez au vote ou refaites un tour.", {
          tone: "SUSPENSE",
        });
      }
    }
  };

  const startAnotherClueRound = () => {
    if (phase !== "TURN_DECISION" && phase !== "VOTE_SUMMARY") return;
    const actionKey = `NEXTROUND-${clueRoundNumber}-${eliminationRound}-${phase}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();
    setIsWordRevealed(false);
    const alivePlayers = playerList.filter((p) => !p.isEliminated);
    const newOrder = shuffleSpeakingOrder(alivePlayers);
    setSpeakingOrder(newOrder);
    const nextNum = clueRoundNumber + 1;
    setClueRoundNumber(nextNum);
    setClueSubRound((prev) => prev + 1);
    setCurrentSpeakerIdx(0);

    if (enableConstraintsMode) {
      setCurrentConstraint(getRandomConstraint());
    }

    if (speakingTimerMax > 0) {
      setTimerSeconds(speakingTimerMax);
      setTimerActive(true);
    }

    setPhase("SPEAKING_TURNS");
    if (enableVoiceNarrator && newOrder[0]) {
      voiceEngine.speak(
        `Tour d'indices numéro ${nextNum}. C'est au tour de ${newOrder[0].name} !`,
        { tone: "ANNOUNCEMENT" }
      );
    }
  };

  // 4. Phase de vote (Mode Circulant avec écran bouclier)
  const startVotingPhase = () => {
    if (phase !== "TURN_DECISION") return;
    setTimerActive(false);
    setVoterIndex(0);
    setIsVoterReady(false);
    setVotesMap({});
    setNoEliminationReason(null);
    sfxSuspense();
    setPhase("VOTING_CIRCULATE");
  };

  const handleCastVote = (voterId: string, targetId: string) => {
    if ((phase !== "VOTING_CIRCULATE" && phase !== "VOTE_TIE") || !isVoterReady || votesMap[voterId]) {
      return;
    }
    const actionKey = `VOTE-${eliminationRound}-${clueRoundNumber}-${phase}-${voterIndex}-${voterId}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();
    const updated = { ...votesMap, [voterId]: targetId };
    setVotesMap(updated);

    const activeVoters = speakingOrder.filter((p) => !p.isEliminated);
    if (voterIndex < activeVoters.length - 1) {
      setIsVoterReady(false);
      setVoterIndex(voterIndex + 1);
    } else {
      const realVotes: Record<string, string> = {};
      Object.entries(updated).forEach(([vid, tid]) => {
        if (tid !== "ABSTAIN") realVotes[vid] = tid;
      });
      if (Object.keys(realVotes).length === 0) {
        sfxError();
        setEliminatedPlayer(null);
        setSavedByGuardianPlayer(null);
        setNoEliminationReason("ABSTAIN");
        setPhase("VOTE_SUMMARY");
        return;
      }
      tallyVotes(realVotes);
    }
  };

  // 5. Dépouillement officiel (avec égalité à 2 tours -> aucune élimination)
  const tallyVotes = (finalVotes: Record<string, string>) => {
    const voteCounts: Record<string, number> = {};
    Object.values(finalVotes).forEach((targetId) => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });

    let maxVotes = 0;
    Object.values(voteCounts).forEach((count) => {
      if (count > maxVotes) maxVotes = count;
    });

    const tiedIds = Object.entries(voteCounts)
      .filter(([, count]) => count === maxVotes)
      .map(([id]) => id);
    const tied = speakingOrder.filter((p) => tiedIds.includes(p.id));

    if (tied.length > 1) {
      if (phase === "VOTE_TIE") {
        // 2ème égalité consécutive -> personne n'est éliminé
        sfxError();
        setEliminatedPlayer(null);
        setSavedByGuardianPlayer(null);
        setNoEliminationReason("TIE");
        setPhase("VOTE_SUMMARY");
      } else {
        setTiedPlayers(tied);
        setTimerActive(false);
        setVoterIndex(0);
        setIsVoterReady(false);
        setVotesMap({});
        sfxSuspense();
        setPhase("VOTE_TIE");
      }
    } else {
      const eliminated =
        speakingOrder.find((p) => p.id === tiedIds[0]) || speakingOrder[0];
      handleEliminatePlayer(eliminated);
    }
  };

  const awardPoints = (
    finalFullPlayers: UndercoverPlayer[],
    winner: "CIVILIANS" | "UNDERCOVER"
  ) => {
    const scoreUpdates: Record<string, number> = {};
    const updated = finalFullPlayers.map((p) => {
      let pts = 0;
      if (winner === "CIVILIANS" && isCivilianTeamRole(p.gameRole)) {
        pts = 100;
      } else if (winner === "UNDERCOVER" && isInfiltratorRole(p.gameRole)) {
        pts = 200;
      }
      if (pts > 0) {
        scoreUpdates[p.name] = (scoreUpdates[p.name] || 0) + pts;
        return { ...p, scorePoints: p.scorePoints + pts };
      }
      return p;
    });
    if (Object.keys(scoreUpdates).length > 0) {
      setCumulativeScores((prev) => {
        const next = { ...prev };
        Object.entries(scoreUpdates).forEach(([name, pts]) => {
          next[name] = (next[name] || 0) + pts;
        });
        return next;
      });
    }
    setPlayerList(updated);
    const updatedMap = new Map(updated.map((p) => [p.id, p]));
    setSpeakingOrder((prev) => prev.map((p) => updatedMap.get(p.id) || p));
  };

  const handleEliminatePlayer = (eliminated: UndercoverPlayer) => {
    // Bouclier de l'Ange Gardien uniquement au 1er vote (eliminationRound === 1)
    if (
      eliminationRound === 1 &&
      guardianProtectedId &&
      eliminated.id === guardianProtectedId
    ) {
      setGuardianProtectedId(null);
      setEliminatedPlayer(null);
      setNoEliminationReason(null);
      setSavedByGuardianPlayer(eliminated);
      sfxSuccess();
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          `Sauvetage miraculeux ! L'Ange Gardien a protégé ${eliminated.name} ! L'élimination est annulée !`,
          { tone: "VICTORY" }
        );
      }
      setPhase("VOTE_SUMMARY");
      return;
    }

    setSavedByGuardianPlayer(null);
    setNoEliminationReason(null);
    setEliminatedPlayer(eliminated);
    setIsRoleRevealedOnElimination(false);

    // Si Mr. White se fait éliminer au vote -> devinette
    if (eliminated.gameRole === "MrWhite") {
      setMrWhiteGuess("");
      sfxSuspense();
      setPhase("MR_WHITE_GUESS");
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          `${eliminated.name} est Mr. White ! Il tente sa chance pour deviner le mot !`,
          { tone: "SUSPENSE" }
        );
      }
      return;
    }

    // Double-Agent -> vengeance si au moins 2 survivants avant choix
    const aliveAfterAgent = playerList.filter(
      (p) => !p.isEliminated && p.id !== eliminated.id
    );
    if (eliminated.gameRole === "DoubleAgent" && aliveAfterAgent.length >= 2) {
      sfxSuspense();
      setPhase("DOUBLE_AGENT_REVENGE");
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          `${eliminated.name} était Double Agent ! Il choisit qui emporter avec lui !`,
          { tone: "DRAMA" }
        );
      }
      return;
    }

    continueAfterElimination(eliminated);
  };

  const evaluateWinAndAdvance = (
    updatedList: UndercoverPlayer[],
    announcementTargetName?: string
  ) => {
    const remainingAlive = updatedList.filter((p) => !p.isEliminated);
    const undercoverLeft = remainingAlive.filter((p) => p.gameRole === "Undercover").length;
    const infiltratorsLeft = remainingAlive.filter((p) =>
      isInfiltratorRole(p.gameRole)
    ).length;
    const civiliansLeft = remainingAlive.filter((p) =>
      isCivilianTeamRole(p.gameRole)
    ).length;

    if (infiltratorsLeft === 0) {
      awardPoints(updatedList, "CIVILIANS");
      sfxVictory();
      setWinnerTeam("CIVILIANS");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("civilianWins");
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          "Tous les imposteurs sont démasqués ! Victoire éclatante des Civils !",
          { tone: "VICTORY" }
        );
      }
      setPhase("END_GAME");
    } else if (infiltratorsLeft >= civiliansLeft) {
      awardPoints(updatedList, "UNDERCOVER");
      sfxVictory();
      setWinnerTeam(undercoverLeft > 0 ? "UNDERCOVER" : "MR_WHITE");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          "Les imposteurs sont majoritaires ! Victoire des Imposteurs !",
          { tone: "VICTORY" }
        );
      }
      setPhase("END_GAME");
    } else {
      sfxError();
      if (enableVoiceNarrator && announcementTargetName) {
        voiceEngine.speak(`Le groupe a voté contre ${announcementTargetName} !`, {
          tone: "DRAMA",
        });
      }
      setPhase("VOTE_SUMMARY");
    }
  };

  const handleDoubleAgentRevenge = (target: UndercoverPlayer) => {
    if (phase !== "DOUBLE_AGENT_REVENGE" || !eliminatedPlayer) return;
    const actionKey = `DA-${eliminatedPlayer.id}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    const eliminatedIds = new Set(
      [eliminatedPlayer?.id, target.id].filter((id): id is string => Boolean(id))
    );
    const updatedList = playerList.map((p) =>
      eliminatedIds.has(p.id) ? { ...p, isEliminated: true } : p
    );
    setPlayerList(updatedList);
    setSpeakingOrder((prev) =>
      prev.map((p) => (eliminatedIds.has(p.id) ? { ...p, isEliminated: true } : p))
    );
    setEliminatedPlayer(target);
    setIsRoleRevealedOnElimination(false);

    if (target.gameRole === "MrWhite") {
      setMrWhiteGuess("");
      sfxSuspense();
      setPhase("MR_WHITE_GUESS");
      return;
    }

    evaluateWinAndAdvance(updatedList, target.name);
  };

  const handleMrWhiteGuessSubmit = () => {
    if (phase !== "MR_WHITE_GUESS" || !mrWhiteGuess.trim() || !eliminatedPlayer) return;
    const actionKey = `MW-${eliminationRound}-${eliminatedPlayer.id}`;
    if (handledActionRef.current === actionKey) return;
    handledActionRef.current = actionKey;
    sfxTap();

    const isCorrect = checkMrWhiteGuess(mrWhiteGuess, currentCivilianWord);
    if (isCorrect) {
      sfxVictory();
      setWinnerTeam("MR_WHITE");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");

      const updatedList = playerList.map((p) =>
        p.id === eliminatedPlayer.id
          ? { ...p, isEliminated: true, scorePoints: p.scorePoints + 300 }
          : p
      );
      setPlayerList(updatedList);
      setSpeakingOrder((prev) =>
        prev.map((p) =>
          p.id === eliminatedPlayer.id
            ? { ...p, isEliminated: true, scorePoints: p.scorePoints + 300 }
            : p
        )
      );
      setCumulativeScores((prev) => ({
        ...prev,
        [eliminatedPlayer.name]: (prev[eliminatedPlayer.name] || 0) + 300,
      }));
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          "Incroyable ! Mr. White a deviné le mot secret et vole la victoire !",
          { tone: "VICTORY" }
        );
      }
      setPhase("END_GAME");
    } else {
      sfxError();
      continueAfterElimination(eliminatedPlayer);
    }
  };

  const continueAfterElimination = (eliminated: UndercoverPlayer) => {
    const updatedList = playerList.map((p) =>
      p.id === eliminated.id ? { ...p, isEliminated: true } : p
    );
    setPlayerList(updatedList);
    setSpeakingOrder((prev) =>
      prev.map((p) => (p.id === eliminated.id ? { ...p, isEliminated: true } : p))
    );
    setIsRoleRevealedOnElimination(false);

    // Le Joker gagne UNIQUEMENT s'il se fait éliminer lors de la TOUTE PREMIÈRE ÉLIMINATION (Tour 1)
    if (eliminated.gameRole === "Joker" && eliminationRound === 1) {
      sfxVictory();
      setWinnerTeam("JOKER");
      incrementStat("gamesPlayed");
      const scored = updatedList.map((p) =>
        p.id === eliminated.id ? { ...p, scorePoints: p.scorePoints + 300 } : p
      );
      setPlayerList(scored);
      setSpeakingOrder((prev) =>
        prev.map((p) =>
          p.id === eliminated.id
            ? { ...p, isEliminated: true, scorePoints: p.scorePoints + 300 }
            : p
        )
      );
      setCumulativeScores((prev) => ({
        ...prev,
        [eliminated.name]: (prev[eliminated.name] || 0) + 300,
      }));
      if (enableVoiceNarrator) {
        voiceEngine.speak(
          "Coup de génie ! Le Joker a été éliminé au premier tour et remporte la victoire en solitaire !",
          { tone: "VICTORY" }
        );
      }
      setPhase("END_GAME");
      return;
    }

    evaluateWinAndAdvance(updatedList, eliminated.name);
  };

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 1 : CONFIGURATION DU JEU
  // ─────────────────────────────────────────────────────────
  if (phase === "CONFIG") {
    const specialTotal =
      undercoverCount +
      mrWhiteCount +
      jokerCount +
      cameleonCount +
      doubleAgentCount +
      detectiveCount +
      guardianAngelCount;
    const pureCiviliansCount = playerCount - specialTotal;

    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto relative">
        <div className="w-full flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              sfxTap();
              router.push("/setup/undercover");
            }}
            className="h-10 px-4 bg-surface border border-border rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] active-press transition-all shadow-sm cursor-pointer z-50"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div className="flex-1 text-center font-display font-extrabold text-lg sm:text-xl text-foreground">
            Undercover Local
          </div>
          <div className="w-16" />
        </div>

        {/* Grille Responsive */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Colonne Gauche : Catégories & Joueurs */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Catégories */}
            <Card className="w-full p-6 bg-surface border border-border shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-muted">
                  Catégories de mots
                </label>
                <span className="text-[11px] font-bold bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {selectedCategories.includes("Toutes les catégories")
                    ? "Toutes"
                    : `${selectedCategories.length} sélectionnée(s)`}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 flex-wrap max-h-60 overflow-y-auto">
                {CATEGORIES.map((cat) => {
                  const isAllSelected = selectedCategories.includes("Toutes les catégories");
                  const isThisSelected = selectedCategories.includes(cat);

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
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

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted font-bold">
                  Mots personnalisés ({customWordPairs.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomWordsModal(true);
                    sfxTap();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FEEBEB] text-[#C22E2E] border border-primary/25 text-xs font-bold hover:bg-primary hover:text-white flex items-center gap-1.5 active-press transition-all cursor-pointer"
                >
                  <Sparkles size={14} /> Gérer mes mots
                </button>
              </div>
            </Card>

            {/* Nombre de Joueurs + Prénoms optionnels */}
            <Card className="w-full p-6 bg-surface border border-border shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-extrabold text-lg block text-foreground">
                    Participants
                  </span>
                  <span className="text-xs text-muted font-semibold">
                    Minimum 3 joueurs
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => adjustPlayerCount(-1)}
                    className="w-10 h-10 rounded-full bg-surface-elevated border border-border text-foreground flex items-center justify-center text-xl font-bold hover:border-primary/40 active-press cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-primary">{playerCount}</span>
                  <button
                    type="button"
                    onClick={() => adjustPlayerCount(1)}
                    className="w-10 h-10 rounded-full bg-surface-elevated border border-border text-foreground flex items-center justify-center text-xl font-bold hover:border-primary/40 active-press cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <Users size={14} className="text-primary" /> Prénoms (optionnel)
                  </span>
                  {playerNames.some((n) => n.trim().length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        sfxTap();
                        setPlayerNames(Array.from({ length: playerCount }, () => ""));
                      }}
                      className="text-xs font-bold text-muted hover:text-[#C22E2E] cursor-pointer"
                    >
                      Effacer tout
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: playerCount }).map((_, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={20}
                      value={playerNames[idx] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPlayerNames((prev) => {
                          const next = [...prev];
                          next[idx] = val;
                          return next;
                        });
                      }}
                      placeholder={`Joueur ${idx + 1}`}
                      className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground placeholder:text-muted/70 focus:border-primary outline-none transition-colors"
                    />
                  ))}
                </div>
                <p className="text-[11px] text-muted font-medium mt-2">
                  Pré-remplir accélère le tour et révèle les bons prénoms à l&apos;Ange Gardien.
                </p>
              </div>
            </Card>
          </div>

          {/* Colonne Droite : Options de jeu & Rôles */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* MODE DE VOTE */}
            <Card className="w-full p-5 bg-surface border border-border shadow-soft">
              <div className="flex flex-col text-left space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Vote size={16} /> Mode de Vote
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setVotingMode("CIRCULATE");
                      sfxTap();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      votingMode === "CIRCULATE"
                        ? "bg-[#FEEBEB] border-primary text-foreground shadow-sm"
                        : "bg-surface-elevated border-border text-muted hover:text-foreground"
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1.5 text-foreground">
                      <Lock size={14} className="text-[#4338CA]" /> Circulant (Secret)
                    </span>
                    <span className="text-[11px] font-semibold text-muted mt-1">
                      Chacun vote en secret sur le téléphone
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVotingMode("EXPRESS");
                      sfxTap();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      votingMode === "EXPRESS"
                        ? "bg-[#FEEBEB] border-primary text-foreground shadow-sm"
                        : "bg-surface-elevated border-border text-muted hover:text-foreground"
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1.5 text-foreground">
                      <Zap size={14} className="text-[#B45309]" /> Express (Table)
                    </span>
                    <span className="text-[11px] font-semibold text-muted mt-1">
                      Main levée à voix haute
                    </span>
                  </button>
                </div>
              </div>
            </Card>

            {/* CHRONO & TOURS MIN */}
            <Card className="w-full p-5 bg-surface border border-border shadow-soft space-y-4">
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-0.5">
                    <Clock size={16} /> Chrono de parole
                  </span>
                  <span className="text-[11px] text-muted font-semibold">
                    Temps d&apos;indice par joueur
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-surface-elevated p-1 rounded-2xl border border-border shrink-0">
                  {[0, 15, 30, 45, 60].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        setSpeakingTimerMax(sec);
                        sfxTap();
                      }}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        speakingTimerMax === sec
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {sec === 0 ? "Off" : `${sec}s`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border gap-2">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-0.5">
                    <Vote size={16} /> Tours min. avant 1er vote
                  </span>
                  <span className="text-[11px] text-muted font-semibold">
                    Nombre d&apos;indices avant d&apos;éliminer
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-surface-elevated p-1 rounded-2xl border border-border shrink-0">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setMinRoundsBeforeVote(n);
                        sfxTap();
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        minRoundsBeforeVote === n
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border gap-2">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E7490] flex items-center gap-1.5 mb-0.5">
                    <Eye size={16} /> Rôle à l&apos;élimination
                  </span>
                  <span className="text-[11px] text-muted font-semibold">
                    Mot toujours caché jusqu&apos;à la fin
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRevealRoleOnElimination(!revealRoleOnElimination);
                    sfxTap();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                    revealRoleOnElimination
                      ? "bg-[#ECFEFF] text-[#0E7490] border-cyan-500/35"
                      : "bg-[#FEEBEB] text-[#C22E2E] border-primary/35"
                  }`}
                >
                  {revealRoleOnElimination ? "Révélé 👁️" : "Masqué 🙈"}
                </button>
              </div>
            </Card>

            {/* DÉFIS, ALLIANCE & VOIX */}
            <Card className="w-full p-5 bg-surface border border-border shadow-soft space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col text-left pr-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309] flex items-center gap-1.5 mb-0.5">
                    <Flame size={15} /> Défis &amp; Contraintes
                  </span>
                  <p className="text-[11px] text-muted font-semibold">
                    Contrainte amusante imposée à chaque tour
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEnableConstraintsMode(!enableConstraintsMode);
                    sfxTap();
                  }}
                  className={`h-10 px-4 rounded-2xl font-extrabold text-xs uppercase transition-all border shrink-0 cursor-pointer ${
                    enableConstraintsMode
                      ? "bg-[#FEF3C7] text-[#B45309] border-amber-500/45"
                      : "bg-surface-elevated border-border text-muted hover:text-foreground"
                  }`}
                >
                  {enableConstraintsMode ? "ACTIF 🔥" : "Off"}
                </button>
              </div>

              {undercoverCount >= 2 && !isMysteryMode && (
                <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
                  <div className="flex flex-col text-left pr-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#C22E2E] flex items-center gap-1.5 mb-0.5">
                      <HeartHandshake size={15} /> Alliance Undercover
                    </span>
                    <p className="text-[11px] text-muted font-semibold">
                      Les Undercovers connaissent leurs alliés
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEnableUndercoverAlliance(!enableUndercoverAlliance);
                      sfxTap();
                    }}
                    className={`h-10 px-4 rounded-2xl font-extrabold text-xs uppercase transition-all border shrink-0 cursor-pointer ${
                      enableUndercoverAlliance
                        ? "bg-[#FEEBEB] text-[#C22E2E] border-primary/40"
                        : "bg-surface-elevated border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {enableUndercoverAlliance ? "ACTIF 🤝" : "Off"}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
                <div className="flex flex-col text-left pr-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-0.5">
                    <Volume2 size={15} /> Voix Narratrice
                  </span>
                  <p className="text-[11px] text-muted font-semibold">
                    Annonce les tours et éliminations à voix haute
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !enableVoiceNarrator;
                    setEnableVoiceNarrator(next);
                    sfxTap();
                    if (next) voiceEngine.testVoice();
                    else voiceEngine.stop();
                  }}
                  className={`h-10 px-4 rounded-2xl font-extrabold text-xs uppercase transition-all border shrink-0 cursor-pointer ${
                    enableVoiceNarrator
                      ? "bg-primary text-white border-primary"
                      : "bg-surface-elevated border-border text-muted hover:text-foreground"
                  }`}
                >
                  {enableVoiceNarrator ? "ACTIF 🎙️" : "Off"}
                </button>
              </div>
            </Card>

            {/* MODE MYSTÈRE */}
            <Card className="w-full p-5 bg-[#FFFBEB] border-2 border-amber-400/55 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col text-left pr-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5 mb-1">
                    🎲 Mode Mystère (Aléatoire)
                  </span>
                  <p className="text-xs font-semibold text-foreground/85 leading-snug">
                    Personne ne saura combien il y a d&apos;Undercovers, de Mr. White ou de rôles spéciaux !
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsMysteryMode(!isMysteryMode);
                    sfxTap();
                  }}
                  className={`h-11 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                    isMysteryMode
                      ? "bg-[#F59E0B] text-[#161824] border-amber-600 shadow-sm"
                      : "bg-surface border-border text-muted hover:text-foreground"
                  }`}
                >
                  {isMysteryMode ? "ACTIF 🎲" : "Désactivé"}
                </button>
              </div>
            </Card>

            {/* RÉPARTITION DES RÔLES */}
            <Card className="w-full p-6 bg-surface border border-border shadow-soft">
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted mb-4 block">
                {isMysteryMode
                  ? "Mode Mystère Sélectionné"
                  : `Répartition Manuelle (${playerCount} Joueurs)`}
              </span>

              {isMysteryMode ? (
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-400/45 text-[#B45309] text-xs font-bold space-y-1.5 text-left">
                  <span className="block font-black uppercase tracking-wider text-[#B45309]">
                    🎲 Répartition 100% Secrète
                  </span>
                  <p className="text-xs leading-relaxed text-foreground/85 font-semibold">
                    VYLO distribue aléatoirement les rôles en garantissant une majorité de Civils.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center bg-surface-elevated p-3.5 rounded-2xl border border-border">
                    <span className="font-bold flex items-center gap-2 text-xs text-foreground">
                      <span className="w-3 h-3 rounded-full bg-blue-600" /> Civils classiques
                    </span>
                    <span
                      className={`font-extrabold text-base ${
                        pureCiviliansCount >= 1 ? "text-[#1D4ED8]" : "text-[#C22E2E]"
                      }`}
                    >
                      {pureCiviliansCount}
                    </span>
                  </div>

                  {[
                    {
                      label: "Undercover",
                      color: "text-[#C22E2E]",
                      dot: "bg-[#E84545]",
                      val: undercoverCount,
                      set: setUndercoverCount,
                    },
                    {
                      label: "Mr. White",
                      color: "text-[#4338CA]",
                      dot: "bg-[#4F46E5]",
                      val: mrWhiteCount,
                      set: setMrWhiteCount,
                    },
                    {
                      label: "🃏 Le Joker",
                      color: "text-[#B45309]",
                      dot: "bg-[#F59E0B]",
                      val: jokerCount,
                      set: setJokerCount,
                    },
                    {
                      label: "🪞 Caméléon",
                      color: "text-[#0E7490]",
                      dot: "bg-cyan-600",
                      val: cameleonCount,
                      set: setCameleonCount,
                    },
                    {
                      label: "💣 Double-Agent",
                      color: "text-[#BE185D]",
                      dot: "bg-pink-600",
                      val: doubleAgentCount,
                      set: setDoubleAgentCount,
                    },
                    {
                      label: "👁️ Enquêteur",
                      color: "text-[#047857]",
                      dot: "bg-emerald-600",
                      val: detectiveCount,
                      set: setDetectiveCount,
                    },
                    {
                      label: "🛡️ Ange Gardien",
                      color: "text-[#4338CA]",
                      dot: "bg-indigo-600",
                      val: guardianAngelCount,
                      set: setGuardianAngelCount,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center bg-surface-elevated p-3.5 rounded-2xl border border-border"
                    >
                      <span className="font-bold flex items-center gap-2 text-xs text-foreground">
                        <span className={`w-3 h-3 rounded-full ${item.dot}`} /> {item.label}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            item.set((prev) => Math.max(0, prev - 1));
                            sfxTap();
                          }}
                          className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-xs text-foreground hover:border-primary/40 active-press cursor-pointer"
                        >
                          -
                        </button>
                        <span className={`font-extrabold text-sm w-4 text-center ${item.color}`}>
                          {item.val}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            item.set((prev) => prev + 1);
                            sfxTap();
                          }}
                          className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-xs text-foreground hover:border-primary/40 active-press cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {!configValidation.isValid && (
              <div className="w-full bg-[#FEEBEB] border border-primary/30 p-4 rounded-2xl text-[#C22E2E] text-xs font-bold flex items-center gap-2">
                <ShieldAlert size={18} className="shrink-0" /> {configValidation.error}
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-surface/95 backdrop-blur-md border-t border-border z-50">
          <div className="max-w-md md:max-w-lg mx-auto">
            <Button
              variant="primary"
              className="w-full h-14 sm:h-16 text-base sm:text-lg rounded-full"
              disabled={!configValidation.isValid}
              onClick={handleStartDistribution}
            >
              Distribuer les mots secrets ({playerCount} joueurs)
            </Button>
          </div>
        </div>

        {/* MODALE MOTS PERSONNALISÉS */}
        <LocalModalDialog
          open={showCustomWordsModal}
          onClose={() => setShowCustomWordsModal(false)}
          ariaLabel="Mes Mots Personnalisés"
          maxWidthClass="max-w-md"
        >
          <Card className="w-full p-6 border border-border bg-surface shadow-glow flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
              <h3 className="font-display font-extrabold text-lg flex items-center gap-2 text-primary">
                <Sparkles size={20} /> Mes Mots Personnalisés
              </h3>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setShowCustomWordsModal(false)}
                className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-bold text-sm text-muted hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-4 bg-surface-elevated p-4 rounded-2xl border border-border">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary block">
                Ajouter une nouvelle paire
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#1D4ED8] mb-1 block">
                    Mot Civil
                  </label>
                  <input
                    type="text"
                    value={newCivilianWord}
                    onChange={(e) => setNewCivilianWord(e.target.value)}
                    placeholder="Ex: Coca-Cola"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:border-secondary outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#C22E2E] mb-1 block">
                    Mot Undercover
                  </label>
                  <input
                    type="text"
                    value={newUndercoverWord}
                    onChange={(e) => setNewUndercoverWord(e.target.value)}
                    placeholder="Ex: Pepsi"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full py-2.5 text-xs font-bold gap-1.5 rounded-full"
                disabled={!newCivilianWord.trim() || !newUndercoverWord.trim()}
                onClick={() => {
                  if (newCivilianWord.trim() && newUndercoverWord.trim()) {
                    addCustomWordPair(newCivilianWord.trim(), newUndercoverWord.trim());
                    setNewCivilianWord("");
                    setNewUndercoverWord("");
                    sfxSuccess();
                    if (!selectedCategories.includes("✨ Mots Personnalisés")) {
                      setSelectedCategories((prev) => [
                        ...prev.filter((c) => c !== "Toutes les catégories"),
                        "✨ Mots Personnalisés",
                      ]);
                    }
                  }
                }}
              >
                <Plus size={14} /> Ajouter cette paire
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                Paires enregistrées ({customWordPairs.length})
              </span>
              {customWordPairs.length === 0 ? (
                <div className="text-center py-6 text-muted text-xs font-semibold">
                  Aucun mot personnalisé pour l&apos;instant.
                </div>
              ) : (
                customWordPairs.map((pair, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-elevated border border-border flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1D4ED8]">{pair.civilian}</span>
                      <span className="text-muted font-bold">vs</span>
                      <span className="font-bold text-[#C22E2E]">{pair.undercover}</span>
                    </div>
                    <button
                      type="button"
                      aria-label="Supprimer cette paire"
                      onClick={() => {
                        removeCustomWordPair(idx);
                        sfxTap();
                      }}
                      className="p-1.5 text-[#C22E2E]/70 hover:text-[#C22E2E] hover:bg-[#FEEBEB] rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <Button
              variant="surface"
              className="w-full mt-4 py-3 text-sm rounded-full"
              onClick={() => setShowCustomWordsModal(false)}
            >
              Terminer
            </Button>
          </Card>
        </LocalModalDialog>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 2 : INTERSTITIEL SÉCURISÉ ("PASSEZ LE TÉLÉPHONE")
  // ─────────────────────────────────────────────────────────
  if (phase === "PASS_TO_PLAYER") {
    const currentPlayerHasName = (playerList[currentDistIndex]?.name || "").trim().length > 0;
    const displayName = currentPlayerHasName
      ? playerList[currentDistIndex].name
      : `Joueur n°${currentDistIndex + 1}`;

    const handlePassReady = () => {
      if (phase !== "PASS_TO_PLAYER") return;
      const actionKey = `PASS-${currentDistIndex}-${playerList[currentDistIndex]?.id || ""}`;
      if (handledActionRef.current === actionKey) return;
      handledActionRef.current = actionKey;
      sfxTap();
      setIsWordRevealed(false);
      if (currentPlayerHasName) {
        setPhase("SHOW_WORD");
      } else {
        setPhase("ENTER_NAME");
      }
    };

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto relative">
        <span className="text-xs font-extrabold uppercase tracking-wider text-muted mb-4">
          Distribution {currentDistIndex + 1} / {playerList.length}
        </span>
        <div className="w-24 h-24 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 flex items-center justify-center mb-6 shadow-sm">
          <Smartphone size={46} />
        </div>
        <h2 className="font-display text-3xl font-extrabold text-foreground mb-3">
          Passez le téléphone
        </h2>
        <p className="text-muted text-base font-semibold mb-12">
          Donnez le smartphone à{" "}
          <span className="font-extrabold text-primary">{displayName}</span>.
        </p>

        <Button
          variant="primary"
          className="w-full py-5 text-lg rounded-full"
          onClick={handlePassReady}
        >
          {currentPlayerHasName
            ? `C'est moi, ${playerList[currentDistIndex].name} ! 👋`
            : "C'est moi ! 👋"}
        </Button>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 3 : SAISIE DU PRÉNOM (Si non pré-rempli)
  // ─────────────────────────────────────────────────────────
  if (phase === "ENTER_NAME") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto">
        <h2 className="font-display text-2xl font-extrabold text-foreground mb-2 text-center">
          Identification
        </h2>
        <p className="text-muted text-sm font-semibold mb-8 text-center">
          Inscris ton prénom pour découvrir ta carte secrète.
        </p>

        <Card className="w-full p-8 flex flex-col items-center mb-8 border border-border bg-surface shadow-glow">
          <div className="w-20 h-20 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 flex items-center justify-center text-3xl font-black mb-6">
            {tempName.trim() ? tempName.trim().charAt(0).toUpperCase() : "?"}
          </div>

          <input
            type="text"
            maxLength={20}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Quel est ton prénom ?"
            className="w-full bg-surface-elevated border-2 border-border rounded-2xl px-5 py-4 text-center font-bold text-lg text-foreground placeholder:text-muted/70 focus:border-primary outline-none transition-colors"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && tempName.trim()) handleConfirmName();
            }}
          />
        </Card>

        <Button
          variant="primary"
          className="w-full py-5 text-lg rounded-full"
          disabled={!tempName.trim()}
          onClick={handleConfirmName}
        >
          Valider mon prénom
        </Button>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 4 : DÉCOUVERTE DU MOT SECRET (Rôle Civil/Undercover masqué!)
  // ─────────────────────────────────────────────────────────
  if (phase === "SHOW_WORD") {
    const currentPlayer = playerList[currentDistIndex];
    const role = currentPlayer?.gameRole || "Civilian";
    const isClassicHidden = role === "Civilian" || role === "Undercover";
    const otherUndercovers = playerList
      .filter(
        (p) =>
          p.gameRole === "Undercover" &&
          p.id !== currentPlayer?.id &&
          p.name.trim().length > 0
      )
      .map((p) => p.name);

    const hasWord = Boolean(currentPlayer?.word && currentPlayer.word.trim().length > 0);
    const displayWord = hasWord
      ? currentPlayer.word
      : role === "MrWhite"
        ? "Aucun mot !"
        : role === "Joker"
          ? "Carte Joker 🃏"
          : role === "Cameleon"
            ? "Carte Caméléon 🪞"
            : "...";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto">
        <h2 className="text-lg font-bold text-muted mb-1">Carte secrète de</h2>
        <h1 className="font-display text-4xl font-black text-primary mb-2">
          {currentPlayer?.name}
        </h1>
        {currentCategory && (
          <p className="text-xs font-bold text-muted mb-6">
            Thème : <span className="text-primary">{currentCategory}</span>
          </p>
        )}

        <Card className="w-full min-h-[300px] flex flex-col items-center justify-center p-7 mb-8 bg-surface border border-border relative overflow-hidden shadow-glow">
          {isWordRevealed ? (
            <div className="animate-fade-up w-full flex flex-col items-center space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary block">
                {hasWord ? "Ton mot secret" : "Ton rôle spécial"}
              </span>
              <h2 className="font-display text-4xl font-black text-foreground">{displayWord}</h2>

              {isClassicHidden ? (
                <p className="text-xs text-muted font-bold bg-surface-elevated border border-border px-3 py-1.5 rounded-full">
                  🤫 Rôle masqué : Civil ou Undercover ? Écoute les indices !
                </p>
              ) : (
                <div
                  className={`px-3 py-1 rounded-full text-[11px] font-black uppercase ${
                    UNDERCOVER_ROLE_META[role]?.badgeClass || ""
                  }`}
                >
                  {UNDERCOVER_ROLE_META[role]?.emoji} {UNDERCOVER_ROLE_META[role]?.label}
                </div>
              )}

              {role === "MrWhite" && (
                <p className="text-xs text-[#4338CA] font-bold">
                  Bluffe à l&apos;oral et écoute les autres pour deviner le mot des Civils !
                </p>
              )}
              {role === "Joker" && (
                <p className="text-xs text-[#B45309] font-bold">
                  Fais-toi éliminer au TOUT PREMIER VOTE (1ère élimination) pour gagner seul !
                </p>
              )}
              {role === "Cameleon" && (
                <p className="text-xs text-[#0E7490] font-bold">
                  Pas de mot : rebondis sur la description du 1er joueur !
                </p>
              )}
              {role === "DoubleAgent" && (
                <p className="text-xs text-[#BE185D] font-bold">
                  💣 Camp Civil : si tu es éliminé au vote, tu emportes 1 joueur avec toi !
                </p>
              )}

              {/* Alliance Undercover si activée */}
              {enableUndercoverAlliance &&
                role === "Undercover" &&
                otherUndercovers.length > 0 && (
                  <div className="w-full p-3 bg-[#FEEBEB] border border-primary/25 rounded-2xl text-center">
                    <span className="text-[10px] font-black uppercase text-[#C22E2E] block mb-0.5">
                      🤝 Alliance Secrète
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      Coéquipier(s) :{" "}
                      <strong className="text-[#C22E2E] font-black">
                        {otherUndercovers.join(", ")}
                      </strong>
                    </span>
                  </div>
                )}

              {/* Indice d'Enquêteur (pré-calculé) */}
              {role === "Detective" && detectiveCluesMap[currentPlayer.id] && (
                <div className="w-full p-3.5 bg-[#ECFDF5] border border-emerald-500/30 rounded-2xl text-left">
                  <span className="text-[10px] font-black uppercase text-[#047857] flex items-center gap-1.5 mb-1">
                    <Search size={14} /> Indice d&apos;Enquêteur Secret
                  </span>
                  <p className="text-xs font-bold text-foreground leading-snug">
                    {detectiveCluesMap[currentPlayer.id]}
                  </p>
                </div>
              )}

              {/* Ange Gardien : Choix du protégé */}
              {role === "GuardianAngel" && (
                <div className="w-full p-3.5 bg-[#EEF2FF] border border-indigo-500/30 rounded-2xl text-left">
                  <span className="text-[10px] font-black uppercase text-[#4338CA] flex items-center gap-1.5 mb-1">
                    <ShieldCheck size={14} /> Pouvoir d&apos;Ange Gardien (1er vote)
                  </span>
                  <p className="text-xs text-muted font-semibold mb-2">
                    Choisis le joueur à immuniser contre le 1er vote :
                  </p>
                  <div className="flex gap-1.5 flex-wrap max-h-28 overflow-y-auto">
                    {playerList.map((p, idx) => {
                      const isSelected = guardianProtectedId === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setGuardianProtectedId(p.id);
                            sfxTap();
                          }}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? "bg-secondary text-white border-secondary shadow-sm"
                              : "bg-surface border-border text-foreground hover:border-secondary/45"
                          }`}
                        >
                          {p.name || `Joueur ${idx + 1}`} {isSelected ? "🛡️" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={handleRevealWord}
            >
              <div className="w-20 h-20 rounded-full bg-surface-elevated border border-border flex items-center justify-center mb-4">
                <EyeOff size={36} className="text-muted" />
              </div>
              <p className="text-lg font-extrabold text-foreground">Appuie pour voir ton mot</p>
            </div>
          )}
        </Card>

        <Button
          variant={isWordRevealed ? "primary" : "surface"}
          className="w-full py-5 text-lg rounded-full"
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

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 5 : TOUR DE PAROLE MÉLANGÉ
  // ─────────────────────────────────────────────────────────
  if (phase === "SPEAKING_TURNS") {
    const aliveSpeakers = speakingOrder.filter((p) => !p.isEliminated);
    const speaker = aliveSpeakers[currentSpeakerIdx];
    const speakerRecallWord =
      speaker?.word && speaker.word.trim().length > 0
        ? speaker.word
        : speaker?.gameRole === "MrWhite"
          ? "Aucun mot (Mr. White)"
          : speaker?.gameRole === "Joker"
            ? "Joker (Aucun mot)"
            : speaker?.gameRole === "Cameleon"
              ? "Caméléon (Aucun mot)"
              : "—";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-8 px-6 w-full max-w-md mx-auto relative">
        <div className="w-full flex justify-between items-center">
          <div className="text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary block">
              {`Tour d'indices n°${clueRoundNumber}`}
            </span>
            <h1 className="font-display text-xl font-extrabold text-foreground">
              Joueur {currentSpeakerIdx + 1} / {aliveSpeakers.length}
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Règles du jeu"
              onClick={() => {
                setShowRulesModal(true);
                sfxTap();
              }}
              className="p-3 rounded-2xl bg-surface border border-border text-primary hover:border-primary/40 transition-all flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer"
            >
              <HelpCircle size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                setShowJournalModal(true);
                sfxTap();
              }}
              className="p-3 rounded-2xl bg-surface border border-border text-primary hover:border-primary/40 transition-all flex items-center gap-1.5 font-bold text-xs shadow-sm cursor-pointer"
            >
              <BookOpen size={16} /> Journal
            </button>
          </div>
        </div>

        {/* Chronomètre dynamique */}
        {speakingTimerMax > 0 && timerSeconds !== null && (
          <div
            className={`w-full my-2 p-3.5 rounded-2xl border flex items-center justify-between shadow-soft ${
              timerSeconds === 0
                ? "bg-[#FEEBEB] border-primary/40 animate-pulse"
                : "bg-surface border-border"
            }`}
          >
            <div
              className={`flex items-center gap-2 text-xs font-extrabold ${
                timerSeconds === 0 ? "text-[#C22E2E]" : "text-[#B45309]"
              }`}
            >
              <Clock size={16} />
              {timerSeconds === 0 ? "Temps écoulé !" : "Temps d'indice"}
            </div>
            <div
              className={`text-lg font-black ${
                timerSeconds === 0 ? "text-[#C22E2E]" : "text-foreground"
              }`}
            >
              {timerSeconds}s
            </div>
          </div>
        )}

        {/* Contrainte d'indice */}
        {enableConstraintsMode && currentConstraint && (
          <div className="w-full my-2 bg-[#FFFBEB] p-3.5 rounded-2xl border border-amber-400/50 flex items-center gap-3 shadow-soft text-left">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
              <Flame size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                ⚡ Défi d&apos;Indice du Tour
              </span>
              <span className="text-xs font-bold text-foreground leading-snug">
                {currentConstraint}
              </span>
            </div>
          </div>
        )}

        <Card className="w-full p-8 flex flex-col items-center text-center bg-surface border border-border shadow-glow my-auto relative">
          <div className="w-20 h-20 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 flex items-center justify-center text-4xl font-black mb-4">
            {speaker?.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm font-bold text-muted mb-1">C&apos;est au tour de</p>
          <h2 className="font-display text-3xl font-black text-primary mb-4">
            {speaker?.name}
          </h2>
          <p className="text-xs text-muted font-semibold max-w-xs mb-6">
            Donne <span className="font-extrabold text-foreground">un mot indice</span> à voix
            haute sans dire ton mot secret.
          </p>

          <button
            type="button"
            onMouseDown={() => setIsWordRevealed(true)}
            onMouseUp={() => setIsWordRevealed(false)}
            onMouseLeave={() => setIsWordRevealed(false)}
            onTouchStart={() => setIsWordRevealed(true)}
            onTouchEnd={() => setIsWordRevealed(false)}
            className="w-full py-3 px-4 rounded-2xl bg-surface-elevated border border-border text-xs font-bold text-primary hover:border-primary/40 active-press transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <Eye size={16} />{" "}
            {isWordRevealed ? `Mot : ${speakerRecallWord}` : "Maintenir pour revoir ton mot 👁️"}
          </button>
        </Card>

        <Button
          variant="primary"
          className="w-full py-5 text-lg rounded-full"
          onClick={handleNextSpeaker}
        >
          {currentSpeakerIdx < aliveSpeakers.length - 1
            ? "Joueur suivant →"
            : "Terminer le tour d'indices ✓"}
        </Button>

        {/* MODALE JOURNAL (Sans spoiler de mot !) */}
        <LocalModalDialog
          open={showJournalModal}
          onClose={() => setShowJournalModal(false)}
          ariaLabel="Journal de Partie"
          maxWidthClass="max-w-sm"
        >
          <Card className="w-full p-6 border border-border bg-surface shadow-glow flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
              <h3 className="font-display font-extrabold text-lg flex items-center gap-2 text-primary">
                <BookOpen size={20} /> Journal de Partie
              </h3>
              <button
                type="button"
                aria-label="Fermer le journal"
                onClick={() => setShowJournalModal(false)}
                className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-bold text-sm text-muted hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 text-left flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Joueurs vivants ({playerList.filter((p) => !p.isEliminated).length})
              </span>
              <div className="space-y-1.5">
                {playerList
                  .filter((p) => !p.isEliminated)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-xl bg-surface-elevated border border-border flex items-center justify-between text-xs font-bold text-foreground"
                    >
                      <span>{p.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] border border-emerald-500/25 font-extrabold">
                        VIVANT
                      </span>
                    </div>
                  ))}
              </div>

              {playerList.some((p) => p.isEliminated) && (
                <>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C22E2E] block pt-2">
                    Joueurs éliminés
                  </span>
                  <div className="space-y-1.5">
                    {playerList
                      .filter((p) => p.isEliminated)
                      .map((p) => {
                        const meta = p.gameRole
                          ? UNDERCOVER_ROLE_META[p.gameRole]
                          : undefined;
                        return (
                          <div
                            key={p.id}
                            className="p-2.5 rounded-xl bg-[#FEEBEB] border border-primary/20 flex items-center justify-between text-xs font-bold text-foreground"
                          >
                            <span>{p.name}</span>
                            <span className="text-[10px] font-extrabold text-[#C22E2E]">
                              {revealRoleOnElimination
                                ? meta?.label || p.gameRole
                                : "Rôle masqué 🙈"}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>

            <Button
              variant="surface"
              className="w-full mt-4 py-3 text-sm rounded-full"
              onClick={() => setShowJournalModal(false)}
            >
              Fermer le journal
            </Button>
          </Card>
        </LocalModalDialog>

        {/* MODALE RÈGLES DU JEU */}
        <LocalModalDialog
          open={showRulesModal}
          onClose={() => setShowRulesModal(false)}
          ariaLabel="Règles du jeu"
          maxWidthClass="max-w-sm"
        >
          <Card className="w-full p-6 border border-border bg-surface shadow-glow flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
              <h3 className="font-display font-extrabold text-lg flex items-center gap-2 text-primary">
                <HelpCircle size={20} /> Règles du jeu
              </h3>
              <button
                type="button"
                aria-label="Fermer les règles"
                onClick={() => setShowRulesModal(false)}
                className="w-8 h-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center font-bold text-sm text-muted hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 text-left flex-1 text-xs leading-relaxed text-muted">
              <p>
                <strong className="text-foreground">Civils &amp; Undercover :</strong> personne ne connaît son camp au départ ! Déduisez-le grâce aux indices.
              </p>
              <p>
                <strong className="text-foreground">Mr. White :</strong> aucun mot. Bluffez pour survivre. Si éliminé, devinez le mot des Civils pour voler la victoire.
              </p>
              <p>
                <strong className="text-foreground">Joker :</strong> faites-vous éliminer dès la 1ère élimination pour gagner seul.
              </p>
              <p>
                <strong className="text-foreground">Caméléon :</strong> copiez la description du 1er joueur.
              </p>
              <p>
                <strong className="text-foreground">Double-Agent :</strong> mot des Civils, et s&apos;il meurt au vote, il emporte un survivant avec lui.
              </p>
              <p>
                👁️ <strong className="text-foreground">Enquêteur :</strong> mot des Civils + indice secret sur les imposteurs.
              </p>
              <p>
                🛡️ <strong className="text-foreground">Ange Gardien :</strong> mot des Civils + immunise 1 joueur contre le 1er vote.
              </p>
            </div>

            <Button
              variant="surface"
              className="w-full mt-4 py-3 text-sm rounded-full"
              onClick={() => setShowRulesModal(false)}
            >
              Fermer
            </Button>
          </Card>
        </LocalModalDialog>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN : DÉCISION ENTRE VOTER ET REFAIRE UN TOUR D'INDICES
  // ─────────────────────────────────────────────────────────
  if (phase === "TURN_DECISION") {
    const alivePlayers = speakingOrder.filter((p) => !p.isEliminated);
    const requiredSubRounds = eliminationRound === 1 ? minRoundsBeforeVote : 1;
    const canVoteNow = clueSubRound >= requiredSubRounds;

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-8 px-6 w-full max-w-md mx-auto text-center">
        <div className="w-full text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
            {`Fin du tour d'indices n°${clueRoundNumber}`}
          </span>
          <h1 className="font-display text-3xl font-black text-foreground mt-1">
            Que voulez-vous faire ?
          </h1>
        </div>

        {votingMode === "EXPRESS" ? (
          <div className="w-full my-auto space-y-4">
            {!canVoteNow ? (
              <Card className="w-full p-5 text-center bg-[#FEF3C7] border border-amber-500/40">
                <p className="text-sm font-extrabold text-[#B45309]">
                  {`⚠️ Vote disponible après ${requiredSubRounds} tours d'indices`}
                </p>
                <p className="text-xs text-[#92400E] font-semibold mt-1">
                  {`Encore ${requiredSubRounds - clueSubRound} tour(s) obligatoire(s).`}
                </p>
              </Card>
            ) : (
              <>
                <Card className="w-full p-5 text-left bg-[#FEEBEB] border border-primary/25">
                  <h3 className="font-extrabold text-sm text-[#C22E2E] flex items-center gap-1.5 mb-1">
                    <Zap size={16} /> Vote Express à Main Levée
                  </h3>
                  <p className="text-xs text-foreground/80 font-semibold">
                    Débattez à la table, puis touchez le suspect désigné par la majorité :
                  </p>
                </Card>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {alivePlayers.map((player) => (
                    <Card
                      key={player.id}
                      className="p-4 flex justify-between items-center cursor-pointer bg-surface border border-border hover:border-primary/50 active-press transition-all"
                      onClick={() => {
                        sfxTap();
                        setExpressConfirmTarget(player);
                      }}
                    >
                      <span className="font-bold text-base text-foreground">{player.name}</span>
                      <span className="text-xs font-extrabold text-[#C22E2E] flex items-center gap-1">
                        Éliminer <Skull size={16} />
                      </span>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <Card className="w-full p-8 flex flex-col items-center bg-surface border border-border shadow-glow my-auto">
            <div className="w-20 h-20 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 flex items-center justify-center mb-4">
              <HelpCircle size={40} />
            </div>
            <h2 className="font-display text-xl font-extrabold text-foreground mb-2">
              Tous les joueurs ont donné leur indice.
            </h2>
            <p className="text-muted text-xs font-semibold leading-relaxed max-w-xs">
              {!canVoteNow
                ? `Vote disponible après ${requiredSubRounds} tours d'indices. Encore ${
                    requiredSubRounds - clueSubRound
                  } tour(s).`
                : "Passez au vote secret sur téléphone ou lancez un autre tour d'indices."}
            </p>
          </Card>
        )}

        <div className="w-full flex flex-col gap-3">
          {votingMode === "CIRCULATE" && canVoteNow && (
            <Button
              variant="primary"
              className="w-full py-5 text-lg gap-2 rounded-full"
              onClick={startVotingPhase}
            >
              <Vote size={20} /> Lancer le vote secret au téléphone
            </Button>
          )}
          <Button
            variant="surface"
            className="w-full py-4 text-md gap-2 rounded-full"
            onClick={startAnotherClueRound}
          >
            <RefreshCw size={18} />{" "}
            {`Faire le tour n°${clueRoundNumber + 1} d'indices`}
          </Button>
        </div>

        {/* Modal Express Confirm */}
        <LocalModalDialog
          open={Boolean(expressConfirmTarget)}
          onClose={() => setExpressConfirmTarget(null)}
          ariaLabel="Confirmation d'élimination"
          maxWidthClass="max-w-sm"
        >
          {expressConfirmTarget && (
            <Card className="w-full p-6 border border-primary/35 bg-surface shadow-glow flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FEEBEB] text-[#C22E2E] flex items-center justify-center mb-4">
                <Skull size={34} />
              </div>
              <h3 className="font-display font-black text-xl text-foreground mb-6">
                Éliminer {expressConfirmTarget.name} ?
              </h3>
              <div className="flex gap-3 w-full">
                <Button
                  variant="surface"
                  className="flex-1 py-3 rounded-full"
                  onClick={() => setExpressConfirmTarget(null)}
                >
                  ✕ Annuler
                </Button>
                <Button
                  variant="primary"
                  className="flex-1 py-3 rounded-full"
                  onClick={() => {
                    if (phase !== "TURN_DECISION" || !expressConfirmTarget) return;
                    const target = expressConfirmTarget;
                    setExpressConfirmTarget(null);
                    handleEliminatePlayer(target);
                  }}
                >
                  ✓ Confirmer
                </Button>
              </div>
            </Card>
          )}
        </LocalModalDialog>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 6 : VOTE SECRET CIRCULANT (AVEC BOUCLIER DE PASSATION)
  // ─────────────────────────────────────────────────────────
  if (phase === "VOTING_CIRCULATE") {
    const activeVoters = speakingOrder.filter((p) => !p.isEliminated);
    const currentVoter = activeVoters[voterIndex];

    if (!isVoterReady) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted mb-4">
            Vote secret ({voterIndex + 1} / {activeVoters.length})
          </span>
          <div className="w-24 h-24 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/20 flex items-center justify-center mb-6 shadow-sm">
            <Vote size={44} />
          </div>
          <h2 className="font-display text-3xl font-extrabold text-foreground mb-3">
            Passez le téléphone
          </h2>
          <p className="text-muted text-base font-semibold mb-10">
            Donnez le smartphone à{" "}
            <span className="font-extrabold text-primary">{currentVoter?.name}</span> pour son vote secret.
          </p>
          <Button
            variant="primary"
            className="w-full py-5 text-lg rounded-full"
            onClick={() => {
              sfxTap();
              setIsVoterReady(true);
            }}
          >
            {`C'est moi, ${currentVoter?.name ?? ""} — Voter 🗳️`}
          </Button>
        </main>
      );
    }

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-5 sm:px-6 w-full max-w-md mx-auto">
        <h2 className="text-base font-bold text-muted mb-1">
          Vote secret ({voterIndex + 1}/{activeVoters.length})
        </h2>
        <h1 className="font-display text-3xl font-black text-[#C22E2E] mb-8 text-center">
          {currentVoter?.name}, qui éliminer ?
        </h1>

        <div className="w-full space-y-3 mb-8">
          {activeVoters.map((target) => {
            if (target.id === currentVoter?.id) return null;
            return (
              <Card
                key={target.id}
                className="p-5 flex justify-between items-center cursor-pointer bg-surface border border-border hover:border-primary/50 transition-all active-press"
                onClick={() => handleCastVote(currentVoter.id, target.id)}
              >
                <span className="font-bold text-lg text-foreground">{target.name}</span>
                <Skull className="text-muted/50" size={20} />
              </Card>
            );
          })}

          <Card
            className="p-5 flex justify-between items-center cursor-pointer bg-surface-elevated hover:border-amber-500/50 transition-all active-press border-dashed border-[var(--border-strong)]"
            onClick={() => handleCastVote(currentVoter.id, "ABSTAIN")}
          >
            <span className="font-bold text-base text-muted">
              S&apos;abstenir (vote blanc)
            </span>
            <span className="text-xs font-extrabold text-[#B45309]">Passer</span>
          </Card>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 7 : DEVINETTE MR. WHITE
  // ─────────────────────────────────────────────────────────
  if (phase === "MR_WHITE_GUESS" && eliminatedPlayer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#EEF2FF] text-[#4338CA] border border-secondary/25 flex items-center justify-center mb-6 shadow-sm">
          <ShieldAlert size={44} />
        </div>
        <h1 className="font-display text-3xl font-black mb-2 text-[#4338CA]">
          {eliminatedPlayer.name} était Mr. White !
        </h1>
        <p className="text-muted text-sm font-semibold mb-8 leading-relaxed">
          Dernière chance ! S&apos;il devine le mot secret des Civils, il{" "}
          <span className="font-extrabold text-foreground">vole la victoire</span> !
        </p>

        <Card className="w-full p-6 flex flex-col items-center mb-6 bg-surface border border-secondary/30 shadow-glow">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#4338CA] mb-3 block">
            Quelle est la devinette de Mr. White ?
          </label>
          <input
            type="text"
            value={mrWhiteGuess}
            onChange={(e) => setMrWhiteGuess(e.target.value)}
            placeholder="Tapez le mot des Civils..."
            className="w-full bg-surface-elevated border-2 border-secondary/25 rounded-2xl px-5 py-4 text-center font-black text-xl text-foreground placeholder:text-muted/70 focus:border-secondary outline-none transition-colors mb-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && mrWhiteGuess.trim()) handleMrWhiteGuessSubmit();
            }}
          />
        </Card>

        <Button
          variant="secondary"
          className="w-full py-5 text-lg rounded-full"
          disabled={!mrWhiteGuess.trim()}
          onClick={handleMrWhiteGuessSubmit}
        >
          Valider la devinette ✨
        </Button>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN 8 : RÉSULTAT DU VOTE (Révèle uniquement le rôle, JAMAIS le mot !)
  // ─────────────────────────────────────────────────────────
  if (phase === "VOTE_SUMMARY") {
    // Cas 1 : Sauvetage Ange Gardien
    if (savedByGuardianPlayer) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center py-10 px-6 w-full max-w-md mx-auto text-center">
          <Card className="w-full p-8 border border-secondary/35 bg-surface shadow-glow flex flex-col items-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#EEF2FF] text-[#4338CA] border border-secondary/25 flex items-center justify-center">
              <ShieldCheck size={44} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#4338CA]">
              Sauvetage Miraculeux !
            </span>
            <h1 className="font-display text-2xl font-black text-foreground">
              {savedByGuardianPlayer.name} est protégé !
            </h1>
            <p className="text-xs text-muted font-semibold leading-relaxed">
              L&apos;Ange Gardien avait placé son bouclier secret sur ce joueur. L&apos;élimination du 1er vote est annulée !
            </p>
            <Button
              variant="secondary"
              className="w-full py-4 text-base rounded-full"
              onClick={() => {
                if (phase !== "VOTE_SUMMARY") return;
                const actionKey = `VS-${eliminationRound}-${clueRoundNumber}`;
                if (handledActionRef.current === actionKey) return;
                handledActionRef.current = actionKey;
                setSavedByGuardianPlayer(null);
                startSpeakingPhase(playerList, { isNewEliminationTurn: true });
              }}
            >
              Tour d&apos;indices suivant →
            </Button>
          </Card>
        </main>
      );
    }

    // Cas 2 : Égalité persistante ou vote blanc unanime (aucune élimination)
    if (!eliminatedPlayer) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center py-10 px-6 w-full max-w-md mx-auto text-center">
          <Card className="w-full p-8 border border-amber-500/35 bg-surface shadow-glow flex flex-col items-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#FEF3C7] text-[#B45309] border border-amber-500/30 flex items-center justify-center">
              <Scale size={44} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309]">
              Aucune élimination
            </span>
            <h1 className="font-display text-2xl font-black text-foreground">
              Personne n&apos;est éliminé !
            </h1>
            <p className="text-xs text-muted font-semibold leading-relaxed">
              {noEliminationReason === "ABSTAIN"
                ? "Tous les joueurs se sont abstenus sur ce tour."
                : "Deuxième égalité consécutive — personne ne quitte la table !"}
            </p>
            <Button
              variant="primary"
              className="w-full py-4 text-base rounded-full"
              onClick={() => {
                if (phase !== "VOTE_SUMMARY") return;
                const actionKey = `VS-${eliminationRound}-${clueRoundNumber}`;
                if (handledActionRef.current === actionKey) return;
                handledActionRef.current = actionKey;
                startAnotherClueRound();
              }}
            >
              Tour d&apos;indices suivant →
            </Button>
          </Card>
        </main>
      );
    }

    const roleMeta = eliminatedPlayer.gameRole
      ? UNDERCOVER_ROLE_META[eliminatedPlayer.gameRole]
      : undefined;

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-10 px-6 w-full max-w-md mx-auto text-center">
        <div className="w-full">
          <div className="w-20 h-20 rounded-full bg-[#FEEBEB] text-[#C22E2E] border border-primary/25 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Skull size={44} />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C22E2E] block mb-1">
            Verdict du Vote
          </span>
          <h1 className="font-display text-3xl font-black text-foreground">
            {eliminatedPlayer.name} a été éliminé !
          </h1>
        </div>

        <div className="w-full my-auto py-4">
          {!revealRoleOnElimination ? (
            <Card className="w-full max-w-xs mx-auto p-6 flex flex-col items-center bg-surface border-2 border-primary/25 shadow-glow">
              <EyeOff size={40} className="text-[#C22E2E] mb-3" />
              <span className="text-sm font-black uppercase tracking-wider text-[#C22E2E]">
                Identité masquée 🙈
              </span>
              <p className="text-xs text-muted font-semibold mt-1">
                Rôle caché jusqu&apos;à la fin de la partie (Mode Hardcore).
              </p>
            </Card>
          ) : !isRoleRevealedOnElimination ? (
            <div
              onClick={() => {
                setIsRoleRevealedOnElimination(true);
                sfxReveal();
                if (enableVoiceNarrator) {
                  voiceEngine.speak(
                    `${eliminatedPlayer.name} était ${
                      roleMeta?.label || eliminatedPlayer.gameRole
                    } !`,
                    { tone: "DRAMA" }
                  );
                }
              }}
              className="w-full max-w-xs mx-auto p-8 rounded-3xl bg-[#FEEBEB] border-2 border-primary/35 shadow-glow flex flex-col items-center justify-center cursor-pointer active-press transition-all hover:border-primary"
            >
              <EyeOff size={46} className="text-[#C22E2E] mb-4" />
              <span className="text-base font-black text-foreground">
                Toucher pour révéler son rôle
              </span>
              <span className="text-xs text-[#C22E2E] mt-1.5 font-bold">
                Le mot reste secret jusqu&apos;au final 🎭
              </span>
            </div>
          ) : (
            <Card className="w-full max-w-xs mx-auto p-6 flex flex-col items-center bg-surface border-2 border-border shadow-glow animate-fade-up">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted mb-2">
                Rôle de {eliminatedPlayer.name}
              </span>
              <div
                className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider ${
                  roleMeta?.badgeClass ||
                  "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-500/25"
                }`}
              >
                {roleMeta ? `${roleMeta.label} ${roleMeta.emoji}` : eliminatedPlayer.gameRole}
              </div>
              <p className="text-[11px] text-muted font-bold mt-3">
                Son mot secret reste caché pour ne pas aider Mr. White !
              </p>
            </Card>
          )}
        </div>

        <Button
          variant="primary"
          className="w-full py-5 text-lg gap-2 rounded-full"
          onClick={() => {
            if (phase !== "VOTE_SUMMARY") return;
            const actionKey = `VS-${eliminationRound}-${clueRoundNumber}`;
            if (handledActionRef.current === actionKey) return;
            handledActionRef.current = actionKey;
            startSpeakingPhase(playerList, { isNewEliminationTurn: true });
          }}
        >
          <RefreshCw size={20} /> Tour d&apos;indices suivant →
        </Button>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN : DOUBLE AGENT REVENGE
  // ─────────────────────────────────────────────────────────
  if (phase === "DOUBLE_AGENT_REVENGE" && eliminatedPlayer) {
    const aliveTargets = speakingOrder.filter(
      (p) => !p.isEliminated && p.id !== eliminatedPlayer.id
    );

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-5 sm:px-6 w-full max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#FDF2F8] text-[#BE185D] border border-pink-500/25 flex items-center justify-center mb-6 shadow-sm">
          <Skull size={44} />
        </div>
        <h1 className="font-display text-2xl font-black mb-2 text-center text-[#BE185D]">
          💣 {eliminatedPlayer.name} était Double-Agent !
        </h1>
        <p className="text-muted text-sm font-semibold mb-8 text-center">
          Choisissez le joueur que vous emportez avec vous dans votre chute :
        </p>

        <div className="w-full space-y-3 mb-8">
          {aliveTargets.map((target) => (
            <Card
              key={target.id}
              className="p-5 flex justify-between items-center cursor-pointer bg-surface border border-border hover:border-pink-500/50 transition-all active-press"
              onClick={() => {
                sfxTap();
                handleDoubleAgentRevenge(target);
              }}
            >
              <span className="font-bold text-lg text-foreground">{target.name}</span>
              <Skull className="text-[#BE185D]" size={20} />
            </Card>
          ))}
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN : RE-VOTE ÉGALITÉ (AVEC BOUCLIER DE PASSATION)
  // ─────────────────────────────────────────────────────────
  if (phase === "VOTE_TIE") {
    const activeVoters = speakingOrder.filter((p) => !p.isEliminated);
    const currentVoter = activeVoters[voterIndex];

    if (!isVoterReady) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309] mb-4">
            Re-vote Égalité ({voterIndex + 1} / {activeVoters.length})
          </span>
          <div className="w-24 h-24 rounded-full bg-[#FEF3C7] text-[#B45309] border border-amber-500/30 flex items-center justify-center mb-6 shadow-sm">
            <Scale size={44} />
          </div>
          <h2 className="font-display text-3xl font-extrabold text-foreground mb-3">
            Passez le téléphone
          </h2>
          <p className="text-muted text-base font-semibold mb-10">
            Donnez le smartphone à{" "}
            <span className="font-extrabold text-primary">{currentVoter?.name}</span> pour départager les ex-aequo.
          </p>
          <Button
            variant="primary"
            className="w-full py-5 text-lg rounded-full"
            onClick={() => {
              sfxTap();
              setIsVoterReady(true);
            }}
          >
            {`C'est moi, ${currentVoter?.name ?? ""} — Voter ⚖️`}
          </Button>
        </main>
      );
    }

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-5 sm:px-6 w-full max-w-md mx-auto">
        <h2 className="text-base font-bold text-muted mb-1">
          Re-vote Égalité ({voterIndex + 1}/{activeVoters.length})
        </h2>
        <h1 className="font-display text-3xl font-black text-[#C22E2E] mb-6 text-center">
          {currentVoter?.name}, qui éliminer ?
        </h1>

        <div className="w-full bg-[#FEF3C7] border border-amber-500/35 p-4 rounded-xl text-[#92400E] mb-6 text-xs font-bold text-center">
          Départagez les ex-aequo — en cas de nouvelle égalité, personne ne sera éliminé.
        </div>

        <div className="w-full space-y-3 mb-8">
          {tiedPlayers.map((target) => {
            if (target.id === currentVoter?.id) return null;
            return (
              <Card
                key={target.id}
                className="p-5 flex justify-between items-center cursor-pointer bg-surface border border-border hover:border-primary/50 transition-all active-press"
                onClick={() => handleCastVote(currentVoter.id, target.id)}
              >
                <span className="font-bold text-lg text-foreground">{target.name}</span>
                <Skull className="text-muted/50" size={20} />
              </Card>
            );
          })}
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ÉCRAN FINAL : FIN DE PARTIE & RÉVÉLATIONS COMPLÈTES
  // ─────────────────────────────────────────────────────────
  if (phase === "END_GAME") {
    const winnerTitle =
      winnerTeam === "CIVILIANS"
        ? "Victoire des Civils ! 🏆"
        : winnerTeam === "UNDERCOVER"
          ? "Victoire des Undercover ! 🕵️"
          : winnerTeam === "JOKER"
            ? "Victoire du Joker ! 🃏"
            : "Victoire de Mr. White ! 🤍";

    const topBarColor =
      winnerTeam === "CIVILIANS"
        ? "bg-[#1D4ED8]"
        : winnerTeam === "JOKER"
          ? "bg-[#F59E0B]"
          : winnerTeam === "MR_WHITE"
            ? "bg-[#4F46E5]"
            : "bg-[#E84545]";

    const trophyColor =
      winnerTeam === "CIVILIANS"
        ? "text-[#1D4ED8]"
        : winnerTeam === "JOKER"
          ? "text-[#B45309]"
          : winnerTeam === "MR_WHITE"
            ? "text-[#4338CA]"
            : "text-[#C22E2E]";

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-5 sm:px-6 w-full max-w-md mx-auto">
        <h1 className="font-display text-3xl font-black text-foreground mb-8">
          Résultats de la partie
        </h1>

        <Card className="w-full flex flex-col items-center p-5 sm:p-8 mb-8 relative bg-surface border border-border shadow-glow overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-2 ${topBarColor}`} />
          <Trophy size={48} className={`${trophyColor} mb-4`} />
          <h2 className="font-display text-2xl font-black text-foreground mb-2 text-center">
            {winnerTitle}
          </h2>

          <div className="w-full space-y-3 mt-6">
            <Card className="p-4 bg-surface-elevated border border-border mb-4 text-center">
              <h3 className="text-sm font-black text-foreground mb-3">Les mots de cette partie</h3>
              <div className="flex flex-col gap-1.5 text-sm font-bold">
                <span className="text-[#1D4ED8]">Mot des Civils : {currentCivilianWord}</span>
                <span className="text-[#C22E2E]">
                  Mot des Undercovers : {currentUndercoverWord}
                </span>
              </div>
            </Card>

            {playerList.map((p) => {
              const role = p.gameRole || "Civilian";
              const meta = UNDERCOVER_ROLE_META[role];
              const wordDisplay =
                role === "MrWhite"
                  ? "Aucun mot"
                  : role === "Joker" || role === "Cameleon"
                    ? "Sans mot"
                    : p.word || "—";

              return (
                <div
                  key={p.id}
                  className="flex justify-between items-center gap-3 text-sm py-2.5 border-b border-border last:border-0"
                >
                  <div className="flex flex-col min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {p.isEliminated && <Skull size={14} className="text-[#C22E2E] shrink-0" />}
                      <span className="font-bold text-foreground break-words">{p.name}</span>
                    </div>
                    <span
                      className={`font-extrabold text-xs leading-snug break-words mt-0.5 ${
                        meta?.textClass || "text-[#1D4ED8]"
                      }`}
                    >
                      {meta ? `${meta.label} ${meta.emoji}` : role} ({wordDisplay})
                    </span>
                  </div>
                  <span className="text-xs font-black bg-[#FEF3C7] border border-amber-500/25 px-2.5 py-1 rounded-full text-[#B45309] whitespace-nowrap shrink-0">
                    +{p.scorePoints} pts
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {Object.keys(cumulativeScores).length > 0 && (
          <Card className="w-full flex flex-col p-6 mb-8 bg-surface border border-border shadow-glow">
            <h3 className="font-display text-lg font-black mb-4 flex items-center gap-2 justify-center text-[#B45309]">
              <Trophy size={20} /> Classement Général
            </h3>
            <div className="space-y-2">
              {Object.entries(cumulativeScores)
                .sort(([, a], [, b]) => b - a)
                .map(([name, points], idx) => (
                  <div
                    key={name}
                    className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0"
                  >
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <span className="text-muted w-4">{idx + 1}.</span> {name}
                    </span>
                    <span className="font-black text-[#B45309] whitespace-nowrap shrink-0">
                      {points} pts
                    </span>
                  </div>
                ))}
            </div>
          </Card>
        )}

        <EndGameActionsCard
          onReplaySameTeam={handleReplaySameTeam}
          onEditTeam={() => {
            const latestGroup = useAppStore.getState().savedGroup;
            if (latestGroup.length >= 3) {
              const nextCount = Math.min(20, latestGroup.length);
              setPlayerCount(nextCount);
              setPlayerNames(latestGroup.slice(0, nextCount).map((p) => p.name));
            }
            setPhase("CONFIG");
          }}
          onChangeTeam={() => {
            setPlayerNames(Array.from({ length: playerCount }, () => ""));
            setPhase("CONFIG");
          }}
        />
      </main>
    );
  }

  return null;
}
