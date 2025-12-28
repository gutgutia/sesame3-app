import { createClient } from "@/lib/supabase/server";

// Admin email whitelist - only these emails can access admin features
export const ADMIN_EMAILS = ["abhishek.gutgutia@gmail.com"];

/**
 * Check if the current user is an admin
 * Returns the user if admin, throws if not
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
    throw new Error("Unauthorized");
  }

  return user;
}

/**
 * Check if the current user is an admin (non-throwing)
 * Returns true/false
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return false;
    }

    return ADMIN_EMAILS.includes(user.email);
  } catch {
    return false;
  }
}
