'use client';
import React from "react";
import dynamic from "next/dynamic";
import LocaleSync from "@/components/common/LocaleSync";

const Header = dynamic(() => import("@/components/Header/indext"), {
    ssr: false,
});

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LocaleSync />
            <Header />
            <main className="pt-[64px]">
                {children}
            </main>
        </>
    );
}
