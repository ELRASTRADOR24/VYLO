"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "pink" | "red" | "blue" | "yellow" | "green" | "purple" | "surface" | "ghost";
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
              "btn-kahoot-red": variant === "primary" || variant === "red" || variant === "accent" || variant === "pink",
              "btn-kahoot-blue": variant === "blue" || variant === "secondary",
              "btn-kahoot-yellow": variant === "yellow",
              "btn-kahoot-green": variant === "green",
              "btn-kahoot-purple": variant === "purple",
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
