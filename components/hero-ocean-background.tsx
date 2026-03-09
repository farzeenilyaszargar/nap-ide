"use client";

import { useEffect, useRef } from "react";

type HeroOceanBackgroundProps = {
  className?: string;
  showTrail?: boolean;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HeroOceanBackground({
  className = "",
  showTrail = false,
}: HeroOceanBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    const textLayer = textLayerRef.current;
    if (!element) return;

    const spawnLetter = (localX: number, localY: number) => {
      if (!showTrail || !textLayer) return;
      const token = document.createElement("span");
      const size = 11 + Math.random() * 8;
      token.className = "hero-float-letter";
      token.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      token.style.left = `${localX}px`;
      token.style.top = `${localY}px`;
      token.style.fontSize = `${size}px`;
      token.style.opacity = `${0.5 + Math.random() * 0.35}`;
      textLayer.appendChild(token);
      token.addEventListener("animationend", () => token.remove(), { once: true });
    };

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

      if (showTrail) {
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;
        const last = lastPointRef.current;

        if (!last) {
          spawnLetter(localX, localY);
          lastPointRef.current = { x: localX, y: localY };
          return;
        }

        const dx = localX - last.x;
        const dy = localY - last.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 8) return;

        const steps = Math.min(12, Math.floor(distance / 8));
        for (let i = 1; i <= steps; i += 1) {
          const t = i / steps;
          spawnLetter(last.x + dx * t, last.y + dy * t);
        }
        lastPointRef.current = { x: localX, y: localY };
      }
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
      lastPointRef.current = null;
    };
  }, [showTrail]);

  return (
    <div
      ref={containerRef}
      className={`hero-ocean pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div className="hero-ocean-gif" />
      <div className="hero-ocean-cursor" />
      {showTrail ? <div ref={textLayerRef} className="hero-ocean-text-layer" /> : null}
      <div className="hero-ocean-vignette" />
    </div>
  );
}
