import { ClockOnly } from "@/components/team/ClockOnly";
import { DateTimeCard } from "@/components/team/DateTimeCard";
import { CalendarCard } from "@/components/team/CalendarCard";
import {DashboardLabels} from "@/types/types";

interface Props {
    labels: DashboardLabels;
}

export const DashboardLeft = ({ labels }: Props) => {
    return (
        <aside className="flex flex-col gap-8">
            <ClockOnly />

            <DateTimeCard
                locale={labels.locale}
                am={labels.am}
                pm={labels.pm}
            />

            <CalendarCard
                weekdays={labels.weekdays}
                locale={labels.locale}
            />
        </aside>
    );
};
