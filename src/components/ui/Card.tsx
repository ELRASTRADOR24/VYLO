import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-[#141622] border border-white/10 rounded-[1.5rem] shadow-soft overflow-hidden transition-all duration-200 hover:border-white/20", 
        className
      )}
      {...props}
    />
  );
}

export default Card;
