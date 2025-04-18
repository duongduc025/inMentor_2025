'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const randomAvatarNumber = user?.email ? user.email.substring(0, 2) : Math.floor(Math.random() * 100);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: user?.email || 'user@example.com',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: '',
    bio: ''
  });

  const handleEditProfile = () => {
    toast({
      title: "Coming Soon!",
      description: "Chức năng chỉnh sửa hồ sơ sẽ sớm được triển khai.",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#343A40] text-[#343A40] dark:text-[#FFFFFF] min-h-screen flex flex-col">
      {/* Hero-like section with fixed background */}
      <div className="w-full relative overflow-hidden min-h-[calc(100vh)] flex items-center">
        {/* Background with modern design elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-[#1a1d20] dark:via-[#25292e] dark:to-[#343A40]"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          {/* Grid patterns */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" 
               style={{ 
                 backgroundImage: "radial-gradient(#007BFF 1px, transparent 1px)", 
                 backgroundSize: "30px 30px" 
               }}>
          </div>
          
          {/* Abstract shapes */}
          <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 rotate-12 bg-gradient-to-br from-[#007BFF]/10 to-[#007BFF]/5 dark:from-[#007BFF]/20 dark:to-[#007BFF]/10 rounded-3xl"></div>
          <div className="hidden md:block absolute -bottom-32 -left-32 w-96 h-96 rotate-45 bg-gradient-to-tr from-[#007BFF]/10 to-[#007BFF]/5 dark:from-[#007BFF]/20 dark:to-[#007BFF]/10 rounded-3xl"></div>
        </div>
      
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="w-full mb-10">
            <div className="h-32 bg-gradient-to-r from-[#007BFF] to-[#0056b3] rounded-t-xl shadow-lg"></div>
          
            <div className="-mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1 border-none shadow-lg bg-white/80 dark:bg-[#343A40]/90 backdrop-blur-sm">
                  <CardHeader className="text-center pt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white bg-white shadow-lg">
                        <img
                          src={`https://robohash.org/${randomAvatarNumber}`}
                          alt="Profile avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-[#343A40] dark:text-white text-xl font-semibold">
                        {profileData.fullName || "Chưa cập nhật"}
                      </CardTitle>
                      <CardDescription className="mt-2 text-[#007BFF] font-medium">
                        {profileData.email}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center pb-8">
                    <div className="text-[#343A40] dark:text-gray-200 space-y-1">
                      <p className="text-sm">{profileData.phone || "Chưa cập nhật số điện thoại"}</p>
                      <p className="text-sm">{profileData.address || "Chưa cập nhật địa chỉ"}</p>
                    </div>
                    <Button 
                      onClick={handleEditProfile} 
                      className="mt-4 bg-[#007BFF] hover:bg-[#0069d9] text-white border-none shadow-lg shadow-[#007BFF]/20"
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa hồ sơ
                    </Button>
                  </CardContent>
                </Card>

                {/* Profile Details */}
                <Card className="md:col-span-2 border-none shadow-lg bg-white/80 dark:bg-[#343A40]/90 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#343A40] dark:text-white text-xl">Thông tin chi tiết</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <Tabs defaultValue="personal" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                        <TabsTrigger 
                          value="personal" 
                          className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white rounded-md"
                        >
                          Thông tin cá nhân
                        </TabsTrigger>
                        <TabsTrigger 
                          value="professional" 
                          className="data-[state=active]:bg-[#007BFF] data-[state=active]:text-white rounded-md"
                        >
                          Thông tin chuyên môn
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="personal" className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-[#343A40] dark:text-gray-200 font-medium">Họ và tên</Label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#343A40] dark:text-gray-200 font-medium">Email</Label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <p className="text-sm text-[#007BFF]">{profileData.email}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-[#343A40] dark:text-gray-200 font-medium">Số điện thoại</Label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-[#343A40] dark:text-gray-200 font-medium">Địa chỉ</Label>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                              <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-[#343A40] dark:text-gray-200 font-medium">Giới thiệu bản thân</Label>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 min-h-[100px]">
                            <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="professional" className="space-y-6 pt-6">
                        <div className="space-y-2">
                          <Label htmlFor="education" className="text-[#343A40] dark:text-gray-200 font-medium">Học vấn</Label>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                            <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="experience" className="text-[#343A40] dark:text-gray-200 font-medium">Kinh nghiệm</Label>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 min-h-[100px]">
                            <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="skills" className="text-[#343A40] dark:text-gray-200 font-medium">Kỹ năng</Label>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 min-h-[100px]">
                            <p className="text-sm italic text-gray-500 dark:text-gray-400">Chưa cập nhật</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex justify-center mt-8 pb-4">
                      <Button 
                        onClick={handleEditProfile} 
                        className="bg-[#007BFF] hover:bg-[#0069d9] text-white border-none px-8 py-6 shadow-lg shadow-[#007BFF]/20 rounded-xl"
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Cập nhật thông tin
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
