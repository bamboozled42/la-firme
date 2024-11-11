import BeamDetailsForm from "@/components/forms/BeamDetails";
import CeilingDetailsForm from "@/components/forms/CeilingDetails";
import ColumnDetailsForm from "@/components/forms/ColumnsDetails";
import ColumnsForm from "@/components/forms/ColumnsForm";
import FloorDetailsForm from "@/components/forms/FloorDetails";
import WallDetailsForm from "@/components/forms/WallDetailsForm";
import WallForm from "@/components/forms/WallForm";
import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddDialog from "./add-subcomponent";
import Subcomponent from "./subcomponent";

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
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <Button type="button" className="mb-6 text-muted-foreground" variant="link" size={null}>
              <Icons.chevronLeft className="h-5 w-5" /> Back
            </Button>
          </Link>

          <TypographyH2 className="mt-2 font-bold">{"[Project Name]"}</TypographyH2>

          <div className="mb-6 mt-4">
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
              <Image src="/placeholder_img.jpg" alt="otter" fill style={{ objectFit: "contain" }} />
            </div>
          )}

          <div className="flex justify-center">
            <Button type="button" className="mb-6 mt-5" variant="secondary" size="sm">
              <Icons.upload className="mr-2 h-5 w-5" /> Upload
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="walls" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Walls {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog
                  Form1={WallForm}
                  Form2={WallDetailsForm}
                  form1Title="Add Wall Element"
                  form2Title="Wall Details"
                  form1Description="Please provide the basic information for the wall element."
                  form2Description="Please provide detailed information about the wall."
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Wall"}></Subcomponent>
                  <Subcomponent name={"Wall"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="columns" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Columns {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={ColumnDetailsForm}
                  form1Title="Add Column Element"
                  form2Title="Column Details"
                  form1Description="Please provide the basic information for the column element."
                  form2Description="Please provide detailed information about the column."
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Column"}></Subcomponent>
                  <Subcomponent name={"Column"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beams" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Beams {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={BeamDetailsForm}
                  form1Title="Add Beam Element"
                  form2Title="Beam Details"
                  form1Description="Please provide the basic information for the beam element."
                  form2Description="Please provide detailed information about the beam."
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Beam"}></Subcomponent>
                  <Subcomponent name={"Beam"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceilings" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Ceilings {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={CeilingDetailsForm}
                  form1Title="Add Ceiling Element"
                  form2Title="Ceiling Details"
                  form1Description="Please provide the basic information for the ceiling element."
                  form2Description="Please provide detailed information about the ceiling."
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Ceiling"}></Subcomponent>
                  <Subcomponent name={"Ceiling"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="floors" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Floors {"(" + "2" + ")"}</AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={FloorDetailsForm}
                  form1Title="Add Floor Element"
                  form2Title="Floor Details"
                  form1Description="Please provide the basic information for the floor element."
                  form2Description="Please provide detailed information about the floor."
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  <Subcomponent name={"Floor"}></Subcomponent>
                  <Subcomponent name={"Floor"}></Subcomponent>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
