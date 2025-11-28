'use client'

import Link from 'next/link';
import AvatarMenu from './AvatarMenu';
import Logo from '../../logo/LogiImg.svg';
import Image from 'next/image';
import {useTranslation} from "react-i18next";

export default function Header() {
    const { t } = useTranslation();
    return (
        <header
            className="
                fixed top-0 z-20 w-full
                bg-gradient-to-r from-[#8B7CF6]/40 to-[#AA92FF]/40
                backdrop-blur-xl
                border-b border-white/20
    "
        >
            <div className="h-16 flex items-center justify-between px-4 md:px-6">

                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={Logo} width={40} height={40} alt="logo" />
                        <span className="font-bold text-white drop-shadow-md">COZY</span>
                    </Link>

                    <nav className="hidden md:flex gap-1">
                        <Link
                            href="/feature"
                            className="
                                px-3 py-1 rounded-lg text-sm
                                font-semibold text-white/90
                                hover:bg-white/10
                                drop-shadow
                    "
                        >
                            {t("nav.feature")}
                        </Link>

                        <Link
                            href="/recruit"
                            className="
                                px-3 py-1 rounded-lg text-sm
                                font-semibold text-white/90
                                hover:bg-white/10
                                drop-shadow
                    "
                        >
                            {t("nav.recruit")}
                        </Link>

                        <Link
                            href="/inquiry"
                            className="
                                px-3 py-1 rounded-lg text-sm
                                font-semibold text-white/90
                                hover:bg-white/10
                                drop-shadow
                    "
                        >
                            {t("nav.inquiry")}
                        </Link>
                    </nav>
                </div>

                <AvatarMenu />
            </div>
        </header>

    );
}
