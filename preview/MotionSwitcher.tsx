// Preview-only: floating panel to compare scroll-animation styles. Not part of the site.
import { useState } from "react";
import { MOTION_EVENT, type MotionStyle } from "@/hooks/use-motion";

const options: { id: MotionStyle; name: string; desc: string }[] = [
  { id: "fade", name: "1 · עלייה רכה", desc: "טקסט ותמונות עולים בעדינות למקום" },
  { id: "blur", name: "2 · מטושטש לחד", desc: "התוכן מתחדד מתוך טשטוש רך" },
  { id: "wipe", name: "3 · כתב יד ווילון", desc: "הכותרות ״נכתבות״, התמונות נפתחות כמו וילון" },
  { id: "flow", name: "4 · צבע זורם", desc: "רקע אחד שמשנה צבע בין החלקים + תמונות בעומק" },
  { id: "stack", name: "5 · קלפים נערמים", desc: "כל חלק מחליק מעל הקודם" },
];

export function MotionSwitcher() {
  const [active, setActive] = useState<MotionStyle>((document.documentElement.dataset.anim as MotionStyle) || "fade");
  const [open, setOpen] = useState(true);

  const choose = (id: MotionStyle) => {
    document.documentElement.dataset.anim = id;
    setActive(id);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() => window.dispatchEvent(new Event(MOTION_EVENT)));
  };

  const box: React.CSSProperties = {
    position: "fixed", left: 12, bottom: 12, zIndex: 80, width: open ? 270 : "auto",
    background: "rgba(255,251,247,.97)", border: "1px solid #e9d6cb", borderRadius: 18,
    boxShadow: "0 18px 50px -20px rgba(0,0,0,.45)", fontFamily: "Heebo, sans-serif", direction: "rtl",
    padding: open ? 12 : 0, color: "#33291f",
  };
  if (!open)
    return (
      <div style={box}>
        <button onClick={() => setOpen(true)} style={{ padding: "10px 16px", border: 0, background: "transparent", fontWeight: 700, cursor: "pointer" }}>
          🎬 {options.find((o) => o.id === active)?.name} · החלפה
        </button>
      </div>
    );
  return (
    <div style={box} role="region" aria-label="בחירת סגנון אנימציה (תצוגה מקדימה בלבד)">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong style={{ fontSize: 14 }}>🎬 בחרי סגנון וגללי למטה</strong>
        <button onClick={() => setOpen(false)} aria-label="מזעור" style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: 18 }}>–</button>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => choose(o.id)}
            aria-pressed={active === o.id}
            style={{
              textAlign: "right", cursor: "pointer", borderRadius: 12, padding: "8px 10px",
              border: active === o.id ? "2px solid #E8736A" : "1px solid #eadbd2",
              background: active === o.id ? "#FCE6DA" : "#fff", color: "#33291f",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>{o.name}</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>{o.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
