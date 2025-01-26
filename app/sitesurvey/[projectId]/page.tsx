"use client";

import { useSupabase } from "@/app/providers";
import BeamDetailsForm from "@/components/forms/BeamDetails";
import BeamForm from "@/components/forms/BeamsForm";
import CeilingDetailsForm from "@/components/forms/CeilingDetails";
import CeilingForm from "@/components/forms/CeilingForm";
import ColumnDetailsForm from "@/components/forms/ColumnsDetails";
import ColumnsForm from "@/components/forms/ColumnsForm";
import FloorDetailsForm from "@/components/forms/FloorDetails";
import FloorsForm from "@/components/forms/FloorsForm";
import WallDetailsForm from "@/components/forms/WallDetailsForm";
import WallForm from "@/components/forms/WallForm";
import { Icons } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypographyH2 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "../../../i18n/client";
import {
  Beam,
  Ceiling,
  Column,
  Wall,
  type ElementTypeKeys,
  type Floor,
  type ProjectDashboardType,
  type StateAction,
} from "../../../lib/utils";
import AddDialog from "./add-subcomponent";
import DeleteDialog from "./delete-subcomponent";
import { EditDialog } from "./edit-subcomponent";
import Subcomponent from "./subcomponent";

export default function Dashboard({ params }: { params: { projectId: string } }) {
  const { t } = useTranslation("common");

  const supabase = useSupabase();
  const [projectData, setProjectData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorData, setCurrentFloorData] = useState<ProjectDashboardType | null>(null);
  const [currentFloorId, setCurrentFloorId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [dataVersion, setDataVersion] = useState(0);

  const [imgUrl, setImgUrl] = useState(null); // Default to null in order to make a check

  const currentFloor =
    currentFloorId !== "all"
      ? projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)
      : null;

  const handleUpdate = (updatedData: any) => {
    updateDataState({ type: "update", item: updatedData });
  };

  const handleDelete = (deletedItem: any) => {
    console.log("Deleting item:", deletedItem);
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

  useEffect(() => {
    if (projectData?.floors && projectData.floors.length > 0 && currentFloorId === null) {
      // Sort floors and select the first one
      const sortedFloors = projectData.floors.sort((a, b) => a.name.localeCompare(b.name));
      if (sortedFloors.length > 0) {
        const initialFloorId = sortedFloors[0].floor_id.toString();
        setCurrentFloorId(initialFloorId);
        changeFloor(initialFloorId);
      }
    } else if (currentFloorId) {
      changeFloor(currentFloorId);
    }
  }, [projectData, currentFloorId]);

  console.log("currentFloorId:", currentFloorId);
  console.log("projectData:", projectData);

  const changeFloor = (value: string) => {
    // Ensure projectData and floors exist
    if (!projectData?.floors || projectData.floors.length === 0) {
      console.error("No floors available");
      return;
    }

    // Update current floor ID
    setCurrentFloorId(value);

    if (value === "all") {
      // Show all floor data
      setCurrentFloorData(projectData);
      setImgUrl(null);
    } else {
      // Filter data for specific floor
      const floorId = parseInt(value, 10);
      const selectedFloor = projectData.floors.find((floor) => floor.floor_id === floorId);

      if (!selectedFloor) {
        console.error("No matching floor found");
        return;
      }

      // Update current floor data
      setCurrentFloorData({
        ...projectData,
        walls: projectData.walls?.filter((wall) => wall.floor_id === floorId) || [],
        columns: projectData.columns?.filter((column) => column.floor_id === floorId) || [],
        beams: projectData.beams?.filter((beam) => beam.floor_id === floorId) || [],
        ceilings: projectData.ceilings?.filter((ceiling) => ceiling.floor_id === floorId) || [],
      });

      // Update floor plan image
      setImgUrl(selectedFloor.floor_plan || null);
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
    return <div>{t("errorLoadingProject")}</div>;
  }

  function getPublicUrl(path: any) {
    const { data } = supabase.storage.from("floor-plans").getPublicUrl(path);
    return data?.publicUrl || null;
  }

  // !! For now, uploading an image DOES NOT delete the old image (will be implemented later)
  // + deleting a floor (is that a feature?) needs to delete image as well
  // + cannot upload image with duplicate names; probably will asign one name for each project/floor (but what about file type then? .png .jpg)
  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // create unique image name
    try {
      //List existing files in the bucket to find the smallest missing number
      const { data: existingFiles, error: listError } = await supabase.storage.from("floor-plans").list();

      if (listError) {
        console.error("Error listing files:", listError.message);
        return;
      }

      // Extract existing floorplan numbers and find the smallest missing number
      const existingNumbers = existingFiles
      ?.map((file) => {
        const match = file.name.match(/floorplan_(\d+)/); // Extract the number from the naming scheme
        return match && match[1] ? parseInt(match[1], 10) : null;
      })
      .filter((num): num is number => num !== null) // Type guard to ensure only numbers
      .sort((a, b) => a - b);

    let newNumber = 1; // Start with 1
    for (const num of existingNumbers) {
      if (num === newNumber) {
        newNumber++; // Increment if the number is already taken
      } else {
        break; // Found the first missing number
      }
    }

      const newFileName = `floorplan_${newNumber}`;

      // Delete the existing image for the current floor (if any)
      const currentFloor = projectData?.floors?.find(
        (floor) => floor.floor_id.toString() === currentFloorId
      );

      if (currentFloor?.floor_plan) {
        const existingPath = currentFloor.floor_plan.split("/").pop(); // Extract file name from the URL

        if (existingPath) {
          const { error: deleteError } = await supabase.storage.from("floor-plans").remove([existingPath]);
          if (deleteError) {
            console.error("Error deleting existing image:", deleteError.message);
            return;
          }
        } else {
          console.error("Error: Unable to extract a valid file name from the floor plan URL.");
          return;
        }
      }

      // Upload the new image with the calculated name
      const { data, error: uploadError } = await supabase.storage
        .from("floor-plans")
        .upload(newFileName, file, { upsert: true });

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return;
      }

      // Get the public URL for the new image
      const publicUrl = getPublicUrl(data.path);
      if (!publicUrl) {
        console.error("Failed to retrieve image URL");
        return;
      }

      console.log("New Image URL:", publicUrl);

      // Update the floor with the new image in the database
      const { error: updateError } = await supabase
        .from("floors")
        .update({ floor_plan: publicUrl })
        .eq("floor_id", currentFloorId);

      if (updateError) {
        throw new Error(`Error updating database: ${updateError.message}`);
      }

      // Update local state
      setImgUrl(publicUrl + "?t=" + new Date().getTime()); // Update with cache-busting timestamp
      const updatedFloors = projectData?.floors?.map((floor) =>
        floor.floor_id.toString() === currentFloorId ? { ...floor, floor_plan: publicUrl } : floor,
      );

      if (projectData) {
        projectData.floors = updatedFloors;
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Unexpected error:", err.message); // Safe to access message
      } else {
        console.error("Unexpected error:", err); // Handle non-Error cases
      }
    }
  };

  const sortByName = (data: any[]) => {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  };

  const fixLength = (data: [], length: number, defaultVal: any = null) => {
    return Array.from({ length }, (_, i) => data[i] ?? defaultVal);
  };

  // Combine all project arrays into one, tagging each with elementType
  const getAllDataForProject = () => {
    if (!projectData) return [];

    const { floors = [], walls = [], columns = [], beams = [], ceilings = [] } = projectData;

    const floorHeader = ["floor", "projectId", "floor_id", "name", "materials", "floor_plan"];
    const wallHeader = [
      "wall",
      "projectId",
      "floor_id",
      "id",
      "direction",
      "name",
      "length",
      "width",
      "height",
      "window_size_x",
      "window_size_y",
      "material",
      "height_type",
      "wallRepeatFloors",
      "location",
      "stucco",
      "columnsAtEnds",
      "fh1CrackInBeam",
      "fh2CrackInWallCeiling",
      "fh3CrackInCeiling",
      "fv1VerticalCrackColumnWall",
      "fv2VerticalCrackColumn",
      "l1IrregularBrick",
      "l2BricksWithExcessiveHoles",
      "l3WallsNotWellAligned",
      "l4IncompleteMortarInBrick",
      "l5VariationInThicknessJoints",
      "l6MortarJointsTooThick",
      "l7PoorAdhesion",
      "perforatingColumn",
      "perforatingBeam",
      "notes",
    ];
    const columnHeader = [
      "column",
      "projectId",
      "floor_id",
      "id",
      "name",
      "width",
      "length",
      "height",
      "condition",
      "type",
      "vertical_cracks",
      "pipes",
      "notes",
    ];
    const beamHeader = [
      "beam",
      "projectId",
      "floor_id",
      "id",
      "name",
      "width",
      "height",
      "length",
      "support_left_side",
      "support_right_side",
      "type",
      "condition",
    ];
    const ceilingHeader = [
      "ceiling",
      "projectId",
      "floor_id",
      "id",
      "name",
      "dimension_x",
      "dimension_y",
      "height",
      "direction_of_joints",
      "cracks",
      "pipes",
    ];

    return {
      floor: {
        keys: floorHeader,
        data: sortByName(floors),
      },
      wall: {
        keys: wallHeader,
        data: sortByName(walls),
      },
      column: {
        keys: columnHeader,
        data: sortByName(columns),
      },
      beam: {
        keys: beamHeader,
        data: sortByName(beams),
      },
      ceiling: {
        keys: ceilingHeader,
        data: sortByName(ceilings),
      },
    };
  };

  // Convert a single array of objects into CSV
  function exportToCSV(data: any, filename: string) {
    if (!data || data.length === 0) {
      console.warn("No data available for CSV export");
      return;
    }

    const NUM_FLOORS = 3;
    const NUM_WALLS = 15;
    const NUM_COLUMNS = 15;
    const NUM_BEAMS = 15;
    const NUM_CEILINGS = 10;

    // Filter for first three floors
    const fids = fixLength(
      data.floor.data.map((floor: Floor) => [floor.floor_id, floor.name]),
      NUM_FLOORS,
      [null, "NULL Floor"],
    );

    // Initialize CSV
    const csvRows: string[] = [];

    // WALLS
    csvRows.push("WALLS");
    csvRows.push(",,,,,");
    for (const [fid, fname] of fids) {
      const curWalls = data.wall.data.filter((wall: Wall) => wall.floor_id == fid);
      for (const dir of ["X", "Y"]) {
        const keys = data.wall.keys;
        csvRows.push(fname + " Direction " + dir);
        csvRows.push(keys.join(","));
        const curDirWalls = fixLength(
          curWalls.filter((wall: Wall) => wall.direction == dir),
          NUM_WALLS,
        );
        for (const row of curDirWalls) {
          if (row == null) {
            csvRows.push(",,,,,");
          } else {
            const values = keys.map((k: string) => {
              const val = row[k] === null || row[k] === undefined ? "" : row[k];
              return `"${val}"`; // wrap in quotes to handle commas
            });
            csvRows.push(values.join(","));
          }
        }

        csvRows.push(",,,,,"); // Insert a blank line
      }
    }

    // COLUMNS
    csvRows.push("COLUMNS");
    csvRows.push(",,,,,");
    for (const [fid, fname] of fids) {
      const curCols = fixLength(
        data.column.data.filter((col: Column) => col.floor_id == fid),
        NUM_COLUMNS,
      );
      const keys = data.column.keys;
      csvRows.push(fname);
      csvRows.push(keys.join(","));
      for (const row of curCols) {
        if (row == null) {
          csvRows.push(",,,,,");
        } else {
          const values = keys.map((k: string) => {
            const val = row[k] === null || row[k] === undefined ? "" : row[k];
            return `"${val}"`; // wrap in quotes to handle commas
          });
          csvRows.push(values.join(","));
        }
      }

      csvRows.push(",,,,,"); // Insert a blank line
    }

    // BEAMS
    csvRows.push("BEAMS");
    csvRows.push(",,,,,");
    for (const [fid, fname] of fids) {
      const curBeams = fixLength(
        data.beam.data.filter((beam: Beam) => beam.floor_id == fid),
        NUM_BEAMS,
      );
      const keys = data.beam.keys;
      csvRows.push(fname);
      csvRows.push(keys.join(","));
      for (const row of curBeams) {
        if (row == null) {
          csvRows.push(",,,,,");
        } else {
          const values = keys.map((k: string) => {
            const val = row[k] === null || row[k] === undefined ? "" : row[k];
            return `"${val}"`; // wrap in quotes to handle commas
          });
          csvRows.push(values.join(","));
        }
      }

      csvRows.push(",,,,,"); // Insert a blank line
    }

    // CEILINGS
    csvRows.push("CEILINGS");
    csvRows.push(",,,,,");
    for (const [fid, fname] of fids) {
      const curCeils = fixLength(
        data.ceiling.data.filter((ceil: Ceiling) => ceil.floor_id == fid),
        NUM_CEILINGS,
      );
      const keys = data.ceiling.keys;
      csvRows.push(fname);
      csvRows.push(keys.join(","));
      for (const row of curCeils) {
        if (row == null) {
          csvRows.push(",,,,,");
        } else {
          const values = keys.map((k: string) => {
            const val = row[k] === null || row[k] === undefined ? "" : row[k];
            return `"${val}"`; // wrap in quotes to handle commas
          });
          csvRows.push(values.join(","));
        }
      }

      csvRows.push(",,,,,"); // Insert a blank line
    }

    // FLOORS
    csvRows.push("FLOORS");
    csvRows.push(",,,,,");
    const curFloors = Array.from({ length: NUM_FLOORS }, (_, i) => data.floor.data[i] ?? null);
    const keys = data.floor.keys;
    csvRows.push(keys.join(","));
    for (const row of curFloors) {
      if (row == null) {
        csvRows.push(",,,,,");
      } else {
        const values = keys.map((k: string) => {
          const val = row[k] === null || row[k] === undefined ? "" : row[k];
          return `"${val}"`; // wrap in quotes to handle commas
        });
        csvRows.push(values.join(","));
      }
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
    exportToCSV(allData, projectData?.title + ".csv");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Link href="/projectdashboard" className="text-sm font-medium transition-colors hover:text-primary">
            <Button type="button" className="mb-6 text-muted-foreground" variant="link" size={null}>
              <Icons.chevronLeft className="h-5 w-5" /> {t("backButton")}
            </Button>
          </Link>

          <TypographyH2 className="mt-2 font-bold">{projectData?.title}</TypographyH2>

          <div className="mb-6 mt-4 flex flex-nowrap items-center gap-2">
            {/* Dropdown for selecting a floor */}
            <div className="flex-shrink-0">
            <Select
              value={currentFloorId ?? undefined} // Convert null to undefined
                onValueChange={(value) => changeFloor(value)}
              >
                <SelectTrigger className="min-w-[140px] px-4 py-2">
                  {/* Added a minimum width and adjusted padding */}
                  <SelectValue>
                    {currentFloorId === "all"
                      ? t("selectAllFloors")
                      : projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {projectData?.floors
                      ?.slice()
                      .sort((a, b) => {
                        const floorNumberA = parseInt(a.name.match(/\d+/)?.[0] || "0", 10);
                        const floorNumberB = parseInt(b.name.match(/\d+/)?.[0] || "0", 10);

                        return floorNumberA - floorNumberB;
                      })
                      .map((floor: Floor) => (
                        <SelectItem key={floor.floor_id} value={floor.floor_id.toString()}>
                          {floor.name}
                        </SelectItem>
                      ))}
                    <SelectItem value="all">{t("selectAllFloors")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Add Floor Button */}
            <AddDialog
              Form1={FloorsForm}
              Form2={FloorDetailsForm}
              form1Title={t("newFloor")}
              form2Title={t("floorDetailsTitle")}
              form1Description={t("floorElementDescription")}
              form2Description={t("floorDetailsDescription")}
              buttonClass="bg-green-700 text-green-50 px-4 py-2 min-h-[40px] h-auto"
              buttonName={t("addFloorButton")}
              dbname="floors"
              projectId={params.projectId}
              onDataAdded={(passed_floorID) => {
                if (passed_floorID) {
                  setCurrentFloorId(passed_floorID.toString());
                  setDataVersion((prevVersion) => prevVersion + 1);
                }
              }}
            />

            {/* Edit Floor Button */}
            {currentFloorId !== "all" && currentFloor && (
              <EditDialog
                elementType="floor"
                DetailsForm={FloorDetailsForm}
                itemData={currentFloor}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                buttonClass="bg-blue-700 text-blue-50 px-4 py-2 min-h-[40px] h-auto"
                buttonName={t("floorDetailsTitle")}
                onDataUpdated={() => setDataVersion((prevVersion) => prevVersion + 1)}
              />
            )}

            {/* Delete Floor Button */}
            {currentFloorId !== "all" && currentFloor && (
              <DeleteDialog
                itemData={projectData?.floors?.find((floor) => floor.floor_id.toString() === currentFloorId)}
                onDelete={() => {
                  // Custom logic after deletion
                  setCurrentFloorId(null);
                  setDataVersion((prevVersion) => prevVersion + 1);
                }}
                elementType={"Floor"}
                buttonClass="bg-red-700 text-red-50 px-4 py-2 min-h-[40px] h-auto"
              />
            )}
          </div>

          {currentFloorId !== "all" && (
            <div>
              {imgUrl ? (
                // Render the uploaded image
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative h-64 w-full cursor-pointer">
                      <Image src={imgUrl} alt="Floor Plan" fill style={{ objectFit: "contain" }} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="h-fit max-h-[95vh] w-fit max-w-[95vw]">
                    <DialogHeader>
                      <DialogTitle>{t("floorPlan")}</DialogTitle>
                    </DialogHeader>
                    <div className="relative h-[80vh] w-[90vw]">
                      <Image src={imgUrl} alt="Floor Plan" fill style={{ objectFit: "contain" }} quality={100} />
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                // Render a prompt to upload an image
                <div className="flex h-64 w-full items-center justify-center border border-dashed border-gray-300">
                  <p className="text-gray-500">{t("floorPlanPlaceholder")}</p>
                </div>
              )}

              <div className="flex justify-center">
                <input type="file" id="file-upload" className="hidden" onChange={handleUpload} />
                <label
                  htmlFor="file-upload"
                  className="mb-6 mt-5 inline-flex cursor-pointer items-center rounded-md bg-secondary px-4 py-2 text-sm"
                >
                  <Icons.upload className="mr-2 h-5 w-5" />
                  <span>{t("uploadButton")}</span>
                </label>
              </div>

              <div className="mb-6 w-full rounded-md bg-red-100/80 p-2 text-center text-sm text-red-800">
                {t("architectExportDisclaimer")}
              </div>
            </div>
          )}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="walls" className="mb-3 rounded-lg bg-primary-foreground px-4 py-1">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="flex-grow">
                  {t("wallsTitle")} {"(" + (currentFloorData?.walls ? currentFloorData?.walls.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={(props) => (
                    <WallForm
                      {...props}
                      floors={projectData?.floors || []}
                      defaultFloorId={currentFloorId} // Replace `1` with the desired floor_id
                    />
                  )}
                  Form2={WallDetailsForm}
                  form1Title={t("newWall")}
                  form2Title={t("wallDetailsTitle")}
                  form1Description={t("wallElementDescription")}
                  form2Description={t("wallDetailsDescription")}
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
                  {t("columnsTitle")} {"(" + (currentFloorData?.columns ? currentFloorData?.columns.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={(props) => (
                    <ColumnsForm
                      {...props}
                      floors={projectData?.floors || []}
                      defaultFloorId={currentFloorId} // Replace `1` with the desired floor_id
                    />
                  )}
                  Form2={ColumnDetailsForm}
                  form1Title={t("newColumn")}
                  form2Title={t("columnDetailsTitle")}
                  form1Description={t("columnElementDescription")}
                  form2Description={t("columnDetailsDescription")}
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
                  {t("beamsTitle")} {"(" + (currentFloorData?.beams ? currentFloorData?.beams.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={(props) => (
                    <BeamForm
                      {...props}
                      floors={projectData?.floors || []}
                      defaultFloorId={currentFloorId} // Replace `1` with the desired floor_id
                    />
                  )}
                  Form2={BeamDetailsForm}
                  form1Title={t("newBeam")}
                  form2Title={t("beamDetailsTitle")}
                  form1Description={t("beamElementDescription")}
                  form2Description={t("beamDetailsDescription")}
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
                      name={beam.name ?? t("unknownBeam")}
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
                  {t("ceilingsTitle")}{" "}
                  {"(" + (currentFloorData?.ceilings ? currentFloorData?.ceilings.length : 0) + ")"}
                </AccordionTrigger>
                <AddDialog
                  Form1={(props) => (
                    <CeilingForm
                      {...props}
                      floors={projectData?.floors || []}
                      defaultFloorId={currentFloorId} // Replace `1` with the desired floor_id
                    />
                  )}
                  Form2={CeilingDetailsForm}
                  form1Title={t("newCeiling")}
                  form2Title={t("ceilingDetailsTitle")}
                  form1Description={t("ceilingElementDescription")}
                  form2Description={t("ceilingDetailsDescription")}
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
                      name={ceiling.name || t("unknownCeiling")}
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
              {t("exportAsCSV")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
