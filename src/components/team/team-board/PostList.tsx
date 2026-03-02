'use client';

import { useTranslation } from "react-i18next";

type Props = {
    onCreate: () => void;
    onOpenDetail: (postId: string) => void;
    i18nPrefix?: string;
    posts: {
        postId: string;
        title: string;
        authorName: string;
        likeCount: number;
        createdAt: string;
    }[];
    loading?: boolean;
};

export default function PostList({ onCreate, onOpenDetail, i18nPrefix, posts, loading }: Props) {
    const { t } = useTranslation();
    const prefix = i18nPrefix ?? "board";
    const label = (key: string) => t(`${prefix}.${key}`);
    const handlePageChange = (page: number) => {
        console.log("페이지 이동:", page);
    };

    return (
        <section className="mx-auto w-full max-w-4xl px-4 py-8">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-white">{label("listTitle")}</h2>
                <button
                    onClick={onCreate}
                    className="theme-btn-primary rounded px-3 py-2 text-sm transition hover:brightness-110 w-full sm:w-auto"
                >
                    {label("newPost")}
                </button>
            </div>

            <div className="theme-card overflow-hidden rounded">
                <div className="overflow-x-auto">
                    <table className="min-w-[640px] w-full text-left text-sm">
                    <thead className="bg-white/10 text-white/70">
                    <tr>
                        <th className="px-4 py-2">{label("tableTitle")}</th>
                        <th className="px-4 py-2">{label("tableAuthor")}</th>
                        <th className="px-4 py-2">{label("tableLikes")}</th>
                        <th className="px-4 py-2">{label("tableDate")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading && (
                        <tr>
                            <td className="px-4 py-6 text-white/60" colSpan={4}>
                                {t("common.loading")}
                            </td>
                        </tr>
                    )}
                    {!loading && posts.length === 0 && (
                        <tr>
                            <td className="px-4 py-6 text-white/60" colSpan={4}>
                                {label("empty")}
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        posts.map((post) => (
                            <tr
                                key={post.postId}
                                onClick={() => onOpenDetail(post.postId)}
                                className="cursor-pointer border-t border-white/10 hover:bg-white/10"
                            >
                                <td className="px-4 py-2 font-medium text-white">{post.title}</td>
                                <td className="px-4 py-2 text-white/70">{post.authorName}</td>
                                <td className="px-4 py-2">{post.likeCount}</td>
                                <td className="px-4 py-2">{post.createdAt?.slice(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-center gap-2">
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
            </div>
        </section>
    );
}
