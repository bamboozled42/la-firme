import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createTranslation } from '../i18n/server';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginButton from "./(components-navbar)/login-button";
import { createServerSupabaseClient } from "@/lib/server-utils";
import Link from "next/link";

export default async function Home() {
  const {t} = await createTranslation('common');


  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <TypographyH2 className="text-center mb-6">{t("welcome")}</TypographyH2>

      <div className="mb-8 bg-gray-950 p-3 rounded-md">
        <Image
          src="/lafirmelogo.png"
          alt="La Firme Logo"
          width={600}
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="mt-8">
        {user ? (
          <Link href="/projectdashboard">
            <Button className="px-4">{t("gotodashboard")}</Button>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
