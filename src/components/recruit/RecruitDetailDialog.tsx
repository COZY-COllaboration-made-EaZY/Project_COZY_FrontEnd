'use client';

import { useEffect, useState } from 'react';
import { deleteRecruitRequest, updateRecruitRequest } from '@/api/requests/recruit';
import TeamJoinRequestDialog from '@/components/recruit/TeamJoinRequestDialog';

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
        if (!confirm('정말 삭제하시겠습니까?')) return;
        setDeleting(true);
        await deleteRecruitRequest(recruit.id);
        onDeleted?.(recruit.id);
        setDeleting(false);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-5 border-b bg-gradient-to-r from-indigo-50 to-sky-50">
                        {isEditing ? (
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="
                                    w-full text-2xl font-bold
                                    bg-transparent border-b-2 border-indigo-300
                                    focus:outline-none focus:border-indigo-400
                                "
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-900">
                                {recruit.title}
                            </h2>
                        )}

                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                            <span>✍ {recruit.nickName}</span>
                            <span>{new Date(recruit.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="
                                    w-full h-[360px] p-4
                                    border border-gray-300 rounded-xl resize-none
                                    focus:outline-none focus:ring-2 focus:ring-indigo-200
                                "
                            />
                        ) : (
                            <div className="h-[360px] overflow-y-auto whitespace-pre-wrap text-gray-800">
                                {recruit.recruitText}
                            </div>
                        )}
                    </div>

                    {/* Team Info */}
                    <div className="px-6 py-4 border-t bg-gray-50 text-sm text-gray-600">
                        모집 팀:
                        <span className="ml-2 font-medium text-gray-800">
                            {recruit.teamName}
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t flex items-center">
                        {!isEditing && (
                            /* 팀 가입 신청 – 파스텔 오렌지 */
                            <button
                                onClick={() => setShowJoinDialog(true)}
                                className="
                                    px-6 py-3 rounded-xl
                                    bg-orange-200 text-orange-900
                                    font-semibold
                                    hover:bg-orange-300
                                    transition
                                "
                            >
                                팀 가입 신청
                            </button>
                        )}

                        <div className="ml-auto flex gap-2">
                            {isEditing ? (
                                <>
                                    {/* 취소 – 파스텔 그레이 */}
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="
                                            px-4 py-2 rounded-lg
                                            bg-slate-200 text-slate-700
                                            hover:bg-slate-300
                                        "
                                        disabled={saving}
                                    >
                                        취소
                                    </button>

                                    {/* 저장 – 파스텔 인디고 */}
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="
                                            px-4 py-2 rounded-lg
                                            bg-indigo-200 text-indigo-900
                                            hover:bg-indigo-300
                                            disabled:opacity-50
                                        "
                                    >
                                        {saving ? '저장 중...' : '저장'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* 수정 – 파스텔 블루 */}
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="
                                            px-4 py-2 rounded-lg
                                            bg-blue-200 text-blue-900
                                            hover:bg-blue-300
                                        "
                                    >
                                        수정
                                    </button>

                                    {/* 삭제 – 파스텔 레드 */}
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="
                                            px-4 py-2 rounded-lg
                                            bg-rose-200 text-rose-900
                                            hover:bg-rose-300
                                            disabled:opacity-50
                                        "
                                    >
                                        삭제
                                    </button>

                                    {/* 닫기 – 파스텔 그레이 */}
                                    <button
                                        onClick={onClose}
                                        className="
                                            px-4 py-2 rounded-lg
                                            bg-slate-200 text-slate-700
                                            hover:bg-slate-300
                                        "
                                    >
                                        닫기
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
