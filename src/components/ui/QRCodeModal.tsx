"use client";

import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import Card from "./Card";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  url?: string;
}

export function QRCodeModal({ isOpen, onClose, roomCode, url }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const joinUrl = url || (typeof window !== "undefined" ? `${window.location.origin}/online/${roomCode}` : `https://vylo.app/online/${roomCode}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <Card className="w-full max-w-sm p-6 flex flex-col items-center relative border border-white/10 bg-surface-elevated shadow-glow">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground active:scale-95 transition-all"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-extrabold mb-1">Rejoindre la partie</h3>
        <p className="text-xs text-foreground/50 mb-6 text-center">Scannez le QR Code avec votre appareil photo</p>

        <div className="p-4 bg-white rounded-3xl mb-6 shadow-soft flex items-center justify-center">
          <QRCodeSVG 
            value={joinUrl} 
            size={200}
            bgColor="#FFFFFF"
            fgColor="#0B0F19"
            level="H"
            marginSize={1}
          />
        </div>

        <div className="text-3xl font-black tracking-[0.3em] text-primary mb-6">{roomCode}</div>

        <Button variant="surface" className="w-full py-3.5 text-sm gap-2 rounded-xl" onClick={handleCopy}>
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          {copied ? "Lien copié !" : "Copier le lien d'invitation"}
        </Button>
      </Card>
    </div>
  );
}
