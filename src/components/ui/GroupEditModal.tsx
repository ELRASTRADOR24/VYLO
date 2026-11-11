"use client";

import { useState, useEffect } from "react";
import { useAppStore, GroupPlayer } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Users, UserPlus, Trash2, Edit2, Check, X, RefreshCw } from "lucide-react";
import { sfxSuccess, sfxTap } from "@/lib/audio";

const EMOJIS = ["😎", "🔥", "🦁", "🦊", "👑", "🚀", "⚡", "👻", "🦄", "🐼", "🤖", "⭐"];

export function GroupEditModal({
  isOpen,
  onClose,
  onGroupSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  onGroupSaved?: (updatedPlayers: GroupPlayer[]) => void;
}) {
  const { savedGroup, setSavedGroup, clearSavedGroup } = useAppStore();

  const [players, setPlayers] = useState<GroupPlayer[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPlayers(savedGroup.length > 0 ? savedGroup : []);
    }
  }, [isOpen, savedGroup]);

  if (!isOpen) return null;

  const handleAddPlayer = () => {
    const clean = newPlayerName.trim();
    if (!clean) return;
    sfxTap();

    const randomEmoji = EMOJIS[players.length % EMOJIS.length];
    const newP: GroupPlayer = {
      id: `gp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: clean,
      avatar: randomEmoji,
    };

    setPlayers([...players, newP]);
    setNewPlayerName("");
  };

  const handleRemovePlayer = (id: string) => {
    sfxTap();
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStartRename = (player: GroupPlayer) => {
    sfxTap();
    setEditingId(player.id);
    setEditingName(player.name);
  };

  const handleSaveRename = (id: string) => {
    const clean = editingName.trim();
    if (!clean) return;
    sfxTap();
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, name: clean } : p)));
    setEditingId(null);
  };

  const handleSaveAll = () => {
    sfxSuccess();
    setSavedGroup(players);
    if (onGroupSaved) onGroupSaved(players);
    onClose();
  };

  const handleResetGroup = () => {
    sfxTap();
    clearSavedGroup();
    setPlayers([]);
  };

  return (
    <div className="fixed inset-0 bg-[#161824]/45 flex items-center justify-center p-4 z-50 animate-fade-up">
      <Card className="w-full max-w-md p-6 bg-surface border border-border shadow-glow relative flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="text-primary" size={20} aria-hidden="true" /> Modifier l'équipe ({players.length})
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="h-8 w-8 rounded-full bg-surface-elevated flex items-center justify-center text-muted hover:text-foreground cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nouveau joueur..."
            className="flex-1 bg-surface-elevated border border-border rounded-2xl px-4 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:border-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddPlayer();
            }}
          />
          <Button variant="primary" size="sm" className="px-4 font-bold text-xs gap-1.5 rounded-2xl" onClick={handleAddPlayer} disabled={!newPlayerName.trim()}>
            <UserPlus size={14} /> Ajouter
          </Button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {players.length === 0 ? (
            <div className="p-6 text-center text-xs font-bold text-muted border border-dashed border-border rounded-2xl">
              Aucun joueur dans l'équipe. Ajoutez vos proches !
            </div>
          ) : (
            players.map((p, idx) => (
              <div key={p.id} className="p-3 bg-surface-elevated border border-border rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-1 mr-2">
                  <span className="text-xl">{p.avatar || "😎"}</span>

                  {editingId === p.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="bg-surface border border-primary rounded-xl px-2.5 py-1 text-xs font-bold text-foreground w-full"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveRename(p.id);
                        }}
                      />
                      <button type="button" onClick={() => handleSaveRename(p.id)} className="p-1 text-green cursor-pointer">
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="font-bold text-xs text-muted truncate">
                      {idx + 1}. <strong className="text-foreground text-sm">{p.name}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {editingId !== p.id && (
                    <button type="button" onClick={() => handleStartRename(p)} className="p-1.5 text-muted hover:text-primary transition-colors cursor-pointer">
                      <Edit2 size={14} />
                    </button>
                  )}
                  <button type="button" onClick={() => handleRemovePlayer(p.id)} className="p-1.5 text-muted hover:text-primary transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <Button variant="primary" size="md" className="w-full gap-2 rounded-full" onClick={handleSaveAll}>
            <Check size={16} /> Valider l'équipe ({players.length} joueurs)
          </Button>

          {players.length > 0 && (
            <button
              type="button"
              onClick={handleResetGroup}
              className="text-xs font-bold text-muted hover:text-primary flex items-center justify-center gap-1 py-1 cursor-pointer"
            >
              <RefreshCw size={12} /> Réinitialiser l'équipe
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
