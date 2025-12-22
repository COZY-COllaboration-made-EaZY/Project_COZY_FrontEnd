"use client";
import { useTranslation } from "react-i18next";

interface Props {
    onOpen: (type: "usage" | "personal") => void;
}

export default function HelpCreateButtons({ onOpen }: Props) {
    const { t } = useTranslation();

    return (
        <div className="flex gap-3">
            <button
                onClick={() => onOpen("usage")}
                className="border px-4 py-2 rounded"
            >
                {t("help.writeUsage")}
            </button>
            <button
                onClick={() => onOpen("personal")}
                className="border px-4 py-2 rounded"
            >
                {t("help.writePersonal")}
            </button>
        </div>
    );
}
