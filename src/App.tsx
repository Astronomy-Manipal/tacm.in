import { useEffect, useRef, useState } from "react";
import galleryImages from "./galleryData.json";

const catColor: Record<string, string> = {
  Nebula: "#e07aa5", Galaxy: "#8aa4ff", Moon: "#cfd3da",
  Planet: "#e8a55a", "Star Cluster": "#7fd1c7", "Night Sky": "#6b7fd7",
};

const PAGE = 4; // photos shown per "load more"
const categories = ["All", ...Array.from(new Set(galleryImages.map((g: any) => g.cat)))];

const Icons = {
  instagram: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  linkedin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  mail: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  arrow: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

const team = [
  { name: "Khushi Agarwal", role: "President", cursor:"Prez", img: "/images/board pictures/Khushi.jpeg", linkedin: "https://www.linkedin.com/in/khushiagarwl" },
  { name: "Prisha Kumra", role: "Vice President", cursor:"Vice\nPrez", img: "/images/board pictures/Prisha.jpeg", linkedin: "https://www.linkedin.com/in/prisha-kumra-8692b7311/" },
  { name: "Pranav Bijurkar", role: "Treasurer", cursor:"Treasurer", img: "/images/board pictures/Pranav.png", linkedin: "https://www.linkedin.com/in/pranav-bijurkar-0b2389342/" },
  { name: "Amrutha M", role: "General Secretary", cursor:"GenSec", img: "/images/board pictures/Amrutha.jpg", linkedin: "https://www.linkedin.com/in/amrutha-m-1730433a8/" },
  { name: "Sahasra", role: "Head of HR", cursor:"HR\nHead", img: "/images/board pictures/Sahasra.jpeg", linkedin: "https://www.linkedin.com/in/sai-sahasra-badam-75042131b/" },

  { name: "Anmol Kesarwani", role: "Technical Head – Applied Projects", cursor:"Tech\nHead", img: "/images/board pictures/Anmol.jpg", linkedin: "https://www.linkedin.com/in/anmol-kesarwani/" },
  { name: "Siddharth Sudheer", role: "Technical Head – Research", cursor:"Tech\nHead", img: "/images/board pictures/Pari.jpeg", linkedin: "https://www.linkedin.com/in/siddharth-sudheer-9b2552322/" },
  { name: "Trishanth Bharath", role: "Astrophotography", cursor:"Astroph", img: "/images/board pictures/Trishanth.jpg", linkedin: "https://www.linkedin.com/in/trishanth-bharath-82439b328/" },
  { name: "Brunda S M", role: "SM & Content", cursor:"SMC\nHead", img: "/images/board pictures/Brunda.jpeg", linkedin: "https://www.linkedin.com/in/brunda-s-m-ab1082381/" },
  { name: "Prisha Kumra", role: "SM & Content", cursor:"SMC\nHead", img: "/images/board pictures/Prisha.jpeg", linkedin: "https://www.linkedin.com/in/prisha-kumra-8692b7311/" },
  { name: "Krtin Vishnu Vardhan", role: "Graphic Design", cursor:"GD\nHead", img: "/images/board pictures/Krtin.jpeg", linkedin: "https://www.linkedin.com/in/krtinv/" },
  { name: "Devanshi Thakur", role: "Graphic Design", cursor:"GD\nHead", img: "/images/board pictures/Devanshi.jpg", linkedin: "https://www.linkedin.com/in/devanshi-thakur-22jan06/" },
  { name: "Siddharth Sudeep Edakkattu", role: "Podcast Head", cursor:"Podcast\nHead", img: "/images/board pictures/Batak.jpg", linkedin: "https://www.linkedin.com/in/siddharth-sudeep-a6a794352/" },
];

const eventsData = [
  { k:"01", cursor:"STARGAZING", title: "Star Gazing Nights", desc: "Equipped with telescopes, a will to explore and guided by enthusiasts, participants immerse themselves in galaxies, constellations and planets.", img: "/images/stargazingnight.png", tag: "EVERY FORTNIGHT" },
  { k:"02", cursor:"SEMINAR", title: "Seminar with the Experts", desc: "Renowned astronomers share latest research from black holes to origins of the universe. Interactive Q&A, live demos, papers.", img: "/images/expert-talks.png", tag: "EXPERT TALKS" },
  { k:"03", cursor:"PLANETARIUM", title: "Planetarium Visits", desc: "Immersive dome-shaped theater at Dr. TMA Pai Planetarium. Transport to distant galaxies and cosmic wonders.", img: "/images/planetarium.jpg", tag: "FIELD VISITS" },
];

const faqs = [
  { q: "How do I join the club?", a: "1st years can join during Working Committee (WC) Recruitments, and 2nd years during Managing Committee (MC) Recruitments. Keep an eye on our Instagram for announcements!" },
  { q: "I was a WC member in 1st year. Do I need to fill MC form in 2nd year?", a: "Yes, all previous WCs are required to fill the form to be promoted to MC and continue being a part of the club. Legacy docs will be reviewed." },
  { q: "Can people from Non-MAHE colleges join this club?", a: "Sorry, only MAHE students can apply to MAHE clubs. But our sky-watches and public seminars are open to all. Follow us to attend." },
  { q: "Can non-members tag along for sky watching events?", a: "Absolutely. Sky-watches are organized by members but open to all students, except for some club-exclusive deep-sky sessions." },
];

const socialLinks = [
  { k: "instagram", href: "https://www.instagram.com/astronomy.manipal/", label: "@astronomy.manipal" },
  { k: "linkedin", href: "https://in.linkedin.com/company/the-astronomy-club-manipal", label: "LinkedIn / TACM" },
  { k: "facebook", href: "https://m.facebook.com/theastronomyclubmanipal/", label: "Facebook" },
  { k: "twitter", href: "https://twitter.com/AstronomyMahe", label: "@AstronomyMahe" },
  { k: "mail", href: "mailto:astronomy.club@manipal.edu", label: "astronomy.club@manipal.edu" },
];
const topLinks = [
  { k: "instagram", label: "Instagram", href: "https://www.instagram.com/astronomy.manipal/", hover: "hover:bg-[#E1306C]" },
  { k: "linkedin", label: "LinkedIn", href: "https://in.linkedin.com/company/the-astronomy-club-manipal", hover: "hover:bg-[#0A66C2]" },
  { k: "mail", label: "Mail", href: "mailto:astronomy.club@manipal.edu", hover: "hover:bg-[#e63734]" },
];

/* -------------------- Components -------------------- */
const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

function CustomCursor() {
  if (isTouch) return null;
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const m = useRef({ x: 0, y: 0 });
  const r = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const onMove = (e: MouseEvent) => {
      m.current.x = e.clientX;
      m.current.y = e.clientY;
      dot.current && (dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`);
    };
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      setHover(!!el);
      setTxt(el?.dataset.cursor || "");
    };
    let raf: number;
    const loop = () => {
      r.current.x += (m.current.x - r.current.x) * 0.12;
      r.current.y += (m.current.y - r.current.y) * 0.12;
      const t = `translate(${r.current.x}px,${r.current.y}px) translate(-50%,-50%)`;
      ring.current && (ring.current.style.transform = t);
      label.current && (label.current.style.transform = t);
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-[5px] h-[5px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference will-change-transform" />
      <div ref={ring} className={`fixed top-0 left-0 pointer-events-none z-[998] rounded-full border mix-blend-difference will-change-transform transition-[width,height,border,background] duration-300 ${hover ? "w-[88px] h-[88px] border-white bg-white/[0.07] shadow-[0_0_30px_rgba(255,255,255,0.06)]" : "w-[34px] h-[34px] border-white/60"}`} />
      <div
  ref={label}
  className={`fixed top-0 left-0 pointer-events-none z-[998]
    w-[88px] h-[88px]
    flex items-center justify-center
    text-center
    mix-blend-difference
    will-change-transform
    transition-opacity
    ${hover && txt ? "opacity-100" : "opacity-0"}`}
>
  <span
    style={{
      fontSize: txt === "ZOOM" ? "12px" : `${Math.max(5, 90 / Math.max(...txt.split("\n").map((l) => l.length)))}px`,
      lineHeight: 1.05,
      letterSpacing: "0.08em",
      maxWidth: "74px",
      wordBreak: "break-word",
      whiteSpace: "pre-line",
    }}
    className="font-mono uppercase text-white"
  >
    {txt}
  </span>
</div>
</>
  );
}

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = c.width = innerWidth;
    let h = c.height = innerHeight;
    const stars = Array.from({ length: innerWidth < 768 ? 160 : 360 }, () => ({ // fewer on phones
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      o: Math.random(),
      d: Math.random() * 0.02 + 0.002,
      sp: Math.random() * 0.3 + 0.1,
    }));
    const meteors: any[] = [];
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.o += s.d;
        if (s.o > 1 || s.o < 0.2) s.d *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.fill();
        s.y -= s.sp * 0.1;
        if (s.y < 0) { s.y = h; s.x = Math.random() * w; }
      }
      if (Math.random() < 0.005) {
        meteors.push({ x: -80, y: Math.random() * h * 0.4, vx: 14 + Math.random() * 10, vy: 3 + Math.random() * 3, life: 1 });
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.018;
        if (m.life <= 0) { meteors.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 2.5, m.y - m.vy * 2.5);
        ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />;
}

/* 3D Earth — one full-screen shader pass, raw WebGL, no libraries.
   Real coastlines come from a 21 KB 1-bit land map (Natural Earth 1:50m, public domain);
   biomes, oceans, clouds and atmosphere are computed per pixel.
   Drag to spin. Pauses off-screen; lowers resolution on slow devices. */
const PLANET_VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const PLANET_FS = `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
uniform vec2 uRes;
uniform float uSpin, uCloud, uIntro, uTime;
uniform vec2 uTilt;
uniform sampler2D uMap;

mat3 rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
mat3 rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotZ(float a){ float c=cos(a), s=sin(a); return mat3(c,s,0., -s,c,0., 0.,0.,1.); }
float hash(vec3 p){ p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float noise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + 1.), f.x), f.y), f.z);
}
const mat3 R = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
float fbm(vec3 p, int oct){ float v = 0., a = 0.5; for (int i = 0; i < 6; i++) { if (i >= oct) break; v += a * noise(p); p = R * p * 2.02; a *= 0.5; } return v; }
vec2 sphere(vec3 ro, vec3 rd, vec3 c, float r){ vec3 o = ro - c; float b = dot(o, rd); float dd = sqrt(max(dot(o, o) - b * b, 0.)); return vec2(dd, -b - sqrt(max(r * r - dd * dd, 0.))); }
float band(float x, float c, float w){ return exp(-pow((x - c) / w, 2.)); }

void main(){
  float m = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / m;
  float ease = 1. - pow(1. - uIntro, 3.);
  float camZ = 3.9 + (1. - ease) * 1.6;                     // zoom-in on load
  mat3 M = rotX(uTilt.x) * rotY(uTilt.y) * rotZ(0.41);      // world -> planet space (23.4° tilt)
  vec3 ro = M * vec3(0., 0., camZ);
  vec3 rd = M * normalize(vec3(uv, -1.25));
  vec3 L  = M * normalize(vec3(-0.62, 0.3, 0.72));
  float px = camZ / (1.25 * m);

  vec3 sky = vec3(0.30, 0.58, 1.0), dusk = vec3(1.0, 0.45, 0.18);
  vec3 col = vec3(0.); float alpha = 0.;

  // ---- background moon ----
  vec3 mc = M * vec3(1.35, 3.3, -4.5);
  vec2 hm = sphere(ro, rd, mc, 0.32);
  float aM = 1. - smoothstep(0.32 - px * 1.5, 0.32 + px * 1.5, hm.x);
  if (aM > 0.) {
    vec3 n = normalize(ro + rd * hm.y - mc);
    float mare = smoothstep(0.45, 0.7, fbm(n * 2.5, 3));
    vec3 mcol = vec3(0.72, 0.71, 0.70) * (1. - 0.35 * mare) * (0.85 + 0.3 * noise(n * 14.));
    col = mcol * smoothstep(-0.05, 0.3, dot(n, L)) * aM; alpha = aM;
  }

  // ---- Earth ----
  vec2 he = sphere(ro, rd, vec3(0.), 1.);
  float dd = he.x;
  float aE = 1. - smoothstep(1. - px, 1. + px, dd);
  // surface point + map lookups run for every pixel (outside the branch below):
  // texture/derivative calls inside divergent branches break on some GPU drivers
  vec3 n = normalize(ro + rd * he.y);
  vec3 ns = rotY(-uSpin) * n;                               // geographic frame (spins west→east)
  float latR = asin(clamp(ns.y, -1., 1.)), alat = abs(latR);
  float u = atan(-ns.z, ns.x) / 6.2831853 + 0.5, v = 0.5 - latR / 3.1415927;
  float u2 = fract(u + 0.5) - 0.5;                          // Tarini's trick hides the ±180° seam
  #ifdef GL_OES_standard_derivatives
    if (fwidth(u) > fwidth(u2) + 1e-5) u = u2;
  #endif
  vec2 tc = vec2(u, v);
  float raw = texture2D(uMap, tc).r;
  float inland = texture2D(uMap, tc, 5.5).r;                // blurred mip = distance from coast
  float shelf = texture2D(uMap, tc, 2.5).r;
  if (aE > 0.) {
    float ndl = dot(n, L), mu = max(dot(n, -rd), 0.);
    float land = smoothstep(0.38, 0.62, raw);

    // biomes from real latitude + how far inland
    float detail = fbm(ns * 18., 4);
    float arid = clamp(band(alat, 0.40, 0.16) * smoothstep(0.55, 0.9, inland) + band(alat, 0.75, 0.12) * smoothstep(0.85, 0.98, inland) * 0.8, 0., 1.);
    arid = clamp(arid + (noise(ns * 6.) - 0.5) * 0.5, 0., 1.);
    vec3 tropic = vec3(0.04, 0.14, 0.04), temperate = vec3(0.17, 0.24, 0.09), boreal = vec3(0.07, 0.15, 0.09), tundra = vec3(0.40, 0.38, 0.32), desert = vec3(0.72, 0.55, 0.33);
    vec3 ground = mix(tropic, temperate, smoothstep(0.25, 0.55, alat));
    ground = mix(ground, boreal, smoothstep(0.85, 0.95, alat));
    ground = mix(ground, tundra, smoothstep(1.08, 1.18, alat));
    ground = mix(ground, desert, smoothstep(0.35, 0.65, arid));
    ground *= 0.7 + 0.6 * detail;

    vec3 ocean = mix(vec3(0.004, 0.03, 0.10), vec3(0.03, 0.19, 0.30), smoothstep(0.15, 0.85, shelf) * 0.85);
    float jitter = (noise(ns * 9.) - 0.5) * 0.12;
    float landIce = land * smoothstep(1.12, 1.2, alat + jitter + inland * 0.06);   // Greenland, Antarctica
    float seaIce = (1. - land) * smoothstep(1.3, 1.36, alat + jitter);              // Arctic pack ice
    vec3 surf = mix(mix(ocean, ground, land), vec3(0.93, 0.96, 1.0) * (0.92 + 0.08 * detail), max(landIce, seaIce));

    // clouds: swirling, latitude-stretched; more at the equator & storm tracks, fewer over subtropical highs
    vec3 cp = rotY(-uCloud) * n;
    float sw = fbm(cp * 2.2, 3);
    vec3 cq = vec3(cp.x * 2.3, cp.y * 5.2, cp.z * 2.3) + sw * 1.6;
    float bias = 0.07 * band(latR, 0.1, 0.12) + 0.07 * band(alat, 0.95, 0.22) - 0.08 * band(alat, 0.45, 0.15);
    float cl = smoothstep(0.52 - bias, 0.78 - bias, fbm(cq, 5));
    cl = max(cl, 0.35 * smoothstep(0.58, 0.8, fbm(cp * 7. + sw, 3)));

    float day = smoothstep(-0.12, 0.4, ndl);
    vec3 c = surf * day * (1. - 0.3 * cl);
    vec3 H = normalize(L - rd);
    float fres = 0.02 + 0.98 * pow(1. - mu, 5.);
    float water = (1. - land) * (1. - seaIce) * (1. - cl);
    c += vec3(1.0, 0.93, 0.82) * (pow(max(dot(n, H), 0.), 400.) * 1.2 + pow(max(dot(n, H), 0.), 14.) * 0.07 + fres * 0.15) * water * day;
    c = mix(c, vec3(0.96, 0.97, 1.0) * (0.015 + 0.985 * smoothstep(-0.2, 0.5, ndl)), cl * 0.88);

    // Manipal (13.35°N, 74.79°E): a bright gold beacon
    vec3 home = vec3(cos(0.233) * cos(1.305), sin(0.233), -cos(0.233) * sin(1.305));
    float hd = length(ns - home), ph = fract(uTime * 0.35);
    float core = exp(-pow(hd / 0.018, 2.));                                       // solid dot
    float halo = exp(-pow(hd / 0.06, 2.)) * 0.45;                                 // soft glow around it
    float wave = exp(-pow((hd - ph * 0.16) / 0.009, 2.)) * (1. - ph);            // expanding ring
    float pin = core * 1.8 + halo + wave * 1.2;
    c = mix(c, vec3(1.0, 0.82, 0.35), clamp(core, 0., 1.) * 0.85);              // dot sits on top of land/clouds
    c += vec3(1.0, 0.75, 0.3) * pin * (1. - cl * 0.3) * (0.6 + 0.4 * day);

    // atmosphere: blue limb, haze, sunset band on the terminator
    vec3 atm = mix(sky, dusk, band(ndl, 0., 0.22) * 0.85);
    c = mix(c, sky * day, (1. - mu) * 0.25);
    c += atm * pow(1. - mu, 2.4) * smoothstep(-0.35, 0.45, ndl) * 0.9;
    col = mix(col, c, aE); alpha = mix(alpha, 1., aE);
  }

  // ---- outer atmosphere halo ----
  vec3 pc = normalize(ro - rd * dot(ro, rd));
  float pl = dot(pc, L);
  float halo = exp(-max(dd - 1., 0.) * 22.) * (1. - aE) * smoothstep(-0.45, 0.6, pl);
  col += mix(sky, dusk, band(pl, 0., 0.28) * 0.8) * halo * 0.9; alpha += halo * 0.7;

  col = 1. - exp(-col * 1.35);                              // filmic exposure
  gl_FragColor = vec4(col, clamp(alpha, 0., 1.)) * smoothstep(0., 1., uIntro);
}`;

function PlanetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "low-power" });
    if (!gl) return; // no WebGL → the CSS glow behind still shows
    gl.getExtension("OES_standard_derivatives");

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("[Earth] shader error:", gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, PLANET_VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, PLANET_FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error("[Earth] link error:", gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // one big triangle
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uSpin = U("uSpin"), uCloud = U("uCloud"), uIntro = U("uIntro"), uTime = U("uTime"), uTilt = U("uTilt");

    // Land map: 1 black pixel placeholder until the 21 KB image arrives
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 1, 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, new Uint8Array([0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    let ready = false, alive = true;
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true;
    };
    img.onerror = () => { ready = true; }; // still show an ocean world
    img.src = "/images/earth-land.png";

    // Resolution: start at up to 1.5x, drop automatically if frames are slow
    let scale = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      c.width = Math.round(c.clientWidth * scale); c.height = Math.round(c.clientHeight * scale);
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uRes, c.width, c.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    // Hover tilt + drag-to-spin with momentum
    const BASE = 0.12, AUTO = 0.03;
    const tilt = { x: BASE, y: 0 }, target = { x: BASE, y: 0 };
    let spin = -3.05, vel = AUTO, dragging = false, lastX = 0;   // opens facing India
    const host = c.parentElement!;
    const onMove = (e: PointerEvent) => {
      const b = c.getBoundingClientRect();
      target.y = ((e.clientX - b.left) / b.width - 0.5) * 0.5;
      target.x = BASE + ((e.clientY - b.top) / b.height - 0.5) * 0.25;
      if (dragging) { const dx = e.clientX - lastX; lastX = e.clientX; spin += dx * 0.006; vel = dx * 0.006 * 60; }
    };
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; vel = 0; c.setPointerCapture(e.pointerId); };
    const onUp = () => { dragging = false; };
    host.addEventListener("pointermove", onMove);
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, onScreen = true, intro = 0, cloud = 0, time = 0, slow = 0, frames = 0, start = 0;
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      if (ready) {
        // adaptive quality: if frames average >24ms, render at lower resolution
        if (dt > 0 && frames < 90) { frames++; slow += dt > 0.024 ? 1 : 0; if (frames === 90 && slow > 45 && scale > 0.75) { scale = Math.max(0.75, scale * 0.7); resize(); frames = 0; slow = 0; } }
        if (!start) start = now;
        intro = reduced ? 1 : Math.min(1, (now - start) / 1800);   // wall-clock, so slow devices don't drag it out
        if (!reduced) {
          if (!dragging) { vel += (AUTO - vel) * Math.min(1, dt * 1.5); spin += vel * dt; }
          cloud += dt * 0.008; time += dt;
        }
      }
      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;
      gl.uniform1f(uSpin, spin);
      gl.uniform1f(uCloud, spin * 1.05 + cloud);
      gl.uniform1f(uIntro, intro);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uTilt, tilt.x, tilt.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = onScreen && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const resume = () => { if (!raf && onScreen && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; resume(); });
    io.observe(c);
    document.addEventListener("visibilitychange", resume);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", resume);
      host.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
      // Free GPU resources but keep the context alive: React StrictMode (dev) unmounts and
      // remounts immediately on the same canvas, and a lost context would render nothing.
      gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
    };
  }, []);
  return <canvas ref={ref} data-cursor="DRAG" className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }} />;
}

function Magnetic({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`transition-transform duration-200 ease-out will-change-transform ${className}`} {...props}>{children}</button>;
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, set] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1800);
          set(Math.floor((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}<span className="mono text-[10px] opacity-50">{suffix}</span></span>;
}

/* -------------------- KEYFRAMES CSS -------------------- */

const keyframes = `
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1.02)}}
  @keyframes pulseglow{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.8;transform:scale(1.05)}}
  @keyframes breathe{0%,100%{box-shadow:0 0 40px rgba(168,85,247,0.15)}50%{box-shadow:0 0 80px rgba(168,85,247,0.25)}}
`;

/* -------------------- APP -------------------- */

export default function App() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null); // index into `filtered`
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [scroll, setScroll] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false); // phone menu
  const touchX = useRef<number | null>(null);      // lightbox swipe

  // lock page scroll while the phone menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScroll(scrollY / (document.body.scrollHeight - innerHeight));
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g: any) => g.cat === filter);
  const shown = filtered.slice(0, visible);
  const current = lightbox !== null ? (filtered[lightbox] as any) : null;
  const go = (d: number) =>
    setLightbox((i) => (i === null ? i : (i + d + filtered.length) % filtered.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    fd.append("subject", "New message from the TACM website");
    fd.append("from_name", "TACM Website");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03050c] text-[#eaeef6] selection:bg-white selection:text-black antialised overflow-clip">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;600;800&family=Geist+Mono:wght@300;400;500&display=swap');*{font-family:"Syne",system-ui}.serif{font-family:"Instrument Serif",serif}.mono{font-family:"Geist Mono",monospace}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#ffffff33;border-radius:3px}html{scroll-behavior:smooth}:root{--gold:#f0b94a}.swipe-row{scrollbar-width:none}.swipe-row::-webkit-scrollbar{display:none}.gcard{border:1px solid color-mix(in srgb,var(--c) 45%,transparent);box-shadow:0 0 0 1px rgba(0,0,0,.6),0 12px 30px rgba(0,0,0,.55),0 0 18px color-mix(in srgb,var(--c) 12%,transparent);transition:border-color .3s,box-shadow .3s}.gcard:hover{border-color:var(--c);box-shadow:0 0 0 1px rgba(0,0,0,.6),0 12px 30px rgba(0,0,0,.55),0 0 28px color-mix(in srgb,var(--c) 40%,transparent)}${keyframes}`}</style>

      <CustomCursor />
      <StarField />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[5%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(120,119,198,0.18),transparent_65%)] md:blur-[40px]" />
        <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_65%)] md:blur-[40px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[50vh] bg-[radial-gradient(ellipse,rgba(56,189,248,0.10),transparent_60%)] md:blur-[30px]" />
      </div>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-[linear-gradient(90deg,rgba(168,85,247,0.6),rgba(56,189,248,0.6),white)] mix-blend-difference" style={{ transform: `scaleX(${scroll})` }} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-[20px] bg-[#03050c]/70">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 h-[66px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <img
  src="/images/logo.jpeg"
  alt="TACM Logo"
  className="w-8 h-8 rounded-full object-cover"
/>
            <div className="leading-[1.05]">
              <div className="mono text-[13px] sm:text-[15px] tracking-[0.2em] opacity-80 group-hover:opacity-100 transition">THE ASTRONOMY CLUB</div>
              <div className="mono text-[10px] tracking-[0.3em] opacity-40 mt-1.5">MANIPAL - MIT</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-9 mono text-[11.5px] tracking-[0.2em]">
            {["#about","#events","#projects","#gallery","#team","#contact"].map((href,i)=>(
              <a key={href} data-cursor="GO" href={href} className="opacity-80 hover:opacity-100 transition relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full">{["ABOUT","EVENTS","PROJECTS","GALLERY","TEAM","CONTACT"][i]}</a>
            ))}
          </div>
            <div className="hidden sm:flex items-center gap-2">
              {topLinks.map((s) => (
                <a
                  key={s.k}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-cursor={s.label.toUpperCase()}
                  className={`w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] grid place-items-center transition hover:text-white hover:border-transparent ${s.hover}`}
                >
                  {Icons[s.k as keyof typeof Icons]({ className: "w-4 h-4" })}
                </a>
              ))}
            </div>

            {/* Phone menu button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden w-11 h-11 -mr-1 rounded-full border border-white/10 bg-white/[0.04] grid place-items-center"
            >
              <span className="relative block w-[18px] h-[10px]">
                <span className={`absolute left-0 right-0 h-px bg-white transition-all duration-300 ${menuOpen ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 right-0 h-px bg-white transition-all duration-300 ${menuOpen ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
              </span>
            </button>
        </div>
      </nav>

      {/* PHONE MENU */}
      <div className={`md:hidden fixed inset-0 top-[66px] z-40 bg-[#03050c]/95 backdrop-blur-xl transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="h-full flex flex-col justify-between px-6 pt-8 pb-10 overflow-y-auto">
          <div className="flex flex-col">
            {["#about","#events","#projects","#gallery","#team","#contact"].map((href, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-baseline gap-4 py-3 border-b border-white/5 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms" }}
              >
                <span className="mono text-[11px] opacity-40">0{i + 1}</span>
                <span className="serif text-[38px] leading-none">{["About","Events","Projects","Gallery","Team","Contact"][i]}</span>
              </a>
            ))}
          </div>
          <div className="flex gap-3 pt-8">
            {topLinks.map((s) => (
              <a key={s.k} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] grid place-items-center">
                {Icons[s.k as keyof typeof Icons]({ className: "w-5 h-5" })}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-10 pt-[66px] overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-[10vh] md:pt-[14vh] pb-[4vh] md:pb-[5vh] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div className="relative">
            {/* <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] mono text-[10px] tracking-[0.15em] backdrop-blur" style={{ animation: "breathe 4s ease-in-out infinite" }}>
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse" />
              REGISTRATIONS OPEN - WC RECRUITMENTS 2026
              <span className="opacity-40 hidden sm:inline">· STARGAZING EVERY FRIDAY</span>
            </div> */}

            <h1 className="mt-0 text-[14vw] md:text-[10vw] lg:text-[9.2vw] leading-[0.86] tracking-[-0.05em] font-[800]">
              <span className="block opacity-90">THE</span>
              <span className="block serif italic font-[400] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#e0d0ff] to-[#a78bfa] pb-[0.12em]">
                Astronomy
              </span>
              <span className="block flex items-start md:items-center gap-3 md:gap-5 flex-wrap">
                CLUB
                <span className="mono text-[12px] md:text-[14px] leading-none tracking-[0.15em] font-normal border border-white/12 rounded-full px-5 py-2.5 bg-white/[0.03] backdrop-blur">
                  MANIPAL
                </span>
              </span>
            </h1>


            <p className="mt-8 max-w-[54ch] text-[15px] md:text-[17px] leading-[1.75] opacity-60 font-light tracking-[0.01em]">
              Explore the cosmos with the Astronomy Club of Manipal Institute of Technology. From stargazing and astrophotography to space technology and celestial discoveries, we bring curious minds together to look beyond the ordinary.
            </p>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <a href="#gallery"><Magnetic data-cursor="EXPLORE" className="h-[50px] px-7 rounded-full bg-[var(--gold)] text-black mono text-[11px] tracking-[0.15em] flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">EXPLORE REAL ASTROPHOTOGRAPHS <Icons.arrow className="w-4 h-4" /></Magnetic></a>
              <button data-cursor="LISTEN" onClick={()=>window.open("https://open.spotify.com/show/0Cw5mj6y9oDh4wVzyK7Y68", "_blank")} className="h-[50px] px-7 rounded-full border border-white/12 mono text-[11px] tracking-[0.15em] bg-white/[0.03] backdrop-blur hover:bg-white/[0.08] flex items-center gap-2.5 transition"><span className="w-6 h-6 rounded-full bg-white/20 text-white grid place-items-center text-[11px]">▶</span> LISTEN TO PODCASTS</button>
            </div>


            <div className="mt-15 grid grid-cols-3 gap-0 max-w-[600px] border-t border-white/20 pt-3">
              {[
                { n: 3, s: "K+", l: "STUDENTS REACHED" },
                { n: 30, s: "+", l: "EVENTS HOSTED" },
                { n: 2, s: "", l: "TELESCOPES" },
              ].map((x) => (
                <div key={x.l} className="mono">
                  <div className="text-[30px] md:text-[38px] font-semibold tracking-tight flex items-baseline gap-0.5"><CountUp to={x.n} suffix="" /><span className="text-[18px] opacity-70">{x.s}</span></div>
                  <div className="text-[11px] md:text-[12px] tracking-[0.15em] md:tracking-[0.2em] opacity-40 mt-1">{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side  refined deep-space visual */}
          <div className="relative lg:h-[78vh] min-h-[380px] sm:min-h-[460px]">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)] backdrop-blur-[1px] overflow-hidden border border-white/6">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

              {/* Core glow (also the fallback if WebGL is unavailable) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(82,153,255,0.10),transparent_70%)]" />

              {/* 3D Earth (drag to spin) */}
              <PlanetCanvas />

              {/* Constellation lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 500 500">
                <line x1="80" y1="120" x2="150" y2="60" stroke="white" strokeWidth="0.5" />
                <line x1="150" y1="60" x2="200" y2="110" stroke="white" strokeWidth="0.5" />
                <line x1="200" y1="110" x2="160" y2="180" stroke="white" strokeWidth="0.5" />
                <line x1="160" y1="180" x2="90" y2="170" stroke="white" strokeWidth="0.5" />
                <line x1="90" y1="170" x2="80" y2="120" stroke="white" strokeWidth="0.5" />
                <circle cx="80" cy="120" r="2.5" fill="white" />
                <circle cx="150" cy="60" r="2.5" fill="white" />
                <circle cx="200" cy="110" r="2.5" fill="white" />
                <circle cx="160" cy="180" r="2.5" fill="white" />
                <circle cx="90" cy="170" r="2.5" fill="white" />
              </svg>

              {/* Astro specs */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end pointer-events-none">
                <div className="hidden sm:block mono text-[9px] leading-[1.6] opacity-40 tracking-[0.1em]">
                  RA 05h 35m · DEC -05° 23' · MAG 4.0<br />
                  FOV 1.2° · EXPO 2.4s · DOBSONIAN 10"
                </div>
                <div className="ml-auto flex items-center gap-2.5 mono text-[10px] sm:text-[9px] tracking-[0.2em] opacity-40 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  TRACKING LIVE
                </div>
              </div>
            </div>

            {/* Floating card 1 */}
            <div className="hidden sm:block absolute -left-3 md:-left-6 top-[16%] rotate-[-5deg] w-[200px] p-4 rounded-[18px] bg-white/5 backdrop-blur-xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ animation: "float 7s ease-in-out infinite" }}>
              <div className="mono text-[8px] tracking-[0.25em] opacity-50">NEXT EVENT</div>
              <div className="serif text-[18px] leading-[1.1] mt-1">Star Gazing Night</div>
              <div className="mono text-[10px] mt-2.5 opacity-50">SUNDAY · 7PM · FREE</div>
            </div>

            {/* Floating card 2 */}
            <div className="hidden sm:block absolute -right-3 md:-right-6 bottom-[20%] rotate-[3deg] w-[200px] p-4 rounded-[18px] bg-white/5 backdrop-blur-xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ animation: "float 9s ease-in-out infinite 1s" }}>
              <div className="flex items-center gap-2 mono text-[8px] tracking-[0.25em] opacity-50"><span className="w-1 h-1 bg-white rounded-full" /> VISIT</div>
              <div className="serif text-[17px] leading-[1.1] mt-1">MCNS Planetarium</div>
              <div className="mono text-[10px] mt-2.5 opacity-50">Oct 25 · 11:30 AM</div>
            </div>
          </div>

          {/* Phones: the two floating cards sit neatly under the Earth instead of covering it */}
          <div className="sm:hidden -mt-6 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-[18px] bg-white/5 border border-white/8">
              <div className="mono text-[10px] tracking-[0.2em] opacity-50">NEXT EVENT</div>
              <div className="serif text-[18px] leading-[1.1] mt-1">Star Gazing Night</div>
              <div className="mono text-[11px] mt-2 opacity-50">SUNDAY · 7PM · FREE</div>
            </div>
            <div className="p-4 rounded-[18px] bg-white/5 border border-white/8">
              <div className="mono text-[10px] tracking-[0.2em] opacity-50">VISIT</div>
              <div className="serif text-[18px] leading-[1.1] mt-1">MCNS Planetarium</div>
              <div className="mono text-[11px] mt-2 opacity-50">Oct 25 · 11:30 AM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-[66px] relative z-10 border-t border-white/15">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-14 md:py-10">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div className="relative">
              <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> ABOUT</div>
              <h2 className="serif text-[44px] md:text-[70px] leading-[0.92] tracking-[-0.02em] mt-6">
                We look up<br />
                <span className="italic opacity-50 text-[#c4b5fd]">to feel small,</span>
                <br />precise, infinite.
              </h2>
            </div>
              <div className="grid sm:grid-cols-2 gap-8 text-[14px] leading-[1.8] opacity-65">
              <p className="backdrop-blur-sm bg-white/[0.02] rounded-[16px] p-6 border border-white/5">Look up. The light reaching your eyes tonight began its journey long ago, in a place you will never visit. All we can do is witness it. And if we are lucky, maybe even capture it...</p>
              <p className="backdrop-blur-sm bg-white/[0.02] rounded-[16px] p-6 border border-white/5">Through stargazing events, educational outreach, and collaborative projects, we aim to inspire a deeper appreciation for astronomy and cultivate a community that celebrates the beauty of the night sky.</p>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto max-w-[1300px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              ["88", "Constellations mapped"],
              ["2T", "Galaxies in observable universe"],
              ["40Q", "Quintillion black holes"],
              ["200S", "Sextillion stars counting"],
            ].map(([n, l]) => (
              <div key={n} className="flex items-center gap-3 px-3 md:px-5 py-5 md:py-7">
                <div className="text-[22px] md:text-[30px] font-bold tracking-tight text-[#c4b5fd]">{n}</div>
                <div className="mono text-[10px] md:text-[9px] leading-[1.2] tracking-[0.1em] md:tracking-[0.15em] opacity-50 md:opacity-40 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="scroll-mt-[66px] relative z-10 py-14 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div>
              <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> EVENTS</div>
              
              <h3 className="serif text-[48px] md:text-[74px] leading-[0.88] mt-4">Cosmic blend<br />of knowledge & thrill</h3>
            </div>
            <p className="mono text-[11px] md:text-[10px] tracking-[0.2em] max-w-[28ch] opacity-40">FROM STARGAZING NIGHTS TO CELESTIAL WORKSHOPS AND COMPETITIONS</p>
          </div>

          <div className="swipe-row mt-10 md:mt-14 -mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
            {eventsData.map((ev) => (
              <div key={ev.k} data-cursor={ev.cursor} className="shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-start group relative rounded-[24px] overflow-hidden border border-white/8 bg-[#0b0e1a] hover:border-white/20 transition duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]">
                <div className="h-[200px] md:h-[280px] overflow-hidden relative">
                  <img src={ev.img} className="w-full h-full object-cover group-hover:scale-[1.08] transition duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/20 to-transparent" />
                  <div className="absolute top-4 left-4 mono text-[10px] md:text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10">{ev.tag}</div>
                  <div className="absolute top-4 right-4 mono text-[9px] w-8 h-8 grid place-items-center rounded-full bg-black/30 backdrop-blur border border-white/10">{ev.k}</div>
                </div>
                <div className="p-6">
                  <h4 className="text-[21px] leading-[1.15] font-semibold tracking-tight">{ev.title}</h4>
                  <p className="mt-3 text-[13px] leading-[1.65] opacity-55">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-[66px] relative z-10 py-14 md:py-8 bg-[#080a15] border-y border-white/5">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> PROJECTS</div>
          <div className="swipe-row mt-10 -mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
            {[
              { title: "Research & Paper Review", cursor:"PAPERS", desc: "Unparalleled opportunities for scholarly research, paper reviews, and in-depth celestial exploration of LIGO, gravitational waves, exoplanets.", icon: "◐", cta: "READ PAPERS" },
              { title: "Telescope Mount Build", cursor:"MOUNT", desc: "Selecting sturdy materials to assembling components, each step contributes to the stability and performance of a custom equatorial mount.", icon: "◑", cta: "BUILD LOG" },
              { title: "Star Tracking API", cursor:"API", desc: "Designing a user-friendly interface integrating with star databases and ensuring accurate celestial positioning information.", icon: "◎", cta: "API DOCS" },
            ].map((p, i) => (
              <div key={i} data-cursor={p.cursor} className="shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-start relative group rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-[1px] hover:border-white/20 transition">
                <div className="rounded-[19px] bg-[#0e1224] p-6 md:p-7 h-full">
                  <div className="w-10 h-10 rounded-full border border-white/10 grid place-items-center text-[18px] bg-white/[0.04]">{p.icon}</div>
                  <h4 className="mt-6 text-[21px] leading-[1.1] font-semibold">{p.title}</h4>
                  <p className="mt-3 mono text-[12px] leading-[1.7] opacity-55">{p.desc}</p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="mono text-[10px] md:text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/8 border border-white/10">{p.cta}</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 text-white grid place-items-center group-hover:bg-white group-hover:text-black transition group-hover:rotate-[-45deg] duration-500">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-14 rounded-[24px] border border-white/8 bg-gradient-to-br from-[#0e1224] to-[#0b0e1a] p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="serif text-[24px] md:text-[32px] leading-[1.05] max-w-[26ch] text-[#c4b5fd] italic">"Astronomy is a humbling reminder that in the vast expanse of the cosmos, our existence is but a fleeting moment, yet our curiosity knows no bounds."</div>
            <div className="mono text-[11px] md:text-[10px] tracking-[0.2em] opacity-40 shrink-0"> TACM MANIFESTO</div>
          </div> */}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-[66px] relative z-10 py-14 md:py-10">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-wrap gap-6 items-end justify-between">
            <div>
              <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> GALLERY</div>
              <h3 className="serif text-[52px] md:text-[84px] leading-[0.85] mt-4">In stillness,<br />the sky moves</h3>
            </div>
            <div className="flex gap-2 mono text-[11px] md:text-[10px] tracking-[0.15em] flex-wrap">
              {categories.map((c: string) => (
                <button
                  key={c}
                  onClick={() => { setFilter(c); setVisible(PAGE); }}
                  data-cursor="FILTER"
                  className={`px-4 h-10 md:h-8 rounded-full border transition ${filter === c ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "border-white/10 bg-white/[0.03] hover:bg-white/10"}`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-14 mono text-[11px] tracking-[0.2em] opacity-40 text-center py-20 border border-dashed border-white/10 rounded-[20px]">
              NO PHOTOS YET
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {shown.map((g: any, i: number) => (
                <div
                  key={g.id}
                  data-cursor="ZOOM"
                  onClick={() => setLightbox(i)}
                  style={{ "--c": "#8fb8ff" } as React.CSSProperties}
                  className="gcard group relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[#0b0e1a] cursor-pointer"
                >
                  <img
                    src={g.thumb}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-[1.2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/15 inline-flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: catColor[g.cat] || "#fff" }}
                      />
                      {g.cat}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.2] font-medium">{g.title}</div>
                    <div className="mono text-[9px] opacity-50 mt-1">{g.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="mono text-[12px] tracking-[0.2em] opacity-40">SHOWING {shown.length} OF {filtered.length}</div>
              {visible < filtered.length && (
                <button
                  data-cursor="MORE"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="h-[46px] px-7 rounded-full border border-white/42 bg-white/[0.03] hover:bg-white hover:text-black transition mono text-[11px] tracking-[0.15em]"
                >
                  LOAD MORE
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative z-10 py-15 border-t border-white/5 bg-[#070912] scroll-mt-[66px]">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex justify-between items-end">
            <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> MEET THE TEAM</div>
            <div className="mono text-[11px] md:text-[15px] tracking-[0.2em] opacity-30">2026 · 27 BOARD</div>
          </div>
        <div className="mt-10 md:mt-12 grid grid-cols-2 gap-x-3 gap-y-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {team.map((m) => {
            const Card: any = m.linkedin ? "a" : "div";
            return (
              <Card
                key={`${m.name}-${m.role}`}
                {...(m.linkedin ? { href: m.linkedin, target: "_blank", rel: "noreferrer" } : {})}
                data-cursor={(m.cursor || m.role).toUpperCase()}
                className="group block w-full sm:w-[230px] flex-shrink-0"
              >
                <div className="aspect-[4/5] rounded-[18px] overflow-hidden border border-white/8 bg-[#0b0e1a] relative">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
                  />
                  {m.linkedin && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/15 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                      {Icons.linkedin({ className: "w-4 h-4" })}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 mono text-[9px] sm:text-[10px] leading-[1.25] tracking-[0.1em] sm:tracking-[0.15em] px-2 sm:px-3 py-1.5 sm:py-2 rounded-[12px] sm:rounded-full bg-white/90 text-black text-center">
                    {m.role.toUpperCase()}
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 mono text-[14px] sm:text-[15px] leading-[1.2] text-center">
                  {m.name.split(" ")[0]}
                  <br />
                  <span className="opacity-40 text-[12px]">{m.name.split(" ").slice(1).join(" ")}</span>
                </div>
              </Card>
            );
          })}
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-15 md:py-10">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 grid md:grid-cols-[0.8fr_1.2fr] gap-14">
          <div className="md:sticky md:top-[30vh] self-start">
            <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> FAQ</div>
            <h3 className="serif text-[42px] leading-[0.92] mt-6">Answers for<br />star-struck minds</h3>
            <div className="mt-8 w-fit px-4 py-2.5 rounded-full border border-white/8 mono text-[10px] md:text-[9px] tracking-[0.15em] bg-white/[0.03] backdrop-blur">RECRUITMENTS · OPEN TO ALL MAHE</div>
          </div>
          <div className="divide-y divide-white/8 border-y border-white/8 bg-white/[0.01] rounded-[24px] backdrop-blur-sm">
            {faqs.map((f, i) => (
              <div key={i} className="cursor-pointer px-6 md:px-8 py-6 hover:bg-white/[0.02] transition" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div className="flex justify-between items-center gap-6">
                  <div className="text-[17px] md:text-[19px] leading-[1.2] font-medium tracking-tight">{f.q}</div>
                  <div data-cursor={faqOpen === i ? "CLOSE" : "OPEN"} className={`w-9 h-9 rounded-full border grid place-items-center shrink-0 transition-all duration-300 ${faqOpen === i ? "bg-white text-black border-white rotate-[135deg]" : "border-white/10 bg-white/[0.04]"}`}>+</div>
                </div>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${faqOpen === i ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"}`}>
                  <div className="overflow-hidden"><p className="mono text-[13px] leading-[1.7] max-w-[58ch] opacity-65">{f.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-[66px] relative z-10 border-t border-white/5 bg-[#03050c]">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
            <div>
              <div className="inline-flex mono text-[10px] md:text-[9px] tracking-[0.25em] px-3.5 py-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/5 text-emerald-300">● WE'RE UNDER THE SAME SKY</div>
              <h3 className="serif text-[56px] md:text-[88px] leading-[0.85] mt-8">Reach for<br />the stars.</h3>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {socialLinks.map((s: any) => (
                  <a data-cursor="FOLLOW" key={s.k} href={s.href} target="_blank" className="group flex items-center gap-2.5 h-[46px] px-5 rounded-full border border-white/8 bg-white/[0.03] hover:bg-white hover:text-black transition duration-300">
                    <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/10 grid place-items-center transition">{Icons[s.k as keyof typeof Icons]({ className: "w-[15px] h-[15px]" })}</span>
                    <span className="mono text-[11px] md:text-[10px] tracking-[0.15em]">{s.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-16 grid md:grid-cols-3 gap-5 mono text-[13px] leading-[1.6]">
                {[
                  { title: "ADDRESS", content: ["Manipal Institute of Technology,", "Eshwar Nagar, Manipal,", "Karnataka 576104, India"] },
                  { title: "HOURS", content: ["Stargazing: Fri & Sat 7pm+", "Planetarium: Sundays"] },
                  { title: "COORDINATES", content: ["13.3525° N, 74.7925° E", "Elev: 73m ASL", "Bortle: 5 - Suburban sky"] },
                ].map((sec) => (
                  <div key={sec.title} className="bg-white/[0.02] rounded-[16px] p-5 border border-white/5">
                    <div className="tracking-[0.2em] opacity-40 mb-2">{sec.title}</div>
                    {sec.content.map((l, i) => <div key={i} className="opacity-70">{l}</div>)}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-[#0b0e1a] p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-start">
                <div className="mono text-[10px] tracking-[0.2em] opacity-50">SEND A SIGNAL</div>
                <div className="mono text-[9px] tracking-[0.1em] px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/15">RESPONSE ~ 2.4H</div>
              </div>
              <form className="mt-8 grid gap-4.5" onSubmit={handleSubmit}>
                {/* spam honeypot: leave hidden */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="grid gap-1.5"><span className="mono text-[11px] md:text-[9px] tracking-[0.15em] opacity-50 md:opacity-40">YOUR NAME</span><input required name="name" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[16px] md:text-[12px] outline-none focus:border-white/25 transition" placeholder="Carl Sagan" /></label>
                  <label className="grid gap-1.5"><span className="mono text-[11px] md:text-[9px] tracking-[0.15em] opacity-50 md:opacity-40">EMAIL</span><input required type="email" name="email" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[16px] md:text-[12px] outline-none focus:border-white/25 transition" placeholder="you@manipal.edu" /></label>
                </div>
                <label className="grid gap-1.5"><span className="mono text-[11px] md:text-[9px] tracking-[0.15em] opacity-50 md:opacity-40">INTEREST</span>
                  <select name="interest" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[16px] md:text-[12px] outline-none">
                    <option>Stargazing Nights</option><option>Research Assistance</option><option>Astrophotography</option><option>Telescope Build</option><option>Content / Outreach</option><option>Others</option>
                  </select>
                </label>
                <label className="grid gap-1.5"><span className="mono text-[11px] md:text-[9px] tracking-[0.15em] opacity-50 md:opacity-40">MESSAGE</span><textarea required name="message" rows={4} className="rounded-[20px] bg-[#060812] border border-white/10 p-5 mono text-[16px] md:text-[12px] outline-none focus:border-white/25 transition resize-none" placeholder="Tell us why you look up at night..." /></label>

                <Magnetic data-cursor="SEND" disabled={status === "sending"} className="mt-1 h-[50px] rounded-full bg-white text-black mono text-[11px] tracking-[0.15em] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-60">
                  {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
                </Magnetic>

                {status === "sent" && <div className="mono text-[10px] tracking-[0.1em] text-center text-emerald-300">Signal received! We'll get back to you soon.</div>}
                {status === "error" && <div className="mono text-[10px] tracking-[0.1em] text-center text-red-300">Something went wrong. Please try again or email us directly.</div>}
                {status !== "sent" && status !== "error" && <div className="mono text-[9px] tracking-[0.1em] opacity-30 text-center">We respect your inbox. No spam, only cosmos.</div>}
              </form>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 mono text-[11px] md:text-[9px] tracking-[0.2em] opacity-40 md:opacity-60">
            <div>© {new Date().getFullYear()} THE ASTRONOMY CLUB, MANIPAL, MIT</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1"> 
              Made with ❤️ by<a href="https://www.instagram.com/pxlbyt/" target="_blank" rel="noopener noreferrer" data-cursor="pxlbyt" className="py-2">Siddharth. S</a>
              <a href="https://www.linkedin.com/in/khushiagarwl/" target="_blank" rel="noopener noreferrer" data-cursor="Khushi" className="py-2">Khushi Agarwal</a>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {current && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-[24px] p-3 md:p-10 flex items-start md:items-center justify-center overflow-y-auto" onClick={() => setLightbox(null)}>
          <div className="max-w-[1100px] w-full grid md:grid-cols-[1.2fr_0.8fr] bg-[#0b0e1a] rounded-[24px] border border-[#8fb8ff]/85 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] my-auto" onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // swipe left = next, right = previous
              touchX.current = null;
            }}>
            <img src={current.src} alt={current.title} className="w-full h-[48vh] md:h-[82vh] object-contain bg-black" />
            <div className="p-5 md:p-8 flex flex-col justify-between">
              <div>
                <div className="mono text-[10px] md:text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white text-black inline-block">{current.cat}</div>
                <h4 className="serif text-[28px] md:text-[34px] leading-[0.95] mt-6">{current.title}</h4>
                <div className="mono text-[10px] opacity-40 mt-3">{current.date}</div>
                {current.content && (
                  <p className="mono text-[12px] leading-[1.7] opacity-55 mt-6 whitespace-pre-line">{current.content}</p>
                )}
              </div>
              <div className="mt-6 md:mt-8 flex items-center gap-3">
                <button data-cursor="PREV" onClick={() => go(-1)} className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-black transition grid place-items-center">←</button>
                <button data-cursor="NEXT" onClick={() => go(1)} className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-black transition grid place-items-center">→</button>
                <span className="mono text-[10px] tracking-[0.15em] opacity-40">{(lightbox ?? 0) + 1} / {filtered.length}</span>
                <button data-cursor="CLOSE" onClick={() => setLightbox(null)} className="ml-auto h-11 px-6 rounded-full bg-white text-black mono text-[10px] tracking-[0.15em]">CLOSE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}