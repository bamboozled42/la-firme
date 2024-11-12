// // src/components/AddDialog.tsx
// "use client";

// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { supabase } from "@/lib/supabase";
// import React, { useState } from "react";

// interface AddDialogProps {
//   Form1: React.FC<any>;
//   Form2: React.FC<any>;
//   form1Title?: string;
//   form2Title?: string;
//   form1Description?: string;
//   form2Description?: string;
// }

// export default function AddDialog({
//   Form1,
//   Form2,
//   form1Title = "Form 1",
//   form2Title = "Form 2",
//   form1Description = "Please provide the information for Form 1.",
//   form2Description = "Please provide the information for Form 2.",
// }: AddDialogProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [step, setStep] = useState<"form1" | "form2">("form1");
//   const [formData, setFormData] = useState<any>({});

//   // Handle submission of the first form
//   const handleNext = (data: any) => {
//     setFormData(data); // Store data from Form1
//     setStep("form2"); // Move to Form2
//   };

//   // Handle submission of the second form
//   const handleSave = async (data: any) => {
//     const completeData = { ...formData, ...data }; // Combine data from both forms
//     console.log("Complete Data:", completeData); // For debugging

//     try {
//       console.log("Saving data to Supabase...");
//       // Insert combined data into Supabase
//       const { data: supabaseData, error } = await supabase
//         .from("floors") // Replace with your table name
//         .insert([completeData]);

//       if (error) {
//         console.error("Error inserting data:", error);
//         // Optionally, show an error message to the user
//       } else {
//         console.log("Data inserted successfully:", supabaseData);
//         // Optionally, show a success message or perform additional actions
//       }
//     } catch (err) {
//       console.error("Error saving data:", err);
//       // Optionally, handle the error
//     }

//     // Reset state and close dialog
//     setFormData({});
//     setStep("form1");
//     setIsOpen(false);
//   };

//   const handleCancel = () => {
//     setStep("form1");
//     setFormData({});
//     setIsOpen(false);
//   };

//   const handleDelete = () => {
//     // Handle delete logic here if necessary
//     setFormData({});
//     setStep("form1");
//     setIsOpen(false);
//   };

//   const handleOpenChange = (newOpen: boolean) => {
//     setIsOpen(newOpen);
//     if (!newOpen) {
//       setStep("form1");
//       setFormData({});
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         <Button size="sm" className="ml-2 bg-green-700 text-green-50">
//           <Icons.add className="mr-2 h-5 w-5" /> Add
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
//         <DialogHeader>
//           <DialogTitle className="mb-2 text-left leading-relaxed">
//             {step === "form1" ? form1Title : form2Title}
//           </DialogTitle>
//           <DialogDescription id="dialog-description">
//             {step === "form1" ? form1Description : form2Description}
//           </DialogDescription>
//         </DialogHeader>
//         {step === "form1" ? (
//           <Form1 onNext={handleNext} onCancel={handleCancel} />
//         ) : (
//           <Form2 onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} />
//         )}
//         <DialogDescription />
//       </DialogContent>
//     </Dialog>
//   );
// }
