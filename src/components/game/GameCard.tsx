"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  difficulty: string;
  themeColor: "primary" | "accent" | "secondary" | "pink" | "purple";
  icon: React.ReactNode;
}

export function GameCard({ title, description, minPlayers, maxPlayers, difficulty, themeColor, icon }: GameCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -3 }} className="w-full">
      <Card className="flex flex-col relative group cursor-pointer border border-white/10 hover:border-primary/50 transition-all shadow-soft hover:shadow-summer-glow overflow-hidden">
        <div className={cn(
          "absolute top-0 left-0 right-0 h-36 opacity-30 group-hover:opacity-50 transition-opacity",
          {
            "bg-gradient-to-b from-primary via-accent/30 to-transparent": themeColor === "primary",
            "bg-gradient-to-b from-accent via-pink/30 to-transparent": themeColor === "accent",
            "bg-gradient-to-b from-secondary via-primary/30 to-transparent": themeColor === "secondary",
            "bg-gradient-to-b from-pink via-accent/30 to-transparent": themeColor === "pink",
            "bg-gradient-to-b from-purple via-secondary/30 to-transparent": themeColor === "purple",
          }
        )} />
        
        <div className="p-6 relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className={cn(
              "p-4 rounded-2xl text-white shadow-soft transition-transform group-hover:scale-105",
              {
                "bg-gradient-summer shadow-summer-glow": themeColor === "primary",
                "bg-gradient-to-r from-accent to-pink": themeColor === "accent",
                "bg-gradient-to-r from-secondary to-primary shadow-blue-glow": themeColor === "secondary",
                "bg-gradient-to-r from-pink to-accent": themeColor === "pink",
                "bg-gradient-to-r from-purple to-secondary": themeColor === "purple",
              }
            )}>
              {icon}
            </div>
            <span className="text-xs font-extrabold text-foreground/50">
              {minPlayers}-{maxPlayers} joueurs
            </span>
          </div>

          <div className="mt-1">
            <h2 className="text-2xl font-black mb-1.5 group-hover:text-primary transition-colors">
              {title}
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed font-medium">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
