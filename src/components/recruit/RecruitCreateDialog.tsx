'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from "@/store/userStore";
import { createRecruitRequest } from "@/api/requests/recruit";
import { useTeamStore } from "@/store/teamStore";
import { useTranslation } from "react-i18next";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function RecruitCreateDialog({ onClose, onSuccess }: Props) {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const [title, setTitle] = useState('');
    const [recruitText, setRecruitText] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    const {
        teams,
        currentTeamId,
        setCurrentTeamId,
    } = useTeamStore();

    /** 팀이 1개면 자동 선택 */
    useEffect(() => {
        if (teams.length === 1 && !currentTeamId) {
            setCurrentTeamId(teams[0].id);
        }
    }, [teams, currentTeamId, setCurrentTeamId]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    const canSubmit =
        title.trim().length > 0 &&
        currentTeamId &&
        teams.length > 0;

    const handleSubmit = async () => {
        if (!canSubmit) return;

        try {
            await createRecruitRequest({
                teamId: currentTeamId,
                title,
                nickName: user?.nickname ?? "",
                recruitText,
            });

            onSuccess();
            handleClose();
        } catch {
            alert(t('recruit.createFailed'));
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`theme-card w-full max-w-2xl rounded-3xl px-4 py-5 text-white transform transition-all duration-300 sm:px-6 md:px-8 ${
                    isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
            >
                <h2 className="text-lg font-semibold mb-1">{t('recruit.createTitle')}</h2>
                <hr className="mb-6 border-t border-white/20" />

                {/* 팀이 없는 경우 안내 */}
                {teams.length === 0 && (
                    <div className="mb-6 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/80">
                        {t('recruit.teamRequired')}
                    </div>
                )}

                <div className="space-y-5">
                    {/* Title */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <label className="w-full text-sm font-semibold text-white/80 sm:w-20">
                            {t('recruit.fields.title')}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 sm:w-80
                                       focus:outline-none focus:ring-2 focus:ring-white/40"
                        />
                    </div>

                    {/* Team Select */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <label className="w-full text-sm font-semibold text-white/80 sm:w-20">
                            {t('recruit.fields.team')}
                        </label>

                        {teams.length > 1 ? (
                            <select
                                value={currentTeamId}
                                onChange={(e) => setCurrentTeamId(e.target.value)}
                                className="w-full rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 sm:w-60
                                           focus:outline-none focus:ring-2 focus:ring-white/40"
                            >
                                <option value="">{t('recruit.teamSelectPlaceholder')}</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.teamName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="w-full rounded-md border border-white/30 bg-white/80 px-4 py-2 text-sm text-slate-900 sm:w-60">
                                {teams[0]?.teamName ?? t('recruit.teamNone')}
                            </div>
                        )}
                    </div>

                    {/* 내용 */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-white/80">
                            {t('recruit.fields.content')}
                        </label>
                        <textarea
                            rows={10}
                            value={recruitText}
                            onChange={(e) => setRecruitText(e.target.value)}
                            className="w-full resize-none rounded-md border border-white/30 bg-white/90 p-3 text-sm text-slate-900
                                       focus:outline-none focus:ring-2 focus:ring-white/40"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className={`
                            text-sm px-5 py-2 rounded-md transition w-full sm:w-auto
                            ${canSubmit
                            ? 'theme-btn-primary hover:brightness-110'
                            : 'bg-white/20 text-white/50 cursor-not-allowed'}
                        `}
                    >
                        {t('common.submit')}
                    </button>
                    <button
                        onClick={handleClose}
                        className="theme-btn-secondary rounded-md px-5 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
}
