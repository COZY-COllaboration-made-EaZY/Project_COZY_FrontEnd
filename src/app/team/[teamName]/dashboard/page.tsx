import { DashboardLeft } from "@/components/team/DashBoardLeft";
import { DashboardCenter } from "@/components/team/DashboardCenter";
import { DashboardRight } from "@/components/team/DashBoardRight";

export default function TeamDashboardPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] w-full bg-gray-50 py-10">
            <div
                className="
                    mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4
                    lg:grid-cols-[240px_1fr_360px]
                "
            >
                {/* 왼쪽 */}
                <DashboardLeft />

                {/* 가운데 */}
                <DashboardCenter />

                {/* 오른쪽 */}
                <DashboardRight />
            </div>
        </main>
    );
}
