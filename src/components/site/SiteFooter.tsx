import { Link } from "react-router-dom";
import { footer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-8 text-sm text-muted-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <img src="/img/logo.png" alt="Masha Harry" className="h-10 w-auto opacity-80" width={700} height={375} loading="lazy" />
        <nav aria-label="קישורים משפטיים">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <li>{footer.credit}</li>
            {footer.links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-foreground hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
