import type {
  JwtPayload,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { ADMIN_ROLE } from "./roles";

export type VerifiedAdmin = {
  claims: JwtPayload;
  user: User;
};

export async function verifyAdminClient(
  supabase: SupabaseClient,
): Promise<VerifiedAdmin | null> {
  try {
    const { data: claimsData, error: claimsError } =
      await supabase.auth.getClaims();
    const claims = claimsData?.claims;

    if (
      claimsError ||
      !claims ||
      claims.role !== "authenticated" ||
      claims.is_anonymous === true ||
      claims.app_metadata?.role !== ADMIN_ROLE
    ) {
      return null;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (
      userError ||
      !user ||
      user.id !== claims.sub ||
      user.app_metadata?.role !== ADMIN_ROLE
    ) {
      return null;
    }

    return { claims, user };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  let supabase: SupabaseClient;

  try {
    supabase = await createClient();
  } catch {
    redirect("/admin/login");
  }

  const admin = await verifyAdminClient(supabase);

  if (!admin) {
    redirect("/admin/login");
  }

  return { ...admin, supabase };
}
