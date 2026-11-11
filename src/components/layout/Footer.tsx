"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { sfxTap } from "@/lib/audio";

export function Footer() {
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

  return (
    <footer className="w-full py-6 pb-24 md:pb-8 border-t border-border bg-surface mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <div className="flex flex-wrap items-center justify-center gap-5 font-bold">
          <Link href="/library" prefetch={false} onClick={() => sfxTap()} className="hover:text-foreground transition-colors">
            Catalogue des jeux
          </Link>
          <Link href="/rules" prefetch={false} onClick={() => sfxTap()} className="hover:text-foreground transition-colors">
            Règles rapides
          </Link>
          <Link href="/join" prefetch={false} onClick={() => sfxTap()} className="hover:text-foreground transition-colors">
            Rejoindre un salon
          </Link>
        </div>

        <div className="flex items-center gap-3 font-semibold">
          <span>VYLO © 2026</span>
          <span aria-hidden="true" className="opacity-35">•</span>
          <a
            href="https://johansonweb.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfxTap()}
            className="inline-flex items-center gap-1 font-bold text-foreground hover:text-primary transition-colors"
          >
            Johanson <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
