type Props = {
    onBack: () => void;
};

export default function PostForm({ onBack }: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("게시글 등록");
        onBack();
    };

    const handleCancel = () => {
        console.log("작성 취소");
        onBack();
    };

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8">
            <button
                onClick={onBack}
                className="mb-4 inline-block text-sm text-gray-600 hover:underline"
            >
                ← 목록으로
            </button>
            <h2 className="mb-4 text-lg font-semibold">새 글 쓰기</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="제목"
                    className="w-full rounded border p-2 text-sm"
                />
                <textarea
                    placeholder="내용"
                    className="h-60 w-full resize-y rounded border p-2 text-sm"
                ></textarea>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded bg-gray-900 px-3 py-2 text-sm text-white"
                    >
                        등록
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded border px-3 py-2 text-sm"
                    >
                        취소
                    </button>
                </div>
            </form>
        </section>
    );
}
