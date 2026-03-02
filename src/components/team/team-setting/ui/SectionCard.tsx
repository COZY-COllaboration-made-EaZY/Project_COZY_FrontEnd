import React from "react";

export default function SectionCard({
                                        title,
                                        children,
                                    }: {
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/10 p-5">
            {title && <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>}
            {children}
        </div>
    );
}
