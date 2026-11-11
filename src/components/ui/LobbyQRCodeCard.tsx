"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Copy, Check } from "lucide-react";
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
    <Card className="w-full p-5 bg-surface border border-border z-10 flex flex-col items-center shadow-soft">
      <div className="flex items-center gap-2 mb-3">
        <QrCode size={18} className="text-primary" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Rejoindre en un scan
        </span>
      </div>

      {joinUrl ? (
        <div className="p-3 bg-white rounded-3xl shadow-sm border border-border mb-3 flex items-center justify-center">
          <QRCodeSVG value={joinUrl} size={136} level="M" fgColor="#161824" bgColor="#FFFFFF" />
        </div>
      ) : null}

      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-3xl font-bold text-foreground tracking-widest">{roomCode}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="p-2 rounded-full bg-surface-elevated border border-border text-muted hover:text-foreground transition-colors cursor-pointer"
          title="Copier le lien d'invitation"
        >
          {copied ? <Check size={17} className="text-green" /> : <Copy size={17} />}
        </button>
      </div>

      <span className="text-xs font-semibold text-muted">
        Flashez le QR code avec l'appareil photo
      </span>
    </Card>
  );
}
