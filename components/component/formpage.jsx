"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export function FormPage({ userName }) {
  const [plays, setPlays] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlays, setSelectedPlays] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchPlays();

    if (typeof window !== "undefined") {
      const storedTokenData = sessionStorage.getItem('tokenData');
      setTokenData(storedTokenData);
      console.log(storedTokenData);
    }
  }, []);

  const fetchPlays = async () => {
    try {
      const response = await fetch('https://artause.co.kr/api/data');
      const data = await response.json();
      setPlays(data.map((play) => ({
        id: play.mt20id,
        title: play.prfnm,
        category: "all",
        image: play.poster,
        description: play.sty
      })));
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

  const categories = [
    { id: "all", name: "모두" },
    { id: "comedy", name: "코미디" },
    { id: "drama", name: "드라마" },
    { id: "musical", name: "뮤지컬" },
    { id: "romantic", name: "로맨틱 코미디" },
    { id: "thriller", name: "스릴러" },
    { id: "fantasy", name: "판타지" },
    { id: "darkDrama", name: "다큐드라마" },
    { id: "animation", name: "아동극" },
  ];

  const filteredPlays = selectedCategory === "all" ? plays : plays.filter((play) => play.category === selectedCategory);

  const handlePlaySelection = (playId) => {
    if (selectedPlays.includes(playId)) {
      setSelectedPlays(selectedPlays.filter((id) => id !== playId));
    } else {
      setSelectedPlays([...selectedPlays, playId]);
    }
  };

  const handleRecommendationClick = async () => {
    if (selectedPlays.length < 3) {
      alert("최소 3개 이상의 공연을 선택해 주세요.");
      return;
    }

    const selectedIds = selectedPlays.join(',');

    // 'loading' 페이지로 이동
    router.push(`/loading?plays=${selectedIds}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex">
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-sm">
          <img
            src="/logo.png" // 로고 이미지 경로로 변경
            className="w-32 h-auto mb-4"
          />
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-semibold">장르별</h2>
          </div>
          <div className="grid gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md transition-colors hover:bg-muted ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-3/4 ml-4">
          <h1 className="text-2xl font-bold mb-4">{`${userName}님의 공연 취향 분석하기`}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlays.map((play) => (
              <div
                key={play.id}
                className={`bg-card rounded-lg overflow-hidden shadow-sm group cursor-pointer ${
                  selectedPlays.includes(play.id) ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handlePlaySelection(play.id)}
              >
                <div className="relative w-full h-48 object-cover">
                  <img
                    src={play.image}
                    alt={play.title}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  {selectedPlays.includes(play.id) && (
                    <div className="absolute top-2 right-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{play.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {play.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-8 right-8 z-50">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={handleRecommendationClick}
            >
              추천 연극 확인하러 가기!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
