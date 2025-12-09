'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent, { clientId } from '@/components/login/GoogleLogin';
import { useUserStore } from '@/store/userStore';
import { loginRequest } from '@/api/requests/login';
import { getCurrentUserRequest } from '@/api/requests/info';
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, isLoggedIn, setAccessToken } = useUserStore();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const { accessToken } = await loginRequest(email, password);
            setAccessToken(accessToken);

            const userInfo = await getCurrentUserRequest();
            login(userInfo, accessToken);
            router.push('/');
        } catch (e: any) {
            console.error(e);

            if (axios.isAxiosError(e) && e.response?.status === 401) {
                setError('아이디 혹은 비밀번호가 틀렸습니다.');
            } else {
                setError('로그인 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-[#7d6bff]">
            <div className={"flex flex-col justify-center pl-20"}>
                <h1 className="text-5xl font-extrabold text-gray-800 leading-snug max-w-xl">
                    Collaborate easier and faster —
                    <span className="text-blue-600"> with COZY.</span>
                </h1>

                <p className="mt-6 text-xl text-gray-600 max-w-lg">
                    Manage team projects, schedules, and documents — all in one place.
                </p>
            </div>

            <Card
                className="
                    w-full max-w-md
                    border border-white/40
                    bg-white/10
                    shadow-2xl
                    rounded-2xl
                    backdrop-blur-md
                    text-white
                "
            >
                <CardHeader className="pb-4">
                    <CardTitle className="text-center text-2xl font-semibold tracking-wide">
                        Login
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* 이메일 */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-white/80">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Please input email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                border border-white/30
                                bg-white/10
                                text-white
                                placeholder:text-white/60
                                focus-visible:ring-white
                                focus-visible:ring-1
                                focus-visible:border-white
                            "
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm text-white/80">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Please input password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                border border-white/30
                                bg-white/10
                                text-white
                                placeholder:text-white/60
                                focus-visible:ring-white
                                focus-visible:ring-1
                                focus-visible:border-white
                            "
                        />
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <Alert
                            variant="destructive"
                            className="
                                border-red-300 bg-red-500/20 text-red-100
                                px-4 py-2
                            "
                        >
                            <AlertTitle className="font-bold">오류</AlertTitle>
                            <p className="text-sm">{error}</p>
                        </Alert>
                    )}

                    {/* 로그인 버튼 */}
                    <Button
                        className="
                            mt-2 w-full
                            rounded-xl
                            bg-white/90
                            text-[#7d6bff]
                            font-semibold
                            hover:bg-white
                            transition
                        "
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? '로그인 중...' : 'Login'}
                    </Button>

                    {/* 구글 로그인 */}
                    <div
                        className="mt-3"
                        style={{
                            color: "black",
                            fontWeight: "600",
                        }}
                    >
                        <GoogleOAuthProvider clientId={clientId}>
                            <div className="google-login-wrapper">
                                <GoogleLoginComponent />
                            </div>
                        </GoogleOAuthProvider>
                    </div>

                    {/* 회원가입 링크 */}
                    <div className="mt-4 text-center text-sm text-white/80">
                        계정이 없으신가요?{' '}
                        <a href="/signup" className="underline text-white">
                            회원가입
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
