import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
import { useUserStore } from "@/store/userStore";

const API_BASE = "http://localhost:8000";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export const authClient = axios.create({
    baseURL: API_BASE,
    withCredentials: false,
});

const refreshClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const headers = (config.headers ?? new AxiosHeaders()) as AxiosHeaders;
    const isFormData = config.data instanceof FormData;

    if (
        config.method?.toUpperCase() !== "GET" &&
        !headers.has("Content-Type") &&
        !isFormData
    ) {
        headers.set("Content-Type", "application/json");
    }

    const storeToken = useUserStore.getState().accessToken;
    const lsToken =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const token = storeToken ?? lsToken;

    if (token) headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
    return config;
});

let isRefreshing = false;
let pendingQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (token) resolve(token);
        else reject(error);
    });
    pendingQueue = [];
};

apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const status = error?.response?.status;
        const original = error.config as any;

        if (status === 401 && !original?._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({
                        resolve: (newToken) => {
                            original.headers = original.headers || {};
                            original.headers["Authorization"] = `Bearer ${newToken}`;
                            resolve(apiClient(original));
                        },
                        reject,
                    });
                });
            }

            original._retry = true;
            isRefreshing = true;

            try {
                const { data } = await refreshClient.get("/api/auth/refresh", {});
                const newAccess: string | undefined = (data as any)?.accessToken;
                if (!newAccess) throw new Error("No accessToken from refresh");

                useUserStore.getState().setAccessToken(newAccess);
                if (typeof window !== "undefined") {
                    localStorage.setItem("accessToken", newAccess);
                    alert("🔄 Access Token has been refreshed successfully!");
                }

                processQueue(null, newAccess);

                original.headers = original.headers || {};
                original.headers["Authorization"] = `Bearer ${newAccess}`;
                return apiClient(original);
            } catch (err) {
                processQueue(err, null);
                await useUserStore.getState().logout();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
