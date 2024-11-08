import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Suspense } from 'react';
import { Loading } from '@/components/component/loading';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Header } from "@/components/component/header";

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
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center text-yellow-500">
            오늘의 추천 연극
          </h1>

          <Card className="mb-12 bg-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col lg:flex-row items-center">
              <motion.img 
                src={data.poster} 
                alt={`${data.prfnm} 포스터`} 
                className="w-full lg:w-2/5 h-auto rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6 transform transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              />
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-semibold mb-4 text-yellow-600">{data.prfnm}</h2>
                <p className="text-lg leading-relaxed mb-6 text-gray-700">
                  {data.sty}
                </p>
                <motion.a
                  href={data.relateurl1}
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-black text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300"
                >
                  예매하기
                </motion.a>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">진행 중인 이벤트</h2>
          <Carousel className="w-full max-w-2xl mx-auto mb-12">
            <CarouselContent>
              {events.map((event, index) => (
                <CarouselItem key={event.id} isActive={index === activeSlide}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-1"
                  >
                    <Card className={`bg-gray-100 shadow-md overflow-hidden transition-shadow duration-300 ${index === activeSlide ? 'shadow-xl' : ''}`}>
                      <CardContent className="flex aspect-video items-center justify-center p-6">
                        <div className="text-center">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-auto max-h-48 object-cover rounded-lg shadow-lg mb-4 hover:opacity-90 transition-opacity duration-300"
                          />
                          <h3 className="text-xl font-medium text-yellow-600">{event.title}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-gray-800 hover:text-yellow-600 transition-colors" />
            <CarouselNext className="text-gray-800 hover:text-yellow-600 transition-colors" />
          </Carousel>

          <div className="container mx-auto px-4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data && data.length > 0 ? (
                data.map((play) => (
                  <Card key={play.mt20id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex-grow p-4">
                      <img src={play.poster} alt={play.prfnm} className="w-full h-64 object-cover rounded-lg mb-4" />
                      <h3 className="text-lg font-semibold mb-2 text-yellow-700">{play.prfnm}</h3>
                    </CardContent>
                    <CardFooter className="bg-gray-100 p-4 rounded-b-lg flex flex-col items-start">
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{play.sty || "작품설명 없음"}</p>
                      {play.relateurl1 && (
                        <Button 
                          onClick={() => window.open(play.relateurl1, '_blank')}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                          연극 예매하기!
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="col-span-3 text-center text-lg text-gray-500">No data available.</p>
              )}
            </div>
          </div>
        </motion.div>
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
