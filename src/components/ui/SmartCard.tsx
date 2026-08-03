"use client";

import Card from "@/components/ui/Card";
import { VBubble } from "@/components/ui/VBubble";
import { ArrowRight } from "lucide-react";

interface SmartCardProps {
  title: string;
  shortTag?: string;
  description: string;
  icon: React.ReactNode;
  themeClass?: string;
  statsText?: string;
  onClick?: () => void;
}

export function SmartCard({
  title,
  shortTag,
  description,
  icon,
  themeClass = "theme-undercover",
  statsText,
  onClick
}: SmartCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`p-4 flex items-center justify-between border ${themeClass} relative group transition-all cursor-pointer active-press bg-surface/90`}
    >
      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-2xl bg-slate-950/40 border border-white/10">
          {icon}
        </div>
        
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {/* V Bubble Officiel VYLO */}
            <VBubble title={title} description={description} />
          </div>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
            {statsText || shortTag}
          </span>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <ArrowRight size={18} />
      </div>
    </Card>
  );
}
