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

  const joinUrl =
    url ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/online/${roomCode}`
      : `https://vylo.app/online/${roomCode}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161824]/55 animate-fade-up">
      <Card className="w-full max-w-sm p-6 flex flex-col items-center relative border border-border bg-surface shadow-glow">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 h-9 w-9 bg-surface-elevated rounded-full flex items-center justify-center text-muted hover:text-foreground active-press cursor-pointer"
        >
          <X size={18} />
        </button>

        <h3 className="font-display text-xl font-bold mb-1 text-foreground">Rejoindre la partie</h3>
        <p className="text-xs text-muted font-semibold mb-5 text-center">
          Scannez ce QR code avec votre appareil photo
        </p>

        <div className="p-4 bg-white rounded-3xl mb-5 border border-border shadow-sm flex items-center justify-center">
          <QRCodeSVG
            value={joinUrl}
            size={190}
            bgColor="#FFFFFF"
            fgColor="#161824"
            level="H"
            marginSize={1}
          />
        </div>

        <div className="font-mono text-3xl font-bold tracking-[0.25em] text-primary mb-5">{roomCode}</div>

        <Button variant="surface" className="w-full text-sm gap-2 rounded-full" onClick={handleCopy}>
          {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
          {copied ? "Lien copié !" : "Copier le lien d'invitation"}
        </Button>
      </Card>
    </div>
  );
}
