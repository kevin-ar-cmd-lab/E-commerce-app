"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert("Invalid credentials or account does not exist");
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="auth-card">
      <h1>Sign In</h1>

      {registered && (
        <p className="text-green-600 text-sm">
          Account created successfully. Please sign in.
        </p>
      )}

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <Link href="/auth/reset-password">Forgot password?</Link>

      <p>
        Don’t have an account?{" "}
        <Link href="/auth/register">Create one</Link>
      </p>
    </div>
  );
}
