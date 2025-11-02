// store/projectStore.ts
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
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: [],
            currentProjectId: null, // 초기값 null 권장
            hasHydrated: false,
            setHasHydrated: (v) => set({ hasHydrated: v }),
            setCurrentProjectId: (id) => set({ currentProjectId: id }),
            addProject: (project) =>
                set((state) => ({
                    projects: state.projects.some((p) => p.id === project.id)
                        ? state.projects
                        : [...state.projects, project],
                })),
            removeProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'project-store',
            // 버전 올리고 마이그레이션: number -> string 변환 (있으면)
            version: 2,
            migrate: (persisted: any, fromVersion) => {
                if (!persisted) return persisted;
                if (fromVersion < 2) {
                    const v = { ...persisted };
                    // currentProjectId 숫자였다면 문자열로
                    if (typeof v.currentProjectId === 'number') {
                        v.currentProjectId = String(v.currentProjectId);
                    }
                    if (Array.isArray(v.projects)) {
                        v.projects = v.projects.map((p: any) =>
                            typeof p?.id === 'number' ? { ...p, id: String(p.id) } : p
                        );
                    }
                    return v;
                }
                return persisted;
            },
            partialize: (s) => ({
                projects: s.projects,
                currentProjectId: s.currentProjectId,
            }),
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
