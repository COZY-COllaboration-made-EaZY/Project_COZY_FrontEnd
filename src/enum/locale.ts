export const LOCALE = {
    KO: "ko-KR",
    EN: "en-US",
    JA: "ja-JP",
} as const;

export type Locale = typeof LOCALE[keyof typeof LOCALE];

export const LOCALE_LABEL = {
    [LOCALE.KO]: "한국어",
    [LOCALE.EN]: "English",
    [LOCALE.JA]: "日本語",
} as const;

export const LOCALE_OPTIONS = [
    { key: "KO", value: LOCALE.KO, label: "한국어" },
    { key: "EN", value: LOCALE.EN, label: "English" },
    { key: "JA", value: LOCALE.JA, label: "日本語" },
] as const;