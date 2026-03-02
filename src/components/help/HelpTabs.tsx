"use client";
import { useTranslation } from "react-i18next";

type ViewType = "all" | "usage" | "personal";

interface Props {
    value: ViewType;
    onChange: (value: ViewType) => void;
}

const tabs = [
    { key: "all", labelKey: "help.all" },
    { key: "usage", labelKey: "help.usage" },
    { key: "personal", labelKey: "help.personal" },
] as const;

export default function HelpTabs({ value, onChange }: Props) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                        value === tab.key
                            ? "border-white/40 bg-white/20 text-white shadow-[0_10px_24px_rgba(15,23,42,0.35)]"
                            : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                >
                    {t(tab.labelKey)}
                </button>
            ))}
        </div>
    );
}
