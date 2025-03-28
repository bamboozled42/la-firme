"use client";

import { columnDetailsFormSchema, type ColumnDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Column } from "../../lib/utils";

interface ColumnDetailsFormProps {
  itemData: Column;
  onSave: (data: ColumnDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const ColumnDetailsForm: React.FC<ColumnDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const { t } = useTranslation("common");

  const defaultValues = itemData ? itemData : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnDetailsFormSchema>({
    resolver: zodResolver(columnDetailsFormSchema),
    defaultValues,
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
          {t("length")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="length"
            step="any"
            inputMode="decimal"
            {...register("length", { valueAsNumber: true })}
            className={`block w-full rounded-md border pr-10 ${
              errors.length ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">m</span>
        </div>
        {errors.length && <p className="mt-1 text-sm text-red-600">{t(errors.length.message ?? "")}</p>}
      </div>

      {/* Width Field */}
      <div>
        <label htmlFor="width" className="block text-sm font-medium text-gray-700">
          {t("width")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="width"
            step="any"
            inputMode="decimal"
            {...register("width", { valueAsNumber: true })}
            className={`block w-full rounded-md border pr-10 ${
              errors.width ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">m</span>
        </div>
        {errors.width && <p className="mt-1 text-sm text-red-600">{t(errors.width.message ?? "")}</p>}
      </div>

      {/* Height Field */}
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          {t("height")}
        </label>
        <div className="relative mt-1">
          <input
            type="number"
            id="height"
            step="any"
            inputMode="decimal"
            {...register("height", { valueAsNumber: true })}
            className={`block w-full rounded-md border pr-10 ${
              errors.height ? "border-red-600" : "border-gray-300"
            } shadow-sm focus:border-green-500 focus:ring-green-500
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">m</span>
        </div>
        {errors.height && <p className="mt-1 text-sm text-red-600">{t(errors.height.message ?? "")}</p>}
      </div>

      {/* Condition Field */}
      <div>
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
          {t("condition")}
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
            {t("conditionPlaceholder")}
          </option>
          <option value="Bad">{t("bad")}</option>
          <option value="Good">{t("good")}</option>
        </select>
        {errors.condition && <p className="mt-1 text-sm text-red-600">{t(errors.condition.message ?? "")}</p>}
      </div>

      {/* Type Field */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          {t("type")}
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
            {t("typePlaceholder")}
          </option>
          <option value="Bracing column">{t("bracingColumn")}</option>
          <option value="Independent column">{t("independentColumn")}</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{t(errors.type.message ?? "")}</p>}
      </div>

      {/* Vertical Cracks Field (Checkbox) */}
      <div className="flex items-center">
        <label htmlFor="verticalCracks" className="mr-2 block text-sm font-medium text-gray-700">
          {t("verticalCracks")}
        </label>
        <input
          type="checkbox"
          id="verticalCracks"
          {...register("vertical_cracks")}
          className={`h-4 w-4 rounded border-gray-300 text-green-600 ${errors.vertical_cracks ? "border-red-600" : ""}`}
        />
      </div>
      {errors.vertical_cracks && <p className="mt-1 text-sm text-red-600">{t(errors.vertical_cracks.message ?? "")}</p>}

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

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit">{t("save")}</Button>
      </div>
    </form>
  );
};

export default ColumnDetailsForm;
