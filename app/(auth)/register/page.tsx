"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return alert("Account already exists. Please log in.");
      }
      return alert(error.message);
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }
  };

  return (
    <>
      <h1>Create Account</h1>

      <input placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <label>
        <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
        Show password
      </label>

      <button onClick={handleSignup}>Sign up</button>

      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({ provider: "google" })
        }
      >
        Sign up with Google
      </button>

      <p>
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </p>
    </>
  );
}
