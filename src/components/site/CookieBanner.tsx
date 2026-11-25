import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cookie, legalRoutes } from "@/content/site";
import { Button } from "@/components/ui/button";

const KEY = "cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (v: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="הסכמה לקוקיז" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl animate-fade-up rounded-2xl border border-border bg-card p-4 shadow-2xl md:flex md:items-center md:gap-6 md:p-5">
      <p className="text-sm leading-relaxed">
        {cookie.text}
        <Link to={legalRoutes.privacy} className="underline underline-offset-2">
          {cookie.link}
        </Link>
        {cookie.textEnd}
      </p>
      <div className="mt-3 flex shrink-0 gap-2 md:mt-0">
        <Button size="sm" onClick={() => choose("accepted")} className="bg-sage-deep text-white hover:bg-sage-deep/90">
          {cookie.accept}
        </Button>
        <Button size="sm" variant="outline" onClick={() => choose("declined")}>
          {cookie.decline}
        </Button>
      </div>
    </div>
  );
}
