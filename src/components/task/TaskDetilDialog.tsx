'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getTaskDetailRequest } from '@/api/requests/task';
import { useTranslation } from "react-i18next";

interface Props {
    projectId: string;
    taskId: number;
    onClose: () => void;
}

type TaskDetail = {
    taskId: number;
    title: string;
    nickName: string;
    status: string;
    taskText: string;
    createdAt: string;
};

export default function TaskDetailDialog({
                                             projectId,
                                             taskId,
                                             onClose,
                                         }: Props) {
    const { t } = useTranslation();
    const [task, setTask] = useState<TaskDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const data = await getTaskDetailRequest(projectId, taskId);
                setTask(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [projectId, taskId]);

    if (loading) {
        return (
            <div className="fixed inset-0 grid place-items-center bg-black/50">
                <div className="theme-card rounded p-4 text-white sm:p-6">{t('common.loading')}</div>
            </div>
        );
    }

    if (!task) return null;

    return (
        <div className="fixed inset-0 grid place-items-center bg-black/50">
            <div className="theme-card w-full max-w-xl rounded p-4 text-white sm:p-6">
                <h2 className="mb-4 text-2xl font-bold">{task.title}</h2>

                <div className="mb-4 flex flex-col gap-1 text-sm text-white/60 sm:flex-row sm:justify-between">
                    <span>{t('common.author')}: {task.nickName}</span>
                    <span>{task.createdAt.split('T')[0]}</span>
                </div>

                <div className="whitespace-pre-wrap text-white/90">{task.taskText}</div>

                <div className="mt-6 flex justify-end">
                    <Button className="theme-btn-secondary w-full sm:w-auto" onClick={onClose}>{t('common.close')}</Button>
                </div>
            </div>
        </div>
    );
}
