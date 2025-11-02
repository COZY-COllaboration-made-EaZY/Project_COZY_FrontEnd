import { redirect } from 'next/navigation';

export default function ProjectPageRedirect({ params }: { params: { projectName: string } }) {
    redirect(`/project/${params.projectName}/dashboard`);
}
