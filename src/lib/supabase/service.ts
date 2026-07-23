import "server-only";

import { createClient } from "@supabase/supabase-js";
import { requireSupabaseConfig } from "./config";

export function createServiceClient() {
  const { url } = requireSupabaseConfig();
  const serviceKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!serviceKey) {
    throw new Error("Supabase service access is not configured.");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
