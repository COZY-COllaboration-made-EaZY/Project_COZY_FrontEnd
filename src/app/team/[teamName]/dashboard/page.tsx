import { Suspense } from "react";
import TeamDashboardClient from "./TeamDashboardClient";

export const dynamic = "force-dynamic";

export default function TeamDashboardPage() {
    return (
        <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-10" />}>
            <TeamDashboardClient />
        </Suspense>
    );
}
