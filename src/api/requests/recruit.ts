import apiClient from "@/api/Axios";

export const getRecruitListRequest = async () => {
    const res = await apiClient.get("/api/recruit/list");
    return res.data;
};

export const createRecruitRequest = async (
    recruitDto: {
        title: string;
        nickName: string;
        recruitText: string;
    }
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
