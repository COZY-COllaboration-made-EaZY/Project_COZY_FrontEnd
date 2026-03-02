'use client';

export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import TaskTable, { Task } from '@/components/task/TaskTable';
import TaskCreateDialog from '@/components/task/TaskCreateDialog';

import { getTaskListRequest } from '@/api/requests/task';
import { getMyTeamProjectListRequest } from '@/api/requests/project';

import { useProjectStore } from '@/store/projectStore';
import { useTeamStore } from '@/store/teamStore';
import TaskDetailDialog from "@/components/task/TaskDetilDialog";

export default function TaskPageClient() {
    const router = useRouter();

    const { currentTeamId } = useTeamStore();
    const { currentProjectId, setCurrentProjectId, hasHydrated } =
        useProjectStore();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        useProjectStore.persist?.rehydrate?.();
    }, []);

    useEffect(() => {
        if (!hasHydrated || !currentTeamId) return;

        const run = async () => {
            if (currentProjectId) return;

            const data = await getMyTeamProjectListRequest(currentTeamId);

            if (!data?.hasProject) {
                router.push('/project/create');
                return;
            }

            if (data.projects.length === 1) {
                setCurrentProjectId(data.projects[0].projectId);
            } else {
                router.push('/project/select');
            }
        };

        run();
    }, [hasHydrated, currentTeamId, currentProjectId, router, setCurrentProjectId]);

    useEffect(() => {
        if (!hasHydrated || !currentProjectId) return;

        const run = async () => {
            try {
                setLoading(true);
                const list = await getTaskListRequest(currentProjectId);
                setTasks(Array.isArray(list) ? list : []);
            } catch (e) {
                console.error(e);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [hasHydrated, currentProjectId]);

    const refreshTasks = async () => {
        if (!currentProjectId) return;
        try {
            setLoading(true);
            const list = await getTaskListRequest(currentProjectId);
            setTasks(Array.isArray(list) ? list : []);
        } catch (e) {
            console.error(e);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <TaskTable
                tasks={tasks}
                loading={loading}
                onRowClick={(id) => setSelectedTaskId(id)}
                onAddClick={() => setIsCreateOpen(true)}
            />

            {isCreateOpen && currentProjectId && (
                <TaskCreateDialog
                    projectId={currentProjectId}
                    onClose={() => setIsCreateOpen(false)}
                    onSuccess={async (created) => {
                        setIsCreateOpen(false);

                        if (created && (created.taskId || created.title)) {
                            setTasks((prev) => {
                                const next: Task = {
                                    taskId: Number(created.taskId ?? Date.now()),
                                    title: String(created.title ?? ''),
                                    nickName: created.nickName ?? '',
                                    status: created.status ?? '시작 전',
                                    createdAt: created.createdAt ?? new Date().toISOString(),
                                };
                                return [next, ...prev];
                            });
                            return;
                        }

                        await refreshTasks();
                    }}
                />
            )}

            {selectedTaskId !== null && currentProjectId && (
                <TaskDetailDialog
                    projectId={currentProjectId}
                    taskId={selectedTaskId}
                    onClose={() => setSelectedTaskId(null)}
                />
            )}
        </div>
    );
}
