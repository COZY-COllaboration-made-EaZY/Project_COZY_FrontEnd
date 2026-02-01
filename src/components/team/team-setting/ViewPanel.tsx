import SectionCard from "./ui/SectionCard";
import Field from "./ui/Field";
import {TeamForm} from "@/components/team/team-setting/TeamSettingClient";

export default function ViewPanel({
                                      data,
                                      onEdit,
                                      onDelete,
                                  }: {
    data: TeamForm;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <section className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid gap-5 md:grid-cols-2">
                <Field label="Team Name:" value={data.teamName} disabled />
                <Field label="Owner:" value={data.owner} disabled />
            </div>

            {/* 설명 */}
            <SectionCard>
                <label className="mb-2 block text-lg font-bold">
                    Description
                </label>
                <p className="whitespace-pre-line text-gray-800">
                    {data.description || "설명이 없습니다."}
                </p>
            </SectionCard>

            {/* 액션 */}
            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={onEdit}
                    className="rounded-xl bg-black px-5 py-2 text-white hover:opacity-90"
                >
                    Edit
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
