import AuthSuspense from "../AuthSuspense";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <AuthSuspense>
      <ResetPasswordClient />
    </AuthSuspense>
  );
}
