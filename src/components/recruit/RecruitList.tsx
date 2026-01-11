'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecruitCreateDialog from '@/components/recruit/RecruitCreateDialog';
import RecruitDetailDialog, { RecruitDetailItem } from '@/components/recruit/RecruitDetailDialog';
import { getRecruitListRequest, getRecruitDetailRequest } from '@/api/requests/recruit';
import { useUserStore } from '@/store/userStore';

type RecruitListItem = {
    id: number;
    title: string;
    nickName: string;
    createdAt: string;
};

export default function RecruitList() {
    const [recruits, setRecruits] = useState<RecruitListItem[]>([]);
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [selected, setSelected] = useState<RecruitDetailItem | null>(null);
    const { isLoggedIn } = useUserStore();

    const load = async () => {
        const data = await getRecruitListRequest();
        setRecruits(
            (data ?? []).map((d: any) => ({
                id: d.id,
                title: d.title,
                nickName: d.nickName,
                createdAt: d.createdAt,
            }))
        );
    };

    useEffect(() => {
        load();
    }, []);

    const openDetail = async (id: number) => {
        const detail = await getRecruitDetailRequest(id);
        setSelected(detail);
    };

    const formatDate = (s: string) => s?.split('T')[0] ?? '';

    const filtered = recruits.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.nickName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="font-semibold">
                    계획&nbsp;&nbsp;{recruits.length}
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-60 h-10"
                    />

                    {/* Search – 파스텔 그레이 */}
                    <Button
                        variant="default"
                        className="
                            h-10 w-20
                            !bg-slate-200 !text-slate-700
                            hover:!bg-slate-300
                        "
                    >
                        Search
                    </Button>

                    {/* Create Recruit – 파스텔 블루 */}
                    <Button
                        variant="default"
                        className="
                            h-10 w-24
                            !bg-blue-200 !text-blue-900
                            hover:!bg-blue-300
                            disabled:opacity-50
                        "
                        onClick={() => setShowCreate(true)}
                        disabled={!isLoggedIn}
                    >
                        Create Recruit
                    </Button>
                </div>
            </div>

            {/* 테이블 – 기존 CSS 그대로 */}
            <table className="w-full border-t border-b text-center text-sm">
                <thead className="bg-white border-b">
                <tr className="text-gray-600">
                    <th className="py-2">No</th>
                    <th className="py-2 text-left pl-6">Title</th>
                    <th className="py-2">UserName</th>
                    <th className="py-2">CreateDay</th>
                </tr>
                </thead>
                <tbody>
                {filtered.length === 0 ? (
                    <tr>
                        <td
                            colSpan={4}
                            className="py-20 text-center text-gray-500"
                        >
                            현재 모집내용이 없습니다.
                        </td>
                    </tr>
                ) : (
                    filtered.map((row, index) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 border-b cursor-pointer"
                            onClick={() => openDetail(row.id)}
                        >
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2 text-left pl-6">
                                <div className="text-black">
                                    {row.title}
                                </div>
                            </td>
                            <td className="py-2">{row.nickName}</td>
                            <td className="py-2">
                                {formatDate(row.createdAt)}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            {showCreate && (
                <RecruitCreateDialog
                    onClose={() => setShowCreate(false)}
                    onSuccess={() => {
                        setShowCreate(false);
                        load();
                    }}
                />
            )}

            <RecruitDetailDialog
                recruit={selected}
                onClose={() => setSelected(null)}
                onDeleted={(id) => {
                    setSelected(null);
                    setRecruits(prev => prev.filter(x => x.id !== id));
                }}
                onUpdated={(updated) => {
                    setRecruits(prev =>
                        prev.map(x =>
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
