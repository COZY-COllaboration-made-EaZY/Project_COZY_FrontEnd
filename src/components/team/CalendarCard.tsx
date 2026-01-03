"use client";

import { useMemo } from "react";

interface Props {
    weekdays: string[];
    locale: string;
}

export function CalendarCard({ weekdays, locale }: Props) {
    const today = new Date();

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
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 text-center text-sm text-gray-600">
                {monthLabel}
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
                {weekdays.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                {days.map((d, i) => (
                    <div key={i}>
                        {d && (
                            <div
                                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full
                                    ${
                                    d === date
                                        ? "bg-indigo-600 text-white font-bold"
                                        : "hover:bg-gray-100"
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
