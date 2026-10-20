"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";

type Props = { cols?: number; rows?: number; className?: string; color?: string };

/** Matriz de píxeles que se encienden en oleadas desde el centro, sin salir de su sitio. */
export default function PixelField({ cols = 16, rows = 6, className, color = "var(--ink)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cells = ref.current!.children;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = animate(cells, {
      opacity: [0.08, 1, 0.08],
      scale: [0.4, 1, 0.4],
      duration: 1800,
      delay: stagger(60, { grid: [cols, rows], from: "center" }),
      loop: true,
      loopDelay: 400,
      ease: "inOutSine",
    });
    // Un píxel rojo aleatorio parpadea cada cierto tiempo
    const id = window.setInterval(() => {
      const el = cells[utils.random(0, cells.length - 1)] as HTMLElement;
      el.style.background = "var(--red)";
      window.setTimeout(() => (el.style.background = ""), 900);
    }, 600);
    return () => {
      anim.revert();
      window.clearInterval(id);
    };
  }, [cols, rows]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 3, color }}
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <span key={i} className="aspect-square bg-current opacity-10" />
      ))}
    </div>
  );
}
