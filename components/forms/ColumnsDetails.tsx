"use client";

import { columnDetailsFormSchema, type ColumnDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface ColumnDetailsFormProps {
  onSave: (data: ColumnDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const ColumnDetailsForm: React.FC<ColumnDetailsFormProps> = ({ onSave, onCancel, onDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnDetailsFormSchema>({
    resolver: zodResolver(columnDetailsFormSchema),
  });

  const onSubmit = (data: ColumnDetailsFormSchema) => {
    console.log("ColumnDetailsForm Submitted Data:", data); // Debugging
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
          className={`mt-1 block w-full rounded-md border ${
            errors.length ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
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
          className={`mt-1 block w-full rounded-md border ${
            errors.width ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
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
          className={`mt-1 block w-full rounded-md border ${
            errors.height ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
      </div>

      {/* Condition Field */}
      <div>
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
          Condition
        </label>
        <select
          id="condition"
          {...register("condition")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.condition ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select condition
          </option>
          <option value="Seleccionar">Seleccionar</option>
        </select>
        {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
      </div>

      {/* Vertical Cracks Field */}
      <div>
        <label htmlFor="verticalCracks" className="block text-sm font-medium text-gray-700">
          Vertical Cracks
        </label>
        <select
          id="verticalCracks"
          {...register("verticalCracks")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.verticalCracks ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.verticalCracks && <p className="mt-1 text-sm text-red-600">{errors.verticalCracks.message}</p>}
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

export default ColumnDetailsForm;
