import type { Metadata } from "next";
import { PROJECTS, RESEARCH } from "@/lib/content";
import { PageHero, PageShell, SectionHead } from "@/components/ui";
import Reveal from "@/components/fx/reveal";
import Scramble from "@/components/fx/scramble";
import SpinCross from "@/components/fx/spin-cross";

export const metadata: Metadata = { title: "Proyectos" };

const TONES = ["bg-cloud text-ink", "bg-red text-white", "bg-blue text-white"];

export default function Proyectos() {
  return (
    <PageShell>
      <PageHero
        label="Deploy:"
        lines={["Proyectos", "& I+D"]}
        tail=".build"
        intro="Lo que la comunidad construye y publica: proyectos tecnológicos open source y una tesis de grado sobre rollups optimistas con OP Stack."
        code="CONTRATOS DESPLEGADOS · REPOSITORIOS PÚBLICOS: 03"
      />

      <Reveal className="relative z-[2] bg-ink text-cloud">
        <section className="wrap py-20 md:py-28">
          <div className="flex items-center justify-between border-b border-cloud/20 pb-4" data-reveal>
            <p className="micro text-red">Unidades de carga · repositorios</p>
            <p className="micro text-cloud/50">Open source</p>
          </div>
          <ul data-reveal="stagger" className="mt-10 grid gap-4 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <li key={p.name}>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[14px] p-6 transition-transform duration-500 hover:-translate-y-2 ${TONES[i]}`}
                >
                  {/* franjas de advertencia, como en un contenedor de carga */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-3 opacity-60"
                    style={{
                      background: "repeating-linear-gradient(135deg, currentColor 0 8px, transparent 8px 16px)",
                    }}
                  />
                  <div className="mt-4 flex items-start justify-between">
                    <span className="micro opacity-70">Unidad {String(i + 1).padStart(2, "0")}</span>
                    <SpinCross className="!size-5" />
                  </div>
                  <div>
                    <p className="display text-[clamp(88px,10vw,150px)] leading-[0.8]">{String(i + 1).padStart(2, "0")}</p>
                    <div className="mt-6 h-px bg-current opacity-30" />
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight">{p.name}</h3>
                    <p className="micro mt-2 opacity-70">{p.tag}</p>
                  </div>
                  <span className="mono mt-8 flex items-center justify-between text-xs">
                    <span className="truncate opacity-70">{p.repo.replace("https://", "")}</span>
                    <span className="text-xl transition-transform group-hover:translate-x-1" aria-hidden>
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="relative z-[2]">
        <section className="wrap py-24 md:py-32">
          <SectionHead num="02" title="Investigación" note="Documentación e investigación · vinculación de grado" />
          <a
            href={RESEARCH.url}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="brackets group mt-12 grid gap-8 border-2 border-ink p-8 text-ink transition-colors duration-500 hover:bg-ink hover:text-cloud md:grid-cols-[1fr_2fr] md:p-12"
          >
            <div className="flex flex-col justify-between gap-8">
              <p className="micro text-red">{RESEARCH.kind}</p>
              <div className="relative h-40 overflow-hidden">
                <RollupDiagram />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10">
              <h3 className="display text-[clamp(36px,5vw,76px)]">{RESEARCH.title}</h3>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="micro opacity-70">
                  <Scramble text={RESEARCH.source} />
                </span>
                <span className="btn btn-solid group-hover:bg-red">
                  Leer tesis <span aria-hidden>↗</span>
                </span>
              </div>
            </div>
          </a>
        </section>
      </Reveal>
    </PageShell>
  );
}

/** Esquema L2 → L1: los lotes del rollup suben a la cadena principal. */
function RollupDiagram() {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="78" width="224" height="34" />
        <rect x="8" y="8" width="224" height="34" strokeDasharray="4 4" />
        <path d="M60 78V42M120 78V42M180 78V42" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
        </path>
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={16 + i * 36} y="86" width="28" height="18" fill={i === 5 ? "var(--red)" : "var(--blue)"}>
          <animate attributeName="opacity" values="1;.35;1" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <text x="16" y="30" fontSize="11" fontFamily="var(--font-space-mono)" fill="currentColor">
        L1 · ETHEREUM
      </text>
      <text x="150" y="30" fontSize="11" fontFamily="var(--font-space-mono)" fill="currentColor">
        OP STACK
      </text>
    </svg>
  );
}
