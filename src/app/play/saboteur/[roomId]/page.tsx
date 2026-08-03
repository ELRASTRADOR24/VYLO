"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, ShieldAlert, Skull, Trophy, Eye, EyeOff, 
  Smartphone, Check, X, Clock, HelpCircle, Vote, RefreshCw, Flame, Bomb
} from "lucide-react";
import { 
  SaboteurRole, SaboteurPlayer, SaboteurChallenge, 
  generateSaboteurRoles, getRandomChallenge 
} from "@/games/saboteur/logic";
import { voiceEngine } from "@/lib/voiceEngine";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";

type PassPhase = 
  | "CONFIG"
  | "PASS_TO_PLAYER"
  | "ENTER_NAME"
  | "SHOW_ROLE"
  | "MISSION"
  | "VOTING"
  | "END_GAME";

export default function SaboteurLocalGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat, savedGroup, setSavedGroup } = useAppStore();

  const handleReplaySameTeam = () => {
    sfxSuspense();
    const existingNames = playerList.map(p => p.name).filter(n => n.length > 0);
    const count = existingNames.length > 0 ? existingNames.length : playerCount;
    const roles = generateSaboteurRoles(count, saboteurCount);

    const initialPlayers: SaboteurPlayer[] = roles.map((role, i) => ({
      id: `player_${i}_${Date.now()}`,
      name: existingNames[i] || `Joueur ${i + 1}`,
      isHost: i === 0,
      isReady: true,
      isConnected: true,
      score: 0,
      scorePoints: 0,
      gameRole: role,
      isEliminated: false,
    }));

    setPlayerList(initialPlayers);
    setCurrentDistIndex(0);
    setTempName("");
    setIsRoleRevealed(false);

    const challenge = getRandomChallenge();
    setActiveChallenge(challenge);
    setMissionTimer(challenge.timeLimitSec);
    setTimerActive(false);
    setIsPrepPhase(true);
    setPrepCountdown(5);
    setPhase("MISSION");

    setTimeout(() => {
      voiceEngine.speak(
        `Nouvelle manche ! Mission : ${challenge.title}. ${challenge.instruction}`,
        { tone: "SABOTEUR" }
      );
    }, 300);
  };

  // --- Configuration ---
  const [phase, setPhase] = useState<PassPhase>("CONFIG");
  const [playerCount, setPlayerCount] = useState(4);
  const [saboteurCount, setSaboteurCount] = useState(1);

  // --- Session ---
  const [playerList, setPlayerList] = useState<SaboteurPlayer[]>([]);
  const [currentDistIndex, setCurrentDistIndex] = useState(0);
  const [tempName, setTempName] = useState("");
  const [isRoleRevealed, setIsRoleRevealed] = useState(false);

  // --- Gameplay ---
  const [activeChallenge, setActiveChallenge] = useState<SaboteurChallenge | null>(null);
  const [missionTimer, setMissionTimer] = useState<number>(20);
  const [timerActive, setTimerActive] = useState(false);
  // Phase de préparation (compte à rebours 5s avant le vrai défi)
  const [prepCountdown, setPrepCountdown] = useState<number>(5);
  const [isPrepPhase, setIsPrepPhase] = useState(false);
  const [voterIndex, setVoterIndex] = useState(0);
  const [votesMap, setVotesMap] = useState<Record<string, string>>({});
  const [eliminatedPlayer, setEliminatedPlayer] = useState<SaboteurPlayer | null>(null);

  const handleLeaveGame = () => {
    sfxTap();
    voiceEngine.stop();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/library");
    }
  };

  // 1. LANCEMENT DE LA DISTRIBUTION
  const handleStartDistribution = () => {
    sfxSuspense();
    const roles = generateSaboteurRoles(playerCount, saboteurCount);

    const initialPlayers: SaboteurPlayer[] = roles.map((role, i) => ({
      id: `player_${i}_${Date.now()}`,
      name: "",
      isHost: i === 0,
      isReady: true,
      isConnected: true,
      score: 0,
      scorePoints: 0,
      gameRole: role,
      isEliminated: false,
    }));

    setPlayerList(initialPlayers);
    setCurrentDistIndex(0);
    setTempName("");
    setIsRoleRevealed(false);
    setPhase("PASS_TO_PLAYER");
  };

  const handleConfirmName = () => {
    if (!tempName.trim()) return;
    sfxTap();
    setPlayerList(prev => {
      const copy = [...prev];
      copy[currentDistIndex].name = tempName.trim();
      return copy;
    });
    setPhase("SHOW_ROLE");
  };

  const handleRevealRole = () => {
    sfxReveal();
    setIsRoleRevealed(true);
  };

  const handleMemorizedRole = () => {
    sfxTap();
    setIsRoleRevealed(false);
    setTempName("");

    if (currentDistIndex < playerList.length - 1) {
      setCurrentDistIndex(prev => prev + 1);
      setPhase("PASS_TO_PLAYER");
    } else {
      // TOUS LES JOUEURS ONT LEUR RÔLE ➔ LANCEMENT DE LA MISSION
      startMissionPhase();
    }
  };

  // 2. PHASE DE MISSION — avec préparation 5 secondes
  const startMissionPhase = () => {
    const challenge = getRandomChallenge();
    setActiveChallenge(challenge);
    setMissionTimer(challenge.timeLimitSec);
    setTimerActive(false);
    setIsPrepPhase(true);
    setPrepCountdown(5);
    setPhase("MISSION");

    // Le robot lit le titre puis l'instruction pendant la phase de préparation
    setTimeout(() => {
      voiceEngine.speak(
        `Attention équipe ! Mission : ${challenge.title}. ${challenge.instruction}`,
        { tone: "SABOTEUR" }
      );
    }, 300);
  };

  // Décompte de préparation (5 secondes de lecture avant le vrai chrono)
  useEffect(() => {
    if (!isPrepPhase) return;
    if (prepCountdown <= 0) {
      setIsPrepPhase(false);
      setTimerActive(true);
      sfxSuspense();
      voiceEngine.speak("C'est parti ! La mission commence maintenant !", { tone: "SUSPENSE" });
      return;
    }
    const t = setTimeout(() => setPrepCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [isPrepPhase, prepCountdown]);

  // Décompte de la mission réelle
  useEffect(() => {
    let interval: any = null;
    if (timerActive && missionTimer > 0) {
      interval = setInterval(() => {
        setMissionTimer(prev => prev - 1);
      }, 1000);
    } else if (missionTimer === 0 && timerActive) {
      setTimerActive(false);
      sfxError();
      voiceEngine.speak("Temps écoulé ! La mission a-t-elle échoué à cause du Saboteur ?", { tone: "DRAMA" });
    }
    return () => clearInterval(interval);
  }, [timerActive, missionTimer]);

  // 3. VOTE SECRET
  const startVotingPhase = () => {
    sfxTap();
    setTimerActive(false);
    setVoterIndex(0);
    setVotesMap({});
    setPhase("VOTING");

    voiceEngine.speak("Fin de la mission ! Tout le monde ferme les yeux pour le vote secret d'élimination !", { tone: "SUSPENSE" });
  };

  const handleCastVote = (voterId: string, targetId: string) => {
    sfxTap();
    const updated = { ...votesMap, [voterId]: targetId };
    setVotesMap(updated);

    if (voterIndex < playerList.length - 1) {
      setVoterIndex(prev => prev + 1);
    } else {
      // DÉPOUILLEMENT DES VOTES
      tallyVotes(updated);
    }
  };

  const tallyVotes = (finalVotes: Record<string, string>) => {
    const counts: Record<string, number> = {};
    Object.values(finalVotes).forEach(targetId => {
      counts[targetId] = (counts[targetId] || 0) + 1;
    });

    let maxVotes = 0;
    let eliminatedId = "";
    Object.entries(counts).forEach(([id, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = id;
      }
    });

    const eliminated = playerList.find(p => p.id === eliminatedId) || playerList[0];
    setEliminatedPlayer(eliminated);
    setPhase("END_GAME");

    incrementStat("gamesPlayed");
    if (eliminated.gameRole === "SABOTEUR") {
      sfxVictory();
      voiceEngine.speak(`Victoire éclatante des Agents ! ${eliminated.name} était bel et bien le Saboteur !`, { tone: "VICTORY" });
    } else {
      sfxError();
      voiceEngine.speak(`Catastrophe ! Vous avez éliminé ${eliminated.name} qui était un innocent Agent ! Le Saboteur jubile !`, { tone: "DRAMA" });
    }
  };

  // --- ÉCRAN 1 : CONFIGURATION DU JEU ---
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 w-full max-w-md md:max-w-5xl lg:max-w-6xl mx-auto relative">
        <div className="w-full flex items-center justify-between mb-6">
          <button 
            onClick={handleLeaveGame} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer z-50"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div className="flex-1 text-center font-black text-xl flex items-center justify-center gap-2">
            <Bomb className="text-red-500 animate-pulse" /> Le Saboteur Local
          </div>
          <div className="w-16" />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-6 flex flex-col gap-6">
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
                  onClick={() => { setPlayerCount(Math.min(16, playerCount + 1)); sfxTap(); }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold active:scale-90"
                >+</button>
              </div>
            </Card>

            <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-soft space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 block">
                Nombre de Saboteurs
              </span>
              <div className="flex gap-2">
                {[1, 2].map(num => (
                  <button
                    key={num}
                    onClick={() => { setSaboteurCount(num); sfxTap(); }}
                    className={`flex-1 py-3.5 rounded-2xl font-black text-sm border transition-all ${
                      saboteurCount === num
                        ? "bg-red-500 text-white border-red-400 shadow-soft"
                        : "bg-surface border-white/5 text-foreground/60"
                    }`}
                  >
                    {num} Saboteur{num > 1 ? "s" : ""} 💣
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="md:col-span-6">
            <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-soft space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 block">
                Répartition des Rôles ({playerCount} Joueurs)
              </span>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-400"></span> Agents Loyaux
                  </span>
                  <span className="font-extrabold text-blue-400 text-lg">{playerCount - saboteurCount}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span> Saboteur Infiltré
                  </span>
                  <span className="font-extrabold text-red-500 text-lg">{saboteurCount}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md md:max-w-lg mx-auto">
            <Button variant="primary" className="w-full h-16 text-lg shadow-summer-glow gap-2" onClick={handleStartDistribution}>
              <Bomb size={20} /> Distribuer les rôles ({playerCount} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 2 : PASSEZ LE TÉLÉPHONE ---
  if (phase === "PASS_TO_PLAYER") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-6 animate-pulse">
          <Smartphone size={48} />
        </div>
        <h2 className="text-3xl font-black mb-3">Passez le téléphone</h2>
        <p className="text-foreground/50 text-base mb-12">
          Donnez le smartphone au <span className="font-extrabold text-primary">joueur n°{currentDistIndex + 1}</span>.
        </p>

        <Button variant="primary" className="w-full py-5 text-lg" onClick={() => setPhase("ENTER_NAME")}>
          C'est moi ! 👋
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 3 : SAISIE PRÉNOM ---
  if (phase === "ENTER_NAME") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-black mb-2 text-center">Identification</h2>
        <p className="text-foreground/50 text-sm mb-8 text-center">Inscris ton prénom pour recevoir ton rôle secret.</p>

        <Card className="w-full p-8 flex flex-col items-center mb-8 border border-white/10 shadow-glow">
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

        <Button variant="primary" className="w-full py-5 text-lg" disabled={!tempName.trim()} onClick={handleConfirmName}>
          Valider mon prénom
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 4 : DÉCOUVERTE SECRET DU RÔLE ---
  if (phase === "SHOW_ROLE") {
    const currentPlayer = playerList[currentDistIndex];
    const isSaboteur = currentPlayer?.gameRole === "SABOTEUR";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-foreground/50 mb-1">Rôle secret de</h2>
        <h1 className="text-4xl font-black text-primary mb-8">{currentPlayer?.name}</h1>

        <Card className="w-full p-8 flex flex-col items-center justify-center border border-white/10 relative shadow-glow mb-8 min-h-[220px]">
          {isRoleRevealed ? (
            <div className="animate-in fade-in zoom-in duration-300">
              <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block ${isSaboteur ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                {isSaboteur ? "💣 VOUS ÊTES LE SABOTEUR" : "🛡️ VOUS ÊTES UN AGENT LOYAL"}
              </span>
              <p className="text-sm font-bold text-foreground/80 leading-relaxed mt-2">
                {isSaboteur 
                  ? "Votre objectif : Faites échouer les défis de l'équipe sans vous faire repérer !" 
                  : "Votre objectif : Réussissez les défis et éliminez le Saboteur au vote !"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer" onClick={handleRevealRole}>
              <EyeOff size={56} className="text-white/20 mb-4 animate-pulse" />
              <p className="text-lg font-bold">Appuie pour découvrir ton rôle</p>
            </div>
          )}
        </Card>

        <Button 
          variant={isRoleRevealed ? "primary" : "surface"} 
          className="w-full py-5 text-lg"
          onClick={() => {
            if (!isRoleRevealed) handleRevealRole();
            else handleMemorizedRole();
          }}
        >
          {isRoleRevealed ? "J'ai mémorisé mon rôle ✓" : "Voir mon rôle secret"}
        </Button>
      </main>
    );
  }

  // --- ÉCRAN 5 : MISSION D'ÉQUIPE EN COURS ---
  if (phase === "MISSION" && activeChallenge) {

    // 5a. PHASE DE PRÉPARATION (robot lis, compte à rebours 5s)
    if (isPrepPhase) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md md:max-w-4xl mx-auto gap-6">
          <div className="flex flex-col items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-foreground/50">Prochaine mission</span>
            <h2 className="text-3xl font-black text-primary">{activeChallenge.title}</h2>
          </div>

          <Card className="w-full p-7 flex flex-col items-center border border-white/10 shadow-glow bg-surface/90">
            <span className="text-base font-bold leading-relaxed text-foreground/90">{activeChallenge.instruction}</span>
          </Card>

          {/* Grand compte à rebours de préparation */}
          <div className="flex flex-col items-center gap-3 mt-2">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center border-4 border-primary shadow-summer-glow"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2), transparent)" }}
            >
              <span className="text-6xl font-black text-primary">{prepCountdown}</span>
            </div>
            <p className="text-xs font-bold text-foreground/50">
              🤖 Le robot vous lit la mission... La mission démarre dans <span className="text-primary">{prepCountdown}s</span>
            </p>
          </div>
        </main>
      );
    }

    // 5b. MISSION EN COURS avec chrono réel
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          {/* Chrono rouge dynamique */}
          <div className={`flex items-center gap-2 font-black text-xl px-4 py-1.5 rounded-full border ${
            missionTimer <= 10
              ? "text-red-400 bg-red-500/20 border-red-500/40 animate-pulse"
              : "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
          }`}>
            <Clock size={20} /> {missionTimer}s
          </div>
        </div>

        <Card className="w-full p-8 flex flex-col items-center border border-white/10 shadow-glow my-auto">
          <span className="text-xs font-black uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full text-primary mb-4">
            {activeChallenge.title}
          </span>
          <p className="text-lg font-bold mb-4 leading-snug text-foreground/90">{activeChallenge.instruction}</p>
          <p className="text-xs text-foreground/50 font-bold border-t border-white/5 pt-3 mt-1">
            💣 Les Agents doivent réussir. Le Saboteur doit secrètement faire rater !
          </p>
        </Card>

        <div className="w-full flex flex-col gap-3">
          <Button variant="primary" className="w-full py-5 text-lg gap-2 shadow-summer-glow" onClick={startVotingPhase}>
            <Vote size={22} /> Débat & Vote d'élimination →
          </Button>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 6 : VOTE SECRET INDIVIDUEL ---
  if (phase === "VOTING") {
    const currentVoter = playerList[voterIndex];

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-4 md:px-8 max-w-md md:max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-foreground/50 mb-1">Vote secret ({voterIndex + 1}/{playerList.length})</h2>
        <h1 className="text-3xl font-black text-red-500 mb-8">{currentVoter?.name}, qui est le Saboteur ?</h1>

        <div className="w-full space-y-3 mb-8">
          {playerList.map(target => {
            if (target.id === currentVoter?.id) return null;
            return (
              <Card
                key={target.id}
                className="p-5 flex justify-between items-center cursor-pointer hover:border-red-500/50 transition-all active:scale-[0.98] bg-surface/90"
                onClick={() => handleCastVote(currentVoter.id, target.id)}
              >
                <span className="font-bold text-lg">{target.name}</span>
                <Bomb className="text-red-500/40" size={20} />
              </Card>
            );
          })}
        </div>
      </main>
    );
  }

  // --- ÉCRAN 7 : BILAN & RÉVÉLATION DU SABOTEUR ---
  if (phase === "END_GAME" && eliminatedPlayer) {
    const isSaboteurCaught = eliminatedPlayer.gameRole === "SABOTEUR";

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md md:max-w-3xl mx-auto">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-glow ${isSaboteurCaught ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-500/20 text-red-500 border border-red-500/40'}`}>
          {isSaboteurCaught ? <Trophy size={48} /> : <Bomb size={48} />}
        </div>

        <h1 className="text-4xl font-black mb-3">
          {isSaboteurCaught ? "Victoire des Agents !" : "Victoire du Saboteur !"}
        </h1>

        <Card className="w-full p-6 mb-8 border border-white/10 shadow-glow bg-surface/90">
          <p className="text-lg font-black mb-2">
            {eliminatedPlayer.name} a été éliminé(e) par le groupe.
          </p>
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block ${isSaboteurCaught ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            Rôle révélé : {eliminatedPlayer.gameRole === "SABOTEUR" ? "💣 SABOTEUR" : "🛡️ AGENT LOYAL"}
          </span>
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
