'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useUserStore} from '@/store/userStore';
import { useTranslation } from "react-i18next";

export default function DescriptionClient() {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectName = searchParams.get('projectName');
    const devInterest = searchParams.get('devInterest');
    const teamId = searchParams.get('teamId');
    const { user } = useUserStore();

    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!projectName || !devInterest) router.replace('/createproject');
    }, [projectName, devInterest, router]);

    const handleNext = () => {
        if (!description.trim()) {
            setError(t('createProject.errorDescriptionRequired'));
            return;
        }
        if (!user?.nickname) {
            setError(t('createProject.errorLoginRequired'));
            return;
        }
        router.push(
            `/createproject/github?projectName=${encodeURIComponent(projectName!)}&devInterest=${encodeURIComponent(devInterest!)}&description=${encodeURIComponent(description)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ""}`
        );
    };

    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="theme-btn-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">3</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{t('createProject.step3Title')}</h1>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/30">
            <span className="text-white/60">{t('createProject.projectBadge')}:</span> <span className="font-medium text-white">{projectName}</span>
          </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/30">
            <span className="text-white/60">{t('createProject.interestBadge')}:</span> <span className="font-medium text-white">{devInterest}</span>
          </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-white/80 ring-1 ring-white/30">
                        {t('createProject.stepIndicator', { current: 3, total: 4 })}
                    </span>
                </div>
                <div className="theme-card rounded-2xl p-4 sm:p-6">
                    <label className="mb-2 block text-sm font-medium text-white/80">
                        {t('createProject.step3Label')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="h-56 w-full resize-none rounded-xl border border-white/30 bg-white/90 p-3 text-sm text-slate-900 outline-none transition focus:border-white focus:ring-2 focus:ring-white/40 sm:h-72 sm:p-4"
                        placeholder={t('createProject.step3Placeholder')}
                        value={description}
                        onChange={(e) => { setDescription(e.target.value); setError(''); }}
                    />
                    {error && <p className="mt-2 text-sm text-rose-200">{error}</p>}
                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            onClick={() =>
                                router.push(
                                    `/createproject/interest?projectName=${encodeURIComponent(projectName || '')}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ""}`
                                )
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
                    {t('createProject.step3Tip')}
                </p>
            </div>
        </div>
    );
}
