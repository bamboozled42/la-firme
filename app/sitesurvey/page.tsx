"use client";

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
import { useEffect, useState } from 'react';
import type { Database } from "@/lib/schema";
import { createClient } from '@supabase/supabase-js';


type Wall = Database["public"]["Tables"]["walls"]["Row"];
type Column = Database["public"]["Tables"]["columns"]["Row"];
type Beam = Database["public"]["Tables"]["beams"]["Row"];
type Ceiling = Database["public"]["Tables"]["ceilings"]["Row"];


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);


export default async function Dashboard() {
  const [floor, setFloor] = useState("1");
  const [walls, setWalls] = useState<Wall[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [beams, setBeams] = useState<Beam[]>([]);
  const [ceilings, setCeilings] = useState<Ceiling[]>([]);

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

  const getComponents = async () => {
    const { data: w } = await supabase
      .from('walls')
      .select('*')
      .eq('floor_id', Number(floor)); 
    setWalls(w || []);

    const { data: co } = await supabase
      .from('columns')
      .select('*')
      .eq('floor_id', Number(floor)); 
    setColumns(co || []);

    const { data: b } = await supabase
      .from('beams')
      .select('*')
      .eq('floor_id', Number(floor)); 
    setBeams(b || []);

    const { data: ce } = await supabase
      .from('ceilings')
      .select('*')
      .eq('floor_id', Number(floor)); 
    setCeilings(ce || []);
  } 

  useEffect(() => {
    getComponents();
  }, [floor]);

  const { data: floors } = await supabase.from("floors").select("*");
  
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
            <Select defaultValue={floor} onValueChange={(value) => setFloor(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {floors?.map((floor) => (
                    <SelectItem value={floor.id.toString()}>{"Floor " + floor.id}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {true && ( // replace true with !image to check if it exists
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
                <AccordionTrigger className="flex-grow">Walls {"(" + (walls ? walls.length : 0) + ")"}</AccordionTrigger>
                <AddDialog/>
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
                <AddDialog/>
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
                <AddDialog/>
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
                <AddDialog/>
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {ceilings?.map((ceiling) => (
                    <Subcomponent name={ceiling.name ?? 'Unknown Ceiling'}/>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </>
  );
}
