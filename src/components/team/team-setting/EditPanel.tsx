import { useEffect, useState } from "react";
import SectionCard from "./ui/SectionCard";
import Field from "./ui/Field";
import {TeamForm} from "@/components/team/team-setting/TeamSettingClient";

export default function EditPanel({
                                      initial,
                                      onCancel,
                                      onSubmit,
                                      onDelete,
                                  }: {
    initial: TeamForm;
    onCancel: () => void;
    onSubmit: (next: TeamForm) => void;
    onDelete: () => void;
}) {
    const [form, setForm] = useState<TeamForm>(initial);

    useEffect(() => {
        setForm(initial);
    }, [initial]);

    return (
        <section className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    label="Team Name:"
                    value={form.teamName}
                    onChange={(v) =>
                        setForm((s) => ({ ...s, teamName: v }))
                    }
                />
                <Field label="Owner:" value={form.owner} disabled />
            </div>

            {/* 설명 */}
            <SectionCard>
                <label className="mb-2 block text-lg font-bold">
                    Description
                </label>
                <textarea
                    className="w-full rounded-xl border border-black/10 bg-white p-3 outline-none focus:border-black/30"
                    rows={6}
                    value={form.description}
                    onChange={(e) =>
                        setForm((s) => ({
                            ...s,
                            description: e.target.value,
                        }))
                    }
                />
            </SectionCard>

            {/* 액션 */}
            <div className="mt-6 flex items-center justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="rounded-xl border border-black/10 bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSubmit(form)}
                    className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:brightness-110"
                >
                    Update Team
                </button>
                <button
                    onClick={() => {
                        if (confirm("정말 이 팀을 삭제하시겠습니까?")) {
                            onDelete();
                        }
                    }}
                    className="rounded-xl bg-red-600 px-5 py-2 text-white hover:brightness-110"
                >
                    Delete Team
                </button>
            </div>
        </section>
    );
}
