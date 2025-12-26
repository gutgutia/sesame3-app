import { redirect } from "next/navigation";

/**
 * Login page - redirects to unified auth page
 */
export default function LoginPage() {
  redirect("/auth");
}
