// src/components/AddDialog.tsx
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
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { useTranslation } from "../../../i18n/client";
import { type Floor } from "../../../lib/utils";

interface AddDialogProps {
  Form1: React.FC<any>;
  Form2: React.FC<any>;
  form1Title?: string;
  form2Title?: string;
  form1Description?: string;
  form2Description?: string;
  buttonClass?: string;
  buttonName?: string;
  dbname: string;
  projectId: string;
  onDataAdded?: (floor_name?: string) => void;
  floors?: Floor[];
}

export default function AddDialog({
  Form1,
  Form2,
  form1Title = "Form 1",
  form2Title = "Form 2",
  form1Description = "Please provide the information for Form 1.",
  form2Description = "Please provide the information for Form 2.",
  buttonClass,
  buttonName,
  dbname,
  projectId,
  floors,
  onDataAdded,
}: AddDialogProps) {
  const { i18n, t } = useTranslation("common");

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form1" | "form2">("form1");
  const [formData, setFormData] = useState<any>({});

  const handleNext = async (data: any) => {
    let existingData = null;
    let fetchError = null;

    if (dbname == "floors") {
      ({ data: existingData, error: fetchError } = await supabase
        .from(dbname)
        .select("floor_id")
        .eq("name", data.name)
        .eq("projectId", projectId)
        .single());
    } else if (dbname == "walls") {
      ({ data: existingData, error: fetchError } = await supabase
        .from(dbname)
        .select("id") // Adjust this to the primary key or relevant field
        .eq("name", data.name) // Assuming `name` is the unique field to check
        .eq("projectId", projectId)
        .eq("floor_id", data.floor_id)
        .eq("direction", data.direction)
        .single());
    } else {
      ({ data: existingData, error: fetchError } = await supabase
        .from(dbname)
        .select("id") // Adjust this to the primary key or relevant field
        .eq("name", data.name) // Assuming `name` is the unique field to check
        .eq("projectId", projectId)
        .eq("floor_id", data.floor_id)
        .single());
    }

    if (existingData) {
      alert(t("duplicateNameError"));
      return;
    }

    setFormData(data);
    setStep("form2");
  };

  const handleCancel = () => {
    setStep("form1");
    setFormData({});
    setIsOpen(false);
  };

  const handleSave = async (data: any) => {
    const completeData = { ...formData, ...data, projectId }; // Combine data from both forms
    console.log("Complete Data:", completeData);
    console.log(data);

    // Insert combined data into Supabase
    const { data: supabaseData, error } = await supabase.from(dbname).insert([completeData]);

    if (!error && onDataAdded) {
      if (dbname === "floors") {
        // Fetch floor_id for the newly added floor
        const { data: floorData, error: fetchError } = await supabase
          .from("floors")
          .select("floor_id")
          .eq("name", completeData.name)
          .eq("projectId", completeData.projectId)
          .single();

        if (fetchError || !floorData) {
          console.error("Error fetching floor_id:", fetchError);
        } else {
          // Pass the floor_id to onDataAdded
          onDataAdded(floorData.floor_id);
        }
      } else {
        // For other database tables, invoke onDataAdded without floor-specific logic
        onDataAdded();
      }
    } else {
      console.error("Error inserting data into Supabase:", error);
    }

    // Reset state and close dialog
    setFormData({});
    setStep("form1");
    setIsOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    setFormData({});
    setStep("form1");
    setIsOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      setStep("form1");
      setFormData({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className={buttonClass || "bg-green-700 text-green-50"}>
          <Icons.add className="mr-2 h-4 w-4" />
          <span className="mr-1">{buttonName || t("add")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left leading-relaxed">
            {step === "form1" ? form1Title : form2Title}
          </DialogTitle>
          <DialogDescription id="dialog-description">
            {step === "form1" ? form1Description : form2Description}
          </DialogDescription>
        </DialogHeader>
        {step === "form1" ? (
          <Form1 onNext={handleNext} onCancel={handleCancel} floors={floors || []} />
        ) : (
          <Form2 onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} />
        )}
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
