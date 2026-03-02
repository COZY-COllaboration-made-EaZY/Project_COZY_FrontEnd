'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { resolveProfileImageUrl } from "@/utils/resolveProfileImageUrl";

interface AvatarProfileProps {
    profileImage?: string;
    nickname: string;
    status?: string;
}

export default function AvatarProfile({ profileImage, nickname, status }: AvatarProfileProps) {
    const { t } = useTranslation();
    const profileImageSrc = resolveProfileImageUrl(profileImage);
    return (
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/20">
            <Avatar className='h-12 w-12'>
                {profileImageSrc ? (
                    <Image
                        src={profileImageSrc}
                        alt={t('auth.profileImageLabel')}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
                )}
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-white">{nickname}</span>
                <span className="text-sm text-white/60">{status || t('header.statusPlaceholder')}</span>
            </div>
        </div>
    );
}
