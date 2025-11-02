'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectDashBoard from '@/components/project/ProjectDashBoard';
import {getMyTeamProjectDetailInfoRequest} from "@/api/requests/project";
import { useProjectStore } from "@/store/projectStore";




export default function ProjectBoardPage() {
    const [project, setProject] = useState<any>(null);
    const { setCurrentProjectId } = useProjectStore();
    const params = useParams<{ projectId: string }>();
    const projectId = String(params?.projectId ?? '');

    useEffect(() => {
        if (!projectId) return;
        console.log(" dashboard , projectId :: ", projectId);
        const fetchProject = async () => {
            const data = await getMyTeamProjectDetailInfoRequest(projectId);
            setProject(data);
            if (data?.projectId) setCurrentProjectId(data.projectId);
        };
        if (params.projectId) fetchProject();
    }, [params, projectId, setCurrentProjectId]);


    return <ProjectDashBoard />;
}
