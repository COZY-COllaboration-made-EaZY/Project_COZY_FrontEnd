'use client';

import { useState } from 'react';
import axios from 'axios';
import { ERROR_MESSAGE_MAP } from '@/constants/errorMessage';
import { isErrorCode } from '@/utils/isErrorCode';
import { ApiErrorResponse } from '@/types/ErrorResponse';
import {createJoinRequest} from "@/api/requests/joinRequest";
import { useTranslation } from "react-i18next";

interface Props {
    teamId: string;
    teamName: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function TeamJoinRequestDialog({
                                                  teamId,
                                                  teamName,
                                                  onClose,
                                                  onSuccess,
                                              }: Props) {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) {
            alert(t('recruit.joinMessageRequired'));
            return;
        }

        try {
            setLoading(true);

            await createJoinRequest(teamId, message);

            onSuccess?.();
            onClose();
        } catch (e: unknown) {
            if (axios.isAxiosError<ApiErrorResponse>(e)) {
                const errorCode = e.response?.data?.error?.errorCode;

                if (errorCode && isErrorCode(errorCode)) {
                    alert(t(ERROR_MESSAGE_MAP[errorCode]));

                    // 이미 신청 / 이미 소속 → 다이얼로그 닫기
                    if (errorCode === 'JOIN-002' || errorCode === 'JOIN-003') {
                        onClose();
                    }
                    return;
                }
            }

            alert(t('recruit.joinRequestFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="theme-card w-full max-w-md rounded-3xl p-4 text-white sm:p-6">
                <h2 className="mb-4 text-lg font-bold">{t('recruit.joinRequestTitle')}</h2>

                <p className="mb-4 text-sm text-white/70">
                    {t('recruit.joinRequestTeamLabel')}: {' '}
                    <span className="font-medium text-white">{teamName}</span>
                </p>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('recruit.joinMessagePlaceholder')}
                    className="h-32 w-full resize-none rounded-xl border border-white/30 bg-white/90 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/40"
                />

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="theme-btn-secondary rounded-lg px-4 py-2 transition hover:brightness-110 w-full sm:w-auto"
                    >
                        {t('common.cancel')}
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="theme-btn-primary rounded-lg px-4 py-2 transition hover:brightness-110 disabled:opacity-50 w-full sm:w-auto"
                    >
                        {loading ? t('recruit.joinSending') : t('recruit.joinSubmit')}
                    </button>
                </div>
            </div>
        </div>
    );
}
