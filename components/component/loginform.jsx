import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    gender: '',
    birthday: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevData => ({
      ...prevData,
      gender: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>회원가입 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">이름 <span className="text-red-500">*필수</span></Label>
            <Input 
              id="fullName" 
              placeholder="Enter your full name" 
              required 
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">성별 <span className="text-red-500">*필수</span></Label>
            <Select id="gender" required onValueChange={handleSelectChange} value={formData.gender}>
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">남성</SelectItem>
                <SelectItem value="female">여성</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">생일 <span className="text-red-500">*필수</span></Label>
            <Input 
              id="birthday" 
              type="date" 
              required 
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호 <span className="text-red-500">*필수</span></Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
              required 
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}