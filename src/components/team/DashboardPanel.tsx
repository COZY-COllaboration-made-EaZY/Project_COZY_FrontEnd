import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export const DashboardPanel = ({ title, children }: Props) => {
    return (
        <div className="theme-card rounded-3xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white/90">
                {title}
            </h3>
            <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/30 bg-white/5">
                {children}
            </div>
        </div>
    );
};
