// Contenido institucional de cryptocoders (fuente: Informe General de Crypto Coders 2026).

export const ORG = {
  name: "cryptocoders",
  github: "https://github.com/Cryptocoders-team",
  founded: "14.11.2023",
  city: "La Paz, Bolivia",
  about:
    "Grupo de estudio enfocado en el desarrollo en el entorno Blockchain y Web3. Un espacio de aprendizaje colaborativo donde los estudiantes exploran, comparten conocimiento y aprenden habilidades prácticas.",
  mission:
    "Empoderar de conocimiento a los estudiantes de Crypto Coders, brindándoles las herramientas y conocimientos necesarios para comprender, desarrollar y aplicar tecnologías Blockchain y Web3 en proyectos de desarrollo e investigación.",
  vision:
    "Ser reconocidos como un referente en blockchain y Web3: un entorno donde nuestros miembros se conviertan en líderes y contribuyentes clave de proyectos revolucionarios, impulsando el desarrollo y la investigación de esta tecnología en Bolivia y más allá de sus fronteras.",
};

export const NAV = [
  { href: "/", label: "Inicio", code: "N1" },
  { href: "/trayectoria", label: "Trayectoria", code: "N2" },
  { href: "/equipo", label: "Equipo", code: "N3" },
  { href: "/proyectos", label: "Proyectos", code: "N4" },
  { href: "/comunidad", label: "Comunidad", code: "N5" },
] as const;

export type TimelineYear = {
  year: string;
  phase: string;
  events: { title: string; when?: string; kind: Kind }[];
};
export type Kind = "bootcamp" | "hackathon" | "feria" | "evento" | "alianza" | "hito";

export const TIMELINE: TimelineYear[] = [
  {
    year: "2023",
    phase: "Fase 01 · Fundación",
    events: [
      { title: "Fundación de la comunidad", when: "14 Nov", kind: "hito" },
      { title: "Talleres de Bitcoin · Semana Aniversario Informática", kind: "evento" },
      { title: "Bootcamp Blockchain · 1ra edición", when: "Dic–Ene · Virtual", kind: "bootcamp" },
    ],
  },
  {
    year: "2024",
    phase: "Fase 02 · Expansión",
    events: [
      { title: "Feria de Grupos de Estudio", when: "I/2024", kind: "feria" },
      { title: "Bootcamp Blockchain · 2da edición", when: "I/2024", kind: "bootcamp" },
      { title: "Global Pizza Party 2024", kind: "evento" },
      { title: "Burrito Noun", kind: "evento" },
      { title: "ETH Kipu · Colaboración Bootcamp", kind: "alianza" },
      { title: "Buildathon 2024", kind: "hackathon" },
      { title: "Feria de Grupos de Estudio", when: "II/2024", kind: "feria" },
    ],
  },
  {
    year: "2025",
    phase: "Fase 03 · Consolidación",
    events: [
      { title: "Feria de Grupos de Estudio", when: "I/2025", kind: "feria" },
      { title: "Bootcamp Blockchain · 3ra edición", when: "I/2025", kind: "bootcamp" },
      { title: "Global Pizza Party 2025", kind: "evento" },
      { title: "ETH Kipu · Colaboración Bootcamp", kind: "alianza" },
      { title: "Buildathon 2025", kind: "hackathon" },
      { title: "Bootcamp Blockchain · 4ta edición", when: "II/2025", kind: "bootcamp" },
    ],
  },
  {
    year: "2026",
    phase: "Fase 04 · En curso",
    events: [{ title: "Bootcamp Blockchain · 5ta edición", when: "I/2026", kind: "bootcamp" }],
  },
];

export const KIND_LABEL: Record<Kind, string> = {
  bootcamp: "Bootcamp",
  hackathon: "Hackathon",
  feria: "Feria",
  evento: "Evento",
  alianza: "Alianza",
  hito: "Hito",
};

export const MEMBERS = [
  "Augusto Fabian Rios Choque",
  "Cristian Jocieney Velasco Conde",
  "Luis Ernesto Barrionuevo Aparicio",
  "Saul Mijael Choquehuanca Huanca",
  "Joel Fidel Tito Bravo",
  "Jhamil Calixto Mamani Quea",
];

export const ADVISOR = { name: "Lic. Willy Fernando Melendrez Challco", role: "Asesor docente" };

export const PROJECTS = [
  {
    name: "Taqi-MiniApp",
    repo: "https://github.com/fercodev-eth/Taqi-MIniApp",
    tag: "Mini App",
  },
  {
    name: "OPTUS Automation",
    repo: "https://github.com/Optus-development-team",
    tag: "Automatización",
  },
  {
    name: "certify-CHAIN",
    repo: "https://github.com/certify-CHAIN",
    tag: "Certificación on-chain",
  },
];

export const RESEARCH = {
  kind: "Tesis de grado",
  title: "Rollup Optimistic con los módulos de OP Stack",
  url: "https://repositorio.umsa.bo/handle/123456789/42679",
  source: "Repositorio Institucional UMSA",
};

export type Ally = { name: string; logo?: string; city?: string };

export const ALLIES: Ally[] = [
  { name: "Ethereum Bolivia", logo: "/allies/ethereum-bolivia.webp", city: "Bolivia" },
  { name: "Asoblockchain", logo: "/allies/asoblockchain-bolivia.webp", city: "Bolivia" },
  { name: "CaosBO", city: "Bolivia" },
  { name: "GDG La Paz", logo: "/allies/gdg-la-paz.webp", city: "La Paz" },
  { name: "Ethereum Ecuador", city: "Ecuador" },
  { name: "ETH Kipu", logo: "/allies/eth-kipu.webp", city: "LATAM" },
  { name: "Pizza DAO", logo: "/allies/pizza-dao.webp", city: "Global" },
  { name: "Cochablock", logo: "/allies/cochablock.webp", city: "Cochabamba" },
  { name: "Ethereum La Paz", city: "La Paz" },
  { name: "Nouns DAO", logo: "/allies/nouns-dao.webp", city: "Global" },
];

export const IMPACT = [
  { value: "12–17", label: "Estudiantes por bootcamp" },
  { value: "50–80", label: "Personas por feria" },
  { value: "80–120", label: "Asistentes en hackathons" },
];

export const STATS = [
  { value: 5, pad: 2, label: "Ediciones de bootcamp" },
  { value: 2, pad: 2, label: "Buildathons" },
  { value: 10, pad: 2, label: "Comunidades aliadas" },
  { value: 3, pad: 2, label: "Proyectos open source" },
];
