// src/components/forms/FloorDetailsForm.tsx
"use client";

import { floorDetailsFormSchema, type FloorDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Floor } from "../../lib/utils";

interface FloorDetailsFormProps {
  itemData: Floor;
  onSave: (data: FloorDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const FloorDetailsForm: React.FC<FloorDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const { t } = useTranslation("common");

  const defaultValues = itemData ? itemData : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FloorDetailsFormSchema>({
    resolver: zodResolver(floorDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: FloorDetailsFormSchema) => {
    console.log("FloorDetailsForm Submitted Data:", data); // Debugging
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Materials Field */}
      <div>
        <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
          {t("material")}
        </label>
        <select
          id="materials"
          {...register("materials")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${
            errors.materials ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            {t("materialPlaceholder")}
          </option>
          <option value="Dirt">{t("dirt")}</option>
          <option value="Cement">{t("cement")}</option>
          <option value="Wood">{t("wood")}</option>
          <option value="Tiles">{t("tiles")}</option>
        </select>
        {errors.materials && <p className="mt-1 text-sm text-red-600">{t(errors.materials.message ?? "")}</p>}
      </div>

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

export default FloorDetailsForm;
