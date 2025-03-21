"use client";

import { beamDetailsFormSchema, type BeamDetailsFormSchema } from "@/components/forms/schemas/formSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type Beam } from "../../lib/utils";

interface BeamDetailsFormProps {
  itemData: Beam;
  onSave: (data: BeamDetailsFormSchema) => void;
  onCancel: () => void;
  onDelete: () => void;
  data: any;
}

const BeamDetailsForm: React.FC<BeamDetailsFormProps> = ({ itemData, onSave, onCancel, onDelete }) => {
  const { t } = useTranslation("common");

  const defaultValues = itemData ? itemData : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeamDetailsFormSchema>({
    resolver: zodResolver(beamDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: BeamDetailsFormSchema) => {
    // console.log("BeamDetailsForm Submitted Data:", data);
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

      {/* Support Left Side Field */}
      <div>
        <label htmlFor="support_left_side" className="block text-sm font-medium text-gray-700">
          {t("supportLeft")}
        </label>
        <select
          id="support_left_side"
          {...register("support_left_side")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${errors.support_left_side ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            {t("supportLeftPlaceholder")}
          </option>
          <option value="Column">{t("column")}</option>
          <option value="Wall">{t("wall")}</option>
          <option value="Beam">{t("beam")}</option>
          <option value="Overhanging">{t("overhanging")}</option>
        </select>
        {errors.support_left_side && (
          <p className="mt-1 text-sm text-red-600">{t(errors.support_left_side.message ?? "")}</p>
        )}
      </div>

      {/* Support Right Side Field */}
      <div>
        <label htmlFor="support_right_side" className="block text-sm font-medium text-gray-700">
          {t("supportRight")}
        </label>
        <select
          id="support_right_side"
          {...register("support_right_side")}
          defaultValue=""
          className={`mt-1 block w-full rounded-md border ${errors.support_right_side ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            {t("supportRightPlaceholder")}
          </option>
          <option value="Column">{t("column")}</option>
          <option value="Wall">{t("wall")}</option>
          <option value="Beam">{t("beam")}</option>
          <option value="Overhanging">{t("overhanging")}</option>
        </select>
        {errors.support_right_side && (
          <p className="mt-1 text-sm text-red-600">{t(errors.support_right_side.message ?? "")}</p>
        )}
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
          className={`mt-1 block w-full rounded-md border ${errors.type ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            {t("typePlaceholder")}
          </option>
          <option value="Curved sole">{t("curvedSole")}</option>
          <option value="Flat sole">{t("flatSole")}</option>
          <option value="Inverted Sole">{t("invertedSole")}</option>
          <option value="Curved">{t("curved")}</option>
          <option value="Flat">{t("flat")}</option>
          <option value="Inverted">{t("inverted")}</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{t(errors.type.message ?? "")}</p>}
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
          className={`mt-1 block w-full rounded-md border ${errors.condition ? "border-red-600" : "border-gray-300"} shadow-sm focus:border-green-500 focus:ring-green-500`}
        >
          <option value="" disabled>
            {t("conditionPlaceholder")}
          </option>
          <option value="Bad">{t("bad")}</option>
          <option value="Good">{t("good")}</option>
        </select>
        {errors.condition && <p className="mt-1 text-sm text-red-600">{t(errors.condition.message ?? "")}</p>}
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

export default BeamDetailsForm;
