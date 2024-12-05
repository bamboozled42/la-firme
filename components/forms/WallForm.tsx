"use client";

import { wallFormSchema, type WallFormSchema } from "@/components/forms/schemas/formSchema"; // Corrected path
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { type Floor } from "../../lib/utils";

interface WallFormProps {
  onNext: (data: WallFormSchema) => void;
  onCancel: () => void;
  floors: Floor[] | null;
}

const WallForm: React.FC<WallFormProps> = ({ onNext, onCancel, floors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WallFormSchema>({
    resolver: zodResolver(wallFormSchema),
    defaultValues: {
      name: "",
    },
  });
  console.log(floors);

  const onSubmit: SubmitHandler<WallFormSchema> = (data) => {
    const formattedName = `Wall ${data.direction}${data.name}`;
    const formattedData = { ...data, name: formattedName };

    console.log("WallForm Submitted Data:", data);
    onNext(formattedData);
  };

  const onError = (errors: FieldErrors<WallFormSchema>) => {
    console.log("Validation Errors:", errors);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(
      onSubmit,
      onError,
    )(e).catch((err) => {
      console.error("Form submission error:", err);
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`mt-1 block w-full rounded-md border px-2 ${
            errors.name ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
          placeholder="Enter wall name as a number"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Direction Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Direction</label>
        <div className="mt-1 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="X"
              {...register("direction")}
              className={`h-4 w-4 border-gray-300 text-green-500 focus:ring-green-500 ${
                errors.direction ? "border-red-600" : ""
              }`}
            />
            <span>X</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Y"
              {...register("direction")}
              className={`h-4 w-4 border-gray-300 text-green-500 focus:ring-green-500 ${
                errors.direction ? "border-red-600" : ""
              }`}
            />
            <span>Y</span>
          </label>
        </div>
        {errors.direction && <p className="mt-1 text-sm text-red-600">{errors.direction.message}</p>}
      </div>

      {/* Floor Field */}
      <div>
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
          Floor
        </label>

        <select
          id="floor"
          {...register("floor_id", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.floor_id ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          {floors?.map((floor) => (
            <option key={floor.floor_id} value={floor.floor_id}>
              {floor.name}
            </option>
          ))}
        </select>

        {errors.floor_id && <p className="mt-1 text-sm text-red-600">{errors.floor_id.message}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default WallForm;
