"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import {
  Menu,
  X,
  Home,
  LayoutGrid,
  QrCode,
  User,
  Lock,
  LogIn,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sfxTap } from "@/lib/audio";
import { VyloMascot, VyloWordmark } from "@/components/illustrations/GameIllustrations";

const ProfileModal = dynamic(
  () => import("@/components/ui/ProfileModal").then((mod) => mod.ProfileModal),
  { ssr: false }
);
const AuthModal = dynamic(
  () => import("@/components/ui/AuthModal").then((mod) => mod.AuthModal),
  { ssr: false }
);

export function HeaderNavbar() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { guestProfile, activeAccount } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = mounted ? activeAccount?.username || guestProfile.pseudo : "Invité";
  const displayAvatar = mounted ? guestProfile.avatar : "👻";
  const isCustomImage =
    mounted && (displayAvatar.startsWith("http") || displayAvatar.startsWith("data:"));

  const links = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/library", icon: LayoutGrid, label: "Jeux" },
    { href: "/rules", icon: BookOpen, label: "Règles" },
    { href: "/join", icon: QrCode, label: "Rejoindre" },
    { href: "/profile", icon: User, label: "Profil" },
  ];

  const openDrawer = () => {
    sfxTap();
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDrawer = () => {
    setIsOpen(false);
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      {isEditProfileOpen && (
        <ProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      )}
      {isAuthOpen && (
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      )}

      <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-primary rounded-xl"
            onClick={() => sfxTap()}
          >
            <VyloMascot className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 drop-shadow-xs" />
            <VyloWordmark className="h-[18px] sm:h-[20px] w-auto text-foreground" />
            <span className="sr-only">VYLO</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => sfxTap()}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-[#FEEBEB] text-[#C22E2E]"
                      : "text-muted hover:text-foreground hover:bg-surface-elevated"
                  )}
                >
                  <Icon
                    size={15}
                    aria-hidden="true"
                    className={isActive ? "text-primary" : "text-muted"}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sfxTap();
                setIsEditProfileOpen(true);
              }}
              aria-label={`Profil de ${displayName}`}
              className="flex items-center gap-2 h-9 px-3 rounded-xl bg-surface-elevated border border-border hover:border-[var(--border-strong)] text-xs font-bold text-foreground transition-colors cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full overflow-clip bg-surface flex items-center justify-center text-xs shrink-0">
                {isCustomImage ? (
                  <img src={displayAvatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span aria-hidden="true">{displayAvatar}</span>
                )}
              </span>
              <span className="hidden sm:inline truncate max-w-[110px]">{displayName}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sfxTap();
                setIsAuthOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-[#D43B3B] text-white transition-colors cursor-pointer"
            >
              {mounted && activeAccount ? (
                <User size={14} aria-hidden="true" />
              ) : (
                <LogIn size={14} aria-hidden="true" />
              )}
              <span>{mounted && activeAccount ? "Compte" : "Connexion"}</span>
            </button>

            <button
              type="button"
              onClick={openDrawer}
              aria-expanded={isOpen}
              aria-controls="vylo-mobile-drawer"
              aria-label="Ouvrir le menu"
              className="flex md:hidden h-9 w-9 rounded-xl bg-surface-elevated border border-border items-center justify-center text-foreground hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="vylo-mobile-drawer"
        ref={dialogRef}
        aria-label="Menu de navigation mobile"
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDrawer();
        }}
        className="vylo-drawer md:hidden"
      >
        <div className="ml-auto w-[84vw] max-w-xs h-svh bg-surface border-l border-border flex flex-col justify-between p-5 shadow-2xl overflow-y-auto overscroll-contain">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <VyloMascot className="w-8 h-8 shrink-0" />
                <VyloWordmark className="h-[17px] w-auto text-foreground" />
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Fermer le menu"
                autoFocus
                className="h-9 w-9 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-muted hover:text-foreground cursor-pointer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                closeDrawer();
                setIsEditProfileOpen(true);
              }}
              className="w-full p-3.5 rounded-xl bg-surface-elevated border border-border flex items-center justify-between text-left hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-clip bg-surface flex items-center justify-center font-bold text-base shrink-0 border border-border">
                  {isCustomImage ? (
                    <img src={displayAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span aria-hidden="true">{displayAvatar}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm text-foreground truncate">{displayName}</div>
                  <div className="text-xs text-muted">
                    {mounted && activeAccount ? "Compte connecté" : "Modifier pseudo & avatar"}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} aria-hidden="true" className="text-muted shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => {
                closeDrawer();
                setIsAuthOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#FEEBEB] border border-primary/20 flex items-center justify-between text-xs font-bold text-[#C22E2E] hover:bg-[#FDD8D8] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Lock size={14} aria-hidden="true" />
                {mounted && activeAccount ? "Gérer mon compte" : "Se connecter / Créer un compte"}
              </span>
              <ChevronRight size={14} aria-hidden="true" />
            </button>

            <nav aria-label="Liens rapides mobile" className="space-y-1">
              {links.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      sfxTap();
                      closeDrawer();
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-foreground/80 hover:text-foreground hover:bg-surface-elevated"
                    )}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted">
            <span>VYLO</span>
            <a
              href="https://johansonweb.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sfxTap()}
              className="font-bold text-foreground hover:text-primary transition-colors"
            >
              Par Johanson
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
