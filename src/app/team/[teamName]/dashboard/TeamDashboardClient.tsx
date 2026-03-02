"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardCenter } from "@/components/team/DashboardCenter";
import { DashboardRight } from "@/components/team/DashBoardRight";
import { DashboardLeft } from "@/components/team/DashBoardLeft";
import { DashboardLabels } from "@/types/types";
import { useTeamStore } from "@/store/teamStore";
import { getMyTeamInfoRequest, getTeamStatsRequest } from "@/api/requests/team";
import { getTeamPosts } from "@/api/requests/board";
import { useParams } from "next/navigation";

export default function TeamDashboardClient() {
    const { t, i18n } = useTranslation();
    const { currentTeamId, setTeams, setCurrentTeamId, teams } = useTeamStore();
    const params = useParams();
    const teamName = typeof params?.teamName === "string" ? params.teamName : "";
    const [noticeList, setNoticeList] = useState<{ postId: string; title: string; authorName: string; createdAt: string }[]>([]);
    const [postList, setPostList] = useState<{ postId: string; title: string; authorName: string; createdAt: string }[]>([]);
    const [counts, setCounts] = useState({
        inactive: 0,
        promotion: 0,
        projects: 0,
        notice: 0,
        leave: 0,
        join: 0,
    });

    const weekdays = t("dashboard.date.weekdays", {
        returnObjects: true,
    }) as string[];

    const labels: DashboardLabels = {
        teamStatus: t("dashboard.teamStatus"),
        cards: {
            inactive: t("dashboard.cards.inactive"),
            promotion: t("dashboard.cards.promotion"),
            projects: t("dashboard.cards.projects"),
            notice: t("dashboard.cards.notice"),
            leave: t("dashboard.cards.leave"),
            join: t("dashboard.cards.join"),
        },
        recentNotice: t("dashboard.recentNotice"),
        recentPost: t("dashboard.recentPost"),
        empty: t("dashboard.empty"),
        weekdays,
        am: t("dashboard.date.am"),
        pm: t("dashboard.date.pm"),
        locale: i18n.language,
        unit: {
            count: t("dashboard.unit.count"),
        },
    };

    useEffect(() => {
        if (currentTeamId) return;
        if (!teamName) return;
        (async () => {
            const list = await getMyTeamInfoRequest();
            setTeams(list);
            const matched = list.find((t) => t.teamName === teamName);
            if (matched) {
                setCurrentTeamId(matched.id);
            }
        })();
    }, [currentTeamId, teamName, setTeams, setCurrentTeamId]);

    useEffect(() => {
        if (!currentTeamId) return;
        (async () => {
            const [notices, posts, stats] = await Promise.all([
                getTeamPosts(currentTeamId, "NOTICE"),
                getTeamPosts(currentTeamId, "BOARD"),
                getTeamStatsRequest(currentTeamId),
            ]);
            setNoticeList(notices.slice(0, 3));
            setPostList(posts.slice(0, 3));
            setCounts({
                inactive: stats.inactiveMemberCount ?? 0,
                promotion: stats.upgradeRequestCount ?? 0,
                projects: stats.projectCount ?? 0,
                notice: stats.noticeCount ?? 0,
                leave: stats.leaveRequestCount ?? 0,
                join: stats.joinRequestCount ?? 0,
            });
        })();
    }, [currentTeamId]);

    return (
        <main className="relative w-full py-6">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-[320px_1fr_360px]">
                <DashboardLeft labels={labels} />
                <DashboardCenter labels={labels} counts={counts} />
                <DashboardRight
                    labels={labels}
                    teamName={teamName}
                    notices={noticeList}
                    posts={postList}
                />
            </div>
        </main>
    );
}
