import { noOrphan } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function SectionTitle({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={cn("reveal font-hand text-[clamp(2.5rem,5.5vw,4rem)] leading-tight", className)}>
      {children}
    </h2>
  );
}

export function Lines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <p className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block text-pretty">
          {noOrphan(l)}
        </span>
      ))}
    </p>
  );
}

export function Photo({ src, alt, className, w, h }: { src: string; alt: string; className?: string; w: number; h: number }) {
  return (
    <div className={cn("reveal relative", className)}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-current opacity-40" />
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="relative aspect-[3/4] w-full rounded-[2rem] object-cover shadow-lg" />
    </div>
  );
}
