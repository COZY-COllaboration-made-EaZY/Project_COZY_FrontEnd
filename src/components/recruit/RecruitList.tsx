'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecruitCreateDialog from '@/components/recruit/RecruitCreateDialog';
import RecruitDetailDialog, { RecruitDetailItem } from '@/components/recruit/RecruitDetailDialog';
import {
    getRecruitListRequest,
    getRecruitDetailRequest,
} from '@/api/requests/recruit';
import { useUserStore } from '@/store/userStore';
import { useTeamStore } from '@/store/teamStore';
import {getMyTeamInfoRequest} from "@/api/requests/team";
import { useTranslation } from "react-i18next";

type RecruitListItem = {
    id: number;
    title: string;
    nickName: string;
    createdAt: string;
};

export default function RecruitList() {
    const { t } = useTranslation();
    const [recruits, setRecruits] = useState<RecruitListItem[]>([]);
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [selected, setSelected] = useState<RecruitDetailItem | null>(null);

    const { isLoggedIn } = useUserStore();
    const { setTeams } = useTeamStore();

    /** 모집글 목록 로딩 */
    const loadRecruits = useCallback(async () => {
        const data = await getRecruitListRequest();
        setRecruits(
            (data ?? []).map((d: { id: number; title: string; nickName: string; createdAt: string }) => ({
                id: d.id,
                title: d.title,
                nickName: d.nickName,
                createdAt: d.createdAt,
            }))
        );
    }, []);

    const loadTeams = useCallback(async () => {
        try {
            const teams = await getMyTeamInfoRequest();
            setTeams(teams);
        } catch (e) {
            console.error('팀 목록 로딩 실패', e);
            alert(t('team.listLoadFailed'));
            setTeams([]);
        }
    }, [setTeams, t]);

    useEffect(() => {
        loadRecruits();

        if (isLoggedIn) {
            loadTeams();
        }
    }, [isLoggedIn, loadRecruits, loadTeams]);

    const openDetail = async (id: number) => {
        const detail = await getRecruitDetailRequest(id);
        setSelected(detail);
    };

    const formatDate = (s: string) => s?.split('T')[0] ?? '';

    const filtered = recruits.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.nickName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Header */}
            <div className="theme-card mb-6 flex flex-col gap-4 rounded-2xl px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.45)] sm:px-6 md:flex-row md:items-center md:justify-between">
                <div className="text-lg font-semibold text-white">
                    {t('recruit.listTitle')}&nbsp;&nbsp;{recruits.length}
                </div>

                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
                    <Input
                        placeholder={t('recruit.searchPlaceholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 w-full border-white/30 bg-white/90 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/40 sm:w-60"
                    />

                    <Button
                        className="theme-btn-secondary h-10 w-full hover:brightness-110 sm:w-20"
                    >
                        {t('recruit.searchButton')}
                    </Button>

                    <Button
                        className="theme-btn-primary h-10 w-full hover:brightness-110 disabled:opacity-50 sm:w-28"
                        disabled={!isLoggedIn}
                        onClick={() => setShowCreate(true)}
                    >
                        {t('recruit.createTitle')}
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="theme-card overflow-hidden rounded-3xl transition hover:shadow-[0_24px_60px_rgba(15,23,42,0.5)]">
                <div className="overflow-x-auto">
                    <table className="min-w-[640px] w-full text-center text-sm text-white/80">
                    <thead className="border-b border-white/20 bg-white/10 text-white/70">
                    <tr>
                        <th className="py-3">{t('recruit.columns.no')}</th>
                        <th className="py-3 text-left pl-6">{t('recruit.columns.title')}</th>
                        <th className="py-3">{t('recruit.columns.user')}</th>
                        <th className="py-3">{t('recruit.columns.date')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-20 text-white/60">
                                {t('recruit.empty')}
                            </td>
                        </tr>
                    ) : (
                        filtered.map((row, index) => (
                            <tr
                                key={row.id}
                                className="cursor-pointer border-b border-white/10 transition hover:bg-white/10"
                                onClick={() => openDetail(row.id)}
                            >
                                <td className="py-3">{index + 1}</td>
                                <td className="py-3 text-left pl-6 text-white">
                                    {row.title}
                                </td>
                                <td className="py-3">{row.nickName}</td>
                                <td className="py-3">
                                    {formatDate(row.createdAt)}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                    </table>
                </div>
            </div>

            {/* Create Dialog */}
            {showCreate && (
                <RecruitCreateDialog
                    onClose={() => setShowCreate(false)}
                    onSuccess={() => {
                        setShowCreate(false);
                        loadRecruits();
                    }}
                />
            )}

            {/* Detail Dialog */}
            <RecruitDetailDialog
                recruit={selected}
                onClose={() => setSelected(null)}
                onDeleted={(id) => {
                    setSelected(null);
                    setRecruits((prev) =>
                        prev.filter((x) => x.id !== id)
                    );
                }}
                onUpdated={(updated) => {
                    setRecruits((prev) =>
                        prev.map((x) =>
                            x.id === updated.id
                                ? { ...x, title: updated.title }
                                : x
                        )
                    );
                    setSelected(updated);
                }}
            />
        </div>
    );
}
