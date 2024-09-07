"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Suspense } from 'react';
import { Loading } from '@/components/component/loading';

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('plays');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlays = async () => 
  {
    setIsLoading(true);
    try {
      const response = await fetch(`https://artause.co.kr/userselect?plays=${keyword}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching plays:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => 
  {
    fetchPlays();
  }, [keyword]);

  if (isLoading) 
  {
    return <Loading />;
  }

  return (
    <div>
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export function ResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResult />
    </Suspense>
  );
}