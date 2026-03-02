'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";

export type Task = {
    taskId: number;
    title: string;
    nickName?: string;
    status: string;
    createdAt?: string;
};

type Props = {
    tasks: Task[];
    loading?: boolean;
    onRowClick: (taskId: number) => void;
    onAddClick: () => void;
};

const statusClass = (s: string) => {
    switch (s) {
        case '시작 전':
            return 'bg-white/15 text-white/80';
        case '진행 중':
            return 'bg-blue-500/20 text-blue-100';
        case '검토 중':
            return 'bg-violet-500/20 text-violet-100';
        case '승인 중':
            return 'bg-amber-400/20 text-amber-100';
        case '머지 신청':
            return 'bg-pink-400/20 text-pink-100';
        case '머지 완료':
            return 'bg-emerald-400/20 text-emerald-100';
        default:
            return 'bg-white/15 text-white/80';
    }
};

export default function TaskTable({
                                      tasks,
                                      loading,
                                      onRowClick,
                                      onAddClick,
                                  }: Props) {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return tasks.filter(
            (t) =>
                t.title.toLowerCase().includes(q) ||
                (t.nickName ?? '').toLowerCase().includes(q)
        );
    }, [tasks, search]);

    return (
        <div className="w-full">
            {/* ===== Header ===== */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold text-white">
                    <span suppressHydrationWarning>
                        {mounted ? t('task.title') : ''}
                    </span>
                </h1>

                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={mounted ? t('task.searchPlaceholder') : ''}
                        className="h-10 w-full md:w-64 rounded-md border border-white/30 bg-white/90 px-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-white/40"
                    />
                    <button
                        onClick={onAddClick}
                        className="theme-btn-primary w-full md:w-auto rounded-md px-4 py-2 text-sm font-medium transition hover:brightness-110"
                    >
                        <span suppressHydrationWarning>
                            {mounted ? t('task.add') : ''}
                        </span>
                    </button>
                </div>
            </div>

            {/* ===== Card Table ===== */}
            <div className="theme-card rounded-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                        <tr className="border-b border-white/20 bg-white/10 text-left text-white/70">
                            <th className="px-6 py-4">
                                <span suppressHydrationWarning>{mounted ? t('task.columns.status') : ''}</span>
                            </th>
                            <th className="px-6 py-4">
                                <span suppressHydrationWarning>{mounted ? t('task.columns.title') : ''}</span>
                            </th>
                            <th className="px-6 py-4">
                                <span suppressHydrationWarning>{mounted ? t('task.columns.author') : ''}</span>
                            </th>
                            <th className="px-6 py-4">
                                <span suppressHydrationWarning>{mounted ? t('task.columns.created') : ''}</span>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-white/70">
                                    <span suppressHydrationWarning>{mounted ? t('common.loading') : ''}</span>
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-white/70">
                                    <span suppressHydrationWarning>{mounted ? t('task.empty') : ''}</span>
                                </td>
                            </tr>
                        ) : (
                            filtered.map((task: Task) => (
                                <tr
                                    key={task.taskId}
                                    onClick={() => onRowClick(task.taskId)}
                                    className="cursor-pointer border-t border-white/10 transition hover:bg-white/10"
                                >
                                    <td className="px-6 py-4">
                      <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              task.status
                          )}`}
                      >
                        <span suppressHydrationWarning>
                          {mounted
                              ? task.status === '시작 전'
                                  ? t('task.status.todo')
                                  : task.status === '진행 중'
                                      ? t('task.status.inProgress')
                                      : task.status === '검토 중'
                                          ? t('task.status.inReview')
                                          : task.status === '승인 중'
                                              ? t('task.status.inApproval')
                                              : task.status === '머지 신청'
                                                  ? t('task.status.mergeRequest')
                                                  : task.status === '머지 완료'
                                                      ? t('task.status.mergeDone')
                                                      : task.status
                              : ''}
                        </span>
                      </span>
                                    </td>

                                    <td className="px-6 py-4 text-white">{task.title}</td>
                                    <td className="px-6 py-4 text-white/70">{task.nickName ?? '-'}</td>
                                    <td className="px-6 py-4 text-white/70">
                                        {mounted && task.createdAt
                                            ? new Date(task.createdAt).toLocaleDateString()
                                            : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                    <div className="text-xs text-white/60">
                        <span suppressHydrationWarning>
                            {mounted ? t('common.totalCount', { count: filtered.length }) : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
