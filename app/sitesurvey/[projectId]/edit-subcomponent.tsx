"use client";
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
  elementType: string; // Extend as needed
  DetailsForm: React.ComponentType<DetailsFormProps>;
  // Optional: You can add more props for customization if needed
}

export interface DetailsFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  onDelete?: () => void; // Optional: Not all forms might need delete
}

export default function EditDialog({ elementType, DetailsForm }: AddDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (data: any) => {
    console.log("Wall Details Data:", data);
    // Handle save logic here
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
    // Handle delete logic here
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-2 bg-blue-700 text-blue-50">
          <Icons.pencil className="mr-2 h-5 w-5" /> 
          <span className="mr-1">
            Edit
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left leading-relaxed">{elementType} Details</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <DetailsForm onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} />
      </DialogContent>
    </Dialog>
  );
}
