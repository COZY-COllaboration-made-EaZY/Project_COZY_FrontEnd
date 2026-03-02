"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonalMemoPanel from "@/components/Myinfo/PersonalMemoPanel";
import PersonalSchedulePanel from "@/components/Myinfo/PersonalSchedulePanel";
import PersonalPostPanel from "@/components/Myinfo/PersonalPostPanel";

type TabKey = "memo" | "schedule" | "board";

export default function PersonalHub() {
    const { t } = useTranslation();
    const [tab, setTab] = useState<TabKey>("memo");

    return (
        <div className="theme-card w-full rounded-2xl p-6 text-white/90">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-lg font-bold">{t("myinfo.personal.title")}</h3>
                    <p className="text-sm text-white/60">{t("myinfo.personal.subtitle")}</p>
                </div>
                <div className="flex gap-2">
                    {(["memo", "schedule", "board"] as TabKey[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={[
                                "rounded-xl px-3 py-1.5 text-sm transition",
                                tab === key
                                    ? "theme-btn-primary"
                                    : "theme-btn-secondary text-white/70",
                            ].join(" ")}
                        >
                            {t(`myinfo.personal.tabs.${key}`)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                {tab === "memo" && <PersonalMemoPanel />}
                {tab === "schedule" && <PersonalSchedulePanel />}
                {tab === "board" && <PersonalPostPanel />}
            </div>
        </div>
    );
}
