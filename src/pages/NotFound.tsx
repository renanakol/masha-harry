import { Navigate } from "react-router-dom";

// Unknown URLs (e.g. old WordPress links) go back to the home page.
export default function NotFound() {
  return <Navigate to="/" replace />;
}
