import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { AboutSection, IncludesSection, ProcessSection, TopicsSection } from "@/components/site/Sections";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieBanner } from "@/components/site/CookieBanner";
import { WelcomePopup } from "@/components/site/WelcomePopup";
import { useReveal } from "@/hooks/use-reveal";

export default function Index() {
  useReveal();
  return (
    <div className="min-h-[100dvh] overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow">
        דילוג לתוכן
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProcessSection />
        <IncludesSection />
        <AboutSection />
        <TopicsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CookieBanner />
      <WelcomePopup />
    </div>
  );
}
