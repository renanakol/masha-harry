import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import { legalRoutes } from "@/content/site";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path={legalRoutes.accessibility} element={<LegalPage doc="accessibility" />} />
      <Route path={legalRoutes.privacy} element={<LegalPage doc="privacy" />} />
      <Route path={legalRoutes.terms} element={<LegalPage doc="terms" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
