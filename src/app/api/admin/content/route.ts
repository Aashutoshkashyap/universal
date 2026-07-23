import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { SITE_CONTENT_CACHE_TAG } from "@/lib/site-content-store";
import { siteContentSchema } from "@/lib/site-content";
import { isSameOriginRequest } from "@/lib/request-security";
import { verifyAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BODY_BYTES = 512 * 1024;
const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
  Expires: "0",
  Pragma: "no-cache",
};

const updateSchema = z
  .object({
    content: siteContentSchema,
  })
  .strict();

function json(
  body: Record<string, unknown>,
  init: { status?: number } = {},
) {
  return NextResponse.json(body, {
    ...init,
    headers: PRIVATE_HEADERS,
  });
}

export async function PUT(request: Request) {
  if (!isSameOriginRequest(request)) {
    return json({ error: "Request origin was not accepted." }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Content document is too large." }, { status: 413 });
  }

  let supabase: Awaited<ReturnType<typeof createClient>>;

  try {
    supabase = await createClient();
  } catch {
    return json({ error: "Content service is unavailable." }, { status: 503 });
  }

  const admin = await verifyAdminClient(supabase);
  if (!admin) {
    return json({ error: "Administrator access is required." }, { status: 401 });
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return json({ error: "Unable to read the request." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ error: "Content document is too large." }, { status: 413 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: "Content document must be valid JSON." }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        error:
          "Some content fields are invalid. Check required text, links, lists, and section order.",
      },
      { status: 422 },
    );
  }

  let contentStore: ReturnType<typeof createServiceClient>;

  try {
    contentStore = createServiceClient();
  } catch {
    return json({ error: "Content service is unavailable." }, { status: 503 });
  }

  const storedAt = new Date().toISOString();
  let writeResult = await contentStore
    .from("page_content")
    .upsert(
      {
        section_name: "home",
        content: parsed.data.content,
        updated_at: storedAt,
        updated_by: admin.user.id,
      },
      { onConflict: "section_name" },
    )
    .select("content")
    .single();

  // Existing installations may predate the audit column. The database-owner
  // migration adds it; until then, keep writes functional without weakening
  // the verified server-side authorization boundary.
  if (
    writeResult.error?.code === "PGRST204" &&
    writeResult.error.message.includes("'updated_by'")
  ) {
    writeResult = await contentStore
      .from("page_content")
      .upsert(
        {
          section_name: "home",
          content: parsed.data.content,
          updated_at: storedAt,
        },
        { onConflict: "section_name" },
      )
      .select("content")
      .single();
  }

  const { data, error } = writeResult;

  if (error || !data) {
    console.error("Admin content publish failed:", error?.message ?? "No row returned");
    return json({ error: "Unable to publish content right now." }, { status: 500 });
  }

  revalidateTag(SITE_CONTENT_CACHE_TAG, { expire: 0 });

  return json({
    ok: true,
    content: parsed.data.content,
  });
}
