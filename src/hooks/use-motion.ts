import { useEffect } from "react";

/**
 * Scroll animations for the home page.
 *
 * The style is chosen with `data-anim` on <html> (CSS lives in index.css):
 *  - fade   – text and images rise softly into place
 *  - blur   – content sharpens out of a soft blur
 *  - wipe   – handwritten titles are "written" right-to-left, photos open like a curtain
 *  - flow   – one continuous background that changes colour between sections + photo parallax
 *  - stack  – each section slides over the previous one like a stack of cards
 */
export type MotionStyle = "fade" | "blur" | "wipe" | "flow" | "stack";

/** The style used on the live site. */
export const MOTION_STYLE: MotionStyle = "fade";

export const MOTION_EVENT = "motion:change";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupReveal(): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  els.forEach((el) => {
    el.classList.remove("is-visible");
    el.style.removeProperty("--d");
  });
  if (reduced() || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      // stagger the elements that enter together, in reading order
      entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${Math.min(i, 6) * 90}ms`);
          el.classList.add("is-visible");
          io.unobserve(el);
        });
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function sections() {
  return Array.from(document.querySelectorAll<HTMLElement>("main > section"));
}

/** flow: sections become transparent and <main> takes the colour of the section in view. */
function setupFlow(): () => void {
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return () => {};
  const secs = sections();
  secs.forEach((s) => (s.dataset.bg = getComputedStyle(s).backgroundColor));
  document.documentElement.classList.add("flow-ready");
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) main.style.backgroundColor = (e.target as HTMLElement).dataset.bg ?? "";
      }),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  secs.forEach((s) => io.observe(s));

  const imgs = Array.from(document.querySelectorAll<HTMLElement>(".reveal-img img, [data-parallax]"));
  let raf = 0;
  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    imgs.forEach((img) => {
      const r = img.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = (r.top + r.height / 2 - vh / 2) * -0.08;
      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.08)`;
    });
  };
  const onScroll = () => (raf ||= requestAnimationFrame(tick));
  if (!reduced()) {
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(raf);
    document.documentElement.classList.remove("flow-ready");
    main.style.backgroundColor = "";
    imgs.forEach((img) => (img.style.transform = ""));
  };
}

/** Composites a translucent rgba() colour over the page background so a card hides what is beneath it. */
function opaque(color: string, under: string): string {
  const n = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
  const [r, g, b, a = 1] = n(color);
  const [R, G, B] = n(under);
  if (a >= 1 || R === undefined) return color;
  const mix = (x: number, y: number) => Math.round(x * a + y * (1 - a));
  return `rgb(${mix(r, R)}, ${mix(g, G)}, ${mix(b, B)})`;
}

/** stack: sticky sections; a tall section sticks by its bottom edge so all its content is seen. */
function setupStack(): () => void {
  const secs = sections();
  const pageBg = getComputedStyle(document.body).backgroundColor;
  secs.forEach((s) => {
    if (s.id !== "top") s.style.backgroundColor = opaque(getComputedStyle(s).backgroundColor, pageBg);
  });
  const place = () =>
    secs.forEach((s, i) => {
      s.style.top = `${Math.min(0, window.innerHeight - s.offsetHeight)}px`;
      s.style.zIndex = String(i + 1);
    });
  place();
  window.addEventListener("resize", place);
  const ro = new ResizeObserver(place);
  secs.forEach((s) => ro.observe(s));
  return () => {
    window.removeEventListener("resize", place);
    ro.disconnect();
    secs.forEach((s) => {
      s.style.top = "";
      s.style.zIndex = "";
      s.style.backgroundColor = "";
    });
  };
}

export function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.anim) root.dataset.anim = MOTION_STYLE;

    let cleanup: Array<() => void> = [];
    const start = () => {
      cleanup.forEach((c) => c());
      cleanup = [setupReveal()];
      const style = root.dataset.anim as MotionStyle;
      if (style === "flow") cleanup.push(setupFlow());
      if (style === "stack" && !reduced()) cleanup.push(setupStack());
    };
    start();
    window.addEventListener(MOTION_EVENT, start);
    return () => {
      window.removeEventListener(MOTION_EVENT, start);
      cleanup.forEach((c) => c());
    };
  }, []);
}
