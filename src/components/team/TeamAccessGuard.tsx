"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTeamStore } from "@/store/teamStore";
import { useUserStore } from "@/store/userStore";
import { getMyTeamInfoRequest } from "@/api/requests/team";

type Props = {
    teamName: string;
    children: React.ReactNode;
};

export default function TeamAccessGuard({ teamName, children }: Props) {
    const router = useRouter();
    const { t } = useTranslation();
    const { isLoggedIn, isHydrated } = useUserStore();
    const { teams, setTeams, setCurrentTeamId } = useTeamStore();

    const [loading, setLoading] = useState(true);
    const [denied, setDenied] = useState(false);
    const [mounted, setMounted] = useState(false);

    const decodedTeamName = useMemo(() => {
        try {
            return decodeURIComponent(teamName);
        } catch {
            return teamName;
        }
    }, [teamName]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isHydrated || !mounted) return;
        if (!isLoggedIn) {
            setDenied(true);
            return;
        }

        const run = async () => {
            try {
                setLoading(true);
                let list = teams;
                if (!list || list.length === 0) {
                    list = await getMyTeamInfoRequest();
                    setTeams(list);
                }
                const matched = list.find((t) => t.teamName === decodedTeamName);
                if (matched) {
                    setCurrentTeamId(matched.id);
                    setDenied(false);
                } else {
                    setDenied(true);
                }
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [isHydrated, mounted, isLoggedIn, teams, setTeams, setCurrentTeamId, decodedTeamName]);

    useEffect(() => {
        if (!mounted || !denied || isLoggedIn) return;
        const timer = setTimeout(() => {
            router.replace("/login");
        }, 2000);
        return () => clearTimeout(timer);
    }, [mounted, denied, isLoggedIn, router]);

    if (!mounted || loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-white/70">
                <span suppressHydrationWarning />
            </div>
        );
    }

    if (denied) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="theme-card w-full max-w-md rounded-2xl p-6 text-center">
                    <h2 className="text-lg font-bold text-white">
                        {t("accessDenied.teamTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                        {isLoggedIn ? t("accessDenied.teamBody") : t("accessDenied.loginBody")}
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => router.push("/")}
                                    className="theme-btn-primary rounded-xl px-4 py-2"
                                >
                                    {t("accessDenied.goTeamList")}
                                </button>
                                <button
                                    onClick={() => router.back()}
                                    className="theme-btn-secondary rounded-xl px-4 py-2"
                                >
                                    {t("accessDenied.goBack")}
                                </button>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
