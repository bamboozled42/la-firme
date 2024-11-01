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
import Image from "next/image";
import Link from "next/link";
import AddDialog from "./add-subcomponent";
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from "../../../lib/client-utils";
import { Floor, ProjectDashboardType} from "../../../lib/utils";
import Subcomponent from "./subcomponent";



export default function Dashboard({ params }: { params: { projectId: string } }) {
  const supabase = createBrowserSupabaseClient();
  const [projectData, setData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorData, setCurrentFloorData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorId , setCurrentFloorId] = useState<string>("all");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          floors (*),
          walls (*),
          columns (*),
          beams (*),
          ceilings (*)
        `)
        .eq("id", params.projectId)
        .single();

      if (error) {
        console.error("Error fetching project data:", error);
        return;
      }
      console.log(data);
      setData(data);
      setCurrentFloorData(data);
    };
    initialize();
  }, [supabase,params.projectId]);

  const changeFloor = (value: string) => {
    console.log(value);
    setCurrentFloorId(value);

    if (value === "all") {
      setCurrentFloorData(projectData);
    } else {
      const floorId = parseInt(value);
      const filteredData = {
        ...projectData,
        walls: projectData?.walls?.filter(wall => wall.floor_id === floorId) || [],
        columns: projectData?.columns?.filter(column => column.floor_id === floorId) || [],
        beams: projectData?.beams?.filter(beam => beam.floor_id === floorId) || [],
        ceilings: projectData?.ceilings?.filter(ceiling => ceiling.floor_id === floorId) || [],
      };
      setCurrentFloorData(filteredData as ProjectDashboardType);
      console.log(filteredData);
    }
  };



  if (error) {
    return <div>Error loading project data...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Link href="/projectdashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <Button type="button" className="mb-6 text-muted-foreground" variant="link" size={null}>
              <Icons.chevronLeft className="h-5 w-5" /> Back
            </Button>
          </Link>

          <TypographyH2 className="mt-2 font-bold">{ projectData?.title  }</TypographyH2>

          <div className="mt-4 mb-6">
            <Select
              value={currentFloorId}
              onValueChange={changeFloor}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {currentFloorId === "all"
                    ? "All floors"
                    : projectData?.floors?.find(floor => floor.id.toString() === currentFloorId)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All floors</SelectItem>
                  {projectData?.floors?.map((floor: Floor) => (
                    <SelectItem key={floor.id} value={floor.id.toString()}>{floor.name}</SelectItem>
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
                <AccordionTrigger className="flex-grow">Walls {"(" + (currentFloorData?.walls ? currentFloorData?.walls.length : 0) + ")"}</AccordionTrigger>
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
                  {currentFloorData?.walls?.map(wall => (
                    <Subcomponent
                    key={wall.id}
                    name={wall.name || "Unknown Wall"}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="columns" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Columns {"(" + (currentFloorData?.columns ? currentFloorData?.columns.length : 0) + ")"}</AccordionTrigger>
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
                {currentFloorData?.columns?.map(columns => (
                    <Subcomponent key={columns.id} name={columns.name || "Unknown Columns"} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beams" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Beams {"(" + (currentFloorData?.beams ? currentFloorData?.beams.length : 0) + ")"}</AccordionTrigger>
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
                {currentFloorData?.beams?.map(beams => (
                    <Subcomponent key={beams.id} name={beams.name || "Unknown Beams"} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceilings" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">Ceilings {"(" + (currentFloorData?.ceilings ? currentFloorData?.ceilings.length : 0) + ")"}</AccordionTrigger>
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
                {currentFloorData?.ceilings?.map(ceilings => (
                    <Subcomponent key={ceilings.id} name={ceilings.name || "Unknown Ceilings"} />
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
