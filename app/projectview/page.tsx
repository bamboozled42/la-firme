import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default async function Dashboard() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route

    /*
      Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
      Always use supabase.auth.getUser() to protect pages and user data.
      Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
      It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
    */

    redirect("/");
  }

  const userEmail = user.email;

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg"> 
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <Button type="button" className="mb-6 text-muted-foreground" variant="link" size={null}>
              <Icons.chevronLeft className="h-5 w-5"/> Back
            </Button>
          </Link>

          <TypographyH2 className="text-center font-bold mt-2">[Project Title]</TypographyH2>

          {!null && <TypographyP className="mt-6 mb-5 text-lg font-medium text-center text-green-500">{"[Assigned architect]"}</TypographyP>}

          {!null && ( // replace !null with image to check if it exists
            <div className="relative h-64 w-full">
              <Image src="/placeholder_img.jpg" alt="otter" fill style={{ objectFit: "contain"}} />
            </div>
          )}

          <div className="space-y-2 mt-6">
            {!null && <TypographyP><b>Status: </b>{"Ongoing"}</TypographyP>}
            {!null && <TypographyP><b>Start date: </b>{"October 10, 2024"}</TypographyP>}
            {!null && <TypographyP><b>Location: </b>{"Cambridge, MA"}</TypographyP>}
            {!null && <TypographyP><b>Clients: </b>{"John Doe"}</TypographyP>}
          </div>

          {!null && <TypographyP>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</TypographyP>}
        </div>
      </div>
    </>
  );
}
