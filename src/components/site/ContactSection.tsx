import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { EnvelopeIcon, FacebookIcon, GlobeIcon, InstagramIcon, MapMarkerAltIcon, PhoneAltIcon, WhatsappIcon } from "./SiteIcons";
import { contact, contactSection as c, legalRoutes } from "@/content/site";
import { submitContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "./SectionTitle";

type Status = "idle" | "sending" | "sent";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await submitContact({
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        email: String(fd.get("email") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  }

  const details = [
    { icon: GlobeIcon, label: contact.site, href: "/" },
    { icon: PhoneAltIcon, label: contact.phone, href: contact.phoneHref, ltr: true },
    { icon: EnvelopeIcon, label: contact.email, href: `mailto:${contact.email}`, ltr: true },
    { icon: MapMarkerAltIcon, label: contact.location },
  ];
  const socials = [
    { icon: FacebookIcon, label: "Facebook", href: contact.facebook },
    { icon: InstagramIcon, label: "Instagram", href: contact.instagram },
    { icon: WhatsappIcon, label: "Whatsapp", href: contact.whatsapp },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-sand/70 py-20 md:py-28">
      <div className="container grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div>
          <SectionTitle id="contact-title">{c.title}</SectionTitle>

          <div className="reveal mt-8 rounded-[2rem] bg-background p-6 shadow-xl md:p-8">
            {status === "sent" ? (
              <div role="status" aria-label={c.submit} className="flex items-center justify-center py-16">
                <CheckCircle2 className="h-14 w-14 text-sage-deep" aria-hidden />
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="cf-name">{c.fields.name}</Label>
                  <Input id="cf-name" name="name" required autoComplete="name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cf-phone">{c.fields.phone}</Label>
                  <Input id="cf-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" className="text-right" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cf-email">{c.fields.email}</Label>
                  <Input id="cf-email" name="email" type="email" autoComplete="email" dir="ltr" className="text-right" />
                </div>
                <div className="space-y-1.5 sm:col-span-3">
                  <Label htmlFor="cf-message" className="sr-only">{c.fields.message}</Label>
                  <Textarea id="cf-message" name="message" rows={4} placeholder={c.fields.message} />
                </div>
                <div className="sm:col-span-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="cf-consent" name="consent" required />
                    <Label htmlFor="cf-consent" className="font-normal">
                      {c.consent}{" "}
                      <Link to={legalRoutes.privacy} className="underline underline-offset-2 hover:text-primary">
                        {c.consentLink}
                      </Link>
                    </Label>
                  </div>
                </div>
                <Button type="submit" size="lg" className="sm:col-span-3" disabled={status === "sending"}>
                  {status === "sending" && <Loader2 className="animate-spin" />}
                  {c.submit}
                </Button>
              </form>
            )}
          </div>

          <div className="reveal mt-8 grid gap-8 sm:grid-cols-2">
            <ul className="space-y-3 text-[16px]">
              {details.map(({ icon: Icon, label, href, ltr }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  {href ? (
                    <a href={href} dir={ltr ? "ltr" : undefined} className="hover:text-primary">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <p className="whitespace-nowrap font-hand text-3xl" dir="ltr">{c.social}</p>
              <ul className="mt-3 flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="reveal reveal-img relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -inset-3 -z-0 -rotate-3 rounded-[2.5rem] bg-blush/50" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
            <img src="/img/contact.webp" alt="מאשה מחייכת" width={768} height={1152} loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
