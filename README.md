# Masha Harry Coaching – אתר

גרסה מחודשת של masharry-coaching.co.il, שהועבר מוורדפרס (Elementor) ל-React.

**סטאק:** React + Vite + TypeScript + Tailwind + shadcn/ui, אותו סטאק שלאבבל עובד איתו.

## הרצה מקומית
```bash
npm install
npm run dev
```

## מבנה
- `src/content/site.ts` – כל הטקסטים של דף הבית (הועברו 1:1 מהאתר המקורי)
- `src/content/legal.ts` – הצהרת נגישות, מדיניות פרטיות, תנאי שימוש
- `src/components/site/` – רכיבי האתר (Header, Hero, Sections, Contact, Footer, Cookie banner)
- `src/components/ui/` – רכיבי shadcn/ui
- `src/index.css` – צבעי המותג כמשתני HSL
- `public/img`, `public/fonts` – תמונות ופונט כתב היד
- `reference/` – חומר מהאתר המקורי (טקסטים וצילומי מסך), לא חלק מהאפליקציה
- `preview/`, `preview.html`, `vite.preview.config.ts` – בניית קובץ תצוגה מקדימה יחיד, לא חלק מהאפליקציה

## סטטוס
בשלב שיפור עיצוב וטקסטים. עדיין לא הועבר ללאבבל.

**לפני העלאה לאוויר:** לחבר את הטופס (`src/lib/contact.ts`) לשמירה במסד נתונים ולשליחת מייל.
