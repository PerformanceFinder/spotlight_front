"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Header } from "@/components/component/header";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function FormPage() {
  const [plays, setPlays] = useState([]);
  const [selectedPlays, setSelectedPlays] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchPlays();
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (typeof window !== "undefined") {
      const storedTokenData = sessionStorage.getItem('tokenData');
      const storedRegion = sessionStorage.getItem('selectedRegion');
      const storedArea = sessionStorage.getItem('selectedArea');
      setTokenData(storedTokenData);
      setSelectedRegion(storedRegion);
      setSelectedArea(storedArea);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchPlays = async () => {
    try {
      const response = await fetch('https://artause.co.kr/api/data');
      const data = await response.json();
      
      const formattedPlays = data.map(play => ({
        id: play.mt20id,
        title: play.prfnm,
        image: play.poster,
        description: play.syn
      }));
      
      setPlays(formattedPlays);
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

  const loadMorePlays = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      
      let url;
      if (selectedPlays.length > 0) {
        // 선택된 연극이 있는 경우 추천 API 호출
        const selectedIds = selectedPlays.join(',');
        url = `https://artause.co.kr/userselect?plays=${selectedIds}`;
      } else {
        // 선택된 연극이 없는 경우 기본 20개 로드
        url = `https://artause.co.kr/api/data?page=${page}&limit=20`;
      }

      const response = await fetch(url);
      const newPlays = await response.json();
      
      // 새로운 연극들을 기존 배열에 추가
      if (Array.isArray(newPlays)) {
        setPlays(prevPlays => [...prevPlays, ...newPlays.map(play => ({
          id: play.mt20id,
          title: play.prfnm,
          image: play.poster,
          description: play.sty || play.syn // sty가 있으면 사용, 없으면 syn 사용
        }))]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more plays:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, selectedPlays]);

  // Intersection Observer 설정
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMorePlays();
      }
    }, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMorePlays]);

  const handlePlaySelection = (playId) => {
    if (selectedPlays.includes(playId)) {
      setSelectedPlays(selectedPlays.filter((id) => id !== playId));
    } else {
      setSelectedPlays([...selectedPlays, playId]);
    }
  };
  
  const handleRecommendationClick = async () => {
    const selectedIds = selectedPlays.join(',');
    
    try {
      const response = await fetch('https://artause.co.kr/userinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedIds,
          tokenData,
          selectedRegion,
          selectedArea,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      
      router.push(`/result?plays=${selectedIds}`);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  const renderPlays = () => {
    if (isMobile) {
      return (
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="w-full pb-12"
          >
            {plays.map((play) => (
              <SwiperSlide key={play.id} className="w-full">
                <PlayCard 
                  play={play} 
                  isSelected={selectedPlays.includes(play.id)} 
                  onSelect={handlePlaySelection} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div ref={loader} className="h-10 flex items-center justify-center">
            {isLoading && <div>Loading...</div>}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plays.map((play) => (
              <PlayCard 
                key={play.id} 
                play={play} 
                isSelected={selectedPlays.includes(play.id)} 
                onSelect={handlePlaySelection} 
              />
            ))}
          </div>
          <div ref={loader} className="h-10 flex items-center justify-center">
            {isLoading && <div>Loading...</div>}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Header/>
      <div className="container mx-auto py-8 px-4 md:px-6">
        {renderPlays()}
        
        <div className={`${isMobile ? 'static mt-8 w-full' : 'fixed bottom-8 right-8'} z-50`}>
          <Button
            className={`bg-black text-white hover:bg-gray-800 transition-colors ${isMobile ? 'w-full' : ''}`}
            onClick={handleRecommendationClick}
          >
            추천 연극 확인하러 가기!
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlayCard({ play, isSelected, onSelect }) {
  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    onSelect(play.id);
    setShowDescription(!showDescription);
  };

  return (
    <div
      className={`bg-card rounded-lg overflow-hidden shadow-sm group relative ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full pb-[150%]">
        <img
          src={play.image}
          alt={play.title}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 ${
            showDescription ? "blur-sm" : ""
          }`}
        />
        {showDescription && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <p className="text-white text-sm overflow-y-auto max-h-full">
              {play.description}
            </p>
          </div>
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full p-2 mb-1">
              <CheckIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold bg-white px-1 py-0.5 rounded">
              {play.title}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{play.title}</h3>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}