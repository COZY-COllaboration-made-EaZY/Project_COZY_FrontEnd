'use client';

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function FeatureClient() {
  const { t } = useTranslation();
  return (
      <main className="theme-page relative min-h-screen overflow-hidden py-8">
        <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
        <div className="theme-stars pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-3xl font-bold text-white">{t('feature.title')}</h1>
        <p className="mb-10 text-white/70">
          {t('feature.intro')}
        </p>

        <section className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold text-white">{t('feature.dashboard.title')}</h2>
          <p className="mb-4 text-white/70">
            {t('feature.dashboard.desc')}
          </p>
          <Image
              src="/dashboard.png"
              alt={t('feature.dashboard.alt')}
              width={1200}
              height={720}
              className="w-full rounded border border-white/20"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold text-white">{t('feature.plan.title')}</h2>
          <p className="mb-4 text-white/70">
            {t('feature.plan.desc')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
                src="/plan_1.png"
                alt={t('feature.plan.listAlt')}
                width={1200}
                height={720}
                className="w-full rounded border border-white/20"
            />
            <Image
                src="/plan_2.png"
                alt={t('feature.plan.editAlt')}
                width={1200}
                height={720}
                className="w-full rounded border border-white/20"
            />
          </div>
        </section>


        <section className="mb-12">
          <h2 className="mb-2 text-2xl font-semibold text-white">{t('feature.calendar.title')}</h2>
          <p className="mb-4 text-white/70">
            {t('feature.calendar.desc')}
          </p>
          <Image
              src="/calendar.png"
              alt={t('feature.calendar.alt')}
              width={1200}
              height={720}
              className="w-full rounded border border-white/20"
          />
        </section>
        </div>
      </main>
  );
}
