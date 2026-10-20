import { ViewTransition } from "react";
import SplitTitle from "./fx/split-title";
import Scramble from "./fx/scramble";
import SpinCross from "./fx/spin-cross";

/** Envoltorio de cada página: define las transiciones direccionales entre rutas. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <main className="pt-[var(--header-h)]">{children}</main>
    </ViewTransition>
  );
}

export function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export function Markers({ className }: { className?: string }) {
  return (
    <div className={`markers ${className ?? ""}`} aria-hidden>
      {["N1", "N2", "N3", "N4", "N5"].map((n) => (
        <span key={n}>{n}</span>
      ))}
    </div>
  );
}

export function Ticker({ items, className, speed = 40 }: { items: string[]; className?: string; speed?: number }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6">{t}</span>
          <span className="inline-block size-2.5 bg-red" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`ticker ${className ?? ""}`} style={{ "--ticker-speed": `${speed}s` } as React.CSSProperties}>
      <div className="ticker-track" aria-hidden>
        {row}
        {row}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}

/** Cabecera de página interior al estilo afiche: etiqueta vertical, titular gigante y remate rojo. */
export function PageHero({
  label,
  lines,
  tail,
  intro,
  code,
}: {
  label: string;
  lines: string[];
  tail: string;
  intro: string;
  code: string;
}) {
  return (
    <section className="relative z-[2] pb-16 pt-10 md:pb-24 md:pt-16">
      <Markers className="wrap" />
      <div className="wrap relative mt-6 flex gap-4 md:gap-8">
        <span
          className="display shrink-0 text-[clamp(22px,3.2vw,44px)] text-red [writing-mode:vertical-rl] rotate-180"
          aria-hidden
        >
          {label}
        </span>
        <div className="min-w-0 flex-1">
          <SplitTitle lines={lines} className="display text-[clamp(48px,8.6vw,150px)]" />
          <div className="mt-4 flex items-center justify-between gap-6 md:w-[64%]">
            <span className="h-[3px] w-24 bg-red" aria-hidden />
            <span className="display text-[clamp(22px,3vw,40px)] text-red">{tail}</span>
          </div>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/80">{intro}</p>
        </div>
      </div>
      <div className="wrap mt-12 flex items-center justify-between">
        <SpinCross className="text-ink" />
        <Scramble text={code} className="micro text-steel" every={6000} />
        <SpinCross className="hidden text-ink md:inline-block" />
      </div>
    </section>
  );
}

export function SectionHead({ num, title, note }: { num: string; title: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4" data-reveal>
      <h2 className="display flex items-baseline gap-4 text-[clamp(32px,5vw,72px)]">
        <span className="mono text-sm text-red">{num}</span>
        {title}
      </h2>
      {note && <span className="micro max-w-xs text-steel">{note}</span>}
    </div>
  );
}
