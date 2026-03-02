import TeamDashCard from "@/components/team/TeamDashCard";
import {DashboardLabels} from "@/types/types";

interface Props {
    labels: DashboardLabels;
    counts: {
        inactive: number;
        promotion: number;
        projects: number;
        notice: number;
        leave: number;
        join: number;
    };
}

export const DashboardCenter = ({ labels, counts }: Props) => {
    return (
        <section className="theme-card rounded-3xl p-10">
            <h2 className="mb-8 text-xl font-bold text-white/90">
                {labels.teamStatus}
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <TeamDashCard
                    title={labels.cards.inactive}
                    count={counts.inactive}
                    unit={labels.unit.count}
                    color="bg-purple-500"
                />

                <TeamDashCard
                    title={labels.cards.promotion}
                    count={counts.promotion}
                    unit={labels.unit.count}
                    color="bg-blue-500"
                />

                <TeamDashCard
                    title={labels.cards.projects}
                    count={counts.projects}
                    unit={labels.unit.count}
                    color="bg-pink-500"
                />

                <TeamDashCard
                    title={labels.cards.notice}
                    count={counts.notice}
                    unit={labels.unit.count}
                    color="bg-yellow-400"
                />

                <TeamDashCard
                    title={labels.cards.leave}
                    count={counts.leave}
                    unit={labels.unit.count}
                    color="bg-white/40"
                />

                <TeamDashCard
                    title={labels.cards.join}
                    count={counts.join}
                    unit={labels.unit.count}
                    color="bg-green-500"
                />

            </div>
        </section>
    );
};
