'use client';

import { useEffect, useState } from "react";
import { useTeamStore } from "@/store/teamStore";
import { getMemberListRequest } from "@/api/requests/team";

interface TeamMember {
    userId: string;
    memberName: string;
}

export default function TeamUserListPage() {
    const { currentTeamId } = useTeamStore();

    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentTeamId) return;

        const fetchMembers = async () => {
            try {
                setLoading(true);

                const data = await getMemberListRequest(currentTeamId);

                // ✅ 실제 응답 구조에 맞게
                const list: TeamMember[] =
                    Array.isArray((data as any)?.memberList)
                        ? (data as any).memberList
                        : [];

                setMembers(list);

            } catch (e) {
                console.error("팀 멤버 조회 실패:", e);
                alert("팀 멤버 조회 실패 (콘솔 확인)");
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [currentTeamId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading team members...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="mx-auto max-w-4xl space-y-8">

                {/* Title */}
                <header>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Team Members
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        팀에 가입된 멤버 목록
                    </p>
                </header>

                {/* Team User */}
                <section className="rounded-xl border bg-white shadow-sm">
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                        <h2 className="font-semibold text-gray-900">
                            👥 Team Users
                        </h2>
                        <span className="text-sm text-gray-500">
                            {members.length}명
                        </span>
                    </div>

                    <div className="max-h-96 overflow-auto px-5 py-4 space-y-2">
                        {members.map(member => (
                            <div
                                key={member.userId}
                                className="rounded-lg border px-4 py-3 hover:bg-gray-50 transition"
                            >
                                {member.memberName}
                            </div>
                        ))}

                        {members.length === 0 && (
                            <div className="py-16 text-center text-sm text-gray-500">
                                아직 팀원이 없습니다.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
