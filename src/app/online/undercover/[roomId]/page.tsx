"use client";

import { use, useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Eye, EyeOff, Skull, Trophy, Share, Wifi, WifiOff, Users, Crown, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { generateRoles } from "@/games/undercover/logic";
import { sfxTap, sfxReveal, sfxVictory, sfxError, sfxSuspense } from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

const LOCAL_WORDS = [
  { civilian: "Pomme", undercover: "Poire", category: "Nourriture" },
  { civilian: "Cinéma", undercover: "Théâtre", category: "Loisirs" },
  { civilian: "Océan", undercover: "Mer", category: "Nature" },
  { civilian: "Chien", undercover: "Loup", category: "Animaux" },
];

export default function OnlineUndercoverGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { 
    isConnected, roomState, secretData, 
    joinRoom, toggleReady, startUndercover, sendVote 
  } = useSocket();
  const { guestProfile } = useAppStore();
  const router = useRouter();

  const [showSecret, setShowSecret] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId, "undercover", guestProfile.pseudo);
    }
  }, [isConnected, roomId]);

  // Host starts the game
  const handleHostStart = () => {
    if (!roomState || roomState.players.length < 3) {
      return alert("Il faut au moins 3 joueurs !");
    }

    const playerList = roomState.players;
    const roles = generateRoles(playerList.length);
    const wordPair = LOCAL_WORDS[Math.floor(Math.random() * LOCAL_WORDS.length)];

    const playerSecrets: Record<string, { role: string; word: string }> = {};

    playerList.forEach((p, index) => {
      const role = roles[index];
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else word = "^^";

      playerSecrets[p.id] = { role, word };
    });

    sfxSuspense();
    startUndercover(roomId, playerSecrets);
  };

  // Lobby Phase
  if (!roomState || roomState.state === "LOBBY") {
    const readyCount = roomState?.players.filter(p => p.isReady).length || 0;
    const totalCount = roomState?.players.length || 0;

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <QRCodeModal 
          isOpen={showQR} 
          onClose={() => setShowQR(false)} 
          roomCode={roomId} 
        />

        <div className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="text-foreground/50 text-sm font-bold">← Quitter</button>
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isConnected ? "En ligne" : "Connexion..."}
          </div>
        </div>

        <Card className="w-full p-8 mb-8 text-center bg-surface border border-white/5">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-[0.3em] mb-4">Undercover Online</p>
          <div className="text-4xl font-black tracking-[0.3em] text-primary mb-4">{roomId}</div>
          <Button variant="surface" size="sm" className="gap-2 rounded-full px-6 mx-auto text-xs" onClick={() => setShowQR(true)}>
            <QrCode size={14} /> Afficher QR Code
          </Button>
        </Card>

        <div className="w-full mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Users size={20} /> Joueurs ({totalCount}/20)
          </h2>

          <div className="space-y-3">
            {roomState?.players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-white/5 shadow-soft">
                <span className="font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                  {p.isHost && <Crown size={14} className="text-yellow-400" />}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.isReady ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-foreground/40'}`}>
                  {p.isReady ? "Prêt ✓" : "En attente"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            {roomState?.isHost ? (
              <Button
                variant="primary"
                className="w-full h-16 text-lg"
                onClick={handleHostStart}
              >
                Lancer la partie ({totalCount} joueurs)
              </Button>
            ) : (
              <Button
                variant="primary"
                className="w-full h-16 text-lg"
                onClick={() => { sfxTap(); toggleReady(roomId); }}
              >
                {roomState?.players.find(p => p.id === secretData?.id)?.isReady ? "Annuler" : "Je suis prêt ✓"}
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Active Game Phase (Each player sees their OWN secret word)
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      <div className="w-full text-center py-4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">VYLO Multijoueur</span>
        <h1 className="text-2xl font-black mt-1">Phase de Débat</h1>
      </div>

      {/* Secret Card */}
      <Card className="w-full aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-glow">
        {showSecret ? (
          <div className="animate-in fade-in zoom-in duration-300 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Votre mot secret</span>
            <h2 className="text-4xl font-black mb-4">{secretData?.word || "..."}</h2>
            <p className="text-xs text-foreground/50">
              Rôle : <span className="font-bold text-foreground">{secretData?.role || "Inconnu"}</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center cursor-pointer" onClick={() => { sfxReveal(); setShowSecret(true); }}>
            <EyeOff size={56} className="text-white/20 mb-4 animate-pulse" />
            <p className="text-lg font-bold">Appuyez pour révéler votre mot</p>
            <p className="text-xs text-foreground/40 mt-1">Gardez votre écran caché des autres !</p>
          </div>
        )}
      </Card>

      <div className="w-full space-y-3">
        <Button 
          variant={showSecret ? "surface" : "primary"} 
          className="w-full py-4 text-md"
          onClick={() => { sfxTap(); setShowSecret(!showSecret); }}
        >
          {showSecret ? "Masquer mon mot" : "Voir mon mot"}
        </Button>
      </div>
    </main>
  );
}
