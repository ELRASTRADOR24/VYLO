"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "pink" | "surface" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "inline-flex items-center justify-center rounded-[1.25rem] font-black transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          {
            "bg-gradient-summer text-white shadow-summer-glow border border-white/20 hover:brightness-110": variant === "primary",
            "bg-secondary text-white shadow-blue-glow border border-white/20 hover:brightness-110": variant === "secondary",
            "bg-accent text-white shadow-soft hover:brightness-110": variant === "accent",
            "bg-pink text-white shadow-soft hover:brightness-110": variant === "pink",
            "bg-surface border border-white/10 text-foreground shadow-soft hover:bg-white/10": variant === "surface",
            "hover:bg-white/5 text-foreground": variant === "ghost",
            "h-11 px-5 py-2 text-sm": size === "sm",
            "h-14 px-8 py-4 text-lg": size === "md",
            "h-16 px-10 py-6 text-xl": size === "lg",
            "h-14 w-14 rounded-full": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
