import React from "react";

type FieldProps = {
    label: string;
    value: string;
    onChange?: (v: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    disabled?: boolean;
};

export default function Field({
                                  label,
                                  value,
                                  onChange,
                                  type = "text",
                                  placeholder,
                                  disabled = false,
                              }: FieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-lg font-bold text-white">{label}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`
                    rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-slate-900 outline-none
                    ${disabled
                    ? "bg-white/60 text-slate-500 cursor-not-allowed"
                    : "focus:border-white focus:ring-2 focus:ring-white/40"}
                `}
            />
        </div>
    );
}
