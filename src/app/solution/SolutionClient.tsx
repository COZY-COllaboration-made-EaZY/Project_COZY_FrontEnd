'use client';

import { useTranslation } from "react-i18next";

export default function SolutionClient() {
  const { t } = useTranslation();
  return <main className='mt-16 h-[calc(100dvh-64px)]'>{t('solution.inProgress')}</main>;
}
