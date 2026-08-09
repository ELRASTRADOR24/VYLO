import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface/95 border border-white/10 rounded-3xl shadow-soft overflow-hidden transition-colors transform-gpu hover:border-white/20", 
        className
      )}
      {...props}
    />
  );
});

export default Card;
