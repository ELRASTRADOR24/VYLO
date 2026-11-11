"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, LayoutGrid, Users, RotateCcw } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
  const { clearSavedGroup } = useAppStore();
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

      <Card className="w-full p-6 bg-surface border border-border shadow-soft text-center space-y-3 mt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-muted block">
          Que souhaitez-vous faire ?
        </span>

        <Button
          variant="primary"
          size="lg"
          className="w-full gap-2 rounded-full"
          onClick={() => {
            sfxSuccess();
            onReplaySameTeam();
          }}
        >
          <RefreshCw size={18} /> Rejouer avec la même équipe
        </Button>

        <Button
          variant="surface"
          className="w-full gap-2 rounded-full"
          onClick={handleSwitchGameWithSameTeam}
        >
          <LayoutGrid size={16} className="text-primary" /> Changer de jeu avec cette équipe
        </Button>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              sfxTap();
              setIsEditModalOpen(true);
            }}
            className="py-3 px-3 rounded-2xl bg-surface-elevated border border-border hover:border-primary/40 text-xs font-bold text-foreground flex items-center justify-center gap-1.5 active-press cursor-pointer"
          >
            <Users size={14} className="text-primary" /> Éditer l'équipe
          </button>

          <button
            type="button"
            onClick={handleResetTeam}
            className="py-3 px-3 rounded-2xl bg-surface-elevated border border-border hover:border-primary/40 text-xs font-bold text-primary flex items-center justify-center gap-1.5 active-press cursor-pointer"
          >
            <RotateCcw size={14} /> Changer d'équipe
          </button>
        </div>
      </Card>
    </>
  );
}
