"use client";

import { create } from "zustand";

export type ThemeMode = "lavender" | "cosmic" | "sky" | "ocean" | "retro";

interface ThemeState {
    theme: ThemeMode;
    initTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

const DEFAULT_THEME: ThemeMode = "lavender";
const THEME_KEY = "cozy-theme";
const SETTINGS_KEY = "cozy-settings";

const applyTheme = (theme: ThemeMode) => {
    if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme;
    }
};

const persistTheme = (theme: ThemeMode) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(THEME_KEY, theme);

    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return;

    try {
        const parsed = JSON.parse(raw) as { theme?: ThemeMode };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...parsed, theme }));
    } catch {
        // ignore corrupted settings
    }
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: DEFAULT_THEME,
    initTheme: () => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
        const initial = stored ?? DEFAULT_THEME;
        applyTheme(initial);
        set({ theme: initial });
    },
    setTheme: (theme: ThemeMode) => {
        applyTheme(theme);
        persistTheme(theme);
        set({ theme });
    },
}));
