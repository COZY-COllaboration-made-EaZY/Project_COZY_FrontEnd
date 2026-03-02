import apiClient from "@/api/Axios";

export type PostType = "BOARD" | "NOTICE";

export type PostListItem = {
    postId: string;
    title: string;
    authorName: string;
    likeCount: number;
    createdAt: string;
};

export type PostDetail = {
    postId: string;
    title: string;
    content: string;
    authorName: string;
    likeCount: number;
    commentCount: number;
    liked: boolean;
    createdAt: string;
};

export type CommentItem = {
    commentId: string;
    authorName: string;
    content: string;
    createdAt: string;
};

export const getTeamPosts = async (teamId: string, type: PostType) => {
    const res = await apiClient.get<PostListItem[]>("/api/team/post/list", {
        params: { teamId, type },
    });
    return res.data ?? [];
};

export const getPostDetail = async (postId: string) => {
    const res = await apiClient.get<PostDetail>(`/api/team/post/${postId}`);
    return res.data;
};

export const createPost = async (payload: {
    teamId: string;
    type: PostType;
    title: string;
    content: string;
}) => {
    const res = await apiClient.post<PostDetail>("/api/team/post", payload);
    return res.data;
};

export const updatePost = async (postId: string, payload: { title: string; content: string }) => {
    const res = await apiClient.patch<PostDetail>(`/api/team/post/${postId}`, payload);
    return res.data;
};

export const deletePost = async (postId: string) => {
    await apiClient.delete(`/api/team/post/${postId}`);
};

export const togglePostLike = async (postId: string) => {
    const res = await apiClient.post<{ likeCount: number; liked: boolean }>(
        `/api/team/post/${postId}/like`
    );
    return res.data;
};

export const getComments = async (postId: string) => {
    const res = await apiClient.get<CommentItem[]>(`/api/team/post/${postId}/comments`);
    return res.data ?? [];
};

export const createComment = async (postId: string, content: string) => {
    const res = await apiClient.post<CommentItem>(`/api/team/post/${postId}/comments`, { content });
    return res.data;
};

export const deleteComment = async (commentId: string) => {
    await apiClient.delete(`/api/team/post/comment/${commentId}`);
};
