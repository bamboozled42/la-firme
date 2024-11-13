"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useTranslation } from '../../i18n/client';

export default function LoginButton() {
  const { i18n, t } = useTranslation('common');
  const supabase = createBrowserSupabaseClient();

  const handleSignIn = async () => {
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

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    return;
  };
  return <Button onClick={handleSignIn}>{t('googleLogIn')}</Button>;
}
