"use client";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import ProfileEdit from "@/components/Myinfo/ProfileEdit";
import ProfileView from "@/components/Myinfo/ProfileView";

export default function MyInfoProfilePage() {
    const { user, setUser } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);

    return isEditing ? (
        <div className="flex min-h-[60vh] w-full items-center justify-center">
            <ProfileEdit
                user={user}
                setUser={setUser}
                onCancel={() => setIsEditing(false)}
                onSave={() => setIsEditing(false)}
            />
        </div>
    ) : (
        <div className="flex min-h-[60vh] w-full items-center justify-center">
            <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        </div>
    );
}
