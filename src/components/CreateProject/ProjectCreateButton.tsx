'use client';

import { Button } from '@/components/ui/button';
import { useTranslation } from "react-i18next";

export default function ProjectCreateButton() {
    const { t } = useTranslation();
    const projectName: string | null = null;

    // useEffect(() => {
    //     if (!isLoggedIn) return;
    //
    //     const checkProject = async () => {
    //         try {
    //             const res = await getMy;
    //             if (res?.projectName) {
    //                 setProjectName(res.projectName);
    //             } else {
    //                 setProjectName(null);
    //             }
    //         } catch (e) {
    //             setProjectName(null);
    //         }
    //     };
    //     checkProject();
    // }, [isLoggedIn]);


    // if (!isLoggedIn) return null;

    // const handleClick = () => {
    //     if (projectName) {
    //         router.push(`/project/${projectName}/dashboard`);
    //     } else {
    //         router.push('/createproject');
    //     }
    // };


    return (
        <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
            {projectName ? t('createProject.goToMyProject') : t('createProject.newProject')}
        </Button>

    );
}
