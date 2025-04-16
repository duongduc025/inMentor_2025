import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ThemeModeToggle from '@/components/ThemeModeToggle';
import { Sparkles, Users, Target, Brain, ArrowRight, CheckCircle, ChevronRight, Star, BarChart, Clock, Award, MessageCircle, X, MoreHorizontal, Info } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';
// Removed Navbar import

export default function LandingPage() {
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isNavbarInView, setIsNavbarInView] = useState(true);
  const navbarAreaRef = useRef<HTMLDivElement>(null);

  // Track if navbar is in view based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Navbar height is 72px based on your layout
      setIsNavbarInView(scrollPosition < 72);
    };
    
    // Set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mouse events only when navbar is in view
  useEffect(() => {
    const handleMouseEnter = () => {
      if (isNavbarInView) {
        setIsHeaderVisible(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHeaderVisible(false);
    };
    
    const navbarArea = navbarAreaRef.current;
    if (navbarArea) {
      navbarArea.addEventListener('mouseenter', handleMouseEnter);
      navbarArea.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        navbarArea.removeEventListener('mouseenter', handleMouseEnter);
        navbarArea.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isNavbarInView]); // Re-attach events when isNavbarInView changes

  // Redesigned interview illustration with new styling but keeping the video
  const InterviewIllustration = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      // Autoplay the video when component mounts
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          // Handle autoplay restriction errors
          console.log('Autoplay prevented:', error);
        });
      }
    }, []);

    return (
      <div className="w-full h-full flex bg-white dark:bg-neutral-800 rounded-xl shadow-xl overflow-hidden border border-[#343A40]/10 dark:border-neutral-700">
        {/* Main content */}
        <div className="flex-1 flex flex-col relative">
          {/* Video container */}
          <div className="flex-1 bg-gray-800 dark:bg-neutral-800 relative">
            {/* Video player (preserve this part) */}
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster="/interview-poster.png"
            >
              <source src="/interview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Name overlay at bottom */}
            <div className="absolute bottom-4 left-4 text-white flex items-center bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-lg font-medium">Bạn</span>
            <MoreHorizontal className="ml-2 w-5 h-5 opacity-70" />
          </div>

            
            {/* Small interviewer video as avatar */}
            <div className="absolute bottom-4 right-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-800 dark:bg-neutral-800 border border-gray-700 dark:border-neutral-700 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-700 dark:border-neutral-700 flex items-center justify-center overflow-hidden">
                    <div className="bg-gray-600 dark:bg-neutral-600 text-white text-xl flex items-center justify-center w-full h-full">
                      A
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1 w-full text-center">
                  <span className="text-xs text-white">AI inMentor</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom status bar */}
          <div className="h-8 md:h-10 bg-gray-900 dark:bg-neutral-900 text-white flex items-center px-4 justify-between">
            <div className="text-xs text-gray-400 dark:text-neutral-400">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                9:21 | Front-end Developer
              </div>
            </div>
            <div className="flex space-x-4">
              <Info className="w-4 h-4 text-gray-300 dark:text-neutral-300" />
              <Users className="w-4 h-4 text-gray-300 dark:text-neutral-300" />
              <MessageCircle className="w-4 h-4 text-gray-300 dark:text-neutral-300" />
            </div>
          </div>
        </div>
        
        <div className="w-1/3 max-w-[140px] md:max-w-[180px] bg-white dark:bg-neutral-800 border-l border-gray-200 dark:border-neutral-700">
          <div className="flex justify-between items-center text-center p-2 border-b border-gray-200 dark:border-neutral-700">
            <h3 className="font-medium text-xs text-gray-800 dark:text-neutral-200 mx-auto">Nội dung trò chuyện</h3>
            <X className="w-4 h-4 text-gray-500 dark:text-neutral-500" />
          </div>
          
          <div className="p-2 overflow-auto h-[calc(100%-34px)]">
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-500 mb-1">AI</div>
              <p className="text-xs text-gray-700 dark:text-neutral-300">Chúng ta hãy chuyển sang câu hỏi kỹ thuật.</p>
            </div>
            
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-500 mb-1">AI</div>
              <p className="text-xs text-gray-700 dark:text-neutral-300">React là công nghệ quan trọng cho vị trí này.</p>
            </div>
            
            <div className="mb-2">
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-500 mb-1">Bạn</div>
              <div className="bg-[#007BFF] text-white p-1.5 rounded-md text-xs">
                State thay đổi được, props không.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#343A40] text-[#343A40] dark:text-[#FFFFFF] min-h-screen flex flex-col">
      {/* Navbar hover area - Modified to not overlap the actual navbar */}
      <div 
        ref={navbarAreaRef}
        className={`fixed top-[72px] left-0 w-full h-[38px] z-40 ${!isNavbarInView ? 'pointer-events-none' : ''}`}
      >
        <div 
          className={`w-full py-3 bg-gradient-to-r from-[#FFFFFF] to-[#007BFF]/5 dark:from-[#343A40] dark:to-[#343A40]/90 border-b border-[#343A40]/10 dark:border-[#FFFFFF]/10 shadow-sm transition-all duration-300 ${
            isHeaderVisible 
              ? "opacity-100 translate-y-0 visible" 
              : "opacity-0 -translate-y-2 invisible pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6 flex justify-center md:justify-end items-center">
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-[#007BFF] transition-colors font-medium flex items-center gap-2 text-sm">
                Trang chủ
              </a>
              <a href="#features" className="hover:text-[#007BFF] transition-colors font-medium flex items-center gap-2 text-sm">
                Tính năng
              </a>
              <a href="#how-it-works" className="hover:text-[#007BFF] transition-colors font-medium flex items-center gap-2 text-sm">
                Cách thức hoạt động
              </a>
              <a href="#testimonials" className="hover:text-[#007BFF] transition-colors font-medium flex items-center gap-2 text-sm">
                Đánh giá
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex flex-col flex-grow">
        {/* Hero Section - with enhanced background design and full viewport height */}
        <div className="w-full relative overflow-hidden min-h-[calc(100vh-246px)] flex items-center">
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
          
          {/* Content - adjusted for the new background */}
          <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 w-full grid md:grid-cols-2 gap-20 items-center py-12 md:py-16 relative z-10">
            <div className="flex flex-col items-start text-left max-w-2xl mx-auto md:ml-0">
            <h1 className="text-left text-3xl md:text-4xl lg:text-[42px] font-bold mb-6 text-[#343A40] dark:text-[#FFFFFF] leading-tight">
            Sẵn sàng chinh phục nhà tuyển dụng cùng <span className="text-[#007BFF]">inMentor</span>
          </h1>

              <p className="text-lg md:text-xl text-[#343A40]/80 dark:text-[#FFFFFF]/80 mb-8 leading-relaxed max-w-xl">
                 Mô phỏng phỏng vấn thực tế, nhận phân tích chi tiết và cải thiện kỹ năng phỏng vấn của bạn với công nghệ AI tiên tiến.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
                <Button
                  size="lg"
                  className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-[#FFFFFF] px-8 py-6 text-lg font-medium shadow-lg shadow-[#007BFF]/20 rounded-xl"
                  onClick={() => router.push('/virtualroom')}
                >
                  Bắt đầu cùng inMentor ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#343A40] dark:text-[#FFFFFF]">250K+</span>
                  <span className="text-sm text-[#343A40]/70 dark:text-[#FFFFFF]/70">Offers Received</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#343A40] dark:text-[#FFFFFF]">1.2M+</span>
                  <span className="text-sm text-[#343A40]/70 dark:text-[#FFFFFF]/70">Interviews Aced</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex justify-center items-center relative h-[400px] md:h-[450px] w-full">
              <div className="absolute top-0 right-0 w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-[#007BFF]/20 backdrop-blur-sm bg-white/40 dark:bg-[#343A40]/40">
                <div className="relative w-full h-full border border-[#343A40]/10 dark:border-[#FFFFFF]/10 rounded-xl">
                  {/* Using the InterviewIllustration component */}
                  <div className="relative w-full h-full">
                    <InterviewIllustration />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
         {/* Statistics Section */}
         <div className="bg-[#007BFF]/5 dark:bg-[#007BFF]/10 py-12 border-y border-[#007BFF]/10 dark:border-[#007BFF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Buổi phỏng vấn" },
                { value: "94%", label: "Tỷ lệ thành công" },
                { value: "120+", label: "Ngành nghề khác nhau" },
                { value: "5,000+", label: "Người dùng hài lòng" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#007BFF]">{stat.value}</p>
                  <p className="text-[#343A40]/70 dark:text-[#FFFFFF]/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

    
       

        {/* Features Section - Enhanced Version */}
        <div id="features" className="py-24 bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFF] dark:from-[#343A40] dark:to-[#252A30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Section Header with enhanced styling */}
            <div className="flex flex-col items-center max-w-3xl mx-auto mb-20 text-center">
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#343A40] via-[#2563EB] to-[#007BFF] dark:from-[#FFFFFF] dark:via-[#99C0FF] dark:to-[#007BFF] bg-clip-text text-transparent">
                Tính năng nổi bật
              </h2>
              <p className="text-lg md:text-xl text-[#343A40]/70 dark:text-[#FFFFFF]/70 leading-relaxed">
                Trải nghiệm phỏng vấn thực tế với công nghệ AI tiên tiến giúp bạn tự tin chinh phục nhà tuyển dụng
              </p>
            </div>
            
            {/* Primary Features - 3 Column Layout with Enhanced Cards */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Brain,
                  title: "Phân tích bằng AI",
                  color: "from-blue-500 to-indigo-600",
                  bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10",
                  borderColor: "border-blue-200 dark:border-blue-800",
                  shadowColor: "shadow-blue-500/5",
                  hoverShadow: "group-hover:shadow-blue-500/20",
                  description: "Nhận phản hồi chi tiết về câu trả lời, ngôn ngữ cơ thể và cách nói chuyện của bạn sau mỗi buổi phỏng vấn."
                },
                {
                  icon: Target,
                  title: "Tập trung theo ngành",
                  color: "from-purple-500 to-pink-600",
                  bg: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10",
                  borderColor: "border-purple-200 dark:border-purple-800",
                  shadowColor: "shadow-purple-500/5",
                  hoverShadow: "group-hover:shadow-purple-500/20",
                  description: "Luyện tập với các câu hỏi được điều chỉnh theo ngành nghề cụ thể từ hơn 120 lĩnh vực khác nhau."
                },
                {
                  icon: Users,
                  title: "Hướng dẫn trực tiếp",
                  color: "from-emerald-500 to-teal-600",
                  bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10",
                  borderColor: "border-emerald-200 dark:border-emerald-800",
                  shadowColor: "shadow-emerald-500/5",
                  hoverShadow: "group-hover:shadow-emerald-500/20",
                  description: "Nhận được gợi ý và hướng dẫn ngay trong quá trình phỏng vấn để liên tục cải thiện kỹ năng."
                }
              ].map((feature, index) => (
                <div key={index} 
                  className={`group flex flex-col rounded-2xl border ${feature.borderColor} ${feature.bg}
                    ${feature.shadowColor} shadow-xl hover:shadow-2xl transition-all duration-500 
                    overflow-hidden transform hover:-translate-y-2`}>
                  
                  {/* Card Header */}
                  <div className="px-6 pt-8 pb-6">
                    <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl w-14 h-14
                      flex items-center justify-center shadow-lg mb-6
                      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-[#343A40] dark:text-[#FFFFFF] group-hover:text-[#007BFF] dark:group-hover:text-[#007BFF] transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-[#343A40]/70 dark:text-[#FFFFFF]/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Card Footer with Learn More button */}
                  <div className="mt-auto p-6 pt-4 border-t border-[#343A40]/10 dark:border-[#FFFFFF]/10">
                    <button className="text-[#007BFF] font-medium flex items-center transition-colors hover:text-[#0056b3] dark:hover:text-[#99C0FF]">
                      <span>Tìm hiểu thêm</span>
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Centered Feature Highlight */}
            <div className="mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#007BFF]/5 dark:bg-[#007BFF]/10 rounded-3xl -z-10"></div>
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#007BFF]/10 to-transparent rounded-full blur-3xl transform -translate-y-1/4 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#007BFF]/10 to-transparent rounded-full blur-3xl transform translate-y-1/4 -translate-x-1/4"></div>
              </div>
              
              <div className="py-16 px-8 md:px-12 rounded-3xl relative">
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#343A40] dark:text-[#FFFFFF]">
                    Nền tảng <span className="text-[#007BFF]">toàn diện</span> cho sự phát triển nghề nghiệp
                  </h3>
                  <p className="text-lg text-[#343A40]/70 dark:text-[#FFFFFF]/70 max-w-2xl mx-auto">
                    inMentor không chỉ giúp bạn vượt qua phỏng vấn mà còn xây dựng các kỹ năng mềm cần thiết để thành công trong sự nghiệp
                  </p>
                </div>
                
                {/* Feature Grid with 4 Items */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <BarChart className="h-5 w-5 text-[#007BFF]" />,
                      title: "Theo dõi tiến độ",
                      description: "Phân tích dữ liệu chi tiết về quá trình cải thiện kỹ năng của bạn"
                    },
                    {
                      icon: <CheckCircle className="h-5 w-5 text-[#007BFF]" />,
                      title: "Thư viện câu hỏi",
                      description: "Hơn 5,000 câu hỏi phỏng vấn thực tế từ các công ty hàng đầu"
                    },
                    {
                      icon: <Clock className="h-5 w-5 text-[#007BFF]" />,
                      title: "Luyện tập linh hoạt",
                      description: "Buổi phỏng vấn từ 15 đến 60 phút tùy theo thời gian của bạn"
                    },
                    {
                      icon: <Award className="h-5 w-5 text-[#007BFF]" />,
                      title: "Chứng chỉ kỹ năng",
                      description: "Nhận chứng chỉ sau khi hoàn thành các bài đánh giá"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-[#343A40]/50 rounded-xl p-6 border border-[#343A40]/10 dark:border-[#FFFFFF]/10 hover:border-[#007BFF]/30 dark:hover:border-[#007BFF]/30 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="bg-[#007BFF]/10 dark:bg-[#007BFF]/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-[#343A40] dark:text-[#FFFFFF]">{item.title}</h4>
                      <p className="text-sm text-[#343A40]/70 dark:text-[#FFFFFF]/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Additional benefits with comparison columns */}
            <div className="mt-24 grid md:grid-cols-2 gap-10">
              {/* Left column */}
              <div className="flex flex-col space-y-8">
                <div className="bg-white dark:bg-[#343A40]/50 rounded-xl overflow-hidden border border-[#343A40]/10 dark:border-[#FFFFFF]/10 shadow-lg">
                  <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] p-5">
                    <h3 className="text-xl font-bold text-white">Cho người tìm việc</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {[
                      "Luyện tập phỏng vấn không giới hạn",
                      "Thư viện câu hỏi theo ngành nghề",
                      "Phân tích chi tiết điểm mạnh, điểm yếu",
                      "Gợi ý cải thiện cụ thể cho từng câu trả lời",
                      "Bộ sưu tập mẫu câu trả lời hiệu quả"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#007BFF] mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-[#343A40]/80 dark:text-[#FFFFFF]/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0056b3] to-[#007BFF] rounded-xl p-6 text-white shadow-lg">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <h3 className="text-xl font-bold mb-4 relative z-10">Giúp bạn tự tin hơn</h3>
                  <p className="mb-4 text-white/90 relative z-10">
                    94% người dùng cảm thấy tự tin hơn sau 5 buổi phỏng vấn thử với inMentor
                  </p>
                  <Button 
                    className="bg-white text-[#007BFF] hover:bg-white/90 border-none relative z-10"
                    onClick={() => router.push('/signup')}
                  >
                    Bắt đầu ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Right column */}
              <div className="flex flex-col space-y-8">
                <div className="bg-white dark:bg-[#343A40]/50 rounded-xl overflow-hidden border border-[#343A40]/10 dark:border-[#FFFFFF]/10 shadow-lg">
                  <div className="bg-gradient-to-r from-[#343A40] to-[#1a1d20] dark:from-[#4a5361] dark:to-[#343A40] p-5">
                    <h3 className="text-xl font-bold text-white">Cho doanh nghiệp</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {[
                      "Đánh giá ứng viên một cách khách quan",
                      "Tiết kiệm thời gian sàng lọc ứng viên",
                      "Phân tích chi tiết về kỹ năng ứng viên",
                      "Tùy chỉnh quy trình phỏng vấn theo công ty",
                      "Trải nghiệm nhất quán cho tất cả ứng viên"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#007BFF] mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-[#343A40]/80 dark:text-[#FFFFFF]/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#343A40]/50 p-6 rounded-xl border border-[#343A40]/10 dark:border-[#FFFFFF]/10 shadow-lg flex flex-col justify-between h-[calc(100%-16px)]">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="h-6 w-6 text-yellow-500" />
                      <h3 className="text-xl font-bold text-[#343A40] dark:text-[#FFFFFF]">Cải thiện không ngừng</h3>
                    </div>
                    <p className="text-[#343A40]/70 dark:text-[#FFFFFF]/70 mb-4">
                      AI phân tích từng câu trả lời và đề xuất cách cải thiện cụ thể. Sau mỗi buổi phỏng vấn, bạn sẽ nhận được báo cáo đánh giá chi tiết.
                    </p>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <a href="#" className="text-[#007BFF] hover:text-[#0056b3] dark:hover:text-[#99C0FF] font-medium flex items-center">
                      <span>Xem ví dụ phân tích</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div id="how-it-works" className="py-20 bg-[#FFFFFF] dark:bg-[#343A40]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#343A40] to-[#007BFF] dark:from-[#FFFFFF] dark:to-[#007BFF] bg-clip-text text-transparent inline-block">Cách thức hoạt động</h2>
              <p className="text-lg text-[#343A40]/70 dark:text-[#FFFFFF]/70 max-w-2xl mx-auto">
                Chỉ với vài bước đơn giản, bạn đã có thể bắt đầu luyện tập phỏng vấn với inMentor
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Chọn ngành nghề",
                  description: "Lựa chọn lĩnh vực bạn muốn phỏng vấn từ hơn 120 ngành nghề khác nhau"
                },
                {
                  icon: Clock,
                  title: "Bắt đầu phỏng vấn",
                  description: "Tham gia buổi phỏng vấn thử với AI phỏng vấn viên được huấn luyện chuyên biệt"
                },
                {
                  icon: BarChart,
                  title: "Nhận phân tích chi tiết",
                  description: "Xem báo cáo đánh giá chi tiết và những gợi ý để cải thiện"
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col p-6 bg-[#FFFFFF] dark:bg-[#343A40]/50 rounded-xl border border-[#343A40]/10 dark:border-[#FFFFFF]/10 h-full">
                    <div className="flex items-center mb-6">
                      <div className="bg-[#007BFF]/10 dark:bg-[#007BFF]/20 text-[#007BFF] font-bold h-10 w-10 rounded-full flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-[#343A40] dark:text-[#FFFFFF]">{step.title}</h3>
                    </div>
                    <p className="text-[#343A40]/70 dark:text-[#FFFFFF]/70 leading-relaxed">{step.description}</p>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-12 right-[-30px] z-10">
                        <ChevronRight className="h-6 w-6 text-[#007BFF]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button
                variant="default"
                size="lg"
                className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-[#FFFFFF] px-8 py-6 shadow-lg shadow-[#007BFF]/20"
                onClick={() => router.push('/virtualroom')}
              >
                Thử ngay bây giờ
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="py-20 bg-[#007BFF]/5 dark:bg-[#007BFF]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#343A40] to-[#007BFF] dark:from-[#FFFFFF] dark:to-[#007BFF] bg-clip-text text-transparent inline-block">Người dùng nói gì về chúng tôi</h2>
              <p className="text-lg text-[#343A40]/70 dark:text-[#FFFFFF]/70 max-w-2xl mx-auto">
                Hàng nghìn người đã cải thiện kỹ năng phỏng vấn và tìm được công việc lý tưởng với inMentor
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Software Engineer tại Google",
                  content: "inMentor đã giúp tôi chuẩn bị tốt cho các buổi phỏng vấn kỹ thuật. Phản hồi chi tiết giúp tôi hiểu được điểm yếu và cải thiện nhanh chóng.",
                  rating: 5
                },
                {
                  name: "Trần Thị B",
                  role: "Marketing Manager tại Shopee",
                  content: "Tôi đã thử nhiều nền tảng khác nhưng inMentor thực sự nổi bật với trải nghiệm thực tế và phân tích chuyên sâu. Đây là công cụ tuyệt vời cho mọi ứng viên.",
                  rating: 5
                },
                {
                  name: "Lê Văn C",
                  role: "Product Manager tại Tiki",
                  content: "Các câu hỏi được tùy chỉnh theo ngành rất sát với thực tế. Sau 2 tuần luyện tập, tôi đã tự tin hơn rất nhiều và nhận được offer trong lần phỏng vấn đầu tiên.",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#FFFFFF] dark:bg-[#343A40]/50 p-6 rounded-xl shadow-lg border border-[#343A40]/10 dark:border-[#FFFFFF]/10">
                  <div className="flex items-center mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[#343A40]/80 dark:text-[#FFFFFF]/80 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="bg-[#007BFF] h-10 w-10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#FFFFFF] font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#343A40] dark:text-[#FFFFFF]">{testimonial.name}</p>
                      <p className="text-sm text-[#343A40]/70 dark:text-[#FFFFFF]/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="bg-[#007BFF] dark:bg-[#007BFF]/90 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF] via-[#007BFF]/80 to-[#007BFF]/60"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-block bg-[#FFFFFF] dark:bg-[#FFFFFF]/20 rounded-full p-3 mb-6">
                <Award className="h-8 w-8 text-[#007BFF] dark:text-[#FFFFFF]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFFFFF]">Sẵn sàng nâng cao kỹ năng phỏng vấn?</h2>
              <p className="text-[#FFFFFF]/90 mb-10 text-lg">
                Tham gia cùng hàng nghìn ứng viên thành công đã làm chủ kỹ năng phỏng vấn với nền tảng AI của chúng tôi.
              </p>
              <Button
                size="lg"
                className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/90 text-[#007BFF] px-8 py-6 text-lg font-bold shadow-lg shadow-[#007BFF]/20 rounded-full"
                onClick={() => router.push('/signup')}
              >
                Bắt đầu ngay hôm nay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section has been removed */}
    </div>
  );
}
