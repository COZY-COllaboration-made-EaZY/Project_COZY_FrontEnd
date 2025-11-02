export default function TeamDashCard({title,count,className=""} : {title:string; count: number; className?: string}) {
    return (
        <div className={[
            "flex h-40 flex-col items-center justify-center rounded-md border-2 border-gray-700 text-white shadow-sm",
            className,
        ].join(" ")}>
            <div className={"text-sm font-semibold tracking-tight"}>{title}</div>
            <div className={"mt-4 text-xs opacity-90"}>{count}건</div>
        </div>
    );
}