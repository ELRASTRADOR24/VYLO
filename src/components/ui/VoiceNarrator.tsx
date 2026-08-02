"use client";

import { useEffect, useState } from "react";
import { voiceEngine } from "@/lib/voiceEngine";
import { Volume2, VolumeX, Zap, Mic } from "lucide-react";

export function VoiceNarratorBanner() {
  const [subtitles, setSubtitles] = useState("");
  const [enabled, setEnabled] = useState(voiceEngine.enabled);
  const [fastMode, setFastMode] = useState(voiceEngine.speedMultiplier > 1.0);

  useEffect(() => {
    const unsubscribe = voiceEngine.subscribeSubtitles((text) => {
      setSubtitles(text);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleVoice = () => {
    voiceEngine.enabled = !voiceEngine.enabled;
    setEnabled(voiceEngine.enabled);
    if (!voiceEngine.enabled) voiceEngine.stop();
  };

  const toggleFastMode = () => {
    voiceEngine.speedMultiplier = voiceEngine.speedMultiplier > 1.0 ? 1.0 : 1.25;
    setFastMode(voiceEngine.speedMultiplier > 1.0);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-4">
      {/* Contrôles vocaux */}
      <div className="flex items-center gap-2 bg-surface/90 border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold shadow-soft">
        <button
          onClick={toggleVoice}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
            enabled ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/5 text-foreground/40'
          }`}
        >
          {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{enabled ? "Narrateur Vocal" : "Vocal Muet"}</span>
        </button>

        <button
          onClick={toggleFastMode}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            fastMode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-black' : 'bg-white/5 text-foreground/40'
          }`}
          title="Mode Rapide (15-20 min)"
        >
          <Zap size={13} className={fastMode ? "fill-amber-400" : ""} />
          <span>{fastMode ? "Mode 1.25x ⚡" : "Vitesse 1.0x"}</span>
        </button>
      </div>

      {/* Sous-titres vocaux animés */}
      {subtitles && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300 bg-gradient-to-r from-purple-900/60 via-purple-950/80 to-purple-900/60 border border-purple-500/30 backdrop-blur-xl p-3.5 rounded-2xl text-center shadow-glow">
          <p className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1">
            <Mic size={14} className="animate-pulse text-purple-400" /> Voice Engine VYLO
          </p>
          <p className="text-sm font-extrabold text-white leading-snug">
            "{subtitles}"
          </p>
        </div>
      )}
    </div>
  );
}
