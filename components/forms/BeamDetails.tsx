"use client";

import { beamDetailsFormSchema, type BeamDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface BeamDetailsFormProps {
  onSave: (data: BeamDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const BeamDetailsForm: React.FC<BeamDetailsFormProps> = ({ onSave, onCancel, onDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeamDetailsFormSchema>({
    resolver: zodResolver(beamDetailsFormSchema),
  });

  const onSubmit = (data: BeamDetailsFormSchema) => {
    console.log("BeamDetailsForm Submitted Data:", data);
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
          className={`mt-1 block w-full rounded-md border ${errors.length ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
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
          className={`mt-1 block w-full rounded-md border ${errors.width ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
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
          className={`mt-1 block w-full rounded-md border ${errors.height ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
      </div>

      {/* Support Left Side Field */}
      <div>
        <label htmlFor="support_left_side" className="block text-sm font-medium text-gray-700">
          Support Left Side
        </label>
        <select
          id="support_left_side"
          {...register("support_left_side")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${errors.support_left_side ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select support left side
          </option>
          <option value="Column">Column</option>
          <option value="Wall">Wall</option>
          <option value="Beam">Beam</option>
          <option value="Overhanging">Overhanging</option>
        </select>
        {errors.support_left_side && <p className="mt-1 text-sm text-red-600">{errors.support_left_side.message}</p>}
      </div>

      {/* Support Right Side Field */}
      <div>
        <label htmlFor="support_right_side" className="block text-sm font-medium text-gray-700">
          Support Right Side
        </label>
        <select
          id="support_right_side"
          {...register("support_right_side")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${errors.support_right_side ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select support right side
          </option>
          <option value="Column">Column</option>
          <option value="Wall">Wall</option>
          <option value="Beam">Beam</option>
          <option value="Overhanging">Overhanging</option>
        </select>
        {errors.support_right_side && <p className="mt-1 text-sm text-red-600">{errors.support_right_side.message}</p>}
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
          className={`mt-1 block w-full rounded-md border ${errors.type ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="Curved sole">Curved sole</option>
          <option value="Flat sole">Flat sole</option>
          <option value="Inverted Sole">Inverted Sole</option>
          <option value="Curved">Curved</option>
          <option value="Flat">Flat</option>
          <option value="Inverted">Inverted</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
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
          className={`mt-1 block w-full rounded-md border ${errors.condition ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
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
