import React from "react";
import TeamLayoutSideBar from "@/components/team/TeamLayoutSideBar";
import TeamAccessGuard from "@/components/team/TeamAccessGuard";

export default function TeamLayout({ children, params} : {
    children: React.ReactNode;
    params: { teamName: string };
}) {
    return(
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-8 h-52 w-52 rounded-full blur-3xl" />
            <div className="theme-glow-3 pointer-events-none absolute top-24 left-8 h-28 w-28 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />

            <TeamAccessGuard teamName={params.teamName}>
                <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
                    <TeamLayoutSideBar teamName={params.teamName}/>
                    <main className="flex-1 p-4 md:p-8">{children}</main>
                </div>
            </TeamAccessGuard>
        </div>
    )
}
