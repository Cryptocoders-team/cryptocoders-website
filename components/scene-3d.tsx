"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { animate } from "animejs";
import { MARK } from "@/lib/mark";

const BLUE = "#013DA0";
const RED = "#84072A";
const INK = "#0A0E1A";

type Pose = { x: number; y: number; s: number; o: number };

/** Posición del isotipo 3D para cada ruta, en fracciones del viewport. */
function poseFor(path: string, mobile: boolean): Pose {
  if (mobile) {
    return path === "/"
      ? { x: 0.2, y: 0.25, s: 0.3, o: 0.45 }
      : { x: 0.28, y: -0.04, s: 0.16, o: 0.4 };
  }
  switch (path) {
    case "/":
      return { x: 0.29, y: -0.04, s: 0.52, o: 1 };
    default:
      return { x: 0.34, y: -0.14, s: 0.3, o: 1 };
  }
}

const POST_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

// Pixelado + tramado Bayer 4x4 en dos tonos por color de marca,
// con desplazamiento horizontal de filas para el "glitch" de transición.
const POST_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uRes;
  uniform float uPx;
  uniform float uOpacity;
  uniform float uGlitch;
  uniform float uTime;
  varying vec2 vUv;

  float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 grid = vUv * uRes / uPx;
    vec2 cell = floor(grid);
    float band = floor(cell.y / 3.0);
    float jitter = step(0.72, hash(band * 12.9898 + floor(uTime * 18.0)));
    cell.x += floor(uGlitch * jitter * (hash(band + 3.7) - 0.5) * 40.0);
    vec4 c = texture2D(tScene, (cell + 0.5) * uPx / uRes);
    if (c.a < 0.04) discard;
    float l = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    float lit = step(bayer4(cell), l * 1.9);
    vec3 col = mix(c.rgb * 0.7, min(c.rgb * 1.18 + 0.03, vec3(1.0)), lit);
    vec2 f = fract(grid);
    float gap = step(0.1, f.x) * step(0.1, f.y);
    gl_FragColor = vec4(col, c.a * uOpacity * mix(0.78, 1.0, gap));
  }
`;

function buildMark() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="${MARK.ring}"/><path fill-rule="evenodd" d="${MARK.c}"/></svg>`;
  const data = new SVGLoader().parse(svg);
  const group = new THREE.Group();
  const specs = [
    { depth: 120, color: BLUE, z: 0 },
    { depth: 220, color: RED, z: 0 },
  ];
  data.paths.forEach((p, i) => {
    const spec = specs[i];
    const geo = new THREE.ExtrudeGeometry(p.toShapes(), {
      depth: spec.depth,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelSegments: 2,
    });
    geo.translate(-MARK.w / 2, -MARK.h / 2, -spec.depth / 2);
    const mat = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.45, metalness: 0.08 });
    group.add(new THREE.Mesh(geo, mat));
  });
  group.scale.set(1 / MARK.h, -1 / MARK.h, 1 / MARK.h);
  const pivot = new THREE.Group();
  pivot.add(group);
  return pivot;
}

/** Bloques que orbitan el isotipo: la "cadena" de bloques. */
function buildChain(count = 9) {
  const chain = new THREE.Group();
  const geo = new THREE.BoxGeometry(0.075, 0.075, 0.075);
  const mats = [
    new THREE.MeshStandardMaterial({ color: RED, roughness: 0.4, metalness: 0.2 }),
    new THREE.MeshStandardMaterial({ color: INK, roughness: 0.5, metalness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.4, metalness: 0.3 }),
  ];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, mats[i % 3]);
    const a = (i / count) * Math.PI * 2;
    m.position.set(Math.cos(a) * 0.78, Math.sin(a * 2) * 0.05, Math.sin(a) * 0.78);
    m.rotation.set(a, a * 0.5, 0);
    chain.add(m);
  }
  chain.rotation.x = 0.35;
  return chain;
}

export default function Scene3D() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const api = useRef<{ go: (path: string, first?: boolean) => void } | null>(null);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // sin WebGL: el sitio funciona igual, sólo sin la escena
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const key = new THREE.DirectionalLight(0xffffff, 3.4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff3b5c, 2.2);
    rim.position.set(4, -2, -3);
    scene.add(rim);
    const fill = new THREE.PointLight(0x7fa7ff, 6, 12);
    fill.position.set(2, 1, 3);
    scene.add(fill);

    const root = new THREE.Group();
    const mark = buildMark();
    const chain = buildChain();
    root.add(mark, chain);
    scene.add(root);

    const rt = new THREE.WebGLRenderTarget(1, 1, { samples: 4 });
    rt.texture.colorSpace = THREE.SRGBColorSpace;
    const post = new THREE.ShaderMaterial({
      vertexShader: POST_VERT,
      fragmentShader: POST_FRAG,
      transparent: true,
      uniforms: {
        tScene: { value: rt.texture },
        uRes: { value: new THREE.Vector2(1, 1) },
        uPx: { value: 4 * dpr },
        uOpacity: { value: 1 },
        uGlitch: { value: 0 },
        uTime: { value: 0 },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post);
    const postScene = new THREE.Scene();
    postScene.add(quad);
    const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Estado animado por anime.js
    const st = { x: 0, y: 0, s: 0.001, o: 0, spin: 0, glitch: 1, px: 18 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let view = { w: 1, h: 1 };
    let mobile = false;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mobile = w < 768;
      renderer.setSize(w, h, false);
      rt.setSize(Math.round(w * dpr), Math.round(h * dpr));
      post.uniforms.uRes.value.set(w * dpr, h * dpr);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const vh = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      view = { w: vh * camera.aspect, h: vh };
    };
    resize();

    const go = (path: string, first = false) => {
      const p = poseFor(path, mobile);
      animate(st, {
        x: p.x,
        y: p.y,
        s: p.s,
        o: p.o,
        duration: first ? 1800 : 1300,
        ease: "inOutExpo",
      });
      if (!reduced) {
        animate(st, { spin: st.spin + Math.PI * 2, duration: first ? 2200 : 1500, ease: "inOutQuart" });
        animate(st, { glitch: [1, 0], px: [first ? 22 : 14, 4], duration: first ? 1600 : 1000, ease: "outQuad" });
      } else {
        st.glitch = 0;
        st.px = 4;
      }
    };
    api.current = { go };
    lastPath.current = window.location.pathname;
    go(lastPath.current, true);

    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      resize();
      go(window.location.pathname);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    const timer = new THREE.Timer();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      timer.update();
      const t = timer.getElapsed();
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const scroll = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      const idle = reduced ? 0 : 1;
      root.position.set(st.x * view.w, st.y * view.h + scroll * 0.25 + Math.sin(t * 0.8) * 0.04 * idle, 0);
      root.scale.setScalar(st.s * view.h);
      mark.rotation.y = st.spin + Math.sin(t * 0.45) * 0.38 * idle + pointer.x * 0.35;
      mark.rotation.x = Math.sin(t * 0.3) * 0.12 * idle + pointer.y * 0.25 + scroll * 0.4;
      chain.rotation.y = t * 0.35 * idle + st.spin * 0.5;
      chain.children.forEach((c, i) => {
        c.rotation.x = t * (0.6 + i * 0.05) * idle;
        c.rotation.z = t * 0.4 * idle;
      });

      post.uniforms.uOpacity.value = st.o * (1 - scroll);
      post.uniforms.uGlitch.value = st.glitch;
      post.uniforms.uPx.value = Math.max(st.px, 2) * dpr;
      post.uniforms.uTime.value = t;

      renderer.setRenderTarget(rt);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(postScene, postCam);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      api.current = null;
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      post.dispose();
      rt.dispose();
      timer.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    api.current?.go(pathname);
  }, [pathname]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-svh w-full"
      style={{ viewTransitionName: "scene" }}
    />
  );
}
