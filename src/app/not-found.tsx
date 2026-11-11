import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-[#FEEBEB] text-primary flex items-center justify-center mb-6 border border-[#E84545]/25 shadow-sm">
        <HelpCircle size={38} aria-hidden="true" />
      </div>

      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Page introuvable</h1>
      <p className="text-muted text-sm font-semibold mb-8 leading-relaxed">
        La page ou le salon de jeu que vous recherchez n'existe plus.
      </p>

      <Link href="/" className="w-full">
        <Button variant="primary" size="lg" className="w-full gap-2 rounded-full">
          <Home size={18} aria-hidden="true" /> Retourner à l'accueil
        </Button>
      </Link>
    </main>
  );
}
