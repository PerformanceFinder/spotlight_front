'use client';

import { Button } from "@/components/ui/button";
import { LoginForm } from '@/components/component/loginform';

export default function Home() {
  const kakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=1e16826fb9c26b29181927d4c69fc121&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI)}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
        <img
          src="/logo.png"
          alt="Artause Logo"
          width={555}
          height={161}
        />
        </div>        
        <p className="mb-6 text-lg text-gray-700">
          그동안 몰랐던, 하지만 나에게 딱 맞는<br />
          공연을 추천해드려요!
        </p>
        <Button
          variant="default"
          className="p-0 overflow-hidden"
          onClick={kakaoLogin}
        >
          <img
            src="/kakao_login_medium_narrow.png"
            alt="카카오 로그인"
            width={240}
            height={54}
            onClick={kakaoLogin}
            style={{ cursor: 'pointer' }}
          />
        </Button>
      </div>
      <LoginForm/>
    </div>
  );
}