# UESC website refresh

Modern, accessible landing-page refresh for Universal Engineering & Science College (UESC), built with Next.js, TypeScript, and Tailwind CSS.

The page keeps the approved section layout while using authentic supplied UESC imagery, official college contact details, Pokhara University affiliation, and performance-oriented local assets.

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

## Database keepalive

The production deployment registers a Vercel Cron Job at `0 3 * * *` (daily during the 03:00 UTC hour on Vercel Hobby). Vercel calls `/api/cron/database-keepalive`, which makes three minimal, read-only requests to the Supabase `page_content` table. The response never exposes database rows or credentials.

The production project must define:

- `CRON_SECRET`
- `SUPABASE_URL` or the existing `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, or the existing `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The route fails closed when the cron secret is absent or incorrect, and it returns a non-success status when Supabase is not configured or does not complete the database queries.

This checkout is a homepage refresh. It deliberately links to the current UESC website for admissions, program details, downloads, notices, scholarships, and ICAS. Preserve or rebuild those routes before mapping this app to `uesc.edu.np`; otherwise a full-domain cutover would make the existing linked pages unavailable. Confirm current programs, admissions dates, fees, scholarships, and contact details directly with UESC before that launch.
