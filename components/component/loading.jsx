import React from 'react';

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4">
          <img src="/spotlight.jpg" alt="Loading" className="w-full h-full object-contain" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          '사용자'님의 취향을 분석중입니다 ...
        </p>
      </div>
    </div>
  );
}