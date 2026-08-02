"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, QrCode, Share, Users, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Lobby() {
  const { roomId } = useParams();
  const router = useRouter();

  const players = [
    { name: "Vous", isHost: true, isReady: true, color: "bg-primary" },
    { name: "Alex", isHost: false, isReady: true, color: "bg-accent" },
    { name: "Sam", isHost: false, isReady: false, color: "bg-pink" },
  ];

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-8 pb-32">
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="h-12 w-12 bg-surface rounded-full flex items-center justify-center text-foreground/50">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full max-w-md flex flex-col items-center mb-10">
        <p className="text-foreground/50 font-bold uppercase tracking-widest text-xs mb-3">Code du salon</p>
        <div className="flex items-center gap-4 bg-surface px-8 py-4 rounded-3xl shadow-soft border border-white/5">
          <span className="text-5xl font-extrabold tracking-widest text-primary">{roomId}</span>
        </div>
        <div className="flex gap-4 mt-6">
          <Button variant="surface" size="sm" className="gap-2 rounded-full px-6">
            <QrCode className="w-4 h-4" /> QR Code
          </Button>
          <Button variant="surface" size="sm" className="gap-2 rounded-full px-6">
            <Share className="w-4 h-4" /> Inviter
          </Button>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Users className="w-5 h-5" /> Joueurs ({players.length}/8)
          </h2>
        </div>
        
        {players.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-soft", p.color)}>
                {p.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{p.name}</span>
                {p.isHost && <span className="text-xs text-primary font-bold">Hôte</span>}
              </div>
            </div>
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", p.isReady ? "bg-green-500/20 text-green-400" : "bg-white/5 text-foreground/40")}>
              {p.isReady ? "Prêt" : "En attente"}
            </span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
        <div className="max-w-md mx-auto">
          <Button variant="primary" className="w-full h-16 text-lg" onClick={() => router.push(`/play/undercover/${roomId}`)}>
            Aller au jeu (Test MVP)
          </Button>
        </div>
      </div>
    </main>
  );
}
