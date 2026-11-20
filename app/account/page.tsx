import type { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "My Account | JumaTech Shopper",
  description: "View your Jumatech account details.",
};

export default function AccountPage() {
  return <AccountClient />;
}
