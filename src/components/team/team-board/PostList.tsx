type Props = {
    onCreate: () => void;
    onOpenDetail: () => void;
};

export default function PostList({ onCreate, onOpenDetail }: Props) {
    const handlePageChange = (page: number) => {
        console.log("페이지 이동:", page);
    };

    return (
        <section className="mx-auto w-full max-w-4xl px-4 py-8">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team Board</h2>
                <button
                    onClick={onCreate}
                    className="rounded bg-gray-900 px-3 py-2 text-sm text-white"
                >
                    새 글 쓰기
                </button>
            </div>

            <div className="overflow-hidden rounded border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2">제목</th>
                        <th className="px-4 py-2">작성자</th>
                        <th className="px-4 py-2">좋아요</th>
                        <th className="px-4 py-2">작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        onClick={onOpenDetail}
                        className="cursor-pointer border-t hover:bg-gray-50"
                    >
                        <td className="px-4 py-2 font-medium">프로젝트 킥오프 회의록</td>
                        <td className="px-4 py-2">오도경</td>
                        <td className="px-4 py-2">5</td>
                        <td className="px-4 py-2">2025-10-26</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-center gap-2">
                <button
                    onClick={() => handlePageChange(1)}
                    className="rounded border px-3 py-1 text-sm bg-gray-900 text-white"
                >
                    1
                </button>
                <button
                    onClick={() => handlePageChange(2)}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
                >
                    2
                </button>
            </div>
        </section>
    );
}
