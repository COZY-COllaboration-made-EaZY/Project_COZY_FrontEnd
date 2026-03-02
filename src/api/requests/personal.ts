import apiClient from "@/api/Axios";

export type PersonalMemo = {
    memoId: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type PersonalSchedule = {
    scheduleId: string;
    title: string;
    description?: string | null;
    location?: string | null;
    startAt: string;
    endAt: string;
    allDay: boolean;
    recurrenceType?: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
    recurrenceInterval?: number;
    recurrenceUntil?: string | null;
    recurrenceCount?: number | null;
    createdAt: string;
    updatedAt: string;
};

export type PersonalPost = {
    postId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

// ===== Memo =====
export const getPersonalMemos = async (): Promise<PersonalMemo[]> => {
    const res = await apiClient.get<PersonalMemo[]>("/api/personal/memos");
    return res.data ?? [];
};

export const createPersonalMemo = async (payload: {
    title: string;
    content: string;
    tags?: string[];
}): Promise<PersonalMemo> => {
    const res = await apiClient.post<PersonalMemo>("/api/personal/memos", payload);
    return res.data;
};

export const updatePersonalMemo = async (
    memoId: string,
    payload: { title?: string; content?: string; tags?: string[] }
): Promise<PersonalMemo> => {
    const res = await apiClient.patch<PersonalMemo>(
        `/api/personal/memos/${memoId}`,
        payload
    );
    return res.data;
};

export const deletePersonalMemo = async (memoId: string) => {
    await apiClient.delete(`/api/personal/memos/${memoId}`);
};

// ===== Schedule =====
export const getPersonalSchedules = async (): Promise<PersonalSchedule[]> => {
    const res = await apiClient.get<PersonalSchedule[]>("/api/personal/schedules");
    return res.data ?? [];
};

export const createPersonalSchedule = async (payload: {
    title: string;
    description?: string;
    location?: string;
    startAt: string;
    endAt: string;
    allDay?: boolean;
    recurrenceType?: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
    recurrenceInterval?: number;
    recurrenceUntil?: string | null;
    recurrenceCount?: number | null;
}): Promise<PersonalSchedule> => {
    const res = await apiClient.post<PersonalSchedule>(
        "/api/personal/schedules",
        payload
    );
    return res.data;
};

export const updatePersonalSchedule = async (
    scheduleId: string,
    payload: {
        title?: string;
        description?: string;
        location?: string;
        startAt?: string;
        endAt?: string;
        allDay?: boolean;
        recurrenceType?: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
        recurrenceInterval?: number;
        recurrenceUntil?: string | null;
        recurrenceCount?: number | null;
    }
): Promise<PersonalSchedule> => {
    const res = await apiClient.patch<PersonalSchedule>(
        `/api/personal/schedules/${scheduleId}`,
        payload
    );
    return res.data;
};

export const deletePersonalSchedule = async (scheduleId: string) => {
    await apiClient.delete(`/api/personal/schedules/${scheduleId}`);
};

// ===== Post =====
export const getPersonalPosts = async (): Promise<PersonalPost[]> => {
    const res = await apiClient.get<PersonalPost[]>("/api/personal/posts");
    return res.data ?? [];
};

export const createPersonalPost = async (payload: {
    title: string;
    content: string;
}): Promise<PersonalPost> => {
    const res = await apiClient.post<PersonalPost>("/api/personal/posts", payload);
    return res.data;
};

export const updatePersonalPost = async (
    postId: string,
    payload: { title?: string; content?: string }
): Promise<PersonalPost> => {
    const res = await apiClient.patch<PersonalPost>(
        `/api/personal/posts/${postId}`,
        payload
    );
    return res.data;
};

export const deletePersonalPost = async (postId: string) => {
    await apiClient.delete(`/api/personal/posts/${postId}`);
};
