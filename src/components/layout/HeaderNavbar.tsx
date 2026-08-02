"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { 
  Menu, X, Home, LayoutGrid, QrCode, User, Sparkles, Flame, ChevronRight, FlaskConical 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sfxTap } from "@/lib/audio";
import { ProfileModal } from "@/components/ui/ProfileModal";

export function HeaderNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const { guestProfile } = useAppStore();

  const isCustomImage = guestProfile.avatar.startsWith("http") || guestProfile.avatar.startsWith("data:");

  const links = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/library", icon: LayoutGrid, label: "Jeux & Bibliothèque" },
    { href: "/join", icon: QrCode, label: "Rejoindre un salon" },
    { href: "/profile", icon: User, label: "Mon Profil" },
  ];

  const handleNavClick = () => {
    sfxTap();
    setIsOpen(false);
  };

  return (
    <>
      <ProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />

      {/* Header Bar Globale */}
      <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-xl border-b border-white/10 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => sfxTap()}>
            <span className="text-2xl font-black tracking-tight text-gradient-summer">VYLO</span>
            <span className="text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md">
              Bêta
            </span>
          </Link>

          {/* Navigation Desktop (`hidden md:flex`) */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => sfxTap()}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all",
                    isActive
                      ? "bg-gradient-summer text-white shadow-summer-glow"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bouton Hamburger Mobile (`md:hidden`) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Profil miniature mobile */}
            <button 
              onClick={() => setIsEditProfileOpen(true)}
              className="w-8 h-8 rounded-full overflow-hidden bg-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-black"
            >
              {isCustomImage ? (
                <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{guestProfile.avatar}</span>
              )}
            </button>

            <button
              onClick={() => { sfxTap(); setIsOpen(!isOpen); }}
              className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft"
              aria-label="Menu de navigation"
            >
              {isOpen ? <X size={22} className="text-primary" /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* TIROIR DE NAVIGATION MOBILE (Slide-Out à Droite) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop sombre */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={() => setIsOpen(false)} 
          />

          {/* Panneau latéral droit (Drawer) */}
          <div className="relative w-4/5 max-w-sm h-full bg-surface/95 border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300">
            <div>
              {/* Header du Drawer */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-gradient-summer">VYLO</span>
                  <span className="text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md">
                    Menu
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/60 hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Carte Profil dans le Menu */}
              <div 
                onClick={() => { setIsOpen(false); setIsEditProfileOpen(true); }}
                className="p-3.5 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500/20 border border-white/10 flex items-center justify-center font-black text-sm">
                    {isCustomImage ? (
                      <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{guestProfile.avatar}</span>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-black text-sm text-foreground">{guestProfile.pseudo}</span>
                    <span className="text-[10px] text-primary font-bold">Modifier le profil</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-foreground/40" />
              </div>

              {/* Liens de Navigation */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-2 px-1">Navigation</span>
                {links.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center justify-between p-3.5 rounded-2xl font-black text-sm transition-all active:scale-98",
                        isActive
                          ? "bg-gradient-summer text-white shadow-summer-glow"
                          : "bg-white/5 border border-white/5 text-foreground/80 hover:text-foreground hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "text-primary"} />
                        <span>{label}</span>
                      </div>
                      <ChevronRight size={16} className={isActive ? "text-white" : "text-foreground/30"} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footer du Drawer */}
            <div className="pt-4 border-t border-white/10 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black text-foreground/80">
                <span>Développé avec</span>
                <span>🖐️</span>
                <span>par</span>
                <a
                  href="https://www.xn--dynaceglobalsant-top-q2b.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfxTap()}
                  className="text-primary font-black hover:underline"
                >
                  Johanson
                </a>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                <FlaskConical size={12} /> Plateforme Bêta V0.9
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
