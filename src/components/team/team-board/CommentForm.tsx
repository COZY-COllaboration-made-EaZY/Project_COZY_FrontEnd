export default function CommentForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("댓글 등록");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
          placeholder="댓글을 입력하세요"
          className="h-24 w-full resize-y rounded border p-2 text-sm"
      ></textarea>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="rounded bg-gray-900 px-3 py-2 text-sm text-white"
                >
                    댓글 달기
                </button>
            </div>
        </form>
    );
}
