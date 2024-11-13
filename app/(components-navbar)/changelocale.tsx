'use client';

import React from 'react';
import { switchLocaleAction } from '../../actions/switch-locale';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from '../../i18n/client';
import { useLocale } from '../../hooks/locale-provider';

export default function ChangeLocale() {
  const {i18n, t} = useTranslation('common');
  const locale = useLocale();

  return (
    <Select onValueChange={switchLocaleAction} value={locale}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t('Select Language')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{t('english')}</SelectItem>
          <SelectItem value="es">{t('spanish')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
