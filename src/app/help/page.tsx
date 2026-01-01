"use client";

import { useEffect, useState } from "react";
import {
    createHelpRequest,
    deleteHelpRequest,
    getHelpRequest,
    updateHelpRequest,
} from "@/api/requests/help";
import { useUserStore } from "@/store/userStore";

import HelpTabs from "@/components/help/HelpTabs";
import HelpCreateButtons from "@/components/help/HelpCreateButtons";
import HelpTable from "@/components/help/HelpTable";
import HelpCreateDialog from "@/components/help/HelpCreateDialog";
import HelpDetailDialog from "@/components/help/HelpDetailDialog";

type Help = {
    id: number;
    type: "usage" | "personal" | string;
    status: string;
    title: string;
    content: string;
    createdAt: string;
};

export default function HelpPage() {

    const user = useUserStore((s) => s.user);
    const username = user?.nickname || "";
    const isLoggedIn = !!user;
    const [data, setData] = useState<Help[]>([]);
    const [loading, setLoading] = useState(true);

    const [viewType, setViewType] = useState<"all" | "usage" | "personal">("all");
    const [openType, setOpenType] = useState<"usage" | "personal" | null>(null);

    const [selectedHelp, setSelectedHelp] = useState<Help | null>(null);

    const helpListRequest = async () => {
        try {
            const res = await getHelpRequest();
            setData(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        helpListRequest();
    }, []);

    const handleCreate = async (title: string, content: string) => {
        if (!openType) return;
        await createHelpRequest(openType, title, content);
        await helpListRequest();
        setOpenType(null);
    };

    const handleSave = async (id: number, title: string, content: string) => {
        await updateHelpRequest(id, { title, content });
        setData((prev) =>
            prev.map((h) => (h.id === id ? { ...h, title, content } : h))
        );
        setSelectedHelp((prev) =>
            prev ? { ...prev, title, content } : prev
        );
    };

    const handleDelete = async (id: number) => {
        await deleteHelpRequest(id);
        setData((prev) => prev.filter((h) => h.id !== id));
        setSelectedHelp(null);
    };

    const filteredData =
        viewType === "all"
            ? data
            : data.filter((h) => h.type === viewType);

    return (
        <div className="p-8 space-y-8">
            <HelpTabs value={viewType} onChange={setViewType} />

            <HelpCreateButtons
                onOpen={(type) => {
                    if (!isLoggedIn) {
                        alert("로그인이 필요합니다.");
                        return;
                    }
                    setOpenType(type);
                }}
            />

            <HelpTable
                data={filteredData}
                loading={loading}
                username={username}
                onSelect={setSelectedHelp}
            />

            <HelpCreateDialog
                openType={openType}
                username={username}
                onSubmit={handleCreate}
                onClose={() => setOpenType(null)}
            />

            <HelpDetailDialog
                help={selectedHelp}
                username={username}
                onClose={() => setSelectedHelp(null)}
                onSave={handleSave}
                onDelete={handleDelete}
            />

        </div>
    );
}
