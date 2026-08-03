"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Moon, Sun, Skull, Eye, EyeOff, Trophy, Share, 
  Sparkles, Heart, Shield, Crosshair, Clock, Check, RefreshCw, Volume2, Flame, Vote, Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  generateWerewolfRolesFromConfig, WerewolfRole, ROLE_INFO, WerewolfPlayer 
} from "@/games/werewolf/logic";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";
import { werewolfConfig } from "@/games/werewolf/config";
import { voiceEngine } from "@/lib/voiceEngine";
import { VoiceNarratorBanner } from "@/components/ui/VoiceNarrator";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type GamePhase = 
  | "LOBBY"
  | "DISTRIBUTION"
  | "NIGHT_FALL"
  | "NIGHT_CUPID"
  | "NIGHT_SEER"
  | "NIGHT_WOLVES"
  | "NIGHT_WITCH"
  | "NIGHT_GUARDIAN"
  | "DAY_SUNRISE"
  | "DAY_DEBATE"
  | "DAY_VOTE"
  | "HUNTER_REVENGE"
  | "END_GAME";

export default function WerewolfGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { players, initGame, addPlayer, removePlayer } = useEngineStore();
  const { incrementStat } = useAppStore();
  const router = useRouter();

  // --- Configuration Options ---
  const [phase, setPhase] = useState<GamePhase>("LOBBY");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [includeSorciere, setIncludeSorciere] = useState(true);
  const [includeChasseur, setIncludeChasseur] = useState(true);
  const [includeCupidon, setIncludeCupidon] = useState(true);
  const [includeGardien, setIncludeGardien] = useState(false);
  const [wolvesCountConfig, setWolvesCountConfig] = useState(1);
  const [discussionTimerMinutes, setDiscussionTimerMinutes] = useState(5);

  // --- Game Session State ---
  const [playerList, setPlayerList] = useState<WerewolfPlayer[]>([]);
  const [distIndex, setDistIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [nightRound, setNightRound] = useState(1);

  // --- Night Temporary Actions State ---
  const [cupidLovers, setCupidLovers] = useState<[string, string] | null>(null);
  const [seerInspectedPlayer, setSeerInspectedPlayer] = useState<{ name: string; role: WerewolfRole } | null>(null);
  const [wolfTargetId, setWolfTargetId] = useState<string | null>(null);
  const [witchHealed, setWitchHealed] = useState(false);
  const [witchKilledTargetId, setWitchKilledTargetId] = useState<string | null>(null);
  const [witchLifePotionUsed, setWitchLifePotionUsed] = useState(false);
  const [witchDeathPotionUsed, setWitchDeathPotionUsed] = useState(false);
  const [guardianProtectedId, setGuardianProtectedId] = useState<string | null>(null);

  // --- Day Deaths & Voting State ---
  const [nightDeaths, setNightDeaths] = useState<{ player: WerewolfPlayer; reason: string }[]>([]);
  const [voteIndex, setVoteIndex] = useState(0);
  const [votesMap, setVotesMap] = useState<Record<string, string>>({}); // voterId -> targetId
  const [hunterRevengePlayer, setHunterRevengePlayer] = useState<WerewolfPlayer | null>(null);
  const [winnerTeam, setWinnerTeam] = useState<"VILLAGEOIS" | "LOUPS" | "AMOUREUX" | null>(null);

  // --- Discussion Timer State ---
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  const playerArray = Object.values(players);

  useEffect(() => {
    initGame(werewolfConfig, "local", roomId);
  }, [roomId]);

  // Chronomètre de discussion
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);
  // Voice Engine Narration Automatique
  useEffect(() => {
    switch (phase) {
      case "NIGHT_FALL":
        voiceEngine.speak("La nuit tombe sur le village... Tout le monde ferme les yeux.", { tone: "NIGHT" });
        break;
      case "NIGHT_CUPID":
        voiceEngine.speak("Cupidon ouvre les yeux et désigne les deux Amoureux.", { tone: "MYSTICAL" });
        break;
      case "NIGHT_SEER":
        voiceEngine.speak("La Voyante ouvre les yeux et scrute un rôle secret.", { tone: "MYSTICAL" });
        break;
      case "NIGHT_WOLVES":
        voiceEngine.speak("Les Loups-Garous ouvrent les yeux et choisissent leur victime.", { tone: "SUSPENSE" });
        break;
      case "NIGHT_WITCH":
        voiceEngine.speak("La Sorcière ouvre les yeux.", { tone: "MYSTICAL" });
        break;
      case "NIGHT_GUARDIAN":
        voiceEngine.speak("Le Gardien ouvre les yeux et protège un villageois.", { tone: "MYSTICAL" });
        break;
      case "DAY_SUNRISE":
        if (nightDeaths.length > 0) {
          const names = nightDeaths.map(d => d.player.name).join(", ");
          voiceEngine.speak(`Le soleil se lève sur le village... ${names} est mort cette nuit.`, { tone: "DAY" });
        } else {
          voiceEngine.speak("Le soleil se lève sur le village. Une nuit paisible, personne n'est mort !", { tone: "DAY" });
        }
        break;
      case "DAY_VOTE":
        voiceEngine.speak("Le village se réunit pour le vote d'élimination.", { tone: "SUSPENSE" });
        break;
      case "HUNTER_REVENGE":
        voiceEngine.speak("Le Chasseur tire son dernier coup de fusil !", { tone: "SUSPENSE" });
        break;
      case "END_GAME":
        if (winnerTeam) {
          voiceEngine.speak(`La partie est terminée ! Victoire des ${winnerTeam.toLowerCase()} !`, { tone: "VICTORY" });
        }
        break;
    }
  }, [phase, nightDeaths, winnerTeam]);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    addPlayer({ 
      id: Date.now().toString(), 
      name: newPlayerName.trim(), 
      isHost: false, 
      isReady: true, 
      isConnected: true, 
      score: 0 
    });
    setNewPlayerName("");
    sfxJoin();
  };

  // Lancement de la distribution
  const handleStartGame = () => {
    if (playerArray.length < 5) return alert("Il faut au moins 5 joueurs pour lancer le Loup-Garou !");

    const roles = generateWerewolfRolesFromConfig(playerArray.length, {
      voyante: true,
      sorciere: includeSorciere,
      chasseur: includeChasseur,
      cupidon: includeCupidon,
      gardien: includeGardien,
      undercoverWolvesCount: wolvesCountConfig
    });

    const initialPlayers: WerewolfPlayer[] = playerArray.map((p, idx) => ({
      id: p.id,
      name: p.name,
      role: roles[idx],
      isAlive: true,
      isProtected: false,
      isInLove: false
    }));

    setPlayerList(initialPlayers);
    setDistIndex(0);
    setShowRole(false);
    setNightRound(1);
    setWitchLifePotionUsed(false);
    setWitchDeathPotionUsed(false);
    setCupidLovers(null);
    sfxSuspense();
    setPhase("DISTRIBUTION");
  };

  // Passage au joueur suivant lors de la distribution
  const handleNextDistribution = () => {
    if (distIndex < playerList.length - 1) {
      setDistIndex(prev => prev + 1);
      setShowRole(false);
    } else {
      sfxSuspense();
      setPhase("NIGHT_FALL");
    }
  };

  // Progression de la Nuit (Étapes séquentielles)
  const handleStartNightSteps = () => {
    setWolfTargetId(null);
    setSeerInspectedPlayer(null);
    setGuardianProtectedId(null);
    setWitchHealed(false);
    setWitchKilledTargetId(null);
    setNightDeaths([]);

    // Étape 1 : Cupidon (Seulement Nuit 1)
    const cupidonPlayer = playerList.find(p => p.role === "Cupidon" && p.isAlive);
    if (nightRound === 1 && cupidonPlayer) {
      setPhase("NIGHT_CUPID");
      return;
    }

    // Étape 2 : Voyante
    const voyantePlayer = playerList.find(p => p.role === "Voyante" && p.isAlive);
    if (voyantePlayer) {
      setPhase("NIGHT_SEER");
      return;
    }

    // Étape 3 : Loups-Garous
    setPhase("NIGHT_WOLVES");
  };

  // Validation Cupidon
  const handleCupidSubmit = (id1: string, id2: string) => {
    setCupidLovers([id1, id2]);
    setPlayerList(prev => prev.map(p => ({
      ...p,
      isInLove: p.id === id1 || p.id === id2,
      loverId: p.id === id1 ? id2 : p.id === id2 ? id1 : undefined
    })));
    sfxSuccess();

    // Passer à la Voyante ou aux Loups
    const voyantePlayer = playerList.find(p => p.role === "Voyante" && p.isAlive);
    if (voyantePlayer) {
      setPhase("NIGHT_SEER");
    } else {
      setPhase("NIGHT_WOLVES");
    }
  };

  // Validation Voyante
  const handleSeerInspect = (targetPlayer: WerewolfPlayer) => {
    setSeerInspectedPlayer({ name: targetPlayer.name, role: targetPlayer.role });
    sfxReveal();
  };

  const handleSeerFinish = () => {
    setSeerInspectedPlayer(null);
    setPhase("NIGHT_WOLVES");
  };

  // Validation Loups
  const handleWolvesKill = (targetId: string) => {
    setWolfTargetId(targetId);
    sfxError();

    // Passer à la Sorcière ou au Gardien ou au Jour
    const sorcierePlayer = playerList.find(p => p.role === "Sorcière" && p.isAlive);
    const gardienPlayer = playerList.find(p => p.role === "Gardien" && p.isAlive);

    if (sorcierePlayer) {
      setPhase("NIGHT_WITCH");
    } else if (gardienPlayer) {
      setPhase("NIGHT_GUARDIAN");
    } else {
      resolveNightDeaths(targetId, false, null, null);
    }
  };

  // Validation Sorcière
  const handleWitchFinish = (healed: boolean, witchKillTargetId: string | null) => {
    if (healed) setWitchLifePotionUsed(true);
    if (witchKillTargetId) setWitchDeathPotionUsed(true);

    const gardienPlayer = playerList.find(p => p.role === "Gardien" && p.isAlive);
    if (gardienPlayer) {
      setPhase("NIGHT_GUARDIAN");
    } else {
      resolveNightDeaths(wolfTargetId, healed, witchKillTargetId, guardianProtectedId);
    }
  };

  // Validation Gardien
  const handleGuardianProtect = (protectedId: string) => {
    setGuardianProtectedId(protectedId);
    sfxSuccess();
    resolveNightDeaths(wolfTargetId, witchHealed, witchKilledTargetId, protectedId);
  };

  // Répolution complète des morts de la nuit
  const resolveNightDeaths = (
    wolfKillId: string | null, 
    healed: boolean, 
    witchKillId: string | null, 
    protectedId: string | null
  ) => {
    const deaths: { player: WerewolfPlayer; reason: string }[] = [];
    const deadIdsSet = new Set<string>();

    // Attaque des Loups (annulée si guéri par Sorcière ou protégé par Gardien)
    if (wolfKillId && wolfKillId !== protectedId && !healed) {
      const victim = playerList.find(p => p.id === wolfKillId);
      if (victim) {
        deaths.push({ player: victim, reason: "dévoré par les Loups-Garous 🐺" });
        deadIdsSet.add(victim.id);
      }
    }

    // Potion de la Sorcière
    if (witchKillId) {
      const victim = playerList.find(p => p.id === witchKillId);
      if (victim && !deadIdsSet.has(victim.id)) {
        deaths.push({ player: victim, reason: "empoisonné par la Sorcière 🧪" });
        deadIdsSet.add(victim.id);
      }
    }

    // Effet des Amoureux (Si l'un meurt, l'autre meurt immédiatement de chagrin)
    deaths.forEach(d => {
      if (d.player.isInLove && d.player.loverId) {
        const lover = playerList.find(p => p.id === d.player.loverId);
        if (lover && !deadIdsSet.has(lover.id)) {
          deaths.push({ player: lover, reason: `mort de chagrin d'amour pour ${d.player.name} 💘` });
          deadIdsSet.add(lover.id);
        }
      }
    });

    // Mettre à jour la liste des joueurs vivants
    const updatedList = playerList.map(p => ({
      ...p,
      isAlive: deadIdsSet.has(p.id) ? false : p.isAlive
    }));

    setPlayerList(updatedList);
    setNightDeaths(deaths);

    // Vérifier si le Chasseur est parmi les morts de la nuit
    const hunterDead = deaths.find(d => d.player.role === "Chasseur");
    if (hunterDead) {
      setHunterRevengePlayer(hunterDead.player);
    }

    sfxSuccess();
    setPhase("DAY_SUNRISE");
  };

  // Démarrer le débat de jour
  const handleStartDayDebate = () => {
    const hasWinner = checkWinConditions();
    if (!hasWinner) {
      if (discussionTimerMinutes > 0) {
        setTimerSeconds(discussionTimerMinutes * 60);
        setTimerActive(true);
      }
      setPhase("DAY_DEBATE");
    }
  };

  // Lancement du vote du village
  const handleStartVotePhase = () => {
    setTimerActive(false);
    setVoteIndex(0);
    setVotesMap({});
    setPhase("DAY_VOTE");
  };

  // Enregistrement d'un vote
  const handleCastVote = (voterId: string, targetId: string) => {
    const newVotes = { ...votesMap, [voterId]: targetId };
    setVotesMap(newVotes);

    const aliveCount = playerList.filter(p => p.isAlive).length;
    if (Object.keys(newVotes).length >= aliveCount) {
      // Dépouillement des votes
      const tally: Record<string, number> = {};
      Object.values(newVotes).forEach(target => {
        tally[target] = (tally[target] || 0) + 1;
      });

      let maxVotes = 0;
      let eliminatedId: string | null = null;
      Object.entries(tally).forEach(([target, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          eliminatedId = target;
        }
      });

      if (eliminatedId) {
        const eliminated = playerList.find(p => p.id === eliminatedId);
        if (eliminated) {
          // Éliminer le joueur
          const updatedList = playerList.map(p => p.id === eliminatedId ? { ...p, isAlive: false } : p);
          setPlayerList(updatedList);

          // Si c'est le Chasseur, déclencher la vengeance du Chasseur
          if (eliminated.role === "Chasseur") {
            setHunterRevengePlayer(eliminated);
            setPhase("HUNTER_REVENGE");
            return;
          }
        }
      }

      const hasWinner = checkWinConditions();
      if (!hasWinner) {
        setNightRound(prev => prev + 1);
        setPhase("NIGHT_FALL");
      }
    } else {
      setVoteIndex(prev => prev + 1);
    }
  };

  // Vengeance du Chasseur (Tir mortel)
  const handleHunterShoot = (targetId: string) => {
    const target = playerList.find(p => p.id === targetId);
    if (!target) return;

    const updatedList = playerList.map(p => p.id === targetId ? { ...p, isAlive: false } : p);
    setPlayerList(updatedList);
    setHunterRevengePlayer(null);
    sfxError();

    const hasWinner = checkWinConditions();
    if (!hasWinner) {
      setNightRound(prev => prev + 1);
      setPhase("NIGHT_FALL");
    }
  };

  // Vérification des conditions de victoire
  const checkWinConditions = (): boolean => {
    const active = playerList.filter(p => p.isAlive);
    const wolves = active.filter(p => p.role === "Loup-Garou");
    const villagers = active.filter(p => p.role !== "Loup-Garou");
    const lovers = active.filter(p => p.isInLove);

    // Victoire des Amoureux (S'ils sont les 2 seuls survivants et de camps opposés)
    if (active.length === 2 && lovers.length === 2) {
      setWinnerTeam("AMOUREUX");
      sfxVictory();
      setPhase("END_GAME");
      return true;
    }

    // Victoire des Villageois (Plus de Loups)
    if (wolves.length === 0) {
      setWinnerTeam("VILLAGEOIS");
      sfxVictory();
      setPhase("END_GAME");
      return true;
    }

    // Victoire des Loups (Nombre de loups >= villageois)
    if (wolves.length >= villagers.length) {
      setWinnerTeam("LOUPS");
      sfxVictory();
      setPhase("END_GAME");
      return true;
    }

    return false;
  };

  // Formatage du timer (mm:ss)
  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // =========================================================================
  // 1. LOBBY (Configuration de la Partie & Rôles)
  // =========================================================================
  if (phase === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 md:py-10 px-4 md:px-8 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto pb-36">
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
          <div className="text-xl font-black flex items-center gap-2">
            🐺 Loup-Garou <span className="text-xs bg-purple-500/20 text-purple-400 font-bold px-2 py-0.5 rounded-full border border-purple-500/30">Local</span>
          </div>
          <div className="w-16" />
        </div>

        {/* Ajout des Joueurs */}
        <Card className="w-full p-6 mb-6 bg-surface/90 border border-white/10 shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-black flex items-center gap-2">
              <Users size={18} className="text-purple-400" /> Liste des Joueurs ({playerArray.length}/20)
            </h2>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Prénom du joueur..."
              className="flex-1 bg-background/80 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:border-purple-400 outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddPlayer(); }}
            />
            <Button variant="surface" className="px-4 rounded-xl" onClick={handleAddPlayer}>
              <UserPlus size={18} />
            </Button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {playerArray.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="font-bold text-xs flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-black">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                </span>
                <button onClick={() => removePlayer(p.id)} className="text-red-400/60 hover:text-red-400 p-1.5 rounded-lg">
                  <Skull size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Configuration des Rôles & Variantes */}
        <Card className="w-full p-6 mb-6 bg-surface/90 border border-white/10 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
            <Flame size={15} /> Composition du Village
          </h3>

          <div className="flex items-center justify-between text-xs font-bold">
            <span>Loups-Garous</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => setWolvesCountConfig(num)}
                  className={`w-8 h-8 rounded-xl font-black border transition-all ${wolvesCountConfig === num ? 'bg-red-500 text-white border-red-500 shadow-soft' : 'bg-white/5 border-white/10 text-foreground/50'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Special Role Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-white/5">
            {[
              { role: "Sorcière 🧪", state: includeSorciere, setter: setIncludeSorciere, min: 6 },
              { role: "Chasseur 🏹", state: includeChasseur, setter: setIncludeChasseur, min: 7 },
              { role: "Cupidon 💘", state: includeCupidon, setter: setIncludeCupidon, min: 8 },
              { role: "Gardien / Salvateur 🛡️", state: includeGardien, setter: setIncludeGardien, min: 8 },
            ].map(r => (
              <div key={r.role} className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  {r.role}
                  {playerArray.length < r.min && <span className="text-[10px] text-foreground/40 font-normal">({r.min}+ j.)</span>}
                </span>
                <button
                  onClick={() => r.setter(!r.state)}
                  className={`px-3 py-1 rounded-xl font-black border transition-all ${r.state ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' : 'bg-white/5 border-white/10 text-foreground/40'}`}
                >
                  {r.state ? "Oui ✓" : "Non"}
                </button>
              </div>
            ))}
          </div>

          {/* Chronomètre Débat */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs font-bold">
            <span>Chrono du Débat</span>
            <div className="flex gap-1.5">
              {[
                { min: 0, label: "∞" },
                { min: 3, label: "3m" },
                { min: 5, label: "5m" },
                { min: 7, label: "7m" }
              ].map(opt => (
                <button
                  key={opt.min}
                  onClick={() => setDiscussionTimerMinutes(opt.min)}
                  className={`px-2.5 py-1 rounded-xl font-black border transition-all ${discussionTimerMinutes === opt.min ? 'bg-purple-500 text-white border-purple-500' : 'bg-white/5 border-white/10 text-foreground/50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button 
              variant="primary" 
              className="w-full h-16 text-lg font-black gap-2 bg-purple-600 hover:bg-purple-500 border-purple-600 shadow-glow" 
              onClick={handleStartGame}
              disabled={playerArray.length < 5}
            >
              <Play size={20} className="fill-current" /> Lancer la Partie ({playerArray.length} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 2. DISTRIBUTION DES RÔLES (Passage de la main à la main)
  // =========================================================================
  if (phase === "DISTRIBUTION") {
    const currentP = playerList[distIndex];
    const info = ROLE_INFO[currentP.role];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-4">
          <span className="text-xs font-black uppercase tracking-widest text-purple-400">Distribution secrète ({distIndex + 1}/{playerList.length})</span>
          <h1 className="text-2xl font-black mt-1">Passez le téléphone à</h1>
          <h2 className="text-3xl font-black text-purple-400 mt-1">{currentP.name}</h2>
        </div>

        {/* Carte du Rôle Secret */}
        <Card className={`w-full aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-glow border border-white/10 bg-gradient-to-b ${showRole ? info.bgGradient : 'bg-surface/90'} my-auto`}>
          {showRole ? (
            <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
              <span className="text-7xl mb-4 animate-bounce">{info.emoji}</span>
              <span className="text-xs font-black uppercase tracking-widest text-foreground/50 mb-1">Votre Rôle Secret</span>
              <h2 className={`text-3xl font-black mb-3 ${info.color}`}>{info.title}</h2>
              <p className="text-xs text-foreground/80 font-bold leading-relaxed max-w-xs">{info.description}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { sfxReveal(); setShowRole(true); }}>
              <EyeOff size={56} className="text-purple-400/40 mb-4 animate-pulse" />
              <p className="text-xl font-black">Appuyez pour révéler votre rôle</p>
              <p className="text-xs text-foreground/50 mt-2 font-bold">Assurez-vous que personne ne regarde !</p>
            </div>
          )}
        </Card>

        <div className="w-full space-y-3">
          <Button
            variant={showRole ? "primary" : "surface"}
            className="w-full h-16 text-lg font-black bg-purple-600 hover:bg-purple-500 border-purple-600"
            onClick={() => {
              if (!showRole) { sfxReveal(); setShowRole(true); }
              else { sfxTap(); handleNextDistribution(); }
            }}
          >
            {showRole ? "J'ai mémorisé mon rôle ✓" : "Découvrir mon rôle 👁️"}
          </Button>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 3. ANNONCE DE LA NUIT (Le Narrateur parle)
  // =========================================================================
  if (phase === "NIGHT_FALL") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center bg-gradient-to-b from-[#090814] via-[#0d0b24] to-background">
        <Card className="w-full p-8 bg-surface/80 border border-purple-500/20 shadow-glow space-y-6">
          <VoiceNarratorBanner />
          <Moon size={64} className="text-purple-400 mx-auto animate-pulse" />
          
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 block mb-1">Nuit #{nightRound}</span>
            <h1 className="text-3xl font-black">La nuit tombe sur le village... 🌙</h1>
            <p className="text-xs text-foreground/60 font-bold mt-2 leading-relaxed">
              Tout le monde ferme les yeux. Le narrateur téléphone va maintenant appeler les rôles un par un.
            </p>
          </div>

          <Button
            variant="primary"
            className="w-full py-4 text-md font-black bg-purple-600 hover:bg-purple-500 border-purple-600 gap-2 shadow-glow"
            onClick={() => { sfxSuspense(); handleStartNightSteps(); }}
          >
            <Moon size={18} /> Lancer les tours de Nuit 🌙
          </Button>
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 4. TOUR DE CUPIDON (Nuit 1)
  // =========================================================================
  if (phase === "NIGHT_CUPID") {
    const aliveP = playerList.filter(p => p.isAlive);
    const selectedLovers = aliveP.filter(p => p.id === wolfTargetId || p.id === guardianProtectedId);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-pink-400 flex items-center justify-center gap-1">
            💘 Étape Nuit — Cupidon
          </span>
          <h1 className="text-2xl font-black mt-1">Cupidon ouvre les yeux 💘</h1>
          <p className="text-xs text-foreground/50 font-bold mt-1">Choisissez les 2 Amoureux qui seront liés à la vie à la mort !</p>
        </div>

        <div className="w-full space-y-2.5 my-auto">
          {aliveP.map(p => {
            const isSelected = selectedLovers.some(s => s.id === p.id);
            return (
              <Card
                key={p.id}
                onClick={() => {
                  if (selectedLovers.length < 2 || isSelected) {
                    if (isSelected) {
                      if (wolfTargetId === p.id) setWolfTargetId(null);
                      else setGuardianProtectedId(null);
                    } else {
                      if (!wolfTargetId) setWolfTargetId(p.id);
                      else setGuardianProtectedId(p.id);
                    }
                  }
                }}
                className={`p-4 flex items-center justify-between border cursor-pointer ${isSelected ? 'bg-pink-500/20 border-pink-500 shadow-glow' : 'bg-surface/80 border-white/10'}`}
              >
                <span className="font-bold text-sm">{p.name}</span>
                {isSelected && <Heart size={18} className="text-pink-400 fill-pink-400" />}
              </Card>
            );
          })}
        </div>

        <Button
          variant="primary"
          className="w-full py-4 text-md font-black bg-pink-600 hover:bg-pink-500 border-pink-600"
          disabled={!wolfTargetId || !guardianProtectedId}
          onClick={() => handleCupidSubmit(wolfTargetId!, guardianProtectedId!)}
        >
          Valider les Amoureux 💘 ➜ Fermer les yeux
        </Button>
      </main>
    );
  }

  // =========================================================================
  // 5. TOUR DE LA VOYANTE
  // =========================================================================
  if (phase === "NIGHT_SEER") {
    const aliveP = playerList.filter(p => p.isAlive && p.role !== "Voyante");

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center justify-center gap-1">
            🔮 Étape Nuit — Voyante
          </span>
          <h1 className="text-2xl font-black mt-1">La Voyante ouvre les yeux 🔮</h1>
          <p className="text-xs text-foreground/50 font-bold mt-1">Passez le téléphone à la Voyante. Choisissez un joueur à inspecter.</p>
        </div>

        {seerInspectedPlayer ? (
          <Card className="w-full p-8 bg-purple-500/20 border border-purple-500/40 shadow-glow my-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-purple-300">Révélation de la Voyante</span>
            <h2 className="text-3xl font-black">{seerInspectedPlayer.name}</h2>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-foreground/60 font-bold block mb-1">Rôle Secret :</span>
              <span className="text-2xl font-black text-purple-400">{ROLE_INFO[seerInspectedPlayer.role].emoji} {seerInspectedPlayer.role}</span>
            </div>
            <Button variant="primary" className="w-full py-4 font-black bg-purple-600" onClick={handleSeerFinish}>
              Fermer les yeux 🔮
            </Button>
          </Card>
        ) : (
          <div className="w-full space-y-2.5 my-auto">
            {aliveP.map(p => (
              <Card
                key={p.id}
                onClick={() => handleSeerInspect(p)}
                className="p-4 flex items-center justify-between border bg-surface/80 border-white/10 cursor-pointer hover:border-purple-400"
              >
                <span className="font-bold text-sm">{p.name}</span>
                <Eye size={18} className="text-purple-400" />
              </Card>
            ))}
          </div>
        )}
      </main>
    );
  }

  // =========================================================================
  // 6. TOUR DES LOUPS-GAROUS
  // =========================================================================
  if (phase === "NIGHT_WOLVES") {
    const nonWolves = playerList.filter(p => p.isAlive && p.role !== "Loup-Garou");

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center justify-center gap-1">
            🐺 Étape Nuit — Loups-Garous
          </span>
          <h1 className="text-2xl font-black mt-1">Les Loups-Garous ouvrent les yeux 🐺</h1>
          <p className="text-xs text-foreground/50 font-bold mt-1">Concertez-vous en silence et choisissez votre victime du soir.</p>
        </div>

        <div className="w-full space-y-2.5 my-auto">
          {nonWolves.map(p => {
            const isSelected = wolfTargetId === p.id;
            return (
              <Card
                key={p.id}
                onClick={() => setWolfTargetId(p.id)}
                className={`p-4 flex items-center justify-between border cursor-pointer ${isSelected ? 'bg-red-500/20 border-red-500 shadow-glow' : 'bg-surface/80 border-white/10'}`}
              >
                <span className="font-bold text-sm">{p.name}</span>
                <Skull size={18} className={isSelected ? "text-red-500" : "text-white/20"} />
              </Card>
            );
          })}
        </div>

        <Button
          variant="primary"
          className="w-full py-4 text-md font-black bg-red-600 hover:bg-red-500 border-red-600"
          disabled={!wolfTargetId}
          onClick={() => handleWolvesKill(wolfTargetId!)}
        >
          Valider la victime 🐺 ➜ Fermer les yeux
        </Button>
      </main>
    );
  }

  // =========================================================================
  // 7. TOUR DE LA SORCIÈRE
  // =========================================================================
  if (phase === "NIGHT_WITCH") {
    const wolfVictim = playerList.find(p => p.id === wolfTargetId);
    const aliveTargets = playerList.filter(p => p.isAlive && p.id !== wolfTargetId);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1">
            🧪 Étape Nuit — Sorcière
          </span>
          <h1 className="text-2xl font-black mt-1">La Sorcière ouvre les yeux 🧪</h1>
        </div>

        <Card className="w-full p-6 bg-surface/90 border border-white/10 space-y-4 my-auto">
          {/* Information Victime des Loups */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-foreground/50 font-bold block mb-1">Victime des Loups :</span>
            <span className="text-xl font-black text-red-400">{wolfVictim ? wolfVictim.name : "Personne"}</span>
          </div>

          {/* Potion de Vie */}
          {!witchLifePotionUsed ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-xs font-black text-emerald-400">Potion de Vie (Sauver)</span>
              <button
                onClick={() => setWitchHealed(!witchHealed)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black border ${witchHealed ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-white/5 border-white/10'}`}
              >
                {witchHealed ? "Utilisée ✓" : "Utiliser"}
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-foreground/40 font-bold text-center">Potion de Vie déjà consommée</p>
          )}

          {/* Potion de Mort */}
          {!witchDeathPotionUsed && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs font-black text-red-400 block text-left">Potion de Mort (Empoisonner)</span>
              <select
                value={witchKilledTargetId || ""}
                onChange={(e) => setWitchKilledTargetId(e.target.value || null)}
                className="w-full bg-background border border-white/10 rounded-xl p-3 text-xs font-bold"
              >
                <option value="">Ne pas empoisonner</option>
                {aliveTargets.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </Card>

        <Button
          variant="primary"
          className="w-full py-4 text-md font-black bg-emerald-600 hover:bg-emerald-500 border-emerald-600"
          onClick={() => handleWitchFinish(witchHealed, witchKilledTargetId)}
        >
          Valider et Fermer les yeux 🧪
        </Button>
      </main>
    );
  }

  // =========================================================================
  // 8. TOUR DU GARDIEN
  // =========================================================================
  if (phase === "NIGHT_GUARDIAN") {
    const aliveP = playerList.filter(p => p.isAlive);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center justify-center gap-1">
            🛡️ Étape Nuit — Gardien
          </span>
          <h1 className="text-2xl font-black mt-1">Le Gardien ouvre les yeux 🛡️</h1>
          <p className="text-xs text-foreground/50 font-bold mt-1">Choisissez un villageois à protéger cette nuit.</p>
        </div>

        <div className="w-full space-y-2.5 my-auto">
          {aliveP.map(p => {
            const isSelected = guardianProtectedId === p.id;
            return (
              <Card
                key={p.id}
                onClick={() => setGuardianProtectedId(p.id)}
                className={`p-4 flex items-center justify-between border cursor-pointer ${isSelected ? 'bg-cyan-500/20 border-cyan-500 shadow-glow' : 'bg-surface/80 border-white/10'}`}
              >
                <span className="font-bold text-sm">{p.name}</span>
                <Shield size={18} className={isSelected ? "text-cyan-400" : "text-white/20"} />
              </Card>
            );
          })}
        </div>

        <Button
          variant="primary"
          className="w-full py-4 text-md font-black bg-cyan-600 hover:bg-cyan-500 border-cyan-600"
          disabled={!guardianProtectedId}
          onClick={() => handleGuardianProtect(guardianProtectedId!)}
        >
          Valider la Protection 🛡️ ➜ Fermer les yeux
        </Button>
      </main>
    );
  }

  // =========================================================================
  // 9. LEVER DU JOUR & BILAN DE LA NUIT
  // =========================================================================
  if (phase === "DAY_SUNRISE") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
        <Card className="w-full p-8 bg-surface/90 border border-white/10 shadow-glow space-y-6">
          <VoiceNarratorBanner />
          <Sun size={64} className="text-amber-400 mx-auto animate-pulse" />

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">Matin — Nuit #{nightRound}</span>
            <h1 className="text-3xl font-black">Le village se réveille ! ☀️</h1>
          </div>

          {/* Bilan des Morts */}
          <div className="space-y-3">
            {nightDeaths.length > 0 ? (
              nightDeaths.map(d => (
                <div key={d.player.id} className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
                  <Skull size={28} className="text-red-500 mx-auto mb-2" />
                  <h3 className="text-lg font-black text-red-400">{d.player.name} est mort(e)</h3>
                  <p className="text-xs text-foreground/60 font-bold mt-1">Raison : {d.reason}</p>
                  <div className="mt-2 text-xs font-black text-foreground/80">
                    Rôle : {ROLE_INFO[d.player.role].emoji} {d.player.role}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center">
                <Sparkles size={32} className="text-green-400 mx-auto mb-2" />
                <h3 className="text-lg font-black text-green-400">Une nuit paisible !</h3>
                <p className="text-xs text-foreground/60 font-bold mt-1">Personne n'est mort cette nuit 🕊️</p>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            className="w-full py-4 text-md font-black bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-500"
            onClick={handleStartDayDebate}
          >
            Lancer le Débat de Jour ☀️
          </Button>
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 10. JOUR — DÉBAT ET CHRONO
  // =========================================================================
  if (phase === "DAY_DEBATE") {
    const activeP = playerList.filter(p => p.isAlive);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto pb-32">
        <div className="w-full text-center py-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
            <Sun size={16} /> Phase de Débat du Village
          </span>
          <h1 className="text-2xl font-black mt-1">Qui sont les Loups ? 🐺</h1>
        </div>

        {/* Chronomètre central */}
        {timerSeconds !== null && (
          <Card className="w-full p-6 text-center bg-surface/90 border border-amber-500/30 shadow-summer-glow my-4">
            <Clock size={32} className="text-amber-400 mx-auto mb-2 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-foreground/50 block mb-1">Temps de discussion</span>
            <div className="text-5xl font-black text-amber-400 font-mono tracking-tight">
              {formatTime(timerSeconds)}
            </div>
          </Card>
        )}

        {/* Grille des Survivants & Éliminés */}
        <div className="w-full my-auto">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3 text-center">État des Joueurs ({activeP.length}/{playerList.length} vivants)</p>
          <div className="grid grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {playerList.map(p => (
              <div 
                key={p.id} 
                className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                  p.isAlive ? 'bg-surface/80 border-white/10' : 'bg-white/5 border-white/5 opacity-40'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                  p.isAlive ? 'bg-purple-500/20 text-purple-400' : 'bg-red-500/20 text-red-500'
                }`}>
                  {p.isAlive ? p.name.charAt(0).toUpperCase() : "💀"}
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-xs truncate">{p.name}</span>
                  {!p.isAlive && <span className="text-[10px] text-red-400 font-bold truncate">{p.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button
              variant="primary"
              className="w-full h-16 text-lg font-black gap-2 bg-red-600 hover:bg-red-500 border-red-600 shadow-glow"
              onClick={handleStartVotePhase}
            >
              <Vote size={20} /> Passer au Vote d'Élimination 🗳️
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // 11. JOUR — VOTE DU VILLAGE (Passage du téléphone pour vote secret)
  // =========================================================================
  if (phase === "DAY_VOTE") {
    const activeP = playerList.filter(p => p.isAlive);
    const voter = activeP[voteIndex];
    const selectableTargets = activeP.filter(p => p.id !== voter?.id);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center pb-32">
        <div className="w-full py-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-500">Vote Secret ({voteIndex + 1}/{activeP.length})</span>
          <h1 className="text-2xl font-black mt-1">Passez le téléphone à</h1>
          <h2 className="text-3xl font-black text-red-500 mt-1">{voter?.name}</h2>
        </div>

        <div className="w-full space-y-2.5 my-auto">
          <p className="text-xs font-bold text-foreground/50 mb-2">Pour qui votes-tu pour l'élimination ?</p>
          {selectableTargets.map(p => (
            <Card
              key={p.id}
              onClick={() => handleCastVote(voter.id, p.id)}
              className="p-4 flex items-center justify-between border bg-surface/80 border-white/10 cursor-pointer hover:border-red-500 active:scale-[0.98]"
            >
              <span className="font-bold text-sm">{p.name}</span>
              <Skull size={18} className="text-red-500/60" />
            </Card>
          ))}
        </div>
      </main>
    );
  }

  // =========================================================================
  // 12. VENGEANCE DU CHASSEUR
  // =========================================================================
  if (phase === "HUNTER_REVENGE") {
    const aliveTargets = playerList.filter(p => p.isAlive && p.id !== hunterRevengePlayer?.id);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto text-center">
        <Card className="w-full p-8 bg-surface/90 border border-orange-500/40 shadow-glow space-y-6 my-auto">
          <Crosshair size={56} className="text-orange-400 mx-auto animate-bounce" />

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 block mb-1">Pouvoir du Chasseur 🏹</span>
            <h1 className="text-2xl font-black">{hunterRevengePlayer?.name} est éliminé !</h1>
            <p className="text-xs text-foreground/60 font-bold mt-2 leading-relaxed">
              En mourant, le Chasseur tire son dernier coup de fusil ! Choisissez qui emporter avec vous dans la tombe :
            </p>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {aliveTargets.map(p => (
              <Card
                key={p.id}
                onClick={() => handleHunterShoot(p.id)}
                className="p-3.5 flex items-center justify-between border bg-white/5 border-white/10 cursor-pointer hover:border-orange-400"
              >
                <span className="font-bold text-sm">{p.name}</span>
                <Crosshair size={18} className="text-orange-400" />
              </Card>
            ))}
          </div>
        </Card>
      </main>
    );
  }

  // =========================================================================
  // 13. FIN DE PARTIE & VICTOIRE (Bilan des Rôles)
  // =========================================================================
  if (phase === "END_GAME") {
    const title = winnerTeam === "VILLAGEOIS" ? "VICTOIRE DES VILLAGEOIS ! 🏆" : winnerTeam === "LOUPS" ? "VICTOIRE DES LOUPS-GAROUS ! 🐺" : "VICTOIRE DES AMOUREUX ! 💘";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto pb-32 text-center">
        <div className="w-full py-6">
          <Trophy size={56} className="text-amber-400 mx-auto mb-3 animate-bounce" />
          <h1 className="text-3xl font-black text-gradient-summer mb-2">{title}</h1>
          <p className="text-xs font-bold text-foreground/50">La partie est terminée après {nightRound} nuits !</p>
        </div>

        {/* Tableau d'Honneur et Rôles */}
        <Card className="w-full p-6 bg-surface/90 border border-white/10 space-y-3 my-auto">
          <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 mb-3">Révélation complète des cartes</h3>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {playerList.map(p => {
              const info = ROLE_INFO[p.role];

              return (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{info.emoji}</span>
                    <div className="flex flex-col text-left">
                      <span className={`font-bold text-xs ${!p.isAlive ? 'line-through text-foreground/40' : ''}`}>
                        {p.name} {!p.isAlive && "💀"}
                      </span>
                      <span className={`text-[10px] font-black uppercase ${info.color}`}>{info.title}</span>
                    </div>
                  </div>
                  {p.isInLove && <Heart size={14} className="text-pink-400 fill-pink-400" />}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="w-full">
          <EndGameActionsCard
            onReplaySameTeam={() => {
              sfxSuccess();
              // Distribuer directement les rôles à la même équipe
              setPhase("LOBBY");
            }}
            onEditTeam={() => setPhase("LOBBY")}
            onChangeTeam={() => setPhase("LOBBY")}
          />
        </div>
      </main>
    );
  }

  return null;
}
