"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnlineRoomRedirect({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/online/undercover/${roomId}`);
  }, [roomId, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="text-sm font-bold text-foreground/50 animate-pulse">Connexion au salon {roomId}...</p>
      </div>
    </main>
  );
}
