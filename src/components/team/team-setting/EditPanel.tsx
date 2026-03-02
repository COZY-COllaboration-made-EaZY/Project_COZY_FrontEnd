'use client';

import { useEffect, useState } from "react";
import SectionCard from "./ui/SectionCard";
import Field from "./ui/Field";
import {TeamForm} from "@/components/team/team-setting/TeamSettingClient";
import { useTranslation } from "react-i18next";

export default function EditPanel({
                                      initial,
                                      onCancel,
                                      onSubmit,
                                      onDelete,
                                  }: {
    initial: TeamForm;
    onCancel: () => void;
    onSubmit: (next: TeamForm) => void;
    onDelete: () => void;
}) {
    const { t } = useTranslation();
    const [form, setForm] = useState<TeamForm>(initial);

    useEffect(() => {
        setForm(initial);
    }, [initial]);

    return (
        <section className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    label={`${t('team.settingsTeamName')}:`}
                    value={form.teamName}
                    onChange={(v) =>
                        setForm((s) => ({ ...s, teamName: v }))
                    }
                />
                <Field label={`${t('team.settingsOwner')}:`} value={form.owner} disabled />
            </div>

            {/* 설명 */}
            <SectionCard>
                <label className="mb-2 block text-lg font-bold text-white">
                    {t('team.settingsDescription')}
                </label>
                <textarea
                    className="w-full rounded-xl border border-white/30 bg-white/90 p-3 text-slate-900 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                    rows={6}
                    value={form.description}
                    onChange={(e) =>
                        setForm((s) => ({
                            ...s,
                            description: e.target.value,
                        }))
                    }
                />
            </SectionCard>

            {/* 액션 */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                    onClick={onCancel}
                    className="theme-btn-secondary rounded-xl px-4 py-2 transition hover:brightness-110 w-full sm:w-auto"
                >
                    {t('common.cancel')}
                </button>
                <button
                    onClick={() => onSubmit(form)}
                    className="theme-btn-primary rounded-xl px-5 py-2 text-white transition hover:brightness-110 w-full sm:w-auto"
                >
                    {t('team.settingsUpdate')}
                </button>
                <button
                    onClick={onDelete}
                    className="theme-btn-secondary rounded-xl px-5 py-2 text-white transition hover:brightness-110 w-full sm:w-auto"
                >
                    {t('team.settingsDelete')}
                </button>
            </div>
        </section>
    );
}
