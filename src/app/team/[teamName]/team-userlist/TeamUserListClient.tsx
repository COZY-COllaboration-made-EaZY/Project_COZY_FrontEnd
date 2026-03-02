'use client';

import { useEffect, useState } from "react";
import { useTeamStore } from "@/store/teamStore";
import { getMemberListRequest, getTeamDetailInfoRequest } from "@/api/requests/team";
import { useTranslation } from "react-i18next";

interface TeamMember {
    userId: string;
    memberName: string;
}

type TeamDetailResponse = {
    teamId: string;
    teamName: string;
    description: string;
    leaderName: string;
    leaderId?: string;
    subLeaderId?: string | null;
    subLeaderIds?: string[] | null;
};

export default function TeamUserListClient() {
    const { t } = useTranslation();
    const { currentTeamId } = useTeamStore();

    const [members, setMembers] = useState<TeamMember[]>([]);
    const [teamInfo, setTeamInfo] = useState<TeamDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!currentTeamId) return;

        const fetchMembers = async () => {
            try {
                setLoading(true);

                const [detail, data] = await Promise.all([
                    getTeamDetailInfoRequest(currentTeamId),
                    getMemberListRequest(currentTeamId),
                ]);

                const list = Array.isArray((data as { memberList?: TeamMember[] } | null)?.memberList)
                    ? (data as { memberList?: TeamMember[] }).memberList ?? []
                    : [];

                setMembers(list);
                setTeamInfo(detail as TeamDetailResponse);

            } catch (e) {
                console.error("팀 멤버 조회 실패:", e);
                alert(t('team.memberListLoadFailed'));
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [currentTeamId, t]);

    if (!mounted) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-white/70">
                <span suppressHydrationWarning />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-white/70">
                <span suppressHydrationWarning>{t('team.memberListLoading')}</span>
            </div>
        );
    }

    const leaderId = teamInfo?.leaderId;
    const rawSubLeaders = teamInfo?.subLeaderIds?.filter(Boolean) ?? [];
    const subLeaderIds = rawSubLeaders.length > 0
        ? rawSubLeaders
        : teamInfo?.subLeaderId
            ? [teamInfo.subLeaderId]
            : [];
    const leader = leaderId ? members.find((m) => m.userId === leaderId) : undefined;
    const subLeaders = members.filter((m) => subLeaderIds.includes(m.userId));
    const rest = members.filter((m) => m.userId !== leaderId && !subLeaderIds.includes(m.userId));

    const renderMemberCard = (member: TeamMember) => (
        <div
            key={member.userId}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 shadow-[0_8px_18px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:bg-white/15"
        >
            {member.memberName}
        </div>
    );

    return (
        <main className="relative w-full py-8">
            <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-2">

                {/* Title */}
                <header className="theme-card rounded-2xl px-4 py-4 sm:px-6">
                    <h1 className="text-2xl font-bold text-white">
                        {t('team.memberListTitle')}
                    </h1>
                    <p className="mt-1 text-sm text-white/70">
                        {t('team.memberListSubtitle')}
                    </p>
                </header>

                {/* Team User */}
                <section className="theme-card rounded-3xl">
                    <div className="flex flex-col gap-2 border-b border-white/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <h2 className="font-semibold text-white">
                            {t('team.memberListSectionTitle')}
                        </h2>
                        <span className="text-sm text-white/70">
                            {t('team.memberCount', { count: members.length })}
                        </span>
                    </div>

                    <div className="max-h-96 space-y-6 overflow-auto px-4 py-5 sm:px-6">
                        <div>
                            <h3 className="text-sm font-semibold text-white/80">
                                {t('team.memberListLeaderTitle')}
                            </h3>
                            <div className="mt-3 space-y-3">
                                {leader ? renderMemberCard(leader) : (
                                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50">
                                        {t('team.memberListEmptyLeader')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white/80">
                                {t('team.memberListSubLeaderTitle')}
                            </h3>
                            <div className="mt-3 space-y-3">
                                {subLeaders.length > 0
                                    ? subLeaders.map(renderMemberCard)
                                    : (
                                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50">
                                            {t('team.memberListEmptySubLeader')}
                                        </div>
                                    )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-white/80">
                                    {t('team.memberListMemberTitle')}
                                </h3>
                                <span className="text-xs text-white/60">
                                    {t('team.memberCount', { count: rest.length })}
                                </span>
                            </div>
                            <div className="mt-3 space-y-3">
                                {rest.map(renderMemberCard)}
                                {rest.length === 0 && (
                                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/50">
                                        {t('team.memberListEmpty')}
                                    </div>
                                )}
                            </div>
                        </div>

                        {members.length === 0 && (
                            <div className="py-16 text-center text-sm text-white/60">
                                {t('team.memberListEmpty')}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
