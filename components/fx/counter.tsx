"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, utils } from "animejs";

/** Número que cuenta desde cero cuando aparece en pantalla. */
export default function Counter({ value, pad = 0, className }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => String(Math.round(n)).padStart(pad, "0");

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { n: 0 };
    el.textContent = fmt(0);
    const anim = animate(obj, {
      n: value,
      duration: 1600,
      ease: "outExpo",
      modifier: utils.round(0),
      onUpdate: () => (el.textContent = fmt(obj.n)),
      autoplay: onScroll({ target: el, enter: "bottom-=5% top", repeat: false }),
    });
    return () => {
      anim.revert();
      el.textContent = fmt(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pad]);

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
