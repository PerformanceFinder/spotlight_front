'use client';

import { useEffect } from 'react';

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
