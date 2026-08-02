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
        whileTap={{ y: 3 }}
        className={cn(
          "inline-flex items-center justify-center rounded-[1.25rem] font-black transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer text-white",
          {
            "bg-[#FF4757] hover:bg-[#FF6B81] shadow-[0_5px_0_#C0392B] active:shadow-[0_1px_0_#C0392B]": variant === "primary",
            "bg-[#3742FA] hover:bg-[#5352ED] shadow-[0_5px_0_#1E272C] active:shadow-[0_1px_0_#1E272C]": variant === "secondary",
            "bg-[#FFA502] hover:bg-[#ECCC68] text-black shadow-[0_5px_0_#CC8E00] active:shadow-[0_1px_0_#CC8E00]": variant === "accent",
            "bg-[#FF6B81] hover:bg-[#FF4757] shadow-[0_5px_0_#D63031] active:shadow-[0_1px_0_#D63031]": variant === "pink",
            "bg-[#1C1E2E] hover:bg-[#25283D] border border-white/10 text-foreground shadow-[0_5px_0_#0C0D14] active:shadow-[0_1px_0_#0C0D14]": variant === "surface",
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
