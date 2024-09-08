import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Suspense } from 'react';
import { Loading } from '@/components/component/loading';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('plays');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlays = async () => {
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

  useEffect(() => {
    fetchPlays();
  }, [keyword]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((play) => (
            <Card key={play.mt20id} className="flex flex-col h-full">
              <CardContent className="flex-grow p-4">
                <img src={play.poster} alt={play.prfnm} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-2">{play.prfnm}</h3>
              </CardContent>
              <CardFooter className="bg-gray-100 p-4 rounded-b-lg flex flex-col items-start">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{play.sty || "작품설명 없음"}</p>
                {play.relateurl1 && (
                  <Button 
                    onClick={() => window.open(play.relateurl1, '_blank')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    연극 예매하기!
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-3 text-center text-lg">No data available.</p>
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