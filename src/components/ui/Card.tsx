import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-surface border border-border/50 rounded-[1.5rem] shadow-soft overflow-hidden", className)}
      {...props}
    />
  );
}

export default Card;
