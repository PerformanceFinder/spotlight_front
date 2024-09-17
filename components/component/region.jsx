"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const regions = {
  서울: ["강남", "역삼", "신사", "논현"],
  경기: ["수원", "성남", "부천", "안양"],
  대전: ["중구", "서구", "유성구", "대덕구"],
  대구: ["중구", "동구", "서구", "남구"],
  부산: ["해운대", "부산진구", "사하구", "연제구"],
  강원: ["춘천", "원주", "강릉", "속초"],
  광주: ["동구", "서구", "남구", "북구"],
  인천: ["남동구", "부평구", "계양구", "미추홀구"],
  경남: ["창원", "김해", "진주", "양산"],
  경북: ["포항", "구미", "경주", "안동"],
};

export function RegionSelection() {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleRegionSelect = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region)); // 선택 해제
    } else {
      setSelectedRegions([...selectedRegions, region]); // 선택 추가
    }
    setSelectedAreas([]); // 지역 변경 시 구역 선택 초기화
  };

  const handleAreaSelect = (area) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area)); // 구역 선택 해제
    } else {
      setSelectedAreas([...selectedAreas, area]); // 구역 선택 추가
    }
  };

  const handleSelectAll = () => {
    const allAreas = selectedRegions.flatMap(region => regions[region]);
    setSelectedAreas(allAreas); // 선택된 모든 지역의 구역 선택
  };

  const handleSubmit = () => {
    alert(`선택한 지역: ${selectedRegions.join(', ')}, 선택한 구역: ${selectedAreas.join(', ')}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-4">
        <img src="/logo.png" alt="Logo" className="w-32 h-auto mb-4" /> {/* 로고 이미지 */}
        <h1 className="text-2xl font-bold">추천받고 싶은 공연장 위치 선택하기</h1>
      </div>
      <div className="flex">
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">지역별</h2>
          <Button
            className="w-full mb-2 bg-gray-300"
            onClick={handleSelectAll}
          >
            전체 선택
          </Button>
          <div className="grid gap-2">
            {Object.keys(regions).map((region) => (
              <Button
                key={region}
                className={`w-full text-left ${selectedRegions.includes(region) ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}`}
                onClick={() => handleRegionSelect(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-3/4 ml-4">
          <h2 className="text-lg font-semibold mb-2">선택한 지역: {selectedRegions.length > 0 ? selectedRegions.join(', ') : "없음"}</h2>
          <h2 className="text-lg font-semibold mb-2">선택한 구역: {selectedAreas.length > 0 ? selectedAreas.join(', ') : "없음"}</h2>
          <div className="grid gap-4">
            {selectedRegions.map((region) => (
              regions[region].map((area) => (
                <Button
                  key={area}
                  className={`w-full text-left ${selectedAreas.includes(area) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleAreaSelect(area)}
                >
                  {area}
                </Button>
              ))
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button
          className="bg-black text-white hover:bg-gray-800 transition-colors"
          onClick={handleSubmit}
          disabled={selectedAreas.length === 0}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}
