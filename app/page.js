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
          </div>

          <h1 className="mb-8 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            <span className="block">나에게 딱 맞는 모든 연극을</span>
            <span className="block mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              모두 경험해보세요!
            </span>
          </h1>

          <p className="mb-12 text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Spotlight이 직접 취향을 분석해 맞춤 연극을 추천해드려요!
          </p>

          <div className="space-y-6">
            <Button variant="default" className="p-0 overflow-hidden" onClick={kakaoLogin}>
              <img
                src="/kakao_login_large_wide.png"
                alt="카카오 로그인"
                width={240}
                height={54}
                onClick={kakaoLogin}
                style={{ cursor: 'pointer' }}
              />
            </Button>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Spotlight 카카오톡 채널을 통해 맞춤형 연극을 제공해드립니다. 
            </p>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              카카오톡 채널 수신 거부 시 연극 정보 제공이 어렵습니다. 
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