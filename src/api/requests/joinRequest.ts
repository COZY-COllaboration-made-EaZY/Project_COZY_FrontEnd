import apiClient from "@/api/Axios";

export const joinTeamRecruitRequest = async (teamId: string, message: string) => {
    return await apiClient.post(`/api/join-request`,{teamId,message});
}

export const joinTeamRequestList = async () => {
    return await apiClient.get(`/api/join-request/my-requests`);
}