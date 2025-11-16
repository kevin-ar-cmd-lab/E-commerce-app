"use client";

import { FC, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: FC<Props> = ({
  label,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-medium">{label}</label>}
      <textarea
        className={`border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black ${className}`}
        {...rest}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};
