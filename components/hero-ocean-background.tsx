"use client";

import { useEffect, useRef } from "react";

type HeroOceanBackgroundProps = {
  className?: string;
};

const FLOAT_WORDS = ["build", "ship", "commit", "refactor", "agent", "code", "deploy", "merge"];

export default function HeroOceanBackground({ className = "" }: HeroOceanBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastSpawnAtRef = useRef<number>(0);

  useEffect(() => {
    const element = containerRef.current;
    const textLayer = textLayerRef.current;
    if (!element || !textLayer) return;

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);

      const now = performance.now();
      if (now - lastSpawnAtRef.current < 55) return;
      lastSpawnAtRef.current = now;

      const token = document.createElement("span");
      const jitterX = (Math.random() - 0.5) * 64;
      const jitterY = (Math.random() - 0.5) * 40;
      const size = 11 + Math.random() * 7;
      token.className = "hero-float-text";
      token.textContent = FLOAT_WORDS[Math.floor(Math.random() * FLOAT_WORDS.length)];
      token.style.left = `${clientX - rect.left + jitterX}px`;
      token.style.top = `${clientY - rect.top + jitterY}px`;
      token.style.fontSize = `${size}px`;
      token.style.opacity = `${0.48 + Math.random() * 0.36}`;
      textLayer.appendChild(token);
      token.addEventListener("animationend", () => token.remove(), { once: true });
    };

    const onMouseMove = (event: MouseEvent) => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        updatePosition(event.clientX, event.clientY);
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        updatePosition(touch.clientX, touch.clientY);
      });
    };

    const rect = element.getBoundingClientRect();
    updatePosition(rect.left + rect.width * 0.5, rect.top + rect.height * 0.35);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-ocean pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div className="hero-ocean-gif" />
      <div className="hero-ocean-cursor" />
      <div ref={textLayerRef} className="hero-ocean-text-layer" />
      <div className="hero-ocean-vignette" />
    </div>
  );
}
