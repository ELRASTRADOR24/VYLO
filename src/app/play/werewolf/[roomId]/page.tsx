"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronLeft, Copy, UserPlus, Play, Moon, Sun, Skull, Eye, EyeOff, Trophy, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateWerewolfRoles, WerewolfRole, ROLE_INFO } from "@/games/werewolf/logic";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";
import { werewolfConfig } from "@/games/werewolf/config";

type Phase = "LOBBY" | "DISTRIBUTION" | "NIGHT" | "DAY_DEBATE" | "DAY_VOTE" | "END";

export default function WerewolfGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { players, initGame, addPlayer, removePlayer, updatePlayer } = useEngineStore();
  const { incrementStat } = useAppStore();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("LOBBY");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [round, setRound] = useState(1);
  const [nightTarget, setNightTarget] = useState<string | null>(null);

  // Typed player data
  const [rolesMap, setRolesMap] = useState<Record<string, { role: WerewolfRole; isAlive: boolean }>>({});
  const playerArray = Object.values(players);
  const alivePlayers = playerArray.filter(p => rolesMap[p.id]?.isAlive !== false);

  useEffect(() => {
    initGame(werewolfConfig, "local", roomId);
  }, [roomId]);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    addPlayer({ id: Date.now().toString(), name: newPlayerName.trim(), isHost: false, isReady: true, isConnected: true, score: 0 });
    setNewPlayerName("");
    sfxJoin();
  };

  const handleStartGame = () => {
    if (playerArray.length < 6) return alert("Il faut au moins 6 joueurs pour le Loup-Garou !");
    const roles = generateWerewolfRoles(playerArray.length);
    const newRolesMap: Record<string, { role: WerewolfRole; isAlive: boolean }> = {};
    playerArray.forEach((p, i) => {
      newRolesMap[p.id] = { role: roles[i], isAlive: true };
    });
    setRolesMap(newRolesMap);
    setCurrentPlayerIndex(0);
    setShowRole(false);
    sfxSuspense();
    setPhase("DISTRIBUTION");
  };

  const nextDistribution = () => {
    if (currentPlayerIndex < playerArray.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setShowRole(false);
    } else {
      setPhase("NIGHT");
      setRound(1);
    }
  };

  const handleNightKill = (targetId: string) => {
    setNightTarget(targetId);
    sfxError();
    // Transition vers le jour
    setTimeout(() => {
      setRolesMap(prev => ({
        ...prev,
        [targetId]: { ...prev[targetId], isAlive: false }
      }));
      checkWinCondition(targetId);
    }, 800);
  };

  const handleDayEliminate = (targetId: string) => {
    sfxError();
    setRolesMap(prev => ({
      ...prev,
      [targetId]: { ...prev[targetId], isAlive: false }
    }));
    checkWinCondition(targetId);
  };

  const checkWinCondition = (justKilledId: string) => {
    const updatedAlive = playerArray.filter(p => {
      if (p.id === justKilledId) return false;
      return rolesMap[p.id]?.isAlive !== false;
    });
    const wolvesAlive = updatedAlive.filter(p => rolesMap[p.id]?.role === "Loup-Garou").length;
    const villagersAlive = updatedAlive.filter(p => rolesMap[p.id]?.role !== "Loup-Garou").length;

    if (wolvesAlive === 0) {
      sfxVictory();
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("civilianWins");
      setPhase("END");
    } else if (wolvesAlive >= villagersAlive) {
      sfxVictory();
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");
      setPhase("END");
    } else {
      // Continue
      if (phase === "NIGHT" || nightTarget) {
        setNightTarget(null);
        setPhase("DAY_DEBATE");
      } else {
        setRound(prev => prev + 1);
        setPhase("NIGHT");
      }
    }
  };

  // ─── LOBBY ──────────────────────────────────────────────
  if (phase === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <div className="w-full flex items-center mb-10">
          <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center font-bold text-xl">🐺 Loup-Garou</div>
          <div className="h-12 w-12" />
        </div>

        <Card className="w-full p-6 mb-8 text-center">
          <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2">Code du salon</p>
          <div className="text-4xl font-extrabold text-purple-400 flex items-center justify-center gap-4">
            {roomId}
            <button className="bg-white/5 p-2 rounded-full"><Copy size={20} /></button>
          </div>
        </Card>

        <div className="w-full mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
            Joueurs <span className="text-purple-400">{playerArray.length}/20</span>
          </h2>
          <div className="flex gap-2 mb-6">
            <input
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Prénom..."
              className="flex-1 bg-surface border-2 border-white/5 rounded-2xl px-4 py-3 focus:border-purple-400 outline-none transition-colors"
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddPlayer(); }}
            />
            <Button variant="surface" className="px-6 rounded-2xl" onClick={handleAddPlayer}>
              <UserPlus size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            {playerArray.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5">
                <span className="font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                </span>
                <button onClick={() => removePlayer(p.id)} className="text-red-400 p-2 hover:bg-red-400/10 rounded-full">
                  <Skull size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
          <div className="max-w-md mx-auto">
            <Button variant="primary" className="w-full h-16 text-lg gap-2 bg-purple-600 hover:bg-purple-700 border-purple-600" onClick={handleStartGame}>
              <Play size={20} /> Lancer ({playerArray.length} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // ─── DISTRIBUTION DES RÔLES ─────────────────────────────
  if (phase === "DISTRIBUTION") {
    const currentPlayer = playerArray[currentPlayerIndex];
    const roleData = rolesMap[currentPlayer?.id];
    const roleInfo = roleData ? ROLE_INFO[roleData.role] : null;

    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-foreground/50">Tour de</h2>
        <h1 className="text-4xl font-black text-purple-400 mb-12">{currentPlayer?.name}</h1>

        <Card className="w-full aspect-square flex flex-col items-center justify-center p-8 mb-8 relative overflow-hidden">
          {showRole && roleInfo ? (
            <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
              <span className="text-7xl mb-6">{roleInfo.emoji}</span>
              <h2 className={`text-3xl font-black mb-3 ${roleInfo.color}`}>{roleData!.role}</h2>
              <p className="text-foreground/60 text-lg max-w-xs">{roleInfo.description}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <EyeOff size={48} className="text-white/20 mb-4" />
              <p className="text-lg font-medium text-white/50">Rôle caché</p>
            </div>
          )}
        </Card>

        <Button
          variant="primary"
          className="w-full py-4 text-lg bg-purple-600 hover:bg-purple-700 border-purple-600"
          onClick={() => {
            if (!showRole) { sfxReveal(); setShowRole(true); }
            else { sfxTap(); nextDistribution(); }
          }}
        >
          {showRole ? "J'ai compris mon rôle ✓" : "Voir mon rôle"}
        </Button>
      </main>
    );
  }

  // ─── NUIT ───────────────────────────────────────────────
  if (phase === "NIGHT") {
    const aliveNonWolves = alivePlayers.filter(p => rolesMap[p.id]?.role !== "Loup-Garou");

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto bg-gradient-to-b from-[#0a0a1a] to-background">
        <div className="flex items-center gap-3 mb-2">
          <Moon size={28} className="text-purple-400" />
          <h1 className="text-3xl font-black">Nuit {round}</h1>
        </div>
        <p className="text-foreground/50 mb-10 text-center">Les Loups-Garous choisissent leur victime.</p>

        <div className="w-full space-y-3 mb-12">
          {aliveNonWolves.map(p => (
            <Card
              key={p.id}
              className="p-5 flex justify-between items-center cursor-pointer hover:border-red-500/50 transition-all active:scale-[0.98]"
              onClick={() => {
                if (confirm(`Les Loups dévorent ${p.name} ?`)) {
                  handleNightKill(p.id);
                }
              }}
            >
              <span className="font-bold text-lg">{p.name}</span>
              <Skull className="text-white/20" size={20} />
            </Card>
          ))}
        </div>

        <p className="text-xs text-foreground/30 text-center">Passez le téléphone aux Loups-Garous pour qu'ils choisissent en secret.</p>
      </main>
    );
  }

  // ─── JOUR — DÉBAT ───────────────────────────────────────
  if (phase === "DAY_DEBATE") {
    const lastKilled = nightTarget ? playerArray.find(p => p.id === nightTarget) : null;

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Sun size={28} className="text-yellow-400" />
          <h1 className="text-3xl font-black">Jour {round}</h1>
        </div>

        {lastKilled && (
          <Card className="w-full p-6 mb-8 text-center border-red-500/30 bg-red-500/5">
            <Skull size={32} className="text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-red-400 mb-1">{lastKilled.name} a été dévoré(e) !</h2>
            <p className="text-foreground/50 text-sm">
              C'était : <span className="font-bold">{ROLE_INFO[rolesMap[lastKilled.id]?.role]?.emoji} {rolesMap[lastKilled.id]?.role}</span>
            </p>
          </Card>
        )}

        <p className="text-foreground/50 mb-8 text-center">Le village se réveille. Débattez et trouvez les Loups !</p>

        <div className="w-full grid grid-cols-3 gap-3 mb-12">
          {playerArray.map(p => {
            const isAlive = rolesMap[p.id]?.isAlive !== false;
            return (
              <div key={p.id} className={`flex flex-col items-center p-4 rounded-2xl ${isAlive ? 'bg-surface' : 'bg-surface/30 opacity-40'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-bold ${isAlive ? 'bg-purple-500/20 text-purple-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isAlive ? p.name.charAt(0) : "💀"}
                </div>
                <span className="text-xs font-bold text-center truncate w-full">{p.name}</span>
                {!isAlive && <span className="text-[10px] text-red-400 mt-1">{rolesMap[p.id]?.role}</span>}
              </div>
            );
          })}
        </div>

        <Button
          variant="primary"
          className="w-full py-4 text-lg bg-red-500 hover:bg-red-600 border-red-500"
          onClick={() => { sfxSuspense(); setPhase("DAY_VOTE"); }}
        >
          Passer au vote d'élimination
        </Button>
      </main>
    );
  }

  // ─── JOUR — VOTE ────────────────────────────────────────
  if (phase === "DAY_VOTE") {
    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <h1 className="text-3xl font-black mb-2">Vote du Village</h1>
        <p className="text-red-400 mb-8">Qui sera éliminé ?</p>

        <div className="w-full space-y-3 mb-8">
          {alivePlayers.map(p => (
            <Card
              key={p.id}
              className="p-5 flex justify-between items-center cursor-pointer hover:border-red-500/50 transition-all active:scale-[0.98]"
              onClick={() => {
                if (confirm(`Le village élimine ${p.name} ?`)) {
                  handleDayEliminate(p.id);
                }
              }}
            >
              <span className="font-bold text-lg">{p.name}</span>
              <Skull className="text-white/20" size={20} />
            </Card>
          ))}
        </div>

        <Button variant="surface" className="w-full" onClick={() => setPhase("DAY_DEBATE")}>
          Retour au débat
        </Button>
      </main>
    );
  }

  // ─── FIN ────────────────────────────────────────────────
  if (phase === "END") {
    const wolvesAlive = playerArray.filter(p => rolesMap[p.id]?.isAlive !== false && rolesMap[p.id]?.role === "Loup-Garou").length;
    const villageWins = wolvesAlive === 0;

    const handleShare = async () => {
      const shareData = {
        title: "Soirée VYLO — Loup-Garou",
        text: `Partie épique de Loup-Garou ! Les ${villageWins ? "Villageois" : "Loups-Garous"} ont gagné après ${round} tours. Rejoins-nous !`,
        url: "https://vylo.app"
      };
      if (navigator.share) {
        try { await navigator.share(shareData); }
        catch (e) { console.error(e); }
      }
    };

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <h1 className="text-3xl font-black mb-8">Bilan de la partie</h1>

        <Card className="w-full flex flex-col items-center p-8 mb-8 overflow-hidden relative shadow-glow">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-red-500"></div>
          <span className="text-6xl mb-4">{villageWins ? "🏘️" : "🐺"}</span>
          <h2 className="text-2xl font-bold mb-2">
            Victoire des {villageWins ? "Villageois" : "Loups-Garous"} !
          </h2>
          <p className="text-foreground/50 text-sm mb-6">{round} tours joués.</p>

          <div className="w-full space-y-2">
            {playerArray.map(p => {
              const info = ROLE_INFO[rolesMap[p.id]?.role];
              const alive = rolesMap[p.id]?.isAlive !== false;
              return (
                <div key={p.id} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                  <span className={`font-bold flex items-center gap-2 ${!alive ? 'line-through text-foreground/30' : ''}`}>
                    {!alive && <Skull size={14} className="text-red-500" />} {p.name}
                  </span>
                  <span className={`font-bold ${info?.color || ''}`}>
                    {info?.emoji} {rolesMap[p.id]?.role}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Button variant="primary" className="w-full py-4 text-lg mb-4 gap-2 bg-purple-600 border-purple-600" onClick={handleShare}>
          <Share size={20} /> Partager
        </Button>

        <Button variant="surface" className="w-full py-4 text-lg" onClick={() => { setPhase("LOBBY"); setRolesMap({}); }}>
          Rejouer
        </Button>
      </main>
    );
  }

  return null;
}
