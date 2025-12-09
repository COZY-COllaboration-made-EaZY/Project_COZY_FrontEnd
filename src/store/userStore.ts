// src/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "@/api/Axios";

export type User = {
    id: number;
    email: string;
    nickname: string;
    profileImage?: string;
    statusMessage?: string;
};

type UserState = {
    isLoggedIn: boolean;
    user: User | null;
    accessToken: string;
    isHydrated: boolean;

    setUser: (user: User, token?: string) => void;
    login: (user: User, token: string) => void;
    setAccessToken: (token: string) => void;
    updateProfileImage: (imageUrl: string) => void;
    logout: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            accessToken: "",
            isHydrated: false,

            /** 유저 + 토큰 동시에 설정 */
            setUser: (user, token) => {
                set({
                    user,
                    accessToken: token ?? "",
                    isLoggedIn: true,
                });

                if (typeof window !== "undefined" && token) {
                    localStorage.setItem("accessToken", token);
                }
            },

            /** 로그인: 유저 정보 + 액세스 토큰 저장 */
            login: (user, token) => {
                set({
                    isLoggedIn: true,
                    user,
                    accessToken: token,
                });

                if (typeof window !== "undefined") {
                    localStorage.setItem("accessToken", token);
                }
            },

            /** 리프레시 성공 시 토큰만 갱신 */
            setAccessToken: (token) => {
                set((state) => ({
                    ...state,
                    accessToken: token,
                    isLoggedIn: !!state.user || state.isLoggedIn,
                }));
            },

            /** 프로필 이미지 변경 */
            updateProfileImage: (imageUrl) => {
                set((state) => ({
                    user: state.user
                        ? { ...state.user, profileImage: imageUrl }
                        : null,
                }));
            },

            logout: async () => {
                try {
                    await apiClient.post("/api/auth/logout");
                } catch (e) {
                    console.warn("Logout request failed:", e);
                }

                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }

                set({
                    isLoggedIn: false,
                    user: null,
                    accessToken: "",
                });
            },

        }),
        {
            name: "user-store",
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                accessToken: state.accessToken,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) state.isHydrated = true;
            },
        }
    )
);
