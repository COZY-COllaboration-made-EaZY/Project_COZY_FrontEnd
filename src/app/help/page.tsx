"use client";

import { useEffect, useState } from "react";
import {
    createHelpRequest, deleteHelpRequest, getHelpRequest, updateHelpRequest,
} from "@/api/requests/help";
import { useUserStore } from "@/store/userStore";
import HelpDetailDialog from "@/components/help/HelpDetailDialog";
import {useTranslation} from "react-i18next";
import HelpCreateDialog from "@/components/help/HelpCreateDialog";

type Help = {
    id: number;
    type: "사용문의" | "1:1 문의" | string;
    status: string;
    title: string;
    content: string;
    createdAt: string;
};

export default function HelpPage() {
    const { t } = useTranslation();
    const user = useUserStore((s) => s.user);
    const username = user?.nickname || "";

    const [data, setData] = useState<Help[]>([]);
    const [loading, setLoading] = useState(true);

    const [viewType, setViewType] = useState<"all" | "usage" | "personal">("all");
    const [openType, setOpenType] = useState<"usage" | "personal" | null>(null);
    const [selectedHelp, setSelectedHelp] = useState<Help | null>(null);

    const tabs = [
        { key: "all", label: t("help.all") },
        { key: "usage", label: t("help.usage") },
        { key: "personal", label: t("help.personal") },
    ];


    const fetchData = async () => {
        try {
            const res = await getHelpRequest();
            setData(res);
        } catch (e) {
            console.error(e);
            alert("문의 데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (title: string, content: string) => {
        if (!openType) return;
        await createHelpRequest(openType, title, content);
        alert("등록 성공ㅇ");
        await fetchData();
        setOpenType(null);
    };

    const handleSave = async (id: number, title: string, content: string) => {
        await updateHelpRequest(id, { title, content });
        await fetchData();
    };

    const handleDelete = async (id: number) => {
        await deleteHelpRequest(id);
        await fetchData();
        setSelectedHelp(null);
    };

    const filteredData =
        viewType === "all" ? data : data.filter((help) => help.type === viewType);

    return (
        <div className="p-8">
            {/* 탭 */}
            <div className="flex justify-between mb-6">
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`border px-4 py-2 rounded-full text-sm ${
                                viewType === tab.key ? "bg-gray-200" : ""
                            }`}
                            onClick={() => setViewType(tab.key as any)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 작성 버튼 */}
            <div className="flex gap-2 mb-4">
                <button
                    className="border px-4 py-2 rounded"
                    onClick={() => setOpenType("usage")}
                >
                    {t("help.writeUsage")}
                </button>

                <button
                    className="border px-4 py-2 rounded"
                    onClick={() => setOpenType("personal")}
                >
                    {t("help.writePersonal")}
                </button>
            </div>

            {/* 작성 모달 */}
            <HelpCreateDialog
                openType={openType}
                username={username}
                onSubmit={handleCreate}
                onClose={() => setOpenType(null)}
            />

            {/* 상세 모달 */}
            <HelpDetailDialog
                help={selectedHelp}
                username={username}
                onClose={() => setSelectedHelp(null)}
                onSave={handleSave}
                onDelete={handleDelete}
            />

            {/* 목록 */}
            {loading ? (
                <div>로딩 중...</div>
            ) : (
                <table className="w-full text-sm mt-4">
                    <thead>
                    <tr className="border-b">
                        <th className="text-center p-2">{t("help.type")}</th>
                        <th className="text-center p-2">{t("help.status")}</th>
                        <th className="text-center p-2">{t("help.title")}</th>
                        <th className="text-center p-2">{t("help.author")}</th>
                        <th className="text-center p-2">{t("help.createdAt")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((help) => (
                        <tr key={help.id} className="border-b">
                            <td className="text-center p-2">{help.type}</td>
                            <td className="text-center p-2">{help.status}</td>
                            <td
                                className="text-center p-2 text-blue-600 hover:underline cursor-pointer"
                                onClick={() => setSelectedHelp(help)}
                            >
                                {help.title}
                            </td>
                            <td className="text-center p-2">{username}</td>
                            <td className="text-center p-2">
                                {new Date(help.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
