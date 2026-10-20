import type { Metadata } from "next";
import { KIND_LABEL, TIMELINE } from "@/lib/content";
import { PageHero, PageShell, SectionHead } from "@/components/ui";
import Reveal from "@/components/fx/reveal";
import PixelField from "@/components/fx/pixel-field";

export const metadata: Metadata = { title: "Trayectoria" };

const KIND_STYLE: Record<string, string> = {
  hito: "bg-red text-white",
  bootcamp: "bg-blue text-white",
  hackathon: "bg-ink text-white",
  alianza: "border-2 border-blue text-blue",
  feria: "border-2 border-ink text-ink",
  evento: "bg-cloud text-ink border border-ink/20",
};

// Variante de la leyenda sobre fondo oscuro
const LEGEND_STYLE: Record<string, string> = {
  ...KIND_STYLE,
  hackathon: "border-2 border-cloud text-cloud",
  feria: "border-2 border-cloud/50 text-cloud",
  evento: "bg-cloud text-ink",
  alianza: "border-2 border-blue text-cloud",
};

const total = TIMELINE.reduce((n, y) => n + y.events.length, 0);
// Número de registro global de cada evento (#01, #02…)
const offsets = TIMELINE.map((_, i) => TIMELINE.slice(0, i).reduce((n, y) => n + y.events.length, 0));

export default function Trayectoria() {
  return (
    <PageShell>
      <PageHero
        label="Registro:"
        lines={["Trayectoria", "2023 → hoy"]}
        tail=".log"
        intro="Desde la fundación de la comunidad el 14 de noviembre de 2023: bootcamps, ferias de grupos de estudio, buildathons y alianzas con el ecosistema Ethereum."
        code={`EVENTOS REGISTRADOS: ${String(total).padStart(2, "0")} · FASES: 04`}
      />

      {/* Barra de fases tipo panel de misión */}
      <Reveal className="relative z-[2] bg-ink text-cloud">
        <section className="wrap py-16 md:py-24">
          <div className="flex items-center justify-between" data-reveal>
            <p className="micro text-red">Mission timeline</p>
            <p className="micro text-cloud/50">Escala: semestre</p>
          </div>
          <div data-reveal="stagger" className="mt-6 grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-4">
            {TIMELINE.map((y, i) => (
              <div key={y.year}>
                <p className={`micro mb-2 ${i === TIMELINE.length - 1 ? "text-red" : "text-cloud/70"}`}>{y.phase}</p>
                <span
                  className={`block h-2 ${i === TIMELINE.length - 1 ? "bg-red" : "bg-blue"}`}
                  style={{ opacity: 0.55 + i * 0.15 }}
                />
                <p className="display mt-4 text-[clamp(36px,6vw,88px)]">{y.year}</p>
                <p className="micro text-cloud/50">{String(y.events.length).padStart(2, "0")} registros</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            {Object.entries(KIND_LABEL).map(([k, label]) => (
              <span key={k} className={`micro px-2.5 py-1 ${LEGEND_STYLE[k]}`}>
                {label}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="relative z-[2]">
        {TIMELINE.map((y, yi) => (
          <section key={y.year} className="wrap grid gap-8 py-16 md:grid-cols-[1fr_3fr] md:py-24">
            <div className="md:sticky md:top-[calc(var(--header-h)+24px)] md:self-start" data-reveal>
              <p className="micro text-red">{y.phase}</p>
              <h2 className="display text-[clamp(72px,11vw,168px)] leading-none">{y.year}</h2>
              <PixelField cols={8} rows={3} className="mt-6 w-32" />
            </div>
            <ol data-reveal="stagger" className="grid gap-3 sm:grid-cols-2">
              {y.events.map((e, ei) => {
                const n = offsets[yi] + ei + 1;
                return (
                  <li
                    key={e.title + e.when}
                    className="group relative flex min-h-44 flex-col justify-between border border-ink/15 bg-paper/70 p-5 backdrop-blur-sm transition-colors hover:border-ink"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`micro px-2 py-0.5 ${KIND_STYLE[e.kind]}`}>{KIND_LABEL[e.kind]}</span>
                      <span className="mono text-xs text-steel">#{String(n).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold leading-tight tracking-tight">{e.title}</h3>
                      {e.when && <p className="micro mt-2 text-steel">{e.when}</p>}
                    </div>
                    <span
                      className="absolute bottom-0 left-0 h-[3px] w-0 bg-red transition-[width] duration-500 group-hover:w-full"
                      aria-hidden
                    />
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </Reveal>

      <Reveal className="relative z-[2]">
        <section className="wrap pb-28">
          <SectionHead num="→" title="Siguiente bloque" note="La cadena sigue creciendo" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80" data-reveal>
            La quinta edición del Bootcamp Blockchain está en marcha en I/2026. Cada edición suma estudiantes, proyectos y
            nuevas alianzas al registro de la comunidad.
          </p>
        </section>
      </Reveal>
    </PageShell>
  );
}
