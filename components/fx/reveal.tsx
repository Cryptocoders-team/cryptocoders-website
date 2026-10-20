"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, stagger } from "animejs";

/**
 * Revela con anime.js los descendientes marcados con `data-reveal` cuando entran en pantalla.
 * Los hijos de un `data-reveal="stagger"` aparecen escalonados.
 */
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => (t.style.opacity = "1"));
      return;
    }
    const anims = targets.map((el) => {
      const group = el.dataset.reveal === "stagger";
      if (group) el.style.opacity = "1";
      return animate(group ? Array.from(el.children) : el, {
        opacity: [0, 1],
        y: [36, 0],
        duration: 900,
        delay: group ? stagger(70) : 0,
        ease: "outExpo",
        autoplay: onScroll({ target: el, enter: "bottom-=8% top", repeat: false }),
      });
    });
    return () => anims.forEach((a) => a.revert());
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
