"use client";

import { wallFormSchema, type WallFormSchema } from "@/components/forms/schemas/formSchema"; // Corrected path
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

interface WallFormProps {
  onNext: (data: WallFormSchema) => void;
  onCancel: () => void;
}

const WallForm: React.FC<WallFormProps> = ({ onNext, onCancel }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WallFormSchema>({
    resolver: zodResolver(wallFormSchema),
    defaultValues: {
      name: "", // Initialize name with an empty string
      floor_id: undefined, // Optional: Set default values if necessary
    },
  });

  const onSubmit: SubmitHandler<WallFormSchema> = (data) => {
    console.log("WallForm Submitted Data:", data); // Debugging
    onNext(data);
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
          className={`mt-1 block w-full rounded-md border ${
            errors.name ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
          placeholder="Enter wall name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      {/* Direction Field */}
      <div>
        <label htmlFor="direction" className="block text-sm font-medium text-gray-700">
          Direction
        </label>
        <select
          id="direction"
          {...register("direction")}
          className={`mt-1 block w-full rounded-md border ${
            errors.direction ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="">Select direction</option>
          <option value="x">X</option>
          <option value="y">Y</option>
        </select>
        {errors.direction && <p className="mt-1 text-sm text-red-600">{errors.direction.message}</p>}
      </div>

      {/* Floor Field */}
      <div>
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
          Floor
        </label>
        <input
          type="number"
          id="floor"
          {...register("floor_id", { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md border ${
            errors.floor_id ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
          min={1} // Ensures only positive numbers can be entered
          step={1} // Ensures only integers can be entered
          placeholder="Enter floor number"
        />
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
