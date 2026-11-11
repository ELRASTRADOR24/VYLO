"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, QrCode } from "lucide-react";
import Button from "@/components/ui/Button";
import { sfxSuccess, sfxTap } from "@/lib/audio";

export function HomeHeroActions() {
  const router = useRouter();

  const handleCreateLobby = () => {
    sfxSuccess();
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/lobby/${roomCode}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button
        size="md"
        variant="primary"
        onClick={handleCreateLobby}
        className="flex-1 sm:flex-none gap-2 rounded-xl whitespace-nowrap px-4"
      >
        <Plus size={17} aria-hidden="true" />
        Créer un salon
      </Button>

      <Link
        href="/join"
        prefetch={false}
        onClick={() => sfxTap()}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-11 px-4 py-2.5 rounded-xl text-sm font-bold tracking-tight bg-surface border border-[var(--border-strong)] text-foreground hover:bg-surface-elevated active-press transition-colors whitespace-nowrap"
      >
        <QrCode size={17} className="text-secondary" aria-hidden="true" />
        Rejoindre
      </Link>
    </div>
  );
}
