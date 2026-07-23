import { getSiteContent } from "@/lib/site-content-store";

export const revalidate = 300;

export async function GET() {
  const { aiSummary } = await getSiteContent();
  const lines = [
    `# ${aiSummary.title}`,
    "",
    aiSummary.summary,
    "",
    aiSummary.establishedStatement,
    "",
    `## ${aiSummary.programsHeading}`,
    "",
    ...aiSummary.programs.map((program) => `- ${program}`),
    "",
    `## ${aiSummary.contactHeading}`,
    "",
    ...aiSummary.links.map((link) => `- [${link.label}](${link.href})`),
    `- Email: ${aiSummary.email}`,
    `- Address: ${aiSummary.address}`,
    "",
    aiSummary.disclaimer,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
