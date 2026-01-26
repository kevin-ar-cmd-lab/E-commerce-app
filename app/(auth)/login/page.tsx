"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      return alert(error.message);
    }

    router.push("/dashboard");
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Sign In</h1>

      <input
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({ provider: "google" })
        }
        className="w-full border py-2 rounded-lg mb-4"
      >
        Continue with Google
      </button>

      <div className="text-sm text-center space-y-2">
        <p>
          <Link href="/auth/reset-password" className="text-blue-600">
            Forgot password?
          </Link>
        </p>
        <p>
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}
