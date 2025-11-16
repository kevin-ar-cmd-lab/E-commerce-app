"use client";

import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Input label="Name" type="text" required />
      <Input label="Email" type="email" required />
      <Input label="Password" type="password" required />

      <Button type="submit" loading={loading}>
        Register
      </Button>
    </form>
  );
}
