// components/profile/ProfileSecurity.tsx
export function ProfileSecurity() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-medium mb-4">Security</h2>

      <a
        href="/auth/reset-password"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Change Password
      </a>
    </div>
  );
}
