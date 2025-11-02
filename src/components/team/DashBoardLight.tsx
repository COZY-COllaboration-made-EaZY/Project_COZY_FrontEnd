import TeamDashCard from "@/components/team/TeamDashCard";

export const DashboardLeft = () => {
    return(
        <section className={"rounded-md border-2 border-gray-700 bg-white p-6 shadow-sm"}>
            <div className={"mb-6"}>
                <div className={"rounded-md border-2 border-gray-700 px-4 py-1 inline-block text-sm font-semibold"}>
                    현황
                </div>
            </div>

            <div className={"grid grid-cols-1 gap-6 sm:grid-cols-2"}>
                <TeamDashCard title={"장기 미접속"} count={0} className={"bg-purple-700"} />
                <TeamDashCard title="승급 신청" count={0} className="bg-blue-700" />
                <TeamDashCard title="진행 프로젝트" count={0} className="bg-pink-500" />
                <TeamDashCard title="공지사항" count={0} className="bg-yellow-300 text-gray-900" />
                <TeamDashCard title="팀 탈퇴 요청" count={0} className="bg-black" />
                <TeamDashCard title="팀 참가 신청" count={0} className="bg-green-400 text-gray-900" />
            </div>
        </section>
    )
}