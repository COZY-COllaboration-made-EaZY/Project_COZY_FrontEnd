import {EmptyState} from "@/components/team/EmptyState";

export const DashboardRight = () => {
    return(
        <aside className={"flex flex-col gap-8"}>
            <div className="rounded-md border-2 border-gray-700 bg-white p-6 shadow-sm">
                <div className={"mb-4"}>
                    <div className={"inline-block rounded-sm border-2 border-gray-700 px-4 py-1 text-sm font-semibold"}>
                        최근 공지사항
                    </div>
                </div>
                <div className={"h-72 rounded-md border-2 border-gray-700"}>
                    <EmptyState/>
                </div>
            </div>
            <div className="rounded-md border-2 border-gray-700 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <div className="inline-block rounded-sm border-2 border-gray-700 px-4 py-1 text-sm font-semibold">
                        최근 게시물
                    </div>
                </div>
                <div className="h-72 rounded-md border-2 border-gray-700">
                    <EmptyState />
                </div>
            </div>
        </aside>
    )
}