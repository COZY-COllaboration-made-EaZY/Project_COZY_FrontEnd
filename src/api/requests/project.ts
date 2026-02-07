import apiClient from "@/api/Axios";

export type ProjectDetail = {
    projectId: string;
    projectName: string;
    devInterest: string;
    description: string;
    leaderName: string;
    gitHubUrl: string | null;
    teamId: string;
    leaderId: string;
    subLeaderId: string | null;
};


export type CreateProjectDTO = {
    projectName: string;
    devInterest: string;
    description: string;
    githubUrl?: string;
    teamId: string;
};

export type UpdateProjectDTO = {
    projectName: string;
    devInterest: string;
    description: string;
    gitHubUrl: string | null;
};

export const getProjectDetailRequest = async (
    projectId: string
): Promise<ProjectDetail> => {
    const res = await apiClient.get(
        "/api/project/project-detail-info",
        { params: { projectId } }
    );

    const raw = res.data;

    return {
        projectId: raw.projectId,
        projectName: raw.projectName,
        devInterest: raw.devInterest,
        description: raw.description,
        leaderName: raw.leaderName,
        gitHubUrl: raw.gitHubUrl,
        teamId: raw.teamId,
        leaderId: raw.leaderId,
        subLeaderId: raw.subLeaderId,
    };
};


export const checkProjectNameRequest = async (projectName: string): Promise<boolean> => {
    try {
        const response = await apiClient.get('/api/project/check-project-name', {
            params: { projectName },
        });
        return response.data.available;
    } catch (error: any) {
        alert("프로젝트 이름 중복 확인 실패");
        return false;
    }
};

// 프로젝트 저장
export const createProjectSaveRequest = async (dto: CreateProjectDTO) => {
    const res = await apiClient.post(
        '/api/project/project-create',
        dto,
    );
    return res.data;
};

export const getMyTeamProjectListRequest = async (teamId: string) => {
    const res = await apiClient.get('/api/project/my-team-project-list', {
        params: { teamId },
    });
    return res.data;
};


export const getMyTeamProjectDetailInfoRequest = async (projectId : string) => {
    console.log("Req :: projectId :: ", projectId);
    try {
        const res = await apiClient.get("/api/project/project-detail-info", {
            params: { projectId }
        });
        console.log("프로젝트 이름으로 검색한 결과 "+JSON.stringify(res.data));
        return res.data;
    }catch (error: any) {
        console.log("검색실패"+error);
    }

}

export const deleteProjectRequest = async (projectId: string) => {
    await apiClient.delete(`/api/project/${projectId}`);
};

export const updateProjectRequest = async (
    projectId: string,
    dto: UpdateProjectDTO
) => {
    const res = await apiClient.put(`/api/project/${projectId}`, dto);
    return res.data;
};
