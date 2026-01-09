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
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="relative h-40 w-40 rounded-full border-4 border-gray-800">

                <div
                    className="absolute left-1/2 top-1/2 h-10 w-1 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-gray-800"
                    style={{ transform: `rotate(${hourDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-14 w-0.5 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-gray-600"
                    style={{ transform: `rotate(${minuteDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-16 w-0.5 origin-bottom
                               -translate-x-1/2 -translate-y-full bg-red-500"
                    style={{ transform: `rotate(${secondDeg}deg)` }}
                />

                <div
                    className="absolute left-1/2 top-1/2 h-3 w-3
                               -translate-x-1/2 -translate-y-1/2
                               rounded-full bg-gray-800"
                />
            </div>
        </div>
    );
}
