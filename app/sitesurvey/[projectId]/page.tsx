"use client";

import { useSupabase } from "@/app/providers";
import BeamDetailsForm from "@/components/forms/BeamDetails";
import CeilingDetailsForm from "@/components/forms/CeilingDetails";
import ColumnDetailsForm from "@/components/forms/ColumnsDetails";
import ColumnsForm from "@/components/forms/ColumnsForm";
import FloorDetailsForm from "@/components/forms/FloorDetails";
import FloorsForm from "@/components/forms/FloorsForm";
import WallDetailsForm from "@/components/forms/WallDetailsForm";
import WallForm from "@/components/forms/WallForm";
import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypographyH2 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ElementTypeKeys, Floor, ProjectDashboardType, type StateAction } from "../../../lib/utils";
import AddDialog from "./add-subcomponent";
import { EditDialog } from "./edit-subcomponent";
import { useTranslation } from '../../../i18n/client';

import Subcomponent from "./subcomponent";

export default function Dashboard({ params }: { params: { projectId: string } }) {
  const { i18n, t } = useTranslation('common');

  const supabase = useSupabase();
  const [projectData, setProjectData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorData, setCurrentFloorData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorId, setCurrentFloorId] = useState<string>("all");
  const [error, setError] = useState<Error | null>(null);
  const [dataVersion, setDataVersion] = useState(0);

  const [imgUrl, setImgUrl] = useState("/placeholder_img.jpg");

  const currentFloor =
    currentFloorId !== "all"
      ? projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)
      : null;

  const handleUpdate = (updatedData: any) => {
    updateDataState({ type: "update", item: updatedData });
  };

  const handleDelete = (deletedItem: any) => {
    updateDataState({ type: "delete", item: deletedItem });
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          *,
          floors (*),
          walls (*),
          columns (*),
          beams (*),
          ceilings (*)
        `,
        )
        .eq("id", params.projectId)
        .single();

      if (error) {
        // console.error("Error fetching project data:", error);
        return;
      }

      setProjectData(data);
      setCurrentFloorData(data);
    };
    fetchProjectData();
  }, [supabase, params.projectId, dataVersion]);

  const changeFloor = (value: string) => {
    // console.log("Changing floor to:", value);
    setCurrentFloorId(value);

    if (value === "all") {
      setCurrentFloorData(projectData);
    } else {
      const floorId = parseInt(value);
      if (projectData) {
        setCurrentFloorData({
          ...projectData,
          walls: projectData.walls?.filter((wall) => wall.floor_id === floorId) || [],
          columns: projectData.columns?.filter((column) => column.floor_id === floorId) || [],
          beams: projectData.beams?.filter((beam) => beam.floor_id === floorId) || [],
          ceilings: projectData.ceilings?.filter((ceiling) => ceiling.floor_id === floorId) || [],
        });

        setImgUrl(projectData?.floors?.find((floor) => floor.floor_id === floorId)?.floor_plan || "");
      }
    }
  };

  const updateDataState = (action: StateAction) => {
    if (!projectData) {
      return;
    }

    const { item } = action;
    const elementTypeKey = (item.elementType.toLowerCase() + "s") as ElementTypeKeys;

    // Determine the correct identifier field
    const idField = elementTypeKey === "floors" ? "floor_id" : "id";

    const updatedArray =
      action.type === "update"
        ? projectData[elementTypeKey]?.map((existing: any) => (existing[idField] === item[idField] ? item : existing))
        : projectData[elementTypeKey]?.filter((existing: any) => existing[idField] !== item[idField]);

    const updatedData = {
      ...projectData,
      [elementTypeKey]: updatedArray,
    };

    setProjectData(updatedData);

    if (currentFloorId !== "all") {
      changeFloor(currentFloorId);
    } else {
      setCurrentFloorData(updatedData);
    }
  };

  if (error) {
    return <div>{t('errorLoadingProject')}</div>;
  }

  function getPublicUrl(path : any) {
    const { data } = supabase.storage.from('floor-plans').getPublicUrl(path);
    return data?.publicUrl || null;
  };

  // !! For now, uploading an image DOES NOT delete the old image (will be implemented later)
  // + deleting a floor (is that a feature?) needs to delete image as well
  // + cannot upload image with duplicate names; probably will asign one name for each project/floor (but what about file type then? .png .jpg)
  const handleUpload = async (event : any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }


    // Upload the image
    const fileName = file.name//`floorId${currentFloorId}`;
    // check if this fileName exists in the objects storage table under name with bucket-id floor-plans and then delete it
    try {
      // Check if the file exists in the storage bucket
      const { data: existingFiles, error: checkError } = await supabase.storage
        .from('floor-plans')
        .list('', { search: fileName });

      if (checkError) {
        console.error('Error checking file existence:', checkError.message);
        return;
      }

      // If the file exists, delete it
      if (existingFiles && existingFiles.some((file) => file.name === fileName)) {
        const { error: deleteError } = await supabase.storage
          .from('floor-plans')
          .remove([fileName]);

        if (deleteError) {
          console.error('Error deleting existing file:', deleteError.message);
          return;
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
    // then upload
    const { data, error } = await supabase.storage
      .from('floor-plans')
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }

    // Get the public URL
    const publicUrl = getPublicUrl(data.path);
    if (publicUrl) {
      console.log("Image URL:", publicUrl);
    } else {
        console.error("Failed to retrieve image URL");
    }

    // Update floor table
    const { data: updateData, error: updateError } = await supabase
      .from('floors')
      .update({ floor_plan: publicUrl })
      .eq('floor_id', currentFloorId);

    if (updateError) {
      throw new Error(`Error updating database: ${updateError.message}`);
    }

    setImgUrl((publicUrl || "/placeholder_img.jpg") + "?t=" + new Date().getTime());
    const updatedFloors = projectData?.floors?.map((floor) =>
      floor.floor_id.toString() === currentFloorId ? { ...floor, floor_plan: publicUrl || "/placeholder_img.jpg" } : floor
    );

    if (projectData) {
      // Update the projectData with the updated floors array
      projectData.floors = updatedFloors;
    }
  };


  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Link href="/projectdashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <Button type="button" className="mb-6 text-muted-foreground" variant="link" size={null}>
              <Icons.chevronLeft className="h-5 w-5" /> {t('backButton')}
            </Button>
          </Link>

          <TypographyH2 className="mt-2 font-bold">{projectData?.title}</TypographyH2>

          <div className="mb-6 mt-4 flex flex-row items-center space-x-3">
            <Select value={currentFloorId} onValueChange={changeFloor}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {currentFloorId === "all"
                    ? t('selectAllFloors')
                    : projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">{t('selectAllFloors')}</SelectItem>
                  {projectData?.floors?.map((floor: Floor) => (
                    <SelectItem key={floor.floor_id} value={floor.floor_id.toString()}>
                      {floor.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <AddDialog
              Form1={FloorsForm}
              Form2={FloorDetailsForm}
              form1Title={t('addFloorElementTitle')}
              form2Title={t('floorDetailsTitle')}
              form1Description={t('floorElementDescription')}
              form2Description={t('floorDetailsDescription')}
              buttonClass="bg-green-700 text-green-50"
              buttonName={t('addFloorButton')}
              dbname="floors"
              projectId={params.projectId}
              onDataAdded={() => setDataVersion((prevVersion) => prevVersion + 1)}
            />

            {currentFloorId !== "all" && currentFloor && (
              <EditDialog
                elementType="floor"
                DetailsForm={FloorDetailsForm}
                itemData={currentFloor}
                onUpdate={handleUpdate}
                buttonName={t('floorDetailsTitle')}
                onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
              />
            )}
          </div>

          {currentFloorId != "all" && (
            <div>
              <div className="relative h-64 w-full">
                <Image src={imgUrl || "/placeholder_img.jpg"} alt="otter" fill style={{ objectFit: "contain" }} />
              </div>

              <div className="flex justify-center">
              <input type="file" id="file-upload" className="hidden" onChange={handleUpload}/>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 mb-6 mt-5 rounded-md cursor-pointer text-sm bg-secondary"
                >
                  <Icons.upload className="mr-2 h-5 w-5" />
                  <span>{t('uploadButton')}</span>
                </label>
              </div>
            </div>
          )}


          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="walls" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">
                {t('wallsTitle')} {"(" + (currentFloorData?.walls ? currentFloorData?.walls.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={WallForm}
                  Form2={WallDetailsForm}
                  form1Title={t('addWallElementTitle')}
                  form2Title={t('wallDetailsTitle')}
                  form1Description={t('wallElementDescription')}
                  form2Description={t('wallDetailsDescription')}
                  dbname="walls"
                  projectId={params.projectId}
                  onDataAdded={() => setDataVersion((prevVersion) => prevVersion + 1)}
                  floors={projectData?.floors || []}
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {currentFloorData?.walls?.map((wall) => (
                    <Subcomponent
                      key={wall.id}
                      name={wall.name ?? "Unknown Wall"}
                      type="Wall"
                      itemData={wall}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="columns" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">
                {t('columnsTitle')} {"(" + (currentFloorData?.columns ? currentFloorData?.columns.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={ColumnDetailsForm}
                  form1Title={t('addColumnElementTitle')}
                  form2Title={t('columnDetailsTitle')}
                  form1Description={t('columnElementDescription')}
                  form2Description={t('columnDetailsDescription')}
                  dbname="columns"
                  projectId={params.projectId}
                  onDataAdded={() => setDataVersion((prevVersion) => prevVersion + 1)}
                  floors={projectData?.floors || []}
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {currentFloorData?.columns?.map((column) => (
                    <Subcomponent
                      key={column.id}
                      name={column.name ?? "Unknown Columns"}
                      type="Column"
                      itemData={column}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="beams" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">
                {t('beamsTitle')} {"(" + (currentFloorData?.beams ? currentFloorData?.beams.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={BeamDetailsForm}
                  form1Title={t('addBeamElementTitle')}
                  form2Title={t('beamDetailsTitle')}
                  form1Description={t('beamElementDescription')}
                  form2Description={t('beamDetailsDescription')}
                  dbname="beams"
                  projectId={params.projectId}
                  onDataAdded={() => setDataVersion((prevVersion) => prevVersion + 1)}
                  floors={projectData?.floors || []}
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {currentFloorData?.beams?.map((beam) => (
                    <Subcomponent
                      key={beam.id}
                      name={beam.name ?? t('unknownBeam')}
                      type="Beam"
                      itemData={beam}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ceilings" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">
                {t('ceilingsTitle')} {"(" + (currentFloorData?.ceilings ? currentFloorData?.ceilings.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={ColumnsForm}
                  Form2={CeilingDetailsForm}
                  form1Title={t('addCeilingElementTitle')}
                  form2Title={t('ceilingDetailsTitle')}
                  form1Description={t('ceilingElementDescription')}
                  form2Description={t('ceilingDetailsDescription')}
                  dbname="ceilings"
                  projectId={params.projectId}
                  onDataAdded={() => setDataVersion((prevVersion) => prevVersion + 1)}
                  floors={projectData?.floors || []}
                />
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1">
                  {currentFloorData?.ceilings?.map((ceiling) => (
                    <Subcomponent
                      key={ceiling.id}
                      name={ceiling.name || t('unknownCeiling')}
                      type="Ceiling"
                      itemData={ceiling}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
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
