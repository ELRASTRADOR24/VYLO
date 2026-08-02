"use client";

import { use, useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Eye, EyeOff, Skull, Trophy, Share, Wifi, WifiOff, Users, Crown, QrCode, Play, Flame, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { WORD_PAIRS_DATABASE, generateRolesFromConfig } from "@/games/undercover/logic";
import { sfxTap, sfxReveal, sfxVictory, sfxError, sfxSuspense, sfxSuccess, sfxJoin } from "@/lib/audio";
import { QRCodeModal } from "@/components/ui/QRCodeModal";

export default function OnlineUndercoverGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { 
    socket, isConnected, roomState, secretData, 
    joinRoom, toggleReady, startUndercover, sendVote 
  } = useSocket();
  const { guestProfile } = useAppStore();
  const router = useRouter();

  const [showSecret, setShowSecret] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isConnected) {
      joinRoom(roomId, "undercover", guestProfile.pseudo);
    }
  }, [isConnected, roomId, guestProfile.pseudo, joinRoom]);

  // Écouter l'arrivée de nouveaux joueurs pour jouer un effet sonore
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
      text: `On joue à Undercover ! Code du salon : ${roomId}`,
      url: `${window.location.origin}/online/undercover/${roomId}`
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      handleCopyCode();
    }
  };

  // Identification de l'hôte et calcul de l'état prêt
  const players = roomState?.players || [];
  const meInRoom = players.find(p => p.id === socket?.id || p.name === guestProfile.pseudo);
  const isHost = meInRoom?.isHost || roomState?.isHost || (players.length > 0 && players[0].name === guestProfile.pseudo);

  const guests = players.filter(p => !p.isHost);
  const guestsReadyCount = guests.filter(p => p.isReady).length;
  const totalCount = players.length;
  const canStart = totalCount >= 3 && (guests.length === 0 || guestsReadyCount === guests.length);

  // Lancement de la partie par l'hôte
  const handleHostStart = () => {
    if (totalCount < 3) {
      sfxError();
      return alert("Il faut au moins 3 joueurs pour lancer un Undercover !");
    }

    // Calcul de la répartition des rôles en fonction du nombre de joueurs
    const undercoverCount = totalCount >= 6 ? 2 : 1;
    const mrWhiteCount = totalCount >= 5 ? 1 : 0;
    const civilianCount = totalCount - undercoverCount - mrWhiteCount;

    const roles = generateRolesFromConfig(totalCount, undercoverCount, mrWhiteCount);
    
    // Sélection aléatoire d'une paire dans notre base de 620+ paires
    const wordPair = WORD_PAIRS_DATABASE[Math.floor(Math.random() * WORD_PAIRS_DATABASE.length)];

    const playerSecrets: Record<string, { role: string; word: string; category: string }> = {};

    players.forEach((p, index) => {
      const role = roles[index];
      let word = "";
      if (role === "Civilian") word = wordPair.civilian;
      else if (role === "Undercover") word = wordPair.undercover;
      else word = "Mr. White"; // Mr. White n'a pas de mot secret

      playerSecrets[p.id] = { role, word, category: wordPair.category };
    });

    sfxSuspense();
    startUndercover(roomId, playerSecrets);
  };

  // Phase LOBBY (Attente des joueurs)
  if (!roomState || roomState.state === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto pb-32">
        <QRCodeModal 
          isOpen={showQR} 
          onClose={() => setShowQR(false)} 
          roomCode={roomId} 
        />

        {/* Connection Status */}
        <div className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="text-foreground/50 text-sm font-bold hover:text-foreground">← Quitter</button>
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isConnected ? "En ligne" : "Connexion..."}
          </div>
        </div>

        {/* Code du salon */}
        <Card className="w-full p-8 mb-8 text-center bg-surface/80 border border-white/10 shadow-soft">
          <p className="text-xs font-black text-foreground/50 uppercase tracking-[0.3em] mb-3">Undercover Online</p>
          <div className="text-5xl font-black tracking-[0.4em] text-primary mb-6">{roomId}</div>
          <div className="flex gap-2 justify-center">
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={() => setShowQR(true)}>
              <QrCode size={14} /> QR Code
            </Button>
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleCopyCode}>
              {copied ? "Copié !" : "Copier"}
            </Button>
            <Button variant="surface" size="sm" className="gap-1.5 rounded-full px-4 text-xs" onClick={handleShare}>
              <Share size={14} /> Inviter
            </Button>
          </div>
        </Card>

        {/* Liste des joueurs */}
        <div className="w-full mb-8">
          <h2 className="text-lg font-black flex items-center gap-2 mb-4">
            <Users size={20} className="text-primary" /> Joueurs ({totalCount}/20)
          </h2>

          <div className="space-y-3">
            {players.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-surface/90 p-4 rounded-2xl border border-white/10 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-summer text-white flex items-center justify-center font-black">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold flex items-center gap-2">
                    {p.name}
                    {p.isHost && <Crown size={15} className="text-amber-400 fill-amber-400" />}
                  </span>
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

        {/* Barre d'action fixe */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            {isHost ? (
              <Button
                variant="primary"
                className="w-full h-16 text-lg font-black gap-2 shadow-summer-glow"
                onClick={handleHostStart}
                disabled={!canStart}
              >
                <Play size={20} className="fill-current" />
                {totalCount < 3 
                  ? "Attente de 3 joueurs min." 
                  : canStart 
                    ? `Lancer la partie (${totalCount} joueurs) 🚀` 
                    : `En attente de prêts (${guestsReadyCount}/${guests.length})`}
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

  // Phase de JEU ACTIF (Partie lancée — Chaque joueur voit son propre mot secret)
  const roleLabel = secretData?.role === "Civilian" ? "Civil" : secretData?.role === "Undercover" ? "Undercover" : "Mr. White";
  const roleColor = secretData?.role === "Civilian" ? "text-cyan-400" : secretData?.role === "Undercover" ? "text-red-400" : "text-purple-400";

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      <div className="w-full text-center py-4">
        <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1">
          <Flame size={14} className="fill-primary" /> VYLO Undercover Online
        </span>
        <h1 className="text-2xl font-black mt-1">Phase de Débat</h1>
        {secretData?.category && (
          <p className="text-xs text-foreground/50 font-bold mt-1">
            Thème : <span className="text-primary">{secretData.category}</span>
          </p>
        )}
      </div>

      {/* Carte du mot secret */}
      <Card className="w-full aspect-square flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-summer-glow border border-white/10 bg-surface/90 my-auto">
        {showSecret ? (
          <div className="animate-in fade-in zoom-in duration-300 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">Votre mot secret</span>
            <h2 className="text-4xl font-black mb-4 tracking-tight">{secretData?.word || "..."}</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs text-foreground/60 font-bold">Rôle :</span>
              <span className={`text-xs font-black uppercase tracking-wider ${roleColor}`}>{roleLabel}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center cursor-pointer" onClick={() => { sfxReveal(); setShowSecret(true); }}>
            <EyeOff size={56} className="text-primary/40 mb-4 animate-pulse" />
            <p className="text-xl font-black">Appuyez pour voir votre mot</p>
            <p className="text-xs text-foreground/50 mt-2 font-bold">Ne montrez pas votre écran aux autres !</p>
          </div>
        )}
      </Card>

      {/* Joueurs de la partie */}
      <div className="w-full mb-6">
        <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3 text-center">Joueurs dans la partie ({players.length})</p>
        <div className="flex flex-wrap justify-center gap-2">
          {players.map((p) => (
            <div key={p.id} className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-xs font-bold border border-white/5">
              <span>{p.name}</span>
              {p.isHost && <Crown size={12} className="text-amber-400 fill-amber-400" />}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full space-y-3">
        <Button 
          variant={showSecret ? "surface" : "primary"} 
          className="w-full py-4 text-md font-black shadow-summer-glow"
          onClick={() => { sfxTap(); setShowSecret(!showSecret); }}
        >
          {showSecret ? "Masquer mon mot secret" : "Révéler mon mot secret"}
        </Button>
      </div>
    </main>
  );
}
