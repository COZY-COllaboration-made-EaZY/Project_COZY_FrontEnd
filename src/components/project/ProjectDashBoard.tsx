'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTaskListRequest } from '@/api/requests/task';
import { useProjectStore } from '@/store/projectStore';
import { useTranslation } from "react-i18next";

type Task = {
    id: number | string;
    title: string;
    nickName?: string;
    status: string;
};

const COLUMNS = [
    '시작 전',
    '진행 중',
    '검토 중',
    '승인 중',
    '머지 신청',
    '머지 완료',
] as const;

const STATUS_THEME: Record<
    string,
    { ring: string; pill: string; header: string; dot: string }
> = {
    '시작 전': {
        ring: 'ring-white/20',
        pill: 'bg-white/15 text-white/80',
        header: 'bg-white/10',
        dot: 'bg-sky-300',
    },
    '진행 중': {
        ring: 'ring-white/20',
        pill: 'bg-blue-500/20 text-blue-100',
        header: 'bg-white/10',
        dot: 'bg-blue-400',
    },
    '검토 중': {
        ring: 'ring-white/20',
        pill: 'bg-amber-400/20 text-amber-100',
        header: 'bg-white/10',
        dot: 'bg-amber-300',
    },
    '승인 중': {
        ring: 'ring-white/20',
        pill: 'bg-emerald-400/20 text-emerald-100',
        header: 'bg-white/10',
        dot: 'bg-emerald-300',
    },
    '머지 신청': {
        ring: 'ring-white/20',
        pill: 'bg-violet-400/20 text-violet-100',
        header: 'bg-white/10',
        dot: 'bg-violet-300',
    },
    '머지 완료': {
        ring: 'ring-white/20',
        pill: 'bg-slate-400/20 text-slate-100',
        header: 'bg-white/10',
        dot: 'bg-slate-300',
    },
};

export default function ProjectDashBoard() {
    const { t } = useTranslation();
    const params = useParams();
    const projectName = (params?.projectName as string) ?? '';
    const { currentProjectId } = useProjectStore();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            if (!currentProjectId) return;

            try {
                setIsLoading(true);
                const data = await getTaskListRequest(currentProjectId);
                setTasks(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                setTasks([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [currentProjectId]);

    const filteredTasks = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return tasks;

        return tasks.filter(
            (t) =>
                (t.title ?? '').toLowerCase().includes(q) ||
                (t.nickName ?? '').toLowerCase().includes(q)
        );
    }, [tasks, search]);

    /** 🔹 상태별 그룹핑 */
    const byStatus = useMemo(() => {
        const map = new Map<string, Task[]>();
        for (const s of COLUMNS) map.set(s, []);

        for (const t of filteredTasks) {
            if (!map.has(t.status)) map.set(t.status, []);
            map.get(t.status)!.push(t);
        }

        return map;
    }, [filteredTasks]);

    const isEmptyAll = !isLoading && filteredTasks.length === 0;

    const Skeleton = () => (
        <div className="rounded-xl border border-white/20 bg-white/10 p-3">
            <div className="h-3 w-2/3 animate-pulse rounded bg-white/20" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-white/20" />
        </div>
    );

    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 pt-6 md:pt-10">
                {/* 헤더 */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                        {projectName}
                    </h1>

                    <div className="flex w-full md:max-w-md items-center gap-2 md:w-80">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t('projectBoard.searchPlaceholder')}
                            className="w-full rounded-xl border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none
                            focus:border-white focus:ring-2 focus:ring-white/40"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="theme-btn-secondary rounded-xl px-3 py-2 text-sm transition hover:brightness-110"
                            >
                                {t('common.reset')}
                            </button>
                        )}
                    </div>
                </div>

                {/* 칸반 */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {COLUMNS.map((status) => {
                        const items = byStatus.get(status) ?? [];
                        const theme = STATUS_THEME[status];

                        return (
                            <section
                                key={status}
                                className={`theme-card flex min-h-[420px] flex-col rounded-2xl ring-1 ${theme.ring}`}
                            >
                                <header
                                    className={`sticky top-0 z-10 flex items-center justify-between rounded-t-2xl
                                    border-b border-white/20 px-4 py-3 ${theme.header}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                                        <h2 className="text-sm font-bold text-white/90">
                                            {status === '시작 전'
                                                ? t('task.status.todo')
                                                : status === '진행 중'
                                                    ? t('task.status.inProgress')
                                                    : status === '검토 중'
                                                        ? t('task.status.inReview')
                                                        : status === '승인 중'
                                                            ? t('task.status.inApproval')
                                                            : status === '머지 신청'
                                                                ? t('task.status.mergeRequest')
                                                                : status === '머지 완료'
                                                                    ? t('task.status.mergeDone')
                                                                    : status}
                                        </h2>
                                    </div>
                                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white/80">
                                        {isLoading ? '-' : items.length}
                                    </span>
                                </header>

                                <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                                    {isLoading ? (
                                        <>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    ) : isEmptyAll ? (
                                        <div className="mt-6 rounded-xl border border-dashed border-white/30
                                        bg-white/5 p-6 text-center text-xs text-white/60">
                                            {t('projectBoard.noData')}
                                        </div>
                                    ) : items.length === 0 ? (
                                        <div className="mt-6 rounded-xl border border-dashed border-white/30
                                        bg-white/5 p-6 text-center text-xs text-white/60">
                                            {t('projectBoard.noTasks')}
                                        </div>
                                    ) : (
                                        items.map((task) => (
                                            <article
                                                /* 🔥 핵심 수정 */
                                                key={`${task.id}-${status}`}
                                                className="rounded-xl border border-white/20 bg-white/10 p-3 shadow-sm
                                                transition hover:bg-white/15"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="line-clamp-2 text-sm font-semibold text-white">
                                                        {task.title}
                                                    </h3>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${theme.pill}`}
                                                    >
                                                        {status === '시작 전'
                                                            ? t('task.status.todo')
                                                            : status === '진행 중'
                                                                ? t('task.status.inProgress')
                                                                : status === '검토 중'
                                                                    ? t('task.status.inReview')
                                                                    : status === '승인 중'
                                                                        ? t('task.status.inApproval')
                                                                        : status === '머지 신청'
                                                                            ? t('task.status.mergeRequest')
                                                                            : status === '머지 완료'
                                                                                ? t('task.status.mergeDone')
                                                                                : status}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full
                                                    bg-white/20 text-[10px] font-bold text-white/80">
                                                        {task.nickName?.slice(0, 2) ?? t('projectBoard.anonymous')}
                                                    </div>
                                                    <span className="truncate">
                                                        {task.nickName ?? t('projectBoard.noAuthor')}
                                                    </span>
                                                </div>
                                            </article>
                                        ))
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
