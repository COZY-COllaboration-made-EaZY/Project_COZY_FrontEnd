'use client';

export const dynamic = "force-dynamic";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { registerRequest } from "@/api/requests/auth";
import { useTranslation } from "react-i18next";

export default function SignupClient() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
  };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError(t('auth.passwordMismatch'));
            return;
        }

        try {
            const payload = { email, password, confirmPassword, nickname };
            await registerRequest(payload);
            alert(t('auth.signupSuccess'));
            router.push("/login");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : String(e);
            setError(t('auth.signupFail', { message }));
        }
    };


    return (
      <div className="theme-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 md:px-10">
        <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
        <div className="theme-stars pointer-events-none absolute inset-0" />
        <Card className='theme-card w-full max-w-md p-6'>
          <CardHeader>
            <CardTitle className='text-center text-white'>{t('auth.signupTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='email' className='text-white'>{t('auth.emailLabel')}</Label>
                <Input id='email' type='email' placeholder={t('auth.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/30 bg-white/90 text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/40" />
              </div>
              <div>
                <Label htmlFor='nickname' className='text-white'>{t('auth.nicknameLabel')}</Label>
                <Input id='nickname' type='text' placeholder={t('auth.nicknamePlaceholder')} value={nickname} onChange={(e) => setNickname(e.target.value)} className="border-white/30 bg-white/90 text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/40" />
              </div>
              <div>
                <Label htmlFor='password' className='text-white'>{t('auth.passwordLabel')}</Label>
                <Input id='password' type='password' placeholder={t('auth.passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} className="border-white/30 bg-white/90 text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/40" />
              </div>
              <div>
                <Label htmlFor='confirmPassword' className='text-white'>{t('auth.confirmPasswordLabel')}</Label>
                <Input id='confirmPassword' type='password' placeholder={t('auth.confirmPasswordPlaceholder')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-white/30 bg-white/90 text-slate-900 placeholder:text-slate-400 focus-visible:ring-white/40" />
              </div>
              <div>
                <Label htmlFor='profileImage' className='text-white'>{t('auth.profileImageLabel')}</Label>
                <Input id='profileImage' type='file' onChange={handleFileChange} className="text-white/80" />
              </div>

                {error && (
                    <Alert
                        variant="destructive"
                        className="w-full border-red-300 bg-red-500/20 text-red-100 px-4 py-2"
                    >
                        <AlertTitle className="font-bold">{t('auth.errorTitle')}</AlertTitle>
                        <div className="text-sm whitespace-pre">
                            {error}
                        </div>
                    </Alert>
                )}



                <Button className='theme-btn-primary w-full' onClick={handleSignup}>{t('auth.signupButton')}</Button>
            </div>

            <div className='mt-4 text-center'>
              <p className='text-white/80'>
                {t('auth.haveAccount')} <a href='/login' className='underline text-white'>{t('auth.loginLink')}</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
