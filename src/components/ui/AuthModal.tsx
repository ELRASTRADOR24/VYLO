"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { User, LogIn, UserPlus, LogOut, X, Lock, KeyRound } from "lucide-react";
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
        }, 1000);
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
        }, 1000);
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
    <div className="fixed inset-0 bg-[#161824]/45 flex items-center justify-center p-4 z-50 animate-fade-up">
      <Card className="w-full max-w-md p-6 bg-surface border border-border shadow-glow relative flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Lock className="text-primary" size={20} aria-hidden="true" /> Compte VYLO
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

        {activeAccount ? (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <div className="w-20 h-20 rounded-full bg-[#FEEBEB] border-2 border-primary/40 flex items-center justify-center text-4xl">
              {activeAccount.avatar}
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-[#226B50] bg-[#E1F4EC] px-3 py-1 rounded-full">
                Connecté
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-2">{activeAccount.username}</h3>
              <p className="text-xs text-muted font-bold mt-1">
                {activeAccount.stats.gamesPlayed} parties • {activeAccount.stats.wins} victoires
              </p>
            </div>

            <Button variant="surface" className="w-full py-3.5 font-bold text-primary gap-2 mt-2 rounded-full" onClick={handleLogout}>
              <LogOut size={17} /> Se déconnecter
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex p-1 bg-surface-elevated rounded-full border border-border">
              <button
                type="button"
                onClick={() => {
                  setMode("LOGIN");
                  setFeedback(null);
                  sfxTap();
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "LOGIN" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
                }`}
              >
                <LogIn size={14} /> Se connecter
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("REGISTER");
                  setFeedback(null);
                  sfxTap();
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "REGISTER" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
                }`}
              >
                <UserPlus size={14} /> Créer un compte
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted">Nom d'utilisateur</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-muted" size={17} aria-hidden="true" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: Camille24"
                    className="w-full bg-surface-elevated border border-border rounded-2xl pl-11 pr-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted">Mot de passe</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3 text-muted" size={17} aria-hidden="true" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe..."
                    className="w-full bg-surface-elevated border border-border rounded-2xl pl-11 pr-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold border text-center ${
                    feedback.type === "success"
                      ? "bg-[#E1F4EC] border-[#389874]/30 text-[#226B50]"
                      : "bg-[#FEEBEB] border-[#E84545]/30 text-[#C22E2E]"
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full gap-2 rounded-full">
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
