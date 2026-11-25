import { useEffect } from "react";
import { legal } from "@/content/legal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function LegalPage({ doc }: { doc: keyof typeof legal }) {
  const page = legal[doc];
  useEffect(() => {
    document.title = `${page.title} - Masha Harry`;
  }, [page.title]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader home={false} />
      <main id="main" className="flex-1 bg-gradient-to-b from-peach/60 to-background pb-20 pt-28 md:pt-36">
        <article className="container max-w-3xl">
          <h1 className="font-hand text-[clamp(2.5rem,6vw,4rem)] leading-tight">{page.title}</h1>
          <div className="mt-8 space-y-4 rounded-[2rem] bg-card p-6 text-[17px] leading-relaxed shadow-sm md:p-10">
            {page.blocks.map((b, i) =>
              b.type === "h" ? (
                <h2 key={i} className="pt-4 text-xl font-semibold first:pt-0">{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i} className="list-disc space-y-1 pr-6">
                  {b.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              )
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
