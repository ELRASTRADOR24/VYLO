"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sfxTap } from "@/lib/audio";

export default function Join() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    sfxTap();
    if (code.length < 6) {
      setCode(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    sfxTap();
    setCode(prev => prev.slice(0, -1));
  };

  const handleJoin = () => {
    sfxTap();
    if (code.length === 6) {
      router.push(`/online/undercover/${code}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-8 pb-32 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1 text-xs font-black">
            <ChevronLeft className="w-4 h-4 text-primary" /> Retour
          </Button>
        </Link>
        <div className="w-16" />
      </div>

      <div className="w-full flex flex-col items-center mb-8 text-center">
        <span className="text-[11px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 mb-3">
          Multijoueur En Ligne
        </span>
        <h1 className="text-4xl font-black tracking-tight mb-2 text-foreground">
          Rejoindre un salon
        </h1>
        <p className="text-foreground/60 font-semibold text-sm">Saisissez le code à 6 caractères généré par l'hôte</p>
      </div>

      <div className="flex gap-2 md:gap-3 mb-10">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-12 h-16 md:w-14 md:h-18 rounded-2xl bg-surface border-2 border-white/10 flex items-center justify-center shadow-soft">
            <span className="text-2xl md:text-3xl font-black text-primary">
              {code[i] || ""}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xs md:max-w-sm grid grid-cols-3 gap-3 md:gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button 
            key={num} 
            onClick={() => handleKeyPress(num.toString())}
            className="h-16 md:h-20 rounded-2xl bg-surface border border-white/5 text-2xl md:text-3xl font-black active:scale-95 transition-transform shadow-soft text-foreground hover:bg-white/10"
          >
            {num}
          </button>
        ))}
        <div />
        <button 
          onClick={() => handleKeyPress("0")}
          className="h-16 md:h-20 rounded-2xl bg-surface border border-white/5 text-2xl md:text-3xl font-black active:scale-95 transition-transform shadow-soft text-foreground hover:bg-white/10"
        >
          0
        </button>
        <button 
          onClick={handleBackspace}
          className="h-16 md:h-20 rounded-2xl bg-surface/50 border border-white/5 text-xl font-black active:scale-95 transition-transform text-foreground/50 flex items-center justify-center hover:bg-white/10"
        >
          ⌫
        </button>
      </div>

      <Button 
        variant="primary" 
        className="w-full max-w-xs md:max-w-sm h-16 text-lg shadow-summer-glow" 
        disabled={code.length < 6}
        onClick={handleJoin}
      >
        Rejoindre la partie →
      </Button>
    </main>
  );
}
