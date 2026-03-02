'use client';

import { useEffect, useState } from "react";
import {deletedPlanRequest, getPlanDetailRequest, updatePlanRequest} from '@/api/requests/task';
import { useTranslation } from "react-i18next";

type PlanDetail = {
    title: string;
    status: string;
    planText: string;
    nickname: string;
    createdAt: string;
};

export default function PlanDetailDialog({
                                             planId,
                                             onClose,
                                             onDeleted,
                                             onUpdated,
                                         }: {
    planId: number;
    onClose: () => void;
    onDeleted?: () => void;
    onUpdated?: () => void;
}) {
    const { t } = useTranslation();
    const [plan, setPlan] = useState<PlanDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState("계획");
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const data = await getPlanDetailRequest(planId);
                setPlan(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlan();
    }, [planId]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="theme-card w-full max-w-md rounded shadow p-4 text-white sm:p-6">{t('common.loading')}</div>
            </div>
        );
    }

    if (!plan) return null;

    // 상태 색상 매핑
    const statusColors: Record<string, string> = {
        "시작 전": "bg-white/15 text-white/80",
        "진행 중": "bg-blue-500/20 text-blue-100",
        "검토 중": "bg-violet-500/20 text-violet-100",
        "승인 중": "bg-amber-400/20 text-amber-100",
        "머지 신청": "bg-pink-400/20 text-pink-100",
        "머지 완료": "bg-emerald-400/20 text-emerald-100",
    };

    const statusLabelMap: Record<string, string> = {
        "시작 전": t('task.status.todo'),
        "진행 중": t('task.status.inProgress'),
        "검토 중": t('task.status.inReview'),
        "승인 중": t('task.status.inApproval'),
        "머지 신청": t('task.status.mergeRequest'),
        "머지 완료": t('task.status.mergeDone'),
    };

    const handleDelete = async () => {
        if (!confirm(t('common.confirmDelete'))) return;
        try {
            await deletedPlanRequest(planId);
            alert(t('common.deleteSuccess'));
            onDeleted?.();
            onClose();
        } catch (e) {
            console.error(e);
            alert(t('common.deleteFailed'));
        }
    };

    const startEdit = () => {
        setEditTitle(plan.title);
        setEditStatus(plan.status);
        setEditText(plan.planText);
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        try {
            await updatePlanRequest(planId, {
                title: editTitle,
                status: editStatus,
                planText: editText,
            });
            alert(t('common.updateSuccess'));
            onUpdated?.();
            setIsEditing(false);
            const data = await getPlanDetailRequest(planId);
            setPlan(data);
        } catch (e) {
            console.error(e);
            alert(t('common.updateFailed'));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="theme-card w-full max-w-xl rounded shadow p-4 text-white sm:p-6">
                {isEditing ? (
                    <>
                        <h2 className="text-xl font-bold mb-2">{t('plan.editTitle')}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-white/80">{t('plan.title')}</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full border border-white/30 bg-white/90 text-slate-900 px-3 py-2 rounded text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-white/80">{t('plan.status')}</label>
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    className="w-full border border-white/30 bg-white/90 text-slate-900 px-3 py-2 rounded text-sm"
                                >
                                    <option value="시작 전">{t('task.status.todo')}</option>
                                    <option value="진행 중">{t('task.status.inProgress')}</option>
                                    <option value="검토 중">{t('task.status.inReview')}</option>
                                    <option value="승인 중">{t('task.status.inApproval')}</option>
                                    <option value="머지 신청">{t('task.status.mergeRequest')}</option>
                                    <option value="머지 완료">{t('task.status.mergeDone')}</option>
                                </select>

                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-white/80">{t('plan.content')}</label>
                                <textarea
                                    rows={6}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full border border-white/30 bg-white/90 text-slate-900 px-3 py-2 rounded text-sm resize-none"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                className="theme-btn-secondary border px-3 py-1 text-sm transition hover:brightness-110 w-full sm:w-auto"
                                onClick={() => setIsEditing(false)}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                className="theme-btn-primary border px-3 py-1 text-sm transition hover:brightness-110 w-full sm:w-auto"
                                onClick={handleUpdate}
                            >
                                {t('common.save')}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-2">{plan.title}</h2>
                        <p className="text-white/60 mb-1">{t('common.author')}: {plan.nickname}</p>
                        <div
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                                statusColors[plan.status] || "bg-white/15 text-white/80"
                            }`}
                        >
                            {statusLabelMap[plan.status] ?? plan.status}
                        </div>
                        <div className="mb-4 whitespace-pre-wrap text-white/90">{plan.planText}</div>
                        <div className="text-xs text-white/50">
                            {new Date(plan.createdAt).toLocaleString()}
                        </div>
                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                className="theme-btn-secondary border px-3 py-1 text-sm transition hover:brightness-110 w-full sm:w-auto"
                                onClick={onClose}
                            >
                                {t('common.close')}
                            </button>
                            <button
                                className="theme-btn-secondary border px-3 py-1 text-sm transition hover:brightness-110 w-full sm:w-auto"
                                onClick={startEdit}
                            >
                                {t('common.edit')}
                            </button>
                            <button
                                className="theme-btn-secondary border px-3 py-1 text-sm text-white transition hover:brightness-110 w-full sm:w-auto"
                                onClick={handleDelete}
                            >
                                {t('common.delete')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
