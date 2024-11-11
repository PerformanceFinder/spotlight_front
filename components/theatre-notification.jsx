'use client'

import { CheckCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function TheatreNotification() {
  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <Card className="w-full max-w-md overflow-hidden shadow-xl">
        <div className="relative h-36 bg-yellow-200">
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="bg-white rounded-full p-5 shadow-lg">
              <CheckCircle className="w-20 h-20 text-yellow-400" />
            </div>
          </div>
        </div>
        <CardContent className="pt-20 pb-8 px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">선택 완료!</h2>
          <p className="text-lg text-gray-600 leading-relaxed space-y-2">
            <span className="block">선택하신 지역과 영화를 토대로</span>
            <span className="block">딱 맞는 연극이 있으면</span>
            <span className="block">카카오톡 채널로 메시지를 알려드릴게요!</span>
          </p>
        </CardContent>
      </Card>
    </div>)
  );
}