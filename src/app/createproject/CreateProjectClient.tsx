'use client';

import CreateProjectForm from "@/components/CreateProject/CreateProjectForm";
import { useTranslation } from "react-i18next";

export default function CreateProjectClient() {
    const { t } = useTranslation();
    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-10">
                {/* 스텝 헤더 */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="theme-btn-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">1</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{t('createProject.step1Title')}</h1>
                    <span className="ml-auto rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/30">
                        {t('createProject.stepIndicator', { current: 1, total: 4 })}
                    </span>
                </div>

                {/* 카드 */}
                <div className="theme-card rounded-2xl p-6">
                    <p className="mb-6 text-sm text-white/70">
                        {t('createProject.step1Desc')}
                    </p>
                    <CreateProjectForm />
                </div>

                <p className="mt-4 text-xs text-white/60">
                    {t('createProject.step1Tip')}
                </p>
            </div>
        </div>
    );
}
