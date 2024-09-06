'use client';

import { useEffect } from 'react';
import { ResultPage } from '@/components/component/resultpage';

export default function Form() {
  useEffect(() => {
    console.log('Form page loaded');
  }, []);

  return (
    <div>
      <ResultPage/>
    </div>
  );
}
