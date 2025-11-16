"use client";

import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export const Button: FC<Props> = ({
  children,
  loading = false,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all duration-200";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-200 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};
