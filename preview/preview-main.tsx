// Preview-only entry (not part of the Lovable project): MemoryRouter so the
// single-file HTML works when opened from disk or any URL.
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <ScrollToTop />
    <AppRoutes />
  </MemoryRouter>
);
