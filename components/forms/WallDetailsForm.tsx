"use client";

import { wallDetailsFormSchema, type WallDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Wall } from "../../lib/utils";

interface WallDetailsFormProps {
  itemData: Wall;
  onSave: (data: WallDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const WallDetailsForm: React.FC<WallDetailsFormProps> = ({ onSave, onCancel, onDelete, itemData }) => {
  const { t } = useTranslation("common");

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
    {
      id: "material",
      label: t("material"),
      options: { KK: t("kk"), P: t("p"), C: t("c"), Drywall: t("drywall"), Seleccionar: t("select") },
      type: "select",
    },
    { id: "height_type", label: t("fullOrPartialHeight"), options: { High: t("high"), Low: t("low") }, type: "select" },
    { id: "wallRepeatFloors", label: t("wallRepeatFloors"), options: {}, type: "checkbox" },
    {
      id: "location",
      label: t("location"),
      options: { Perimeter: t("perimeter"), Internal: t("internal") },
      type: "select",
    },
    {
      id: "stucco",
      label: t("stucco"),
      options: {
        "Only inside": t("onlyInside"),
        "Only outside": t("onlyOutside"),
        "Inside and outside": t("insideAndOutside"),
        "No stucco": t("noStucco"),
      },
      type: "select",
    },
  ];

  const fhFields = [
    { id: "fh1CrackInBeam", label: t("fh1"), type: "checkbox" },
    { id: "fh2CrackInWallCeiling", label: t("fh2"), type: "checkbox" },
    { id: "fh3CrackInCeiling", label: t("fh3"), type: "checkbox" },
  ];

  const fvFields = [
    { id: "fv1VerticalCrackColumnWall", label: t("fv1"), type: "checkbox" },
    { id: "fv2VerticalCrackColumn", label: t("fv2"), type: "checkbox" },
  ];

  const lFields = [
    { id: "l1IrregularBrick", label: t("l1"), type: "checkbox" },
    { id: "l2BricksWithExcessiveHoles", label: t("l2"), type: "checkbox" },
    { id: "l3WallsNotWellAligned", label: t("l3"), type: "checkbox" },
    { id: "l4IncompleteMortarInBrick", label: t("l4"), type: "checkbox" },
    { id: "l5VariationInThicknessJoints", label: t("l5"), type: "checkbox" },
    { id: "l6MortarJointsTooThick", label: t("l6"), type: "checkbox" },
    { id: "l7PoorAdhesion", label: t("l7"), type: "checkbox" },
  ];

  const tFields = [
    { id: "perforatingColumn", label: t("t1"), type: "checkbox" },
    { id: "perforatingBeam", label: t("t2"), type: "checkbox" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General Information */}
      <section>
        <h2 className="text-lg font-semibold">{t("generalInfo")}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Length Field */}
          <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            {t("length")}
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              id="length"
              {...register("length", { valueAsNumber: true })}
              className={`block w-full pr-10 rounded-md border ${
                errors.length ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              m
            </span>
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
              {...register("width", { valueAsNumber: true })}
              className={`block w-full pr-10 rounded-md border ${
                errors.width ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              m
            </span>
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

          {/* Window Size X Field */}
          <div>
          <label htmlFor="window_size_x" className="block text-sm font-medium text-gray-700">
            {t("windowSizeX")}
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              id="window_size_x"
              {...register("window_size_x", { valueAsNumber: true })}
              className={`block w-full pr-10 rounded-md border ${
                errors.window_size_x ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              m
            </span>
          </div>
          {errors.window_size_x && (
            <p className="mt-1 text-sm text-red-600">{t(errors.window_size_x.message ?? "")}</p>
          )}
        </div>

          {/* Window Size Y Field */}
          <div>
          <label htmlFor="window_size_y" className="block text-sm font-medium text-gray-700">
            {t("windowSizeY")}
          </label>
          <div className="relative mt-1">
            <input
              type="number"
              id="window_size_y"
              {...register("window_size_y", { valueAsNumber: true })}
              className={`block w-full pr-10 rounded-md border ${
                errors.window_size_y ? "border-red-600" : "border-gray-300"
              } shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              m
            </span>
          </div>
          {errors.window_size_y && (
            <p className="mt-1 text-sm text-red-600">{t(errors.window_size_y.message ?? "")}</p>
          )}
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
                    {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
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
                  {Object.keys(field.options).map((optionKey) => (
                    <option key={optionKey} value={optionKey}>
                      {field.options[optionKey as keyof typeof field.options]}
                    </option>
                  ))}
                </select>
                {errors[field.id as keyof WallDetailsFormSchema] && (
                  <p className="mt-1 text-sm text-red-600">
                    {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
                  </p>
                )}
              </div>
            ),
          )}
        </div>
      </section>

      {/* FH Fields */}
      <section>
        <h2 className="text-lg font-semibold">{t("fhTitle")}</h2>
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
                  {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FV Fields */}
      <section>
        <h2 className="text-lg font-semibold">{t("fvTitle")}</h2>
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
                  {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* L Fields */}
      <section>
        <h2 className="text-lg font-semibold">{t("lTitle")}</h2>
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
                  {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* T Fields */}
      <section>
        <h2 className="text-lg font-semibold">{t("tTitle")}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tFields.map((field) => (
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
                  {t(errors[field.id as keyof WallDetailsFormSchema]?.message ?? "")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

        {/* Notes Field */}
        <section>
        <h2 className="text-lg font-semibold">{t("notes")}</h2>
      <div>
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
      </section>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
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

export default WallDetailsForm;
