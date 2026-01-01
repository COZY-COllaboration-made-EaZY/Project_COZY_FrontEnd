"use client";

import { useEffect, useState } from "react";

export default function ClockWidget() {
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

    const dateText = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    });

    const timeText = now.toLocaleTimeString("ko-KR");

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Analog Clock */}
                <div className="relative h-40 w-40 rounded-full border-4 border-gray-800">
                    <div
                        className="absolute left-1/2 top-1/2 h-10 w-1 -translate-x-1/2 -translate-y-full bg-gray-800 origin-bottom"
                        style={{ transform: `rotate(${hourDeg}deg)` }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-14 w-0.5 -translate-x-1/2 -translate-y-full bg-gray-600 origin-bottom"
                        style={{ transform: `rotate(${minuteDeg}deg)` }}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-16 w-0.5 -translate-x-1/2 -translate-y-full bg-red-500 origin-bottom"
                        style={{ transform: `rotate(${secondDeg}deg)` }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800" />
                </div>

                {/* Date */}
                <p className="text-sm font-medium text-gray-600">
                    {dateText}
                </p>

                {/* Digital Time */}
                <p className="text-xl font-bold text-gray-900 tracking-widest">
                    {timeText}
                </p>
            </div>
        </div>
    );
}
