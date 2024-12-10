"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useTranslation } from "../../i18n/client";

export default function LoginButton() {
  const { i18n, t } = useTranslation("common");
  const supabase = createBrowserSupabaseClient();

  const handleSignIn = async () => {
    console.log("signing in");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    console.log("done");

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
    // we have to make sure when someone signs in, they are white-listed
    // so we have make a user in public.users if they exist in public.whitelist_users
    // otherwise prevent them from seeing anything, or if they already exist, no nothing

    return;
  };

  return <Button onClick={handleSignIn}>{t("googleLogIn")}</Button>;
}
