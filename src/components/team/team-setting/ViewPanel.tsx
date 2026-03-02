'use client';
import SectionCard from "./ui/SectionCard";
import Field from "./ui/Field";
import {TeamForm} from "@/components/team/team-setting/TeamSettingClient";

import { useTranslation } from "react-i18next";

export default function ViewPanel({
                                      data,
                                      onEdit,
                                      onDelete,
                                  }: {
    data: TeamForm;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const { t } = useTranslation();
    return (
        <section className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid gap-5 md:grid-cols-2">
                <Field label={`${t('team.settingsTeamName')}:`} value={data.teamName} disabled />
                <Field label={`${t('team.settingsOwner')}:`} value={data.owner} disabled />
            </div>

            {/* 설명 */}
            <SectionCard>
                <label className="mb-2 block text-lg font-bold text-white">
                    {t('team.settingsDescription')}
                </label>
                <p className="whitespace-pre-line text-white/80">
                    {data.description || t('team.settingsDescriptionEmpty')}
                </p>
            </SectionCard>

            {/* 액션 */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    onClick={onEdit}
                    className="theme-btn-primary rounded-xl px-5 py-2 text-white transition hover:brightness-110 w-full sm:w-auto"
                >
                    {t('common.edit')}
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
