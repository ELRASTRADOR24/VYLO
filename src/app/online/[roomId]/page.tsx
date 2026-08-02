"use client";

import { use, useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Copy, Check, Users, Wifi, WifiOff, Crown, QrCode, Share, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { sfxJoin, sfxTap, sfxSuccess } from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineLobby({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { socket, isConnected, roomState, joinRoom, toggleReady, startGame } = useSocket();
  const { guestProfile } = useAppStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId, "undercover", guestProfile.pseudo);
    }
  }, [isConnected, roomId, guestProfile.pseudo, joinRoom]);

  // Redirection automatique de tous les joueurs quand la partie démarre !
  useEffect(() => {
    if (roomState?.state === "PLAYING") {
      sfxSuccess();
      const gameId = roomState.gameId || "undercover";
      router.push(`/play/${gameId}/${roomId}`);
    }
  }, [roomState?.state, roomState?.gameId, roomId, router]);

  // Écouter les nouveaux joueurs pour le son
  const playerCount = roomState?.players.length || 0;
  useEffect(() => {
    if (playerCount > 1) sfxJoin();
  }, [playerCount]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    sfxTap();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Rejoins-moi sur VYLO !",
      text: `On joue ensemble ! Code du salon : ${roomId}`,
      url: `${window.location.origin}/online/${roomId}`
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      handleCopyCode();
    }
  };

  const handleStart = () => {
    sfxSuccess();
    startGame(roomId);
  };

  // Identification précise du rôle de l'utilisateur (Host ou Invité)
  const players = roomState?.players || [];
  const meInRoom = players.find(p => p.id === socket?.id || p.name === guestProfile.pseudo);
  const isHost = meInRoom?.isHost || roomState?.isHost || (players.length > 0 && players[0].name === guestProfile.pseudo);

  const guests = players.filter(p => !p.isHost);
  const guestsReadyCount = guests.filter(p => p.isReady).length;
  const totalCount = players.length;
  const canStart = totalCount >= 2 && (guests.length === 0 || guestsReadyCount === guests.length);

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto pb-32">
      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        roomCode={roomId} 
      />

      {/* Connection Status */}
      <div className="w-full flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="text-foreground/50 text-sm font-bold hover:text-foreground">← Retour</button>
        <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConnected ? "En ligne" : "Connexion..."}
        </div>
      </div>

      {/* Room Code */}
      <Card className="w-full p-8 mb-8 text-center bg-surface/80 border border-white/10 shadow-soft">
        <p className="text-xs font-black text-foreground/50 uppercase tracking-[0.3em] mb-3">Code du salon</p>
        <div className="text-5xl font-black tracking-[0.4em] text-primary mb-6">{roomId}</div>
        <div className="flex gap-2 justify-center">
          <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={() => setShowQR(true)}>
            <QrCode size={14} /> QR Code
          </Button>
          <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleCopyCode}>
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? "Copié !" : "Copier"}
          </Button>
          <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleShare}>
            <Share size={14} /> Inviter
          </Button>
        </div>
      </Card>

      {/* Players List */}
      <div className="w-full mb-8">
        <h2 className="text-lg font-black flex items-center gap-2 mb-4">
          <Users size={20} className="text-primary" /> Joueurs ({totalCount})
        </h2>

        <div className="space-y-3">
          {players.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-surface/90 p-4 rounded-2xl border border-white/10 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-summer text-white flex items-center justify-center font-black">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold flex items-center gap-2">
                    {p.name}
                    {p.isHost && <Crown size={15} className="text-amber-400 fill-amber-400" />}
                  </span>
                </div>
              </div>
              <span className={`text-xs font-black px-3 py-1.5 rounded-full ${p.isReady ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-foreground/50 border border-white/10'}`}>
                {p.isReady ? "Prêt ✓" : "En attente"}
              </span>
            </div>
          ))}

          {players.length === 0 && (
            <div className="text-center py-8 text-foreground/40">
              <p className="animate-pulse font-bold">En attente de connexion...</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          {isHost ? (
            <Button
              variant="primary"
              className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
              onClick={handleStart}
              disabled={!canStart}
            >
              <Play size={20} className="fill-current" />
              {canStart ? "Lancer la partie 🚀" : `En attente de prêts (${guestsReadyCount}/${guests.length})`}
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
