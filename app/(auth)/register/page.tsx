"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        alert("Account already exists. Please sign in.");
        router.push("/auth/login");
        return;
      }
      alert(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }

    router.push("/dashboard");
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Create Account</h1>

      <input
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        placeholder="Full name"
        onChange={(e) => setFullName(e.target.value)}
      />

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

      <input
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({ provider: "google" })
        }
        className="w-full border py-2 rounded-lg mb-4"
      >
        Continue with Google
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </>
  );
}
