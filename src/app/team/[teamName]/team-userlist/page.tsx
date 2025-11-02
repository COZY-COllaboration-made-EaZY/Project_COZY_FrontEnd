export default function TeamUserListPage() {
    // 예시 데이터
    const teamMasterName = "없음";
    const teamSubMasterName = "없음";
    const teamUserNameList = [
        "없음",
    ];

    return (
        <main className="min-h-screen py-10">

            <div className="mx-auto w-full max-w-4xl border-2 border-gray-700 bg-white shadow-sm">
                {/* 상단 여백 바(회색) */}
                <div className="h-10 bg-gray-300 border-b-2 border-gray-700" />

                {/* Team Master */}
                <section className="border-b-2 border-gray-700">
                    <div className="bg-gray-200 px-5 py-3 font-semibold border-b-2 border-gray-700">
                        Team Master
                    </div>
                    <div className="px-5 py-3">
                        <div className="border-2 border-gray-700 px-4 py-3">
                            {teamMasterName}
                        </div>
                    </div>
                </section>

                {/* Team Sub Master */}
                <section className="border-b-2 border-gray-700">
                    <div className="bg-gray-200 px-5 py-3 font-semibold border-b-2 border-gray-700">
                        Team Sub Master
                    </div>
                    <div className="px-5 py-3">
                        <div className="border-2 border-gray-700 px-4 py-3">
                            {teamSubMasterName}
                        </div>
                    </div>
                </section>

                {/* Team User */}
                <section className="border-b-2 border-gray-700">
                    <div className="bg-gray-200 px-5 py-3 font-semibold border-b-2 border-gray-700">
                        Team User
                    </div>
                    <div className="px-5 py-4">
                        {/* 큰 리스트 박스 */}
                        <div className="h-80 border-2 border-gray-700 overflow-auto p-3 space-y-2">
                            {teamUserNameList.map((name) => (
                                <div
                                    key={name}
                                    className="border border-gray-700 px-3 py-2"
                                >
                                    {name}
                                </div>
                            ))}
                            {/* 비어있을 때 표시 예시 */}
                            {teamUserNameList.length === 0 && (
                                <div className="text-gray-500">No team users.</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 하단 여백 바(회색) */}
                <div className="h-12 bg-gray-300 border-t-2 border-gray-700" />
            </div>
        </main>
    );
}
