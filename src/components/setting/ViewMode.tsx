'use client';

import { useTranslation } from "react-i18next";

export type ViewProject = {
    projectId: string;
    projectName: string;
    description: string;
    ownerName: string;
    devInterest: string;
    gitHubUrl: string | null;
};

type Props = {
    data: ViewProject;
    onEdit: () => void;
    onDelete: () => void;
};

export default function ViewMode({ data, onEdit, onDelete }: Props) {
    const { t } = useTranslation();
    return (
        <section className="theme-card rounded-3xl">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-white/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {data.projectName}
                    </h2>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                        onClick={onEdit}
                        className="theme-btn-primary rounded-md px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.edit')}
                    </button>
                    <button
                        onClick={onDelete}
                        className="theme-btn-secondary rounded-md px-4 py-2 text-sm font-semibold transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.delete')}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                {/* Overview */}
                <div className="theme-card rounded-2xl p-5">
                    <h3 className="mb-3 text-sm font-semibold text-white/80">
                        {t('projectSettings.sections.overview')}
                    </h3>

                    <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm text-white/80">
                        <dt className="text-white/60">{t('projectSettings.fields.owner')}</dt>
                        <dd className="font-medium text-white">
                            {data.ownerName || t('projectSettings.unknown')}
                        </dd>

                        <dt className="text-white/60">{t('projectSettings.fields.devInterest')}</dt>
                        <dd>
                            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-2 py-0.5 text-xs font-medium text-white/90">
                                {data.devInterest}
                            </span>
                        </dd>

                        <dt className="text-white/60">{t('projectSettings.fields.gitHub')}</dt>
                        <dd>
                            {data.gitHubUrl ? (
                                <a
                                    href={data.gitHubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="break-all text-white/90 underline underline-offset-2 hover:opacity-80"
                                >
                                    {data.gitHubUrl}
                                </a>
                            ) : (
                                <span className="text-white/50">{t('projectSettings.noGitUrl')}</span>
                            )}
                        </dd>
                    </dl>
                </div>

                {/* Description */}
                <div className="theme-card rounded-2xl p-5">
                    <h3 className="mb-3 text-sm font-semibold text-white/80">
                        {t('projectSettings.sections.description')}
                    </h3>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-white/80">
                        {data.description || t('projectSettings.noDescription')}
                    </p>
                </div>
            </div>
        </section>
    );
}
