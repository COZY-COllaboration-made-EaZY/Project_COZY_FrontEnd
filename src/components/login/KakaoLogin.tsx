'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import KakaoLogo from '@/assets/icons/kakao.svg';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Props = {
  enabled?: boolean; // 기본 false
};

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: { access_token: string }) => void;
          fail: (err: Error) => void;
        }) => void;
      };
    };
  }
}

const KakaoLogin: React.FC<Props> = ({ enabled = false }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return; // 미구현 모드에서는 SDK 로딩도 생략 (선택)
    if (typeof window !== 'undefined' && !window.Kakao) {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init('1f3c65acdec613a915d1da6425185ea9'); // 카카오 앱 키
        }
      };
      document.body.appendChild(script);
    }
  }, [enabled]);

  const handleKakaoLogin = () => {
    if (!enabled) {
      setOpen(true);
      return;
    }
    if (typeof window !== 'undefined' && window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log(authObj);
        },
        fail: (err) => {
          console.error(err);
        },
      });
    } else {
      console.error('Kakao SDK가 이니셜라이즈 되지 않음.');
    }
  };

  return (
      <>
        <Button
            onClick={handleKakaoLogin}
            className="w-full bg-yellow-300 hover:bg-yellow-400"
            variant="outline"
        >
          <Image src={KakaoLogo} alt="카카오 로고" width={24} height={24} />
          {enabled ? t('auth.kakaoLogin') : t('auth.kakaoLoginDisabled')}
        </Button>

        {/* 미구현 안내 모달 */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('auth.kakaoLoginComingTitle')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('auth.kakaoLoginComingDesc')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.close')}</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpen(false)}>{t('common.ok')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
};

export default KakaoLogin;
