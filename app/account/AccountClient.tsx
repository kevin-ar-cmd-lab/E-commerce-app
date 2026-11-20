"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  Heart,
  KeyRound,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldAlert,
  ShoppingCart,
  User as UserIcon,
  UserPlus,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 text-[var(--text-muted)]">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
          {label}
        </p>
        <div className="truncate font-medium">{value}</div>
      </div>
    </div>
  );
}

function GuestView() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--badge-bg)] text-[var(--accent)]">
        <UserIcon className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold">Your account</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        Sign in to view your account details, orders and wishlist. New to
        Jumatech? Create an account in under a minute.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          href="/login?next=/account"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <LogIn className="h-4 w-4" />
          Sign in
        </Link>
        <Link
          href="/register?next=/account"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 font-semibold transition hover:bg-[var(--surface-hover)]"
        >
          <UserPlus className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </section>
  );
}

export default function AccountClient() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[var(--text-muted)]">
        Loading your account…
      </div>
    );
  }

  if (!user) return <GuestView />;

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    (typeof meta.username === "string" && meta.username) ||
    "";
  const displayName = fullName || user.email?.split("@")[0] || "Customer";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const verified = Boolean(user.email_confirmed_at || user.confirmed_at);
  const provider = user.app_metadata?.provider ?? "email";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const quickLinks = [
    { href: "/dashboard/orders", label: "My orders", icon: Package },
    { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
    { href: "/dashboard/address", label: "Addresses", icon: MapPin },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {/* Profile header */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-2xl font-bold text-white">
          {initials || <UserIcon className="h-8 w-8" />}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold">{displayName}</h1>
          <p className="truncate text-[var(--text-muted)]">{user.email}</p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              verified
                ? "bg-[var(--badge-bg)] text-[var(--accent)]"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {verified ? (
              <BadgeCheck className="h-3.5 w-3.5" />
            ) : (
              <ShieldAlert className="h-3.5 w-3.5" />
            )}
            {verified ? "Email verified" : "Email not verified"}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-[var(--surface-hover)]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Details */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 md:col-span-2">
          <h2 className="mb-2 text-lg font-semibold">Account details</h2>
          <div className="divide-y divide-[var(--border-color)]">
            <DetailRow
              icon={<UserIcon className="h-4 w-4" />}
              label="Full name"
              value={fullName || "Not provided"}
            />
            <DetailRow
              icon={<Mail className="h-4 w-4" />}
              label="Email address"
              value={user.email ?? "—"}
            />
            <DetailRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={user.phone || "Not provided"}
            />
            <DetailRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Member since"
              value={formatDate(user.created_at)}
            />
            <DetailRow
              icon={<Clock className="h-4 w-4" />}
              label="Last sign in"
              value={formatDateTime(user.last_sign_in_at)}
            />
            <DetailRow
              icon={<KeyRound className="h-4 w-4" />}
              label="Sign-in method"
              value={<span className="capitalize">{provider}</span>}
            />
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
            <h2 className="mb-4 text-lg font-semibold">Quick links</h2>
            <ul className="space-y-1">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-[var(--surface-hover)]"
                  >
                    <Icon className="h-4 w-4 text-[var(--accent)]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6">
            <h2 className="mb-2 text-lg font-semibold">Security</h2>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              Keep your account safe by using a strong, unique password.
            </p>
            <Link
              href="/reset-password"
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Change password
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
