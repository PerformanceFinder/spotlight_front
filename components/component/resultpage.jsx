import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Suspense } from 'react';
import { Loading } from '@/components/component/loading';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function SearchResult() {
  
  const events = [
    { id: 1, title: "초대권 이벤트 (1)", imageUrl: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "초대권 이벤트 (2)", imageUrl: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "초대권 이벤트 (3)", imageUrl: "/placeholder.svg?height=300&width=400" },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('plays');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPlays = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://artause.co.kr/final?plays=${keyword}`);
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
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h1 className="text-5xl font-bold mb-12 text-center text-yellow-500">
          오늘의 추천 연극
        </h1>
        
        {/* 연극 추천 섹션 */}
        <Card className="mb-16 bg-gray-100 shadow-lg overflow-hidden">
          <CardContent className="p-8 flex flex-col lg:flex-row items-center">
            <motion.img 
              src={data.poster} 
              alt={`${data.prfnm} 포스터`} 
              className="w-full lg:w-2/5 h-auto rounded-lg shadow-xl mb-8 lg:mb-0 lg:mr-8 transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-yellow-500">{result.prfnm}</h2>
              <p className="text-xl leading-relaxed mb-8 text-gray-700">
                {data.sty}
              </p>
              <motion.a
                href= {data.relateurl1}// 여기서 URL을 지정하세요
                target="_blank" // 새 탭에서 열리도록 하려면 추가
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-black text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                예매하기
              </motion.a>
            </div>
          </CardContent>
        </Card>

        {/* 이벤트 슬라이드 섹션 */}
        <h2 className="text-4xl font-bold mb-8 text-center text-yellow-500">진행 중인 이벤트</h2>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem key={event.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-1"
                >
                  <Card className="bg-gray-100 shadow-md overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <div className="text-center">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-auto max-h-48 object-cover rounded-lg shadow-lg mb-4 hover:opacity-80 transition-opacity duration-300"
                        />
                        <h3 className="text-2xl font-semibold text-yellow-500">{event.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-800 hover:text-yellow-500 transition-colors" />
          <CarouselNext className="text-gray-800 hover:text-yellow-500 transition-colors" />
        </Carousel>

        {/* 검색 결과 섹션 */}
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && data.length > 0 ? (
              data.map((play) => (
                <Card key={data.mt20id} className="flex flex-col h-full">
                  <CardContent className="flex-grow p-4">
                    <img src={data.poster} alt={data.prfnm} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h3 className="text-xl font-bold mb-2">{data.prfnm}</h3>
                  </CardContent>
                  <CardFooter className="bg-gray-100 p-4 rounded-b-lg flex flex-col items-start">
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{data.sty || "작품설명 없음"}</p>
                    {data.relateurl1 && (
                      <Button 
                        onClick={() => window.open(data.relateurl1, '_blank')}
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
      </motion.div>
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
