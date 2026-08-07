"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { 
  Menu, X, Home, LayoutGrid, QrCode, User, Sparkles, Flame, ChevronRight, FlaskConical, Lock, LogIn, BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sfxTap } from "@/lib/audio";

const ProfileModal = dynamic(() => import("@/components/ui/ProfileModal").then(mod => mod.ProfileModal), { ssr: false });
const AuthModal = dynamic(() => import("@/components/ui/AuthModal").then(mod => mod.AuthModal), { ssr: false });

export function HeaderNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { guestProfile, activeAccount } = useAppStore();

  const isCustomImage = guestProfile.avatar.startsWith("http") || guestProfile.avatar.startsWith("data:");

  const links = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/library", icon: LayoutGrid, label: "Jeux" },
    { href: "/rules", icon: BookOpen, label: "Règles" },
    { href: "/join", icon: QrCode, label: "Rejoindre" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <>
      <ProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Header Bar Globale */}
      <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-xl border-b border-white/10 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* GAUCHE : Logo & Badge Version */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => sfxTap()}>
            <span className="text-2xl font-black tracking-tight text-gradient-summer">VYLO</span>
            <span className="text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
              Bêta
            </span>
          </Link>

          {/* CENTRE : Navigation Desktop (Affichage propre sans chevauchement) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  onClick={() => sfxTap()}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap",
                    isActive
                      ? "bg-gradient-summer text-white shadow-summer-glow"
                      : "text-foreground/75 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* DROITE : Badges Stats & Profil (Harmonisé & Responsive) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Badge Points ⚡ */}
            <div className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-black text-amber-400 whitespace-nowrap">
              <span>⚡</span>
              <span>2 450</span>
            </div>

            {/* Badge Bienvenue Profil (Desktop Large) */}
            <button 
              onClick={() => { sfxTap(); setIsEditProfileOpen(true); }}
              className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-black text-foreground hover:border-primary/40 transition-all whitespace-nowrap"
            >
              <span>👋</span>
              <span className="truncate max-w-[100px]">
                <strong className="text-primary">{guestProfile.pseudo}</strong>
              </span>
            </button>

            {/* Bouton Connexion Desktop */}
            <button
              onClick={() => { sfxTap(); setIsAuthOpen(true); }}
              className="hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-xs font-black bg-white/5 hover:bg-white/10 border border-white/10 text-primary transition-all active:scale-95 whitespace-nowrap"
            >
              {activeAccount ? <User size={14} /> : <LogIn size={14} />}
              <span>{activeAccount ? activeAccount.username : "Connexion"}</span>
            </button>

            {/* Profil Miniature Mobile / Tablette */}
            <button 
              onClick={() => { sfxTap(); setIsEditProfileOpen(true); }}
              className="flex sm:hidden w-9 h-9 rounded-full overflow-hidden bg-purple-500/20 border border-white/10 items-center justify-center text-xs font-black shrink-0"
              aria-label="Mon Profil"
            >
              {isCustomImage ? (
                <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{guestProfile.avatar}</span>
              )}
            </button>

            {/* Bouton Hamburger Mobile (`md:hidden`) */}
            <button
              onClick={() => { sfxTap(); setIsOpen(!isOpen); }}
              className="flex md:hidden h-9 w-9 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft shrink-0"
              aria-label="Menu de navigation"
            >
              {isOpen ? <X size={20} className="text-primary" /> : <Menu size={20} />}
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
                className="p-3.5 mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-primary/40 transition-all"
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
                    <span className="text-[10px] text-primary font-bold">
                      {activeAccount ? `Compte : ${activeAccount.username}` : "Modifier le profil"}
                    </span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-foreground/40" />
              </div>

              {/* Bouton Espace Connexion dans le Drawer */}
              <button
                onClick={() => { setIsOpen(false); setIsAuthOpen(true); }}
                className="w-full py-3 mb-6 px-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs font-black text-primary hover:bg-primary/20 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Lock size={14} /> Espace Connexion / Inscription
                </span>
                <ChevronRight size={14} />
              </button>

              {/* Liens de Navigation Mobile */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-2 px-1">Navigation</span>
                {links.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => { sfxTap(); setIsOpen(false); }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-all",
                        isActive
                          ? "bg-gradient-summer text-white shadow-summer-glow"
                          : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footer du Drawer */}
            <div className="pt-4 border-t border-white/10 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-foreground/70">
                <span>Développé par</span>
                <a
                  href="https://johansonweb.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfxTap()}
                  className="text-white font-extrabold hover:text-primary transition-colors"
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
