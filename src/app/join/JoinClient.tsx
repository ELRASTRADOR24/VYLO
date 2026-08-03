"use client";

import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronLeft, Clipboard, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sfxTap, sfxSuccess } from "@/lib/audio";

export default function JoinClient() {
  const [code, setCode] = useState("");
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus automatique au chargement
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    setCode(clean);
  };

  const handlePasteClipboard = async () => {
    sfxTap();
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleInputChange(text);
          setCopiedSuccess(true);
          setTimeout(() => setCopiedSuccess(false), 2000);
        }
      }
    } catch (e) {
      // Fallback si la permission clipboard n'est pas accordée
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (key: string) => {
    sfxTap();
    if (code.length < 6) {
      setCode(prev => (prev + key).slice(0, 6));
    }
  };

  const handleBackspace = () => {
    sfxTap();
    setCode(prev => prev.slice(0, -1));
  };

  const handleJoin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length === 6) {
      sfxSuccess();
      router.push(`/online/undercover/${code}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-8 pb-32 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center">
      {/* Header Navigation */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1 text-xs font-black">
            <ChevronLeft className="w-4 h-4 text-primary" /> Retour
          </Button>
        </Link>
        <div className="w-16" />
      </div>

      <div className="w-full flex flex-col items-center mb-8">
        <span className="text-[11px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 mb-3">
          Multijoueur En Ligne
        </span>
        <h1 className="text-4xl font-black tracking-tight mb-2 text-foreground">
          Rejoindre un salon
        </h1>
        <p className="text-foreground/60 font-semibold text-sm">
          Saisissez ou collez le code à 6 caractères généré par l'hôte
        </p>
      </div>

      {/* Input Réel Caché pour le Clavier Physique PC / Mobile & le Coller */}
      <form onSubmit={handleJoin} className="w-full flex flex-col items-center">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[A-Za-z0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => handleInputChange(e.target.value)}
          className="sr-only" // Caché visuellement mais actif pour le clavier & paste
          autoFocus
        />

        {/* Boîtes Visuelles Interactives (Clic -> Focus Input) */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex gap-2 md:gap-3 mb-6 cursor-pointer group"
        >
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              className={`w-12 h-16 md:w-14 md:h-18 rounded-2xl bg-surface border-2 flex items-center justify-center shadow-soft transition-all ${
                code.length === i ? 'border-primary shadow-summer-glow scale-105' : 'border-white/10 group-hover:border-white/30'
              }`}
            >
              <span className="text-2xl md:text-3xl font-black text-primary">
                {code[i] || ""}
              </span>
            </div>
          ))}
        </div>

        {/* Bouton "Coller le Code" depuis le presse-papier */}
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 text-xs font-black text-foreground/80 hover:text-primary flex items-center gap-2 transition-all active-press"
          >
            <Clipboard size={14} className="text-primary" />
            {copiedSuccess ? "Code collé !" : "Coller le code copié"}
          </button>
        </div>

        {/* Clavier Virtuel Complémentaire */}
        <div className="w-full max-w-xs md:max-w-sm grid grid-cols-3 gap-3 md:gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button 
              key={num} 
              type="button"
              onClick={() => handleKeyPress(num.toString())}
              className="h-16 md:h-20 rounded-2xl bg-surface border border-white/5 text-2xl md:text-3xl font-black active-press shadow-soft text-foreground hover:bg-white/10"
            >
              {num}
            </button>
          ))}
          <div />
          <button 
            type="button"
            onClick={() => handleKeyPress("0")}
            className="h-16 md:h-20 rounded-2xl bg-surface border border-white/5 text-2xl md:text-3xl font-black active-press shadow-soft text-foreground hover:bg-white/10"
          >
            0
          </button>
          <button 
            type="button"
            onClick={handleBackspace}
            className="h-16 md:h-20 rounded-2xl bg-surface/50 border border-white/5 text-xl font-black active-press text-foreground/50 flex items-center justify-center hover:bg-white/10"
          >
            ⌫
          </button>
        </div>

        <Button 
          type="submit"
          variant="primary" 
          className="w-full max-w-xs md:max-w-sm h-16 text-lg shadow-summer-glow gap-2" 
          disabled={code.length < 6}
        >
          Rejoindre la partie <ArrowRight size={20} />
        </Button>
      </form>
    </main>
  );
}
