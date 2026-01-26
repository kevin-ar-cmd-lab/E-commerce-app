"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
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

    setLoading(false);

    // 🔑 Redirect to login after successful signup
    router.push("/auth/login?registered=true");
  };

  return (
    <div className="auth-card">
      <h1>Create Account</h1>

      <input placeholder="Full name" onChange={e => setFullName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm password"
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <label>
        <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
        Show password
      </label>

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <p>
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </p>
    </div>
  );
}
