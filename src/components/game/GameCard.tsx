"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Users, Zap } from "lucide-react";
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
    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
      <Card className="flex flex-col relative group cursor-pointer border-transparent hover:border-white/10 transition-colors">
        <div className={cn(
          "absolute top-0 left-0 right-0 h-32 opacity-20",
          {
            "bg-gradient-to-b from-primary to-transparent": themeColor === "primary",
            "bg-gradient-to-b from-accent to-transparent": themeColor === "accent",
            "bg-gradient-to-b from-secondary to-transparent": themeColor === "secondary",
            "bg-gradient-to-b from-pink to-transparent": themeColor === "pink",
            "bg-gradient-to-b from-purple-500 to-transparent": themeColor === "purple",
          }
        )} />
        
        <div className="p-6 relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className={cn(
              "p-4 rounded-2xl text-white shadow-soft",
              {
                "bg-primary": themeColor === "primary",
                "bg-accent": themeColor === "accent",
                "bg-secondary": themeColor === "secondary",
                "bg-pink": themeColor === "pink",
                "bg-purple-500": themeColor === "purple",
              }
            )}>
              {icon}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full text-xs font-semibold text-foreground/90 backdrop-blur-sm">
                <Users className="w-3.5 h-3.5" />
                <span>{minPlayers}-{maxPlayers}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full text-xs font-semibold text-foreground/90 backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5" />
                <span>{difficulty}</span>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-2xl font-bold mb-1.5">{title}</h2>
            <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
