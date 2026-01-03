import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
}

export const DashboardPanel = ({ title, children }: Props) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
                {title}
            </h3>
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                {children}
            </div>
        </div>
    );
};
