'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createProjectSaveRequest } from '@/api/requests/project';
import { useUserStore } from '@/store/userStore';
import ConfirmProjectDialog from '@/components/CreateProject/ConfirmProjectDialog';
import { useTeamStore } from "@/store/teamStore";
import { getMyTeamInfoRequest } from "@/api/requests/team";
import { useTranslation } from "react-i18next";

const GH_REGEX = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

export default function GithubClient() {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUserStore();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);
    const teams = useTeamStore((s) => s.teams);
    const setTeams = useTeamStore((s) => s.setTeams);
    const setCurrentTeamId = useTeamStore((s) => s.setCurrentTeamId);
    const teamIdFromQuery = useMemo(() => searchParams.get('teamId') || '', [searchParams]);

    const projectName  = useMemo(() => searchParams.get('projectName')  || '', [searchParams]);
    const devInterest  = useMemo(() => searchParams.get('devInterest')  || '', [searchParams]);
    const description  = useMemo(() => searchParams.get('description')  || '', [searchParams]);

    const [githubUrl, setGithubUrl] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openTeamSelect, setOpenTeamSelect] = useState(false);
    const [teamLoading, setTeamLoading] = useState(false);
    const [teamError, setTeamError] = useState('');
    const [teamQuery, setTeamQuery] = useState('');
    const [teamSort, setTeamSort] = useState<'recent' | 'name'>('recent');
    const [createdProjectName, setCreatedProjectName] = useState('');

    const resolvedTeamId = teamIdFromQuery || currentTeamId;
    const resolvedTeamName =
        teams.find((team) => team.id === resolvedTeamId)?.teamName || '';

    const visibleTeams = useMemo(() => {
        const keyword = teamQuery.trim().toLowerCase();
        const filtered = teams.filter((team) => {
            if (!keyword) return true;
            return (
                team.teamName.toLowerCase().includes(keyword) ||
                team.description.toLowerCase().includes(keyword)
            );
        });

        if (teamSort === 'name') {
            return [...filtered].sort((a, b) => a.teamName.localeCompare(b.teamName));
        }
        return filtered;
    }, [teams, teamQuery, teamSort]);

    useEffect(() => {
        if (!projectName || !devInterest || !description) {
            router.replace('/createproject');
        }
    }, [projectName, devInterest, description, router]);

    useEffect(() => {
        if (!openTeamSelect) return;
        if (teams.length > 0) return;
        (async () => {
            try {
                setTeamLoading(true);
                setTeamError('');
                const data = await getMyTeamInfoRequest();
                setTeams(data.filter((t) => t.id && t.id.trim() !== ''));
            } catch (e) {
                console.error(e);
                setTeamError(t('createProject.selectTeamError'));
            } finally {
                setTeamLoading(false);
            }
        })();
    }, [openTeamSelect, teams.length, setTeams, t]);


    const doCreate = async (finalUrl: string | null) => {
        try {
            if (!user?.nickname) {
                setError(t('createProject.errorLoginRequired'));
                return;
            }
            if (!resolvedTeamId) {
                setError(t('createProject.errorTeamRequired'));
                return;
            }
            setSubmitting(true);
            const result = await createProjectSaveRequest({
                projectName,
                devInterest,
                description,
                githubUrl: finalUrl ?? undefined,
                teamId: String(resolvedTeamId),
            });
            const finalName = String(result?.projectName || projectName);
            setCreatedProjectName(finalName);
            setOpenConfirm(false);
            setOpenSuccess(true);
        } catch (e) {
            console.error(e);
            setError(t('createProject.createError'));
            alert(t('createProject.createError'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = () => {
        if (githubUrl && !GH_REGEX.test(githubUrl)) {
            setError(t('createProject.errorInvalidGithubUrl'));
            return;
        }
        setError('');
        setOpenConfirm(true);
    };

    const handleSkip = () => {
        setError('');
        setOpenConfirm(true);
    };

    const handleConfirm = async () => {
        await doCreate(githubUrl || null);
    };

    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="theme-btn-primary inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white">4</span>
                    <h1 className="text-2xl font-bold tracking-tight text-white">{t('createProject.step4Title')}</h1>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/30">
            <span className="text-white/60">{t('createProject.projectBadge')}:</span>{' '}
              <span className="font-medium text-white">{projectName}</span>
          </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/30">
            <span className="text-white/60">{t('createProject.devInterestBadge')}:</span>{' '}
                        <span className="font-medium text-white">{devInterest}</span>
          </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-white/80 ring-1 ring-white/30">
                        {t('createProject.stepIndicator', { current: 4, total: 4 })}
                    </span>
                </div>

                <div className="theme-card rounded-2xl p-4 sm:p-6">
                    <label className="mb-2 block text-sm font-medium text-white/80">
                        {t('createProject.step4Label')}
                        <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white/70 ring-1 ring-white/30">{t('createProject.step4Optional')}</span>
                    </label>

                    <input
                        className="w-full rounded-xl border border-white/30 bg-white/90 p-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-white focus:ring-2 focus:ring-white/40"
                        placeholder="https://github.com/owner/repository"
                        value={githubUrl}
                        onChange={(e) => { setGithubUrl(e.target.value.trim()); setError(''); }}
                    />

                    <p className="mt-2 text-xs text-white/60">
                        {t('createProject.step4Help')}
                    </p>

                    {error && <p className="mt-2 text-sm text-rose-200">{error}</p>}

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110"
                            onClick={() =>
                                router.push(
                                    `/createproject/description?projectName=${encodeURIComponent(projectName)}&devInterest=${encodeURIComponent(devInterest)}&description=${encodeURIComponent(description)}${resolvedTeamId ? `&teamId=${encodeURIComponent(resolvedTeamId)}` : ""}`
                                )
                            }
                            disabled={submitting}
                        >
                            {t('common.previous')}
                        </button>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110 disabled:opacity-50"
                                onClick={handleSkip}
                                disabled={submitting}
                            >
                                {t('createProject.step4Skip')}
                            </button>
                            <button
                                className="theme-btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold shadow transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
                                onClick={handleNext}
                                disabled={submitting}
                            >
                                {t('createProject.step4Complete')}
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-xs text-white/60">
                    {t('createProject.noteCanEditLater')}
                </p>
            </div>

            {/* 理쒖쥌 ?뺤씤 ?ㅼ씠?쇰줈洹?*/}
            <ConfirmProjectDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleConfirm}
                loading={submitting}
                data={{
                    projectName,
                    devInterest,
                    description,
                    gitHubUrl: githubUrl || '',
                }}
            />

            {openSuccess && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="theme-card w-full max-w-lg rounded-2xl p-6 text-white"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span className="theme-btn-primary inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
                                ✓
                            </span>
                            <h2 className="text-xl font-bold tracking-tight">
                                {t('createProject.successTitle')}
                            </h2>
                        </div>

                        <p className="text-sm text-white/70">
                            {t('createProject.successDesc')}
                        </p>

                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <button
                                className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                                onClick={() => {
                                    if (resolvedTeamName) {
                                        setOpenSuccess(false);
                                        router.push(`/team/${encodeURIComponent(resolvedTeamName)}/dashboard`);
                                        return;
                                    }
                                    setOpenSuccess(false);
                                    setOpenTeamSelect(true);
                                }}
                            >
                                {resolvedTeamName
                                    ? t('createProject.successGoTeamDashboard')
                                    : t('createProject.successSelectTeam')}
                            </button>
                            <button
                                className="theme-btn-primary rounded-lg px-5 py-2 text-sm font-semibold transition hover:brightness-110 active:scale-[0.99] w-full sm:w-auto"
                                onClick={() => {
                                    setOpenSuccess(false);
                                    router.push(`/project/${encodeURIComponent(createdProjectName || projectName)}`);
                                }}
                            >
                                {t('createProject.successGoProject')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {openTeamSelect && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 backdrop-blur-md">
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="theme-card relative w-full max-w-xl overflow-hidden rounded-2xl p-0 text-white shadow-[0_24px_70px_rgba(5,10,25,0.55)]"
                    >
                        <div className="relative px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
                            <div className="pointer-events-none absolute -top-10 right-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                                        {t('createProject.selectTeamTitle')}
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold">
                                        {t('createProject.selectTeamDesc')}
                                    </h2>
                                </div>
                                <button
                                    className="theme-btn-secondary rounded-full px-3 py-1.5 text-xs font-semibold transition hover:brightness-110"
                                    onClick={() => setOpenTeamSelect(false)}
                                >
                                    {t('common.close')}
                                </button>
                            </div>
                        </div>

                        <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                            {!teamLoading && !teamError && teams.length > 0 && (
                                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex-1">
                                        <div className="theme-card flex items-center gap-2 rounded-xl px-3 py-2">
                                            <input
                                                value={teamQuery}
                                                onChange={(e) => setTeamQuery(e.target.value)}
                                                placeholder={t('createProject.selectTeamSearch')}
                                                className="w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
                                            />
                                            {teamQuery && (
                                                <button
                                                    className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70 ring-1 ring-white/20 transition hover:bg-white/20"
                                                    onClick={() => setTeamQuery('')}
                                                >
                                                    {t('common.reset')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/20 transition ${
                                                teamSort === 'recent'
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                            onClick={() => setTeamSort('recent')}
                                        >
                                            {t('createProject.selectTeamSortRecent')}
                                        </button>
                                        <button
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-white/20 transition ${
                                                teamSort === 'name'
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                            onClick={() => setTeamSort('name')}
                                        >
                                            {t('createProject.selectTeamSortName')}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {teamLoading && (
                                <div className="theme-card rounded-xl p-4 text-sm text-white/70">
                                    {t('createProject.selectTeamLoading')}
                                </div>
                            )}

                            {!teamLoading && teamError && (
                                <div className="theme-card rounded-xl border border-rose-300/30 bg-rose-400/10 p-4 text-sm text-rose-200">
                                    {teamError}
                                </div>
                            )}

                            {!teamLoading && !teamError && teams.length === 0 && (
                                <div className="theme-card rounded-xl p-5 text-center">
                                    <p className="text-sm text-white/70">
                                        {t('createProject.selectTeamEmpty')}
                                    </p>
                                    <button
                                        className="theme-btn-primary mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110"
                                        onClick={() => {
                                            setOpenTeamSelect(false);
                                            router.push('/createteam');
                                        }}
                                    >
                                        {t('createProject.selectTeamCreate')}
                                    </button>
                                </div>
                            )}

                            {!teamLoading && !teamError && teams.length > 0 && (
                                <div className="max-h-80 space-y-2 overflow-auto pr-1">
                                    {visibleTeams.length === 0 && (
                                        <div className="theme-card rounded-xl p-4 text-sm text-white/70">
                                            {t('createProject.selectTeamNoResults')}
                                        </div>
                                    )}
                                    {visibleTeams.map((team, idx) => (
                                        <button
                                            key={team.id}
                                            className="theme-card group relative w-full overflow-hidden rounded-xl px-4 py-3 text-left text-sm text-white/90 transition hover:bg-white/15"
                                            onClick={() => {
                                                setCurrentTeamId(team.id);
                                                setOpenTeamSelect(false);
                                                router.push(`/team/${encodeURIComponent(team.teamName)}/dashboard`);
                                            }}
                                        >
                                            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-white/50">#{idx + 1}</span>
                                                        <div className="font-semibold text-white">{team.teamName}</div>
                                                    </div>
                                                    {team.description && (
                                                        <div className="mt-1 text-xs text-white/60">
                                                            {team.description}
                                                        </div>
                                                    )}
                                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                                                        <span className="rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/20">
                                                            {t('createProject.selectTeamMembers', {
                                                                count:
                                                                    typeof team.memberCount === 'number'
                                                                        ? team.memberCount
                                                                        : t('common.loading'),
                                                            })}
                                                        </span>
                                                        <span className="rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/20">
                                                            {t('createProject.selectTeamProjects', {
                                                                count:
                                                                    typeof team.projectCount === 'number'
                                                                        ? team.projectCount
                                                                        : t('common.loading'),
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70 ring-1 ring-white/25">
                                                    {t('common.enter')}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
