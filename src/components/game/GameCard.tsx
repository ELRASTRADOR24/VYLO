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
    <motion.div whileTap={{ scale: 0.98 }} className="w-full">
      <Card className="flex flex-col relative group cursor-pointer border border-white/10 hover:border-white/25 transition-all shadow-soft overflow-hidden">
        {/* Solid header accent bar */}
        <div className={cn(
          "h-2 w-full",
          {
            "bg-[#FF4757]": themeColor === "primary",
            "bg-[#FFA502]": themeColor === "accent",
            "bg-[#3742FA]": themeColor === "secondary",
            "bg-[#FF6B81]": themeColor === "pink",
            "bg-[#70A1FF]": themeColor === "purple",
          }
        )} />
        
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className={cn(
              "p-4 rounded-2xl text-white shadow-soft transition-transform group-hover:scale-105",
              {
                "bg-[#FF4757]": themeColor === "primary",
                "bg-[#FFA502] text-black": themeColor === "accent",
                "bg-[#3742FA]": themeColor === "secondary",
                "bg-[#FF6B81]": themeColor === "pink",
                "bg-[#70A1FF] text-black": themeColor === "purple",
              }
            )}>
              {icon}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#1C1E2E] px-3 py-1.5 rounded-xl text-xs font-bold text-foreground/80 border border-white/10">
                <Users className="w-3.5 h-3.5 text-foreground/50" />
                <span>{minPlayers}-{maxPlayers} pers.</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1C1E2E] px-3 py-1.5 rounded-xl text-xs font-bold text-foreground/80 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-foreground/50" />
                <span>{difficulty}</span>
              </div>
            </div>
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
