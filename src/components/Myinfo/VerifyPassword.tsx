'use client';

import { useState } from 'react';
import {verifyPasswordRequest} from "@/api/requests/login";

export default function VerifyPassword({ onVerify }: { onVerify: () => void }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleVerifyPassword = async () => {
        try {
            const result = await verifyPasswordRequest(password);
            if (result.isValid) {
                onVerify();
            } else {
                setError('Incorrect password.');
            }
        } catch (error: unknown) {
            console.error(error);
            setError('Backend errer.');
        }
    };

    return (
        <div className="theme-card w-full max-w-md rounded-2xl p-6 text-center sm:p-8">
            <div className={"flex justify-center mb-4"}>
                <div className={"w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-white"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox={"0 0 24 24"}
                        strokeWidth={2}
                        stroke={"currentColor"}
                        className={"w-7 h-7"}
                    >
                        <path
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                            // 絵 = d
                            d={"M16 12V7a4 4 0 10-8 0v5M5 12h14v8H5v-8z"}
                        />
                    </svg>
                </div>
            </div>

            <h2 className={"text-2xl font-semibold text-white mb-2"}>Security Check</h2>
            <p className={"text-white/70 text-sm mb-6"}>Enter your password to continue.</p>
            <input
                type={"password"}
                placeholder={"Enter your password"}
                className={"w-full p-3 rounded-lg border border-white/30 bg-white/90 text-slate-900 focus:ring-2 focus:ring-white/40 focus:border-white transition-all"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
                <p className={"text-red-500 text-sm mt-2"}>{error}</p>
            )}

            <button
                className={"theme-btn-primary w-full py-3 mt-6 rounded-lg font-medium hover:brightness-110 transition"}
                onClick={handleVerifyPassword}>
                Verify
            </button>

            <p className={"text-xs text-white/60 mt-4"}>This step helps protect your account.</p>
        </div>
    );
}
