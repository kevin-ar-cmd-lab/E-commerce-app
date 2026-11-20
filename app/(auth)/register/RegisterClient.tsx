"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/account";

const inputClass =
  "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2.5 text-[var(--text-color)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export default function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const nextQuery = next !== "/account" ? `next=${encodeURIComponent(next)}` : "";

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }

    setLoading(false);

    // If email confirmation is disabled the user is signed in right away.
    if (data.session) {
      router.push(next);
      router.refresh();
      return;
    }

    router.push(`/login?registered=true${nextQuery ? `&${nextQuery}` : ""}`);
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create account</h1>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>
      )}

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Full name
        <input
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Email
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Password
        <input
          type={showPassword ? "text" : "password"}
          required
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Confirm password
        <input
          type={showPassword ? "text" : "password"}
          required
          minLength={6}
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[var(--accent)]"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-center text-sm text-[var(--text-muted)]">
        Already have an account?{" "}
        <Link
          href={`/login${nextQuery ? `?${nextQuery}` : ""}`}
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
