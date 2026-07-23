"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const initialState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="admin-email"
          className="block text-sm font-semibold text-slate-800"
        >
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          maxLength={254}
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#0A3073] focus:ring-2 focus:ring-[#0A3073]/20"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="admin-password"
          className="block text-sm font-semibold text-slate-800"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          maxLength={1024}
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#0A3073] focus:ring-2 focus:ring-[#0A3073]/20"
        />
      </div>

      <p
        aria-live="polite"
        className="min-h-6 text-sm text-red-700"
        role={state.error ? "alert" : undefined}
      >
        {state.error}
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#0A3073] px-5 py-3 font-semibold text-white transition hover:bg-[#08265d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in securely"}
      </button>
    </form>
  );
}
