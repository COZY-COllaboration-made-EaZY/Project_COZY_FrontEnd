'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import Logo from '../../logo/LogiImg.svg';
import { TeamList } from "@/components/team/TeamList";

export default function Hero() {
    const { isLoggedIn } = useUserStore();

    return (
        <section className="py-20 md:py-40">
            <div className="mb-8 flex items-center justify-center gap-2">
                <Image
                    src={Logo}
                    alt="COZY Logo"
                    width={80}
                    height={80}
                    className="h-10 w-10"
                />
                <span className="text-3xl font-bold text-blue-500">COZY</span>
            </div>

            {!isLoggedIn ? (
                <>
                    <h1 className="mb-6 text-center text-4xl font-bold text-gray-600 md:text-5xl">
                        A collaborative project management tool
                        <br />
                        for achieving your goals
                    </h1>
                    <Link
                        href="/login"
                        className="text-md md:text-lg mx-auto flex h-10 w-60 items-center justify-center rounded-lg bg-blue-400 font-medium text-white shadow-lg hover:bg-blue-700 md:h-14 md:w-64"
                    >
                        Get started
                    </Link>
                </>
            ) : (
                <TeamList />
            )}
        </section>
    );
}
