export interface DashboardLabels {
    teamStatus: string;
    cards: {
        inactive: string;
        promotion: string;
        projects: string;
        notice: string;
        leave: string;
        join: string;
    };
    recentNotice: string;
    recentPost: string;
    empty: string;
    weekdays: string[];
    am: string;
    pm: string;
    locale: string;

    unit: {
        count: string;
    };
}
