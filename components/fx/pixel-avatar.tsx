"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const N = 7;
const COLORS = ["var(--blue)", "var(--red)", "var(--ink)"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Identicon simétrico 7×7 generado a partir del nombre; sus píxeles respiran en su sitio. */
function cells(seed: string) {
  let h = hash(seed);
  const next = () => ((h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0), h / 4294967296);
  const color = COLORS[hash(seed + "c") % 2];
  const grid: (string | null)[] = Array(N * N).fill(null);
  for (let y = 0; y < N; y++)
    for (let x = 0; x <= N >> 1; x++) {
      const on = next() > 0.48;
      const c = on ? (next() > 0.82 ? "var(--ink)" : color) : null;
      grid[y * N + x] = c;
      grid[y * N + (N - 1 - x)] = c;
    }
  return grid;
}

export default function PixelAvatar({ seed, className }: { seed: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const grid = cells(seed);

  useEffect(() => {
    const root = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = root.querySelectorAll("[data-on]");
    const breathe = animate(on, {
      opacity: [1, 0.35, 1],
      duration: 2600,
      delay: stagger(140, { grid: [N, N], from: "random" }),
      loop: true,
      ease: "inOutSine",
    });
    const card = root.closest("[data-avatar-card]");
    const enter = () =>
      animate(on, {
        scale: [0, 1],
        rotate: [90, 0],
        duration: 700,
        delay: stagger(18, { grid: [N, N], from: "center" }),
        ease: "outBack",
      });
    card?.addEventListener("pointerenter", enter);
    return () => {
      breathe.revert();
      card?.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "grid", gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 2 }}
    >
      {grid.map((c, i) => (
        <span
          key={i}
          data-on={c ? "" : undefined}
          className="aspect-square"
          style={{ background: c ?? "transparent" }}
        />
      ))}
    </div>
  );
}
