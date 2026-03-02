'use client';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useTeamStore } from "@/store/teamStore";

interface ProjectDropdownProps {
    projects: { id: number; name: string }[];
}

export default function ProjectDropdown({ projects }: ProjectDropdownProps) {
    const router = useRouter();
    const { t } = useTranslation();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);

    return (
        <div>
            {projects.length > 0 ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="px-4 py-2 rounded-md">
                            {t('projectDropdown.activeProjects')} ▼
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="theme-card w-60 rounded-md text-white">
                        {projects.map((project) => (
                            <DropdownMenuItem key={project.id} asChild>
                                <Link href={`/projects/${project.id}`} className="block px-4 py-2 hover:bg-white/10">
                                    {project.name}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button
                    className="theme-btn-primary px-4 py-2 rounded-md transition hover:brightness-110"
                    onClick={() => {
                        const target = currentTeamId
                            ? `/createproject?teamId=${encodeURIComponent(currentTeamId)}`
                            : '/createproject';
                        setTimeout(() => router.push(target), 500);
                    }}
                >
                    {t('createProject.newProject')}
                </Button>
            )}
        </div>
    );
}
