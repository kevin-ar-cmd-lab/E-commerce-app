"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2.5 text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export default function ResetPasswordClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/update-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Reset password</h1>

      {sent ? (
        <p className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
          Password reset link sent. Check your email.
        </p>
      ) : (
        <>
          <p className="text-sm text-[var(--text-muted)]">
            Enter the email on your account and we&apos;ll send you a link to
            reset your password.
          </p>

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </>
      )}

      <p className="text-center text-sm">
        <Link href="/login" className="font-medium text-[var(--accent)] hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
