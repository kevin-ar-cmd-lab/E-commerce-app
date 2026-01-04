import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import {
  ProfileHeader,
  ProfileInfo,
  ProfileSecurity,
} from "@/components/profile";

export default async function ProfilePage() {
  const supabaseAccessToken = cookies().get("sb-access-token")?.value;

  if (!supabaseAccessToken) {
    return (
      <p className="text-red-500">
        You are not logged in. Please{" "}
        <a href="/auth/login" className="underline text-blue-600">
          login
        </a>
        .
      </p>
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(supabaseAccessToken);

  if (error || !user) {
    return <p className="text-red-500">Failed to load user information.</p>;
  }

  return (
    <section className="space-y-6 max-w-xl">
      <ProfileHeader />
      <ProfileInfo user={user} />
      <ProfileSecurity />
    </section>
  );
}
