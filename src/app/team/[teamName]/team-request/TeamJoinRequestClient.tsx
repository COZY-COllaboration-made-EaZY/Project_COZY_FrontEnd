"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getTeamJoinRequests,
    approveJoinRequest,
    rejectJoinRequest,
} from "@/api/requests/joinRequest";
import { useTeamStore } from "@/store/teamStore";
import { useTranslation } from "react-i18next";

type JoinRequestItem = {
    requestId: string;
    requesterName: string;
    message?: string;
};

export default function TeamJoinRequestClient() {
    const { t } = useTranslation();
    const router = useRouter();
    const {
        teams,
        currentTeamId,
        setCurrentTeamId,
    } = useTeamStore();

    const [requests, setRequests] = useState<JoinRequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [rejecting, setRejecting] = useState(false);
    const [targetRequest, setTargetRequest] = useState<JoinRequestItem | null>(null);

    useEffect(() => {
        if (!currentTeamId && teams.length === 1) {
            setCurrentTeamId(teams[0].id);
        }
    }, [teams, currentTeamId, setCurrentTeamId]);

    useEffect(() => {
        if (!currentTeamId) {
            setLoading(false);
            return;
        }

        const fetchRequests = async () => {
            setLoading(true);
            try {
                const res = await getTeamJoinRequests(currentTeamId);
                const list =
                    res.data?.data?.requests ??
                    res.data?.requests ??
                    [];
                setRequests(list);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [currentTeamId]);

    const onApprove = async (requestId: string, requesterName: string) => {
        try {
            await approveJoinRequest(requestId);

            alert(t('team.joinRequestApproved', { name: requesterName }));

            setRequests((prev) =>
                prev.filter((r) => r.requestId !== requestId)
            );
        } catch (e: unknown) {
            console.error("approve error", e);
            alert(t('team.joinRequestApproveFailed'));
        }
    };

    const onReject = async (requestId: string, requesterName: string) => {
        if (!rejectReason.trim()) {
            alert(t('team.joinRequestRejectReasonRequired'));
            return;
        }
        if (rejectReason.trim().length > 200) {
            alert(t('team.joinRequestRejectReasonTooLong'));
            return;
        }
        try {
            setRejecting(true);
            await rejectJoinRequest(requestId, rejectReason.trim());

            alert(t('team.joinRequestRejected', { name: requesterName }));

            setRequests((prev) =>
                prev.filter((r) => r.requestId !== requestId)
            );
            setRejectOpen(false);
            setRejectReason("");
            setTargetRequest(null);
        } catch (e: unknown) {
            console.error("reject error", e);
            alert(t('team.joinRequestRejectFailed'));
        } finally {
            setRejecting(false);
        }
    };

    return (
        <main className="relative w-full py-8">
            <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-2">
                <header className="theme-card flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <h1 className="text-2xl font-bold text-white">
                        {t('team.joinRequestTitle')}
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="theme-btn-secondary rounded-xl px-4 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.cancel')}
                    </button>
                </header>

                {loading && (
                    <div className="text-center text-sm text-white/70">
                        {t('common.loading')}
                    </div>
                )}

                {!loading && requests.length === 0 && (
                    <div className="text-center text-sm text-white/60">
                        {t('team.joinRequestEmpty')}
                    </div>
                )}

                {requests.map((r) => (
                    <div
                        key={r.requestId}
                        className="theme-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <div className="font-semibold text-white">
                                {t('team.requester')}: {r.requesterName}
                            </div>
                            {r.message && (
                                <div className="text-sm text-white/70">
                                    {r.message}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                onClick={() => onApprove(r.requestId, r.requesterName)}
                                className="theme-btn-primary rounded-xl px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                            >
                                {t('team.approve')}
                            </button>

                            <button
                                onClick={() => {
                                    setTargetRequest(r);
                                    setRejectReason("");
                                    setRejectOpen(true);
                                }}
                                className="theme-btn-secondary rounded-xl px-4 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                            >
                                {t('team.reject')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {rejectOpen && targetRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="theme-card w-full max-w-md rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-white">
                            {t('team.joinRequestRejectTitle')}
                        </h2>
                        <p className="mt-2 text-sm text-white/70">
                            {t('team.joinRequestRejectGuide', { name: targetRequest.requesterName })}
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="mt-4 min-h-[120px] w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40"
                            placeholder={t('team.joinRequestRejectPlaceholder')}
                            maxLength={200}
                        />
                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setRejectOpen(false)}
                                className="theme-btn-secondary rounded-xl px-4 py-2"
                                disabled={rejecting}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={() => onReject(targetRequest.requestId, targetRequest.requesterName)}
                                className="theme-btn-primary rounded-xl px-4 py-2"
                                disabled={rejecting}
                            >
                                {rejecting ? t('common.loading') : t('team.reject')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
