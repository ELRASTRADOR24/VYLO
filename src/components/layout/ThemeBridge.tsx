"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Préserve la lisibilité des salles /play/* et /online/<jeu>/<salon> qui utilisent encore
 * l'ancien thème sombre, tout en laissant Undercover et la redirection /online/<code>
 * profiter de la charte claire Casual Moderne.
 */
export function ThemeBridge() {
  const pathname = usePathname();

  useEffect(() => {
    const isLegacyPlay =
      pathname.startsWith("/play/") && !pathname.startsWith("/play/undercover");
    const isLegacyOnlineGame =
      /^\/online\/(?!undercover(?:\/|$))[a-z]+(?:-[a-z]+)*\/.+/.test(pathname);
    const isLegacyRoom = isLegacyPlay || isLegacyOnlineGame;

    if (isLegacyRoom) {
      document.documentElement.dataset.vyloRoom = "legacy";
    } else {
      delete document.documentElement.dataset.vyloRoom;
    }
  }, [pathname]);

  return null;
}
