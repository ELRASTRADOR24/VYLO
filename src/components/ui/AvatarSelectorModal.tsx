"use client";

import { useState } from "react";
import { X, Check, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { sfxTap, sfxSuccess } from "@/lib/audio";

const AVATARS = [
  "👻", "🐺", "🕵️‍♂️", "🎧", "👑", "🔥", 
  "⭐", "🎭", "🚀", "🤖", "🦊", "🦄",
  "🦁", "🐉", "👾", "🏆", "💎", "🎨"
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
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 bg-surface/90 border-2 border-primary/40 relative flex flex-col items-center shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-foreground/60 hover:text-white"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
          <Sparkles size={20} className="text-primary" /> Choisir son Avatar
        </h3>
        <p className="text-xs text-foreground/50 mb-6">Personnalisez votre apparence sur tous les téléphones !</p>

        <div className="grid grid-cols-4 gap-3 w-full mb-6">
          {AVATARS.map(avatar => (
            <button
              key={avatar}
              type="button"
              onClick={() => { setSelected(avatar); sfxTap(); }}
              className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all border-2 ${
                selected === avatar 
                  ? "bg-primary/20 border-primary scale-110 shadow-summer-glow" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>

        <Button variant="primary" className="w-full py-3.5 text-base gap-2 shadow-summer-glow" onClick={handleConfirm}>
          <Check size={20} /> Valider l'Avatar
        </Button>
      </Card>
    </div>
  );
}
