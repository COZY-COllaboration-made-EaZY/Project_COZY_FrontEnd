"use client";

import { useState } from "react";
import {useTranslation} from "react-i18next";

interface Props {
    openType: "usage" | "personal" | null;
    username: string;
    onSubmit: (title: string, content: string) => Promise<void>;
    onClose: () => void;
}

export default function HelpCreateDialog({
                                             openType,
                                             username,
                                             onSubmit,
                                             onClose,
                                         }: Props) {
    const {t} = useTranslation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (!openType) return null;

    const typeLabel = openType === "usage" ? t("help.usage") : t("help.personal");

    const handleSubmit = async () => {
        await onSubmit(title, content);
        setTitle("");
        setContent("");
        alert(t("help.submitSuccess"))
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-xl">
            <div className="theme-card w-full max-w-2xl rounded-3xl p-4 text-white sm:p-6 md:p-8">

                {/* 제목 */}
                <h2 className="text-xl font-bold mb-4">
                    {typeLabel} {t("help.write")}
                </h2>

                {/* 작성자 */}
                <p className="text-sm mb-2 text-white/80 font-semibold">
                    {t("help.author")} : {username}
                </p>

                {/* 제목 입력 */}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("help.placeholder_title")}
                    className="w-full rounded-md border border-white/30 bg-white/90 mb-4 p-3 text-base text-slate-900 sm:p-4 sm:text-lg"
                />

                {/* 내용 입력 */}
                <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t("help.placeholder_content")}
                    className="w-full rounded-md border border-white/30 bg-white/90 mb-4 p-3 text-base text-slate-900 resize-none sm:p-4 sm:text-lg"
                />

                {/* 버튼 */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={handleSubmit}
                        className="theme-btn-primary rounded-md px-6 py-3 text-base font-semibold transition hover:brightness-110 w-full sm:w-auto sm:text-lg"
                    >
                        {t("help.submit")}
                    </button>

                    <button
                        onClick={onClose}
                        className="theme-btn-secondary rounded-md px-6 py-3 text-base transition hover:brightness-110 w-full sm:w-auto sm:text-lg"
                    >
                        {t("help.cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
}
