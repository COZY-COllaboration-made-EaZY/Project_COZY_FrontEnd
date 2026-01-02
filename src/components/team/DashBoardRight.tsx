import { EmptyState } from "@/components/team/EmptyState";
import { DashboardPanel } from "./DashboardPanel";

export const DashboardRight = () => {
    return (
        <aside className="flex flex-col gap-8">
            <DashboardPanel title="최근 공지사항">
                <EmptyState />
            </DashboardPanel>

            <DashboardPanel title="최근 게시물">
                <EmptyState />
            </DashboardPanel>
        </aside>
    );
};
