"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async () => {
    try {
      await signUp(email, password, username);
      router.push("/");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Create Account</h1>
      <input
        className="w-full border p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="w-full bg-green-600 text-white py-2"
      >
        Sign Up
      </button>
    </div>
  );
}
