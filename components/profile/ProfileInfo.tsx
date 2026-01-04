// components/profile/ProfileInfo.tsx
import { User } from "@supabase/supabase-js";

export function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="font-medium mb-4">Personal Information</h2>

      <div className="space-y-3 text-sm">
        <div>
          <span className="text-gray-500">Full Name</span>
          <p className="font-medium">
            {user.user_metadata?.full_name || "N/A"}
          </p>
        </div>

        <div>
          <span className="text-gray-500">Email Address</span>
          <p className="font-medium">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
