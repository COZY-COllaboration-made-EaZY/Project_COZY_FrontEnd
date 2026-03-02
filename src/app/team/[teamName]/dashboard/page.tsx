import { Suspense } from "react";
import TeamDashboardClient from "./TeamDashboardClient";

export const dynamic = "force-dynamic";
1
export default function TeamDashboardPage() {
    return (
        <Suspense fallback={<div className="theme-page min-h-[calc(100vh-4rem)] w-full py-10" />}>
            <TeamDashboardClient />
        </Suspense>
    );
}
