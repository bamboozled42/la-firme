"use client";

import { floorFormSchema, type FloorFormSchema } from "@/components/forms/schemas/formSchema"; // Corrected path
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Floor } from "../../lib/utils";

interface FloorsFormProps {
  onNext: (data: FloorFormSchema) => void;
  onCancel: () => void;
  floors: Floor[] | null;
}

const FloorsForm: React.FC<FloorsFormProps> = ({ onNext, onCancel, floors }) => {
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FloorFormSchema>({
    resolver: zodResolver(floorFormSchema),
  });

  const onSubmit: SubmitHandler<FloorFormSchema> = (data) => {
    onNext(data);
  };

  const onError = (errors: FieldErrors<FloorFormSchema>) => {
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
          {t("name")}
        </label>
        <input
          type="number"
          id="name"
          {...register("name")}
          className={`mt-1 block w-full rounded-md border px-2 ${
            errors.name ? "border-red-600" : "border-gray-300"
          } shadow-sm focus:border-green-500 focus:ring-green-500`}
          placeholder={t("floorNamePlaceholder")}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{t(errors.name.message ?? "")}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="submit">{t("next")}</Button>
      </div>
    </form>
  );
};

export default FloorsForm;
