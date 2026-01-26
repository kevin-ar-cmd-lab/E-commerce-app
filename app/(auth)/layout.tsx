import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Brand */}
        <div className="mb-6 text-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Jumatech
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Secure access to your account
          </p>
        </div>

        {/* Page content */}
        {children}

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Jumatech. All rights reserved.
        </div>
      </div>
    </div>
  );
}
