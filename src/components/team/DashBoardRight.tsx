import { EmptyState } from "@/components/team/EmptyState";
import { DashboardPanel } from "./DashboardPanel";
import { DashboardLabels } from "@/types/types";
import Link from "next/link";

interface Props {
    labels: DashboardLabels;
    teamName: string;
    notices: { postId: string; title: string; authorName: string; createdAt: string }[];
    posts: { postId: string; title: string; authorName: string; createdAt: string }[];
}

export const DashboardRight = ({ labels, teamName, notices, posts }: Props) => {
    return (
        <aside className="flex flex-col gap-8">
            <DashboardPanel title={labels.recentNotice}>
                {notices.length === 0 ? (
                    <EmptyState text={labels.empty} />
                ) : (
                    <div className="space-y-3">
                        {notices.map((item) => (
                            <div key={item.postId} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                                <div className="truncate font-semibold text-white">{item.title}</div>
                                <div className="mt-1 text-xs text-white/60">
                                    {item.authorName} · {item.createdAt?.slice(0, 10)}
                                </div>
                            </div>
                        ))}
                        <Link
                            href={`/team/${encodeURIComponent(teamName)}/notice`}
                            className="inline-flex text-xs text-white/60 hover:text-white"
                        >
                            더보기 →
                        </Link>
                    </div>
                )}
            </DashboardPanel>

            <DashboardPanel title={labels.recentPost}>
                {posts.length === 0 ? (
                    <EmptyState text={labels.empty} />
                ) : (
                    <div className="space-y-3">
                        {posts.map((item) => (
                            <div key={item.postId} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                                <div className="truncate font-semibold text-white">{item.title}</div>
                                <div className="mt-1 text-xs text-white/60">
                                    {item.authorName} · {item.createdAt?.slice(0, 10)}
                                </div>
                            </div>
                        ))}
                        <Link
                            href={`/team/${encodeURIComponent(teamName)}/board`}
                            className="inline-flex text-xs text-white/60 hover:text-white"
                        >
                            더보기 →
                        </Link>
                    </div>
                )}
            </DashboardPanel>
        </aside>
    );
};
