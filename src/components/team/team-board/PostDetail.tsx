'use client';

import CommentList from "@/components/team/team-board/CommentList";
import CommentForm from "@/components/team/team-board/CommentForm";
import { useTranslation } from "react-i18next";

type Props = {
    onBack: () => void;
    i18nPrefix?: string;
    post: {
        postId: string;
        title: string;
        content: string;
        authorName: string;
        likeCount: number;
        commentCount: number;
        liked: boolean;
        createdAt: string;
    } | null;
    comments: {
        commentId: string;
        authorName: string;
        content: string;
        createdAt: string;
    }[];
    onLike: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onCommentSubmit: (content: string) => void;
    onCommentDelete: (commentId: string) => void;
    hideInteractions?: boolean;
};

export default function PostDetail({
    onBack,
    i18nPrefix,
    post,
    comments,
    onLike,
    onDelete,
    onEdit,
    onCommentSubmit,
    onCommentDelete,
    hideInteractions,
}: Props) {
    const { t } = useTranslation();
    const prefix = i18nPrefix ?? "board";
    const label = (key: string) => t(`${prefix}.${key}`);

    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8">
            <button
                onClick={onBack}
                className="mb-4 inline-block text-sm text-white/70 hover:underline"
            >
                ← {label("backToList")}
            </button>

            {!post && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                    {t("common.loading")}
                </div>
            )}

            {post && (
                <>
                    <h1 className="mb-2 text-xl font-semibold text-white">{post.title}</h1>
                    <div className="mb-4 text-xs text-white/60">
                        {post.authorName} · {post.createdAt?.slice(0, 16).replace("T", " ")}
                    </div>

                    <article className="whitespace-pre-wrap rounded border border-white/20 bg-white/10 p-4 text-sm text-white/80">
                        {post.content}
                    </article>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {!hideInteractions && (
                            <button
                                onClick={onLike}
                                className="theme-btn-secondary rounded border px-3 py-1 text-sm transition hover:brightness-110"
                            >
                                👍 {label("like")} {post.likeCount}
                            </button>
                        )}
                        <button
                            onClick={onEdit}
                            className="theme-btn-secondary rounded border px-3 py-1 text-sm transition hover:brightness-110"
                        >
                            {t('common.edit')}
                        </button>
                        <button
                            onClick={() => {
                                if (confirm(t("common.confirmDelete"))) {
                                    onDelete();
                                }
                            }}
                            className="theme-btn-secondary rounded border px-3 py-1 text-sm text-white transition hover:brightness-110"
                        >
                            {t('common.delete')}
                        </button>
                    </div>

                    {!hideInteractions && (
                        <div className="mt-8">
                            <h3 className="mb-2 text-sm font-semibold text-white">{label("comments")}</h3>
                            <CommentList
                                i18nPrefix={prefix}
                                comments={comments}
                                onDelete={onCommentDelete}
                            />
                            <div className="mt-4">
                                <CommentForm i18nPrefix={prefix} onSubmit={onCommentSubmit} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
