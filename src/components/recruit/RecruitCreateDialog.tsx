'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from "@/store/userStore";
import { createRecruitRequest } from "@/api/requests/recruit";
import { useTeamStore } from "@/store/teamStore";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function RecruitCreateDialog({ onClose, onSuccess }: Props) {
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
        } catch (e) {
            alert("게시글 등록 실패");
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div
                className={`bg-white w-[600px] px-8 py-6 shadow-xl rounded-md transform transition-all duration-300 ${
                    isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
            >
                <h2 className="text-lg font-semibold mb-1">Create Recruit</h2>
                <hr className="mb-6 border-t" />

                {/* 팀이 없는 경우 안내 */}
                {teams.length === 0 && (
                    <div className="mb-6 rounded bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                        모집글을 작성하려면 먼저 팀에 소속되어야 합니다.
                    </div>
                )}

                <div className="space-y-5">
                    {/* Title */}
                    <div className="flex items-center gap-4">
                        <label className="w-20 text-sm font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-80 px-3 py-2 rounded text-sm border border-gray-300
                                       focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Team Select */}
                    <div className="flex items-center gap-4">
                        <label className="w-20 text-sm font-semibold">
                            Selected Team
                        </label>

                        {teams.length > 1 ? (
                            <select
                                value={currentTeamId}
                                onChange={(e) => setCurrentTeamId(e.target.value)}
                                className="w-60 px-3 py-2 rounded text-sm border border-gray-300
                                           focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">팀 선택</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.teamName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="bg-gray-100 text-sm px-4 py-2 rounded w-60 border border-gray-300">
                                {teams[0]?.teamName ?? "팀 없음"}
                            </div>
                        )}
                    </div>

                    {/* 내용 */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">
                            내용
                        </label>
                        <textarea
                            rows={10}
                            value={recruitText}
                            onChange={(e) => setRecruitText(e.target.value)}
                            className="w-full resize-none p-3 rounded text-sm border border-gray-300
                                       focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className={`
                            text-sm px-5 py-2 rounded
                            ${canSubmit
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                        `}
                    >
                        등록
                    </button>
                    <button
                        onClick={handleClose}
                        className="bg-gray-300 text-sm px-5 py-2 rounded hover:bg-gray-400"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
