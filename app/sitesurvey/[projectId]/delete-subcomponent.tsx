import { useSupabase } from "@/app/providers";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/delete-confirmation";
import { useTranslation } from "../../../i18n/client";

export default function DeleteSubcomponentDialog({
  elementType,
  itemData,
  onDelete,
}: {
  elementType: string;
  itemData: any;
  onDelete: (deletedItem: any) => void;
}) {
  const { t } = useTranslation("common");
  const supabase = useSupabase();

  const getTableName = (type: string) => {
    return type.toLowerCase() + "s";
  };

  const handleDelete = async () => {
    if (!itemData) return; // Prevent deletion if itemData is null or undefined
    try {
      const tableName = getTableName(elementType);

      let error;
      if (elementType === "Floor") {
        // Delete based on "floor_id" if the element is a Floor
        const { error: floorError } = await supabase.from(tableName).delete().eq("floor_id", itemData.floor_id);
        error = floorError;
        console.log("Deleting Floor:", itemData);
      } else {
        // Default delete operation for other elements
        const { error: defaultError } = await supabase.from(tableName).delete().eq("id", itemData.id);
        error = defaultError;
      }

      if (error) {
        console.error("Error deleting data:", error);
        return;
      }

      onDelete({
        ...itemData,
        elementType: elementType,
      });
    } catch (error) {
      // console.error('Error deleting item:', error);
    }
  };

  return (
    <DeleteDialog name={itemData.name} onDelete={handleDelete}>
      <Button size="sm" className="ml-2 bg-destructive text-blue-50">
        <Icons.trash className="h-4 w-4" />
      </Button>
    </DeleteDialog>
  );
}
