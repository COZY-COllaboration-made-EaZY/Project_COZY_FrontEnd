"use client";

import { useEffect, useState } from "react";

export function ClockOnly() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    return (
        <div className="theme-card relative flex items-center justify-center overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
            <div className="relative h-40 w-40 rounded-full border-4 border-white/70 shadow-[0_0_24px_rgba(255,255,255,0.25)]">

                <div
                    className="absolute left-1/2 top-1/2 h-10 w-1 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-white"
                    style={{ transform: `rotate(${hourDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-14 w-0.5 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-white/70"
                    style={{ transform: `rotate(${minuteDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-16 w-0.5 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-pink-300"
                    style={{ transform: `rotate(${secondDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-3 w-3
                               -translate-x-1/2 -translate-y-1/2
                               rounded-full bg-white"
                />
            </div>
        </div>
    );
}
