import { create } from "zustand";

export type Team = {
    id: string;          // UUID
    teamName: string;
    description: string;
};

type TeamState = {
    teams: Team[];
    currentTeamId: string;

    setTeams: (list: Team[]) => void;
    setCurrentTeamId: (id: string | null) => void;
    clearCurrentTeam: () => void;

    getCurrentTeam: () => Team | null;

    reset: () => void;
};

export const useTeamStore = create<TeamState>((set, get) => ({
    teams: [],
    currentTeamId: "",

    setTeams: (list) => {
        const safeList = Array.isArray(list) ? list : [];
        const { currentTeamId } = get();

        set({
            teams: safeList,
            currentTeamId:
                currentTeamId ||
                (safeList.length === 1
                    ? safeList[0].id
                    : ""),
        });
    },

    setCurrentTeamId: (id) => {
        set({ currentTeamId: id ?? "" });
    },

    clearCurrentTeam: () => {
        set({ currentTeamId: "" });
    },

    getCurrentTeam: () => {
        const { teams, currentTeamId } = get();
        return teams.find((t) => t.id === currentTeamId) ?? null;
    },

    reset: () => {
        set({
            teams: [],
            currentTeamId: "",
        });
    },
}));
