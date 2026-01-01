import { CreateTeamForm } from "@/components/team/CreateTeamForm";

export default function CreateTeamPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100 px-4">
            <div className="w-full max-w-xl">
                    <CreateTeamForm />
            </div>
        </div>
    );
}
