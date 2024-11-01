"use client";

import { beamDetailsFormSchema, type BeamDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Beam, toCamelCase, toSnakeCase } from "../../lib/utils";

interface BeamDetailsFormProps {
  itemData: Beam;
  onSave: (data: BeamDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
  data: any;
}

const BeamDetailsForm: React.FC<BeamDetailsFormProps> = ({ itemData, onSave, onCancel, onDelete }) => {
  const defaultValues = toCamelCase(itemData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeamDetailsFormSchema>({
    resolver: zodResolver(beamDetailsFormSchema),
    defaultValues
  });

  const onSubmit = (data: BeamDetailsFormSchema) => {
    const snakeData = toSnakeCase(data);
    console.log("BeamDetailsForm Submitted Data:", data); // Debugging
    onSave(snakeData as BeamDetailsFormSchema);
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

      {/* Support Left Side Field */}
      <div>
        <label htmlFor="supportLeftSide" className="block text-sm font-medium text-gray-700">
          Support Left Side
        </label>
        <select
          id="supportLeftSide"
          {...register("supportLeftSide")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.supportLeftSide ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.supportLeftSide && <p className="mt-1 text-sm text-red-600">{errors.supportLeftSide.message}</p>}
      </div>

      {/* Support Right Side Field */}
      <div>
        <label htmlFor="supportRightSide" className="block text-sm font-medium text-gray-700">
          Support Right Side
        </label>
        <select
          id="supportRightSide"
          {...register("supportRightSide")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.supportRightSide ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.supportRightSide && <p className="mt-1 text-sm text-red-600">{errors.supportRightSide.message}</p>}
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
          {/* Replace the options below with actual condition values */}
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
        {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
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

export default BeamDetailsForm;
