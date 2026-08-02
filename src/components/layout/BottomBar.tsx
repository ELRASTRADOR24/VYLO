"use client";

import { Home, User, QrCode, Grid2X2 } from "lucide-react"; // Wait, Grid2X2 doesn't exist maybe? Let's use Grid
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Using valid lucide-react icons
import { LayoutGrid } from "lucide-react";

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
      <div className="bg-surface/80 backdrop-blur-xl border border-border/50 mx-4 mb-6 flex items-center justify-around rounded-[1.75rem] p-2 pointer-events-auto shadow-soft">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-300",
                isActive ? "text-white bg-white/5" : "text-foreground/40 hover:text-foreground/80 active:scale-95 active:bg-white/5"
              )}
            >
              <Icon className="h-6 w-6 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
