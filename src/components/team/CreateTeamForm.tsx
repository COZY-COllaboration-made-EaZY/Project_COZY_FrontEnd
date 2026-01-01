"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkTeamNameRequest, createTeamRequest } from "@/api/requests/team";
import { useUserStore } from "@/store/userStore";

type NameCheckStatus = "idle" | "checking" | "available" | "duplicate" | "error";

export const CreateTeamForm = () => {
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<NameCheckStatus>("idle");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    const router = useRouter();
    const { isLoggedIn } = useUserStore();

    /** 팀 이름 변경 시 검사 상태 초기화 */
    const handleChangeName = (value: string) => {
        setTeamName(value);
        setStatus("idle");
        setMessage("");
    };

    /** 중복 체크 */
    const handleCheckName = async () => {
        if (!teamName.trim()) {
            setMessage("Please enter a team name.");
            return;
        }

        setStatus("checking");
        setMessage("");

        try {
            const isDuplicate = await checkTeamNameRequest(teamName.trim());

            if (isDuplicate) {
                setStatus("duplicate");
                setMessage("This team name is already in use.");
            } else {
                setStatus("available");
                setMessage("This team name is available.");
            }
        } catch {
            setStatus("error");
            setMessage("Failed to check team name.");
        }
    };

    /** 팀 생성 */
    const handleSave = async () => {
        if (status !== "available" || !isLoggedIn) return;

        setSaving(true);

        try {
            await createTeamRequest({
                teamName: teamName.trim(),
                description: description.trim(),
            });

            alert("Successfully created team!");
            router.push("/");
        } catch {
            setMessage("Failed to create team.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-violet-200 bg-white p-8 shadow-[0_8px_30px_rgba(139,92,246,0.12)]">
                {/* Title */}
                <h2 className="mb-6 text-center text-2xl font-semibold text-violet-700">
                    Create New Team
                </h2>

                {/* Team Name */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-violet-700">
                        Team Name
                    </label>
                    <div className="flex gap-2">
                        <input
                            value={teamName}
                            onChange={(e) => handleChangeName(e.target.value)}
                            className="flex-1 rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400
                                   focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
                            placeholder="Enter team name"
                        />
                        <button
                            onClick={handleCheckName}
                            disabled={status === "checking"}
                            className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white
                                   hover:bg-violet-600 disabled:opacity-50"
                        >
                            {status === "checking" ? "Checking..." : "Check"}
                        </button>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <p
                        className={`mb-4 text-sm ${
                            status === "available"
                                ? "text-green-600"
                                : status === "duplicate" || status === "error"
                                    ? "text-red-500"
                                    : "text-gray-500"
                        }`}
                    >
                        {message}
                    </p>
                )}

                {/* Description */}
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-violet-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-sm text-gray-800
                               focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
                        placeholder="Describe your team (optional)"
                    />
                </div>

                {/* Create Button */}
                <button
                    onClick={handleSave}
                    disabled={status !== "available" || saving || !isLoggedIn}
                    className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white
                           hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {saving ? "Creating..." : "Create Team"}
                </button>
            </div>
        </div>
    );

};
