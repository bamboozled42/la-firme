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
import React, { useState } from "react";

interface AddDialogProps {
  Form1: React.FC<any>;
  Form2: React.FC<any>;
  form1Title?: string;
  form2Title?: string;
  form1Description?: string;
  form2Description?: string;
  buttonClass?: string;
  buttonName?: string;
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
}: AddDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form1" | "form2">("form1");
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData(data);
    setStep("form2");
  };

  const handleCancel = () => {
    setStep("form1");
    setFormData({});
    setIsOpen(false);
  };

  const handleSave = (data: any) => {
    // const completeData = { ...formData, ...data };
    // console.log("Complete Data:", completeData);
    // Handle save logic here (e.g., send to API)
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
          <Icons.add className="mr-2 h-5 w-5"/>
          <span className="mr-1">
            {buttonName || "Add"}
          </span>
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
          <Form1 onNext={handleNext} onCancel={handleCancel} />
        ) : (
          <Form2 onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} />
        )}
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
