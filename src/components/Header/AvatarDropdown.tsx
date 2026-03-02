'use client';

import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Avatar } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { resolveProfileImageUrl } from "@/utils/resolveProfileImageUrl";

interface AvatarDropdownProps {
    profileImage?: string;
    nickname: string;
    status?: string;
    handleLogout: () => void;
}

export default function AvatarDropdown({ profileImage, nickname, status, handleLogout }: AvatarDropdownProps) {
    const { t } = useTranslation();
    const profileImageSrc = resolveProfileImageUrl(profileImage);
    return (
        <DropdownMenuContent
            align="end"
            className="theme-card w-72 rounded-lg p-4 text-white"
            style={{ borderWidth: '1px' }}
        >
            {/* TODO : 프로필 정보 */}
            <div className="flex flex-col items-center pb-4">
                <Avatar className="h-20 w-20">
                    {profileImageSrc ? (
                        <Image
                            src={profileImageSrc}
                            alt={t('auth.profileImageLabel')}
                            width={80}
                            height={80}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white">
                            {nickname.charAt(0).toUpperCase()}
                        </span>
                    )}
                </Avatar>
                <div className="mt-2 text-center">
                    <span className="font-semibold text-lg text-white">{t('header.nicknameSuffix', { name: nickname })}</span>
                    <p className="text-sm text-white/60">{status || t('header.statusPlaceholder')}</p>
                </div>
            </div>


            <hr className="my-3 w-full border-t border-white/20" />


            <div className="grid grid-cols-2 gap-2">
                <DropdownMenuItem asChild>
                    <Link href='/myinfo' className="theme-btn-secondary flex items-center justify-center rounded-lg p-3 font-semibold transition hover:brightness-110">
                        {t('menu.myinfo')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/settings' className="theme-btn-secondary flex items-center justify-center rounded-lg p-3 font-semibold transition hover:brightness-110">
                        {t('menu.settings')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/participation' className="theme-btn-secondary flex items-center justify-center rounded-lg p-3 font-semibold transition hover:brightness-110">
                        {t('menu.participation')}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={handleLogout}
                    className="theme-btn-secondary flex items-center justify-center rounded-lg p-3 font-semibold text-white transition hover:brightness-110"
                >
                    {t('menu.logout')}
                </DropdownMenuItem>
            </div>
        </DropdownMenuContent>
    );
}
