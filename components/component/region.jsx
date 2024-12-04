"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin, Check } from "lucide-react";
import { Header } from "@/components/component/header";

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
  광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
  대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
  울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
  세종특별자치시: ["세종시"],
  경기도: [
    "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시",
    "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시",
    "양주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시",
    "포천시", "하남시", "화성시", "가평군", "양평군", "여주시", "연천군"
  ],
  강원도: [
    "강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시",
    "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군",
    "평창군", "홍천군", "화천군", "횡성군"
  ],
  충청북도: [
    "제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군",
    "옥천군", "음성군", "증평군", "진천군"
  ],
  충청남도: [
    "계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시",
    "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"
  ],
  전라북도: [
    "군산시", "김제시", "남원시", "익산시", "전주시", "정읍시",
    "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"
  ],
  전라남도: [
    "광양시", "나주시", "목포시", "순천시", "여수시",
    "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군",
    "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
  ],
  경상북도: [
    "경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시",
    "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군",
    "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"
  ],
  경상남도: [
    "거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시",
    "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군",
    "함양군", "합천군"
  ],
  제주특별자치도: ["제주시", "서귀포시"]
};

export function RegionSelection() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedArea('');
    setErrorMessage('');
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (selectedRegion && selectedArea) {
      sessionStorage.setItem('selectedRegion', selectedRegion);
      sessionStorage.setItem('selectedArea', selectedArea);
      router.push('/form');
    } else {
      setErrorMessage('지역과 구역을 모두 선택해주세요.');
    }
  };

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              추천받고 싶은 공연장 위치 선택
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              원하시는 지역을 선택하시면 해당 지역의 추천 공연장을 안내해드립니다.
            </p>
          </div>

          {errorMessage && (
            <div className="text-center text-red-500 font-medium mb-4">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-center gap-4 mb-8 text-sm text-gray-700">
            <span>선택된 지역: <strong>{selectedRegion || "미선택"}</strong></span>
            <span>•</span>
            <span>선택된 구역: <strong>{selectedArea || "미선택"}</strong></span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-yellow-300" />
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
                          ? 'bg-yellow-300 text-white hover:bg-yellow-400' 
                          : 'hover:bg-gray-50'
                        }
                        transition-all duration-200 transform hover:scale-105
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

            <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 
              ${!selectedRegion ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ChevronRight className="w-5 h-5 text-yellow-300" />
                  구역 선택
                  {selectedRegion && <span className="text-yellow-300 ml-2">({selectedRegion})</span>}
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
                            ? 'bg-yellow-300 text-white hover:bg-yellow-400' 
                            : 'hover:bg-gray-50'
                          }
                          transition-all duration-200 transform hover:scale-105
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

          <div className="flex flex-col items-center gap-6">
            <Button
              className={`px-8 py-6 text-lg font-semibold rounded-full
                ${(!selectedRegion || !selectedArea) 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-yellow-300 hover:bg-yellow-400 hover:scale-105'
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
    </div>
  );
}

export default RegionSelection;