"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import VerifyPassword from "@/components/Myinfo/VerifyPassword";
import MyInfoNav from "@/components/Myinfo/MyInfoNav";

const VERIFIED_KEY = "myinfo_verified";

export default function MyInfoShell({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const router = useRouter();
    const { isLoggedIn, isHydrated } = useUserStore();
    const [mounted, setMounted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const stored = sessionStorage.getItem(VERIFIED_KEY);
        setIsVerified(stored === "true");
    }, [mounted]);

    useEffect(() => {
        if (!mounted || !isHydrated) return;
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [mounted, isHydrated, isLoggedIn, router]);

    const handleVerified = () => {
        setIsVerified(true);
        sessionStorage.setItem(VERIFIED_KEY, "true");
    };

    if (!mounted || !isHydrated) {
        return (
            <div className="theme-page relative flex h-screen items-center justify-center">
                <span suppressHydrationWarning />
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="theme-page relative flex h-screen items-center justify-center px-4">
                <div className="theme-card w-full max-w-md rounded-2xl p-6 text-center">
                    <h2 className="text-lg font-bold text-white">
                        {t("accessDenied.loginTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                        {t("accessDenied.loginBody")}
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        <button
                            onClick={() => router.replace("/login")}
                            className="theme-btn-primary rounded-xl px-4 py-2"
                        >
                            {t("accessDenied.goLogin")}
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="theme-btn-secondary rounded-xl px-4 py-2"
                        >
                            {t("accessDenied.goHome")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="theme-page relative min-h-screen overflow-hidden py-10">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
                {!isVerified ? (
                    <div className="flex min-h-[60vh] w-full items-center justify-center">
                        <VerifyPassword onVerify={handleVerified} />
                    </div>
                ) : (
                    <div className="grid gap-6">
                        <MyInfoNav />
                        <div>{children}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
