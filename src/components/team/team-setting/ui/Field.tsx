import React from "react";

export default function Field({
                                  label,
                                  value,
                                  onChange,
                                  type = "text",
                                  placeholder,
                              }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-lg font-bold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 outline-none focus:border-black/30"
            />
        </div>
    );
}
