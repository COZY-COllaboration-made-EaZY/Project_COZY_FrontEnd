'use client';

import Image from 'next/image';
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { resolveProfileImageUrl } from "@/utils/resolveProfileImageUrl";

type UserProfile = {
    nickname?: string;
    statusMessage?: string;
    profileImage?: string;
};

export default function ProfileView({ user, onEdit }: { user: UserProfile; onEdit: () => void }) {
    const { t } = useTranslation();
    const getFallbackAvatar = () => {
        return user?.nickname ? user.nickname.charAt(0).toUpperCase() : "?";
    };

    const profileImageSrc = resolveProfileImageUrl(user?.profileImage);



    return (
        <div className="theme-card w-full max-w-md rounded-lg p-6 text-center text-white">
            <h2 className="text-xl font-bold mb-4">{t('myinfo.view.title')}</h2>

            <div className="flex flex-col items-center mb-4">

                {profileImageSrc ? (
                    <Image src={profileImageSrc} alt={t('auth.profileImageLabel')} width={100} height={100} className="rounded-full object-cover" />
                ) : (
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                            {getFallbackAvatar()}
                        </span>
                    </div>
                )}

            </div>

            <p className="text-white mb-2">{t('myinfo.view.nickname')}: {user?.nickname}</p>
            <p className="text-white/60 mb-4">{t('myinfo.view.status')}: {user?.statusMessage || t('myinfo.view.noStatus')}</p>

            <button className="theme-btn-primary w-full p-2 mt-4 rounded-md transition hover:brightness-110" onClick={onEdit}>
                {t('common.edit')}
            </button>
            <br/>
            <Link href={"/myinfo/request"}>
                <button className={"theme-btn-secondary w-full p-2 mt-4 rounded-md transition hover:brightness-110"}>
                    {t('myinfo.view.requestStatus')}
                </button>
            </Link>

        </div>
    );
}
