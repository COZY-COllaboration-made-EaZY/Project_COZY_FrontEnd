'use client';
// components/task/TaskCreateDialog.tsx

import {useState} from 'react';
import { useUserStore } from "@/store/userStore";
import LoginRequiredDialog from "@/components/public/LoginRequireDialog";
import {createTaskRequest} from "@/api/requests/task";
import { useTranslation } from "react-i18next";

interface Props {
    projectId: string; // UUID
    onClose: () => void;
    onSuccess: (created?: { taskId?: number; title?: string; nickName?: string; status?: string; createdAt?: string }) => void;
}

export default function TaskCreateDialog({ projectId, onClose, onSuccess }: Props) {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const [title, setTitle] = useState('');
    const [date] = useState(new Date().toISOString().split('T')[0]);
    const [taskText, setTaskText] = useState('');
    const [status, setStatus] = useState('Not Started');
    const [isClosing, setIsClosing] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 300);
    };

    const handleSubmit = async () => {
        try {

            const statusMap: Record<string, string> = {
                "Not Started": "시작 전",
                "In Progress": "진행 중",
                "Under Review": "검토 중",
                "Pending Approval": "승인 중",
                "Merge Requested": "머지 신청",
                "Merge Completed": "머지 완료",
            };
            const backendStatus = statusMap[status] ?? status;

            const createTaskDTO = {
                projectId,
                nickName: user?.nickname ?? "",
                title,
                status: backendStatus,
                taskText,
            };
            // console.log(createTaskDTO);
            const created = await createTaskRequest(createTaskDTO);
            onSuccess(created);
            handleClose();
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'response' in error && (error as { response?: { status?: number } }).response?.status === 401) {
                setShowLoginDialog(true);
            } else {
                console.error("Error:", error);
                const message =
                    typeof error === 'object' && error !== null && 'response' in error
                        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                        : undefined;
                alert(message || t('common.errorOccurred'));
            }
        }
    };

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
                <div className={`theme-card w-full max-w-2xl rounded-3xl px-4 py-5 text-white transform transition-all duration-300 sm:px-6 md:px-8 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <h2 className="text-lg font-semibold mb-1">{t('task.createTitle')}</h2>
                    <hr className="mb-6 border-t border-white/20" />
                    <div className="space-y-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                            <label className="w-full text-sm font-semibold text-white/80 sm:w-20">{t('task.fields.name')}</label>
                            <div className="w-full rounded-md border border-white/30 bg-white/80 px-4 py-2 text-sm text-slate-900 sm:w-80">
                                {user?.nickname ?? ''}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                            <label className="w-full text-sm font-semibold text-white/80 sm:w-20">{t('task.fields.title')}</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/40 sm:w-80"
                            />
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                            <label className="w-full text-sm font-semibold text-white/80 sm:w-20">{t('task.fields.date')}</label>
                            <div className="w-full rounded-md border border-white/30 bg-white/80 px-4 py-2 text-sm text-slate-900 sm:w-80">
                                {date}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                            <label className="w-full text-sm font-semibold text-white/80 sm:w-20">{t('task.fields.status')}</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/40 sm:w-80"
                            >
                                <option value="Not Started">{t('task.status.todo')}</option>
                                <option value="In Progress">{t('task.status.inProgress')}</option>
                                <option value="Under Review">{t('task.status.inReview')}</option>
                                <option value="Pending Approval">{t('task.status.inApproval')}</option>
                                <option value="Merge Requested">{t('task.status.mergeRequest')}</option>
                                <option value="Merge Completed">{t('task.status.mergeDone')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-white/80">{t('task.fields.content')}</label>
                            <textarea
                                rows={10}
                                value={taskText}
                                onChange={(e) => setTaskText(e.target.value)}
                                className="w-full resize-none rounded-md border border-white/30 bg-white/90 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/40"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button onClick={handleSubmit} className="theme-btn-primary text-sm px-5 py-2 rounded hover:brightness-110 w-full sm:w-auto">{t('common.submit')}</button>
                        <button onClick={handleClose} className="theme-btn-secondary text-sm px-5 py-2 rounded hover:brightness-110 w-full sm:w-auto">{t('common.cancel')}</button>
                    </div>
                </div>
            </div>

            {showLoginDialog && <LoginRequiredDialog onClose={() => setShowLoginDialog(false)} />}
        </>
    );
}
