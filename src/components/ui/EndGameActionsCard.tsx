"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, GroupPlayer } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { RefreshCw, LayoutGrid, Users, Edit3, RotateCcw } from "lucide-react";
import { sfxTap, sfxSuccess } from "@/lib/audio";
import { GroupEditModal } from "@/components/ui/GroupEditModal";

interface EndGameActionsCardProps {
  onReplaySameTeam: () => void;
  onEditTeam?: () => void;
  onChangeTeam?: () => void;
}

export function EndGameActionsCard({
  onReplaySameTeam,
  onEditTeam,
  onChangeTeam,
}: EndGameActionsCardProps) {
  const router = useRouter();
  const { savedGroup, clearSavedGroup } = useAppStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSwitchGameWithSameTeam = () => {
    sfxTap();
    router.push("/library");
  };

  const handleResetTeam = () => {
    sfxTap();
    clearSavedGroup();
    if (onChangeTeam) {
      onChangeTeam();
    }
  };

  return (
    <>
      <GroupEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        onGroupSaved={() => {
          if (onEditTeam) onEditTeam();
        }}
      />

      <Card className="w-full p-6 bg-surface/90 border border-white/10 shadow-glow text-center space-y-3 mt-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 block">
          Que souhaitez-vous faire ?
        </span>

        {/* 1. Rejouer avec la même équipe */}
        <Button
          variant="primary"
          className="w-full py-4 text-sm font-black gap-2 shadow-summer-glow"
          onClick={() => { sfxSuccess(); onReplaySameTeam(); }}
        >
          <RefreshCw size={18} /> Rejouer avec la même équipe
        </Button>

        {/* 2. Changer de jeu avec la même équipe */}
        <Button
          variant="surface"
          className="w-full py-3.5 text-xs font-black gap-2 border border-white/10"
          onClick={handleSwitchGameWithSameTeam}
        >
          <LayoutGrid size={16} className="text-primary" /> Changer de jeu avec cette équipe
        </Button>

        {/* 3. Éditer l'équipe ou Changer d'équipe */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => { sfxTap(); setIsEditModalOpen(true); }}
            className="py-3 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 text-xs font-black text-foreground flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Users size={14} className="text-primary" /> Éditer l'équipe
          </button>

          <button
            type="button"
            onClick={handleResetTeam}
            className="py-3 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 text-xs font-black text-red-400 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <RotateCcw size={14} /> Changer d'équipe
          </button>
        </div>
      </Card>
    </>
  );
}
