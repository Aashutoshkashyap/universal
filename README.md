# UESC website refresh

Modern, accessible landing-page refresh for Universal Engineering & Science College (UESC), built with Next.js, TypeScript, and Tailwind CSS.

The page keeps the approved section layout while using authentic supplied UESC imagery, official college contact details, Pokhara University affiliation, performance-oriented local assets, and a secure Supabase-backed content manager.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run check
npm run start
```

With the production server running on port 3000, the local audits are:

```bash
npm run lighthouse
npm run lighthouse:desktop
npm run lighthouse:agentic
```

The repository also includes SEO metadata, a sitemap, crawler guidance, structured college data, and an `llms.txt` summary.

## Website administration

The administrator sign-in is available at `/admin`. Access uses Supabase Auth; there is no hardcoded password or client-readable privileged key.

The editor controls:

- site identity, navigation, contact details, calls to action, links, images, icons, and list order;
- every homepage section, item visibility, and the approved section order;
- SEO metadata, social previews, structured college data, `robots.txt`, `sitemap.xml`, and `llms.txt`.

The visual component structure, responsive breakpoints, and approved layout remain code-owned. For a new Supabase project, apply the SQL migration in `supabase/migrations/20260723152500_secure_site_content.sql`, then create an Auth user with `app_metadata.role` set to `admin`.

Required production variables are:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SECRET_KEY` for server-only content reads, verified content writes, and database keepalive

The browser never receives `SUPABASE_SECRET_KEY`, and public content is read server-side rather than exposing database access to visitors. Content writes are checked by the server against a fresh authenticated administrator, validated against the typed content schema, restricted to same-origin requests, and only then performed by a server-only client. The included Supabase migration denies direct table access to browser roles so the validated server API remains the only content-management path.

## Database keepalive

The production deployment registers a Vercel Cron Job at `0 3 * * *` (daily during the 03:00 UTC hour on Vercel Hobby). Vercel calls `/api/cron/database-keepalive`, which makes three minimal, read-only requests to the Supabase `page_content` table. The response never exposes database rows or credentials.

The production project must define:

- `CRON_SECRET`
- `SUPABASE_URL` or the existing `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

The route fails closed when the cron secret is absent or incorrect, and it returns a non-success status when the server-only Supabase secret is unavailable or the database queries do not complete.

This checkout is a homepage refresh. It deliberately links to the current UESC website for admissions, program details, downloads, notices, scholarships, and ICAS. Preserve or rebuild those routes before mapping this app to `uesc.edu.np`; otherwise a full-domain cutover would make the existing linked pages unavailable. Confirm current programs, admissions dates, fees, scholarships, and contact details directly with UESC before that launch.
