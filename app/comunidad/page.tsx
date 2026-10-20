import type { Metadata } from "next";
import Image from "next/image";
import { ALLIES, IMPACT } from "@/lib/content";
import { PageHero, PageShell, SectionHead, Ticker } from "@/components/ui";
import Reveal from "@/components/fx/reveal";
import PixelField from "@/components/fx/pixel-field";

export const metadata: Metadata = { title: "Comunidad" };

const HIGHLIGHTS = [
  { title: "Global Pizza Party", meta: "2024 · 2025", text: "Celebración global de Pizza DAO con la comunidad Web3 local." },
  { title: "Buildathon", meta: "2024 · 2025", text: "Equipos construyendo productos on-chain frente a la comunidad." },
  { title: "Burrito Noun", meta: "2024", text: "Activación junto al ecosistema de Nouns DAO." },
  { title: "ETH Kipu Bootcamp", meta: "2024 · 2025", text: "Colaboración en formación de desarrolladores Ethereum." },
];

export default function Comunidad() {
  return (
    <PageShell>
      <PageHero
        label="Red:"
        lines={["Comunidad", "Aliada"]}
        tail=".peers"
        intro="Construimos en red con comunidades de Bolivia, Latinoamérica y el mundo: del ecosistema Ethereum a Google Developer Groups, DAOs y asociaciones blockchain."
        code="PEERS CONECTADOS: 10 · LATENCIA: 0 MS"
      />

      <div className="relative z-[2] bg-red py-4 text-white">
        <Ticker items={ALLIES.map((a) => a.name)} className="display text-[clamp(20px,2.6vw,36px)]" speed={36} />
      </div>

      <Reveal className="relative z-[2]">
        <section className="wrap py-24 md:py-32">
          <SectionHead num="01" title="Alianzas" note="Alianzas y coordinación" />
          <ul data-reveal="stagger" className="mt-10 grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 md:grid-cols-5">
            {ALLIES.map((a, i) => (
              <li key={a.name} className="group relative flex aspect-[4/5] flex-col justify-between bg-paper p-4 md:p-5">
                <div className="flex justify-between">
                  <span className="micro text-red">P{String(i + 1).padStart(2, "0")}</span>
                  <span className="micro text-steel">{a.city}</span>
                </div>
                <div className="mx-auto flex aspect-square w-[68%] items-center justify-center">
                  {a.logo ? (
                    <Image
                      src={a.logo}
                      alt={`Logo de ${a.name}`}
                      width={320}
                      height={320}
                      className="h-full w-full rounded-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-ink/30 p-3 text-center transition-colors group-hover:border-blue group-hover:text-blue">
                      <span className="display text-xl leading-none">{a.name}</span>
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold tracking-tight">{a.name}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal className="relative z-[2] bg-ink text-cloud">
        <section className="wrap py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-cloud/20 pb-6" data-reveal>
            <h2 className="display text-[clamp(40px,6vw,96px)]">Beneficiarios</h2>
            <PixelField cols={12} rows={2} color="#F4F7FB" className="w-48" />
          </div>
          <div data-reveal="stagger" className="mt-12 grid gap-10 md:grid-cols-3">
            {IMPACT.map((m) => (
              <div key={m.label}>
                <p className="display text-[clamp(64px,8vw,120px)] text-white">{m.value}</p>
                <p className="micro mt-2 text-cloud/70">{m.label}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal className="relative z-[2]">
        <section className="wrap py-24 md:py-32">
          <SectionHead num="02" title="Eventos con la red" />
          <ul data-reveal="stagger" className="mt-10 grid gap-4 md:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <li
                key={h.title}
                className={`flex min-h-64 flex-col justify-between rounded-[14px] p-6 ${
                  i % 2 ? "bg-blue text-white" : "border-2 border-ink bg-paper/70"
                }`}
              >
                <span className="micro opacity-70">{h.meta}</span>
                <div>
                  <h3 className="display text-3xl">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </PageShell>
  );
}
