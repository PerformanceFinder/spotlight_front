import React from 'react';

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <img src="/spotlight.jpg" alt="Loading" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-yellow-300 opacity-60 animate-pulse rounded-full"></div>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          '사용자'님의 취향을 분석중입니다 ...
        </p>
        <div className="w-full max-w-xs bg-gray-200 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
}
