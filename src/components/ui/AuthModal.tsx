"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { User, LogIn, UserPlus, LogOut, Check, X, Shield, Lock, Sparkles, KeyRound } from "lucide-react";
import { sfxSuccess, sfxTap, sfxError } from "@/lib/audio";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { activeAccount, registerAccount, loginAccount, logoutAccount } = useAppStore();

  const [mode, setMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfxTap();

    if (mode === "LOGIN") {
      const res = loginAccount(username, password);
      if (res.success) {
        sfxSuccess();
        setFeedback({ type: "success", text: res.message });
        setTimeout(() => {
          setFeedback(null);
          onClose();
        }, 1200);
      } else {
        sfxError();
        setFeedback({ type: "error", text: res.message });
      }
    } else {
      const res = registerAccount(username, password);
      if (res.success) {
        sfxSuccess();
        setFeedback({ type: "success", text: res.message });
        setTimeout(() => {
          setFeedback(null);
          onClose();
        }, 1200);
      } else {
        sfxError();
        setFeedback({ type: "error", text: res.message });
      }
    }
  };

  const handleLogout = () => {
    sfxTap();
    logoutAccount();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-md p-6 bg-surface/95 border border-white/10 shadow-summer-glow relative flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Lock className="text-primary" size={22} /> Espace Connexion VYLO
          </h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Si l'utilisateur est déjà connecté */}
        {activeAccount ? (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-4xl shadow-glow">
              {activeAccount.avatar}
            </div>
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                🟢 Connecté
              </span>
              <h3 className="text-2xl font-black text-foreground mt-2">{activeAccount.username}</h3>
              <p className="text-xs text-foreground/50 font-bold mt-1">
                {activeAccount.stats.gamesPlayed} parties jouées • {activeAccount.stats.wins} victoires
              </p>
            </div>

            <Button variant="surface" className="w-full py-4 font-black text-red-400 border border-red-500/30 gap-2 mt-2" onClick={handleLogout}>
              <LogOut size={18} /> Se déconnecter de mon compte
            </Button>
          </div>
        ) : (
          /* Onglets Connexion / Inscription */
          <div className="flex flex-col gap-4">
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => { setMode("LOGIN"); setFeedback(null); sfxTap(); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  mode === "LOGIN" ? "bg-gradient-summer text-white shadow-soft" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <LogIn size={14} /> Se connecter
              </button>
              <button
                type="button"
                onClick={() => { setMode("REGISTER"); setFeedback(null); sfxTap(); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  mode === "REGISTER" ? "bg-gradient-summer text-white shadow-soft" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <UserPlus size={14} /> Créer un compte
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-foreground/50">Nom d'utilisateur (Username)</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-foreground/40" size={18} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: Johanson24"
                    className="w-full bg-background border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm font-black text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-foreground/50">Mot de passe</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 text-foreground/40" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe..."
                    className="w-full bg-background border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm font-black text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Message de feedback */}
              {feedback && (
                <div className={`p-3 rounded-xl text-xs font-black border text-center ${
                  feedback.type === "success" 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}>
                  {feedback.text}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full py-4 text-md font-black gap-2 shadow-summer-glow mt-2">
                {mode === "LOGIN" ? <LogIn size={18} /> : <UserPlus size={18} />}
                {mode === "LOGIN" ? "Se connecter" : "Créer mon compte"}
              </Button>
            </form>
          </div>
        )}

      </Card>
    </div>
  );
}
