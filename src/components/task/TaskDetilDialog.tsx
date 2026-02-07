'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getTaskDetailRequest } from '@/api/requests/task';

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
                <div className="bg-white p-6 rounded">로딩 중…</div>
            </div>
        );
    }

    if (!task) return null;

    return (
        <div className="fixed inset-0 grid place-items-center bg-black/50">
            <div className="w-full max-w-xl rounded bg-white p-6">
                <h2 className="mb-4 text-2xl font-bold">{task.title}</h2>

                <div className="mb-4 flex justify-between text-sm text-gray-500">
                    <span>작성자: {task.nickName}</span>
                    <span>{task.createdAt.split('T')[0]}</span>
                </div>

                <div className="whitespace-pre-wrap">{task.taskText}</div>

                <div className="mt-6 text-right">
                    <Button onClick={onClose}>닫기</Button>
                </div>
            </div>
        </div>
    );
}
