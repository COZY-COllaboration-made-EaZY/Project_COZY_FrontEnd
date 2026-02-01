// app/project/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    getProjectDetailRequest,
    updateProjectRequest,
    deleteProjectRequest,
    type ProjectDetail,
    type UpdateProjectDTO,
} from '@/api/requests/project';

import ViewMode from '@/components/setting/ViewMode';
import EditMode from '@/components/setting/EditMode';
import {useProjectStore} from "@/store/projectStore";

export default function ProjectSettings() {
    const router = useRouter();

    const projectId = useProjectStore(
        (state) => state.currentProjectId
    );

    const [detail, setDetail] = useState<ProjectDetail | null>(null);
    const [mode, setMode] = useState<'view' | 'edit'>('view');
    const [loading, setLoading] = useState(false);

    // 🔹 상세 조회
    useEffect(() => {
        if (!projectId) return;

        setLoading(true);
        getProjectDetailRequest(projectId)
            .then(setDetail)
            .catch(() => {
                alert('프로젝트 정보를 불러오지 못했습니다.');
            })
            .finally(() => setLoading(false));
    }, [projectId]);

    if (!projectId) {
        return <div className="p-6">선택된 프로젝트가 없습니다.</div>;
    }

    if (loading) {
        return <div className="p-6">로딩 중...</div>;
    }

    if (!detail) {
        return <div className="p-6">프로젝트 정보 없음</div>;
    }

    // 🔹 삭제
    const handleDelete = async () => {
        if (!confirm(`삭제할까요? (${detail.projectName})`)) return;
        await deleteProjectRequest(detail.projectId);
        alert('삭제되었습니다.');
        router.push('/');
    };

    // 🔹 수정
    const handleSave = async (dto: UpdateProjectDTO) => {
        await updateProjectRequest(detail.projectId, dto);
        const updated = await getProjectDetailRequest(detail.projectId);
        setDetail(updated);
        setMode('view');
    };

    return mode === 'view' ? (
        <ViewMode
            data={{
                projectId: detail.projectId,
                projectName: detail.projectName,
                description: detail.description,
                ownerName: detail.leaderName,
                devInterest: detail.devInterest,
                gitHubUrl: detail.gitHubUrl,
            }}
            onEdit={() => setMode('edit')}
            onDelete={handleDelete}
        />
    ) : (
        <EditMode
            initial={{
                projectId: detail.projectId,
                projectName: detail.projectName,
                description: detail.description,
                devInterest: detail.devInterest,
                gitHubUrl: detail.gitHubUrl,
            }}
            onCancel={() => setMode('view')}
            onSave={handleSave}
        />
    );
}
