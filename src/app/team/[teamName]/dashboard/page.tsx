import {DashboardRight} from "@/components/team/DashBoardRight";
import {DashboardLeft} from "@/components/team/DashBoardLight";

export default function TeamDashboardPage() {
    return (
        <main className={"min-h-[calc(100vh-4rem)] w-full"}>
            <div className={"mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_520px]"}>
                {/* Left */}
                <DashboardLeft />

                {/* Right */}
                <DashboardRight />
            </div>
        </main>
    )
}