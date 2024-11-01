import BeamDetailsForm from "@/components/forms/BeamDetails";
import CeilingDetailsForm from "@/components/forms/CeilingDetails";
import ColumnDetailsForm from "@/components/forms/ColumnsDetails";
import FloorDetailsForm from "@/components/forms/FloorDetails";
import WallDetailsForm from "@/components/forms/WallDetailsForm";
import DeleteDialog from "./delete-subcomponent";
import { EditDialog } from "./edit-subcomponent";

export default function Subcomponent({
  name,
  type,
  itemData,
  onUpdate
}: {
  name: string,
  type: "Wall" | "Column" | "Beam" | "Floor" | "Ceiling",
  itemData: any,
  onUpdate: (updatedData: any) => void
}) {
  const formMapping = {
    Wall: WallDetailsForm,
    Column: ColumnDetailsForm,
    Beam: BeamDetailsForm,
    Floor: FloorDetailsForm,
    Ceiling: CeilingDetailsForm,
  };

  const dform : any = formMapping[type] as any;

  return (
    <div className="mt-2 flex flex-wrap items-center justify-between rounded-lg bg-secondary p-3 pl-4">
      {name}
      <div>
        <EditDialog
          elementType={type}
          DetailsForm={dform}
          itemData={itemData}
          onUpdate={onUpdate}
          />
        <DeleteDialog />
      </div>
    </div>
  );
}
