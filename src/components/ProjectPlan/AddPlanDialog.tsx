'use client';

import React, {useState} from "react";
import { useTranslation } from "react-i18next";

interface AddPlanDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddPlanDialog({ open, onClose }: AddPlanDialogProps) {
    const { t } = useTranslation();

    const [description, setDescription] = useState(t('plan.sampleDescription'));

    if (!open) return null;

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };



    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="theme-card w-full max-w-2xl rounded-2xl p-4 text-white relative sm:p-6">
                <button onClick={onClose} className="absolute top-3 right-4 text-xl">×</button>

                <h2 className="text-lg font-bold mb-4">{t('plan.addTitle')}</h2>

                <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm text-white/80">{t('plan.projectName')}</label>
                        <input className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded" defaultValue={t('plan.sampleProjectName')} />
                    </div>

                    <div>
                        <label className="block text-sm text-white/80">{t('plan.type')}</label>
                        <input className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded" defaultValue={t('plan.sampleType')} />
                    </div>

                    <div>
                        <label className="block text-sm text-white/80">{t('plan.status')}</label>
                        <select
                            className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded"
                            defaultValue="시작 전"
                        >
                            <option value="시작 전">{t('task.status.todo')}</option>
                            <option value="진행 중">{t('task.status.inProgress')}</option>
                            <option value="검토 중">{t('task.status.inReview')}</option>
                            <option value="승인 중">{t('task.status.inApproval')}</option>
                            <option value="머지 신청">{t('task.status.mergeRequest')}</option>
                            <option value="머지 완료">{t('task.status.mergeDone')}</option>
                        </select>
                    </div>


                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm text-white/80">{t('plan.description')}</label>
                        <textarea
                            className="w-full h-28 border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-white/80">{t('plan.assignee')}</label>
                        <input className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded" defaultValue={t('plan.sampleAssignee')} />
                    </div>

                    <div>
                        <label className="block text-sm text-white/80">{t('plan.reporter')}</label>
                        <input className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded" defaultValue={t('plan.sampleReporter')} />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm text-white/80">{t('plan.deadline')}</label>
                        <input className="w-full border border-white/30 bg-white/90 text-slate-900 px-2 py-1 mt-1 rounded" placeholder="yyyy-mm-dd" type="date" />
                    </div>


                    <div className="col-span-1 sm:col-span-2 mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="submit"
                            className="theme-btn-primary px-6 py-2 rounded hover:brightness-110 w-full sm:w-auto"
                        >
                            {t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
