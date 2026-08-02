"use client";

import { Home, User, QrCode, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomBar() {
  const pathname = usePathname();

  // Masquer la BottomBar dans les flux de jeu et salons pour libérer tout l'espace
  if (
    pathname.includes("/setup") || 
    pathname.includes("/lobby") || 
    pathname.includes("/play") || 
    pathname.includes("/online")
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <div className="bg-surface/85 backdrop-blur-2xl border border-white/15 mx-4 mb-6 flex items-center justify-around rounded-[2rem] p-2 pointer-events-auto shadow-summer-glow">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-5 py-2.5 rounded-2xl transition-all duration-300",
                isActive 
                  ? "text-white bg-gradient-summer shadow-soft scale-105" 
                  : "text-foreground/50 hover:text-foreground/90 active:scale-95"
              )}
            >
              <Icon className="h-5 w-5 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-black tracking-wider uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
