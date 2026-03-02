'use client';

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TagInput({
                                     label,
                                     values,
                                     onChange,
                                 }: {
    label: string;
    values: string[];
    onChange: (next: string[]) => void;
}) {
    const { t } = useTranslation();
    const [temp, setTemp] = useState("");

    const add = (t: string) => {
        const v = t.trim();
        if (!v) return;
        if (values.includes(v)) return;
        onChange([...values, v]);
    };

    const remove = (t: string) => onChange(values.filter((x) => x !== t));

    return (
        <div>
            <label className="mb-2 block text-lg font-bold text-white">{label}</label>
            <div className="mb-2 flex gap-2">
                <input
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            add(temp);
                            setTemp("");
                        }
                    }}
                    placeholder={t('team.tagInputPlaceholder')}
                    className="h-11 flex-1 rounded-xl border border-white/30 bg-white/90 px-3 text-slate-900 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                />
                <button
                    type="button"
                    onClick={() => {
                        add(temp);
                        setTemp("");
                    }}
                    className="theme-btn-secondary rounded-xl px-4 text-sm transition hover:brightness-110"
                >
                    {t('team.tagAdd')}
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {values.length === 0 && (
                    <span className="text-white/60">{t('team.tagEmpty')}</span>
                )}
                {values.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => remove(tag)}
                        className="theme-btn-secondary rounded-xl px-3 py-1 text-sm transition hover:brightness-110"
                        title={t('team.tagRemoveTitle')}
                    >
                        {tag} ×
                    </button>
                ))}
            </div>
        </div>
    );
}
