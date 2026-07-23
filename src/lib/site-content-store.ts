import "server-only";

import { getSupabaseConfig } from "@/lib/supabase/config";
import {
  defaultSiteContent,
  parseSiteContentWithReport,
  type SiteContent,
} from "@/lib/site-content";

export const SITE_CONTENT_CACHE_TAG = "site-content";

const CONTENT_REQUEST_TIMEOUT_MS = 5_000;
const CONTENT_REVALIDATE_SECONDS = 300;

type PageContentRow = {
  content?: unknown;
};

function getContentHeaders(credential: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    apikey: credential,
  };

  // Legacy Supabase JWT keys also require the Authorization header. New
  // publishable and secret keys are sent in the apikey header only.
  if (credential.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${credential}`;
  }

  return headers;
}

async function fetchPublishedContent(): Promise<unknown | null> {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const credential =
    process.env.SUPABASE_SECRET_KEY?.trim() || config.publishableKey;
  const requestUrl = new URL("/rest/v1/page_content", config.url);
  requestUrl.searchParams.set("select", "content");
  requestUrl.searchParams.set("section_name", "eq.home");
  requestUrl.searchParams.set("limit", "1");

  const response = await fetch(requestUrl, {
    headers: getContentHeaders(credential),
    next: {
      revalidate: CONTENT_REVALIDATE_SECONDS,
      tags: [SITE_CONTENT_CACHE_TAG],
    },
    signal: AbortSignal.timeout(CONTENT_REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Published content returned HTTP ${response.status}`);
  }

  const rows = (await response.json()) as PageContentRow[];
  return rows[0]?.content ?? null;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const storedContent = await fetchPublishedContent();

    if (storedContent === null) {
      return defaultSiteContent;
    }

    const parsed = parseSiteContentWithReport(storedContent);

    if (parsed.usedFallbacks) {
      console.warn(
        "Published site content contained invalid or missing fields; safe defaults were used.",
      );
    }

    return parsed.data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown content error";
    console.error("Unable to load published site content:", message);
    return defaultSiteContent;
  }
}
