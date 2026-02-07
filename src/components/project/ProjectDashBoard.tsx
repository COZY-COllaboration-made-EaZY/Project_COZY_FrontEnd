'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTaskListRequest } from '@/api/requests/task';
import { useProjectStore } from '@/store/projectStore';

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
        ring: 'ring-stone-300',
        pill: 'bg-stone-100 text-stone-700',
        header: 'bg-white',
        dot: 'bg-stone-400',
    },
    '진행 중': {
        ring: 'ring-blue-200',
        pill: 'bg-blue-100 text-blue-800',
        header: 'bg-blue-50',
        dot: 'bg-blue-500',
    },
    '검토 중': {
        ring: 'ring-amber-200',
        pill: 'bg-amber-100 text-amber-900',
        header: 'bg-amber-50',
        dot: 'bg-amber-500',
    },
    '승인 중': {
        ring: 'ring-emerald-200',
        pill: 'bg-emerald-100 text-emerald-800',
        header: 'bg-emerald-50',
        dot: 'bg-emerald-500',
    },
    '머지 신청': {
        ring: 'ring-violet-200',
        pill: 'bg-violet-100 text-violet-800',
        header: 'bg-violet-50',
        dot: 'bg-violet-500',
    },
    '머지 완료': {
        ring: 'ring-gray-300',
        pill: 'bg-gray-100 text-gray-700',
        header: 'bg-gray-50',
        dot: 'bg-gray-500',
    },
};

export default function ProjectDashBoard() {
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
        <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200">
            <div className="mx-auto max-w-7xl px-6 pt-10">
                {/* 헤더 */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                        {projectName}
                    </h1>

                    <div className="flex w-full max-w-md items-center gap-2 md:w-80">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="작업 / 담당자 검색"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none
                            focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm hover:bg-stone-50"
                            >
                                초기화
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
                                className={`flex min-h-[420px] flex-col rounded-2xl border border-stone-300 bg-white/70
                                shadow-sm backdrop-blur-sm ring-1 ${theme.ring}`}
                            >
                                <header
                                    className={`sticky top-0 z-10 flex items-center justify-between rounded-t-2xl
                                    border-b border-stone-200 px-4 py-3 ${theme.header}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${theme.dot}`} />
                                        <h2 className="text-sm font-bold text-stone-800">
                                            {status}
                                        </h2>
                                    </div>
                                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
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
                                        <div className="mt-6 rounded-xl border border-dashed border-stone-300
                                        bg-white p-6 text-center text-xs text-stone-400">
                                            데이터 없음
                                        </div>
                                    ) : items.length === 0 ? (
                                        <div className="mt-6 rounded-xl border border-dashed border-stone-300
                                        bg-white p-6 text-center text-xs text-stone-400">
                                            작업 없음
                                        </div>
                                    ) : (
                                        items.map((task) => (
                                            <article
                                                /* 🔥 핵심 수정 */
                                                key={`${task.id}-${status}`}
                                                className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm
                                                transition hover:shadow-md"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="line-clamp-2 text-sm font-semibold text-stone-900">
                                                        {task.title}
                                                    </h3>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${theme.pill}`}
                                                    >
                                                        {status}
                                                    </span>
                                                </div>

                                                <div className="mt-2 flex items-center gap-2 text-xs text-stone-600">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full
                                                    bg-stone-200 text-[10px] font-bold text-stone-700">
                                                        {task.nickName?.slice(0, 2) ?? '익명'}
                                                    </div>
                                                    <span className="truncate">
                                                        {task.nickName ?? '—'}
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
