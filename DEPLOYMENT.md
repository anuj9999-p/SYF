# Deploying and editing SYF — Ship Your Future

This is a React 19 + TypeScript + Vite single-page app, using TanStack
Router for structure and Tailwind CSS v4 for styling. It ships as a static
site: the contact form talks to Supabase directly from the browser, so
there is no required backend server.

A note on architecture, up front: the original brief asked for TanStack
**Start** (with SSR and a server route at
`src/routes/api/public/contact.ts`). This build uses TanStack **Router**
as a client-rendered SPA instead, with the contact form inserting into
Supabase using the public anon key, locked down by Row Level Security to
INSERT-only (see `supabase/schema.sql`). That's a standard, secure pattern
for a public contact form and needed nothing else running. The file at
`src/routes/api/public/contact.ts` is kept as a **reference
implementation** of the same endpoint as a real serverless function, for
if you'd rather keep Supabase credentials off the client, add rate
limiting, or migrate to TanStack Start later — see "Optional: server-side
contact API" below.

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Set environment variables

Copy the example file:

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Both values are public by design (the anon key is meant to be shipped to
the browser) — safety comes from the RLS policy in `supabase/schema.sql`,
not from hiding this key. Never put the Supabase **service role** key in
a `VITE_`-prefixed variable; it would be exposed to every visitor.

Without these variables set, the site still builds and runs — the contact
form will show a friendly error asking people to email you directly
instead of silently failing.

## 4. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run the contents of `supabase/schema.sql`. This
   creates the `contact_inquiries` table and its Row Level Security
   policies in one step — there's no separate migration to run.
3. Copy your project URL and `anon` public key from
   Project Settings → API into `.env`.
4. To read submissions, use the Supabase dashboard's Table Editor, or
   query as an authenticated service — the anon key cannot read rows by
   design (no `SELECT` grant or policy exists for it).

If you ever need to change the shape of `contact_inquiries`, edit
`supabase/schema.sql` and re-run it — the `create table if not exists`
and `drop policy if exists` guards make it safe to run again.

## 5. Type-check and build

```bash
npm run build
```

This runs `tsc -b` (type-check) followed by `vite build`. Output goes to
`dist/`.

```bash
npm run preview
```

Serves the production build locally to sanity-check it before deploying.

## 6. Deploy the frontend

This is a static build (`dist/`), so any static host works. Two good
options:

**Vercel**
1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Vite. Build command `npm run build`, output
   directory `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under
   Project Settings → Environment Variables.

**Netlify**
1. New site from Git at [app.netlify.com](https://app.netlify.com).
2. Build command `npm run build`, publish directory `dist`.
3. Add the same two environment variables under
   Site configuration → Environment variables.

Cloudflare Pages and Render work the same way (Vite static build, same
two env vars).

## 7. Optional: server-side contact API

If you want the contact form to go through a server instead of calling
Supabase directly, use `src/routes/api/public/contact.ts` as your
starting point. It validates with the same Zod schema the client uses,
checks the honeypot field, and inserts using the Supabase **service
role** key (server-only — never exposed to the browser).

Where to put it depends on your host, since this project doesn't run a
Node server itself:

- **Vercel**: copy it to `/api/contact.ts` at the repo root (Vercel's own
  serverless function convention) and point the contact form at
  `/api/contact` instead of calling Supabase directly.
- **Netlify**: copy it to `/netlify/functions/contact.ts` and adjust the
  handler signature to Netlify's format.
- **Cloudflare**: adapt the `POST` handler into a Worker `fetch` handler.
- **Full TanStack Start**: if you migrate this project to Start, this
  file's logic maps directly onto a Start server route at the same path.

Whichever route you take, set these as **server-only** environment
variables (no `VITE_` prefix, so Vite never bundles them into client
code):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 8. Editing content

Almost everything on the site — copy, services, industries, projects,
process steps, contact details, SEO text — lives in one file:

```
src/lib/site-config.ts
```

Edit the values there and the whole site updates; you shouldn't need to
touch individual components for a copy or content change.

## 9. Editing images

The four project cover images are original SVG illustrations in
`src/assets/projects/`. Replace them with your own SVGs or photos (update
the `import` paths and `imageAlt` text in `site-config.ts` to match). Keep
new images reasonably sized and always fill in descriptive `alt` text —
the Work section lazy-loads them and expects fixed `width`/`height` to
avoid layout shift.

## 10. Editing colors and type

Design tokens live at the top of `src/styles.css`, inside `:root` and the
Tailwind `@theme` block — `--cream`, `--paper`, `--ink`, `--lime`,
`--rust`, `--cobalt`, and `--radius`. Change a value there and it updates
everywhere the corresponding Tailwind class (`bg-cream`, `text-rust`,
`ring-cobalt`, etc.) is used. Fonts (Manrope for display, DM Sans for
body) are loaded via `<link>` tags in `index.html` and mapped to
`--font-display` / `--font-body` in the same `@theme` block.

## 11. Connecting inquiries to email

Supabase doesn't send email on its own. Two straightforward options once
you're ready:

- **Supabase Database Webhook**: on `contact_inquiries` inserts, trigger a
  webhook to a service like Resend, Postmark, or a small serverless
  function that emails `syf.builds@gmail.com`.
- **Edge Function**: write a Supabase Edge Function that runs after
  insert and calls your email provider's API directly.

## 12. Securing environment variables

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are meant to be public —
  don't worry about them appearing in the built JavaScript bundle.
- `SUPABASE_SERVICE_ROLE_KEY` (only relevant if you build the optional
  server API) must **never** be prefixed with `VITE_`, committed to git,
  or referenced from any client-side file. Set it only in your hosting
  platform's server-side environment variable settings.
- `.env` is already listed in `.gitignore`.
