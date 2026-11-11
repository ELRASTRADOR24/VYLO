import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "pink"
    | "red"
    | "blue"
    | "yellow"
    | "green"
    | "purple"
    | "surface"
    | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold tracking-tight transition-[transform,background-color,border-color,color,opacity] duration-150 active-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45 select-none cursor-pointer",
          {
            "bg-primary text-white border border-primary/90 shadow-[0_3px_0_0_var(--primary-dark)] hover:bg-[#D43B3B]":
              variant === "primary" || variant === "red" || variant === "accent" || variant === "pink",
            "bg-secondary text-white border border-secondary/90 shadow-[0_3px_0_0_var(--secondary-dark)] hover:bg-[#4338CA]":
              variant === "blue" || variant === "secondary" || variant === "purple",
            "bg-yellow text-[#161824] border border-yellow/90 shadow-[0_3px_0_0_var(--amber-dark)] hover:bg-[#FBBF24]":
              variant === "yellow",
            "bg-green text-white border border-green/90 shadow-[0_3px_0_0_var(--kahoot-green-dark)] hover:brightness-105":
              variant === "green",
            "bg-surface border border-[var(--border-strong)] text-foreground hover:bg-surface-elevated":
              variant === "surface",
            "bg-transparent text-muted hover:text-foreground hover:bg-surface-elevated border border-transparent":
              variant === "ghost",
            "min-h-9 px-3.5 py-2 text-xs rounded-lg": size === "sm",
            "min-h-11 px-5 py-2.5 text-sm rounded-xl": size === "md",
            "min-h-12 px-6 py-3 text-sm sm:text-base rounded-xl": size === "lg",
            "h-10 w-10 p-0 rounded-xl": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
