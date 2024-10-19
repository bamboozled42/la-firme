import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Subcomponent from "./subcomponent";
import AddDialog from "./add-subcomponent";

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

          <TypographyH2 className="font-bold mt-2">{"[Project Name]"}</TypographyH2>

          <div className="mt-4 mb-6">
            <Select defaultValue="1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {!null && ( // replace !null with image to check if it exists
            <div className="relative h-64 w-full">
              <Image src="/placeholder_img.jpg" alt="otter" fill style={{ objectFit: "contain"}} />
            </div>
          )}

          <div className="flex justify-center">
            <Button type="button" className="mt-5 mb-6" variant="secondary" size="sm">
              <Icons.upload className="mr-2 h-5 w-5"/> Upload
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="walls" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Walls {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Wall X"}></Subcomponent>
                  <Subcomponent name={"Wall X"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="columns" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Columns {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Column X"}></Subcomponent>
                  <Subcomponent name={"Column X"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beams" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Beams {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Beam X"}></Subcomponent>
                  <Subcomponent name={"Beam X"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceilings" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Ceilings {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Ceiling X"}></Subcomponent>
                  <Subcomponent name={"Ceiling X"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="floors" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Floors {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Floor X"}></Subcomponent>
                  <Subcomponent name={"Floor X"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
