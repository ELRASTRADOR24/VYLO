"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "green" | "purple" | "surface" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-2xl font-black tracking-wide uppercase transition-all duration-150 active-press focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer text-white transform-gpu",
            {
              "bg-gradient-summer text-white shadow-summer-glow border border-white/20 hover:brightness-110": variant === "primary",
              "bg-secondary text-white shadow-blue-glow border border-white/20 hover:brightness-110": variant === "secondary",
              "bg-purple text-white shadow-purple-glow border border-white/20 hover:brightness-110": variant === "purple",
              "bg-green text-white shadow-green-glow border border-white/20 hover:brightness-110": variant === "green",
              "bg-accent text-white shadow-soft border border-white/20 hover:brightness-110": variant === "accent",
              "bg-surface border border-white/10 text-foreground shadow-soft hover:bg-white/10": variant === "surface",
              "hover:bg-white/10 text-foreground border border-transparent": variant === "ghost",
              "h-11 px-5 text-xs rounded-xl": size === "sm",
              "h-14 px-7 text-sm rounded-2xl": size === "md",
              "h-16 px-9 text-base rounded-2xl": size === "lg",
              "h-14 w-14 rounded-2xl": size === "icon",
            },
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);

Button.displayName = "Button";

export default Button;
