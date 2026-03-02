'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

interface ConfirmData {
    projectName: string;
    devInterest: string;
    description: string;
    gitHubUrl?: string | null;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (payload: ConfirmData) => Promise<void> | void;
    loading?: boolean;
    data: ConfirmData;
}

// 대소문자 허용(i), 프로토콜/www 선택적, 끝에 / 또는 .git 허용
const GH_REGEX =
    /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/|\.git)?$/i;

export default function ConfirmProjectDialog({
                                                 open,
                                                 onClose,
                                                 onConfirm,
                                                 loading,
                                                 data,
                                             }: Props) {
    const { t } = useTranslation();
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) setAgree(false);
    }, [open]);

    if (!open) return null;

    const hasProjectName = !!data.projectName?.trim();
    const hasInterest = !!data.devInterest?.trim();
    const hasDesc = !!data.description?.trim();
    const rawGit = (data.gitHubUrl ?? '').trim();
    const git = rawGit.toLowerCase() === '(none)' ? '' : rawGit;

    const hasGit = git.length > 0;
    const githubValid = !hasGit || GH_REGEX.test(git);

    const allValid = hasProjectName && hasInterest && hasDesc && githubValid;
    const canConfirm = allValid && agree && !loading;

    const Check = ({ ok }: { ok: boolean }) => (
        <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                ok
                    ? 'bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-300/40'
                    : 'bg-rose-400/20 text-rose-100 ring-1 ring-rose-300/40'
            }`}
            aria-hidden
        >
      {ok ? '✓' : '!'}
    </span>
    );

    const handleConfirm = () => {
        const payload = {
            ...data,
            gitHubUrl: hasGit ? git : '',
        };
        return onConfirm(payload);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                className="theme-card w-full max-w-2xl rounded-2xl p-6 text-white"
            >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="theme-btn-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">
            ✓
          </span>
                    <h2 className="text-xl font-bold tracking-tight">{t('createProject.confirmTitle')}</h2>
                    <span className="ml-auto rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/30">
            {t('createProject.confirmSubtitle')}
          </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                        <p className="text-xs text-white/60">{t('createProject.confirmProjectName')}</p>
                        <p className="mt-1 break-words font-semibold text-white">
                            {data.projectName}
                        </p>
                    </div>

                    <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                        <p className="text-xs text-white/60">{t('createProject.confirmInterest')}</p>
                        <p className="font-semibold text-white">{data.devInterest}</p>
                    </div>

                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-2">
                        <p className="text-xs text-white/60">{t('createProject.confirmDescription')}</p>
                        <div className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap text-white">
                            {data.description}
                        </div>
                    </div>

                    {/* GitHub (옵션) */}
                    {typeof data.gitHubUrl !== 'undefined' && (
                        <div className="rounded-xl border border-white/20 bg-white/10 p-3 sm:col-span-2">
                            <p className="text-xs text-white/60">{t('createProject.confirmGithub')}</p>
                            <p className="mt-1 break-words font-semibold text-white">
                                {hasGit ? git : t('common.none')}
                            </p>
                            {!githubValid && (
                                <p className="mt-2 text-xs text-rose-200">
                                    {t('createProject.confirmGithubInvalid')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* ✅ 체크리스트 */}
                <div className="mt-5 rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
                    <p className="mb-3 text-sm font-semibold text-white/80">{t('createProject.confirmChecklistTitle')}</p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Check ok={hasProjectName} />
                            <span>{t('createProject.confirmChecklistName')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check ok={hasInterest} />
                            <span>{t('createProject.confirmChecklistInterest')}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check ok={hasDesc} />
                            <span>{t('createProject.confirmChecklistDescription')}</span>
                        </li>
                        {typeof data.gitHubUrl !== 'undefined' && (
                            <li className="flex items-center gap-2">
                                <Check ok={githubValid} />
                                <span>
                  {hasGit ? t('createProject.confirmChecklistGithubValid') : t('createProject.confirmChecklistGithubOptional')}
                </span>
                            </li>
                        )}
                    </ul>

                    {/* 최종 동의 */}
                    <label className="mt-4 flex cursor-pointer select-none items-center gap-2 text-sm text-white/80">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-white/40 text-blue-200 focus:ring-white/40"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
                        {t('createProject.confirmAgreement')}
                    </label>
                </div>

                {/* 푸터 버튼 */}
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {t('createProject.confirmEdit')}
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition ${
                            canConfirm ? 'theme-btn-primary hover:brightness-110 active:scale-[0.99]' : 'bg-white/20 opacity-60'
                        }`}
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                    >
                        {loading ? t('createProject.confirmCreating') : t('createProject.confirmCreate')}
                    </button>
                </div>
            </div>
        </div>
    );
}
