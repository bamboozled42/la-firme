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
    // console.log("ColumnDetailsForm Submitted Data:", data); // Debugging
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
          <option value="Bad">Bad</option>
          <option value="Good">Good</option>
        </select>
        {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
      </div>

      {/* Type Field */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          {...register("type")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.type ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="Column of 'arriostramiento'">Column of &apos;arriostramiento&apos;</option>
          <option value="Independent column">Independent column</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
      </div>

      {/* Vertical Cracks Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="verticalCracks" className="block text-sm font-medium text-gray-700 mr-2">
          Vertical cracks
        </label>
        <input
          type="checkbox"
          id="verticalCracks"
          {...register("vertical_cracks")}
          className={`h-4 w-4 text-green-600 border-gray-300 rounded ${
            errors.vertical_cracks ? "border-red-600" : ""
          }`}
        />
      </div>
      {errors.vertical_cracks && <p className="mt-1 text-sm text-red-600">{errors.vertical_cracks.message}</p>}

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

export default ColumnDetailsForm;