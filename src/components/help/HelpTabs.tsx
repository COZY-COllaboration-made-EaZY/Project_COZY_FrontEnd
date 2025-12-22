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
        <div className="flex gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                        value === tab.key ? "bg-black text-white" : "bg-white"
                    }`}
                >
                    {t(tab.labelKey)}
                </button>
            ))}
        </div>
    );
}
