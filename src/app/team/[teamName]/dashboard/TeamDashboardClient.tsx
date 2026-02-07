"use client";

import { useTranslation } from "react-i18next";
import { DashboardCenter } from "@/components/team/DashboardCenter";
import { DashboardRight } from "@/components/team/DashBoardRight";
import { DashboardLeft } from "@/components/team/DashBoardLeft";
import { DashboardLabels } from "@/types/types";

export default function TeamDashboardClient() {
    const { t, i18n } = useTranslation();

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

    return (
        <main className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 lg:grid-cols-[320px_1fr_360px]">
                <DashboardLeft labels={labels} />
                <DashboardCenter labels={labels} />
                <DashboardRight labels={labels} />
            </div>
        </main>
    );
}
