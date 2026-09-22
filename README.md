# SYF — Ship Your Future

Marketing website for SYF, an independent digital studio. Built with
React 19, TypeScript, Vite, TanStack Router, and Tailwind CSS v4.

## Quick start

```bash
npm install
cp .env.example .env   # add your Supabase project URL + anon key
npm run dev
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full setup, Supabase
configuration, deployment instructions, and a guide to editing content,
images, and colors.

## Project structure

```
src/
├── assets/projects/     # Original SVG cover artwork for the Work section
├── components/
│   ├── layout/           # Header, mobile menu, footer
│   ├── sections/          # Page sections (hero, services, work, etc.)
│   ├── ui/                # Small reusable primitives (Button, Reveal, ...)
│   └── forms/             # Contact form
├── lib/
│   ├── site-config.ts     # All brand, nav, content, and SEO data
│   ├── validation.ts      # Zod schema for the contact form
│   ├── supabase.ts        # Supabase client
│   └── utilities.ts
├── routes/
│   ├── __root.tsx              # Shell layout (header/outlet/footer)
│   ├── index.tsx                # Home page, assembles all sections
│   └── api/public/contact.ts     # Reference server-side contact handler
├── styles.css                    # Design tokens + Tailwind v4 @theme
└── main.tsx
supabase/
└── schema.sql              # contact_inquiries table + RLS policies
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check (`tsc -b`) and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint
