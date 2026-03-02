import {cn} from "@/lib/utils";

interface Props {
    title: string;
    count: number;
    unit: string;
    color: string;
}


export default function TeamDashCard({ title, count, unit, color }: Props) {
    return (
        <div
            className={cn(
                "theme-card group relative overflow-hidden rounded-2xl p-6",
                "transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(15,23,42,0.45)]"
            )}
        >
            <div className={cn("absolute left-0 top-0 h-full w-1.5 shadow-[0_0_18px_rgba(255,255,255,0.35)]", color)} />
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

            <div className="flex h-full flex-col justify-between">
                <p className="text-sm font-medium text-white/80">
                    {title}
                </p>

                <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-bold text-white">
                        {count}
                    </span>
                    <span className="text-sm text-white/60">
                        {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}
