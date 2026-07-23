import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/request-security";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Request origin was not accepted." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    // Redirecting to the login page is safe even when there was no session.
  }

  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
