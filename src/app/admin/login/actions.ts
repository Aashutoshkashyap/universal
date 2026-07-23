"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type LoginState = {
  error: string | null;
};

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(1024),
});

const GENERIC_LOGIN_ERROR = "Unable to sign in with those credentials.";

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: GENERIC_LOGIN_ERROR };
  }

  let supabase: Awaited<ReturnType<typeof createClient>>;

  try {
    supabase = await createClient();
  } catch {
    return { error: GENERIC_LOGIN_ERROR };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
    });

    if (error) {
      return { error: GENERIC_LOGIN_ERROR };
    }

    const admin = await verifyAdminClient(supabase);

    if (!admin) {
      await supabase.auth.signOut({ scope: "local" });
      return { error: GENERIC_LOGIN_ERROR };
    }
  } catch {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch {
      // The generic response intentionally hides provider and account details.
    }

    return { error: GENERIC_LOGIN_ERROR };
  }

  redirect("/admin");
}
