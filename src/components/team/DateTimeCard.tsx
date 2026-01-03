"use client";

import { useEffect, useState } from "react";

interface Props {
    locale: string;
    am: string;
    pm: string;
}

export function DateTimeCard({ locale, am, pm }: Props) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = now.getHours();
    const isAM = hours < 12;

    const dateText = now.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    });

    const timeText = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-600">
                {dateText}
            </p>
            <p className="mt-2 text-xl font-bold tracking-widest text-gray-900">
                {isAM ? am : pm} {timeText}
            </p>
        </div>
    );
}
