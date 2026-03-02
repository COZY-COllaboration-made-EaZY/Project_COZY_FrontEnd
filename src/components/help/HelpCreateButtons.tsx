"use client";
import { useTranslation } from "react-i18next";

interface Props {
    onOpen: (type: "usage" | "personal") => void;
}

export default function HelpCreateButtons({ onOpen }: Props) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
                onClick={() => onOpen("usage")}
                className="theme-btn-secondary rounded-xl px-4 py-2 text-sm shadow-[0_10px_22px_rgba(15,23,42,0.35)] transition hover:brightness-110 w-full sm:w-auto"
            >
                {t("help.writeUsage")}
            </button>
            <button
                onClick={() => onOpen("personal")}
                className="theme-btn-secondary rounded-xl px-4 py-2 text-sm shadow-[0_10px_22px_rgba(15,23,42,0.35)] transition hover:brightness-110 w-full sm:w-auto"
            >
                {t("help.writePersonal")}
            </button>
        </div>
    );
}
