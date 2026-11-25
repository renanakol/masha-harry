import { Briefcase, Check, Compass, MessageCircle, Sparkles, Users, X } from "lucide-react";
import { about, includes, process, topics } from "@/content/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Lines, Photo, SectionTitle } from "./SectionTitle";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-peach/60 py-20 md:py-28">
      <div className="container grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Photo src="/img/process.webp" alt="מאשה בז'קט בהיר" w={1067} h={1600} className="mx-auto w-full max-w-sm text-rose md:sticky md:top-28" />
        <div className="max-w-[60ch] space-y-6 text-[17px] leading-relaxed md:text-lg">
          <SectionTitle id="process-title">{process.title}</SectionTitle>
          <Lines lines={process.lead} className="reveal text-xl font-semibold leading-snug text-foreground md:text-2xl" />
          {process.paragraphs.map((p, i) => (
            <Lines key={i} lines={p} className="reveal text-foreground/85" />
          ))}

          <div className="reveal rounded-2xl bg-card/80 p-6 shadow-sm md:p-8">
            <Lines lines={process.stepsIntro} className="font-semibold" />
            <ol className="mt-4 space-y-3">
              {process.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <Lines lines={process.more} className="reveal text-foreground/85" />
          <Lines lines={process.closing} className="reveal border-r-4 border-primary pr-5 text-lg font-semibold md:text-xl" />
        </div>
      </div>
    </section>
  );
}

export function IncludesSection() {
  return (
    <section id="includes" aria-labelledby="includes-title" className="bg-rose/80 py-20 md:py-28">
      <div className="container grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div className="reveal rounded-[2rem] bg-background p-6 shadow-xl md:p-10">
          <h2 id="includes-title" className="font-hand text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-primary">
            {includes.title}
          </h2>
          <ul className="mt-6 space-y-4 text-[17px] leading-relaxed">
            {includes.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 rounded-full bg-sage p-0.5 text-white" />
                <span>
                  {it.strong && <strong className="font-semibold">{it.strong}</strong>}
                  {it.rest}
                  {it.strongEnd && <strong className="font-semibold">{it.strongEnd}</strong>}
                </span>
              </li>
            ))}
          </ul>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="not" className="rounded-2xl border border-border bg-muted/60 px-5">
              <AccordionTrigger className="font-hand text-2xl text-foreground hover:no-underline md:text-3xl">
                {includes.notTitle}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 text-[16px] leading-relaxed">
                  {includes.notItems.map((it, i) => (
                    <li key={i} className="flex gap-3">
                      <X aria-hidden className="mt-1 h-5 w-5 shrink-0 rounded-full bg-coral/80 p-0.5 text-white" />
                      <span>
                        <strong className="font-semibold">{it.strong}</strong> {it.rest}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Photo src="/img/includes.webp" alt="מאשה יושבת עם מחשב נייד" w={1066} h={1600} className="mx-auto w-full max-w-sm text-background" />
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-sage/80 py-20 md:py-28">
      <div className="container grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Photo src="/img/about.webp" alt="מאשה בז'קט ירוק" w={768} h={1152} className="mx-auto w-full max-w-sm text-background md:sticky md:top-28" />
        <div className="max-w-[60ch] space-y-5 text-[17px] leading-relaxed text-accent-foreground md:text-lg">
          <SectionTitle id="about-title">{about.title}</SectionTitle>
          <p className="reveal text-2xl font-semibold">{about.hello}</p>
          {about.paragraphs.map((p, i) => (
            <Lines key={i} lines={p} className="reveal" />
          ))}
          <p className="reveal">
            {about.choice[0]}
            <br />
            {about.choice[1]} <strong className="font-semibold">{about.choiceStrong}</strong>
          </p>
          <Lines lines={about.sides} className="reveal" />
          <Lines lines={about.living} className="reveal font-semibold" />

          <div className="reveal rounded-2xl bg-background/80 p-6 md:p-8">
            <p className="font-semibold">{about.dealTitle}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.deal.map((d) => (
                <li key={d} className="rounded-full bg-sage/30 px-4 py-2 text-[15px] font-medium">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4">{about.dealEnd}</p>
          </div>

          <Button asChild size="lg" className="reveal bg-sage-deep text-white hover:bg-sage-deep/90">
            <a href="#contact">
              <MessageCircle /> {about.cta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const topicIcons = { career: Briefcase, personal: Sparkles, managers: Users } as const;

export function TopicsSection() {
  return (
    <section id="topics" aria-labelledby="topics-title" className="bg-muted/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-[60ch] text-center text-[17px] leading-relaxed md:text-lg">
          <SectionTitle id="topics-title">{topics.title}</SectionTitle>
          <p className="reveal mt-6">
            {topics.intro[0]}
            <br />
            <strong className="font-semibold">{topics.whisper}</strong>
          </p>
          <Lines lines={topics.signs} className="reveal mt-5 text-foreground/85" />
          <p className="reveal mt-5">{topics.crossroads}</p>
          <p className="reveal mt-10 flex items-center justify-center gap-2 text-2xl font-semibold md:text-3xl">
            <Compass aria-hidden className="h-7 w-7 text-primary" />
            {topics.question}
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {topics.cards.map((c) => {
            const Icon = topicIcons[c.key as keyof typeof topicIcons];
            return (
              <li key={c.key} className="reveal group rounded-[1.75rem] border border-border/70 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-hand text-3xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{c.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="reveal mx-auto mt-14 max-w-3xl rounded-[1.75rem] bg-sage/40 p-8 text-center text-lg leading-relaxed md:p-10 md:text-xl">
          <p className="font-semibold">{topics.quote[0]}</p>
          <Lines lines={topics.quoteRest} className="mt-3" />
        </div>
      </div>
    </section>
  );
}
