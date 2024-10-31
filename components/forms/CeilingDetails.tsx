// src/components/forms/CeilingDetailsForm.tsx
"use client";

import { ceilingDetailsFormSchema, type CeilingDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface CeilingDetailsFormProps {
  onSave: (data: CeilingDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CeilingDetailsForm: React.FC<CeilingDetailsFormProps> = ({ onSave, onCancel, onDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CeilingDetailsFormSchema>({
    resolver: zodResolver(ceilingDetailsFormSchema),
  });

  const onSubmit = (data: CeilingDetailsFormSchema) => {
    console.log("CeilingDetailsForm Submitted Data:", data); // Debugging
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Height Field */}
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height
        </label>
        <input
          type="number"
          id="height"
          {...register("height", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.height ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
      </div>

      {/* Dimension X Field */}
      <div>
        <label htmlFor="dimensionX" className="block text-sm font-medium text-gray-700">
          Dimension X
        </label>
        <input
          type="number"
          id="dimensionX"
          {...register("dimensionX", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.dimensionX ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.dimensionX && <p className="mt-1 text-sm text-red-600">{errors.dimensionX.message}</p>}
      </div>

      {/* Dimension Y Field */}
      <div>
        <label htmlFor="dimensionY" className="block text-sm font-medium text-gray-700">
          Dimension Y
        </label>
        <input
          type="number"
          id="dimensionY"
          {...register("dimensionY", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.dimensionY ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.dimensionY && <p className="mt-1 text-sm text-red-600">{errors.dimensionY.message}</p>}
      </div>

      {/* Direction of Joints Field */}
      <div>
        <label htmlFor="directionOfJoints" className="block text-sm font-medium text-gray-700">
          Direction of Joints
        </label>
        <select
          id="directionOfJoints"
          {...register("directionOfJoints")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.directionOfJoints ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select direction
          </option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </select>
        {errors.directionOfJoints && <p className="mt-1 text-sm text-red-600">{errors.directionOfJoints.message}</p>}
      </div>

      {/* Cracks Field */}
      <div>
        <label htmlFor="cracks" className="block text-sm font-medium text-gray-700">
          Cracks
        </label>
        <select
          id="cracks"
          {...register("cracks")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.cracks ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.cracks && <p className="mt-1 text-sm text-red-600">{errors.cracks.message}</p>}
      </div>

      {/* Pipes Field */}
      <div>
        <label htmlFor="pipes" className="block text-sm font-medium text-gray-700">
          Pipes
        </label>
        <input
          type="number"
          id="pipes"
          {...register("pipes", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.pipes ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.pipes && <p className="mt-1 text-sm text-red-600">{errors.pipes.message}</p>}
      </div>

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

export default CeilingDetailsForm;
