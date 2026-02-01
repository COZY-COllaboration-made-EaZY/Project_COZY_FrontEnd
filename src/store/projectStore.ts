import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Project = {
    id: string;
    name: string;
    leader: string;
    description: string;
};

type ProjectState = {
    projects: Project[];
    currentProjectId: string | null;

    hasHydrated: boolean;
    setHasHydrated: (v: boolean) => void;

    setCurrentProjectId: (id: string | null) => void;
    addProject: (p: Project) => void;
    removeProject: (id: string) => void;
    setProjects: (list: Project[]) => void;
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            projects: [],
            currentProjectId: null,

            hasHydrated: false,
            setHasHydrated: (v) => set({ hasHydrated: v }),

            setCurrentProjectId: (id) => set({ currentProjectId: id }),

            addProject: (project) =>
                set((state) => ({
                    projects: state.projects.some((p) => p.id === project.id)
                        ? state.projects
                        : [...state.projects, project],
                })),
            setProjects: (list) => set({ projects: list }),

            removeProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'project-store',
            version: 2,

            partialize: (s) => ({
                projects: s.projects,
                currentProjectId: s.currentProjectId,
            }),

            onRehydrateStorage: () => () => {
                // hydration 완료 시점
                useProjectStore.getState().setHasHydrated(true);
            },
        }
    )
);
