"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { refreshAccessToken } from "@/api/Axios";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export default function AuthRefreshBridge() {
    const pathname = usePathname();
    const { isLoggedIn, isHydrated } = useUserStore();
    const refreshInFlight = useRef(false);

    useEffect(() => {
        if (!isHydrated || !isLoggedIn) return;
        if (refreshInFlight.current) return;
        refreshInFlight.current = true;
        refreshAccessToken().catch(() => {
            // handled in Axios module (alert + redirect)
        }).finally(() => {
            refreshInFlight.current = false;
        });
    }, [pathname, isHydrated, isLoggedIn]);

    useEffect(() => {
        if (!isHydrated || !isLoggedIn) return;
        const interval = setInterval(() => {
            if (refreshInFlight.current) return;
            refreshInFlight.current = true;
            refreshAccessToken().catch(() => {
                // handled in Axios module (alert + redirect)
            }).finally(() => {
                refreshInFlight.current = false;
            });
        }, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [isHydrated, isLoggedIn]);

    return null;
}
