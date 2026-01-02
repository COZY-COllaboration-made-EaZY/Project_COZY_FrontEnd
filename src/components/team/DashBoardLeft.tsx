import { ClockOnly } from "@/components/team/ClockOnly";
import { DateTimeCard } from "@/components/team/DateTimeCard";

export const DashboardLeft = () => {
    return (
        <aside className="flex flex-col gap-8">
            {/* 시계 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex justify-center">
                <ClockOnly />
            </div>

            {/* 날짜 + 시간 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <DateTimeCard />
            </div>
        </aside>
    );
};
