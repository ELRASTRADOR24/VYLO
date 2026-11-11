import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-2xl shadow-soft overflow-clip transition-colors duration-150 hover:border-[var(--border-strong)]",
        className
      )}
      {...props}
    />
  );
}

export default Card;
