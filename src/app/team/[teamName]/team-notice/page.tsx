export default function TeamNoticePage(){
    return(
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_2fr]　flex-col items-center justify-center h-full">
            {/* 공지 리스트 */}
            <section className="rounded-xl border-2 border-gray-800 bg-white shadow-sm">
                <div className="border-b-2 border-gray-800 bg-gray-100 px-4 py-3 font-semibold">공지 리스트</div>

                <ul className="divide-y">
                    {/* 최신(예시) - 강조 */}
                    <li
                        className="cursor-pointer rounded-lg border m-3 p-4 bg-yellow-50 ring-2 ring-yellow-300 scale-[1.01]"
                        data-new="true"
                        data-title="서비스 점검 안내 (10/30 01:00~02:00)"
                        data-author="Admin"
                        data-date="2025-10-26 09:00"
                        data-body="안정적인 서비스 제공을 위한 점검이 예정되어 있습니다. 점검 시간 동안 일부 기능이 제한될 수 있습니다."
                        data-likes="12"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                    서비스 점검 안내 (10/30 01:00~02:00)
                                </h3>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                    안정적인 서비스 제공을 위한 점검이 예정되어 있습니다. 점검 시간 동안 일부 기능이 제한될 수 있습니다.
                                </p>
                                <div className="mt-2 text-xs text-gray-400">by Admin • 2025-10-26 09:00</div>
                            </div>
                            <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs">NEW</span>
                        </div>
                    </li>

                    {/* 일반 아이템들 */}
                    <li
                        className="cursor-pointer px-4 py-3 hover:bg-gray-50"
                        data-title="팀 규칙 업데이트"
                        data-author="Leader"
                        data-date="2025-10-20 18:10"
                        data-body="팀 규칙 문서가 업데이트 되었습니다. 대화 채널 분리와 코드 리뷰 주기가 변경되었습니다."
                        data-likes="5"
                    >
                        <h4 className="font-medium text-gray-800">팀 규칙 업데이트</h4>
                        <p className="line-clamp-1 text-sm text-gray-600">팀 규칙 문서가 업데이트 되었습니다...</p>
                        <div className="mt-1 text-xs text-gray-400">by Leader • 2025-10-20 18:10</div>
                    </li>

                    <li
                        className="cursor-pointer px-4 py-3 hover:bg-gray-50"
                        data-title="신규 멤버 온보딩 자료"
                        data-author="PM"
                        data-date="2025-10-15 10:00"
                        data-body="신규 멤버를 위한 온보딩 자료 링크와 체크리스트가 공유되었습니다."
                        data-likes="8"
                    >
                        <h4 className="font-medium text-gray-800">신규 멤버 온보딩 자료</h4>
                        <p className="line-clamp-1 text-sm text-gray-600">온보딩 자료 링크와 체크리스트...</p>
                        <div className="mt-1 text-xs text-gray-400">by PM • 2025-10-15 10:00</div>
                    </li>
                </ul>

                {/* 페이지네이션(시연용) */}
                <div className="flex items-center justify-center gap-2 border-t px-4 py-3">
                    {[1, 2, 3, 4].map((n) => (
                        <button
                            key={n}
                            className="size-8 rounded-md border text-sm font-medium hover:bg-gray-50"
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    )
}