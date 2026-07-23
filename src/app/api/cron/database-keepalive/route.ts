import { timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const KEEPALIVE_QUERY_COUNT = 3;
const REQUEST_TIMEOUT_MS = 10_000;
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

function isAuthorized(authorization: string | null, secret: string | undefined) {
  if (!authorization || !secret) {
    return false;
  }

  const actual = Buffer.from(authorization);
  const expected = Buffer.from(`Bearer ${secret}`);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function getSupabaseConfiguration() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SECRET_KEY ?? "";

  if (!url || !key) {
    return null;
  }

  try {
    const baseUrl = new URL(url);

    if (baseUrl.protocol !== "https:") {
      return null;
    }

    return { baseUrl, key };
  } catch {
    return null;
  }
}

async function queryDatabase(baseUrl: URL, key: string) {
  const queryUrl = new URL("/rest/v1/page_content", baseUrl);
  queryUrl.searchParams.set("select", "section_name");
  queryUrl.searchParams.set("limit", "1");

  const headers: Record<string, string> = {
    Accept: "application/json",
    apikey: key,
    "Cache-Control": "no-cache",
  };

  // Legacy Supabase service-role JWT keys also require the Authorization
  // header. New Supabase secret keys use the apikey header only.
  if (key.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${key}`;
  }

  for (let queryNumber = 0; queryNumber < KEEPALIVE_QUERY_COUNT; queryNumber += 1) {
    const response = await fetch(queryUrl, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    // Consume the small response so each request completes before the next one.
    await response.arrayBuffer();

    if (!response.ok) {
      throw new Error(`Supabase returned HTTP ${response.status}`);
    }
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request.headers.get("authorization"), process.env.CRON_SECRET)) {
    return Response.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: RESPONSE_HEADERS },
    );
  }

  const configuration = getSupabaseConfiguration();

  if (!configuration) {
    return Response.json(
      { ok: false, error: "Database keepalive is not configured" },
      { status: 503, headers: RESPONSE_HEADERS },
    );
  }

  try {
    await queryDatabase(configuration.baseUrl, configuration.key);

    return Response.json(
      {
        ok: true,
        service: "supabase-postgres",
        queries: KEEPALIVE_QUERY_COUNT,
        checkedAt: new Date().toISOString(),
      },
      { headers: RESPONSE_HEADERS },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    console.error("Database keepalive failed:", message);

    return Response.json(
      { ok: false, error: "Database keepalive failed" },
      { status: 502, headers: RESPONSE_HEADERS },
    );
  }
}
