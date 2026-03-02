'use client';

import { useTranslation } from "react-i18next";

export default function CommentList({
    i18nPrefix,
    comments,
    onDelete,
}: {
    i18nPrefix?: string;
    comments: { commentId: string; authorName: string; content: string; createdAt: string }[];
    onDelete: (commentId: string) => void;
}) {
    const { t } = useTranslation();
    const prefix = i18nPrefix ?? "board";
    const label = (key: string) => t(`${prefix}.${key}`);
    return (
        <ul className="space-y-3">
            {comments.length === 0 && (
                <li className="rounded border border-white/20 bg-white/10 p-3 text-white/60 text-sm">
                    {label("emptyComments")}
                </li>
            )}
            {comments.map((comment) => (
                <li
                    key={comment.commentId}
                    className="rounded border border-white/20 bg-white/10 p-3 text-white/80"
                >
                    <div className="mb-1 text-xs text-white/60">
                        {comment.authorName} · {comment.createdAt?.slice(0, 16).replace("T", " ")}
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={() => onDelete(comment.commentId)}
                            className="text-xs text-white/70 hover:underline"
                        >
                            {t('common.delete')}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
