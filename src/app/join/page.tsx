"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Join() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleKeyPress = (key: string) => {
    if (code.length < 6) {
      setCode(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleJoin = () => {
    if (code.length === 6) {
      router.push(`/online/undercover/${code}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-8 pb-32">
      <div className="w-full max-w-md flex items-center mb-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col items-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground text-center">
          Rejoindre
        </h1>
        <p className="text-foreground/50 font-medium text-center">Saisissez le code à 6 chiffres</p>
      </div>

      <div className="flex gap-3 mb-16">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-12 h-16 rounded-2xl bg-surface border-2 border-white/5 flex items-center justify-center shadow-soft">
            <span className="text-2xl font-bold text-foreground">
              {code[i] || ""}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xs grid grid-cols-3 gap-4 mb-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button 
            key={num} 
            onClick={() => handleKeyPress(num.toString())}
            className="h-20 rounded-full bg-surface text-3xl font-bold active:scale-90 transition-transform shadow-soft text-foreground"
          >
            {num}
          </button>
        ))}
        <div />
        <button 
          onClick={() => handleKeyPress("0")}
          className="h-20 rounded-full bg-surface text-3xl font-bold active:scale-90 transition-transform shadow-soft text-foreground"
        >
          0
        </button>
        <button 
          onClick={handleBackspace}
          className="h-20 rounded-full bg-surface/50 text-2xl font-bold active:scale-90 transition-transform text-foreground/50 flex items-center justify-center"
        >
          ⌫
        </button>
      </div>

      <Button 
        variant="primary" 
        className="w-full max-w-xs h-16 text-lg" 
        disabled={code.length < 6}
        onClick={handleJoin}
      >
        Valider le code
      </Button>
    </main>
  );
}
