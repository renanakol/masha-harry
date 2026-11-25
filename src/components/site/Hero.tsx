import { noOrphan } from "@/lib/typography";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Hero – kept as on the original site: full-screen garden photo,
 * testimonials carousel in a white box on the right, name and dots below it.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(t);
  }, [paused, go]);

  return (
    <section
      id="top"
      aria-label="המלצות"
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden md:items-center"
    >
      <img
        src="/img/hero.webp"
        alt=""
        aria-hidden
        width={964}
        height={768}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[30%_center] md:object-center"
      />
      {/* light veil so the quote stays readable on small screens */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 via-transparent to-transparent md:hidden" />

      <div className="container flex justify-start pb-10 pt-24 md:pb-0 md:pt-20">
        <div
          className="relative w-full md:w-[46%] lg:w-[38%]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="ההמלצה הקודמת"
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 translate-x-full rounded-full p-2 text-foreground/40 transition-colors hover:text-foreground md:block"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="ההמלצה הבאה"
            className="absolute -left-2 top-1/2 z-10 hidden -translate-x-full -translate-y-1/2 rounded-full p-2 text-foreground/40 transition-colors hover:text-foreground md:block"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="grid">
            {testimonials.map((t, idx) => (
              <figure
                key={t.name}
                aria-hidden={idx !== i}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-700",
                  idx === i ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <blockquote className="rounded-sm bg-background/90 px-6 py-6 text-center text-[clamp(1.25rem,2.1vw,1.875rem)] italic leading-[1.5] text-foreground shadow-sm backdrop-blur-sm md:px-8">
                  "{noOrphan(t.quote)}"
                </blockquote>
                <figcaption className="mt-6 text-center text-lg font-semibold text-foreground">{t.name}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`המלצה ${idx + 1}`}
                aria-current={idx === i}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  idx === i ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
