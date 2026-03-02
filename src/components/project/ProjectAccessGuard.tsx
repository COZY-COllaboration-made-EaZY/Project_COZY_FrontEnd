"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import { useProjectStore } from "@/store/projectStore";
import { getMyTeamInfoRequest } from "@/api/requests/team";
import { getMyTeamProjectListRequest } from "@/api/requests/project";

type Props = {
    projectName: string;
    children: React.ReactNode;
};

export default function ProjectAccessGuard({ projectName, children }: Props) {
    const router = useRouter();
    const { t } = useTranslation();
    const { isLoggedIn, isHydrated } = useUserStore();
    const { setProjects, setCurrentProjectId } = useProjectStore();

    const [loading, setLoading] = useState(true);
    const [denied, setDenied] = useState(false);
    const [mounted, setMounted] = useState(false);

    const decodedProjectName = useMemo(() => {
        try {
            return decodeURIComponent(projectName);
        } catch {
            return projectName;
        }
    }, [projectName]);

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
                const teams = await getMyTeamInfoRequest();
                if (!teams || teams.length === 0) {
                    setDenied(true);
                    return;
                }
                const results = await Promise.all(
                    teams.map((t) => getMyTeamProjectListRequest(t.id))
                );
                const projects = results.flatMap((res) => res?.projects ?? []);
                const matched = projects.find(
                    (p) => p.projectName === decodedProjectName
                );
                setProjects(
                    projects.map((p) => ({
                        id: String(p.projectId ?? p.id),
                        name: p.projectName,
                        leader: "",
                        description: p.description ?? "",
                    }))
                );
                if (matched) {
                    setCurrentProjectId(String(matched.projectId ?? matched.id));
                    setDenied(false);
                } else {
                    setDenied(true);
                }
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [isHydrated, mounted, isLoggedIn, decodedProjectName, setProjects, setCurrentProjectId]);

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
                        {t("accessDenied.projectTitle")}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                        {isLoggedIn ? t("accessDenied.projectBody") : t("accessDenied.loginBody")}
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => router.push("/")}
                                    className="theme-btn-primary rounded-xl px-4 py-2"
                                >
                                    {t("accessDenied.goProjectList")}
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
