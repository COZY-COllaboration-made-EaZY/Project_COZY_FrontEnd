import apiClient from "@/api/Axios";
import {useUserStore} from "@/store/userStore";

export const getCurrentUserRequest = async (): Promise<any | undefined> => {
    try {
        const response = await apiClient.get('/api/user/current-user');
        return response.data;
    } catch (error: any) {
        console.error("유저 정보 조회 실패:", error?.message || error);
        return undefined;
    }
};

export const updateUserInfoRequest = async (
    nickname: string,
    statusMessage: string,
    profileImage?: File
) => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("statusMessage", statusMessage);
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    const response = await apiClient.post("/api/user/update-info", formData);
    return response.data;
};
