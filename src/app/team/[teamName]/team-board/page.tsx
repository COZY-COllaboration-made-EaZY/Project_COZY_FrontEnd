"use client";

import { useState } from "react";
import PostList from "@/components/team/team-board/PostList";
import PostDetail from "@/components/team/team-board/PostDetail";
import PostForm from "@/components/team/team-board/PostForm";

export default function TeamBoardPage() {
    const [mode, setMode] = useState<"list" | "detail" | "form">("list");

    // --- UI 전환용 핸들러 ---
    const handleShowList = () => setMode("list");
    const handleShowDetail = () => setMode("detail");
    const handleShowForm = () => setMode("form");

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            {mode === "list" && <PostList onCreate={handleShowForm} onOpenDetail={handleShowDetail} />}
            {mode === "detail" && <PostDetail onBack={handleShowList} />}
            {mode === "form" && <PostForm onBack={handleShowList} />}
        </main>
    );
}
