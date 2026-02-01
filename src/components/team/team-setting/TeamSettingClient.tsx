'use client';

import { useEffect, useState } from "react";
import { useTeamStore } from "@/store/teamStore";
import {
    deleteTeamRequest,
    getTeamDetailInfoRequest,
    updateTeamRequest,
} from "@/api/requests/team";
import ViewPanel from "@/components/team/team-setting/ViewPanel";
import EditPanel from "@/components/team/team-setting/EditPanel";

export type TeamForm = {
    description: string;
    owner: string; // 표시용
    teamName: string; // 표시용
};


type TeamDetailResponse = {
    teamId: string;
    teamName: string;
    description: string;
    leaderName: string;
};

export const TeamSettingClient = () => {
    const currentTeamId = useTeamStore((s) => s.currentTeamId);

    const [form, setForm] = useState<TeamForm | null>(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentTeamId) {
            setForm(null);
            setLoading(false);
            return;
        }

        const fetchTeam = async () => {
            try {
                setLoading(true);

                const data: TeamDetailResponse =
                    await getTeamDetailInfoRequest(currentTeamId);

                setForm({
                    teamName: data.teamName,
                    description: data.description,
                    owner: data.leaderName,
                });
            } catch (e) {
                console.error(e);
                alert("팀 정보를 불러오지 못했습니다.");
                setForm(null);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [currentTeamId]);

    /* 수정 */
    const handleUpdate = async (next: TeamForm) => {
        await updateTeamRequest({
            teamId: currentTeamId,
            description: next.description,
        });

        setForm(next);
        setEditing(false);
        alert("팀 정보가 수정되었습니다.");
    };

    /* 삭제 */
    const handleDelete = async () => {
        await deleteTeamRequest(currentTeamId);
        alert("팀이 삭제되었습니다.");
        // TODO: 팀 목록 페이지로 이동
    };

    if (loading || !form) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-500">팀 정보를 불러오는 중...</p>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-gray-100 py-10 px-4">
            <div className="mx-auto w-full max-w-5xl rounded-2xl border border-black/10 bg-white p-6 shadow-[0_6px_0_rgba(0,0,0,0.08)]">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Team Settings
                    </h1>

                    <button
                        onClick={() => setEditing((e) => !e)}
                        className="rounded-xl bg-black px-5 py-2 text-white hover:opacity-90"
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                </div>

                <div className="my-4 h-px w-full bg-black/10" />

                {!editing ? (
                    <ViewPanel
                        data={form}
                        onEdit={() => setEditing(true)}
                        onDelete={handleDelete}
                    />
                ) : (
                    <EditPanel
                        initial={form}
                        onCancel={() => setEditing(false)}
                        onSubmit={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </main>
    );
};
