/**
 * VYLO Sound Engine — Web Audio API
 * Sons synthétisés sans aucun fichier externe.
 * Ultra-léger, zéro dépendance, zéro latence.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15,
  fadeOut = true
) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);

  if (fadeOut) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playChord(frequencies: number[], duration: number, type: OscillatorType = "sine", volume = 0.08) {
  frequencies.forEach(f => playTone(f, duration, type, volume));
}

// ─── SOUND EFFECTS ─────────────────────────────────────────

/** Petit clic tactile (bouton) */
export function sfxTap() {
  playTone(800, 0.06, "square", 0.05);
}

/** Son de succès / validation */
export function sfxSuccess() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  [523, 659, 784].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.12, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.3);
  });
}

/** Son d'erreur / élimination */
export function sfxError() {
  playTone(220, 0.3, "sawtooth", 0.1);
  setTimeout(() => playTone(180, 0.4, "sawtooth", 0.08), 150);
}

/** Suspense — montée de tension */
export function sfxSuspense() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.linearRampToValueAtTime(600, now + 1.2);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 1.5);
}

/** Fanfare de victoire */
export function sfxVictory() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  const notes = [523, 659, 784, 1047]; // Do Mi Sol Do (octave)

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.15, now + i * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 0.5);
  });
}

/** Son de notification / nouveau joueur rejoint */
export function sfxJoin() {
  playTone(880, 0.1, "sine", 0.1);
  setTimeout(() => playTone(1100, 0.15, "sine", 0.08), 80);
}

/** Son de vote / sélection */
export function sfxSelect() {
  playTone(600, 0.08, "triangle", 0.1);
}

/** Révélation d'un mot secret (mystérieux) */
export function sfxReveal() {
  playChord([330, 415, 523], 0.6, "sine", 0.06);
}

/** Compte à rebours (tick) */
export function sfxTick() {
  playTone(1000, 0.03, "square", 0.04);
}
