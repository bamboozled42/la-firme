"use client";

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
import AddDialog from "./add-subcomponent";
import { useEffect, useState } from 'react';
import type { Database } from "@/lib/schema";
import { createClient } from '@supabase/supabase-js';
import Subcomponent from "./subcomponent";
import EditDialog from "./edit-subcomponent";



type Floor = Database["public"]["Tables"]["floors"]["Row"];
type Wall = Database["public"]["Tables"]["walls"]["Row"];
type Column = Database["public"]["Tables"]["columns"]["Row"];
type Beam = Database["public"]["Tables"]["beams"]["Row"];
type Ceiling = Database["public"]["Tables"]["ceilings"]["Row"];


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);


export default async function Dashboard() {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);
  const [ceilings, setCeilings] = useState<Ceiling[]>([]);

  const [currentFloor, setCurrentFloor] = useState("");

  // Create supabase server component client and obtain user session from Supabase Auth
  // const supabase = createServerSupabaseClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   // this is a protected route - only users who are signed in can view this route

  //   /*
  //     Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
  //     Always use supabase.auth.getUser() to protect pages and user data.
  //     Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
  //     It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
  //   */

  //   redirect("/");
  // }

  // const userEmail = user.email;

  const getComponents = async (newFloor : string) => {
    setCurrentFloor(newFloor);

    const { data: w } = await supabase
      .from('walls')
      .select('*')
      .eq('floor_id', Number(newFloor)); 
    setWalls(w || []);

    const { data: co } = await supabase
      .from('columns')
      .select('*')
      .eq('floor_id', Number(newFloor)); 
    setColumns(co || []);

    const { data: b } = await supabase
      .from('beams')
      .select('*')
      .eq('floor_id', Number(newFloor)); 
    setBeams(b || []);

    const { data: ce } = await supabase
      .from('ceilings')
      .select('*')
      .eq('floor_id', Number(newFloor)); 
    setCeilings(ce || []);
  } 

  const initialize = async () => {
    const { data: floors } = await supabase.from("floors").select("*");
    setFloors(floors || []);

    const firstFloor = (floors?.[0]?.id ?? "").toString();

    setCurrentFloor(firstFloor);
    getComponents(firstFloor);
  }

  useEffect(() => {
    initialize();
  }, []);
  
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

          <div className="mt-4 mb-6">
            <Select value={currentFloor} onValueChange={(value) => getComponents(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {floors?.map((floor) => (
                    <SelectItem value={floor.id.toString()}>{floor.name}</SelectItem>
                  ))}
                </SelectGroup>
                <div className="mt-2 w-[180px]">
                  <AddDialog
                    Form1={ColumnsForm}
                    Form2={FloorDetailsForm}
                    form1Title="Add Floor Element"
                    form2Title="Floor Details"
                    form1Description="Please provide the basic information for the floor element."
                    form2Description="Please provide detailed information about the floor."
                    buttonClass="bg-green-700 text-green-50 w-full"
                    buttonName="Add new floor"
                  />
                </div>
              </SelectContent>
            </Select>
            {/* <EditDialog elementType={"name"} DetailsForm={dform}} /> */}
          </div>
          
          {true && ( // replace true with !image to check if it exists
            <div className="relative h-64 w-full">
              <Image src="/placeholder_img.jpg" alt="otter" fill style={{ objectFit: "contain" }} />
            </div>
          )}

          <div className="flex justify-center">
            <Button type="button" className="mb-6 mt-5" variant="secondary" size="sm">
              <Icons.upload className="mr-2 h-5 w-5" /> 
              <span className="mr-1">
                Upload
              </span>
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="walls" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Walls {"(" + (walls ? walls.length : 0) + ")"}</AccordionTrigger>
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
                  {walls?.map((wall) => (
                    <Subcomponent name={wall.name ?? 'Unknown Wall'}/>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="columns" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Columns {"(" + (columns ? columns.length : 0) + ")"}</AccordionTrigger>
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
                  {columns?.map((column) => (
                    <Subcomponent name={column.name ?? 'Unknown Column'}/>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beams" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Beams {"(" + (beams ? beams.length : 0) + ")"}</AccordionTrigger>
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
                  {beams?.map((beam) => (
                    <Subcomponent name={beam.name ?? 'Unknown Beam'}/>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceilings" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Ceilings {"(" + (ceilings ? ceilings.length : 0) + ")"}</AccordionTrigger>
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
                  {ceilings?.map((ceiling) => (
                    <Subcomponent name={ceiling.name ?? 'Unknown Ceiling'}/>
                  ))}
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
