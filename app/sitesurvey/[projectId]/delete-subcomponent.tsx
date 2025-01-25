import { useSupabase } from "@/app/providers";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function DeleteDialog({
  elementType,
  itemData,
  onDelete,
}: {
  elementType: string;
  itemData: any;
  onDelete: (deletedItem: any) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    } catch (error) {
      // console.error('Error deleting item:', error);
    }
  };

  return (
    <Dialog>
      {" "}
      {/* <Dialog open={open} onOpenChange={setOpen}> */}
      <DialogTrigger>
        <Button size="sm" className="ml-2 bg-destructive text-primary">
          <Icons.trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left leading-relaxed">
            Are you sure you want to delete {elementType} ?
          </DialogTitle>
          <DialogDescription className="text-left">You cannot undo this action.</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex">
          <Button onClick={handleDelete} type="submit" variant="destructive" className="mr-1 flex-auto">
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="button" className="ml-1 flex-auto" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
