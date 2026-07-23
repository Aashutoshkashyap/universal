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

This checkout is a homepage refresh. It deliberately links to the current UESC website for admissions, program details, downloads, notices, scholarships, and ICAS. Preserve or rebuild those routes before mapping this app to `uesc.edu.np`; otherwise a full-domain cutover would make the existing linked pages unavailable. Confirm current programs, admissions dates, fees, scholarships, and contact details directly with UESC before that launch.
