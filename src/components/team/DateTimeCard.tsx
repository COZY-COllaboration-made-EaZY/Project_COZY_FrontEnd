"use client";

import { useEffect, useState } from "react";

interface Props {
    locale: string;
    am: string;
    pm: string;
}

export function DateTimeCard({ locale, am, pm }: Props) {
    const [now, setNow] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
        <div className="theme-card rounded-3xl p-5 text-center">
            <p className="text-sm font-medium text-white/80" suppressHydrationWarning>
                {mounted ? dateText : ""}
            </p>
            <p className="mt-2 text-xl font-bold tracking-widest text-white" suppressHydrationWarning>
                {mounted ? `${isAM ? am : pm} ${timeText}` : ""}
            </p>
        </div>
    );
}
