export default function Pagination() {
    const handlePageChange = (page: number) => {
        console.log("페이지 이동:", page);
    };

    return (
        <nav className="mt-6 flex items-center justify-center gap-2">
            <button
                onClick={() => handlePageChange(1)}
                className="theme-btn-primary rounded border px-3 py-1 text-sm transition hover:brightness-110"
            >
                1
            </button>
            <button
                onClick={() => handlePageChange(2)}
                className="theme-btn-secondary rounded border px-3 py-1 text-sm transition hover:brightness-110"
            >
                2
            </button>
        </nav>
    );
}
