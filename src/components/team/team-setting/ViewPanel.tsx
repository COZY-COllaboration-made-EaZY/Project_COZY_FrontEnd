import React from "react";
import SectionCard from "./ui/SectionCard";
import {TeamForm} from "@/app/team/[teamName]/team-setting/page";

function Row({ label, value }: { label: string; value?: string }) {
    return (
        <div className="mb-3 flex items-center justify-between gap-4">
            <span className="min-w-28 select-none text-lg font-semibold">{label}</span>
            <span className="text-lg">{value || "-"}</span>
        </div>
    );
}

export default function ViewPanel({
                                      data,
                                      onEdit,
                                      onDelete,
                                  }: {
    data: TeamForm;
    onEdit?: () => void;
    onDelete?: () => void;
}) {
    return (
        <section className="space-y-6">
            {/* Top meta */}
            <div className="grid gap-4 md:grid-cols-2">
                <SectionCard>
                    <div className="text-sm text-gray-500">Team Name :</div>
                    <div className="mt-1 text-xl font-semibold">{data.teamName}</div>
                </SectionCard>
                <SectionCard>
                    <div className="text-sm text-gray-500">CreateDay :</div>
                    <div className="mt-1 text-xl font-semibold">{data.createDay}</div>
                </SectionCard>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <SectionCard title="Overview">
                    <Row label="Owner" value={data.owner} />

                    <div className="mb-3 flex items-start justify-between gap-4">
            <span className="min-w-28 select-none text-lg font-semibold">
              DevInterest
            </span>
                        <div className="flex flex-wrap gap-2">
                            {data.devInterests.length === 0 ? (
                                <span className="text-gray-500">없음</span>
                            ) : (
                                data.devInterests.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-xl border border-black/10 bg-gray-100 px-3 py-1 text-sm"
                                    >
                    {t}
                  </span>
                                ))
                            )}
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="Description">
                    <p className="min-h-24 whitespace-pre-wrap text-gray-700">
                        {data.description || "설명이 없습니다."}
                    </p>
                </SectionCard>
            </div>

            {/* actions (optional in view) */}
            <div className="mt-4 flex items-center justify-end gap-3">
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="rounded-xl border border-black/10 bg-gray-100 px-4 py-2 hover:bg-gray-200"
                    >
                        Edit
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white hover:brightness-110"
                    >
                        Delete Team
                    </button>
                )}
            </div>
        </section>
    );
}
