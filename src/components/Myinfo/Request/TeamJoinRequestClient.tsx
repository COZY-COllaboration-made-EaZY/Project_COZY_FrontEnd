'use client'

import {useEffect, useState} from "react";
import {getMyJoinRequests} from "@/api/requests/joinRequest";

type TeamJoinRequest = {
    requestId: string;
    requesterName: string;
    teamName: string;
    message: string;
    createdAt: string;
};


export default function TeamJoinRequestClient() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState<TeamJoinRequest[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getRequestList = async () => {
            try {
                const res = await getMyJoinRequests();

                const list = res.data?.requests ?? [];
                setRequests(list);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        getRequestList();
    }, []);


    return(
        <main className={"min-h-screen bg-gray-50 px-4 py-10"}>
            <div className={"mx-auto max-w-5xl"}>

                {/* Title */}
                <header className={"mt-6"}>
                    <h1 className={"text-2xl font-bold text-gray-900"}>내 팀 신청목록</h1>
                    <p className={"mt-1 text-sm text-gray-600"}>내가 신청한 팀과 현재 상태를 확인할 수 있습니다.</p>
                </header>

                <br/>

                {loading && (
                    <section>
                        <p>신청 내역을 불러오는 중입니다...</p>
                    </section>
                )}

                {!loading && error && (
                    <section className={"rounded-2xl border bg-white py-20 text-center shadow-sm"}>
                        <p className={"text-lg font-medium text-gray-800"}>{error}</p>
                    </section>
                )}

                {!loading && !error && requests.length === 0 && (
                    <div className={"space-y-4"}>
                        <section className={"rounded-2xl border bg-white py-20 text-center shadow-sm"}>
                            <p className={"text-lg font-medium text-gray-800"}>현재 신청 내역이 없습니다.</p>
                            <p className={"mt-2 text-sm text-gray-500"}>팀 모집 게시판에서 새로운 팀을 찾아보세요.</p>
                        </section>
                    </div>
                )}

                {!loading && !error && requests.length > 0 && (
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <section
                                key={req.requestId}
                                className="rounded-2xl border bg-white p-6 shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {req.teamName}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            신청자: {req.requesterName}
                                        </p>
                                    </div>

                                    <span className="text-xs text-gray-400">
                                        {new Date(req.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {req.message && (
                                    <p className="mt-3 text-sm text-gray-700">
                                        {req.message}
                                    </p>
                                )}
                            </section>
                        ))}
                    </div>
                )}


            </div>
        </main>
    )
}