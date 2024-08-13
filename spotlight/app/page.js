import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Artause Logo"
            width={555}
            height={161}
            priority
          />
        </div>        
        <p className="mb-6 text-lg text-gray-700">
          그동안 몰랐던, 하지만 나에게 딱 맞는<br />
          공연을 추천해드려요!
        </p>
        <Button
          variant="default"
          className="p-0 overflow-hidden"
        >
          <Image
            src="/kakao_login_medium_narrow.png"
            alt="카카오 로그인"
            width={266}
            height={64}
          />
        </Button>
      </div>
    </div>
  );
}