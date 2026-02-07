'use client'

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

export default function TaskPage() {
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
    }, [hasHydrated, currentTeamId]);

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

    return (
        <div className="p-8">
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
                    onSuccess={() => setIsCreateOpen(false)}
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
