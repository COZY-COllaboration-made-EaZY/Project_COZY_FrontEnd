'use client';

import { useState } from 'react';
import axios from 'axios';
import { ERROR_MESSAGE_MAP } from '@/constants/errorMessage';
import { isErrorCode } from '@/utils/isErrorCode';
import { ApiErrorResponse } from '@/types/ErrorResponse';
import {createJoinRequest} from "@/api/requests/joinRequest";

interface Props {
    teamId: string;
    teamName: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function TeamJoinRequestDialog({
                                                  teamId,
                                                  teamName,
                                                  onClose,
                                                  onSuccess,
                                              }: Props) {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) {
            alert('신청 메시지를 입력해주세요.');
            return;
        }

        try {
            setLoading(true);

            await createJoinRequest(teamId, message);

            onSuccess?.();
            onClose();
        } catch (e: unknown) {
            if (axios.isAxiosError<ApiErrorResponse>(e)) {
                const errorCode = e.response?.data?.error?.errorCode;

                if (errorCode && isErrorCode(errorCode)) {
                    alert(ERROR_MESSAGE_MAP[errorCode]);

                    // 이미 신청 / 이미 소속 → 다이얼로그 닫기
                    if (errorCode === 'JOIN-002' || errorCode === 'JOIN-003') {
                        onClose();
                    }
                    return;
                }
            }

            alert('팀 가입 신청에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-lg font-bold">팀 가입 신청</h2>

                <p className="mb-4 text-sm text-gray-500">
                    신청 팀 :{' '}
                    <span className="font-medium text-gray-800">{teamName}</span>
                </p>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="자신을 소개하세요"
                    className="w-full h-32 resize-none rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border px-4 py-2"
                    >
                        취소
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? '전송 중...' : '신청'}
                    </button>
                </div>
            </div>
        </div>
    );
}
