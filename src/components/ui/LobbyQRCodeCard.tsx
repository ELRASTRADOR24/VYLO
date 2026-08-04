"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Copy, Check, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import { sfxTap } from "@/lib/audio";

interface LobbyQRCodeCardProps {
  roomCode: string;
}

export function LobbyQRCodeCard({ roomCode }: LobbyQRCodeCardProps) {
  const [copied, setCopied] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setJoinUrl(`${window.location.origin}/online/${roomCode}`);
    }
  }, [roomCode]);

  const handleCopy = () => {
    sfxTap();
    if (joinUrl) {
      navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full p-5 bg-surface/90 border-2 border-primary/40 z-10 flex flex-col items-center shadow-glow">
      <div className="flex items-center gap-2 mb-3">
        <QrCode size={20} className="text-primary animate-pulse" />
        <span className="text-xs font-black uppercase tracking-widest text-primary">Rejoindre en 1 Secondes</span>
      </div>

      {joinUrl ? (
        <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-primary/20 mb-3 flex items-center justify-center">
          <QRCodeSVG 
            value={joinUrl} 
            size={140} 
            level="M" 
            fgColor="#0F172A"
            bgColor="#FFFFFF"
          />
        </div>
      ) : null}

      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl font-black text-white tracking-widest">{roomCode}</span>
        <button 
          type="button"
          onClick={handleCopy} 
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground/70 hover:text-white transition-colors"
          title="Copier le lien d'invitation"
        >
          {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
        </button>
      </div>

      <span className="text-[11px] font-bold text-foreground/50">
        Flashez le QR Code avec votre appareil photo pour rejoindre !
      </span>
    </Card>
  );
}
