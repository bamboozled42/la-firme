// src/components/forms/WallDetailsForm.tsx
"use client";
import { wallDetailsFormSchema, type WallDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface WallDetailsFormProps {
  onSave: (data: WallDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const WallDetailsForm: React.FC<WallDetailsFormProps> = ({ onSave, onCancel, onDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WallDetailsFormSchema>({
    resolver: zodResolver(wallDetailsFormSchema),
  });

  const onSubmit = (data: WallDetailsFormSchema) => {
    console.log("WallDetailsForm Submitted Data:", data);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Length Field */}
      <div>
        <label htmlFor="length" className="block text-sm font-medium text-gray-700">
          Length
        </label>
        <input
          type="number"
          id="length"
          {...register("length", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.length && <p className="mt-1 text-sm text-red-600">{errors.length.message}</p>}
      </div>

      {/* Width Field */}
      <div>
        <label htmlFor="width" className="block text-sm font-medium text-gray-700">
          Width
        </label>
        <input
          type="number"
          id="width"
          {...register("width", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.width && <p className="mt-1 text-sm text-red-600">{errors.width.message}</p>}
      </div>

      {/* Height Field */}
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height
        </label>
        <input
          type="number"
          id="height"
          {...register("height", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
      </div>

      {/* Window Size Fields */}
      <div>
        <label htmlFor="sizeOfWindowX" className="block text-sm font-medium text-gray-700">
          Size of Window X
        </label>
        <input
          type="number"
          id="sizeOfWindowX"
          {...register("sizeOfWindowX", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.sizeOfWindowX && <p className="mt-1 text-sm text-red-600">{errors.sizeOfWindowX.message}</p>}
      </div>
      <div>
        <label htmlFor="sizeOfWindowY" className="block text-sm font-medium text-gray-700">
          Size of Window Y
        </label>
        <input
          type="number"
          id="sizeOfWindowY"
          {...register("sizeOfWindowY", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.sizeOfWindowY && <p className="mt-1 text-sm text-red-600">{errors.sizeOfWindowY.message}</p>}
      </div>

      {/* Additional Select Fields */}
      {[
        { id: "material", label: "Material", options: ["KK", "P", "C", "Drywall", "Seleccionar"] },
        { id: "fullOrPartialHeight", label: "Full or Partial Height", options: ["High", "Low"] },
        { id: "wallRepeatFloors", label: "Wall Repeat Floors", options: ["Yes", "No"] },
        { id: "location", label: "Location", options: ["Perimeter", "Internal"] },
        { id: "stucco", label: "Stucco", options: ["Only inside", "Only outside", "Inside and outside", "No stucco"] },
        { id: "fh1CrackInBeam", label: "FH1 Crack in Beam", options: ["Yes", "No"] },
        { id: "fh2CrackInWallCeiling", label: "FH2 Crack in Wall Ceiling", options: ["Yes", "No"] },
        { id: "fh3CrackInCeiling", label: "FH3 Crack in Ceiling", options: ["Yes", "No"] },
        { id: "fh4CrackInCeiling", label: "FH4 Crack in Ceiling", options: ["Yes", "No"] },
        { id: "fv1VerticalCrackColumnWall", label: "FV1 Vertical Crack Column Wall", options: ["Yes", "No"] },
        { id: "fv2VerticalCrackColumn", label: "FV2 Vertical Crack Column", options: ["Yes", "No"] },
        { id: "l1IrregularBrick", label: "L1 Irregular Brick", options: ["Yes", "No"] },
        { id: "l2BricksWithExcessiveHoles", label: "L2 Bricks with Excessive Holes", options: ["Yes", "No"] },
        { id: "l3WallsNotWellAligned", label: "L3 Walls Not Well Aligned", options: ["Yes", "No"] },
        { id: "l4IncompleteMortarInBrick", label: "L4 Incomplete Mortar in Brick", options: ["Yes", "No"] },
        { id: "l5VariationInThicknessJoints", label: "L5 Variation in Thickness Joints", options: ["Yes", "No"] },
        { id: "l6MortarJointsTooThick", label: "L6 Mortar Joints Too Thick", options: ["Yes", "No"] },
        { id: "l7PoorAdhesion", label: "L7 Poor Adhesion", options: ["Yes", "No"] },
        { id: "perforatingColumn", label: "Perforating Column", options: ["Yes", "No"] },
        { id: "perforatingBeam", label: "Perforating Beam", options: ["Yes", "No"] },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <select
            id={field.id}
            {...register(field.id as keyof WallDetailsFormSchema)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors[field.id as keyof WallDetailsFormSchema] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.id as keyof WallDetailsFormSchema]?.message}</p>
          )}
        </div>
      ))}

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default WallDetailsForm;
