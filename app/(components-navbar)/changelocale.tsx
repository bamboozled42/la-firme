"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { switchLocaleAction } from "../../actions/switch-locale";
import { useLocale } from "../../hooks/locale-provider";
import { useTranslation } from "../../i18n/client";

export default function ChangeLocale() {
  const { t } = useTranslation("common");
  const locale = useLocale();

  return (
    <Select onValueChange={switchLocaleAction} value={locale}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t("Select Language")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{t("english")}</SelectItem>
          <SelectItem value="es">{t("spanish")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
