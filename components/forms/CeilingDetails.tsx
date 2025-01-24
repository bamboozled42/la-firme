// src/components/forms/CeilingDetailsForm.tsx
"use client";

import { ceilingDetailsFormSchema, type CeilingDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Ceiling } from "../../lib/utils";

interface CeilingDetailsFormProps {
  itemData: Ceiling;
  onSave: (data: CeilingDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CeilingDetailsForm: React.FC<CeilingDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const { t } = useTranslation("common");

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
          {t("height")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="height"
            {...register("height", { valueAsNumber: true })}
            className={`block w-full pr-10 rounded-md border ${
              errors.height ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            m
          </span>
        </div>
        {errors.height && <p className="mt-1 text-sm text-red-600">{t(errors.height.message ?? "")}</p>}
      </div>

      {/* Dimension X Field */}
      <div>
        <label htmlFor="dimension_x" className="block text-sm font-medium text-gray-700">
          {t("dimensionX")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="dimension_x"
            {...register("dimension_x", { valueAsNumber: true })}
            className={`block w-full pr-10 rounded-md border ${
              errors.dimension_x ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            m
          </span>
        </div>
        {errors.dimension_x && <p className="mt-1 text-sm text-red-600">{t(errors.dimension_x.message ?? "")}</p>}
      </div>

      {/* Dimension Y Field */}
      <div>
        <label htmlFor="dimension_y" className="block text-sm font-medium text-gray-700">
          {t("dimensionY")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="dimension_y"
            {...register("dimension_y", { valueAsNumber: true })}
            className={`block w-full pr-10 rounded-md border ${
              errors.dimension_y ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            m
          </span>
        </div>
        {errors.dimension_y && <p className="mt-1 text-sm text-red-600">{t(errors.dimension_y.message ?? "")}</p>}
      </div>

      {/* Direction of Joints Field */}
      <div>
        <label htmlFor="direction_of_joints" className="block text-sm font-medium text-gray-700">
          {t("jointDirection")}
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
            {t("jointDirectionPlaceholder")}
          </option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </select>
        {errors.direction_of_joints && (
          <p className="mt-1 text-sm text-red-600">{t(errors.direction_of_joints.message ?? "")}</p>
        )}
      </div>

      {/* Cracks Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="cracks" className="mr-2 block text-sm font-medium text-gray-700">
          {t("cracks")}
        </label>
        <input
          type="checkbox"
          id="cracks"
          {...register("cracks")}
          className={`h-4 w-4 rounded border-gray-300 text-green-600 ${errors.cracks ? "border-red-600" : ""}`}
        />
      </div>
      {errors.cracks && <p className="mt-1 text-sm text-red-600">{t(errors.cracks.message ?? "")}</p>}

      {/* Pipes Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="pipes" className="mr-2 block text-sm font-medium text-gray-700">
          {t("pipes")}
        </label>
        <input
          type="checkbox"
          id="pipes"
          {...register("pipes")}
          className={`h-4 w-4 rounded border-gray-300 text-green-600 ${errors.pipes ? "border-red-600" : ""}`}
        />
      </div>
      {errors.pipes && <p className="mt-1 text-sm text-red-600">{t(errors.pipes.message ?? "")}</p>}

      {/* Notes Field */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
        {t("notes")}
        </label>
        <input
          type="text"
          id="notes"
          {...register("notes")}
          className={`mt-1 block w-full rounded-md border ${
            errors.notes ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        />
        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="destructive" onClick={onDelete}>
          {t("delete")}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit">{t("save")}</Button>
      </div>
    </form>
  );
};

export default CeilingDetailsForm;
