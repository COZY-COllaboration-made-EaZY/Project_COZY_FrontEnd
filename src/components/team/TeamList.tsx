"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { Team, useTeamStore } from "@/store/teamStore";
import { getMyTeamInfoRequest } from "@/api/requests/team";

export function TeamList() {
    const { isLoggedIn, accessToken } = useUserStore();
    const { teams, setTeams, setCurrentTeamId } = useTeamStore();

    const fetchedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn || !accessToken) return;
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        (async () => {
            try {
                setLoading(true);
                setErrMsg(null);

                // ✅ 서버에서 이미 Team[] 형태로 반환
                const data = await getMyTeamInfoRequest();
                setTeams(
                    data.filter(t => t.id && t.id.trim() !== "")
                );
            } catch (e: any) {
                console.error("Failed to fetch team list:", e);
                setErrMsg(
                    e?.response?.status === 401
                        ? "세션이 만료되었습니다."
                        : "팀 데이터를 불러오지 못했습니다."
                );
                setTeams([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [isLoggedIn, accessToken, setTeams]);

    if (!isLoggedIn) return null;

    return (
        <div className="mx-auto w-full max-w-3xl px-4 mb-10 text-center">
            {loading && <div className="text-slate-500">Loading your teams...</div>}
            {!loading && errMsg && (
                <div className="text-red-500 mb-4">{errMsg}</div>
            )}

            {/* 팀이 없을 때 */}
            {!loading && !errMsg && teams.length === 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">
                        Shall we do it together again today?
                    </h2>
                    <p className="text-lg font-semibold text-slate-800">
                        You are not in any teams yet
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Create a team or join an existing one to get started.
                    </p>
                    <div className="h-4" />
                    <Link
                        href="/createteam"
                        className="text-md md:text-lg mx-auto flex h-10 w-60 items-center justify-center rounded-lg bg-blue-400 font-medium text-white shadow-lg hover:bg-blue-700 md:h-14 md:w-64"
                    >
                        Get started
                    </Link>
                </>
            )}

            {/* 팀이 있을 때 */}
            {!loading && !errMsg && teams.length > 0 && (
                <>
                    <h2 className="text-5xl font-bold mb-6 text-gray-700">
                        I’m waiting for you.
                    </h2>

                    <div className="space-y-5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Team List</h3>
                        </div>

                        {teams.map((team: Team, index: number) => (
                            <div
                                key={team.id}
                                className="flex items-center justify-between gap-4 rounded-xl border p-4 text-left shadow-sm"
                            >
                                <div>
                                    <div className="font-semibold text-slate-800">
                                        {index + 1}. {team.teamName}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {team.description}
                                    </div>
                                </div>
                                <Link
                                    href={`/team/${encodeURIComponent(team.teamName)}/dashboard`}
                                    onClick={() => setCurrentTeamId(team.id)}
                                    className="flex items-center justify-center h-9 px-5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                                >
                                    Join
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
