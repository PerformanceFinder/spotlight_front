"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { Suspense } from 'react';

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('plays');

  const fetchPlays = async () => {
    try {
      const response = await fetch(`https://artause.co.kr/userselect?plays=${plays}`);
      const data = await response.json();
      
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

  useEffect(() => {
    fetchPlays();
  }, []);

  return (
    <div>
      <h1>Search Page</h1>
      <p>Search Keyword: {data}</p>
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

