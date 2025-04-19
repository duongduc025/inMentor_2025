'use client';
import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown,
  ChevronRight,
  BarChart2,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  MessageSquare,
  Lightbulb,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from '@/context/AuthContext'; 

interface CVEvaluatorProps {
  onComplete: () => void;
  processData: any;
}

const CVEvaluator = ({ onComplete, processData }: CVEvaluatorProps) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Input, 2: Loading, 3: Results
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { getToken } = useAuth();

  // Custom color scheme
  const colors = {
    primary: "#007BFF",
    white: "#FFFFFF",
    darkGray: "#343A40",
    success: "#10B981", // Green for strengths
    warning: "#F59E0B", // Amber for weaknesses
    danger: "#DC3545",
    info: "#6B7280"
  };
  
  // Updated mock evaluation result based on the new structure
  const mockEvaluationResult = {
    id: "d3b07384-d9a4-41e3-bb8b-6f1f9c7e3b2b",
    process_id: "c9a646e0-7a1f-4b2e-8eaa-ef4c1b2a6e9c",
    match_percentage: 92,
    summary: "Ứng viên thể hiện sự nổi bật về cả kiến thức chuyên môn lẫn kỹ năng mềm. Với hơn 5 năm kinh nghiệm phát triển web hiện đại sử dụng React và Node.js, ứng viên đã tham gia nhiều dự án quy mô lớn, từng đảm nhận vai trò quản lý nhóm và luôn hoàn thành tốt các mục tiêu được giao. Ứng viên có khả năng thích nghi nhanh với môi trường Agile, chủ động cập nhật công nghệ mới và sở hữu kỹ năng giao tiếp, phối hợp nhóm hiệu quả. Tuy nhiên, ứng viên cần bổ sung thêm kinh nghiệm làm việc quốc tế và nâng cao kỹ năng thuyết trình để sẵn sàng cho các vị trí lãnh đạo cấp cao hơn.",
    strengths: [
      "5 năm kinh nghiệm phát triển web với React và Node.js, từng triển khai các hệ thống lớn cho doanh nghiệp trong và ngoài nước.",
      "Đã từng làm việc với các dự án quy mô lớn, đảm nhận vai trò quản lý team từ 5-10 người, giúp dự án đạt đúng tiến độ và chất lượng cao.",
      "Kỹ năng giao tiếp tốt, kinh nghiệm làm việc trong môi trường Agile/Scrum, phối hợp hiệu quả giữa các phòng ban và khách hàng.",
      "Khả năng tự học, chủ động cập nhật công nghệ mới như TypeScript, CI/CD, Cloud Services.",
      "Tư duy giải quyết vấn đề nhanh nhạy và luôn sẵn sàng chia sẻ kiến thức với đồng nghiệp."
    ],
    weaknesses: [
      "Chưa từng có kinh nghiệm làm việc trực tiếp với khách hàng quốc tế, cần cải thiện kỹ năng tiếng Anh giao tiếp chuyên sâu.",
      "Kỹ năng thuyết trình trước đông người còn hạn chế, đôi khi gặp khó khăn khi trình bày ý tưởng phức tạp cho lãnh đạo cấp cao.",
      "Chưa có chứng chỉ chuyên sâu về quản lý dự án (như PMP), nên cân nhắc bổ sung nếu muốn phát triển lên các vị trí quản lý cấp cao."
    ],
    skills_match: {
      "React": true,
      "Node.js": true,
      "TypeScript": true,
      "SQL": true,
      "Communication": true,
      "Agile Methodology": true
    },
    experience_match: {
      "Web Developer": "5 năm",
      "Team Leader": "2 năm",
      "Project Manager": "1 năm"
    },
    education_match: {
      "Bachelor of Information Technology": {
        match: true,
        review: "Tốt nghiệp loại Giỏi ngành Công nghệ Thông tin, trường Đại học Bách Khoa Hà Nội, có nền tảng kiến thức vững chắc về lập trình, hệ thống thông tin và quản trị dự án phần mềm."
      },
      "Master of Business Administration": {
        match: false,
        review: "Chưa có bằng thạc sĩ, tuy nhiên ứng viên thể hiện tiềm năng phát triển lên các vị trí quản lý nếu tiếp tục học tập nâng cao."
      }
    },
    certifications: [
      "AWS Certified Developer – Associate",
      "Microsoft Certified: Azure Developer Associate"
    ],
    projects: [
      "Phát triển hệ thống e-commerce cho ABC Corp với hơn 2 triệu người dùng",
      "Xây dựng nền tảng quản lý nhân sự tích hợp AI cho doanh nghiệp vừa và nhỏ",
      "Triển khai hệ thống quản lý tài liệu nội bộ trên nền tảng cloud"
    ],
    soft_skills_match: {
      "Teamwork": true,
      "Adaptability": true,
      "Creativity": true,
      "Problem Solving": true
    },
    layout_score: 9,
    career_objective: {
      objective: "Trở thành chuyên gia phát triển web full-stack, dẫn dắt đội nhóm kỹ thuật và tham gia vào các dự án quốc tế trong 3 năm tới."
    },
    recommendations: [
      "Nên tăng cường kỹ năng tiếng Anh giao tiếp, đặc biệt là giao tiếp chuyên sâu trong môi trường quốc tế để mở rộng cơ hội nghề nghiệp.",
      "Chủ động tham gia các khóa học hoặc lấy chứng chỉ về quản lý dự án như PMP hoặc Scrum Master để chuẩn bị cho các vị trí quản lý cấp cao.",
      "Tăng cường kỹ năng thuyết trình và trình bày ý tưởng, có thể tham gia các câu lạc bộ Toastmasters hoặc các khóa học về public speaking.",
      "Tiếp tục cập nhật các công nghệ mới trong lĩnh vực web, đặc biệt là các giải pháp cloud, DevOps và bảo mật.",
      "Chia sẻ kinh nghiệm, mentoring cho các thành viên mới trong team để phát triển năng lực lãnh đạo và đóng góp cho sự phát triển chung của tổ chức."
    ],
    created_at: "2024-04-19T13:00:00Z",
    updated_at: "2024-04-19T13:01:00Z"
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setCurrentStep(2);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalyzeProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setEvaluationResult(mockEvaluationResult);
        setIsLoading(false);
        setCurrentStep(3);
      }
    }, 150);
    
    // In a real implementation you would call your API here
  };

  // Function to handle proceeding to interview stage
  const handleProceedToInterview = () => {
    try {
      setIsProcessing(true);
      
      console.log("Proceeding to interview stage for process:", processData.id);
      onComplete();
    } catch (error) {
      console.error("Error proceeding to interview:", error);
      // Handle error appropriately - you might want to show a toast or error message
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCvFile(null);
    setJobDescription('');
    setEvaluationResult(null);
    setCurrentStep(1);
    setAnalyzeProgress(0);
  };

  if (currentStep === 3 && evaluationResult) {
    return (
      <div className="w-full min-h-screen relative">
        {/* Background with modern design elements - full width */}
        <div className="absolute inset-0 z-0 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-[#1a1d20] dark:via-[#25292e] dark:to-[#343A40]"></div>
          
          {/* Decorative elements - enhanced visibility */}
          <div className="absolute top-[5%] left-[5%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] bg-indigo-400/20 dark:bg-indigo-500/30 rounded-full blur-3xl"></div>
          
          {/* Grid patterns */}
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" 
               style={{ 
                 backgroundImage: "radial-gradient(#007BFF 1px, transparent 1px)", 
                 backgroundSize: "30px 30px" 
               }}>
          </div>
        </div>
        
        {/* Content container - centered with max width */}
        <div className="mx-auto py-12 px-4 max-w-6xl relative z-10" style={{ color: colors.darkGray }}>          
          <Card className="max-w-5xl mx-auto backdrop-blur-sm bg-white/80 shadow-lg border-0 relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle style={{ color: colors.primary }}>Kết quả đánh giá</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetForm}
                  className="hover:bg-blue-100 transition-colors"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Đánh giá CV khác
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{evaluationResult.match_percentage}%</span>
                  </div>
                  <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={
                        evaluationResult.match_percentage >= 70 ? colors.success :
                        evaluationResult.match_percentage >= 40 ? colors.warning :
                        colors.danger
                      }
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${evaluationResult.match_percentage * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">Mức độ phù hợp</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {evaluationResult.match_percentage >= 70
                      ? 'CV của ứng viên phù hợp tốt với vị trí này'
                      : evaluationResult.match_percentage >= 40
                      ? 'CV của ứng viên phù hợp một phần với vị trí này'
                      : 'CV của ứng viên chưa phù hợp với vị trí này'}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge style={{ 
                      backgroundColor: evaluationResult.match_percentage >= 70 ? colors.success : 
                                      evaluationResult.match_percentage >= 40 ? colors.warning : 
                                      colors.danger,
                      color: colors.white 
                    }}>
                      {evaluationResult.match_percentage >= 70
                        ? 'Phù hợp cao'
                        : evaluationResult.match_percentage >= 40
                        ? 'Phù hợp trung bình'
                        : 'Phù hợp thấp'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <Separator className="my-2" style={{ backgroundColor: '#e5e7eb' }} />
            
            <ScrollArea className="h-[calc(100vh-320px)]">
              <CardContent className="pt-4">
                <Tabs defaultValue="summary">
                  <TabsList className="grid grid-cols-5 mb-4 bg-[#f8f9fa]/60 backdrop-blur-sm rounded-lg">
                    <TabsTrigger 
                      value="summary" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Tổng quan
                    </TabsTrigger>
                    <TabsTrigger 
                      value="skills" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Kỹ năng
                    </TabsTrigger>
                    <TabsTrigger 
                      value="experience" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Kinh nghiệm
                    </TabsTrigger>
                    <TabsTrigger 
                      value="education" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Học vấn
                    </TabsTrigger>
                    <TabsTrigger 
                      value="recommendations" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Đề xuất
                    </TabsTrigger>
                  </TabsList>

                  {/* Summary Tab */}
                  <TabsContent value="summary" className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border shadow-sm" style={{ borderColor: colors.primary, borderLeft: `4px solid ${colors.primary}` }}>
                      <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                        <MessageSquare className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        Tóm tắt đánh giá
                      </h3>
                      <p className="text-sm">{evaluationResult.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-white/60 backdrop-blur-sm shadow-sm" style={{ borderColor: colors.success }}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center" style={{ color: colors.success }}>
                            <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                            Điểm mạnh
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            {evaluationResult.strengths.map((strength: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.success }} />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/60 backdrop-blur-sm shadow-sm" style={{ borderColor: colors.warning }}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center" style={{ color: colors.warning }}>
                            <AlertCircle className="h-4 w-4 mr-2" style={{ color: colors.warning }} />
                            Điểm yếu
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="text-sm space-y-2">
                            {evaluationResult.weaknesses.map((weakness: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors.warning }} />
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Layout Score and Career Objective */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-white/60 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center" style={{ color: colors.primary }}>
                            <BarChart2 className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Đánh giá bố cục CV
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Điểm bố cục:</span>
                            <Badge style={{ backgroundColor: colors.primary }}>{evaluationResult.layout_score}/10</Badge>
                          </div>
                          <Progress value={evaluationResult.layout_score * 10} className="h-2" />
                          <p className="text-xs mt-2 text-gray-500">
                            {evaluationResult.layout_score >= 8 ? 'CV có bố cục rõ ràng, dễ đọc và chuyên nghiệp.' : 
                             evaluationResult.layout_score >= 6 ? 'CV có bố cục khá tốt nhưng có thể cải thiện thêm.' :
                             'CV cần cải thiện bố cục để dễ đọc và chuyên nghiệp hơn.'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white/60 backdrop-blur-sm shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center" style={{ color: colors.primary }}>
                            <Award className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Mục tiêu nghề nghiệp
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm italic mb-2">"{evaluationResult.career_objective.objective}"</p>
                          <p className="text-xs text-gray-500">Mục tiêu nghề nghiệp rõ ràng, phù hợp với vị trí và thể hiện định hướng phát triển.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Skills Tab */}
                  <TabsContent value="skills" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Hard Skills */}
                      <div className="space-y-3">
                        <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                          <Code className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                          Kỹ năng chuyên môn
                        </h3>
                        <div className="space-y-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                          {Object.entries(evaluationResult.skills_match)
                            .filter(([key]) => !['Communication', 'Agile Methodology'].includes(key))
                            .map(([skill, match], index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/80" 
                                style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(248, 249, 250, 0.6)' }}
                              >
                                <div className="flex items-center">
                                  {match ? (
                                    <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                                  ) : (
                                    <XCircle className="h-4 w-4 mr-2" style={{ color: colors.danger }} />
                                  )}
                                  <span className="text-sm font-medium">{skill}</span>
                                </div>
                                <Badge style={{ 
                                  backgroundColor: match ? colors.success : colors.danger,
                                  color: colors.white
                                }}>
                                  {match ? 'Phù hợp' : 'Thiếu'}
                                </Badge>
                              </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Soft Skills */}
                      <div className="space-y-3">
                        <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                          <MessageSquare className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                          Kỹ năng mềm
                        </h3>
                        <div className="space-y-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                          {Object.entries(evaluationResult.soft_skills_match).map(([skill, match], index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/80" 
                              style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(248, 249, 250, 0.6)' }}
                            >
                              <div className="flex items-center">
                                {match ? (
                                  <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                                ) : (
                                  <XCircle className="h-4 w-4 mr-2" style={{ color: colors.danger }} />
                                )}
                                <span className="text-sm font-medium">{skill}</span>
                              </div>
                              <Badge style={{ 
                                backgroundColor: match ? colors.success : colors.danger,
                                color: colors.white
                              }}>
                                {match ? 'Phù hợp' : 'Thiếu'}
                              </Badge>
                            </div>
                          ))}
                          {/* Include relevant skills from skills_match that are soft skills */}
                          {Object.entries(evaluationResult.skills_match)
                            .filter(([key]) => ['Communication', 'Agile Methodology'].includes(key))
                            .map(([skill, match], index) => (
                              <div 
                                key={`soft-${index}`}
                                className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/80" 
                                style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(248, 249, 250, 0.6)' }}
                              >
                                <div className="flex items-center">
                                  {match ? (
                                    <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                                  ) : (
                                    <XCircle className="h-4 w-4 mr-2" style={{ color: colors.danger }} />
                                  )}
                                  <span className="text-sm font-medium">{skill}</span>
                                </div>
                                <Badge style={{ 
                                  backgroundColor: match ? colors.success : colors.danger,
                                  color: colors.white
                                }}>
                                  {match ? 'Phù hợp' : 'Thiếu'}
                                </Badge>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Experience Tab */}
                  <TabsContent value="experience" className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-3 flex items-center" style={{ color: colors.primary }}>
                        <Briefcase className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                        Đánh giá kinh nghiệm làm việc
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="text-sm font-medium">Chi tiết kinh nghiệm</div>
                          {Object.entries(evaluationResult.experience_match).map(([position, years], index) => (
                            <div 
                              key={index} 
                              className="p-3 bg-white/70 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-medium">{position}</h4>
                                  <p className="text-xs text-gray-500">Thời gian làm việc: {years}</p>
                                </div>
                                <Badge style={{ backgroundColor: colors.success, color: colors.white }}>
                                  Phù hợp
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="text-sm font-medium">Dự án nổi bật</div>
                          {evaluationResult.projects.map((project: string, index: number) => (
                            <div 
                              key={index} 
                              className="p-3 bg-white/70 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5" style={{ color: colors.success }} />
                                <p className="text-sm">{project}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Education Tab */}
                  <TabsContent value="education" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                        <h3 className="font-medium mb-3 flex items-center" style={{ color: colors.primary }}>
                          <GraduationCap className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                          Học vấn
                        </h3>
                        
                        <div className="space-y-3">
                          {Object.entries(evaluationResult.education_match).map(([degree, details]: [string, any], index: number) => (
                            <div key={index} className="p-3 bg-white/70 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-sm font-medium">{degree}</h4>
                                </div>
                                <Badge style={{ 
                                  backgroundColor: details.match ? colors.success : colors.warning,
                                  color: colors.white 
                                }}>
                                  {details.match ? 'Phù hợp' : 'Chưa có'}
                                </Badge>
                              </div>
                              <p className="text-xs">{details.review}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                        <h3 className="font-medium mb-3 flex items-center" style={{ color: colors.primary }}>
                          <Award className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                          Chứng chỉ
                        </h3>
                        
                        <div className="space-y-2">
                          {evaluationResult.certifications.length > 0 ? (
                            evaluationResult.certifications.map((cert: string, index: number) => (
                              <div 
                                key={index} 
                                className="p-3 bg-white/70 rounded-lg flex items-start"
                              >
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5" style={{ color: colors.success }} />
                                <p className="text-sm">{cert}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 bg-white/70 rounded-lg text-center">
                              <p className="text-sm text-gray-500">Không có chứng chỉ nào được đề cập trong CV</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Recommendations Tab */}
                  <TabsContent value="recommendations" className="space-y-4">
                    <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <Lightbulb className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                      Đề xuất cải thiện
                    </h3>
                    
                    <div className="p-4 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" style={{ borderColor: colors.primary, borderWidth: '1px' }}>
                      <ul className="text-sm space-y-3">
                        {evaluationResult.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="flex items-start group hover:bg-white/80 p-2 rounded-md transition-colors">
                            <div style={{ 
                              minWidth: '24px', 
                              height: '24px', 
                              backgroundColor: colors.primary, 
                              color: colors.white,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '12px',
                              marginTop: '2px',
                              transition: 'transform 0.2s'
                            }} className="group-hover:scale-110">
                              {index + 1}
                            </div>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50/60 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-700 mb-1">Lưu ý về đánh giá</h4>
                          <p className="text-xs text-blue-600">
                            Đánh giá này được thực hiện tự động dựa trên các thông tin trong CV và mô tả công việc. 
                            Kết quả chỉ mang tính tham khảo và nên được kết hợp với đánh giá của nhà tuyển dụng.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </ScrollArea>
            
            {/* Add proceed button at the bottom */}
            <div className="flex justify-end p-4 border-t border-gray-200 mt-4">
              <Button 
                onClick={handleProceedToInterview}
                className="bg-green-600 hover:bg-green-700 text-white transition-all"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-pulse">Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    Tiến hành phỏng vấn
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative">
      {/* Background with modern design elements - full width */}
      <div className="absolute inset-0 z-0 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-[#1a1d20] dark:via-[#25292e] dark:to-[#343A40]"></div>
        
        {/* Decorative elements - enhanced visibility */}
        <div className="absolute top-[5%] left-[5%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] bg-indigo-400/20 dark:bg-indigo-500/30 rounded-full blur-3xl"></div>
        
        {/* Grid patterns */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]" 
             style={{ 
               backgroundImage: "radial-gradient(#007BFF 1px, transparent 1px)", 
               backgroundSize: "30px 30px" 
             }}>
        </div>
      </div>
      
      {/* Content container - centered with max width */}
      <div className="mx-auto py-8 px-4 max-w-6xl relative z-10" style={{ color: colors.darkGray }}>
        <h1 className="text-3xl font-bold mb-8 text-center relative" style={{ color: colors.primary }}>Đánh giá CV</h1>
        
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Input Section */}
            <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
              <CardHeader>
                <CardTitle style={{ color: colors.primary }}>Tải lên CV</CardTitle>
                <CardDescription>Hỗ trợ định dạng PDF, DOCX (tối đa 5MB)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-white/90 transition-colors" 
                    style={{ borderColor: colors.primary }}>
                  <input
                    type="file"
                    id="cv-upload"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-2" style={{ color: colors.primary }} />
                    <p className="text-sm font-medium">
                      {cvFile ? cvFile.name : 'Kéo và thả hoặc click để tải lên CV'}
                    </p>
                    {cvFile && (
                      <Badge className="mt-2" style={{ backgroundColor: colors.primary, color: colors.white }}>
                        <CheckCircle className="h-3 w-3 mr-1" /> Đã tải lên
                      </Badge>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
              <CardHeader>
                <CardTitle style={{ color: colors.primary }}>Mô tả công việc (JD)</CardTitle>
                <CardDescription>Nhập mô tả công việc để so sánh với CV</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Dán mô tả công việc vào đây..." 
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  style={{ borderColor: colors.primary }}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleSubmit} 
                  disabled={!cvFile || !jobDescription || isLoading}
                  className="w-full md:w-auto transition-all hover:scale-105"
                  style={{ backgroundColor: colors.primary, color: colors.white }}
                >
                  {isLoading ? 'Đang đánh giá...' : 'Đánh giá CV'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-center" style={{ color: colors.primary }}>Đang phân tích CV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center p-6">
                <FileText className="h-16 w-16 mb-4 animate-pulse" style={{ color: colors.primary }} />
                <div className="w-full max-w-md relative h-2 mb-4 bg-slate-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-300" 
                       style={{ width: `${analyzeProgress}%`, backgroundColor: colors.primary }}></div>
                </div>
                <p className="text-center text-sm mt-4">
                  {analyzeProgress < 30 && "Đang tải lên và xử lý CV..."}
                  {analyzeProgress >= 30 && analyzeProgress < 60 && "Đang phân tích kỹ năng và kinh nghiệm..."}
                  {analyzeProgress >= 60 && analyzeProgress < 90 && "Đang so sánh với mô tả công việc..."}
                  {analyzeProgress >= 90 && "Đang hoàn tất đánh giá..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CVEvaluator;