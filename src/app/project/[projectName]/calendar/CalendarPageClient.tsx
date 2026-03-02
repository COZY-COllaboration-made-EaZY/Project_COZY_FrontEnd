'use client';

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from 'react';
import { useProjectStore } from "@/store/projectStore";
import { getTaskListRequest } from "@/api/requests/task";
import { useTranslation } from "react-i18next";

type Task = {
    id?: number;
    title: string;
    createdAt?: string; // ISO
    // status?: 'todo' | 'doing' | 'done'; // 있으면 색상으로 구분 가능
};

export default function CalendarPageClient() {
    const { t } = useTranslation();
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState<Task[]>([]);
    const { currentProjectId } = useProjectStore();
    const weekDays = t('calendar.weekdays', { returnObjects: true }) as string[];

    useEffect(() => {
        (async () => {
            if (!currentProjectId) return;
            try {
                setIsLoading(true);
                const data = await getTaskListRequest(currentProjectId);
                setPosts(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [currentProjectId]);

    const changeMonth = (offset: number) => {
        let m = month + offset;
        let y = year;
        if (m < 0) { m = 11; y -= 1; }
        else if (m > 11) { m = 0; y += 1; }
        setMonth(m);
        setYear(y);
    };

    const firstDay = new Date(year, month, 1).getDay();
    const startIndex = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 월~금만 쓰므로 시작 인덱스가 5 이상이면 5로 클램프
    const days: (number | null)[] = Array(startIndex >= 5 ? 5 : startIndex).fill(null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    // 5열 분할
    const rows: (number | null)[][] = [];
    for (let i = 0; i < days.length; i += 5) {
        rows.push(days.slice(i, i + 5));
    }

    const fmt = (d: number) => {
        const m = (month + 1).toString().padStart(2, '0');
        const dd = d.toString().padStart(2, '0');
        return `${year}-${m}-${dd}`;
    };

    // 검색 필터 적용
    const filteredBySearch = useMemo(() => {
        const q = search.trim();
        if (!q) return posts;
        return posts.filter(p => (p.title ?? '').toLowerCase().includes(q.toLowerCase()));
    }, [posts, search]);

    // 날짜별 그룹
    const postsByDate = useMemo(() => {
        const map = new Map<string, Task[]>();
        for (const p of filteredBySearch) {
            if (!p.createdAt) continue;
            const key = p.createdAt.split('T')[0];
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(p);
        }
        return map;
    }, [filteredBySearch]);

    const isToday = (d: number | null) => {
        if (!d) return false;
        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            d === today.getDate()
        );
    };

    return (
        <div className="theme-page relative min-h-screen overflow-hidden p-4 md:p-6">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            {/* 상단 바 */}
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* 좌: 검색 */}
                    <div className="flex w-full md:max-w-md items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t('calendar.searchPlaceholder')}
                                className="w-full rounded-xl border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-white focus:ring-2 focus:ring-white/40"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="theme-btn-secondary absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs transition hover:brightness-110"
                                >
                                    {t('common.reset')}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 우: 월 변경 */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="theme-btn-secondary rounded-xl px-3 py-2 text-sm transition hover:brightness-110 active:scale-[0.99]"
                            aria-label={t('calendar.prevMonth')}
                        >
                            ◀
                        </button>
                        <div className="theme-card rounded-xl px-3 py-2 text-sm font-semibold text-white">
                            {t('calendar.monthLabel', { year, month: month + 1 })}
                        </div>
                        <button
                            onClick={() => changeMonth(1)}
                            className="theme-btn-secondary rounded-xl px-3 py-2 text-sm transition hover:brightness-110 active:scale-[0.99]"
                            aria-label={t('calendar.nextMonth')}
                        >
                            ▶
                        </button>
                        <button
                            onClick={() => {
                                setYear(today.getFullYear());
                                setMonth(today.getMonth());
                            }}
                            className="theme-btn-secondary rounded-xl px-3 py-2 text-sm transition hover:brightness-110 active:scale-[0.99]"
                        >
                            {t('common.today')}
                        </button>
                    </div>
                </div>

                {/* 요일 헤더 */}
                <div className="mt-6 grid grid-cols-5 gap-2">
                    {weekDays.map((d) => (
                        <div
                            key={d}
                            className="theme-card rounded-xl px-3 py-2 text-center text-sm font-semibold text-white/80"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* 캘린더 그리드 */}
                <div className="mt-2 flex flex-col gap-2">
                    {isLoading ? (
                        // 스켈레톤
                        Array.from({ length: Math.max(4, rows.length) }).map((_, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-5 gap-2">
                                {Array.from({ length: 5 }).map((__, cIdx) => (
                                    <div
                                        key={cIdx}
                                        className="h-32 animate-pulse rounded-2xl border border-white/20 bg-white/10"
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        rows.map((week, i) => (
                            <div key={i} className="grid grid-cols-5 gap-2">
                                {week.map((day, j) => {
                                    const dateStr = day ? fmt(day) : null;
                                    const dayPosts = dateStr ? (postsByDate.get(dateStr) ?? []) : [];
                                    const hasContent = dayPosts.length > 0;

                                    return (
                                        <div
                                            key={j}
                                            className={[
                                                "relative h-32 rounded-2xl border p-2 transition",
                                                "border-white/20 bg-white/10 hover:bg-white/15",
                                                isToday(day) ? "ring-2 ring-white/60" : "",
                                                !day ? "opacity-50" : "",
                                            ].join(" ")}
                                        >
                                            {/* 날짜 뱃지 */}
                                            <div
                                                className={[
                                                    "absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold",
                                                    isToday(day)
                                                        ? "bg-white/80 text-slate-900"
                                                        : "bg-white/15 text-white/80 border border-white/20",
                                                ].join(" ")}
                                            >
                                                {day ?? ''}
                                            </div>

                                            <div className="mt-6 flex flex-col gap-1 overflow-y-auto pr-1">
                                                {hasContent ? (
                                                    dayPosts.map((post, idx) => (
                                                        <div
                                                            key={`${post.id ?? idx}`}
                                                            className="w-full truncate rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-white/90"
                                                            title={post.title}
                                                        >
                                                            {post.title}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-xs text-white/60 select-none">
                                                        {t('calendar.noSchedule')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
