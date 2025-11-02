// 프로젝트 이름 중복 확인
import apiClient from "@/api/Axios";

export type ProjectDetail = {
    projectId: number;
    projectName: string;
    description: string;
    devInterest: string;
    githubUrl: string;
    ownerId: string;
    ownerName: string;
    createdAt: string;
};

export type CreateProjectDTO = {
    projectName: string;
    devInterest: string;
    description: string;
    leaderName: string;
    githubUrl?: string;
    teamId: string;
};

export type UpdateProjectDTO = {
    projectName: string;
    devInterest: string;
    description: string;
    githubUrl: string | null;
    leaderName?: string;
};

export type ProjectSummary = {
    projectId: string;
    teamId: string;
    teamName: string;
    projectName: string;
    leader: string;
    description?: string;
    createdAt: string;
}

export const getProjectDetailRequest = async (projectName: string): Promise<ProjectDetail> => {
    const res = await apiClient.get(`/api/project/detail/${encodeURIComponent(projectName)}`)
    const raw = res.data;
    return {
        projectId: raw.projectId,
        projectName: raw.projectName,
        description: raw.description,
        devInterest: raw.devInterest,
        githubUrl: raw.githubUrl,
        ownerId: raw.ownerId,
        ownerName: raw.ownerName,
        createdAt: raw.createdAt,
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

// 팀의 고유 값 가지고 데이터베이스에서 팀에서 만든 프로젝트 리스트를 가져옴
export const getMyTeamProjectListRequest = async (teamId : string) => {
    try {
        const response = await apiClient.get('/api/project/my-team-project-list',{params: {teamId}});
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
};

//프로젝트의 고유 값 가지고 데이터베이스에서 팀에서 만든 프로젝트 리스트중에 하나를 선택하면 그 프로젝트의 아이디를 이용해서 프로젝트의 세부 정보를 가져온다.
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

export const updateProjectRequest = async (projectId: number, dto: UpdateProjectDTO) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("인증 토큰이 없습니다.");

    const res = await apiClient.put(`/api/project/${projectId}`, dto, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// 삭제
export const deleteProjectRequest = async (projectId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("인증 토큰이 없습니다.");

    await apiClient.delete(`/api/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};