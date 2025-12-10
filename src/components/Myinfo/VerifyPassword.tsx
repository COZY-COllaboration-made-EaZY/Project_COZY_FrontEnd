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
        } catch (error) {
            setError('Backend errer.');
        }
    };

    return (
        <div className={"w-96 p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_28px_rgba(0,0,0,0.08)] text-center"}>
            <div className={"flex justify-center mb-4"}>
                <div className={"w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600"}>
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

            <h2 className={"text-2xl font-semibold text-gray-800 mb-2"}>Security Check</h2>
            <p className={"text-gray-500 text-sm mb-6"}>Enter your password to continue.</p>
            <input
                type={"password"}
                placeholder={"Enter your password"}
                className={"w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
                <p className={"text-red-500 text-sm mt-2"}>{error}</p>
            )}

            <button
                className={"w-full py-3 mt-6 rounded-lg text-white font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"}
                onClick={handleVerifyPassword}>
                Verify
            </button>

            <p className={"text-xs text-gray-400 mt-4"}>This step helps protect your account.</p>
        </div>
    );
}
