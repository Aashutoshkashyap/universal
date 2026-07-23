import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-16">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0A3073]">
          UESC administration
        </p>
        <h1
          className="text-3xl font-semibold text-slate-950"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Secure sign in
        </h1>
        <p className="mb-8 mt-3 text-sm leading-6 text-slate-600">
          Access is limited to approved college administrators.
        </p>

        <LoginForm />

        <Link
          href="/"
          className="mt-7 inline-flex text-sm font-semibold text-[#0A3073] underline-offset-4 hover:underline"
        >
          Return to the public website
        </Link>
      </section>
    </main>
  );
}
