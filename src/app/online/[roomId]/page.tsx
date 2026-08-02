"use client";

import { use, useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Copy, Check, Users, Wifi, WifiOff, Crown, QrCode, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { sfxJoin, sfxTap, sfxSuccess } from "@/lib/audio";

import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineLobby({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { isConnected, roomState, joinRoom, toggleReady, startGame } = useSocket();
  const { guestProfile } = useAppStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId, "undercover", guestProfile.pseudo);
    }
  }, [isConnected, roomId]);

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

  const readyCount = roomState?.players.filter(p => p.isReady).length || 0;
  const totalCount = roomState?.players.length || 0;
  const allReady = totalCount >= 3 && readyCount === totalCount;

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        roomCode={roomId} 
      />

      {/* Connection Status */}
      <div className="w-full flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="text-foreground/50 text-sm font-bold">← Retour</button>
        <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConnected ? "En ligne" : "Connexion..."}
        </div>
      </div>

      {/* Room Code */}
      <Card className="w-full p-8 mb-8 text-center bg-surface border border-white/5">
        <p className="text-xs font-bold text-foreground/40 uppercase tracking-[0.3em] mb-4">Code du salon</p>
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
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <Users size={20} /> Joueurs ({totalCount})
        </h2>

        <div className="space-y-3">
          {roomState?.players.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-white/5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold flex items-center gap-2">
                    {p.name}
                    {p.isHost && <Crown size={14} className="text-yellow-400" />}
                  </span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${p.isReady ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-foreground/40'}`}>
                {p.isReady ? "Prêt ✓" : "En attente"}
              </span>
            </div>
          ))}

          {(!roomState || roomState.players.length === 0) && (
            <div className="text-center py-8 text-foreground/30">
              <p className="animate-pulse">En attente de connexion...</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          {roomState?.isHost ? (
            <Button
              variant="primary"
              className="w-full h-16 text-lg"
              onClick={handleStart}
              disabled={!allReady}
            >
              {allReady ? "Lancer la partie 🚀" : `En attente (${readyCount}/${totalCount} prêts)`}
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-full h-16 text-lg"
              onClick={() => { sfxTap(); toggleReady(roomId); }}
            >
              {roomState?.players.find(p => p.id === "")?.isReady ? "Annuler" : "Je suis prêt ✓"}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
