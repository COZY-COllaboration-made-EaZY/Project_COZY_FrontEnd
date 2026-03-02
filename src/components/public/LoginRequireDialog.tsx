"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    onClose: () => void;
}

export default function LoginRequiredDialog({ onClose }: Props) {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="theme-card rounded-lg p-6 w-full max-w-xs text-center text-white">
                <h2 className="text-lg font-semibold mb-3">{t('common.loginRequired')}</h2>
                <p className="text-sm text-white/70 mb-6">
                    {t('common.loginRequiredDetail')}
                </p>
                <button
                    onClick={onClose}
                    className="theme-btn-primary w-full py-2 rounded hover:brightness-110"
                >
                    {t('common.ok')}
                </button>
            </div>
        </div>
    );
}
