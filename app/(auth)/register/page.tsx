import AuthSuspense from "../AuthSuspense";
import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
  return (
    <AuthSuspense>
      <RegisterClient />
    </AuthSuspense>
  );
}
