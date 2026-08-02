"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import { 
  UndercoverRole, UndercoverPlayer, CATEGORIES, CategoryName, 
  validateRoleConfig, getRandomWordPair, generateRolesFromConfig, 
  shuffleSpeakingOrder 
} from "@/games/undercover/logic";
import { undercoverConfig } from "@/games/undercover/config";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Eye, EyeOff, Skull, Trophy, Share, Users, 
  Sparkles, Check, Clock, UserCheck, ShieldAlert, RotateCcw, Volume2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";

type PassPhase = 
  | "CONFIG"             // 1. Choix catégorie, nb joueurs & rôles
  | "PASS_TO_PLAYER"     // 2. Interstitiel "Passez le téléphone..."
  | "ENTER_NAME"         // 3. Carte cliquable -> Saisie prénom
  | "SHOW_WORD"          // 4. "Voir mon mot secret" -> suspense -> mot -> "J'ai mémorisé"
  | "SPEAKING_TURNS"     // 5. Tour de parole mélangé ("C'est au tour de X")
  | "VOTING_CIRCULATE"   // 6. Circulation du téléphone pour vote individuel
  | "VOTE_SUMMARY"       // 7. Résultats du vote & annonce de l'éliminé
  | "END_GAME";          // 8. Bilan, rôles révélés & attribution des points

export default function UndercoverLocalGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  // --- Configuration State ---
  const [phase, setPhase] = useState<PassPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("Toutes les catégories");
  const [playerCount, setPlayerCount] = useState(4);
  const [undercoverCount, setUndercoverCount] = useState(1);
  const [mrWhiteCount, setMrWhiteCount] = useState(0);

  // --- Game Session State ---
  const [playerList, setPlayerList] = useState<UndercoverPlayer[]>([]);
  const [currentDistIndex, setCurrentDistIndex] = useState(0);
  const [tempName, setTempName] = useState("");
  const [isWordRevealed, setIsWordRevealed] = useState(false);

  // --- Gameplay State ---
  const [speakingOrder, setSpeakingOrder] = useState<UndercoverPlayer[]>([]);
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // --- Voting State ---
  const [voterIndex, setVoterIndex] = useState(0);
  const [votesMap, setVotesMap] = useState<Record<string, string>>({}); // voterId -> targetId
  const [eliminatedPlayer, setEliminatedPlayer] = useState<UndercoverPlayer | null>(null);
  const [winnerTeam, setWinnerTeam] = useState<"CIVILIANS" | "UNDERCOVER" | null>(null);

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

    // 1. Choix des mots
    const wordPair = getRandomWordPair(selectedCategory);
    // 2. Génération des rôles
    const roles = generateRolesFromConfig(playerCount, undercoverCount, mrWhiteCount);

    // 3. Préparation des slots de joueurs
    const initialPlayers: UndercoverPlayer[] = roles.map((role, i) => {
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else if (role === "MrWhite") word = "Vous êtes Mr. White";

      return {
        id: `player_${i}_${Date.now()}`,
        name: "",
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

    setPlayerList(initialPlayers);
    setCurrentDistIndex(0);
    setTempName("");
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
    setTempName("");

    if (currentDistIndex < playerList.length - 1) {
      setCurrentDistIndex(prev => prev + 1);
      setPhase("PASS_TO_PLAYER");
    } else {
      // TOUS LES JOUEURS ONT LEUR MOT ➔ LANCEMENT DU TOUR DE PAROLE
      startSpeakingPhase(playerList);
    }
  };

  // ─────────────────────────────────────────────────────────
  // 3. DÉBUT DE LA PHASE DE PAROLE
  // ─────────────────────────────────────────────────────────
  const startSpeakingPhase = (players: UndercoverPlayer[]) => {
    // Ordre aléatoire avec probabilité réduite pour Mr White d'être 1er
    const order = shuffleSpeakingOrder(players);
    setSpeakingOrder(order);
    setCurrentSpeakerIdx(0);
    sfxSuccess();
    setPhase("SPEAKING_TURNS");
  };

  const handleNextSpeaker = () => {
    sfxTap();
    if (currentSpeakerIdx < speakingOrder.length - 1) {
      setCurrentSpeakerIdx(prev => prev + 1);
    } else {
      // Fin du tour de parole ➔ Passage au vote
      startVotingPhase();
    }
  };

  // ─────────────────────────────────────────────────────────
  // 4. PHASE DE VOTE (Circulation du téléphone)
  // ─────────────────────────────────────────────────────────
  const startVotingPhase = () => {
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
  // 5. DÉPOUILLEMENT & VÉRIFICATION DES VICTOIRES
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
    setEliminatedPlayer(eliminated);

    // Marquer éliminé
    const updatedList = speakingOrder.map(p => 
      p.id === eliminated.id ? { ...p, isEliminated: true } : p
    );
    setSpeakingOrder(updatedList);

    // Vérification de victoire
    const remainingAlive = updatedList.filter(p => !p.isEliminated);
    const undercoversLeft = remainingAlive.filter(p => p.gameRole === "Undercover" || p.gameRole === "MrWhite").length;
    const civiliansLeft = remainingAlive.filter(p => p.gameRole === "Civilian").length;

    if (undercoversLeft === 0) {
      // VICTOIRE DES CIVILS
      awardPoints(updatedList, "CIVILIANS");
      sfxVictory();
      setWinnerTeam("CIVILIANS");
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("civilianWins");
      setPhase("END_GAME");
    } else if (undercoversLeft >= civiliansLeft) {
      // VICTOIRE DES IMPOSTEURS
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
      <main className="min-h-screen flex flex-col items-center py-8 px-6 max-w-md mx-auto relative">
        <div className="w-full flex items-center mb-6">
          <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 text-center font-extrabold text-xl">Configuration Undercover</div>
          <div className="h-12 w-12" />
        </div>

        {/* Choix de la Catégorie */}
        <div className="w-full mb-8">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block">
            Catégorie de mots
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); sfxTap(); }}
                className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 ${
                  selectedCategory === cat 
                    ? "bg-primary text-white shadow-soft" 
                    : "bg-surface border border-white/5 text-foreground/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Nombre de Joueurs */}
        <Card className="w-full p-6 mb-6 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-lg block">Joueurs</span>
            <span className="text-xs text-foreground/50 font-bold">Minimum 3 participants</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setPlayerCount(Math.max(3, playerCount - 1)); sfxTap(); }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl font-bold active:scale-90"
            >-</button>
            <span className="text-2xl font-black text-primary">{playerCount}</span>
            <button 
              onClick={() => { setPlayerCount(Math.min(20, playerCount + 1)); sfxTap(); }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl font-bold active:scale-90"
            >+</button>
          </div>
        </Card>

        {/* Répartition des Rôles */}
        <div className="w-full space-y-3 mb-8">
          <div className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5">
            <span className="font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span> Civils
            </span>
            <span className="font-extrabold text-blue-400 text-lg">
              {playerCount - undercoverCount - mrWhiteCount}
            </span>
          </div>

          <div className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5">
            <span className="font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span> Undercover
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setUndercoverCount(Math.max(1, undercoverCount - 1)); sfxTap(); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold"
              >-</button>
              <span className="font-extrabold text-red-500">{undercoverCount}</span>
              <button 
                onClick={() => { setUndercoverCount(Math.min(playerCount - 2 - mrWhiteCount, undercoverCount + 1)); sfxTap(); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold"
              >+</button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5">
            <span className="font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400"></span> Mr. White
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setMrWhiteCount(Math.max(0, mrWhiteCount - 1)); sfxTap(); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold"
              >-</button>
              <span className="font-extrabold text-purple-400">{mrWhiteCount}</span>
              <button 
                onClick={() => { setMrWhiteCount(Math.min(1, mrWhiteCount + 1)); sfxTap(); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold"
              >+</button>
            </div>
          </div>
        </div>

        {/* Indicateur de validation en temps réel */}
        {!configValidation.isValid && (
          <div className="w-full bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-red-400 text-xs font-bold mb-6 flex items-center gap-2">
            <ShieldAlert size={18} /> {configValidation.error}
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
          <div className="max-w-md mx-auto">
            <Button 
              variant="primary" 
              className="w-full h-16 text-lg"
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
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto relative">
        <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 animate-pulse">
          <Sparkles size={48} />
        </div>
        <h2 className="text-3xl font-black mb-3">Passez le téléphone</h2>
        <p className="text-foreground/50 text-base mb-12">
          Donnez le smartphone au <span className="font-extrabold text-primary">joueur n°{currentDistIndex + 1}</span>.
        </p>

        <Button 
          variant="primary" 
          className="w-full py-5 text-lg"
          onClick={() => setPhase("ENTER_NAME")}
        >
          C'est moi ! 👋
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
    const speaker = speakingOrder[currentSpeakerIdx];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-10 px-6 max-w-md mx-auto">
        <div className="w-full text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Phase d'indices</span>
          <h1 className="text-2xl font-black mt-1">Tour {currentSpeakerIdx + 1} / {speakingOrder.length}</h1>
        </div>

        <Card className="w-full p-10 flex flex-col items-center text-center border border-white/10 shadow-glow my-auto">
          <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-black mb-6">
            {speaker?.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-sm font-bold text-foreground/50 mb-2">C'est au tour de</p>
          <h2 className="text-4xl font-black text-primary mb-6">{speaker?.name}</h2>
          <p className="text-xs text-foreground/50 max-w-xs">
            Donne <span className="font-bold text-foreground">un seul mot</span> comme indice sur ton mot secret à voix haute.
          </p>
        </Card>

        <Button variant="primary" className="w-full py-5 text-lg" onClick={handleNextSpeaker}>
          {currentSpeakerIdx < speakingOrder.length - 1 ? "Tour suivant →" : "Passer au vote final 🗳️"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 6 : VOTE INDIVIDUEL ET DISCRET ---
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

  // --- ÉCRAN 7 : RÉSULTATS DU VOTE (SI LA PARTIE CONTINUE) ---
  if (phase === "VOTE_SUMMARY" && eliminatedPlayer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <Skull size={64} className="text-red-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-black mb-2">{eliminatedPlayer.name} est éliminé !</h1>
        <p className="text-foreground/50 text-base mb-8">
          Rôle révélé : <span className="font-bold text-red-400">{eliminatedPlayer.gameRole}</span> ({eliminatedPlayer.word})
        </p>

        <Button variant="primary" className="w-full py-5 text-lg" onClick={() => startSpeakingPhase(speakingOrder)}>
          Repartir pour un tour d'indices 🔄
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

        <Button variant="primary" className="w-full py-4 text-lg mb-4 gap-2" onClick={handleShare}>
          <Share size={20} /> Partager le score
        </Button>

        <Button variant="surface" className="w-full py-4 text-lg" onClick={() => setPhase("CONFIG")}>
          Nouvelle partie 🔄
        </Button>
      </main>
    );
  }

  return null;
}
