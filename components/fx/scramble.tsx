"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";

type Props = {
  text: string;
  className?: string;
  /** Si se indica, vuelve a codificar el texto cada `every` ms (animación en su sitio). */
  every?: number;
  chars?: string;
};

/** Texto que se descifra carácter a carácter, como un hash que se resuelve. */
export default function Scramble({ text, className, every, chars = "A-Z0-9#%&/" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const run = () => animate(el, { innerHTML: scrambleText({ text, chars, revealRate: 40 }) });
    run();
    const id = every ? window.setInterval(run, every) : 0;
    return () => window.clearInterval(id);
  }, [text, every, chars]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
