import Link from "next/link";
import { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative border-b border-[var(--border-color)] bg-[var(--surface-muted)]">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-14 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-8 text-[var(--text-color)] shadow-xl shadow-[var(--shadow-color)]/20">
          {/* Brand */}
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/" className="text-2xl font-black tracking-tight">
              Jumatech
            </Link>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--badge-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure account access
            </span>
          </div>

          {/* Page content */}
          {children}
        </div>
      </div>
    </section>
  );
}
