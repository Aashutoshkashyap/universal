import type { CookieOptions } from "@supabase/ssr";

export function getSupabaseCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };
}

export function hardenSupabaseCookieOptions(
  options: CookieOptions,
): CookieOptions {
  return {
    ...options,
    ...getSupabaseCookieOptions(),
  };
}
