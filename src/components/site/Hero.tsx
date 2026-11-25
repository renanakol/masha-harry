import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(t);
  }, [paused, go]);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-to-b from-peach/70 via-background to-background pt-24 md:pt-28">
      {/* soft decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-blush/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-sage/25 blur-3xl" />

      <div className="container grid items-center gap-10 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:pb-24">
        {/* Text */}
        <div className="animate-fade-up">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-sage-deep" dir="ltr">
            COACHING | FROM PASSION TO ACTION
          </p>
          <h1 className="font-hand text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.05] text-foreground">
            מתשוקה <span className="text-primary">לפעולה</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            אימון קריירה, העצמה אישית ואימון מנהלים – בזום או בקליניקה ביקנעם.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#contact">דברו איתי</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#process">על התהליך</a>
            </Button>
          </div>

          {/* Testimonials carousel */}
          <figure
            className="relative mt-12 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-[0_20px_60px_-30px_hsl(var(--rose)/0.6)] backdrop-blur md:p-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="המלצות"
          >
            <Quote aria-hidden className="absolute -top-4 right-6 h-8 w-8 rounded-full bg-primary p-1.5 text-primary-foreground" />
            <div className="grid">
              {testimonials.map((t, idx) => (
                <div
                  key={t.name}
                  className={cn(
                    "col-start-1 row-start-1 transition-all duration-700",
                    idx === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                  )}
                  aria-hidden={idx !== i}
                >
                  <blockquote className="text-[17px] leading-relaxed text-foreground/90 md:text-lg">"{t.quote}"</blockquote>
                  <figcaption className="mt-4 font-semibold text-sage-deep">— {t.name}</figcaption>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`המלצה ${idx + 1}`}
                    aria-current={idx === i}
                    className={cn("h-2 rounded-full transition-all", idx === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-rose")}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <Button type="button" variant="ghost" size="icon" onClick={() => go(-1)} aria-label="ההמלצה הקודמת">
                  <ChevronRight />
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => go(1)} aria-label="ההמלצה הבאה">
                  <ChevronLeft />
                </Button>
              </div>
            </div>
          </figure>
        </div>

        {/* Photo */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2.5rem] bg-blush/40" aria-hidden />
          <img
            src="/img/portrait.webp"
            alt="מאשה הארי, מאמנת אישית"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-xl"
            width={621}
            height={1000}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
