import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import Image from "next/image";
import Link from "next/link";
import { createTranslation } from "../i18n/server";
import LoginButton from "./(components-navbar)/login-button";
import ToastHandler from "./providers";

interface HomePageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { t } = await createTranslation("common");
  const notWhitelisted = searchParams?.notWhitelisted === "true";
  const loginError = searchParams?.loginError === "true";

  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <TypographyH2 className="mb-6 text-center">{t("welcome")}</TypographyH2>

      <div className="mb-8 rounded-md bg-gray-950 p-3">
        <Image src="/lafirmelogo.png" alt="La Firme Logo" width={600} height={600} className="rounded-lg shadow-lg" />
      </div>
      <div className="mt-8">
        {user ? (
          <Link href="/projectdashboard">
            <Button className="px-4">{t("goToDashboard")}</Button>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
      <ToastHandler notWhitelisted={notWhitelisted} loginError={loginError} />
    </div>
  );
}
