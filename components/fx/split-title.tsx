"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

type Props = {
  lines: string[];
  className?: string;
  /** Índice de la línea que va en rojo */
  accent?: number;
  as?: "h1" | "h2";
};

/** Titular gigante cuyas letras entran desde abajo al montar la página. */
export default function SplitTitle({ lines, className, accent, as: Tag = "h1" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const split = splitText(el, { chars: { wrap: "clip" } });
    const anim = animate(split.chars, {
      y: ["110%", "0%"],
      rotate: [8, 0],
      duration: 1100,
      delay: stagger(28, { start: 220 }),
      ease: "outExpo",
    });
    return () => {
      anim.revert();
      split.revert();
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className={`block ${i === accent ? "text-red" : ""}`}>
          {l}
        </span>
      ))}
    </Tag>
  );
}
