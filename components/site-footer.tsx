import Link from "next/link";
import { NAV, ORG } from "@/lib/content";
import Logo from "./logo";
import LiveClock from "./fx/live-clock";
import PixelField from "./fx/pixel-field";

export default function SiteFooter() {
  return (
    <footer className="relative z-[2] bg-ink text-cloud">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-24">
        <div>
          <Logo mono="#F4F7FB" className="h-9 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cloud/70">
            Grupo de estudio de Blockchain y Web3. Aprende, construye y despliega con la comunidad.
          </p>
          <PixelField cols={18} rows={3} color="#F4F7FB" className="mt-10 w-60 md:w-72" />
        </div>
        <nav aria-label="Pie de página">
          <p className="micro mb-4 text-red">Índice</p>
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="group flex items-baseline gap-3 text-lg hover:text-white">
                  <span className="micro text-cloud/40">{n.code}</span>
                  <span className="transition-transform group-hover:translate-x-1">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="micro mb-4 text-red">Contacto</p>
          <a href={ORG.github} target="_blank" rel="noreferrer" className="text-lg underline-offset-4 hover:underline">
            github.com/Cryptocoders-team ↗
          </a>
          <p className="micro mt-10 text-cloud/50">
            Fundado {ORG.founded} · {ORG.city}
          </p>
        </div>
      </div>
      <div className="border-t border-cloud/10">
        <div className="wrap flex flex-col justify-between gap-2 py-5 md:flex-row">
          <span className="micro text-cloud/50">
            Lee el código. Verifica. Despliega. · © 2023–2026 cryptocoders
          </span>
          <LiveClock className="micro text-cloud/50" />
        </div>
      </div>
    </footer>
  );
}
