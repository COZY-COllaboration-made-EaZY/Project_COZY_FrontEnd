"use client";

import { useEffect, useState } from "react";

export default function ClockWidget() {
    const [now, setNow] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

    const dateText = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    });

    const timeText = now.toLocaleTimeString("ko-KR");

    return (
        <div className="theme-card rounded-xl p-6">
            <div className="flex flex-col items-center gap-4">
                {/* Analog Clock */}
                <div className="relative h-40 w-40 rounded-full border-4 border-white/80">
                    <div
                        className="absolute left-1/2 top-1/2 h-10 w-1 -translate-x-1/2 -translate-y-full bg-white origin-bottom"
                        style={{ transform: mounted ? `rotate(${hourDeg}deg)` : "rotate(0deg)" }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-14 w-0.5 -translate-x-1/2 -translate-y-full bg-white/70 origin-bottom"
                        style={{ transform: mounted ? `rotate(${minuteDeg}deg)` : "rotate(0deg)" }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-16 w-0.5 -translate-x-1/2 -translate-y-full bg-red-500 origin-bottom"
                        style={{ transform: mounted ? `rotate(${secondDeg}deg)` : "rotate(0deg)" }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </div>

                {/* Date */}
                <p className="text-sm font-medium text-white/70" suppressHydrationWarning>
                    {mounted ? dateText : ""}
                </p>

                {/* Digital Time */}
                <p className="text-xl font-bold text-white tracking-widest" suppressHydrationWarning>
                    {mounted ? timeText : ""}
                </p>
            </div>
        </div>
    );
}
