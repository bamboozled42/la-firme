// src/components/forms/CeilingDetailsForm.tsx
"use client";

import { ceilingDetailsFormSchema, type CeilingDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { type Ceiling, toCamelCase, toSnakeCase } from "../../lib/utils";

interface CeilingDetailsFormProps {
  itemData: Ceiling;
  onSave: (data: CeilingDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CeilingDetailsForm: React.FC<CeilingDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const defaultValues = itemData ? itemData : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CeilingDetailsFormSchema>({
    resolver: zodResolver(ceilingDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: CeilingDetailsFormSchema) => {
    // console.log("CeilingDetailsForm Submitted Data:", data); // Debugging
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
        <label htmlFor="dimension_x" className="block text-sm font-medium text-gray-700">
          Dimension X
        </label>
        <input
          type="number"
          id="dimension_x"
          {...register("dimension_x", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.dimension_x ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.dimension_x && <p className="mt-1 text-sm text-red-600">{errors.dimension_x.message}</p>}
      </div>

      {/* Dimension Y Field */}
      <div>
        <label htmlFor="dimension_y" className="block text-sm font-medium text-gray-700">
          Dimension Y
        </label>
        <input
          type="number"
          id="dimension_y"
          {...register("dimension_y", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.dimension_y ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.dimension_y && <p className="mt-1 text-sm text-red-600">{errors.dimension_y.message}</p>}
      </div>

      {/* Direction of Joints Field */}
      <div>
        <label htmlFor="direction_of_joints" className="block text-sm font-medium text-gray-700">
          Direction of Joints
        </label>
        <select
          id="direction_of_joints"
          {...register("direction_of_joints")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.direction_of_joints ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select direction
          </option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </select>
        {errors.direction_of_joints && (
          <p className="mt-1 text-sm text-red-600">{errors.direction_of_joints.message}</p>
        )}
      </div>

      {/* Cracks Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="cracks" className="block text-sm font-medium text-gray-700 mr-2">
          Cracks
        </label>
        <input
          type="checkbox"
          id="cracks"
          {...register("cracks")}
          className={`h-4 w-4 text-green-600 border-gray-300 rounded ${
            errors.cracks ? "border-red-600" : ""
          }`}
        />
      </div>
      {errors.cracks && <p className="mt-1 text-sm text-red-600">{errors.cracks.message}</p>}

      {/* Pipes Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="pipes" className="block text-sm font-medium text-gray-700 mr-2">
          Pipes
        </label>
        <input
          type="checkbox"
          id="pipes"
          {...register("pipes")}
          className={`h-4 w-4 text-green-600 border-gray-300 rounded ${
            errors.pipes ? "border-red-600" : ""
          }`}
        />
      </div>
      {errors.pipes && <p className="mt-1 text-sm text-red-600">{errors.pipes.message}</p>}

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