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
            "inline-flex items-center justify-center rounded-2xl font-black tracking-wide uppercase transition-all duration-150 active-press focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer text-white transform-gpu hover:brightness-110",
            {
              "btn-kahoot-red hover:shadow-[0_6px_0_0_#A91029,0_16px_30px_-6px_rgba(226,27,60,0.5)]": variant === "primary" || variant === "red" || variant === "accent" || variant === "pink",
              "btn-kahoot-blue hover:shadow-[0_6px_0_0_#0C4893,0_16px_30px_-6px_rgba(19,104,206,0.5)]": variant === "blue" || variant === "secondary",
              "btn-kahoot-yellow hover:shadow-[0_6px_0_0_#A37700,0_16px_30px_-6px_rgba(216,158,0,0.5)]": variant === "yellow",
              "btn-kahoot-green hover:shadow-[0_6px_0_0_#185B06,0_16px_30px_-6px_rgba(38,137,12,0.5)]": variant === "green",
              "btn-kahoot-purple hover:shadow-[0_6px_0_0_#5C3286,0_16px_30px_-6px_rgba(134,76,191,0.5)]": variant === "purple",
              "bg-surface border border-white/10 text-foreground shadow-soft hover:bg-white/10 hover:border-white/20": variant === "surface",
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
