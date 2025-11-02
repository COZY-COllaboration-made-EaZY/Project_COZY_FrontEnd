'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function TeamLayoutSideBar({teamName} : {teamName: string}) {
    const pathname = usePathname();
    const base = `/team/${teamName}`;

    const tabs = [
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'TeamUserList', path: 'team-userlist' },
        { label: 'ProjectList', path: 'project-list' },
        { label: 'TeamSetting', path: 'team-setting' },
        { label: 'TeamBoard', path: 'team-board' },
        { label: 'TeamNotice', path: 'team-notice' },
        { label: 'TeamRequest', path: 'team-request' },
    ];

    return(
        <aside className={"w-40 bg-white border-r border-gray-200 py-6 px-4"}>
            <nav className={"flex flex-col gap-4"}>
                {tabs.map((tab)=>{
                    const href = `${base}${tab.path ? `/${tab.path}` : ''}`;
                    const isActive = pathname === href;
                    return (
                        <Link href={href}
                              key={tab.path}
                        className={cn('text-sm font-medium px-2 py-1.5 rounded text-center w-full',
                            isActive
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                        )}
                        >
                            {tab.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    );
}