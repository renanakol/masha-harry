import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-peach/60 p-6 text-center">
      <h1 className="font-hand text-6xl">404</h1>
      <p className="text-lg">העמוד שחיפשת לא נמצא.</p>
      <Button asChild>
        <Link to="/">חזרה לדף הבית</Link>
      </Button>
    </main>
  );
}
