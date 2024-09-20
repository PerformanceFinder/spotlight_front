"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function FormPage() {
  const [plays, setPlays] = useState({});
  const [selectedPlays, setSelectedPlays] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  const genres = ["로맨스", "코미디", "공포", "추리", "고전", "어린이", "시대극", "버라이어티", "기타"];

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
      console.log(storedTokenData, storedRegion, storedArea);
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
      const categorizedPlays = genres.reduce((acc, genre) => {
        acc[genre] = [];
        return acc;
      }, {});
      
      data.forEach((play) => {
        const playGenres = play.pergen.split(',').map(g => g.trim());
        playGenres.forEach((genre) => {
          if (categorizedPlays[genre]) {
            categorizedPlays[genre].push({
              id: play.mt20id,
              title: play.prfnm,
              image: play.poster,
              description: play.syn
            });
          } else {
            if (!categorizedPlays['기타']) categorizedPlays['기타'] = [];
            categorizedPlays['기타'].push({
              id: play.mt20id,
              title: play.prfnm,
              image: play.poster,
              description: play.syn
            });
          }
        });
      });
      
      setPlays(categorizedPlays);
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

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
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="space-y-8">
        {genres.map((genre) => (
          <div key={genre} className="w-full overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">{genre}</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={isMobile ? 1 : 3}
              navigation
              pagination={{ clickable: true }}
              className="w-full pb-12"
            >
              {plays[genre]?.map((play) => (
                <SwiperSlide key={play.id} className="w-full">
                  <PlayCard 
                    play={play} 
                    isSelected={selectedPlays.includes(play.id)} 
                    onSelect={handlePlaySelection} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
      
      <div className={`${isMobile ? 'static mt-8 w-full' : 'fixed bottom-8 right-8'} z-50`}>
        <Button
          className={`bg-black text-white hover:bg-gray-800 transition-colors ${isMobile ? 'w-full' : ''}`}
          onClick={handleRecommendationClick}
        >
          추천 연극 확인하러 가기!
        </Button>
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