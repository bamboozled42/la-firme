import { createServerSupabaseClient } from "@/lib/server-utils";
import { getUserProfile } from "@/lib/utils";
import LoginButton from "./login-button";
import UserNav from "./user-nav";

export default async function AuthStatus() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return <LoginButton />;
  }

  const checkWhitelist = async (currentUser: any) => {
    const { data: whitelistUser, error } = await supabase
      .from("whitelist_users")
      .select("*")
      .eq("email", currentUser.email)
      .single();

    if (!whitelistUser || error) {
      console.log("User not whitelisted");
      return;
    }

    const { data: existingUser } = await supabase.from("users").select("*").eq("id", currentUser.id).single();

    if (!existingUser) {
      const { error } = await supabase.from("users").insert({
        first_name: whitelistUser.first_name,
        last_name: whitelistUser.last_name,
        id: currentUser.id,
        email: currentUser.email,
        role: whitelistUser.role,
      });
    }
  };

  const { profile, error } = await getUserProfile(supabase, authUser);
  await checkWhitelist(profile);

  if (error) {
    return;
  }

  return <UserNav profile={profile} />;
}
