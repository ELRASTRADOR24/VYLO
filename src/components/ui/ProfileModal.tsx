"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import { uploadProfileAvatar } from "@/lib/cloudinary";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Camera, Check, X, User, Sparkles, Loader2, Upload, Lock, LogIn, LogOut } from "lucide-react";
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

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Compression & Envoi Cloudinary...");

    try {
      const result = await uploadProfileAvatar(file);
      setAvatarUrl(result.url);
      setUploadStatus(result.isCloudinary ? "Photo envoyée sur Cloudinary ! ☁️" : "Photo compressée & enregistrée ! ⚡");
      sfxSuccess();
    } catch (err) {
      setUploadStatus("Erreur lors du traitement de l'image.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleSave = () => {
    const cleanPseudo = pseudo.trim() || `Joueur_${Math.floor(Math.random() * 9000 + 1000)}`;
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

      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
        <Card className="w-full max-w-md p-6 bg-surface/95 border border-white/10 shadow-summer-glow relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
              <User className="text-primary" size={22} /> Modifier mon Profil
            </h2>
            <button onClick={onClose} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground">
              <X size={18} />
            </button>
          </div>

          {/* Section Compte Connexion */}
          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                <Lock size={16} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black text-foreground">
                  {activeAccount ? `Connecté : ${activeAccount.username}` : "Mode Invité"}
                </span>
                <span className="text-[10px] text-foreground/50 font-bold">
                  {activeAccount ? "Compte actif et sauvegardé" : "Se connecter pour enregistrer les stats"}
                </span>
              </div>
            </div>
            <Button variant="surface" size="sm" className="text-xs font-black gap-1.5 py-1.5 px-3 rounded-xl border border-white/10" onClick={() => setIsAuthOpen(true)}>
              {activeAccount ? <User size={12} /> : <LogIn size={12} />}
              {activeAccount ? "Mon Compte" : "Connexion"}
            </Button>
          </div>

          {/* Photo de Profil */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full border-2 border-primary/50 overflow-hidden bg-purple-500/20 flex items-center justify-center text-4xl font-black shadow-glow relative">
                {isCustomImage ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{avatarUrl}</span>
                )}
              </div>

              {/* Hover Badge Camera */}
              <div className="absolute inset-0 rounded-full bg-slate-950/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
                <span className="text-[10px] font-black text-white mt-1">Changer</span>
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
              className="gap-2 text-xs font-bold rounded-xl border border-white/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 size={14} className="animate-spin text-primary" /> : <Upload size={14} className="text-primary" />}
              {isUploading ? "Traitement..." : "Importer une photo (Cloudinary)"}
            </Button>

            {uploadStatus && (
              <span className="text-[11px] font-black text-emerald-400 animate-pulse">
                {uploadStatus}
              </span>
            )}
          </div>

          {/* Sélecteur d'Emojis rapide */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-foreground/50">Ou choisir un emoji :</label>
            <div className="grid grid-cols-6 gap-2">
              {DEFAULT_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => { sfxTap(); setAvatarUrl(emoji); }}
                  className={`h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                    avatarUrl === emoji ? 'bg-primary/20 border-primary shadow-glow scale-105' : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Champ Pseudo */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-wider text-foreground/50">Votre Pseudo dans les salons :</label>
            <input
              type="text"
              value={pseudo}
              maxLength={18}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Entrez votre prénom ou pseudo..."
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Bouton Sauvegarder */}
          <Button variant="primary" className="w-full py-4 text-md font-black gap-2 mt-2 shadow-summer-glow" onClick={handleSave}>
            <Check size={18} /> Enregistrer mon profil
          </Button>
        </Card>
      </div>
    </>
  );
}
