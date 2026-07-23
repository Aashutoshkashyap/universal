import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "./config";
import {
  getSupabaseCookieOptions,
  hardenSupabaseCookieOptions,
} from "./cookie-options";
import { ADMIN_ROLE } from "./roles";

const PRIVATE_CACHE_HEADERS = {
  "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
  Expires: "0",
  Pragma: "no-cache",
} as const;

function applyPrivateCacheHeaders(response: NextResponse) {
  Object.entries(PRIVATE_CACHE_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

function copyAuthState(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });

  Object.keys(PRIVATE_CACHE_HEADERS).forEach((key) => {
    const value = source.headers.get(key);

    if (value) {
      target.headers.set(key, value);
    }
  });

  return applyPrivateCacheHeaders(target);
}

function redirectToLogin(request: NextRequest, response: NextResponse) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";

  return copyAuthState(response, NextResponse.redirect(loginUrl));
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === "/admin/login";
  const config = getSupabaseConfig();
  let supabaseResponse = applyPrivateCacheHeaders(
    NextResponse.next({ request }),
  );

  if (!config) {
    return isLoginRoute
      ? supabaseResponse
      : redirectToLogin(request, supabaseResponse);
  }

  const supabase = createServerClient(config.url, config.publishableKey, {
    cookieOptions: getSupabaseCookieOptions(),
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, responseHeaders) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = applyPrivateCacheHeaders(
          NextResponse.next({ request }),
        );

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(
            name,
            value,
            hardenSupabaseCookieOptions(options),
          );
        });

        Object.entries(responseHeaders).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const hasOptimisticAdminAccess =
    !error &&
    claims?.role === "authenticated" &&
    claims.is_anonymous !== true &&
    claims.app_metadata?.role === ADMIN_ROLE;

  if (!isLoginRoute && !hasOptimisticAdminAccess) {
    return redirectToLogin(request, supabaseResponse);
  }

  return supabaseResponse;
}
