import React, { useState } from "react";

export default function TagInput({
                                     label,
                                     values,
                                     onChange,
                                 }: {
    label: string;
    values: string[];
    onChange: (next: string[]) => void;
}) {
    const [temp, setTemp] = useState("");

    const add = (t: string) => {
        const v = t.trim();
        if (!v) return;
        if (values.includes(v)) return;
        onChange([...values, v]);
    };

    const remove = (t: string) => onChange(values.filter((x) => x !== t));

    return (
        <div>
            <label className="mb-2 block text-lg font-bold">{label}</label>
            <div className="mb-2 flex gap-2">
                <input
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            add(temp);
                            setTemp("");
                        }
                    }}
                    placeholder="Enter로 태그 추가"
                    className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-3 outline-none focus:border-black/30"
                />
                <button
                    type="button"
                    onClick={() => {
                        add(temp);
                        setTemp("");
                    }}
                    className="rounded-xl border border-black/10 bg-gray-100 px-4 text-sm hover:bg-gray-200"
                >
                    Add
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {values.length === 0 && (
                    <span className="text-gray-500">등록된 관심사가 없습니다.</span>
                )}
                {values.map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => remove(t)}
                        className="rounded-xl border border-black/10 bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                        title="클릭하여 제거"
                    >
                        {t} ×
                    </button>
                ))}
            </div>
        </div>
    );
}
