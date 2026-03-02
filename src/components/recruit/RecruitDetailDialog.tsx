'use client';

import { useEffect, useState } from 'react';
import { deleteRecruitRequest, updateRecruitRequest } from '@/api/requests/recruit';
import TeamJoinRequestDialog from '@/components/recruit/TeamJoinRequestDialog';
import { useTranslation } from "react-i18next";

export type RecruitDetailItem = {
    id: number;
    title: string;
    nickName: string;
    recruitText: string;
    teamName: string;
    teamId: string;
    createdAt: string;
};

interface Props {
    recruit: RecruitDetailItem | null;
    onClose: () => void;
    onDeleted?: (id: number) => void;
    onUpdated?: (item: RecruitDetailItem) => void;
}

export default function RecruitDetailDialog({
                                                recruit,
                                                onClose,
                                                onDeleted,
                                                onUpdated,
                                            }: Props) {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showJoinDialog, setShowJoinDialog] = useState(false);

    useEffect(() => {
        if (!recruit) return;
        setIsEditing(false);
        setEditTitle(recruit.title);
        setEditContent(recruit.recruitText);
    }, [recruit]);

    if (!recruit) return null;

    const handleSave = async () => {
        setSaving(true);
        await updateRecruitRequest(recruit.id, {
            title: editTitle,
            recruitText: editContent,
        });
        onUpdated?.({ ...recruit, title: editTitle, recruitText: editContent });
        setIsEditing(false);
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!confirm(t('common.confirmDelete'))) return;
        setDeleting(true);
        await deleteRecruitRequest(recruit.id);
        onDeleted?.(recruit.id);
        setDeleting(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className="theme-card w-full max-w-3xl overflow-hidden rounded-3xl">

                    {/* Header */}
                    <div className="border-b border-white/20 px-4 py-4 sm:px-6 sm:py-5">
                        {isEditing ? (
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="
                                    w-full text-2xl font-bold text-white
                                    bg-transparent border-b-2 border-white/40
                                    focus:outline-none focus:border-white
                                "
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-white">
                                {recruit.title}
                            </h2>
                        )}

                        <div className="mt-2 flex flex-col gap-1 text-sm text-white/70 sm:flex-row sm:justify-between">
                            <span>✍ {recruit.nickName}</span>
                            <span>{new Date(recruit.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 py-5 sm:px-6 sm:py-6">
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="
                                    w-full h-64 p-4 sm:h-[360px]
                                    border border-white/30 rounded-xl resize-none
                                    bg-white/90 text-slate-900
                                    focus:outline-none focus:ring-2 focus:ring-white/40
                                "
                            />
                        ) : (
                            <div className="h-64 overflow-y-auto whitespace-pre-wrap text-white/90 sm:h-[360px]">
                                {recruit.recruitText}
                            </div>
                        )}
                    </div>

                    {/* Team Info */}
                    <div className="border-t border-white/20 bg-white/10 px-4 py-4 text-sm text-white/70 sm:px-6">
                        {t('recruit.teamLabel')}:
                        <span className="ml-2 font-medium text-white">
                            {recruit.teamName}
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-3 border-t border-white/20 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
                        {!isEditing && (
                            /* 팀 가입 신청 – 파스텔 오렌지 */
                            <button
                                onClick={() => setShowJoinDialog(true)}
                                className="
                                    w-full px-6 py-3 rounded-xl sm:w-auto
                                    theme-btn-primary
                                    font-semibold
                                    transition hover:brightness-110
                                "
                            >
                                {t('recruit.joinRequestTitle')}
                            </button>
                        )}

                        <div className="flex flex-wrap gap-2 sm:ml-auto sm:flex-nowrap">
                            {isEditing ? (
                                <>
                                    {/* 취소 – 파스텔 그레이 */}
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="
                                            w-full px-4 py-2 rounded-lg sm:w-auto
                                            theme-btn-secondary
                                            hover:brightness-110
                                        "
                                        disabled={saving}
                                    >
                                        {t('common.cancel')}
                                    </button>

                                    {/* 저장 – 파스텔 인디고 */}
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="
                                            w-full px-4 py-2 rounded-lg sm:w-auto
                                            theme-btn-primary
                                            hover:brightness-110
                                            disabled:opacity-50
                                        "
                                    >
                                        {saving ? t('common.saving') : t('common.save')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* 수정 – 파스텔 블루 */}
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="
                                            w-full px-4 py-2 rounded-lg sm:w-auto
                                            theme-btn-secondary
                                            hover:brightness-110
                                        "
                                    >
                                        {t('common.edit')}
                                    </button>

                                    {/* 삭제 – 파스텔 레드 */}
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="
                                            w-full px-4 py-2 rounded-lg sm:w-auto
                                            theme-btn-secondary
                                            hover:brightness-110
                                            disabled:opacity-50
                                        "
                                    >
                                        {t('common.delete')}
                                    </button>

                                    {/* 닫기 – 파스텔 그레이 */}
                                    <button
                                        onClick={onClose}
                                        className="
                                            w-full px-4 py-2 rounded-lg sm:w-auto
                                            theme-btn-secondary
                                            hover:brightness-110
                                        "
                                    >
                                        {t('common.close')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showJoinDialog && (
                <TeamJoinRequestDialog
                    teamId={recruit.teamId}
                    teamName={recruit.teamName}
                    onClose={() => setShowJoinDialog(false)}
                    onSuccess={() => setShowJoinDialog(false)}
                />
            )}
        </>
    );
}
