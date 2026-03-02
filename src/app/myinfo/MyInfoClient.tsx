'use client';

export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import VerifyPassword from "@/components/Myinfo/VerifyPassword";
import ProfileEdit from "@/components/Myinfo/ProfileEdit";
import ProfileView from "@/components/Myinfo/ProfileView";
import PersonalHub from "@/components/Myinfo/PersonalHub";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function MyInfoClient() {
    const { user, setUser, isLoggedIn, isHydrated } = useUserStore();
    const router = useRouter();
    const { t } = useTranslation();
    const [isVerified, setIsVerified] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !isHydrated) return;
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [mounted, isHydrated, isLoggedIn, router]);

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
                    <h2 className="text-lg font-bold text-white">{t("accessDenied.loginTitle")}</h2>
                    <p className="mt-2 text-sm text-white/70">{t("accessDenied.loginBody")}</p>
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
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4">
                {!isVerified ? (
                    <div className="flex min-h-[60vh] w-full items-center justify-center">
                        <VerifyPassword onVerify={() => setIsVerified(true)} />
                    </div>
                ) : isEditing ? (
                    <div className="flex min-h-[60vh] w-full items-center justify-center">
                        <ProfileEdit
                            user={user}
                            setUser={setUser}
                            onCancel={() => setIsEditing(false)}
                            onSave={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex min-h-[60vh] w-full items-center justify-center">
                            <ProfileView user={user} onEdit={() => setIsEditing(true)} />
                        </div>
                        <div className="w-full pb-10">
                            <PersonalHub />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
