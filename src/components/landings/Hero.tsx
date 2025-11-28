'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import Logo from '../../logo/LogiImg.svg';
import { TeamList } from "@/components/team/TeamList";
import '@/css/global.css';

export default function Hero() {
    const { isLoggedIn } = useUserStore();

    return (
        <section className="relative isolate overflow-hidden py-20 md:py-40 min-h-[70vh] flex items-center justify-center">
            <div className={"absolute inset-0 bg-[#8B7CF6]"}/>
            <div className="pointer-events-none absolute inset-0">
                <span className={"aurora-line left-[-25%] top-[5%]"}/>
                <span className="aurora-line right-[-30%] top-[35%] [--d:10s]" />
                <span className="aurora-line left-[-15%] bottom-[10%] [--d:13s]" />
            </div>
            <div className={"relative z-10 w-full max-w-3xl px-6"}>
                <div className={"mb-8 flex items-center justify-center gap-2"}>
                    <Image src={Logo} alt={"COZY Logo"} width={80} height={80} className={"h-10 w-10 logo-pulse"}/>
                    <span className={"text=3xl font-bold text-white/90 text-flip"}>COZY</span>
                </div>
                {!isLoggedIn ? (
                    <>
                        <h1 className="mb-6 text-center text-4xl font-bold text-white/95 md:text-5xl glass-text">
                            A collaborative project management tool
                            <br />
                            <span className="text-white/80">for achieving your goals</span>
                        </h1>
                        <Link
                            href="/login"
                            className="text-md md:text-lg mx-auto flex h-12 w-60 items-center justify-center rounded-xl
                         bg-white/20 text-white shadow-lg hover:bg-white/30 transition button-glow"
                        >
                            Get started
                        </Link>
                    </>
                ) : (
                    <div className={"rounded-2xl border border-white bg-white/10 backdrop-blur-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"}>
                        <TeamList />
                    </div>

                )}
            </div>

        </section>
    );
}
