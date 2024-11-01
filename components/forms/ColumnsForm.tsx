"use client";

import { columnFormSchema, type ColumnFormSchema } from "@/components/forms/schemas/formSchema"; // Corrected path
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

interface ColumnFormProps {
  onNext: (data: ColumnFormSchema) => void;
  onCancel: () => void;
}

const ColumnsForm: React.FC<ColumnFormProps> = ({ onNext, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnFormSchema>({
    resolver: zodResolver(columnFormSchema),
  });

  const onSubmit: SubmitHandler<ColumnFormSchema> = (data) => {
    onNext(data);
  };

  const onError = (errors: FieldErrors<ColumnFormSchema>) => {
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
      {/* Number Field */}
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Number
        </label>
        <input
          type="number"
          id="number"
          {...register("number", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
        {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>}
      </div>

      {/* Floor Field */}
      <div>
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
          Floor
        </label>
        <select
          id="floor"
          {...register("floor")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select floor</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
          <option value="3">Floor 3</option>
        </select>
        {errors.floor && <p className="mt-1 text-sm text-red-600">{errors.floor.message}</p>}
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

export default ColumnsForm;
