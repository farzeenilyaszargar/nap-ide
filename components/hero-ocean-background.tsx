"use client";

import { useEffect, useRef } from "react";

export default function HeroOceanBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);
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

    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-ocean pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-ocean-wave hero-ocean-wave--one" />
      <div className="hero-ocean-wave hero-ocean-wave--two" />
      <div className="hero-ocean-cursor" />
      <div className="hero-ocean-vignette" />
    </div>
  );
}
