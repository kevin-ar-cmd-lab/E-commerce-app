"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sign in with email/password
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password. If you don't have an account, please sign up.");
      return;
    }

    if (data?.user) {
      router.push("/dashboard"); // Redirect after successful login
    }
  };

  // OAuth login (Google)
  const handleOAuthLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) setError("OAuth login failed. Please try again.");
  };

  // Forgot password
  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email first.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) setError(error.message);
    else setError("Password reset link sent to your email.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />

      <div className="relative w-full max-w-sm mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full max-w-sm mb-4"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={handleOAuthLogin}
        className="bg-red-500 text-white px-4 py-2 rounded w-full max-w-sm mb-2"
      >
        Login with Google
      </button>

      <button
        onClick={handleForgotPassword}
        className="text-blue-600 underline mb-4"
      >
        Forgot Password?
      </button>

      <p>
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
