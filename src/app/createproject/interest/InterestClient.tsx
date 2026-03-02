'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const interests: string[] = [
    'Back-End', 'Front-End', 'AI', 'Game-Client', 'Full-Stack', 'Native-App'
];

export default function InterestClient() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const projectName = searchParams.get('projectName');
    const teamId = searchParams.get('teamId');

    const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const toggleInterest = (interest: string) => {
        setSelectedInterest(prev => (prev === interest ? null : interest));
        setErrorMessage("");
    };

    const handleNext = () => {
        if (!projectName || !selectedInterest) {
            setErrorMessage(t('createProject.errorSelectInterest'));
            return;
        }

        router.push(
            `/createproject/description?projectName=${encodeURIComponent(projectName)}&devInterest=${encodeURIComponent(selectedInterest)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ""}`
        );
    };

    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="theme-btn-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">2</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{t('createProject.step2Title')}</h1>
                    <span className="ml-auto rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/30">
                        {t('createProject.stepIndicator', { current: 2, total: 4 })}
                    </span>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/30">
                        <span className="text-white/60">{t('createProject.projectBadge')}:</span>{" "}
                        <span className="font-medium text-white">
                            {projectName ?? t('createProject.missingProjectName')}
                        </span>
                    </span>
                </div>

                <div className="theme-card rounded-2xl p-4 sm:p-6">
                    <p className="mb-4 text-sm text-white/70">
                        {t('createProject.step2Desc')}
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {interests.map((interest) => {
                            const active = selectedInterest === interest;
                            return (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={[
                                        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                                        active
                                            ? "border-white/40 bg-white/20 text-white shadow-sm"
                                            : "border-white/30 bg-white/10 text-white/80 hover:bg-white/20"
                                    ].join(" ")}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{interest}</span>
                                        {active && <span className="text-xs">{t('createProject.selectedLabel')}</span>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {selectedInterest && (
                        <div className="mt-5 rounded-xl bg-white/15 p-3 text-center text-sm text-white/80 ring-1 ring-white/30">
                            {t('createProject.selectedLabel')}: <span className="font-semibold">{selectedInterest}</span>
                        </div>
                    )}

                    {errorMessage && (
                        <p className="mt-3 text-center text-sm text-rose-200">
                            {errorMessage}
                        </p>
                    )}

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            onClick={() =>
                                router.push(`/createproject${teamId ? `?teamId=${encodeURIComponent(teamId)}` : ""}`)
                            }
                            className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                        >
                            {t('common.previous')}
                        </button>
                        <button
                            onClick={handleNext}
                            className="theme-btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold shadow transition hover:brightness-110 active:scale-[0.99] w-full sm:w-auto"
                        >
                            {t('common.next')}
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-xs text-white/60">
                    {t('createProject.noteCanEditLater')}
                </p>
            </div>
        </div>
    );
}
