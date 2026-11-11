"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, Clipboard, ArrowRight, AlertCircle, Loader2, UserCheck, Pencil } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sfxTap, sfxSuccess, sfxError } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import {
  getOrCreateOnlinePlayerId,
  getSocketApiBaseUrl,
  isValidOnlinePseudo,
  normalizeRoomCode,
  sanitizePseudo,
} from "@/lib/onlineIdentity";

export default function JoinClient() {
  const [code, setCode] = useState("");
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [editingPseudo, setEditingPseudo] = useState(false);
  const [pseudoInput, setPseudoInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { guestProfile, activeAccount, updateGuestProfile } = useAppStore();

  useEffect(() => {
    const persistApi = useAppStore.persist;
    if (persistApi?.hasHydrated?.()) setHydrated(true);
    const unsub = persistApi?.onFinishHydration?.(() => setHydrated(true));
    const timer = setTimeout(() => setHydrated(true), 0);
    return () => {
      clearTimeout(timer);
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const savedPseudo = activeAccount?.username || guestProfile?.pseudo || "";
  const hasSavedPseudo = hydrated && isValidOnlinePseudo(savedPseudo);

  useEffect(() => {
    if (hydrated && isValidOnlinePseudo(savedPseudo) && !pseudoInput) {
      setPseudoInput(savedPseudo);
    }
  }, [hydrated, savedPseudo, pseudoInput]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (val: string) => {
    const clean = normalizeRoomCode(val).slice(0, 6);
    setCode(clean);
    if (errorMsg) setErrorMsg(null);
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
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (key: string) => {
    sfxTap();
    if (errorMsg) setErrorMsg(null);
    if (code.length < 6) {
      setCode((prev) => (prev + key).slice(0, 6));
    }
  };

  const handleBackspace = () => {
    sfxTap();
    if (errorMsg) setErrorMsg(null);
    setCode((prev) => prev.slice(0, -1));
  };

  const handleJoin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length < 6 || checking) return;

    const effectivePseudo =
      hasSavedPseudo && !editingPseudo ? savedPseudo : sanitizePseudo(pseudoInput);

    if (!isValidOnlinePseudo(effectivePseudo)) {
      sfxError();
      setEditingPseudo(true);
      setErrorMsg("Entrez votre prénom ou pseudo (min. 2 caractères) avant de rejoindre.");
      return;
    }

    if (!hasSavedPseudo || editingPseudo) {
      updateGuestProfile({
        pseudo: effectivePseudo,
        avatar: guestProfile.avatar === "👻" ? "😎" : guestProfile.avatar,
      });
      setEditingPseudo(false);
    }

    setChecking(true);
    setErrorMsg(null);

    try {
      const playerId = getOrCreateOnlinePlayerId();
      const apiBase = getSocketApiBaseUrl();
      const res = await fetch(
        `${apiBase}/api/rooms/check?code=${encodeURIComponent(code)}&playerId=${encodeURIComponent(playerId)}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("CHECK_FAILED");
      }
      const data = (await res.json()) as {
        exists: boolean;
        roomCode?: string;
        gameId?: string;
        joinable?: boolean;
        reason?: string;
      };

      if (!data.exists || !data.gameId) {
        sfxError();
        setErrorMsg(`Aucun salon actif trouvé avec le code ${code}. Vérifiez auprès de l'hôte.`);
        setChecking(false);
        return;
      }

      if (!data.joinable) {
        sfxError();
        setErrorMsg(
          data.reason === "ROOM_FULL"
            ? "Ce salon est déjà complet."
            : "La partie a déjà commencé dans ce salon."
        );
        setChecking(false);
        return;
      }

      sfxSuccess();
      router.push(`/online/${data.gameId}/${data.roomCode || code}`);
    } catch {
      sfxError();
      setErrorMsg("Impossible de joindre le serveur VYLO. Vérifiez votre connexion.");
      setChecking(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-4 pb-28 md:pb-16 w-full max-w-md md:max-w-xl mx-auto text-center">
      <div className="w-full flex items-center justify-between mb-4">
        <Link
          href="/"
          prefetch={false}
          onClick={() => sfxTap()}
          className="h-9 px-3.5 bg-surface border border-border rounded-full inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 text-primary" aria-hidden="true" /> Retour
        </Link>
        <div className="w-16" />
      </div>

      <div className="w-full flex flex-col items-center mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider bg-[#EEF2FF] text-[#4338CA] px-3 py-0.5 rounded-full mb-2">
          Salon à distance
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight mb-1 text-foreground">
          Rejoindre un salon
        </h1>
        <p className="text-muted font-semibold text-xs sm:text-sm">
          Entrez le code à 6 chiffres partagé par votre hôte.
        </p>
      </div>

      <form onSubmit={handleJoin} className="w-full flex flex-col items-center">
        {/* Identité du joueur (empêche d'arriver en "Invité") */}
        <div className="w-full max-w-xs mb-4">
          {hasSavedPseudo && !editingPseudo ? (
            <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-surface border border-border text-xs font-bold text-foreground shadow-sm">
              <span className="flex items-center gap-2 truncate">
                <UserCheck size={14} className="text-primary shrink-0" aria-hidden="true" />
                <span>Pseudo :</span>
                <span className="text-primary truncate">{savedPseudo}</span>
              </span>
              {!activeAccount && (
                <button
                  type="button"
                  onClick={() => {
                    sfxTap();
                    setPseudoInput(savedPseudo);
                    setEditingPseudo(true);
                  }}
                  className="text-muted hover:text-foreground inline-flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                >
                  <Pencil size={12} aria-hidden="true" /> Modifier
                </button>
              )}
            </div>
          ) : (
            <div className="text-left space-y-1">
              <label
                htmlFor="join-pseudo-input"
                className="text-[11px] font-bold uppercase tracking-wider text-muted pl-1 block"
              >
                Votre prénom / pseudo *
              </label>
              <input
                id="join-pseudo-input"
                type="text"
                maxLength={20}
                value={pseudoInput}
                onChange={(e) => {
                  setPseudoInput(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Ex : Sam, Léa, Alex..."
                className="w-full h-11 px-4 rounded-2xl bg-surface border border-border focus:border-primary outline-none text-sm font-bold text-foreground shadow-sm placeholder:text-muted/60"
              />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => handleInputChange(e.target.value)}
          aria-label="Code du salon à 6 chiffres"
          className="sr-only"
        />

        {/* Cases code */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex gap-2 md:gap-3 mb-3 cursor-pointer group"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-11 h-14 sm:w-13 sm:h-16 rounded-2xl bg-surface border-2 flex items-center justify-center shadow-sm transition-all ${
                code.length === i
                  ? "border-primary shadow-summer-glow scale-105"
                  : code[i]
                  ? "border-primary/45"
                  : "border-border group-hover:border-[var(--border-strong)]"
              }`}
            >
              <span className="font-mono text-2xl md:text-3xl font-bold text-foreground">
                {code[i] || ""}
              </span>
            </div>
          ))}
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="w-full max-w-xs mb-3 p-3 rounded-2xl bg-[#FEEBEB] border border-primary/30 text-xs font-bold text-[#C22E2E] flex items-center gap-2 text-left"
          >
            <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="px-4 py-2 rounded-full bg-surface border border-border hover:border-primary/40 text-xs font-bold text-muted hover:text-primary flex items-center gap-2 transition-all active-press cursor-pointer"
          >
            <Clipboard size={14} className="text-primary" aria-hidden="true" />
            {copiedSuccess ? "Code collé !" : "Coller le code"}
          </button>
        </div>

        {/* Pavé numérique compact */}
        <div className="w-full max-w-xs grid grid-cols-3 gap-2.5 mb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num.toString())}
              className="h-12 sm:h-14 rounded-2xl bg-surface border border-border text-xl sm:text-2xl font-display font-bold active-press shadow-sm text-foreground hover:bg-surface-elevated cursor-pointer"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleKeyPress("0")}
            className="h-12 sm:h-14 rounded-2xl bg-surface border border-border text-xl sm:text-2xl font-display font-bold active-press shadow-sm text-foreground hover:bg-surface-elevated cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Effacer un chiffre"
            className="h-12 sm:h-14 rounded-2xl bg-surface-elevated border border-border text-lg sm:text-xl font-bold active-press text-muted flex items-center justify-center hover:text-foreground cursor-pointer"
          >
            ⌫
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full max-w-xs gap-2 rounded-full"
          disabled={code.length < 6 || checking}
        >
          {checking ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Vérification...
            </>
          ) : (
            <>
              Rejoindre la partie <ArrowRight size={19} aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </main>
  );
}
