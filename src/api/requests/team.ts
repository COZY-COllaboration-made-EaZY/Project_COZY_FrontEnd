import apiClient from "@/api/Axios";
import {Team, useTeamStore} from "@/store/teamStore";

export interface CreateTeamDTO {
    teamName?: string;
    description: string;
}

// 2. 서버 응답 타입 정의
export interface TeamResponseItem {
    teamId?: string | number;
    id?: string | number;
    teamName?: string;
    name?: string;
    description?: string;
}

export interface MyTeamResponse {
    data?: {
        teamList?: TeamResponseItem[];
    };
    teamList?: TeamResponseItem[];
}

/** 역할 타입 */
export type TeamRole = "MASTER" | "SUB_MASTER" | "USER";

/** 팀 멤버 */
export interface TeamMember {
    memberId: string;
    nickname: string;
    role: TeamRole;
}

// 3. 팀 생성 요청
export const createTeamRequest = async (dto: CreateTeamDTO) => {
    const res = await apiClient.post("/api/team", dto);
    return res.data;
};

// 4. 내 팀 리스트 요청
export const getMyTeamInfoRequest = async (): Promise<Team[]> => {
    const res = await apiClient.get<MyTeamResponse>("/api/team/my-team");
    const payload = res.data;

    const list =
        (Array.isArray(payload?.data?.teamList) && payload.data!.teamList) ||
        (Array.isArray(payload?.teamList) && payload.teamList) ||
        [];

    const teams: Team[] = list.map((t): Team => ({
        id: String(t.teamId ?? t.id ?? ""),
        teamName: t.teamName ?? t.name ?? "Unnamed Team",
        description: t.description ?? "",
    }));
    return teams;
};

// 5. 팀 이름 중복 체크
export interface CheckTeamNameResponse {
    available: boolean;
}

export const checkTeamNameRequest = async (teamName: string): Promise<boolean> => {
    try {
        const res = await apiClient.get<CheckTeamNameResponse>("/api/team/check-team-name", {
            params: { teamName },
        });
        return res.data.available;
    } catch (e) {
        console.error("checkTeamNameRequest error:", e);
        return false;
    }
};

export type MemberRole = "MASTER" | "SUB_MASTER" | "USER";

export interface TeamMember {
    memberId: string;
    nickname: string;
    role: MemberRole;
}

export interface MemberListResponse {
    teamId: string;
    teamName: string;
    members: TeamMember[];
}

/** 팀 멤버 리스트 조회 */
export const getMemberListRequest = async (
    teamId: string
): Promise<MemberListResponse> => {
    const res = await apiClient.get<MemberListResponse>(
        "/api/member/list",
        {
            params: { teamId },
        }
    );
    return res.data;
};
