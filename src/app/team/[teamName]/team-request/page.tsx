"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getTeamJoinRequests,
    approveJoinRequest,
    rejectJoinRequest,
} from "@/api/requests/joinRequest";
import { useTeamStore } from "@/store/teamStore";

type JoinRequestItem = {
    requestId: string;
    requesterName: string;
    message?: string;
};

export default function TeamJoinRequestPage() {
    const router = useRouter();
    const {
        teams,
        currentTeamId,
        setCurrentTeamId,
    } = useTeamStore();

    const [requests, setRequests] = useState<JoinRequestItem[]>([]);
    const [loading, setLoading] = useState(true);

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

            alert(`${requesterName} 님을 팀에 승낙했습니다.`);

            setRequests((prev) =>
                prev.filter((r) => r.requestId !== requestId)
            );
        } catch (e: any) {
            console.error("approve error", e);
            alert("팀 참가 승낙에 실패했습니다.");
        }
    };

    const onReject = async (requestId: string, requesterName: string) => {
        try {
            await rejectJoinRequest(requestId);

            alert(`${requesterName} 님의 팀 참가 요청을 거부했습니다.`);

            setRequests((prev) =>
                prev.filter((r) => r.requestId !== requestId)
            );
        } catch (e: any) {
            console.error("reject error", e);
            alert("팀 참가 거부에 실패했습니다.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-4xl space-y-6">
                <header className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        팀 참가 요청
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="rounded-xl bg-gray-100 px-4 py-2 text-sm"
                    >
                        취소
                    </button>
                </header>

                {loading && (
                    <div className="text-center text-sm text-gray-500">
                        불러오는 중...
                    </div>
                )}

                {!loading && requests.length === 0 && (
                    <div className="text-center text-sm text-gray-600">
                        받은 팀 참가 요청이 없습니다.
                    </div>
                )}

                {requests.map((r) => (
                    <div
                        key={r.requestId}
                        className="rounded-xl border bg-white p-4 flex justify-between"
                    >
                        <div>
                            <div className="font-semibold">
                                요청자: {r.requesterName}
                            </div>
                            {r.message && (
                                <div className="text-sm text-gray-600">
                                    {r.message}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onApprove(r.requestId, r.requesterName)}
                                className="rounded-xl bg-black px-3 py-1 text-white text-sm"
                            >
                                승낙
                            </button>

                            <button
                                onClick={() => onReject(r.requestId, r.requesterName)}
                                className="rounded-xl bg-gray-200 px-3 py-1 text-sm"
                            >
                                거부
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
