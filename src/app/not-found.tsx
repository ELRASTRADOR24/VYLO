import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { HelpCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 border border-primary/40 shadow-summer-glow">
        <HelpCircle size={40} />
      </div>

      <h1 className="text-4xl font-black text-foreground mb-2">Page Introuvable (404)</h1>
      <p className="text-foreground/60 text-sm font-bold mb-8 leading-relaxed">
        La page ou le salon de jeu que vous recherchez n'existe pas ou a expiré.
      </p>

      <Link href="/" className="w-full">
        <Button variant="primary" className="w-full py-4 text-md font-black gap-2 shadow-summer-glow">
          <Home size={18} /> Retourner à l'accueil
        </Button>
      </Link>
    </main>
  );
}
