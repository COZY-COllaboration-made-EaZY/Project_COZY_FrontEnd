'use client';

import { useEffect, useState } from 'react';
import { deleteRecruitRequest, updateRecruitRequest } from '@/api/requests/recruit';
import TeamJoinRequestDialog from '@/components/recruit/TeamJoinRequestDialog';

export type RecruitItem = {
    id: number;
    title: string;
    nickName: string;
    recruitText: string;
    teamName: string;
    teamId: string;
    createdAt: string;
};

interface Props {
    recruit: RecruitItem | null;
    onClose: () => void;
    onDeleted?: (id: number) => void;
    onUpdated?: (item: RecruitItem) => void;
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
            {/* Recruit Detail Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-5 border-b bg-gradient-to-r from-indigo-50 to-sky-50">
                        {isEditing ? (
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="
                                    w-full text-2xl font-bold bg-transparent
                                    border-b-2 border-indigo-400
                                    focus:outline-none focus:border-indigo-600 transition
                                "
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-900">
                                {recruit.title}
                            </h2>
                        )}

                        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                            <span>✍{recruit.nickName}</span>
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
                                    w-full h-[360px] p-4 border rounded-xl resize-none
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                                "
                            />
                        ) : (
                            <div className="
                                h-[360px] overflow-y-auto pr-2
                                whitespace-pre-wrap text-gray-800 leading-relaxed
                            ">
                                {recruit.recruitText}
                            </div>
                        )}
                    </div>

                    {/* Extra Info */}
                    <div className="px-6 py-4 border-t bg-gray-50 text-sm text-gray-500">
                            팀 ID:
                        <span className="ml-2 font-medium text-gray-700">{recruit.teamName}</span>
                    </div>


                    {/* Footer */}
                    <div className="px-6 py-4 border-t flex items-center bg-white">
                        {!isEditing && (
                            <button
                                onClick={() => setShowJoinDialog(true)}
                                className="
                                    px-6 py-3 rounded-xl
                                    bg-gradient-to-r from-amber-400 to-orange-500
                                    text-white font-semibold shadow-md
                                    hover:opacity-90 active:scale-[0.98] transition
                                "
                            >
                                팀 가입 신청
                            </button>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                                        disabled={saving}
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {saving ? '저장 중...' : '저장'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {deleting ? '삭제 중...' : '삭제'}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
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
                    onSuccess={() => {
                        setShowJoinDialog(false);
                    }}
                />
            )}
        </>
    );
}
