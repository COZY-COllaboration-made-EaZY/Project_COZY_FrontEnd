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
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 shadow-xl">
            <div className="bg-white p-8 shadow-xl w-full max-w-2xl">

                {/* 제목 */}
                <h2 className="text-xl font-bold mb-4">
                    {typeLabel} {t("help.write")}
                </h2>

                {/* 작성자 */}
                <p className="text-sm mb-2 text-black font-bold">
                    {t("help.author")} : {username}
                </p>

                {/* 제목 입력 */}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("help.placeholder_title")}
                    className="w-full border mb-4 p-4 text-lg"
                />

                {/* 내용 입력 */}
                <textarea
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t("help.placeholder_content")}
                    className="w-full border mb-4 p-4 text-lg resize-none"
                />

                {/* 버튼 */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold text-lg shadow-md"
                    >
                        {t("help.submit")}
                    </button>

                    <button
                        onClick={onClose}
                        className="px-6 bg-red-500 hover:bg-red-700 text-white text-lg"
                    >
                        {t("help.cancel")}
                    </button>
                </div>
            </div>
        </div>
    );
}
