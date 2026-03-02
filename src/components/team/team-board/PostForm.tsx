'use client';

import { useTranslation } from "react-i18next";
import { useState } from "react";

type Props = {
    onBack: () => void;
    i18nPrefix?: string;
    mode?: "create" | "edit";
    initialTitle?: string;
    initialContent?: string;
    onSubmit: (title: string, content: string) => Promise<void> | void;
};

export default function PostForm({
    onBack,
    i18nPrefix,
    mode = "create",
    initialTitle = "",
    initialContent = "",
    onSubmit,
}: Props) {
    const { t } = useTranslation();
    const prefix = i18nPrefix ?? "board";
    const label = (key: string) => t(`${prefix}.${key}`);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [saving, setSaving] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        Promise.resolve(onSubmit(title, content))
            .then(() => onBack())
            .finally(() => setSaving(false));
    };

    const handleCancel = () => {
        console.log("작성 취소");
        onBack();
    };

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8">
            <button
                onClick={onBack}
                className="mb-4 inline-block text-sm text-white/70 hover:underline"
            >
                ← {label("backToList")}
            </button>
            <h2 className="mb-4 text-lg font-semibold text-white">
                {mode === "edit" ? label("editTitle") : label("newPost")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder={label("titlePlaceholder")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded border border-white/30 bg-white/90 p-2 text-sm text-slate-900"
                />
                <textarea
                    placeholder={label("contentPlaceholder")}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="h-60 w-full resize-y rounded border border-white/30 bg-white/90 p-2 text-sm text-slate-900"
                ></textarea>

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button
                        type="submit"
                        className="theme-btn-primary rounded px-3 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                        disabled={saving}
                    >
                        {saving ? t("common.loading") : t('common.submit')}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="theme-btn-secondary rounded border px-3 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.cancel')}
                    </button>
                </div>
            </form>
        </section>
    );
}
