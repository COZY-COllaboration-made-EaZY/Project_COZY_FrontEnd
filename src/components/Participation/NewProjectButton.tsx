'use client';

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useTeamStore } from "@/store/teamStore";

export default function NewProjectButton(){
    const router = useRouter();
    const { t } = useTranslation();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);

    return(
        <Button
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
                const target = currentTeamId
                    ? `/createproject?teamId=${encodeURIComponent(currentTeamId)}`
                    : '/createproject';
                setTimeout(() => router.push(target), 500);
            }}
        >
            {t('createProject.newProject')}
        </Button>
    )
}
