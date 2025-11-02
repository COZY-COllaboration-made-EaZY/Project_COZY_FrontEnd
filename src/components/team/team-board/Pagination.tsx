export default function Pagination() {
    const handlePageChange = (page: number) => {
        console.log("페이지 이동:", page);
    };

    return (
        <nav className="mt-6 flex items-center justify-center gap-2">
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
        </nav>
    );
}
