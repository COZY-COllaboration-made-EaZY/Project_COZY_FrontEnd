import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient, {authClient} from "@/api/Axios";

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

    setUser: (user: User | null) => void;
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

            setUser: (user) => {
                set((state) => ({
                    user,
                    isLoggedIn: user ? true : state.isLoggedIn && !!state.accessToken,
                }));
            },

            login: (user, token) => {
                set({
                    isLoggedIn: true,
                    user,
                    accessToken: token,
                });
            },

            setAccessToken: (token) => {
                set((state) => ({
                    accessToken: token,
                    isLoggedIn: !!token && (state.isLoggedIn || !!state.user),
                }));
            },

            updateProfileImage: (imageUrl) => {
                set((state) => ({
                    user: state.user
                        ? { ...state.user, profileImage: imageUrl }
                        : null,
                }));
            },

            logout: async () => {
                try {
                    await authClient.post("/api/auth/logout");
                } catch (e) {
                    console.warn("Logout request failed:", e);
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
