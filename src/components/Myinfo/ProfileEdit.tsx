'use client';
// 📁 ProfileEdit.tsx


import React, { useState } from "react";
import Image from "next/image";
import { updateUserInfoRequest } from "@/api/requests/info";
import { normalizeUser } from "@/utils/normalizeUser";
import { resolveProfileImageUrl } from "@/utils/resolveProfileImageUrl";
import { useTranslation } from "react-i18next";

type UserProfile = {
    nickname?: string;
    statusMessage?: string;
    profileImage?: string;
};

type Props = {
    user: UserProfile;
    setUser: (user: UserProfile) => void;
    onCancel: () => void;
    onSave: () => void;
};

export default function ProfileEdit({ user, setUser, onCancel, onSave }: Props) {
    const { t } = useTranslation();
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [statusMessage, setStatusMessage] = useState(user?.statusMessage || "");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(
        resolveProfileImageUrl(user?.profileImage)
    );
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName(null);
        }
    };

    const handleSave = async () => {
        try {
            if (
                nickname === user.nickname &&
                statusMessage === user.statusMessage &&
                !profileImage
            ) {
                setErrorMessage(t('myinfo.edit.noChanges'));
                return;
            }

            const refreshedUser = await updateUserInfoRequest(
                nickname,
                statusMessage,
                profileImage ?? undefined
            );

            // ✅ 최신 정보 다시 받아오기
            // const refreshedUser = await getCurrentUserRequest();

            setUser(normalizeUser(refreshedUser as never));

            onSave();
        } catch (error: unknown) {
            console.error(error);
            setErrorMessage(t('myinfo.edit.failed'));
        }
    };

    return (
        <div className="theme-card w-full max-w-md rounded-lg p-6 text-center text-white">
            <h2 className="text-xl font-bold mb-4">{t('myinfo.edit.title')}</h2>

            {errorMessage && <p className="text-rose-200 mb-4">{errorMessage}</p>}

            <div className="flex flex-col items-center mb-4">
                {previewImage ? (
                    <Image
                        src={previewImage}
                        alt={t('myinfo.edit.previewAlt')}
                        width={100}
                        height={100}
                        className="rounded-full object-cover border border-white/30 shadow-md"
                    />
                ) : (
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white/60">
                        {t('myinfo.edit.noImage')}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="theme-btn-primary cursor-pointer flex items-center justify-center px-4 py-2 rounded-md shadow-md transition hover:brightness-110">
                    {t('myinfo.edit.selectFile')}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                    />
                </label>
                <p className={`mt-2 text-sm ${selectedFileName ? "text-white font-medium" : "text-white/60"}`}>
                    {selectedFileName || t('myinfo.edit.noFile')}
                </p>
            </div>

            <input
                type="text"
                className="w-full p-2 border border-white/30 bg-white/90 text-slate-900 rounded-md mb-2"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t('auth.nicknameLabel')}
            />

            <input
                type="text"
                className="w-full p-2 border border-white/30 bg-white/90 text-slate-900 rounded-md mb-4"
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                placeholder={t('header.statusPlaceholder')}
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <button
                    className="theme-btn-primary w-full p-2 rounded-md transition hover:brightness-110 sm:mr-2 sm:w-1/2"
                    onClick={handleSave}
                >
                    {t('common.save')}
                </button>
                <button
                    className="theme-btn-secondary w-full p-2 rounded-md transition hover:brightness-110 sm:w-1/2"
                    onClick={onCancel}
                >
                    {t('common.cancel')}
                </button>
            </div>
        </div>
    );
}
