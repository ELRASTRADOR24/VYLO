"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";

export default function OnlineRoomRedirect({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { isConnected, roomState, joinRoom } = useSocket();

  useEffect(() => {
    if (isConnected && guestProfile?.pseudo) {
      joinRoom(roomId, "", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [isConnected, guestProfile?.pseudo, guestProfile?.avatar, roomId, joinRoom]);

  useEffect(() => {
    if (roomState?.gameId) {
      const gId = roomState.gameId;
      if (gId === "undercover") {
        router.replace(`/online/undercover/${roomId}`);
      } else if (gId === "saboteur") {
        router.replace(`/online/saboteur/${roomId}`);
      } else if (gId === "blind-test") {
        router.replace(`/online/blind-test/${roomId}`);
      } else if (gId === "truth-or-dare") {
        router.replace(`/online/truth-or-dare/${roomId}`);
      } else if (gId === "tu-preferes") {
        router.replace(`/online/tu-preferes/${roomId}`);
      } else if (gId === "word-master") {
        router.replace(`/online/word-master/${roomId}`);
      } else if (gId === "flag-quiz") {
        router.replace(`/online/flag-quiz/${roomId}`);
      } else {
        router.replace(`/online/${gId}/${roomId}`);
      }
    }
  }, [roomState?.gameId, roomId, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-foreground/50">Connexion au salon {roomId}...</p>
      </div>
    </main>
  );
}
