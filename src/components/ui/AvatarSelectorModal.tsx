"use client";

import { useState } from "react";
import { X, Check, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { sfxTap, sfxSuccess } from "@/lib/audio";

const AVATARS = [
  "👻", "🐺", "🕵️‍♂️", "🎧", "👑", "🔥",
  "⭐", "🎭", "🚀", "🤖", "🦊", "🦄",
  "🦁", "🐉", "👾", "🏆", "💎", "🎨",
];

interface AvatarSelectorModalProps {
  currentAvatar: string;
  onSelectAvatar: (avatar: string) => void;
  onClose: () => void;
}

export function AvatarSelectorModal({ currentAvatar, onSelectAvatar, onClose }: AvatarSelectorModalProps) {
  const [selected, setSelected] = useState(currentAvatar);

  const handleConfirm = () => {
    sfxSuccess();
    onSelectAvatar(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#161824]/55 flex items-center justify-center p-4 animate-fade-up">
      <Card className="w-full max-w-sm p-6 bg-surface border border-border relative flex flex-col items-center shadow-glow">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 p-2 rounded-full bg-surface-elevated text-muted hover:text-foreground cursor-pointer"
        >
          <X size={18} />
        </button>

        <h3 className="font-display text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Sparkles size={19} className="text-primary" aria-hidden="true" /> Choisir son avatar
        </h3>
        <p className="text-xs text-muted font-semibold mb-6">
          Personnalisez votre icône pour la partie !
        </p>

        <div className="grid grid-cols-4 gap-3 w-full mb-6">
          {AVATARS.map((avatar) => (
            <button
              key={avatar}
              type="button"
              onClick={() => {
                setSelected(avatar);
                sfxTap();
              }}
              className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all border-2 cursor-pointer ${
                selected === avatar
                  ? "bg-[#FEEBEB] border-primary scale-105"
                  : "bg-surface-elevated border-border hover:border-[var(--border-strong)]"
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>

        <Button variant="primary" size="lg" className="w-full gap-2 rounded-full" onClick={handleConfirm}>
          <Check size={19} /> Valider l'avatar
        </Button>
      </Card>
    </div>
  );
}
