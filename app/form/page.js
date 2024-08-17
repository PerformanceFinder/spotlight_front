'use client';

import { useEffect } from 'react';

export default function Form() {
  useEffect(() => {
    // 여기서 쿠키에서 토큰을 읽어 필요한 작업을 수행할 수 있습니다.
    console.log('Form 페이지 로드됨');
  }, []);

  return (
    <div>
      <h1>폼 페이지</h1>
      {/* 폼 내용 */}
    </div>
  );
}