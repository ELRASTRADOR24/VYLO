"use client";

import { Home, User, QrCode, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sfxTap } from "@/lib/audio";

export function BottomBar() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/setup") ||
    pathname.startsWith("/lobby") ||
    pathname.startsWith("/play") ||
    pathname.startsWith("/online") ||
    pathname.startsWith("/rules")
  ) {
    return null;
  }

  const links = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/library", icon: LayoutGrid, label: "Jeux" },
    { href: "/join", icon: QrCode, label: "Rejoindre" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 px-3 shadow-[0_-6px_18px_-10px_rgba(22,24,36,0.1)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              prefetch={false}
              aria-current={isActive ? "page" : undefined}
              onClick={() => sfxTap()}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-colors",
                isActive
                  ? "text-[#C22E2E] bg-[#FEEBEB] font-bold"
                  : "text-muted hover:text-foreground font-semibold"
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "text-primary")}
                strokeWidth={isActive ? 2.4 : 2}
                aria-hidden="true"
              />
              <span className="text-[11px] leading-none mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
