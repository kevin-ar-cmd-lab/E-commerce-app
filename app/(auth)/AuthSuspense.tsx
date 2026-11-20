import { Suspense, ReactNode } from "react";

type AuthSuspenseProps = {
  children: ReactNode;
};

export default function AuthSuspense({ children }: AuthSuspenseProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-[var(--text-muted)]">Loading authentication…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
