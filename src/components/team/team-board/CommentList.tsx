export default function CommentList() {
    return (
        <ul className="space-y-3">
            <li className="rounded border p-3">
                <div className="mb-1 text-xs text-gray-500">오도경 · 2025-10-26 19:40</div>
                <p className="whitespace-pre-wrap text-sm">좋아요!</p>
                <div className="mt-2 flex justify-end">
                    <button className="text-xs text-red-600 hover:underline">삭제</button>
                </div>
            </li>
        </ul>
    );
}
