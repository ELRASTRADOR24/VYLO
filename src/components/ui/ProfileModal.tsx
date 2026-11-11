"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { uploadProfileAvatar } from "@/lib/cloudinary";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Camera, Check, X, User, Loader2, Upload, Lock, LogIn } from "lucide-react";
import { sfxSuccess, sfxTap } from "@/lib/audio";
import { AuthModal } from "@/components/ui/AuthModal";

const DEFAULT_EMOJIS = ["👻", "🐺", "🕵️", "👑", "🔥", "⚡", "😎", "🐱", "🦊", "🦁", "🚀", "💎"];

export function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { guestProfile, updateGuestProfile, activeAccount } = useAppStore();

  const [pseudo, setPseudo] = useState(guestProfile.pseudo);
  const [avatarUrl, setAvatarUrl] = useState(guestProfile.avatar);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPseudo(guestProfile.pseudo);
      setAvatarUrl(guestProfile.avatar);
    }
  }, [isOpen, guestProfile.pseudo, guestProfile.avatar]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Compression et envoi...");

    try {
      const result = await uploadProfileAvatar(file);
      setAvatarUrl(result.url);
      setUploadStatus(result.isCloudinary ? "Photo enregistrée !" : "Photo optimisée et prête !");
      sfxSuccess();
    } catch {
      setUploadStatus("Erreur lors du traitement de l'image.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleSave = () => {
    const cleanPseudo = pseudo.trim() || "Invité";
    updateGuestProfile({
      pseudo: cleanPseudo,
      avatar: avatarUrl,
    });
    sfxSuccess();
    onClose();
  };

  const isCustomImage = avatarUrl.startsWith("http") || avatarUrl.startsWith("data:image");

  return (
    <>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <div className="fixed inset-0 bg-[#161824]/45 flex items-center justify-center p-4 z-50 animate-fade-up">
        <Card className="w-full max-w-md p-6 bg-surface border border-border shadow-glow relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <User className="text-primary" size={20} aria-hidden="true" /> Modifier mon profil
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

          <div className="p-3.5 bg-surface-elevated border border-border rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FEEBEB] flex items-center justify-center text-primary">
                <Lock size={15} aria-hidden="true" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground">
                  {activeAccount ? `Connecté : ${activeAccount.username}` : "Mode Invité"}
                </span>
                <span className="text-[11px] text-muted font-semibold">
                  {activeAccount ? "Statistiques sauvegardées" : "Connectez-vous pour tout garder"}
                </span>
              </div>
            </div>
            <Button
              variant="surface"
              size="sm"
              className="text-xs font-bold gap-1.5 rounded-full bg-surface"
              onClick={() => setIsAuthOpen(true)}
            >
              {activeAccount ? <User size={12} /> : <LogIn size={12} />}
              {activeAccount ? "Compte" : "Connexion"}
            </Button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full border-2 border-primary/40 overflow-hidden bg-[#EEF2FF] flex items-center justify-center text-4xl font-bold shadow-sm relative">
                {isCustomImage ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{avatarUrl}</span>
                )}
              </div>

              <div className="absolute inset-0 rounded-full bg-[#161824]/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={22} className="text-white" />
                <span className="text-[11px] font-bold text-white mt-1">Changer</span>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              variant="surface"
              size="sm"
              className="gap-2 text-xs font-bold rounded-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 size={14} className="animate-spin text-primary" /> : <Upload size={14} className="text-primary" />}
              {isUploading ? "Envoi..." : "Importer une photo"}
            </Button>

            {uploadStatus && (
              <span className="text-xs font-bold text-green">{uploadStatus}</span>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">Ou choisissez un avatar :</label>
            <div className="grid grid-cols-6 gap-2">
              {DEFAULT_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    sfxTap();
                    setAvatarUrl(emoji);
                  }}
                  className={`h-10 rounded-2xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                    avatarUrl === emoji
                      ? "bg-[#FEEBEB] border-primary scale-105"
                      : "bg-surface-elevated border-border hover:border-[var(--border-strong)]"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">Votre pseudo en jeu :</label>
            <input
              type="text"
              value={pseudo}
              maxLength={18}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Entrez votre prénom ou pseudo..."
              className="w-full bg-surface-elevated border border-border rounded-2xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <Button variant="primary" size="lg" className="w-full gap-2 rounded-full" onClick={handleSave}>
            <Check size={18} /> Enregistrer mon profil
          </Button>
        </Card>
      </div>
    </>
  );
}
