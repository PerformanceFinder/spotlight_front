'use client';

import { Button } from "@/components/ui/button";
import { Header } from "@/components/component/header";

export default function Home() {
  const kakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=1e16826fb9c26b29181927d4c69fc121&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI)}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-200 relative overflow-hidden">
      <Header/>

      <main className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/api/placeholder/180/30"
              alt="Premium Service"
              className="mx-auto w-44"
            />
          </div>

          <h1 className="mb-8 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            <span className="block">Spotlight의 모든 것을</span>
            <span className="block mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              끊김 없이 즐기세요.
            </span>
          </h1>

          <p className="mb-12 text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Spotlight에서 광고 없이 콘텐츠를 감상하고, 오프라인 재생, 그리고 백그라운드 재생
          </p>

          <div className="space-y-6">
            <Button variant="default" className="p-0 overflow-hidden" onClick={kakaoLogin}>
              <img
                src="/kakao_login_medium_narrow.png"
                alt="카카오 로그인"
                width={240}
                height={54}
                onClick={kakaoLogin}
                style={{ cursor: 'pointer' }}
              />
            </Button>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              무료 체험 기간이 끝난 후 요금이 부과됩니다. 언제든지 해지할 수 있습니다.
            </p>
          </div>
        </div>
      </main>

      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}