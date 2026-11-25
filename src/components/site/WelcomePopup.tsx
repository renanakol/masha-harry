import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { contact, popup } from "@/content/site";
import { WhatsappIcon } from "./BrandIcons";

const KEY = "welcome-popup-seen";

/** Same behaviour as the original Elementor popup: opens 5s after page load, once per visit. */
export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center bg-foreground/30 p-4 animate-in fade-in" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-peach p-8 text-center shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="סגירה"
          className="absolute left-4 top-4 rounded-full p-1.5 text-foreground/60 hover:bg-background/60 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <img src="/favicon.png" alt="" aria-hidden width={300} height={300} className="mx-auto h-14 w-14" />
        <h2 id="popup-title" className="mt-4 font-hand text-4xl leading-tight">
          {popup.title}
        </h2>
        <p className="mt-3 text-lg text-foreground/80">{popup.text}</p>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 font-hand text-2xl text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <WhatsappIcon className="h-5 w-5" />
          {popup.cta}
        </a>
      </div>
    </div>
  );
}
