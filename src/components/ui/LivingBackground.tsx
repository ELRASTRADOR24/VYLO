"use client";

import React, { useEffect, useRef } from "react";

interface LivingBackgroundProps {
  accentColor?: string; // Couleur néon dynamique (ex: #9333EA, #2563EB, #10B981, #F97316)
}

export function LivingBackground({ accentColor = "#9333EA" }: LivingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particules flottantes lumineuses
    const particles = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
    }));

    let pulse = 0;

    const render = () => {
      pulse += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Particules
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(pulse) * 0.2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Halo lumineux d'ambiance respirant */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] opacity-30 transition-all duration-1000 animate-pulse"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full blur-[160px] opacity-25 transition-all duration-1000"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[36rem] h-[36rem] rounded-full blur-[180px] opacity-20 transition-all duration-1000"
        style={{ backgroundColor: accentColor }}
      />

      {/* Canvas de particules */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
}
