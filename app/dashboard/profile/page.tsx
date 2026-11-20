import { redirect } from "next/navigation";

// The profile now lives on the account page, which handles signed-out visitors.
export default function ProfilePage() {
  redirect("/account");
}
