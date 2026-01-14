import apiClient from "@/api/Axios";

export type LoginResponse = {
    accessToken: string;
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

export const verifyPasswordRequest = async (password: string) => {
    try {
        const response = await apiClient.post(
            "/api/user/verify-password",
            { password },
        );
        return response.data;
    } catch (error: any) {
        console.error("비밀번호 검증 실패:", error.message);
        return false;
    }
};
