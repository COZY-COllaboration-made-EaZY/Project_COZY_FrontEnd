"use client";

import React, { useMemo, useState } from "react";
import ViewPanel from "@/components/team/team-setting/ViewPanel";
import EditPanel from "@/components/team/team-setting/EditPanel";

export type TeamForm = {
    teamName: string;
    description: string;
    owner: string;
    devInterests: string[];
    createDay: string; // YYYY-MM-DD
};

export default function TeamSettingsPage() {
    // TODO: 여기에 서버에서 받아온 초기 데이터를 주입
    const initial: TeamForm = useMemo(
        () => ({
            teamName: "My Awesome Team",
            description: "우리 팀은 협업과 학습을 좋아합니다.",
            owner: "Odo",
            devInterests: ["Frontend", "SpringBoot", "Unity"],
            createDay: "2025-01-01",
        }),
        []
    );

    const [form, setForm] = useState<TeamForm>(initial);
    const [editing, setEditing] = useState(false);

    const handleUpdate = async (next: TeamForm) => {
        // TODO: await updateTeamRequest(next);
        setForm(next);
        alert("팀 정보가 업데이트되었습니다. (데모)");
        setEditing(false);
    };

    const handleDelete = async () => {
        // TODO: await deleteTeamRequest(teamId)
        const ok = confirm("정말 이 팀을 삭제할까요?");
        if (ok) alert("팀이 삭제되었습니다. (데모)");
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-gray-100 py-10 px-4">
            <div className="mx-auto w-full max-w-5xl rounded-2xl border border-black/10 bg-white p-6 shadow-[0_6px_0_rgba(0,0,0,0.08)]">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold tracking-tight">Team Settings</h1>
                    <button
                        onClick={() => setEditing((e) => !e)}
                        className="rounded-xl bg-black px-5 py-2 text-white transition hover:opacity-90"
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                </div>

                <div className="my-4 h-px w-full bg-black/10" />

                {!editing ? (
                    <ViewPanel
                        data={form}
                        onDelete={handleDelete}
                        onEdit={() => setEditing(true)}
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
}
