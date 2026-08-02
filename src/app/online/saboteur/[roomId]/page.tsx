"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, ShieldAlert, Skull, Trophy, Eye, EyeOff, 
  Share, QrCode, Play, Bomb, Flame, Vote, RefreshCw, Clock
} from "lucide-react";
import { 
  SaboteurRole, SaboteurChallenge, 
  generateSaboteurRoles, getRandomChallenge 
} from "@/games/saboteur/logic";
import { voiceEngine } from "@/lib/voiceEngine";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin } from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineSaboteurGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile, incrementStat } = useAppStore();

  const { socket, roomState, secretData, joinRoom, startSaboteur, castVote, restartLobby } = useSocket();
  const isHost = socket && roomState ? roomState.players.find(p => p.id === socket.id)?.isHost : false;

  const [saboteurCount, setSaboteurCount] = useState<number>(1);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  useEffect(() => {
    joinRoom(roomId, "saboteur", guestProfile.pseudo, guestProfile.avatar);
  }, [roomId, guestProfile.pseudo, guestProfile.avatar]);

  const handleCopyLink = () => {
    sfxTap();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleHostStart = () => {
    sfxSuspense();
    const players = roomState?.players || [];
    if (players.length < 3) {
      return alert("Il faut au moins 3 joueurs pour lancer une partie du Saboteur !");
    }

    const roles = generateSaboteurRoles(players.length, saboteurCount);
    const playerSecrets: Record<string, { role: string; saboteurHint?: string }> = {};

    const challenge = getRandomChallenge();

    players.forEach((p, index) => {
      const role = roles[index];
      playerSecrets[p.id] = {
        role,
        saboteurHint: role === "SABOTEUR" ? challenge.saboteurHint : undefined,
      };
    });

    voiceEngine.speak(`Partie du Saboteur lancée par l'hôte ! Préparez-vous !`, { tone: "SABOTEUR" });
    startSaboteur(roomId, playerSecrets, challenge);
  };

  const handleLeaveGame = () => {
    sfxTap();
    voiceEngine.stop();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/library");
    }
  };

  const handleVoteSubmit = () => {
    if (!selectedTargetId) return;
    sfxSuccess();
    castVote(roomId, selectedTargetId);
  };

  // 1. LOBBY
  if (!roomState || roomState.state === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto pb-36">
        <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} roomCode={roomId} />

        <div className="w-full flex items-center justify-between mb-6">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Salon : {roomId}
          </span>
          <div className="flex gap-2">
            <button onClick={() => setShowQR(true)} className="p-2.5 bg-surface/90 border border-white/10 rounded-full text-foreground hover:bg-white/10">
              <QrCode size={18} />
            </button>
            <button onClick={handleCopyLink} className="p-2.5 bg-surface/90 border border-white/10 rounded-full text-foreground hover:bg-white/10">
              <Share size={18} />
            </button>
          </div>
        </div>

        <div className="w-full text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3 border border-red-500/30">
            <Bomb size={32} />
          </div>
          <h1 className="text-3xl font-black mb-1">Le Saboteur Online</h1>
          <p className="text-xs text-foreground/50 font-bold">Attente des joueurs ({roomState?.players?.length || 0} inscrits)</p>
        </div>

        {/* Liste des Joueurs */}
        <Card className="w-full p-6 mb-6 bg-surface/90 border border-white/10 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 block">Joueurs dans le Salon</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {roomState?.players?.map(p => (
              <div key={p.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">{p.avatar}</span>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-xs truncate">{p.name}</span>
                  {p.isHost && <span className="text-[9px] font-black text-primary uppercase">Hôte</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {isHost && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 border-t border-white/10 z-50">
            <div className="max-w-md mx-auto">
              <Button variant="primary" className="w-full h-16 text-lg shadow-summer-glow gap-2" onClick={handleHostStart}>
                <Play size={20} /> Lancer la Partie (Hôte)
              </Button>
            </div>
          </div>
        )}
      </main>
    );
  }

  // 2. EN JEU (SECRET ET VOTE)
  const mySecret = secretData || { role: "AGENT" };
  const isSaboteur = mySecret.role === "SABOTEUR";

  return (
    <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-36">
      <div className="w-full flex items-center justify-between mb-6">
        <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>
        <span className="text-xs font-black text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
          En Ligne : {roomId}
        </span>
      </div>

      {/* Rôle secret personnel */}
      <Card className="w-full p-6 mb-6 bg-surface/90 border border-white/10 shadow-glow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-foreground/50">Votre rôle secret sur ce téléphone</span>
          <button onClick={() => setShowSecret(!showSecret)} className="text-xs font-bold text-primary flex items-center gap-1">
            {showSecret ? <EyeOff size={14} /> : <Eye size={14} />} {showSecret ? "Masquer" : "Afficher"}
          </button>
        </div>

        {showSecret ? (
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className={`text-sm font-black uppercase tracking-widest px-3 py-1 rounded-full ${isSaboteur ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {isSaboteur ? "💣 VOUS ÊTES LE SABOTEUR" : "🛡️ VOUS ÊTES UN AGENT"}
            </span>
            <p className="text-xs font-bold text-foreground/70 mt-3">
              {isSaboteur ? "Faites échouer la mission d'équipe discrètement !" : "Réussissez la mission et trouvez le Saboteur !"}
            </p>
          </div>
        ) : (
          <p className="text-xs font-bold text-foreground/40 italic">Rôle caché (Appuyez sur Afficher pour vérifier)</p>
        )}
      </Card>

      {/* PHASE DE VOTE ONLINE */}
      {roomState.state === "VOTING" && (
        <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-glow space-y-4">
          <h2 className="text-2xl font-black text-red-500">Phase de Vote</h2>
          <p className="text-xs text-foreground/50 font-bold">Sélectionnez le joueur que vous suspectez d'être le Saboteur :</p>

          <div className="space-y-2">
            {roomState.players.map(p => {
              if (p.id === socket?.id) return null;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedTargetId(p.id)}
                  className={`w-full p-4 rounded-2xl border font-bold flex justify-between items-center transition-all ${
                    selectedTargetId === p.id 
                      ? "bg-red-500 text-white border-red-400" 
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>{p.avatar} {p.name}</span>
                  <Bomb size={18} />
                </button>
              );
            })}
          </div>

          <Button variant="primary" className="w-full py-4 text-base" disabled={!selectedTargetId} onClick={handleVoteSubmit}>
            Confirmer mon Vote 💣
          </Button>
        </Card>
      )}

      {/* RESULTAT DE LA PARTIE */}
      {roomState.state === "END_GAME" && (
        <Card className="w-full p-8 bg-surface/90 border border-white/10 shadow-glow text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black">Fin de la Partie</h2>
          <p className="text-sm font-bold text-foreground/70">Le Saboteur et les rôles ont été révélés sur tous les téléphones !</p>

          {isHost && (
            <Button variant="primary" className="w-full py-5 text-lg gap-2 mt-4" onClick={() => restartLobby(roomId)}>
              <RefreshCw size={20} /> Rejouer au Salon
            </Button>
          )}
        </Card>
      )}
    </main>
  );
}
