"use client";

import { useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin, Check } from "lucide-react";

// 지역 데이터
const regions = {
  서울특별시: [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
    "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ],
  부산광역시: [
    "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구",
    "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"
  ],
  대구광역시: [
    "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"
  ],
  인천광역시: [
    "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"
  ],
  // 나머지 지역 생략
};

export function RegionSelection() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const router = useRouter();

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedArea('');
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleSubmit = () => {
    if (selectedRegion && selectedArea) {
      sessionStorage.setItem('selectedRegion', selectedRegion);
      sessionStorage.setItem('selectedArea', selectedArea);
      router.push('/form');
    } else {
      alert('지역과 구역을 모두 선택해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src="/api/placeholder/128/40" alt="Logo" className="h-10 w-32 object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            추천받고 싶은 공연장 위치 선택
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            원하시는 지역을 선택하시면 해당 지역의 추천 공연장을 안내해드립니다.
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Region Selection Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-blue-500" />
                지역 선택
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[500px] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(regions).map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    className={`
                      flex items-center justify-between
                      ${selectedRegion === region 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'hover:bg-gray-50'
                      }
                      transition-all duration-200
                    `}
                    onClick={() => handleRegionSelect(region)}
                  >
                    <span>{region}</span>
                    {selectedRegion === region && <Check className="w-4 h-4 ml-2" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Area Selection Card */}
          <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 
            ${!selectedRegion ? 'opacity-50' : 'opacity-100'}`}>
            <CardHeader className="border-b bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ChevronRight className="w-5 h-5 text-blue-500" />
                구역 선택
                {selectedRegion && <span className="text-blue-500 ml-2">({selectedRegion})</span>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[500px] overflow-y-auto custom-scrollbar">
              {selectedRegion ? (
                <div className="grid grid-cols-2 gap-2">
                  {regions[selectedRegion].map((area) => (
                    <Button
                      key={area}
                      variant={selectedArea === area ? "default" : "outline"}
                      className={`
                        flex items-center justify-between
                        ${selectedArea === area 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'hover:bg-gray-50'
                        }
                        transition-all duration-200
                      `}
                      onClick={() => handleAreaSelect(area)}
                    >
                      <span>{area}</span>
                      {selectedArea === area && <Check className="w-4 h-4 ml-2" />}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  지역을 먼저 선택해주세요
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Selected Info & Submit Button */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>선택된 지역: <strong>{selectedRegion || "미선택"}</strong></span>
            <span>•</span>
            <span>선택된 구역: <strong>{selectedArea || "미선택"}</strong></span>
          </div>
          
          <Button
            className={`px-8 py-6 text-lg font-semibold rounded-full
              ${(!selectedRegion || !selectedArea) 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              }
              transform transition-all duration-300 shadow-lg hover:shadow-xl h-auto
            `}
            onClick={handleSubmit}
            disabled={!selectedRegion || !selectedArea}
          >
            선택 완료
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
          border: transparent;
        }
      `}</style>
    </div>
  );
}

export default RegionSelection;
