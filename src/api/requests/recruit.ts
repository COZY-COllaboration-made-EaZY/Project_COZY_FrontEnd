import apiClient from "@/api/Axios";

export const getRecruitListRequest = async () => {
    const res = await apiClient.get("/api/recruit/list");
    return res.data;
};

export const getRecruitDetailRequest = async (id: number) => {
    const res = await apiClient.get(`/api/recruit/${id}`);
    return res.data;
}

export type CreateRecruitDto = {
    teamId: string;
    title: string;
    nickName: string;
    recruitText: string;
};

export const createRecruitRequest = async (
    recruitDto: CreateRecruitDto
) => {
    return await apiClient.post("/api/recruit/create", recruitDto);
};

export const updateRecruitRequest = async (
    id: number,
    recruitDto: { title: string; recruitText: string }
) => {
    const res = await apiClient.put(`/api/recruit/${id}`, recruitDto);
    return res.data;
};

export const deleteRecruitRequest = async (id: number) => {
    const res = await apiClient.delete(`/api/recruit/${id}`);
    return res.data;
};
