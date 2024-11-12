"use client";
import { useSupabase } from "@/app/providers";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface AddDetailsDialogProps {
  onUpdate: (updatedData: any) => void;
  elementType: string; // Extend as needed
  DetailsForm: React.ComponentType<DetailsFormProps>;
  itemData: any; // data to be passed in and rendered in the details form
  buttonName?: string;
}

export interface DetailsFormProps {
  itemData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  onDelete?: () => void; // Optional: Not all forms might need delete
}

export function EditDialog({ elementType, DetailsForm, itemData, onUpdate, buttonName }: AddDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const supabase = useSupabase();
  const getTableName = (type: string) => {
    return type.toLowerCase() + "s";
  };
  console.log("EditDialog itemData:", itemData);

  const handleSave = async (data: any) => {
    try {
      const tableName = getTableName(elementType);
      const idField = tableName === "floors" ? "floor_id" : "id";
      const idValue = tableName === "floors" ? itemData.floor_id : itemData.id;

      const { data: updatedData, error } = await supabase
        .from(tableName)
        .update({ ...data })
        .eq(idField, idValue)
        .select()
        .single();

      if (error || !updatedData) {
        console.error("Error updating item:", error);
        return;
      }

      onUpdate({
        ...itemData,
        ...updatedData,
        elementType,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    // console.log("Delete action triggered");
    // Handle delete logic here
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-2 bg-blue-700 text-blue-50">
          <Icons.pencil className="mr-2 h-4 w-4" />
          <span className="mr-1">{buttonName ?? "Details"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left leading-relaxed">{elementType} Details</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <DetailsForm onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} itemData={itemData} />
      </DialogContent>
    </Dialog>
  );
}
