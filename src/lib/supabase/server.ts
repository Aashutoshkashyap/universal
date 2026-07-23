import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseConfig } from "./config";
import {
  getSupabaseCookieOptions,
  hardenSupabaseCookieOptions,
} from "./cookie-options";

export async function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookieOptions: getSupabaseCookieOptions(),
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(
              name,
              value,
              hardenSupabaseCookieOptions(options),
            );
          });
        } catch {
          // Server Components cannot set cookies. The project-level Proxy
          // refreshes sessions before protected pages render.
        }
      },
    },
  });
}
