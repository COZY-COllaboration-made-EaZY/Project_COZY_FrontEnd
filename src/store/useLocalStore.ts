"use client";

import { create } from "zustand";
import { LOCALE, Locale } from "@/enum/locale";
import Cookies from "js-cookie";

interface LocaleState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

// 쿠키에 저장된 언어가 있으면 우선 사용, 없으면 EN
const detectInitialLocale = (): Locale => {
    if (typeof window === "undefined") {
        // SSR 방지용. 어차피 클라이언트에서 다시 설정됨.
        return LOCALE.EN;
    }

    const cookieLang = Cookies.get("i18next");
    if (cookieLang && (Object.values(LOCALE) as string[]).includes(cookieLang)) {
        return cookieLang as Locale;
    }
    return LOCALE.EN;
};

export const useLocaleStore = create<LocaleState>((set) => ({
    locale: detectInitialLocale(),
    setLocale: (locale: Locale) => {
        Cookies.set("i18next", locale, { expires: 365 });
        set({ locale });
    },
}));
