"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { sfxTap } from "@/lib/audio";

const EMOJI_LIST = ["😂", "🔥", "😱", "👏", "💩", "👑"];

interface FloatingItem {
  id: number;
  emoji: string;
  senderName?: string;
  leftPercent: number;
}

export function FloatingEmojis({ 
  socket, 
  roomCode, 
  senderName 
}: { 
  socket: Socket | null; 
  roomCode: string; 
  senderName?: string;
}) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleReaction = (data: { emoji: string; senderName?: string; id: number }) => {
      const leftPercent = Math.floor(Math.random() * 70) + 15;
      const newItem: FloatingItem = {
        id: data.id || Date.now(),
        emoji: data.emoji,
        senderName: data.senderName,
        leftPercent,
      };

      setItems(prev => [...prev.slice(-15), newItem]);

      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
      }, 3000);
    };

    socket.on("game:emoji_reaction", handleReaction);

    return () => {
      socket.off("game:emoji_reaction", handleReaction);
    };
  }, [socket]);

  const sendEmoji = (emoji: string) => {
    sfxTap();
    if (socket) {
      socket.emit("game:emoji_reaction", { roomCode, emoji, senderName });
    }
  };

  return (
    <>
      {/* Container d'emojis flottants */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {items.map(item => (
          <div
            key={item.id}
            className="absolute bottom-20 flex flex-col items-center animate-float-up opacity-90"
            style={{ left: `${item.leftPercent}%` }}
          >
            <span className="text-4xl md:text-5xl drop-shadow-lg">{item.emoji}</span>
            {item.senderName && (
              <span className="text-[10px] font-black text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                {item.senderName}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Barre d'outils de réactions emojis */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-surface/90 backdrop-blur-2xl border-2 border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-2xl">
        {EMOJI_LIST.map(emoji => (
          <button
            key={emoji}
            type="button"
            onClick={() => sendEmoji(emoji)}
            className="w-9 h-9 md:w-10 md:h-10 text-lg md:text-xl rounded-full hover:bg-white/10 active:scale-125 transition-transform flex items-center justify-center cursor-pointer"
            title={`Envoyer ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </>
  );
}
