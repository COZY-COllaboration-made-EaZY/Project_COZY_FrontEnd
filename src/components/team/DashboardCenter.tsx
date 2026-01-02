import TeamDashCard from "@/components/team/TeamDashCard";

export const DashboardCenter = () => {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-bold text-gray-800">
                팀 현황
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <TeamDashCard title="장기 미접속" count={0} color="bg-purple-500" />
                <TeamDashCard title="승급 신청" count={0} color="bg-blue-500" />
                <TeamDashCard title="진행 프로젝트" count={0} color="bg-pink-500" />
                <TeamDashCard title="공지사항" count={0} color="bg-yellow-400" />
                <TeamDashCard title="팀 탈퇴 요청" count={0} color="bg-gray-900" />
                <TeamDashCard title="팀 참가 신청" count={0} color="bg-green-500" />
            </div>
        </section>
    );
};
