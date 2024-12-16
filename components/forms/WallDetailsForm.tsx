"use client";

import { wallDetailsFormSchema, type WallDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { type Wall } from "../../lib/utils";

interface WallDetailsFormProps {
  itemData: Wall;
  onSave: (data: WallDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const WallDetailsForm: React.FC<WallDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const defaultValues = itemData ? itemData : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WallDetailsFormSchema>({
    resolver: zodResolver(wallDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: WallDetailsFormSchema) => {
    console.log("WallDetailsForm Submitted Data:", data); // Debugging
    onSave(data);
  };

  // Define the fields
  const generalFields = [
    { id: "material", label: "Material", options: ["KK", "P", "C", "Drywall", "Seleccionar"], type: "select" },
    { id: "height_type", label: "Full or Partial Height", options: ["High", "Low"], type: "select" },
    { id: "wallRepeatFloors", label: "Wall Repeat Floors", options: ["Yes", "No"], type: "checkbox" },
    { id: "location", label: "Location", options: ["Perimeter", "Internal"], type: "select" },
    { id: "stucco", label: "Stucco", options: ["Only inside", "Only outside", "Inside and outside", "No stucco"], type: "select" },
  ];

  const fhFields = [
    { id: "fh1CrackInBeam", label: "FH1 Crack in Beam", type: "checkbox" },
    { id: "fh2CrackInWallCeiling", label: "FH2 Crack in Wall Ceiling", type: "checkbox" },
    { id: "fh3CrackInCeiling", label: "FH3 Crack in Ceiling", type: "checkbox" },
    { id: "fh4CrackInCeiling", label: "FH4 Crack in Ceiling", type: "checkbox" },
  ];

  const fvFields = [
    { id: "fv1VerticalCrackColumnWall", label: "FV1 Vertical Crack Column Wall", type: "checkbox" },
    { id: "fv2VerticalCrackColumn", label: "FV2 Vertical Crack Column", type: "checkbox" },
  ];

  const lFields = [
    { id: "l1IrregularBrick", label: "L1 Irregular Brick", type: "checkbox" },
    { id: "l2BricksWithExcessiveHoles", label: "L2 Bricks with Excessive Holes", type: "checkbox" },
    { id: "l3WallsNotWellAligned", label: "L3 Walls Not Well Aligned", type: "checkbox" },
    { id: "l4IncompleteMortarInBrick", label: "L4 Incomplete Mortar in Brick", type: "checkbox" },
    { id: "l5VariationInThicknessJoints", label: "L5 Variation in Thickness Joints", type: "checkbox" },
    { id: "l6MortarJointsTooThick", label: "L6 Mortar Joints Too Thick", type: "checkbox" },
    { id: "l7PoorAdhesion", label: "L7 Poor Adhesion", type: "checkbox" },
  ];

  const perforatingFields = [
    { id: "perforatingColumn", label: "Perforating Column", type: "checkbox" },
    { id: "perforatingBeam", label: "Perforating Beam", type: "checkbox" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General Information */}
      <section>
        <h2 className="text-lg font-semibold">General Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          {/* Window Size X Field */}
          <div>
            <label htmlFor="window_size_x" className="block text-sm font-medium text-gray-700">
              Size of Window X
            </label>
            <input
              type="number"
              id="window_size_x"
              {...register("window_size_x", { valueAsNumber: true })}
              className={`mt-1 block w-full rounded-md border ${
                errors.window_size_x ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.window_size_x && <p className="mt-1 text-sm text-red-600">{errors.window_size_x.message}</p>}
          </div>

          {/* Window Size Y Field */}
          <div>
            <label htmlFor="window_size_y" className="block text-sm font-medium text-gray-700">
              Size of Window Y
            </label>
            <input
              type="number"
              id="window_size_y"
              {...register("window_size_y", { valueAsNumber: true })}
              className={`mt-1 block w-full rounded-md border ${
                errors.window_size_y ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.window_size_y && <p className="mt-1 text-sm text-red-600">{errors.window_size_y.message}</p>}
          </div>

          {/* Additional General Fields */}
          {generalFields.map((field) =>
            field.type === "checkbox" ? (
              <div key={field.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={field.id}
                  {...register(field.id as keyof WallDetailsFormSchema)}
                  className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                    errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : ""
                  }`}
                />
                <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {errors[field.id as keyof WallDetailsFormSchema] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.id as keyof WallDetailsFormSchema]?.message}
                  </p>
                )}
              </div>
            ) : (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <select
                  id={field.id}
                  {...register(field.id as keyof WallDetailsFormSchema)}
                  defaultValue=""
                  className={`mt-1 block w-full rounded-md border ${
                    errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : "border-gray-300"
                  } shadow-sm focus:border-green-500 focus:ring-green-500`}
                >
                  <option value="" disabled>
                    Select {field.label.toLowerCase()}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors[field.id as keyof WallDetailsFormSchema] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[field.id as keyof WallDetailsFormSchema]?.message}
                  </p>
                )}
              </div>
            ),
          )}
        </div>
      </section>

      {/* FH Fields */}
      <section>
        <h2 className="text-lg font-semibold">FH Fields</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fhFields.map((field) => (
            <div key={field.id} className="flex items-center">
              <input
                type="checkbox"
                id={field.id}
                {...register(field.id as keyof WallDetailsFormSchema)}
                className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                  errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : ""
                }`}
              />
              <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {errors[field.id as keyof WallDetailsFormSchema] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.id as keyof WallDetailsFormSchema]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FV Fields */}
      <section>
        <h2 className="text-lg font-semibold">FV Fields</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fvFields.map((field) => (
            <div key={field.id} className="flex items-center">
              <input
                type="checkbox"
                id={field.id}
                {...register(field.id as keyof WallDetailsFormSchema)}
                className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                  errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : ""
                }`}
              />
              <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {errors[field.id as keyof WallDetailsFormSchema] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.id as keyof WallDetailsFormSchema]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* L Fields */}
      <section>
        <h2 className="text-lg font-semibold">L Fields</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {lFields.map((field) => (
            <div key={field.id} className="flex items-center">
              <input
                type="checkbox"
                id={field.id}
                {...register(field.id as keyof WallDetailsFormSchema)}
                className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                  errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : ""
                }`}
              />
              <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {errors[field.id as keyof WallDetailsFormSchema] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.id as keyof WallDetailsFormSchema]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Perforating Fields */}
      <section>
        <h2 className="text-lg font-semibold">Perforating Fields</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {perforatingFields.map((field) => (
            <div key={field.id} className="flex items-center">
              <input
                type="checkbox"
                id={field.id}
                {...register(field.id as keyof WallDetailsFormSchema)}
                className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 ${
                  errors[field.id as keyof WallDetailsFormSchema] ? "border-red-600" : ""
                }`}
              />
              <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {errors[field.id as keyof WallDetailsFormSchema] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.id as keyof WallDetailsFormSchema]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
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