"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/update-password`,
    });

    setLoading(false);

    if (error) {
      return alert(error.message);
    }

    setSent(true);
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

      {sent ? (
        <p className="text-sm text-green-600">
          Password reset link sent. Check your email.
        </p>
      ) : (
        <>
          <input
            className="w-full mb-4 px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </>
      )}

      <p className="text-sm text-center">
        <Link href="/auth/login" className="text-blue-600">
          Back to sign in
        </Link>
      </p>
    </>
  );
}
