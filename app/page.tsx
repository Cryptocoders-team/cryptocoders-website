import Link from "next/link";
import { ORG, STATS, TIMELINE, NAV, IMPACT } from "@/lib/content";
import { Markers, PageShell, SectionHead, Ticker } from "@/components/ui";
import SplitTitle from "@/components/fx/split-title";
import Scramble from "@/components/fx/scramble";
import SpinCross from "@/components/fx/spin-cross";
import PixelField from "@/components/fx/pixel-field";
import Counter from "@/components/fx/counter";
import LiveClock from "@/components/fx/live-clock";
import Reveal from "@/components/fx/reveal";

const RULES = [
  "Si encuentras un bug, repórtalo de inmediato",
  "No hagas deploy sin tests",
  "Not your keys, not your coins",
  "Lee el contrato antes de firmar",
  "Code is law · comunidad es poder",
];

const EVENTS = TIMELINE.flatMap((y) => y.events.map((e) => e.title.split(" · ")[0]));
const UNIQUE_EVENTS = Array.from(new Set(EVENTS));

const INDEX = [
  { ...NAV[1], desc: "2023 → presente. Bootcamps, ferias, buildathons y alianzas.", meta: "4 fases" },
  { ...NAV[2], desc: "Seis integrantes y un asesor docente construyendo comunidad.", meta: "07 personas" },
  { ...NAV[3], desc: "Proyectos open source e investigación sobre rollups.", meta: "3 + 1 tesis" },
  { ...NAV[4], desc: "Comunidades aliadas en Bolivia, LATAM y el mundo.", meta: "10 aliados" },
];

export default function Home() {
  return (
    <PageShell>
      {/* ---------- Banda superior estilo afiche ---------- */}
      <div className="relative z-[2] bg-ink text-cloud">
        <Ticker items={RULES} className="micro py-2" speed={55} />
      </div>

      {/* ---------- Hero ---------- */}
      <section className="relative z-[2] flex min-h-[calc(100svh-var(--header-h)-30px)] flex-col justify-between pb-8 pt-6">
        <div>
          <Markers className="wrap" />
          <div className="wrap mt-2 flex items-center justify-between">
            <SpinCross />
            <span className="h-3 w-16 bg-red" aria-hidden />
            <SpinCross className="hidden md:inline-block" />
          </div>
        </div>

        <div className="wrap my-10 flex gap-3 md:gap-8">
          <span className="display shrink-0 rotate-180 text-[clamp(26px,4.2vw,64px)] text-red [writing-mode:vertical-rl]">
            Manifiesto:
          </span>
          <div className="min-w-0">
            <SplitTitle
              lines={["Aprende", "Construye", "Despliega"]}
              className="display text-[clamp(56px,9.8vw,176px)]"
            />
            <div className="mt-5 flex items-center gap-6 md:w-[58%] md:justify-between">
              <span className="h-[3px] w-16 bg-red md:w-28" aria-hidden />
              <span className="display text-[clamp(26px,3.6vw,52px)] text-red">.on-chain</span>
            </div>
          </div>
        </div>

        <div className="wrap grid items-end gap-8 md:grid-cols-5">
          <p className="text-[17px] leading-relaxed text-ink/85 md:col-span-2">
            <strong className="font-semibold text-ink">Crypto Coders</strong> es un grupo de estudio de La Paz, Bolivia,
            enfocado en el desarrollo Blockchain y Web3. Aprendemos en comunidad y construimos sobre la cadena.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-2 md:col-start-3">
            <Link href="/trayectoria" transitionTypes={["nav-forward"]} className="btn btn-solid">
              Ver trayectoria <span aria-hidden>→</span>
            </Link>
            <Link href="/equipo" transitionTypes={["nav-forward"]} className="btn btn-ghost">
              Conoce al equipo
            </Link>
          </div>
          <div className="micro space-y-1 text-right text-steel md:col-start-5">
            <p>Autorizado: comunidad cryptocoders</p>
            <p>
              Lote: <Scramble text="CC-2023-11-14" every={5000} />
            </p>
            <LiveClock />
          </div>
        </div>
      </section>

      {/* ---------- Ticker de eventos ---------- */}
      <div className="relative z-[2] -rotate-1 bg-blue py-5 text-white">
        <Ticker items={UNIQUE_EVENTS} className="display text-[clamp(22px,3vw,40px)]" />
      </div>

      {/* ---------- Qué es ---------- */}
      <Reveal className="relative z-[2]">
        <section className="wrap py-24 md:py-36">
          <SectionHead num="01" title="¿Qué es Crypto Coders?" note="Grupo de estudio · Blockchain & Web3" />
          <div className="mt-12 grid gap-10 md:grid-cols-5">
            <p
              data-reveal
              className="text-[clamp(22px,2.4vw,34px)] font-medium leading-snug tracking-tight md:col-span-3"
            >
              {ORG.about}
            </p>
            <div data-reveal className="md:col-span-2 md:pl-10">
              <PixelField cols={14} rows={8} className="w-full max-w-sm" />
              <p className="micro mt-4 text-steel">Señal · nodo La Paz · 3 640 m s. n. m.</p>
            </div>
          </div>

          <div data-reveal="stagger" className="mt-20 grid gap-4 md:grid-cols-2">
            <article className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-[18px] bg-blue p-8 text-white">
              <header className="flex items-start justify-between">
                <span className="micro text-white/70">Misión · M-01</span>
                <OctaGlyph className="size-12 text-white transition-transform duration-700 group-hover:rotate-45" />
              </header>
              <div>
                <h3 className="display text-5xl">Misión</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-white/85">{ORG.mission}</p>
              </div>
            </article>
            <article className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-[18px] bg-ink p-8 text-white">
              <header className="flex items-start justify-between">
                <span className="micro text-white/60">Visión · V-01</span>
                <OctaGlyph className="size-12 text-red transition-transform duration-700 group-hover:rotate-45" />
              </header>
              <div>
                <h3 className="display text-5xl text-white">Visión</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-white/80">{ORG.vision}</p>
              </div>
            </article>
          </div>
        </section>
      </Reveal>

      {/* ---------- Panel de control ---------- */}
      <Reveal className="relative z-[2] bg-ink text-cloud">
        <section className="wrap py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-cloud/20 pb-6" data-reveal>
            <div>
              <p className="micro text-red">Mission control dashboard</p>
              <h2 className="display mt-3 text-[clamp(44px,7vw,110px)]">Red CC-01</h2>
              <p className="display text-[clamp(20px,2.4vw,34px)] text-cloud/60">Expedición on-chain</p>
            </div>
            <span className="micro text-cloud/50">Desde {ORG.founded}</span>
          </div>

          <div data-reveal="stagger" className="mt-10 grid grid-cols-2 gap-px bg-cloud/15 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={`relative p-6 md:p-8 ${i === 0 ? "bg-red" : "bg-ink"}`}>
                <span className="micro text-cloud/60">0{i + 1}</span>
                <Counter value={s.value} pad={s.pad} className="display mt-6 block text-[clamp(64px,9vw,128px)]" />
                <p className="micro mt-2 text-cloud/80">{s.label}</p>
                <span className="cross absolute right-5 top-5 !size-4 text-cloud/50" aria-hidden />
              </div>
            ))}
          </div>

          <div data-reveal className="mt-16">
            <p className="micro mb-4 text-cloud/60">Impacto por formato</p>
            <div className="grid gap-6 md:grid-cols-3">
              {IMPACT.map((m, i) => (
                <div key={m.label} className="border-t-2 border-cloud/30 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="display text-5xl">{m.value}</span>
                    <span className="micro text-red">0{i + 1}</span>
                  </div>
                  <p className="mt-2 text-sm text-cloud/70">{m.label}</p>
                  <div className="mt-4 h-2 bg-cloud/10">
                    <span className="block h-full bg-blue" style={{ width: `${40 + i * 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ---------- Índice ---------- */}
      <Reveal className="relative z-[2]">
        <section className="wrap py-24 md:py-36">
          <SectionHead num="02" title="Índice" note="Explora la comunidad" />
          <ul data-reveal="stagger">
            {INDEX.map((n) => (
              <li key={n.href} className="border-b border-ink/15">
                <Link
                  href={n.href}
                  transitionTypes={["nav-forward"]}
                  className="index-row grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 md:grid-cols-[48px_1.2fr_1fr_auto] md:gap-8 md:py-9"
                >
                  <span className="micro text-red">{n.code}</span>
                  <span className="display text-[clamp(34px,5.5vw,84px)]">{n.label}</span>
                  <span className="hidden text-sm opacity-80 md:block">{n.desc}</span>
                  <span className="mono flex items-center gap-3 text-xs">
                    <span className="hidden md:inline">{n.meta}</span>
                    <span className="text-2xl" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* ---------- CTA ---------- */}
      <section className="relative z-[2] overflow-hidden bg-red text-white">
        <div className="wrap grid gap-10 py-20 md:grid-cols-[1.5fr_1fr] md:items-end md:py-28">
          <div>
            <p className="micro text-white/70">En curso · I/2026</p>
            <h2 className="display mt-4 text-[clamp(44px,7.5vw,120px)]">
              Bootcamp
              <br />
              5ta edición
            </h2>
          </div>
          <div>
            <p className="max-w-md leading-relaxed text-white/85">
              Solidity, smart contracts, rollups y producto Web3. Únete a la próxima cohorte y construye con la comunidad.
            </p>
            <a
              href={ORG.github}
              target="_blank"
              rel="noreferrer"
              className="btn mt-8 bg-white text-ink [--btn-hover:var(--ink)] hover:text-white"
            >
              Seguir en GitHub <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <span className="dither pointer-events-none absolute -right-10 top-0 h-full w-1/3 text-white/25" aria-hidden />
      </section>
    </PageShell>
  );
}

function OctaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17 2h14l15 15v14L31 46H17L2 31V17zm3 9-9 9v8l9 9h8l9-9v-8l-9-9z"
      />
    </svg>
  );
}
