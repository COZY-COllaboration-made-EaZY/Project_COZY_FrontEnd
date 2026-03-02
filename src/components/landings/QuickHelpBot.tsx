"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type QaItem = {
    id: string;
    question: string;
    answer: string;
};

const QA_IDS = [
    "create-team",
    "invite-member",
    "create-project",
    "task-management",
    "roles",
    "project-settings",
    "project-board",
    "recruit",
    "help",
    "profile",
    "notifications",
] as const;

export default function QuickHelpBot() {
    const { t } = useTranslation();
    const [active, setActive] = useState<QaItem | null>(null);
    const [started, setStarted] = useState(false);
    const [open, setOpen] = useState(false);
    const [typing, setTyping] = useState(false);
    const [query, setQuery] = useState("");

    const chatLines = useMemo(() => {
        if (!active || typing) return [];
        return [
            {
                id: `${active.id}-q`,
                role: "user" as const,
                text: active.question,
            },
            {
                id: `${active.id}-a`,
                role: "bot" as const,
                text: active.answer,
            },
        ];
    }, [active, typing]);

    useEffect(() => {
        if (!active || !started) return;
        setTyping(true);
        const timer = setTimeout(() => setTyping(false), 700);
        return () => clearTimeout(timer);
    }, [active, started]);

    const qaList = useMemo<QaItem[]>(() => {
        return QA_IDS.map((id) => ({
            id,
            question: t(`helpBot.questions.${id}.q`),
            answer: t(`helpBot.questions.${id}.a`),
        }));
    }, [t]);

    const filteredList = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return qaList;
        return qaList.filter((item) =>
            `${item.question} ${item.answer}`.toLowerCase().includes(q)
        );
    }, [qaList, query]);

    useEffect(() => {
        setActive((prev) => {
            const currentId = prev?.id ?? qaList[0]?.id;
            const next = qaList.find((item) => item.id === currentId) ?? qaList[0] ?? null;
            return next;
        });
    }, [qaList]);

    return (
        <div className="pointer-events-none fixed bottom-6 right-6 z-40">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl text-white shadow-[0_18px_40px_rgba(15,23,42,0.45)] backdrop-blur transition hover:bg-white/25"
                aria-label="Open help bot"
            >
                🤖
            </button>

            {open && (
                <div className="pointer-events-auto mt-3 w-[320px] rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0.05))] p-4 text-white shadow-[0_24px_60px_rgba(5,10,25,0.6)] md:w-[380px]">
                    <div className="flex items-center justify-between">
                        <div>
                        <div className="text-sm font-semibold text-white/90">{t("helpBot.title")}</div>
                            <div className="text-xs text-white/60">{t("helpBot.subtitle")}</div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 transition hover:bg-white/20"
                        >
                            {t("common.close")}
                        </button>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="space-y-2">
                            {!started && (
                                <div className="rounded-xl bg-white/5 p-3 text-xs text-white/60">
                                    {t("helpBot.hint")}
                                </div>
                            )}
                            {started && typing && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs text-white/70">
                                        <span>{t("helpBot.typing")}</span>
                                        <span className="flex items-center gap-1">
                                            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
                                            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:120ms]" />
                                            <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:240ms]" />
                                        </span>
                                    </div>
                                </div>
                            )}
                            {started &&
                                chatLines.map((line) => (
                                    <div
                                        key={line.id}
                                        className={`flex ${line.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs ${
                                                line.role === "user"
                                                    ? "bg-white/20 text-white"
                                                    : "bg-white/10 text-white/80"
                                            }`}
                                        >
                                            {line.text}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="mt-3">
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={t("helpBot.search")}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                        />
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {filteredList.map((item) => {
                            const isActive = active?.id === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setActive(item);
                                        setStarted(true);
                                    }}
                                    className={`rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                                        isActive
                                            ? "bg-white/15 text-white shadow-[0_10px_22px_rgba(15,23,42,0.35)]"
                                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {item.question}
                                </button>
                            );
                        })}
                        {filteredList.length === 0 && (
                            <div className="rounded-xl bg-white/5 px-3 py-2 text-xs text-white/60">
                                {t("helpBot.noResults")}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
