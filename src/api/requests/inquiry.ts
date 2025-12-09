import apiClient from "@/api/Axios";

export async function getInquiriesRequest() {
    const res = await apiClient.get("/api/inquiries/list");
    return res.data;
}

export async function createInquiryRequest(
    type: string,
    title: string,
    content: string
) {
    const res = await apiClient.post(
        "/api/inquiries/create",
        { type, title, content },
    );
    return res.data;
}

export async function updateInquiryRequest(
    id: number,
    payload: { title: string; content: string; status?: string }
) {
    const res = await apiClient.put(`/api/inquiries/${id}`, payload);
    return res.data;
}

export async function deleteInquiryRequest(id: number) {
    const res = await apiClient.delete(`/api/inquiries/${id}`);
    return res.data;
}
