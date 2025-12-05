import apiClient, {authClient} from "@/api/Axios";
import {useUserStore} from "@/store/userStore";

export type LoginResponse = {
    accessToken: string;
    refreshToken?: string; // 쿠키로도 관리한다면 여기 값이 안 올 수도 있음
};

export const loginRequest = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>("/api/auth/login", {
        email,
        password,
    });
    return res.data;
};

// 비밀번호 검증
export const verifyPasswordRequest = async (password: string) => {
    try {
        const response = await apiClient.post(
            '/api/user/verify-password',
            { password },
        );
        return response.data;
    } catch (error: any) {
        console.error("비밀번호 검증 실패:", error.message);
        alert("비밀번호 검증 실패");
        return false;
    }
};

// 로그아웃
export const logoutRequest = async () => {
    try {
        await apiClient.post("/api/auth/logout");
        localStorage.clear();
    } catch (error: any) {
        console.error("로그아웃 문제있다.", error?.message || error);
    } finally {
        await useUserStore.getState().logout();
        alert("logout success");
    }
};