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
import BeamForm from "@/components/forms/BeamsForm";
import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypographyH2 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type ElementTypeKeys, type Floor, type ProjectDashboardType, type StateAction } from "../../../lib/utils";
import AddDialog from "./add-subcomponent";
import { EditDialog } from "./edit-subcomponent";
import { useTranslation } from '../../../i18n/client';
import Subcomponent from "./subcomponent";
import CeilingForm from "@/components/forms/CeilingForm";

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
        return;
      }

      setProjectData(data);
      setCurrentFloorData(data);
    };
    fetchProjectData();
  }, [supabase, params.projectId, dataVersion]);

  const changeFloor = (value: string) => {
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

        setImgUrl(projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)?.floor_plan);
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

  const handleUpload = async (event : any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const { data, error } = await supabase.storage
      .from('floor-plans')
      .upload(`${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }

    const publicUrl = getPublicUrl(data.path);
    if (!publicUrl) {
      console.error("Failed to retrieve image URL");
      return;
    }

    const { data: updateData, error: updateError } = await supabase
      .from('floors')
      .update({ floor_plan: publicUrl })
      .eq('floor_id', currentFloorId);

    if (updateError) {
      throw new Error(`Error updating database: ${updateError.message}`);
    }

    setImgUrl(publicUrl || "/placeholder_img.jpg");
  };

  const sortByFloorIdAndName = (data) => {
      return data.sort((a, b) => {
          // First, compare by floor_id
          if (a.floor_id !== b.floor_id) {
              return a.floor_id - b.floor_id; // Numeric comparison
          }
          // If floor_id is the same, compare by name
          return a.name.localeCompare(b.name); // String comparison
      });
  };

  // Combine all project arrays into one, tagging each with elementType
  const getAllDataForProject = () => {
    if (!projectData) return [];
    
    const { floors = [], walls = [], columns = [], beams = [], ceilings = [] } = projectData;

    const floorsWithType = sortByFloorIdAndName(
        floors.map(f => ({ elementType: 'floor', ...f }))
    );
    
    const wallsWithType = sortByFloorIdAndName(
        walls.map(w => ({ elementType: 'wall', ...w }))
    );
    
    const columnsWithType = sortByFloorIdAndName(
        columns.map(c => ({ elementType: 'column', ...c }))
    );
    
    const beamsWithType = sortByFloorIdAndName(
        beams.map(b => ({ elementType: 'beam', ...b }))
    );
    
    const ceilingsWithType = sortByFloorIdAndName(
        ceilings.map(c => ({ elementType: 'ceiling', ...c }))
    );

    const floorHeader = { elementType: 'floor', name: 'name', floor_id: 'floor_id', materials: 'materials', projectId: 'projectId', floor_plan: 'floor_plan'};
    const wallHeader = {
      elementType: 'wall',
      id: 'id',
      name: 'name',
      width: 'width',
      height: 'height',
      length: 'length',
      stucco: 'stucco',
      floor_id: 'floor_id',
      location: 'location',
      material: 'material',
      direction: 'direction',
      project_id: 'projectId',
      height_type: 'height_type',
      window_size_x: 'window_size_x',
      window_size_y: 'window_size_y',
      fh1CrackInBeam: 'fh1CrackInBeam',
      l7PoorAdhesion: 'l7PoorAdhesion',
      perforatingBeam: 'perforatingBeam',
      l1IrregularBrick: 'l1IrregularBrick',
      wallRepeatFloors: 'wallRepeatFloors',
      fh3CrackInCeiling: 'fh3CrackInCeiling',
      fh4CrackInCeiling: 'fh4CrackInCeiling',
      perforatingColumn: 'perforatingColumn',
      fh2CrackInWallCeiling: 'fh2CrackInWallCeiling',
      l3WallsNotWellAligned: 'l3WallsNotWellAligned',
      fv2VerticalCrackColumn: 'fv2VerticalCrackColumn',
      l6MortarJointsTooThick: 'l6MortarJointsTooThick',
      l4IncompleteMortarInBrick: 'l4IncompleteMortarInBrick',
      fv1VerticalCrackColumnWall: 'fv1VerticalCrackColumnWall',
      l2BricksWithExcessiveHoles: 'l2BricksWithExcessiveHoles',
      l5VariationInThicknessJoints: 'l5VariationInThicknessJoints',
    };
    const columnHeader = {
        elementType: 'column',
        id: 'id',
        name: 'name',
        type: 'type',
        notes: 'notes',
        pipes: 'pipes',
        width: 'width',
        height: 'height',
        length: 'length',
        floor_id: 'floor_id',
        condition: 'condition',
        project_id: 'projectId',
        vertical_cracks: 'vertical_cracks',
    };
    const beamHeader = {
        elementType: 'beam',
        id: 'id',
        name: 'name',
        type: 'type',
        width: 'width',
        height: 'height',
        length: 'length',
        floor_id: 'floor_id',
        condition: 'condition',
        project_id: 'projectId',
        support_left_side: 'support_left_side',
        support_right_side: 'support_right_side',
    };
    const ceilingHeader = {
        elementType: 'ceiling',
        id: 'id',
        name: 'name',
        pipes: 'pipes',
        cracks: 'cracks',
        height: 'height',
        floor_id: 'floor_id',
        project_id: 'projectId',
        dimension_x: 'dimension_x',
        dimension_y: 'dimension_y',
        direction_of_joints: 'direction_of_joints',
    };

    return [
      floorHeader,
      ...floorsWithType,
      wallHeader,
      ...wallsWithType,
      columnHeader,
      ...columnsWithType,
      beamHeader,
      ...beamsWithType,
      ceilingHeader,
      ...ceilingsWithType
    ];
  };

  // Convert a single array of objects into CSV
  function exportToCSV(data: any[], filename: string) {
    if (!data || data.length === 0) {
      console.warn("No data available for CSV export");
      return;
    }

    // Collect all unique keys from all data objects
    const allKeys = new Set<string>();
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => allKeys.add(key));
    });
    const keys = Array.from(allKeys);

    const csvRows: string[] = [];
    // Header row
    // csvRows.push(keys.join(","));

    let previousElementType: string | null = null; // Initialize previousElementType

    // Data rows
    for (const row of data) {
      // Check if elementType has changed and it's not the first row
      if (row.elementType !== previousElementType && previousElementType !== null) {
        csvRows.push(",,,,,"); // Insert a blank line
      }
      previousElementType = row.elementType; // Update previousElementType

      const currentKeys = new Set<string>();
      Object.keys(row).forEach((key) => currentKeys.add(key));
      const keysCurr = Array.from(currentKeys);

      const values = keysCurr.map(k => {
        const val = row[k] === null || row[k] === undefined ? "" : row[k];
        return `"${val}"`; // wrap in quotes to handle commas
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleExportCSV = () => {
    const allData = getAllDataForProject();
    if (allData.length > 0) {
      exportToCSV(allData, "project_data.csv");
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
              buttonClass="bg-green-700 text-green-50 min-h-10 h-auto"
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
                <Image src={imgUrl || "/placeholder_img.jpg"} alt="Floor Plan" fill style={{ objectFit: "contain" }} />
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
                      name={column.name ?? "Unknown Column"}
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
                  Form1={BeamForm}
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
                  Form1={CeilingForm}
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

          <div className="mt-6 flex justify-center">
            <Button variant="default" onClick={handleExportCSV}>
              {t('Export as CSV')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}