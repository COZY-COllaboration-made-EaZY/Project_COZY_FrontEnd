"use client";
import { useEffect, useState } from "react";

export function DateTimeCard() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-600">
                {now.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                })}
            </p>
            <p className="mt-2 text-xl font-bold tracking-widest text-gray-900">
                {now.toLocaleTimeString("ko-KR")}
            </p>
        </div>
    );
}
