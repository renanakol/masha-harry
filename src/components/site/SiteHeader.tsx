import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ home = true }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (h: string) => (home ? h : `/${h}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open || !home
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" aria-label="Masha Harry – דף הבית" className="shrink-0">
          <img src="/img/logo.png" alt="Masha Harry Coaching | From Passion to Action" className="h-10 w-auto md:h-12" width={700} height={375} />
        </Link>

        <nav aria-label="ניווט ראשי" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            {nav.slice(0, -1).map((item) => (
              <li key={item.href}>
                <a href={href(item.href)} className="relative py-2 text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={href("#contact")}>דברו איתי</a>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted lg:hidden"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="ניווט נייד" className="border-t border-border/60 bg-background lg:hidden">
          <ul className="container flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={href(item.href)} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
