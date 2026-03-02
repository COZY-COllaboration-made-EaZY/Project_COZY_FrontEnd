'use client';

export const dynamic = "force-dynamic";
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectDashBoard from '@/components/project/ProjectDashBoard';
import {getMyTeamProjectDetailInfoRequest} from "@/api/requests/project";
import { useProjectStore } from "@/store/projectStore";




export default function ProjectDashboardClient() {
    const { setCurrentProjectId } = useProjectStore();
    const params = useParams<{ projectId: string }>();
    const projectId = String(params?.projectId ?? '');

    useEffect(() => {
        if (!projectId) return;
        const fetchProject = async () => {
            const data = await getMyTeamProjectDetailInfoRequest(projectId);
            if (data?.projectId) setCurrentProjectId(data.projectId);
        };
        if (params.projectId) fetchProject();
    }, [params, projectId, setCurrentProjectId]);


    return <ProjectDashBoard />;
}
