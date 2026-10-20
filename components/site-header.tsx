"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { NAV } from "@/lib/content";
import Logo from "./logo";

export default function SiteHeader() {
  const pathname = usePathname();
  const current = NAV.findIndex((n) => n.href === pathname);
  const bar = useRef<HTMLSpanElement>(null);
  const items = useRef<(HTMLAnchorElement | null)[]>([]);
  const [open, setOpen] = useState(false);

  // Indicador rojo que se desliza hasta el enlace activo
  useEffect(() => {
    const el = items.current[current];
    if (!bar.current || !el) return;
    animate(bar.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 700,
      ease: "inOutExpo",
    });
  }, [current]);

  const direction = (i: number) => (i > current ? ["nav-forward"] : ["nav-back"]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" transitionTypes={direction(0)} aria-label="cryptocoders · inicio" className="shrink-0">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="relative hidden md:block" aria-label="Principal">
          <ul className="flex items-center">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <Link
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  href={n.href}
                  transitionTypes={direction(i)}
                  aria-current={i === current ? "page" : undefined}
                  className={`group flex items-baseline gap-1.5 px-4 py-2 text-[13px] font-medium transition-colors ${
                    i === current ? "text-ink" : "text-steel hover:text-ink"
                  }`}
                >
                  <span className="micro text-red">{n.code}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <span ref={bar} className="absolute -bottom-[13px] left-0 h-[3px] w-0 bg-red" aria-hidden />
        </nav>

        <a
          href="https://github.com/Cryptocoders-team"
          target="_blank"
          rel="noreferrer"
          className="btn btn-solid hidden !py-2.5 md:inline-flex"
        >
          GitHub <span aria-hidden>↗</span>
        </a>

        <button
          type="button"
          className="mono flex items-center gap-2 text-xs md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-full bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-[2px] w-full bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
          Menú
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="wrap border-t border-ink/10 pb-6 md:hidden" aria-label="Principal">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href} className="border-b border-ink/10">
                <Link
                  href={n.href}
                  transitionTypes={direction(i)}
                  className="flex items-baseline justify-between py-4"
                  onClick={() => setOpen(false)}
                  aria-current={i === current ? "page" : undefined}
                >
                  <span className="display text-3xl">{n.label}</span>
                  <span className="micro text-red">{n.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
