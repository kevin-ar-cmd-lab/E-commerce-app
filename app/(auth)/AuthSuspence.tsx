import { Suspense, ReactNode } from "react";

type AuthSuspenseProps = {
  children: ReactNode;
};

export default function AuthSuspense({ children }: AuthSuspenseProps) {
  return (
    <Suspense
      fallback={
        <div className="auth-card flex items-center justify-center">
          <span className="text-sm text-gray-500">Loading authentication…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
