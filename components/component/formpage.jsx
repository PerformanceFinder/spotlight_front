"use client";

import { useState, useEffect } from "react";

export function FormPage() {
  const [plays, setPlays] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlays, setSelectedPlays] = useState([]);
  
  useEffect(() => {
    fetchPlays();

    if (typeof window !== "undefined") {
      const tokenData = sessionStorage.getItem('tokenData');
      console.log(tokenData);
    }
  }, []);

  const fetchPlays = async () => {
    try {
      const response = await fetch('https://artause.co.kr/api/data');
      const data = await response.json();
      setPlays(data.map((play, index) => ({
        id: index + 1,
        title: play.prfnm,
        category: "all", // 카테고리 정보가 없으므로 모두 'all'로 설정
        image: play.poster,
        description: play.sty
      })));
    } catch (error) {
      console.error("Error fetching plays:", error);
    }
  };

  const categories = [
    { id: "all", name: "All" },
  ];

  const filteredPlays = selectedCategory === "all" ? plays : plays.filter((play) => play.category === selectedCategory);

  const handlePlaySelection = (playId) => {
    if (selectedPlays.includes(playId)) {
      setSelectedPlays(selectedPlays.filter((id) => id !== playId));
    } else {
      setSelectedPlays([...selectedPlays, playId]);
    }
  };
  
  const handleRecommendationClick = () => {
    // 여기에 추천 연극 확인 로직을 추가하세요
    console.log("추천 연극 확인하기 버튼이 클릭되었습니다.");
  };
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlays.map((play) => (
            <div
              key={play.id}
              className={`bg-card rounded-lg overflow-hidden shadow-sm group ${
                selectedPlays.includes(play.id) ? "relative" : ""
              }`}
              onClick={() => handlePlaySelection(play.id)}
            >
              <div
                className={`w-full h-48 object-cover transition-opacity duration-300 ${
                  selectedPlays.includes(play.id) ? "opacity-50" : ""
                }`}
              >
                <img
                  src={play.image}
                  alt={play.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
              </div>
              {selectedPlays.includes(play.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-4">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{play.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {play.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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