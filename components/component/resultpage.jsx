"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Suspense } from 'react';

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('plays');
  const [data, setData] = useState(null);

  const fetchPlays = async () => {
    try {
      const response = await fetch(`https://artause.co.kr/userselect?plays=${keyword}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

  useEffect(() => {
    fetchPlays();
  }, [keyword]);

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Keyword: {keyword}</p>
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // JSON 형태로 데이터를 보기 좋게 표시
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult />
    </Suspense>
  );
}
