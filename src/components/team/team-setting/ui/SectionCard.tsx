import React from "react";

export default function SectionCard({
                                        title,
                                        children,
                                    }: {
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-black/10 p-5">
            {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
            {children}
        </div>
    );
}
