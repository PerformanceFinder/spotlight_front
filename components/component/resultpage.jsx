"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export function ResultPage() {
  const [recommendedPlays, setRecommendedPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const plays = searchParams.get('plays');
    
    if (plays) {
      const fetchRecommendations = async () => {
        try {
          const response = await fetch(`https://artause.co.kr/userselect?plays=${plays}`);
          const data = await response.json();
          setRecommendedPlays(data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecommendations();
    }
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">연극 추천 결과</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            당신을 위한 최고의 연극 작품들을 소개합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recommendedPlays.map((play) => (
            <div key={play.mt20id} className="flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md">
              <img
                src={play.poster || "/placeholder.svg"}
                alt={`${play.prfnm} 포스터`}
                width={400}
                height={300}
                className="rounded-lg object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">{play.prfnm}</h3>
                <p className="text-muted-foreground line-clamp-3">{play.sty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  );
}
