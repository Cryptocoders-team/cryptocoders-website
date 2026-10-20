# cryptocoders-website

Landing de **cryptocoders**, el grupo de estudio de Blockchain y Web3 de La Paz, Bolivia.

## Stack

- Next.js 16 (App Router, Cache Components, View Transitions de React 19.3)
- Tailwind CSS 4
- three.js: isotipo A3 extruido con pixelado y tramado, persistente entre páginas
- anime.js 4: transiciones de la escena 3D, revelados por scroll, titulares, contadores y animaciones en bucle

## Desarrollo

```bash
npm install
npm run dev
```

## Contenido

- Textos, integrantes, cronograma, proyectos y aliados: `lib/content.ts`. La fuente es el Informe General de Crypto Coders 2026.
- Geometría del isotipo para la escena 3D: `lib/mark.ts`. Se genera desde el manual de marca, no la edites a mano.
- Logos de comunidades aliadas: `public/allies/`. Para añadir uno que falte, guarda la imagen en esa carpeta y asígnala en el campo `logo` del aliado en `lib/content.ts`. Las imágenes cuadradas de 320 px funcionan bien.

## Marca

| Token | Hex |
| --- | --- |
| Azul | `#013DA0` |
| Rojo | `#84072A` |
| Tinta | `#0A0E1A` |

Tipografías: Turret Road (titulares), Inter (texto) y Space Mono (etiquetas).
