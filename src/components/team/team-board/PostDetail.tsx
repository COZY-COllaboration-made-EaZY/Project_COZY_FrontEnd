import CommentList from "@/components/team/team-board/CommentList";
import CommentForm from "@/components/team/team-board/CommentForm";

type Props = {
    onBack: () => void;
};

export default function PostDetail({ onBack }: Props) {
    const handleLike = () => {
        console.log("좋아요 클릭됨");
    };

    const handleEdit = () => {
        console.log("수정 클릭됨");
    };

    const handleDelete = () => {
        if (confirm("정말 삭제하시겠습니까?")) {
            console.log("게시글 삭제됨");
            onBack();
        }
    };

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8">
            <button
                onClick={onBack}
                className="mb-4 inline-block text-sm text-gray-600 hover:underline"
            >
                ← 목록으로
            </button>

            <h1 className="mb-2 text-xl font-semibold">프로젝트 킥오프 회의록</h1>
            <div className="mb-4 text-xs text-gray-500">오도경 · 2025-10-26 19:10</div>

            <article className="whitespace-pre-wrap rounded border p-4 text-sm">
                회의 내용 요약...
            </article>

            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={handleLike}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                >
                    👍 좋아요 5
                </button>
                <button
                    onClick={handleEdit}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                >
                    수정
                </button>
                <button
                    onClick={handleDelete}
                    className="rounded border px-3 py-1 text-sm text-red-600"
                >
                    삭제
                </button>
            </div>

            <div className="mt-8">
                <h3 className="mb-2 text-sm font-semibold">댓글</h3>
                <CommentList />
                <div className="mt-4">
                    <CommentForm />
                </div>
            </div>
        </section>
    );
}
