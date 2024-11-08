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
import { useSupabase } from "@/app/providers";
import { Floor, ProjectDashboardType, type StateAction, ElementTypeKeys} from "../../../lib/utils";
import Subcomponent from "./subcomponent";
import { EditDialog } from "./edit-subcomponent";


export default function Dashboard({ params }: { params: { projectId: string } }) {
  const supabase = useSupabase();
  const [projectData, setProjectData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorData, setCurrentFloorData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorId, setCurrentFloorId] = useState<string>("all");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
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

      setProjectData(data);
      setCurrentFloorData(data);
    };
    fetchProjectData();
  }, [supabase, params.projectId]);


  // this function changes the currentfloordata to the floor chosen in the select
  const changeFloor = (value: string) => {
    console.log("Changing floor to:", value);
    setCurrentFloorId(value);

    // because we have this separation of projectData and currentFloorData,
    // we can just filter the data based on the floor_id after a floor change
    if (value === "all") {
      setCurrentFloorData(projectData);
    } else {
      const floorId = parseInt(value);
      if (projectData) {
        setCurrentFloorData({
          ...projectData,
          walls: projectData.walls?.filter(wall => wall.floor_id === floorId) || [],
          columns: projectData.columns?.filter(column => column.floor_id === floorId) || [],
          beams: projectData.beams?.filter(beam => beam.floor_id === floorId) || [],
          ceilings: projectData.ceilings?.filter(ceiling => ceiling.floor_id === floorId) || [],
        });
      }
    }
  };

  // this function handles any update/delete
  const updateDataState = (action: StateAction) => {
    if (!projectData) {
      return;
    }

    const { item } = action;
    const elementTypeKey = (item.elementType.toLowerCase() + 's') as ElementTypeKeys;
    // we either update an item in the data by mapping its changes by its ids or leaving it be
    // or we delete it by filtering it out by its item id
    const updatedArray = action.type === 'update'
    ? projectData[elementTypeKey]?.map((existing: any) =>
        existing.id === item.id ? item : existing
      )
    : projectData[elementTypeKey]?.filter((existing: any) =>
        existing.id !== item.id
      );

    const updatedData = {
      ...projectData,
      [item.elementType.toLowerCase() + 's']: updatedArray,
    };

    setProjectData(updatedData);
    /*
      basically currentFloorData is not updated when projectData is updated
      and so it is necessary to update currentFloorData on database change
      this is just better than requerying the db and updating there because
      it is hard coded to have currentFloorData to be all the data in supabase
      rather than the one corresponding to currentFloorId
    */

    if (currentFloorId !== "all") {
      changeFloor(currentFloorId);
    } else {
      setCurrentFloorData(updatedData);
    }
  };


  if (error) {
    return <div>Error loading project data...</div>;
  }

  const handleUpdate = (updatedData: any) => {
    updateDataState({ type: 'update', item: updatedData });
  };

  const handleDelete = (deletedItem: any) => {
    updateDataState({ type: 'delete', item: deletedItem });
  };

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

          <div className="mt-4 mb-6 flex flex-row items-center space-x-3">
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
            <EditDialog elementType={"Floor"} DetailsForm={FloorDetailsForm} buttonName="Floor details"/>
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
                    form2Title={"Wall Details"}
                    form1Description="Please provide the basic information for the wall element."
                    form2Description="Please provide detailed information about the wall."
                  />
                </div>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {currentFloorData?.walls?.map((wall) => (
                      <Subcomponent
                        key={wall.id}
                        name={wall.name ?? 'Unknown Wall'}
                        type="Wall"
                        itemData={wall}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
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
                {currentFloorData?.columns?.map(column => (
                    <Subcomponent
                      key={column.id}
                      name={column.name || "Unknown Columns"}
                      type="Column"
                      itemData={column}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
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
                {currentFloorData?.beams?.map(beam => (
                    <Subcomponent
                    key={beam.id}
                    name={beam.name || "Unknown Beams"}
                    type="Beam"
                    itemData={beam}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
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
                {currentFloorData?.ceilings?.map(ceiling => (
                    <Subcomponent
                      key={ceiling.id}
                      name={ceiling.name || "Unknown Ceilings"}
                      type="Ceiling"
                      itemData={ceiling}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
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
