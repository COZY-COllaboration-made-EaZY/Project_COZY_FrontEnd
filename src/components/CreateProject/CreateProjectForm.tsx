'use client';

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { checkProjectNameRequest } from "@/api/requests/project";
import { useTranslation } from "react-i18next";
import { useTeamStore } from "@/store/teamStore";

export default function CreateProjectForm() {
    const { t } = useTranslation();
    const [projectName, setProjectName] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);

    const teamId = useMemo(() => {
        const fromQuery = searchParams.get("teamId");
        return fromQuery || currentTeamId || "";
    }, [searchParams, currentTeamId]);

    const handleCheckName = async () => {
        if (!projectName) {
            setErrorMessage(t('createProject.errorNameRequired'));
            setIsAvailable(false);
            return;
        }
        setIsChecking(true);
        setErrorMessage("");
        setIsAvailable(false);
        try {
            const isDuplicate = await checkProjectNameRequest(projectName);
            if (!isDuplicate) {
                setErrorMessage(t('createProject.errorNameDuplicate'));
            } else {
                setIsAvailable(true);
            }
        } catch {
            setErrorMessage(t('createProject.errorNameCheckFailed'));
        } finally {
            setIsChecking(false);
        }
    };

    const handleNextStep = () => {
        if (!teamId) {
            setErrorMessage(t("createProject.errorTeamRequired"));
            return;
        }
        router.push(
            `/createproject/interest?projectName=${encodeURIComponent(projectName)}&teamId=${encodeURIComponent(teamId)}`
        );
    };

    // 영어만
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const onlyEnglish = value.replace(/[^a-zA-Z]/g, "");
        setProjectName(onlyEnglish);
        setIsAvailable(false);
        setErrorMessage("");
    };

    const borderState = errorMessage
        ? "border-red-300 focus:border-red-300 focus:ring-red-200/40"
        : isAvailable
            ? "border-emerald-300 focus:border-emerald-300 focus:ring-emerald-200/40"
            : "border-white/30 focus:border-white focus:ring-white/40";

    return (
        <div className="space-y-4">
            <div>
                <label className="mb-2 block text-sm font-medium text-white/80">{t('createProject.nameLabel')}</label>
                <Input
                    type="text"
                    value={projectName}
                    onChange={handleInputChange}
                    placeholder={t('createProject.namePlaceholder')}
                    className={`w-full rounded-xl border bg-white/90 p-3 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:ring-2 ${borderState}`}
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                    <p className="text-white/60">{t('createProject.nameEnglishOnly')}</p>
                    {isAvailable && !errorMessage && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 font-medium text-emerald-100 ring-1 ring-emerald-300/40">
              {t('createProject.nameAvailable')}
            </span>
                    )}
                </div>
                {errorMessage && <p className="mt-2 text-sm text-rose-200">{errorMessage}</p>}
            </div>

            <div className="flex gap-2">
                <Button
                    className="theme-btn-primary flex-1 rounded-xl px-4 py-2 text-sm font-semibold shadow transition hover:brightness-110 active:scale-[0.99]"
                    onClick={isAvailable ? handleNextStep : handleCheckName}
                    disabled={isChecking}
                >
                    {isChecking ? t('createProject.nameChecking') : isAvailable ? t('common.next') : t('createProject.nameCheck')}
                </Button>
            </div>
        </div>
    );
}
