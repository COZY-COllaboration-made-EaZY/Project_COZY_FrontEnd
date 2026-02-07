'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TeamLayoutSideBar({ teamName }: { teamName: string }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const base = `/team/${teamName}`;

    const tabs = [
        { label: 'Dashboard', path: 'dashboard' },
        { label: 'TeamUserList', path: 'team-userlist' },
        { label: 'ProjectList', path: 'project-list' },
        { label: 'TeamSetting', path: 'team-setting' },
        { label: 'TeamRequest', path: 'team-request' },
    ];

    return (
        <aside className="w-40 bg-white border-r border-gray-200 py-6 px-4">
            <nav className="flex flex-col gap-4">
                {tabs.map((tab) => {
                    const href = `${base}/${tab.path}`;

                    // ⭐ 핵심: mounted 이후에만 active 계산
                    const isActive =
                        mounted && pathname.startsWith(href);

                    return (
                        <Link
                            key={tab.path}
                            href={href}
                            className={cn(
                                'text-sm px-2 py-1.5 rounded text-center w-full',
                                isActive
                                    ? 'bg-blue-100 text-blue-700 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                            )}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
