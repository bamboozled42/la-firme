// src/components/forms/WallDetailsForm.tsx
"use client";
import { wallDetailsFormSchema, type WallDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Wall, toCamelCase } from "../../lib/utils";

interface WallDetailsFormProps {
  itemData : Wall;
  onSave: (data: WallDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const WallDetailsForm: React.FC<WallDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const defaultValues = toCamelCase(itemData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WallDetailsFormSchema>({
    resolver: zodResolver(wallDetailsFormSchema),
    defaultValues
  });

  const onSubmit = (data: WallDetailsFormSchema) => {
    console.log("WallDetailsForm Submitted Data:", data); // Debugging
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

      {/* Material Field */}
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700">
          Material
        </label>
        <select
          id="material"
          {...register("material")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select material</option>
          {/* Placeholder options; replace with dynamic data as needed */}
          <option value="brick">Brick</option>
          <option value="concrete">Concrete</option>
          <option value="wood">Wood</option>
        </select>
        {errors.material && <p className="mt-1 text-sm text-red-600">{errors.material.message}</p>}
      </div>

      {/* Stucco Field */}
      <div>
        <label htmlFor="stucco" className="block text-sm font-medium text-gray-700">
          Stucco
        </label>
        <select
          id="stucco"
          {...register("stucco")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select stucco type</option>
          <option value="inside">Inside</option>
          <option value="outside">Outside</option>
        </select>
        {errors.stucco && <p className="mt-1 text-sm text-red-600">{errors.stucco.message}</p>}
      </div>

      {/* Cracks Field */}
      <div>
        <label htmlFor="cracks" className="block text-sm font-medium text-gray-700">
          Cracks
        </label>
        <select
          id="cracks"
          {...register("cracks")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select cracks severity</option>
          {/* Placeholder options; replace with dynamic data as needed */}
          <option value="none">None</option>
          <option value="minor">Minor</option>
          <option value="major">Major</option>
        </select>
        {errors.cracks && <p className="mt-1 text-sm text-red-600">{errors.cracks.message}</p>}
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

export default WallDetailsForm;
