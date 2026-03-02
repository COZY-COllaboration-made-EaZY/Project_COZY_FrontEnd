import React from "react";
import TabsHeader from "@/components/project/TabsHeader";
import ProjectAccessGuard from "@/components/project/ProjectAccessGuard";

type Props = {
    children: React.ReactNode;
    params: Promise<{ projectName: string }>;
};

export default function ProjectLayout({ children, params }: Props) {
    const { projectName } = React.use(params);

    return (
        <div className="theme-page relative min-h-screen overflow-hidden">
            <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
            <div className="theme-stars pointer-events-none absolute inset-0" />
            <ProjectAccessGuard projectName={projectName}>
                <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
                    <TabsHeader projectName={projectName} />
                    <main className="flex-1 p-4 md:p-8">{children}</main>
                </div>
            </ProjectAccessGuard>
        </div>
    );
}
