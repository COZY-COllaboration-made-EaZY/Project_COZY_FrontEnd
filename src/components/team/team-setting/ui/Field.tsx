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
            <label className="text-lg font-bold">{label}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                className={`
                    rounded-xl border border-black/10 bg-white px-4 py-2 outline-none
                    ${disabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "focus:border-black/30"}
                `}
            />
        </div>
    );
}
