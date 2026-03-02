'use client';

import React, { useEffect } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { useUserStore } from '@/store/userStore';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    getMyTeamProjectDetailInfoRequest,
    getMyTeamProjectListRequest,
} from '@/api/requests/project';
import { useRouter } from 'next/navigation';
import { Info, FolderKanban } from 'lucide-react';
import { useTeamStore } from '@/store/teamStore';
import { useTranslation } from "react-i18next";

export const ProjectList = () => {
    const { t } = useTranslation();
    const { isLoggedIn } = useUserStore();
    const { projects, setProjects, setCurrentProjectId } = useProjectStore();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);
    const router = useRouter();

    /* 로그인 체크 */
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    /* 프로젝트 리스트 fetch (서버 기준 동기화) */
    useEffect(() => {
        if (!isLoggedIn || !currentTeamId) return;

        (async () => {
            const data = await getMyTeamProjectListRequest(currentTeamId);

            const list =
                data?.projects ??
                data?.data?.projects ??
                [];

            const normalized = list.map((p: { projectId?: string | number; id?: string | number; projectName?: string; name?: string; description?: string }) => ({
                id: String(p.projectId ?? p.id),
                name: String(p.projectName ?? p.name),
                description: p.description ?? '',
            }));

            setProjects(normalized);
        })();
    }, [isLoggedIn, currentTeamId, setProjects]);

    if (!isLoggedIn) return null;

    /* 프로젝트 입장 */
    const handleJoin = async (projectId: string, projectName: string) => {
        if (!projectId || !projectName) return;

        try {
            const data = await getMyTeamProjectDetailInfoRequest(projectId);
            if (!data) {
                alert(t('projectList.notFound'));
                return;
            }

            const projectIdData = String(data.projectId ?? projectId);
            const projectNameData = String(data.projectName ?? projectName).trim();

            setCurrentProjectId(projectIdData);
            router.push(`/project/${encodeURIComponent(projectNameData)}/dashboard`);
        } catch (error) {
            console.error('Join 실패:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full max-w-4xl px-4 mb-12"
        >
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                        {t('projectList.participating')}
                    </p>
                    <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                        {t('projectList.title')}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                        {t('projectList.subtitle')}
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <span className="text-sm text-white/70">
                        {t('projectList.countLabel', { count: projects.length })}
                    </span>
                    {projects.length > 0 && (
                        <Button asChild className="theme-btn-primary rounded-lg px-4 py-2 text-sm w-full sm:w-auto">
                            <Link
                                href={
                                    currentTeamId
                                        ? `/createproject?teamId=${encodeURIComponent(currentTeamId)}`
                                        : "/createproject"
                                }
                            >
                                {t('createProject.newProject')}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="theme-card rounded-2xl border-dashed p-10 text-center">
                    <div className="theme-btn-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
                        <FolderKanban className="h-7 w-7" />
                    </div>
                    <p className="text-xl font-semibold text-white">
                        {t('projectList.emptyTitle')}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                        {t('projectList.emptyDesc')}
                    </p>
                    <Button asChild className="theme-btn-primary mt-6 rounded-xl px-6">
                        <Link
                            href={
                                currentTeamId
                                    ? `/createproject?teamId=${encodeURIComponent(currentTeamId)}`
                                    : "/createproject"
                            }
                        >
                            {t('createProject.newProject')}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-3">
                    <ul className="space-y-3">
                        {projects.map((project) => (
                            <motion.li
                                key={project.id}
                                whileHover={{ y: -2 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="theme-card group relative overflow-hidden rounded-xl transition hover:shadow-[0_18px_44px_rgba(15,23,42,0.4)]"
                            >
                                <div className="theme-btn-primary pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <FolderKanban className="h-4 w-4 text-white/60" />
                                            <p className="truncate text-base font-semibold text-white">
                                                {t('projectList.projectName')}: {project.name}
                                            </p>
                                        </div>

                                        <div className="mt-2 flex items-start gap-2 text-sm text-white/70">
                                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                                            <p className="line-clamp-2">
                                                {project.description
                                                    ? `${t('projectList.description')}: ${project.description}`
                                                    : t('projectList.noDescription')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() =>
                                                handleJoin(String(project.id), String(project.name))
                                            }
                                            className="theme-btn-primary rounded-lg px-5 py-2 text-sm font-medium transition
                                                       hover:brightness-110
                                                       focus:outline-none
                                                       focus-visible:ring-2 focus-visible:ring-white/50
                                                       w-full sm:w-auto"
                                        >
                                            {t('projectList.join')}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
};
