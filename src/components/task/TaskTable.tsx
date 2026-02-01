'use client';

import { useMemo, useState } from 'react';

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
            return 'bg-gray-100 text-gray-700';
        case '진행 중':
            return 'bg-blue-100 text-blue-800';
        case '검토 중':
            return 'bg-purple-100 text-purple-800';
        case '승인 중':
            return 'bg-amber-100 text-amber-800';
        case '머지 신청':
            return 'bg-pink-100 text-pink-800';
        case '머지 완료':
            return 'bg-emerald-100 text-emerald-800';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

export default function TaskTable({
                                      tasks,
                                      loading,
                                      onRowClick,
                                      onAddClick,
                                  }: Props) {
    const [search, setSearch] = useState('');

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
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Task List</h1>

                <div className="flex items-center gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className="h-10 w-64 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <button
                        onClick={onAddClick}
                        className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* ===== Card Table ===== */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                        <tr className="border-b bg-gray-50 text-left text-gray-500">
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Created</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    불러오는 중…
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                    현재 등록된 작업이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((t:Task) => (
                                <tr
                                    key={t.taskId}
                                    onClick={() => onRowClick(t.taskId)}
                                    className="cursor-pointer border-t transition hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                      <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              t.status
                          )}`}
                      >
                        {t.status}
                      </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-900">{t.title}</td>
                                    <td className="px-6 py-4 text-gray-700">{t.nickName ?? '-'}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {t.createdAt
                                            ? new Date(t.createdAt).toLocaleDateString()
                                            : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                    <div className="text-xs text-gray-500">총 {filtered.length}개</div>
                </div>
            </div>
        </div>
    );
}
