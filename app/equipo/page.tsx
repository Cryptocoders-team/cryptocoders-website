import type { Metadata } from "next";
import { ADVISOR, MEMBERS } from "@/lib/content";
import { PageHero, PageShell, SectionHead } from "@/components/ui";
import Reveal from "@/components/fx/reveal";
import PixelAvatar from "@/components/fx/pixel-avatar";
import Scramble from "@/components/fx/scramble";

export const metadata: Metadata = { title: "Equipo" };

function split(name: string) {
  const parts = name.split(" ");
  return { first: parts.slice(0, -2).join(" "), last: parts.slice(-2).join(" ") };
}

export default function Equipo() {
  return (
    <PageShell>
      <PageHero
        label="Nodos:"
        lines={["Equipo", "Core"]}
        tail=".members"
        intro="Seis integrantes y un asesor docente sostienen la comunidad: organizan bootcamps, ferias y buildathons, y construyen proyectos open source."
        code="NODOS ACTIVOS: 06 · VALIDADOR: 01"
      />

      <Reveal className="relative z-[2]">
        <section className="wrap pb-24">
          <SectionHead num="01" title="Integrantes" note="Grupo de estudio · Blockchain & Web3" />
          <ul data-reveal="stagger" className="mt-10 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((m, i) => {
              const { first, last } = split(m);
              return (
                <li
                  key={m}
                  data-avatar-card
                  className="group relative flex flex-col justify-between gap-10 bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-cloud md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <PixelAvatar seed={m} className="w-24 md:w-28" />
                    <div className="text-right">
                      <p className="micro text-red">Nodo</p>
                      <p className="display text-4xl">{String(i + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight">{first}</h3>
                    <p className="text-2xl leading-tight tracking-tight text-steel group-hover:text-cloud/60">{last}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-current/15 pt-3">
                      <span className="micro">Integrante</span>
                      <span className="micro text-steel group-hover:text-cloud/50">
                        CC-{String(i + 1).padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <Reveal className="relative z-[2] bg-blue text-white">
        <section className="wrap grid gap-10 py-20 md:grid-cols-[auto_1fr] md:items-center md:py-28" data-avatar-card>
          <div data-reveal className="rounded-[18px] bg-paper p-6">
            <PixelAvatar seed={ADVISOR.name} className="w-40 md:w-52" />
          </div>
          <div data-reveal>
            <p className="micro text-white/70">
              <Scramble text="Validador · asesor docente" every={7000} />
            </p>
            <h2 className="display mt-4 text-[clamp(36px,5.5vw,84px)]">{ADVISOR.name.replace("Lic. ", "")}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
              {ADVISOR.role} del grupo de estudio. Acompaña los objetivos académicos de la comunidad y la vinculación con la
              investigación de grado.
            </p>
          </div>
        </section>
      </Reveal>
    </PageShell>
  );
}
