import React from "react";
import TabsHeader from "@/components/project/TabsHeader";

type Props = {
    children: React.ReactNode;
    params: Promise<{ projectName: string }>;
};

export default function ProjectLayout({ children, params }: Props) {
    const { projectName } = React.use(params);

    return (
        <div className="flex min-h-screen">
            <TabsHeader projectName={projectName} />
            <main className="flex-1 bg-gray-100 p-8">{children}</main>
        </div>
    );
}
