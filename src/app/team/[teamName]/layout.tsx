import React from "react";
import TeamLayoutSideBar from "@/components/team/TeamLayoutSideBar";

export default function TeamLayout({ children, params} : {
    children: React.ReactNode;
    params: { teamName: string };
}) {
    return(
        <div className={"flex min-h-screen"}>
            <TeamLayoutSideBar teamName={params.teamName}/>
            <main className={"flex-1 bg-gray-100 p-8"}>{children}</main>
        </div>
    )
}