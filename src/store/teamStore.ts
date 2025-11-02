import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Team = {
    id: string;
    teamName: string;
    description: string;
};

type TeamState = {
    teams: Team[];
    currentTeamId: string;
    clearCurrentTeam: () => void;

    setTeams: (list: Team[]) => void;
    setCurrentTeamId: (id: string | null) => void;
    addTeam: (team: Team) => void;
    removeTeam: (id: string) => void;

    getCurrentTeam: () => Team | null;
    getCurrentTeamIndex: () => number;
};

export const useTeamStore = create<TeamState>()(
    persist(
        (set, get) => ({
            teams: [],
            currentTeamId: "",

            setTeams: (list) =>
                set({ teams: Array.isArray(list) ? list : [] }),

            setCurrentTeamId: (id) =>
                set({ currentTeamId: id || "" }),
            clearCurrentTeam: () => set({ currentTeamId: "" }),

            addTeam: (team) =>
                set((state) => ({
                    teams: state.teams.some((t) => t.id === team.id)
                        ? state.teams
                        : [...state.teams, team],
                })),

            removeTeam: (id: string) =>
                set((state) => ({
                    teams: state.teams.filter((t) => t.id !== id),
                    currentTeamId:
                        state.currentTeamId === id ? "" : state.currentTeamId,
                })),

            getCurrentTeam: () => {
                const { teams, currentTeamId } = get();
                return currentTeamId
                    ? teams.find((t) => t.id === currentTeamId) ?? null
                    : null;
            },

            getCurrentTeamIndex: () => {
                const { teams, currentTeamId } = get();
                return currentTeamId
                    ? teams.findIndex((t) => t.id === currentTeamId)
                    : -1;
            },
        }),
        {
            name: "teams-store",
            version: 2,

            migrate: (persisted: any, fromVersion) => {
                if (fromVersion < 2 && typeof persisted?.state?.currentTeamId === "number") {
                    persisted.state.currentTeamId = null;
                }
                return persisted;
            },
            partialize: (s) => ({
                teams: s.teams,
                currentTeamId: s.currentTeamId,
            }),
        }
    )
);
