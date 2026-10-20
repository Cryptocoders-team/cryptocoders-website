"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/** Cruz de registro que gira y respira en su sitio. */
export default function SpinCross({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = animate(ref.current!, {
      rotate: [0, 90],
      scale: [1, 0.7, 1],
      duration: 2400,
      loop: true,
      loopDelay: 900,
      ease: "inOutExpo",
    });
    return () => {
      anim.revert();
    };
  }, []);

  return <span ref={ref} aria-hidden className={`cross ${className ?? ""}`} />;
}
