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

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const next = safeNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.toLowerCase().includes("confirm")
          ? "Please confirm your email address before signing in."
          : "Invalid email or password."
      );
      return;
    }

    router.push(next);
    router.refresh();
  };

  const nextQuery = next !== "/account" ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sign in</h1>

      {registered && (
        <p className="rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
          Account created successfully. Check your inbox to confirm your email
          if required, then sign in.
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>
      )}

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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <Link href="/reset-password" className="text-center text-sm text-[var(--accent)] hover:underline">
        Forgot password?
      </Link>

      <p className="text-center text-sm text-[var(--text-muted)]">
        Don’t have an account?{" "}
        <Link href={`/register${nextQuery}`} className="font-medium text-[var(--accent)] hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
