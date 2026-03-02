'use client';

import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function CommentForm({
    i18nPrefix,
    onSubmit,
}: {
    i18nPrefix?: string;
    onSubmit: (content: string) => void;
}) {
    const { t } = useTranslation();
    const prefix = i18nPrefix ?? "board";
    const label = (key: string) => t(`${prefix}.${key}`);
    const [content, setContent] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content.trim());
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
          placeholder={label('commentPlaceholder')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-24 w-full resize-y rounded border border-white/20 bg-white/10 p-2 text-sm text-white/80 placeholder:text-white/50"
      ></textarea>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="theme-btn-primary rounded px-3 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                >
                    {label('commentSubmit')}
                </button>
            </div>
        </form>
    );
}
