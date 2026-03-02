"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
    weekdays: string[];
    locale: string;
}

export function CalendarCard({ weekdays, locale }: Props) {
    const [today, setToday] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setToday(new Date());
    }, []);

    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = useMemo(() => {
        const result: (number | null)[] = [];
        for (let i = 0; i < firstDay; i++) result.push(null);
        for (let d = 1; d <= lastDate; d++) result.push(d);
        return result;
    }, [firstDay, lastDate]);

    const monthLabel = new Date(year, month).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
    });

    return (
        <div className="theme-card rounded-3xl p-6">
            <div className="mb-4 text-center text-sm text-white/80" suppressHydrationWarning>
                {mounted ? monthLabel : ""}
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-white/70">
                {weekdays.map((d) => (
                    <div key={d} suppressHydrationWarning>
                        {mounted ? d : ""}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-sm text-white/90">
                {days.map((d, i) => (
                    <div key={i}>
                        {mounted && d && (
                            <div
                                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full transition
                                    ${
                                    d === date
                                        ? "bg-white text-purple-700 font-bold shadow-[0_6px_16px_rgba(255,255,255,0.35)]"
                                        : "hover:bg-white/15"
                                }`}
                            >
                                {d}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
