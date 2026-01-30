import AuthSuspense from "../AuthSuspense";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <AuthSuspense>
      <LoginClient />
    </AuthSuspense>
  );
}
