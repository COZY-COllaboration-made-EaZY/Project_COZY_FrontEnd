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

const refreshClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

// ----- Request: 최신 토큰 주입 -----
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const headers = (config.headers ?? new AxiosHeaders()) as AxiosHeaders;

    if (config.method?.toUpperCase() !== "GET" && !headers.has("Content-Type")) {
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

// ----- Response: 401 → refresh → 재시도 -----
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
                const { data } = await refreshClient.post("/api/auth/refresh", {});
                const newAccess: string | undefined = (data as any)?.accessToken;
                if (!newAccess) throw new Error("No accessToken from refresh");

                useUserStore.getState().setAccessToken(newAccess);
                if (typeof window !== "undefined") {
                    localStorage.setItem("accessToken", newAccess);
                    alert("🔄 Access Token has been refreshed successfully!");
                }

                // 대기 중 요청들 처리
                processQueue(null, newAccess);

                // 원 요청 재시도
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
