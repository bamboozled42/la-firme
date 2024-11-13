import { createServerSupabaseClient } from "@/lib/server-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createTranslation } from '../../i18n/server';

export default async function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const {t} = await createTranslation('common');
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        {t('home')}
      </Link>
      {user && (
        <Link href="/projectdashboard" className="text-sm font-medium transition-colors hover:text-primary">
          {t('dashboard')}
        </Link>
      )}
    </nav>
  );
}
