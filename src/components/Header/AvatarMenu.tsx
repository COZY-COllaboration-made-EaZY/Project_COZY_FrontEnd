'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import {useLocaleStore} from "@/store/useLocalStore";
import {Locale, LOCALE} from "@/enum/locale";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

export default function AvatarMenu() {
    const router = useRouter();
    const { isLoggedIn, user, logout } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const { locale, setLocale } = useLocaleStore();
    const {t} = useTranslation();

    const cycleLanguage = () => {
        const order: Locale[] = [LOCALE.EN, LOCALE.KO, LOCALE.JA];
        const currentIndex = order.indexOf(locale);
        const nextIndex = (currentIndex + 1) % order.length;
        const nextLocale = order[nextIndex];

        setLocale(nextLocale);
    };

    const languageLabel =
        locale === LOCALE.KO
            ? t("locale.korean")
            : locale === LOCALE.EN
                ? t("locale.english")
                : t("locale.japanese");

    const handleLogout = async () => {
        await logout();
        setIsOpen(false);
        router.push('/login');
    };

    const profileImageSrc = user?.profileImage
        ? (user.profileImage.startsWith('http') ? user.profileImage : `/uploads/${user.profileImage}`)
        : null;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {isLoggedIn && user ? (
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            <Avatar className='h-8 w-8'>
                                {profileImageSrc ? (
                                    <Image src={profileImageSrc} alt="프로필 이미지" width={32} height={32} className="rounded-full object-cover" />
                                ) : (
                                    <AvatarFallback className="bg-gray-300 text-lg font-bold text-white">
                                        {user?.nickname?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </Button>
                        <span className="text-gray-800 font-medium text-sm md:text-base">
                            welcome {user?.nickname}
                        </span>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className="px-4 py-2 rounded-full border border-white/70 bg-white/10 text-gray-800 font-semibold hover:bg-white/20 transition "
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </Button>
                )}
            </DropdownMenuTrigger>

            {isLoggedIn && user && (
                <DropdownMenuContent
                    align='end'
                    className="w-72 p-4 bg-white rounded-xl shadow-lg border border-gray-200"
                    onPointerDownOutside={() => setIsOpen(false)}
                >
                    <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 mb-2">
                            {profileImageSrc ? (
                                <Image src={profileImageSrc} alt="프로필 이미지" width={64} height={64} className="rounded-full object-cover" />
                            ) : (
                                <AvatarFallback className="bg-gray-300 text-lg font-bold text-white">
                                    {user?.nickname?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <span className="font-semibold text-lg text-gray-900">{user?.nickname}</span>
                        <span className="text-sm text-gray-500">
                            {user?.statusMessage || "Not input statusMessage"}
                        </span>
                    </div>

                    <div className="border-t border-gray-200 my-3"/>

                    <div className="grid grid-cols-2 gap-3">
                        <DropdownMenuItem asChild>
                            <Link href='/myinfo'
                                  className="flex items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold">
                                {t("menu.myinfo")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href='/settings'
                                  className="flex items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold">
                                {t("menu.settings")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleLogout}
                            className="flex items-center justify-center p-3 rounded-lg bg-gray-100 hover:bg-red-100 text-red-600 font-semibold"
                        >
                            {t("menu.logout")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                cycleLanguage();
                            }}
                            className={"flex flex-col items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold"}>
                            <span className={"text-sm"}>Language</span>
                            <span className={"text-xs text-gray-500"}>
                                {languageLabel}
                            </span>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
}
