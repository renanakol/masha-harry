import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Globe, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "./BrandIcons";
import { contact, contactSection as c, legalRoutes } from "@/content/site";
import { submitContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "./SectionTitle";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
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
      setStatus("error");
    }
  }

  const details = [
    { icon: Globe, label: contact.site, href: "/" },
    { icon: Phone, label: contact.phone, href: contact.phoneHref, ltr: true },
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}`, ltr: true },
    { icon: MapPin, label: contact.location },
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
              <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-sage-deep" aria-hidden />
                <p className="text-xl font-semibold">תודה! ההודעה נשלחה</p>
                <p className="text-muted-foreground">אחזור אליך בהקדם.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3" noValidate={false}>
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
                    <Checkbox
                      id="cf-consent"
                      checked={consent}
                      onCheckedChange={(v) => {
                        setConsent(v === true);
                        setConsentError(false);
                      }}
                      aria-invalid={consentError}
                      aria-describedby={consentError ? "cf-consent-err" : undefined}
                    />
                    <Label htmlFor="cf-consent" className="font-normal">
                      {c.consent}{" "}
                      <Link to={legalRoutes.privacy} className="underline underline-offset-2 hover:text-primary">
                        {c.consentLink}
                      </Link>
                    </Label>
                  </div>
                  {consentError && (
                    <p id="cf-consent-err" className="mt-2 text-sm text-red-700">
                      יש לאשר את מדיניות הפרטיות לפני השליחה
                    </p>
                  )}
                </div>
                <Button type="submit" size="lg" className="sm:col-span-3" disabled={status === "sending"}>
                  {status === "sending" && <Loader2 className="animate-spin" />}
                  {c.submit}
                </Button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-red-700 sm:col-span-3">
                    משהו השתבש. אפשר לנסות שוב או לכתוב לי בוואטסאפ.
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="reveal mt-8 grid gap-8 sm:grid-cols-2">
            <ul className="space-y-3 text-[16px]">
              {details.map(({ icon: Icon, label, href, ltr }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
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
              <p className="font-hand text-3xl" dir="ltr">{c.social}</p>
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
                      <Icon className="h-5 w-5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -inset-3 -z-0 -rotate-3 rounded-[2.5rem] bg-blush/50" />
          <img src="/img/contact.webp" alt="מאשה מחייכת" width={768} height={1152} loading="lazy" className="relative aspect-[3/4] w-full rounded-[2rem] object-cover shadow-xl" />
        </div>
      </div>
    </section>
  );
}
