/**
 * VYLO VOICE NARRATIVE ENGINE
 * Système de Narration Vocale Intelligente et Ambiance Sonore.
 * Zéro dépendance externe — Web Speech Synthesis API + Web Audio API.
 */

import { sfxSuspense, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "./audio";

export type VoiceTone = "NIGHT" | "DAY" | "SUSPENSE" | "VICTORY" | "ANNOUNCEMENT" | "MYSTICAL";

export interface VoiceOptions {
  pitch?: number; // 0.5 à 1.5
  rate?: number;  // 0.8 à 1.5
  volume?: number; // 0 à 1.0
  tone?: VoiceTone;
}

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private frenchVoice: SpeechSynthesisVoice | null = null;
  public enabled: boolean = true;
  public speedMultiplier: number = 1.0; // Mode rapide
  public currentSubtitles: string = "";
  private subtitleListeners: Set<(text: string) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Préférer les voix françaises naturelles (ex: Google, Thomas, Audrey, Hortense, Virginie)
    this.frenchVoice = 
      voices.find(v => v.lang.startsWith("fr") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Premium"))) ||
      voices.find(v => v.lang.startsWith("fr")) ||
      null;
  }

  public subscribeSubtitles(listener: (text: string) => void) {
    this.subtitleListeners.add(listener);
    return () => {
      this.subtitleListeners.delete(listener);
    };
  }

  private notifySubtitles(text: string) {
    this.currentSubtitles = text;
    this.subtitleListeners.forEach(fn => fn(text));
  }

  /**
   * Enonce un texte vocalement avec le son et les sous-titres associés
   */
  public speak(text: string, options: VoiceOptions = {}) {
    this.notifySubtitles(text);

    // Jouer le son d'ambiance selon le ton
    const tone = options.tone || "ANNOUNCEMENT";
    this.playToneAmbiance(tone);

    if (!this.enabled || !this.synth) return;

    // Arrêter la narration en cours s'il y en a une
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";

    if (this.frenchVoice) {
      utterance.voice = this.frenchVoice;
    }

    // Ajuster le pitch et le débit selon le ton
    switch (tone) {
      case "NIGHT":
        utterance.pitch = options.pitch ?? 0.7;
        utterance.rate = (options.rate ?? 0.9) * this.speedMultiplier;
        break;
      case "MYSTICAL":
        utterance.pitch = options.pitch ?? 0.8;
        utterance.rate = (options.rate ?? 0.85) * this.speedMultiplier;
        break;
      case "SUSPENSE":
        utterance.pitch = options.pitch ?? 0.9;
        utterance.rate = (options.rate ?? 1.1) * this.speedMultiplier;
        break;
      case "VICTORY":
        utterance.pitch = options.pitch ?? 1.2;
        utterance.rate = (options.rate ?? 1.1) * this.speedMultiplier;
        break;
      default:
        utterance.pitch = options.pitch ?? 1.0;
        utterance.rate = (options.rate ?? 1.0) * this.speedMultiplier;
        break;
    }

    utterance.volume = options.volume ?? 1.0;

    utterance.onend = () => {
      // Effacer les sous-titres après 3 secondes
      setTimeout(() => {
        if (this.currentSubtitles === text) {
          this.notifySubtitles("");
        }
      }, 3000);
    };

    this.synth.speak(utterance);
  }

  private playToneAmbiance(tone: VoiceTone) {
    try {
      switch (tone) {
        case "NIGHT":
        case "MYSTICAL":
          sfxReveal();
          break;
        case "SUSPENSE":
          sfxSuspense();
          break;
        case "VICTORY":
          sfxVictory();
          break;
        case "DAY":
        case "ANNOUNCEMENT":
          sfxSuccess();
          break;
      }
    } catch (e) {
      // Ignorer les erreurs d'audio context non débloqué
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.notifySubtitles("");
  }
}

export const voiceEngine = new VoiceEngine();
