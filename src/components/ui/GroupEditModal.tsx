"use client";

import { useState, useEffect } from "react";
import { useAppStore, GroupPlayer } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Users, UserPlus, Trash2, Edit2, Check, X, Sparkles, RefreshCw } from "lucide-react";
import { sfxSuccess, sfxTap, sfxError } from "@/lib/audio";

const EMOJIS = ["😎", "🔥", "🦁", "🦊", "👑", "🚀", "⚡", "👻", "🦄", "🐼", "🤖", "⭐"];

export function GroupEditModal({ 
  isOpen, 
  onClose,
  onGroupSaved 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onGroupSaved?: (updatedPlayers: GroupPlayer[]) => void;
}) {
  const { savedGroup, setSavedGroup, addPlayerToSavedGroup, removePlayerFromSavedGroup, updatePlayerInSavedGroup, clearSavedGroup } = useAppStore();

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

    const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const newP: GroupPlayer = {
      id: `gp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: clean,
      avatar: randomEmoji,
    };

    const updated = [...players, newP];
    setPlayers(updated);
    setNewPlayerName("");
  };

  const handleRemovePlayer = (id: string) => {
    sfxTap();
    setPlayers(prev => prev.filter(p => p.id !== id));
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

    setPlayers(prev => prev.map(p => p.id === id ? { ...p, name: clean } : p));
    setEditingId(null);
  };

  const handleSaveAll = () => {
    sfxSuccess();
    setSavedGroup(players);
    if (onGroupSaved) {
      onGroupSaved(players);
    }
    onClose();
  };

  const handleResetGroup = () => {
    sfxTap();
    clearSavedGroup();
    setPlayers([]);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-md p-6 bg-surface/95 border border-white/10 shadow-summer-glow relative flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Users className="text-primary" size={22} /> Modifier l'Équipe ({players.length})
          </h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Ajouter un joueur */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nouveau joueur..."
            className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
            onKeyDown={(e) => { if (e.key === "Enter") handleAddPlayer(); }}
          />
          <Button variant="primary" size="sm" className="px-4 font-black text-xs gap-1.5" onClick={handleAddPlayer} disabled={!newPlayerName.trim()}>
            <UserPlus size={14} /> Ajouter
          </Button>
        </div>

        {/* Liste des Joueurs de l'Équipe */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {players.length === 0 ? (
            <div className="p-6 text-center text-xs font-bold text-foreground/40 border border-dashed border-white/10 rounded-2xl">
              Aucun joueur dans l'équipe. Ajoutez le prénom de vos amis !
            </div>
          ) : (
            players.map((p, idx) => (
              <div key={p.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-1 mr-2">
                  <span className="text-xl">{p.avatar || "😎"}</span>
                  
                  {editingId === p.id ? (
                    <div className="flex items-center gap-1 flex-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="bg-background border border-primary rounded-lg px-2 py-1 text-xs font-bold w-full"
                        autoFocus
                        onKeyDown={(e) => { if (e.key === "Enter") handleSaveRename(p.id); }}
                      />
                      <button onClick={() => handleSaveRename(p.id)} className="p-1 text-emerald-400">
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="font-bold text-xs truncate">Joueur {idx + 1} : <strong className="text-foreground">{p.name}</strong></span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {editingId !== p.id && (
                    <button onClick={() => handleStartRename(p)} className="p-1.5 text-foreground/40 hover:text-primary transition-colors">
                      <Edit2 size={14} />
                    </button>
                  )}
                  <button onClick={() => handleRemovePlayer(p.id)} className="p-1.5 text-foreground/40 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
          <Button variant="primary" className="w-full py-3.5 text-xs font-black gap-2 shadow-summer-glow" onClick={handleSaveAll}>
            <Check size={16} /> Valider l'Équipe ({players.length} Joueurs)
          </Button>

          {players.length > 0 && (
            <button 
              onClick={handleResetGroup}
              className="text-[11px] font-black text-red-400/80 hover:text-red-400 flex items-center justify-center gap-1 py-1"
            >
              <RefreshCw size={12} /> Réinitialiser l'équipe au complet
            </button>
          )}
        </div>

      </Card>
    </div>
  );
}
