/**
 * VYLO VOICE NARRATIVE ENGINE (ULTRA HD & DYNAMIC)
 * Moteur de Narration Vocale Intelligente, Bruitages & Commentaires Drôles.
 * Zéro dépendance externe — Web Speech Synthesis API + Web Audio API.
 * Sélection automatique des meilleures voix HD naturelles (Google, Apple Natural, Microsoft Online).
 */

import { sfxSuspense, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "./audio";

export type VoiceTone = 
  | "NIGHT" 
  | "DAY" 
  | "SUSPENSE" 
  | "VICTORY" 
  | "ANNOUNCEMENT" 
  | "MYSTICAL"
  | "HUMOR"
  | "DRAMA"
  | "SABOTEUR"
  | "QUIZ_HOST";

export interface VoiceOptions {
  pitch?: number; // 0.5 à 1.5
  rate?: number;  // 0.8 à 1.5
  volume?: number; // 0 à 1.0
  tone?: VoiceTone;
}

export const FUNNY_REMARKS = {
  SUSPICION: [
    "Ouh là là, l'ambiance devient extrêmement tendue ici !",
    "Quelqu'un transpire beaucoup... Qui est en train de mentir ?",
    "Regardez-le bien dans les yeux, ce sourire n'est pas du tout naturel !",
    "N'écoutez pas cette excuse bidon, c'est clairement un piège !"
  ],
  VOTE: [
    "Les votes sont scellés. Que le verdict tombe !",
    "La sentence est irrévocable !",
    "Adieu mon cher ami, le groupe a parlé !",
    "Un vote sans aucune pitié... Est-ce vraiment le bon choix ?"
  ],
  VICTORY: [
    "Quelle prestation magistrale ! Bravo aux vainqueurs !",
    "Une victoire écrasante qui restera dans les annales de VYLO !",
    "Champagne pour les gagnants, défaite cuisante pour les autres !"
  ],
  SABOTEUR: [
    "Aïe aïe aïe ! Le Saboteur vient de frapper dans l'ombre !",
    "Quelqu'un vient de faire rater le défi exprès ! Qui est ce traître ?",
    "Le piège a fonctionné à merveille... Le Saboteur jubile !"
  ]
};

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private frenchVoice: SpeechSynthesisVoice | null = null;
  public enabled: boolean = true;
  public speedMultiplier: number = 1.0; // 1.0 standard, 1.25 rapide, 0.8 lent
  public currentSubtitles: string = "";
  private subtitleListeners: Set<(text: string) => void> = new Set();
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }

      // Auto-déblocage mobile sur le premier clic/toucher
      const unlockAudio = () => {
        if (this.isUnlocked) return;
        this.isUnlocked = true;
        this.initVoices();
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };

      window.addEventListener("pointerdown", unlockAudio, { once: true });
      window.addEventListener("touchstart", unlockAudio, { once: true });
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Sélection intelligente de la meilleure voix française HD disponible sur l'appareil
    const frVoices = voices.filter(v => v.lang.startsWith("fr") || v.lang.startsWith("FR"));

    this.frenchVoice = 
      // 1. Voix Google HD / Natural (Android & Chrome Desktop)
      frVoices.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Online")) ||
      // 2. Voix Apple Premium / Enhanced (iOS & macOS Siri / Thomas / Audrey / Hortense)
      frVoices.find(v => v.name.includes("Enhanced") || v.name.includes("Premium") || v.name.includes("Thomas") || v.name.includes("Audrey") || v.name.includes("Siri")) ||
      // 3. Voix Microsoft Natural (Windows Edge / Chrome)
      frVoices.find(v => v.name.includes("Paul") || v.name.includes("Hortense") || v.name.includes("Julie") || v.name.includes("Denise")) ||
      // 4. Voix française standard par défaut
      frVoices[0] ||
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
   * Énonce un texte vocalement avec le son d'ambiance et les sous-titres associés
   */
  public speak(text: string, options: VoiceOptions = {}) {
    if (!text || text.trim().length === 0) return;

    // Formater le texte pour des pauses naturelles à la ponctuation
    const formattedText = text
      .replace(/\.\.\./g, "... ")
      .replace(/!/g, " ! ")
      .replace(/\?/g, " ? ");

    this.notifySubtitles(formattedText);

    if (!this.frenchVoice) {
      this.initVoices();
    }

    // Jouer le son d'ambiance selon le ton
    const tone = options.tone || "ANNOUNCEMENT";
    this.playToneAmbiance(tone);

    if (!this.enabled || !this.synth) return;

    // Arrêter la narration précédente
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(formattedText);
    utterance.lang = "fr-FR";

    if (this.frenchVoice) {
      utterance.voice = this.frenchVoice;
    }

    // Ajuster le pitch et le débit selon le ton et les préférences
    switch (tone) {
      case "NIGHT":
      case "MYSTICAL":
        utterance.pitch = options.pitch ?? 0.8;
        utterance.rate = (options.rate ?? 0.9) * this.speedMultiplier;
        break;
      case "SABOTEUR":
      case "DRAMA":
        utterance.pitch = options.pitch ?? 0.75;
        utterance.rate = (options.rate ?? 0.95) * this.speedMultiplier;
        break;
      case "HUMOR":
        utterance.pitch = options.pitch ?? 1.15;
        utterance.rate = (options.rate ?? 1.1) * this.speedMultiplier;
        break;
      case "QUIZ_HOST":
        utterance.pitch = options.pitch ?? 1.1;
        utterance.rate = (options.rate ?? 1.05) * this.speedMultiplier;
        break;
      case "SUSPENSE":
        utterance.pitch = options.pitch ?? 0.9;
        utterance.rate = (options.rate ?? 1.05) * this.speedMultiplier;
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
      setTimeout(() => {
        if (this.currentSubtitles === formattedText) {
          this.notifySubtitles("");
        }
      }, 2500);
    };

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Erreur lors de la lecture vocale", e);
    }
  }

  // --- Raccourcis narratifs enrichis ---
  public speakRandomRemark(category: keyof typeof FUNNY_REMARKS, tone: VoiceTone = "HUMOR") {
    const list = FUNNY_REMARKS[category];
    if (!list || list.length === 0) return;
    const text = list[Math.floor(Math.random() * list.length)];
    this.speak(text, { tone });
  }

  public speakIntro(gameName: string) {
    this.speak(`Bienvenue dans ${gameName} sur VYLO ! Préparez-vous, la partie commence maintenant !`, { tone: "ANNOUNCEMENT" });
  }

  public speakElimination(name: string, role?: string) {
    const text = role 
      ? `C'est terminé pour ${name} ! Son rôle était : ${role} !`
      : `Le joueur ${name} a été éliminé du jeu !`;
    this.speak(text, { tone: "DRAMA" });
  }

  private playToneAmbiance(tone: VoiceTone) {
    try {
      switch (tone) {
        case "NIGHT":
        case "MYSTICAL":
        case "SABOTEUR":
          sfxReveal();
          break;
        case "SUSPENSE":
        case "DRAMA":
          sfxSuspense();
          break;
        case "VICTORY":
        case "HUMOR":
          sfxVictory();
          break;
        case "DAY":
        case "QUIZ_HOST":
        case "ANNOUNCEMENT":
          sfxSuccess();
          break;
      }
    } catch (e) {
      // Ignorer les erreurs audio non débloqué
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
