import { EmptyState } from "@/components/team/EmptyState";
import { DashboardPanel } from "./DashboardPanel";
import {DashboardLabels} from "@/app/team/[teamName]/dashboard/page";

interface Props {
    labels: DashboardLabels;
}

export const DashboardRight = ({ labels }: Props) => {
    return (
        <aside className="flex flex-col gap-8">
            <DashboardPanel title={labels.recentNotice}>
                <EmptyState text={labels.empty} />
            </DashboardPanel>

            <DashboardPanel title={labels.recentPost}>
                <EmptyState text={labels.empty} />
            </DashboardPanel>
        </aside>
    );
};
