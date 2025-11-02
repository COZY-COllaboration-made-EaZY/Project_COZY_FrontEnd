import React, { useState } from "react";
import SectionCard from "./ui/SectionCard";
import Field from "./ui/Field";
import TagInput from "./ui/TagInput";
import {TeamForm} from "@/app/team/[teamName]/team-setting/page";

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

    return (
        <section className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    label="Team Name:"
                    value={form.teamName}
                    onChange={(v) => setForm((s) => ({ ...s, teamName: v }))}
                    placeholder="팀 이름을 입력"
                />
                <Field
                    label="CreateDay:"
                    type="date"
                    value={form.createDay}
                    onChange={(v) => setForm((s) => ({ ...s, createDay: v }))}
                />
            </div>

            <SectionCard>
                <label className="mb-2 block text-lg font-bold">Description:</label>
                <textarea
                    className="w-full rounded-xl border border-black/10 bg-white p-3 outline-none ring-0 focus:border-black/30"
                    rows={6}
                    value={form.description}
                    onChange={(e) =>
                        setForm((s) => ({ ...s, description: e.target.value }))
                    }
                    placeholder="팀 설명을 입력하세요"
                />
            </SectionCard>

            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    label="Owner :"
                    value={form.owner}
                    onChange={(v) => setForm((s) => ({ ...s, owner: v }))}
                    placeholder="소유자"
                />
                <TagInput
                    label="DevInterest :"
                    values={form.devInterests}
                    onChange={(next) => setForm((s) => ({ ...s, devInterests: next }))}
                />
            </div>

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
                    onClick={onDelete}
                    className="rounded-xl bg-red-600 px-5 py-2 text-white hover:brightness-110"
                >
                    Delete Team
                </button>
            </div>
        </section>
    );
}
