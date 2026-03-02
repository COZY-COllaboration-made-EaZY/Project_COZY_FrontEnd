"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkTeamNameRequest, createTeamRequest } from "@/api/requests/team";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";

type NameCheckStatus = "idle" | "checking" | "available" | "duplicate" | "error";

export const CreateTeamForm = () => {
    const { t } = useTranslation();
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
            setMessage(t('team.create.nameRequired'));
            return;
        }

        setStatus("checking");
        setMessage("");

        try {
            const isDuplicate = await checkTeamNameRequest(teamName.trim());

            if (isDuplicate) {
                setStatus("duplicate");
                setMessage(t('team.create.nameDuplicate'));
            } else {
                setStatus("available");
                setMessage(t('team.create.nameAvailable'));
            }
        } catch {
            setStatus("error");
            setMessage(t('team.create.nameCheckFailed'));
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

            alert(t('team.create.success'));
            router.push("/");
        } catch {
            setMessage(t('team.create.failed'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="theme-card w-full max-w-md rounded-2xl p-8 text-white">
                {/* Title */}
                <h2 className="mb-6 text-center text-2xl font-semibold text-white">
                    {t('team.create.title')}
                </h2>

                {/* Team Name */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-white/80">
                        {t('team.create.teamName')}
                    </label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <input
                            value={teamName}
                            onChange={(e) => handleChangeName(e.target.value)}
                            className="flex-1 rounded-lg border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400
                                   focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                            placeholder={t('team.create.teamNamePlaceholder')}
                        />
                        <button
                            onClick={handleCheckName}
                            disabled={status === "checking"}
                            className="theme-btn-secondary rounded-lg px-4 py-2 text-sm font-medium transition hover:brightness-110 disabled:opacity-50 w-full sm:w-auto"
                        >
                            {status === "checking" ? t('team.create.checking') : t('team.create.check')}
                        </button>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <p
                        className={`mb-4 text-sm ${
                            status === "available"
                                ? "text-emerald-200"
                                : status === "duplicate" || status === "error"
                                    ? "text-rose-200"
                                    : "text-white/60"
                        }`}
                    >
                        {message}
                    </p>
                )}

                {/* Description */}
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-white/80">
                        {t('team.create.description')}
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900
                               focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder={t('team.create.descriptionPlaceholder')}
                    />
                </div>

                {/* Create Button */}
                <button
                    onClick={handleSave}
                    disabled={status !== "available" || saving || !isLoggedIn}
                    className="theme-btn-primary w-full rounded-xl py-3 text-sm font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {saving ? t('team.create.creating') : t('team.create.createButton')}
                </button>
            </div>
        </div>
    );

};
