import { cn } from "@/lib/utils";

interface Props {
    title: string;
    count: number;
    color: string; // ex) bg-purple-500
}

export default function TeamDashCard({ title, count, color }: Props) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
                "transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            )}
        >
            {/* 왼쪽 컬러 포인트 */}
            <div className={cn("absolute left-0 top-0 h-full w-1.5", color)} />

            <div className="flex h-full flex-col justify-between">
                <p className="text-sm font-medium text-gray-600">
                    {title}
                </p>

                <div className="mt-4 flex items-end justify-between">
          <span className="text-3xl font-bold text-gray-900">
            {count}
          </span>
                    <span className="text-sm text-gray-400">건</span>
                </div>
            </div>
        </div>
    );
}
