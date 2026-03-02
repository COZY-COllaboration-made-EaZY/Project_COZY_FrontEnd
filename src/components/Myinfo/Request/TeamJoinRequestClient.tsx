'use client';

import {useEffect, useState} from "react";
import {getMyJoinRequests} from "@/api/requests/joinRequest";
import { useTranslation } from "react-i18next";

type TeamJoinRequest = {
    requestId: string;
    requesterName: string;
    teamName: string;
    message: string;
    createdAt: string;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    rejectReason?: string | null;
};


export default function TeamJoinRequestClient() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<TeamJoinRequest[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getRequestList = async () => {
            try {
                const res = await getMyJoinRequests();

                const list = res.data?.requests ?? [];
                setRequests(list);

            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : String(e);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        getRequestList();
    }, []);


    return(
        <main className="theme-page relative min-h-screen overflow-hidden px-4 py-8 md:py-10">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <div className={"relative z-10 mx-auto max-w-5xl"}>

                {/* Title */}
                <header className={"mt-6"}>
                    <h1 className={"text-2xl font-bold text-white"}>{t('myinfo.requests.title')}</h1>
                    <p className={"mt-1 text-sm text-white/70"}>{t('myinfo.requests.subtitle')}</p>
                </header>

                <br/>

                {loading && (
                    <section>
                        <p className="text-white/70">{t('myinfo.requests.loading')}</p>
                    </section>
                )}

                {!loading && error && (
                    <section className={"theme-card rounded-2xl py-20 text-center"}>
                        <p className={"text-lg font-medium text-white"}>{error}</p>
                    </section>
                )}

                {!loading && !error && requests.length === 0 && (
                    <div className={"space-y-4"}>
                        <section className={"theme-card rounded-2xl py-20 text-center"}>
                            <p className={"text-lg font-medium text-white"}>{t('myinfo.requests.empty')}</p>
                            <p className={"mt-2 text-sm text-white/60"}>{t('myinfo.requests.emptyHint')}</p>
                        </section>
                    </div>
                )}

                {!loading && !error && requests.length > 0 && (
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <section
                                key={req.requestId}
                                className="theme-card rounded-2xl p-6"
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-white">
                                            {req.teamName}
                                        </p>
                                        <p className="mt-1 text-sm text-white/70">
                                            {t('team.requester')}: {req.requesterName}
                                        </p>
                                    </div>

                                    <span className="text-xs text-white/60">
                                        {new Date(req.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {req.status && (
                                    <div className="mt-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70">
                                        {req.status === "PENDING"
                                            ? t('myinfo.requests.statusPending')
                                            : req.status === "APPROVED"
                                                ? t('myinfo.requests.statusApproved')
                                                : t('myinfo.requests.statusRejected')}
                                    </div>
                                )}

                                {req.message && (
                                    <p className="mt-3 text-sm text-white/80">
                                        {req.message}
                                    </p>
                                )}

                                {req.status === "REJECTED" && req.rejectReason && (
                                    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
                                        <div className="text-xs text-white/60">
                                            {t('myinfo.requests.rejectReason')}
                                        </div>
                                        <div className="mt-1 text-white/80">
                                            {req.rejectReason}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>
                )}


            </div>
        </main>
    )
}
