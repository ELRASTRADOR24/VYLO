import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface/90 border border-white/10 rounded-[1.5rem] shadow-soft overflow-hidden transition-all duration-200 transform-gpu hover:border-white/20", 
        className
      )}
      {...props}
    />
  );
});

export default Card;
