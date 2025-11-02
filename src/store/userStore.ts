import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
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
    updateProfileImage: (imageUrl: string) => void;
    login: (user: User, token: string) => void;
    setAccessToken: (token: string) => void;
    logout: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            accessToken: '',
            isHydrated: false,

            /** ✅ 유저 정보와 토큰을 동시에 설정 */
            setUser: (user, token) => {
                if (typeof window !== "undefined" && token) {
                    localStorage.setItem('accessToken', token);
                }
                set({ user, accessToken: token ?? '', isLoggedIn: true });
            },

            /** ✅ 프로필 이미지 변경 시 유저 객체 업데이트 */
            updateProfileImage: (imageUrl) => {
                set((state) => ({
                    user: state.user ? { ...state.user, profileImage: imageUrl } : null,
                }));
            },

            /** ✅ 로그인: 유저정보 + 액세스토큰 저장 */
            login: (user, token) => {
                if (typeof window !== "undefined") {
                    localStorage.setItem('accessToken', token);
                }
                set({ isLoggedIn: true, user, accessToken: token });
            },

            /** ✅ 리프레시 성공 시 새로운 토큰만 갱신 (유저 정보 유지) */
            setAccessToken: (token) => {
                if (typeof window !== "undefined") {
                    localStorage.setItem("accessToken", token);
                }
                set((state) => ({
                    accessToken: token,
                    isLoggedIn: true,
                    user: state.user, // 기존 유저 유지
                }));
            },

            /** ✅ 로그아웃: refresh 쿠키 제거 + 상태 초기화 */
            logout: async () => {
                try {
                    await fetch("http://localhost:8000/api/auth/logout", {
                        method: "POST",
                        credentials: "include", // refresh 쿠키 삭제
                    });
                } catch (e) {
                    console.warn("Logout request failed:", e);
                }

                if (typeof window !== "undefined") {
                    localStorage.removeItem('accessToken');
                }
                set({ isLoggedIn: false, user: null, accessToken: '' });
            },
        }),
        {
            name: 'user-store',
            partialize: (state: UserState) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                accessToken: state.accessToken,
            }),
        }
    )
);
