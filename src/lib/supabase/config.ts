export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

function isAllowedSupabaseUrl(value: string) {
  try {
    const url = new URL(value);

    if (url.protocol === "https:") {
      return true;
    }

    return process.env.NODE_ENV !== "production" && url.protocol === "http:";
  } catch {
    return false;
  }
}

export function getSupabaseConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !publishableKey || !isAllowedSupabaseUrl(url)) {
    return null;
  }

  return { url, publishableKey };
}

export function requireSupabaseConfig() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase authentication is not configured.");
  }

  return config;
}
