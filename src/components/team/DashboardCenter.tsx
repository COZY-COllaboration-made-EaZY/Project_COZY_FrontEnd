import TeamDashCard from "@/components/team/TeamDashCard";
import {DashboardLabels} from "@/types/types";

interface Props {
    labels: DashboardLabels;
}

export const DashboardCenter = ({ labels }: Props) => {
    return (
        <section className="rounded-xl border bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-bold">
                {labels.teamStatus}
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <TeamDashCard
                    title={labels.cards.inactive}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-purple-500"
                />

                <TeamDashCard
                    title={labels.cards.promotion}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-blue-500"
                />

                <TeamDashCard
                    title={labels.cards.projects}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-pink-500"
                />

                <TeamDashCard
                    title={labels.cards.notice}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-yellow-400"
                />

                <TeamDashCard
                    title={labels.cards.leave}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-gray-900"
                />

                <TeamDashCard
                    title={labels.cards.join}
                    count={0}
                    unit={labels.unit.count}
                    color="bg-green-500"
                />

            </div>
        </section>
    );
};
