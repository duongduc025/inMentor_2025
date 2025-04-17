'use client';
import React, { useState } from 'react';
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
  
  // Mock evaluation result for demonstration
  const mockEvaluationResult = {
    overallScore: 78,
    matchPercentage: 78,
    summary: "CV này phù hợp với 78% yêu cầu công việc. Ứng viên có kinh nghiệm tốt về React và Node.js, nhưng thiếu kinh nghiệm với AWS và Docker như yêu cầu trong JD.",
    strengths: [
      "5 năm kinh nghiệm phát triển web với React và Node.js",
      "Đã từng làm việc với các dự án quy mô lớn và quản lý team",
      "Kỹ năng giao tiếp tốt và kinh nghiệm làm việc trong môi trường Agile"
    ],
    weaknesses: [
      "Thiếu kinh nghiệm với AWS và Docker như yêu cầu trong JD",
      "Chưa có chứng chỉ về cloud computing",
      "Kinh nghiệm với CI/CD pipeline còn hạn chế"
    ],
    skillsMatch: [
      { name: "React", required: true, present: true, level: "Cao" },
      { name: "Node.js", required: true, present: true, level: "Cao" },
      { name: "TypeScript", required: true, present: true, level: "Trung bình" },
      { name: "AWS", required: true, present: false, level: "Không có" },
      { name: "Docker", required: true, present: false, level: "Không có" },
      { name: "CI/CD", required: true, present: true, level: "Thấp" },
      { name: "Agile", required: true, present: true, level: "Cao" }
    ],
    experienceMatch: {
      yearsRequired: 3,
      yearsPresent: 5,
      relevanceScore: 85
    },
    educationMatch: {
      degreeRequired: "Cử nhân Khoa học Máy tính hoặc tương đương",
      degreePresent: "Cử nhân Khoa học Máy tính",
      relevanceScore: 100
    },
    recommendations: [
      "Bổ sung kinh nghiệm với AWS và Docker vào CV",
      "Làm nổi bật các dự án có sử dụng CI/CD pipeline",
      "Thêm các chứng chỉ liên quan đến cloud computing nếu có"
    ]
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
  const handleProceedToInterview = async () => {
    try {
      // In a real app, you would save the CV assessment result to your backend
      console.log("Saving CV assessment for process:", processData.id);
      
      // Call the onComplete callback to update the process status
      onComplete();
    } catch (error) {
      console.error("Error saving CV assessment:", error);
      // Handle error appropriately
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
          
          {/* Additional decorative elements similar to landing page */}
          <div className="absolute top-[40%] right-[15%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-purple-400/15 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[30%] left-[10%] w-[20vw] h-[20vw] max-w-[350px] max-h-[350px] bg-sky-400/15 dark:bg-sky-500/20 rounded-full blur-3xl"></div>
          
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
                    <span className="text-2xl font-bold">{evaluationResult.matchPercentage}%</span>
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
                        evaluationResult.matchPercentage >= 70 ? colors.success :
                        evaluationResult.matchPercentage >= 40 ? colors.warning :
                        colors.danger
                      }
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${evaluationResult.matchPercentage * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">Mức độ phù hợp</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {evaluationResult.matchPercentage >= 70
                      ? 'CV của bạn phù hợp tốt với vị trí này'
                      : evaluationResult.matchPercentage >= 40
                      ? 'CV của bạn phù hợp một phần với vị trí này'
                      : 'CV của bạn chưa phù hợp với vị trí này'}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge style={{ 
                      backgroundColor: evaluationResult.matchPercentage >= 70 ? colors.success : 
                                      evaluationResult.matchPercentage >= 40 ? colors.warning : 
                                      colors.danger,
                      color: colors.white 
                    }}>
                      {evaluationResult.matchPercentage >= 70
                        ? 'Phù hợp cao'
                        : evaluationResult.matchPercentage >= 40
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
                  <TabsList className="grid grid-cols-4 mb-4 bg-[#f8f9fa]/60 backdrop-blur-sm rounded-lg">
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
                      value="details" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Chi tiết
                    </TabsTrigger>
                    <TabsTrigger 
                      value="recommendations" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Đề xuất
                    </TabsTrigger>
                  </TabsList>

                  
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
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4">
                    <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <Code className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                      Đánh giá kỹ năng
                    </h3>
                    
                    <div className="space-y-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                      {evaluationResult.skillsMatch.map((skill: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/80" 
                            style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(248, 249, 250, 0.6)' }}>
                          <div className="flex items-center">
                            {skill.present ? (
                              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" style={{ color: colors.danger }} />
                            )}
                            <span className="text-sm font-medium">{skill.name}</span>
                            {skill.required && (
                              <Badge variant="outline" className="ml-2 text-xs" style={{ borderColor: colors.primary }}>
                                Yêu cầu
                              </Badge>
                            )}
                          </div>
                          <Badge style={{ 
                            backgroundColor: skill.level === "Cao" ? colors.success : 
                                          skill.level === "Trung bình" ? colors.info : 
                                          skill.level === "Thấp" ? colors.warning : colors.danger,
                            color: colors.white
                          }}>
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full bg-white/60 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                      <AccordionItem value="experience" className="border-b border-slate-200">
                        <AccordionTrigger className="text-sm font-medium py-2 hover:bg-white/40 px-2 rounded" style={{ color: colors.darkGray }}>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Kinh nghiệm làm việc
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-3">
                          <div className="space-y-2 pl-6">
                            <div className="flex justify-between text-sm">
                              <span>Số năm kinh nghiệm yêu cầu:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.yearsRequired} năm</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Số năm kinh nghiệm của ứng viên:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.yearsPresent} năm</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Mức độ liên quan:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.relevanceScore}%</span>
                            </div>
                            <div className="w-full relative h-2 mt-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="absolute top-0 left-0 h-full rounded-full" 
                                  style={{ 
                                    width: `${evaluationResult.experienceMatch.relevanceScore}%`, 
                                    backgroundColor: evaluationResult.experienceMatch.relevanceScore >= 70 ? colors.success : 
                                                   evaluationResult.experienceMatch.relevanceScore >= 40 ? colors.warning : colors.danger 
                                  }}></div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="education" className="border-none">
                        <AccordionTrigger className="text-sm font-medium py-2 hover:bg-white/40 px-2 rounded" style={{ color: colors.darkGray }}>
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Học vấn
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-3">
                          <div className="space-y-2 pl-6">
                            <div className="flex justify-between text-sm">
                              <span>Bằng cấp yêu cầu:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.degreeRequired}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Bằng cấp của ứng viên:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.degreePresent}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Mức độ phù hợp:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.relevanceScore}%</span>
                            </div>
                            <div className="w-full relative h-2 mt-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="absolute top-0 left-0 h-full rounded-full" 
                                  style={{ 
                                    width: `${evaluationResult.educationMatch.relevanceScore}%`, 
                                    backgroundColor: evaluationResult.educationMatch.relevanceScore >= 70 ? colors.success : 
                                                   evaluationResult.educationMatch.relevanceScore >= 40 ? colors.warning : colors.danger
                                  }}></div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </ScrollArea>
            
            {/* Add proceed button at the bottom */}
            <div className="flex justify-end p-4 border-t border-gray-200 mt-4">
              <Button 
                onClick={handleProceedToInterview}
                className="bg-green-600 hover:bg-green-700 text-white transition-all"
              >
                Tiến hành phỏng vấn
                <ArrowRight className="ml-2 h-4 w-4" />
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
        
        {/* Additional decorative elements similar to landing page */}
        <div className="absolute top-[40%] right-[15%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-purple-400/15 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[30%] left-[10%] w-[20vw] h-[20vw] max-w-[350px] max-h-[350px] bg-sky-400/15 dark:bg-sky-500/20 rounded-full blur-3xl"></div>
        
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
        
        {currentStep === 3 && evaluationResult && (
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
                    <span className="text-2xl font-bold">{evaluationResult.matchPercentage}%</span>
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
                        evaluationResult.matchPercentage >= 70 ? colors.success :
                        evaluationResult.matchPercentage >= 40 ? colors.warning :
                        colors.danger
                      }
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${evaluationResult.matchPercentage * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">Mức độ phù hợp</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {evaluationResult.matchPercentage >= 70
                      ? 'CV của bạn phù hợp tốt với vị trí này'
                      : evaluationResult.matchPercentage >= 40
                      ? 'CV của bạn phù hợp một phần với vị trí này'
                      : 'CV của bạn chưa phù hợp với vị trí này'}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge style={{ 
                      backgroundColor: evaluationResult.matchPercentage >= 70 ? colors.success : 
                                      evaluationResult.matchPercentage >= 40 ? colors.warning : 
                                      colors.danger,
                      color: colors.white 
                    }}>
                      {evaluationResult.matchPercentage >= 70
                        ? 'Phù hợp cao'
                        : evaluationResult.matchPercentage >= 40
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
                  <TabsList className="grid grid-cols-4 mb-4 bg-[#f8f9fa]/60 backdrop-blur-sm rounded-lg">
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
                      value="details" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Chi tiết
                    </TabsTrigger>
                    <TabsTrigger 
                      value="recommendations" 
                      className="text-gray-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-colors"
                    >
                      Đề xuất
                    </TabsTrigger>
                  </TabsList>

                  
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
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4">
                    <h3 className="font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <Code className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                      Đánh giá kỹ năng
                    </h3>
                    
                    <div className="space-y-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                      {evaluationResult.skillsMatch.map((skill: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded transition-colors hover:bg-white/80" 
                            style={{ backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(248, 249, 250, 0.6)' }}>
                          <div className="flex items-center">
                            {skill.present ? (
                              <CheckCircle className="h-4 w-4 mr-2" style={{ color: colors.success }} />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" style={{ color: colors.danger }} />
                            )}
                            <span className="text-sm font-medium">{skill.name}</span>
                            {skill.required && (
                              <Badge variant="outline" className="ml-2 text-xs" style={{ borderColor: colors.primary }}>
                                Yêu cầu
                              </Badge>
                            )}
                          </div>
                          <Badge style={{ 
                            backgroundColor: skill.level === "Cao" ? colors.success : 
                                          skill.level === "Trung bình" ? colors.info : 
                                          skill.level === "Thấp" ? colors.warning : colors.danger,
                            color: colors.white
                          }}>
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full bg-white/60 backdrop-blur-sm rounded-lg p-2 shadow-sm">
                      <AccordionItem value="experience" className="border-b border-slate-200">
                        <AccordionTrigger className="text-sm font-medium py-2 hover:bg-white/40 px-2 rounded" style={{ color: colors.darkGray }}>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Kinh nghiệm làm việc
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-3">
                          <div className="space-y-2 pl-6">
                            <div className="flex justify-between text-sm">
                              <span>Số năm kinh nghiệm yêu cầu:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.yearsRequired} năm</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Số năm kinh nghiệm của ứng viên:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.yearsPresent} năm</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Mức độ li��n quan:</span>
                              <span className="font-medium">{evaluationResult.experienceMatch.relevanceScore}%</span>
                            </div>
                            <div className="w-full relative h-2 mt-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="absolute top-0 left-0 h-full rounded-full" 
                                  style={{ 
                                    width: `${evaluationResult.experienceMatch.relevanceScore}%`, 
                                    backgroundColor: evaluationResult.experienceMatch.relevanceScore >= 70 ? colors.success : 
                                                   evaluationResult.experienceMatch.relevanceScore >= 40 ? colors.warning : colors.danger 
                                  }}></div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="education" className="border-none">
                        <AccordionTrigger className="text-sm font-medium py-2 hover:bg-white/40 px-2 rounded" style={{ color: colors.darkGray }}>
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2" style={{ color: colors.primary }} />
                            Học vấn
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-3">
                          <div className="space-y-2 pl-6">
                            <div className="flex justify-between text-sm">
                              <span>Bằng cấp yêu cầu:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.degreeRequired}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Bằng cấp của ứng viên:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.degreePresent}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Mức độ phù hợp:</span>
                              <span className="font-medium">{evaluationResult.educationMatch.relevanceScore}%</span>
                            </div>
                            <div className="w-full relative h-2 mt-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="absolute top-0 left-0 h-full rounded-full" 
                                  style={{ 
                                    width: `${evaluationResult.educationMatch.relevanceScore}%`, 
                                    backgroundColor: evaluationResult.educationMatch.relevanceScore >= 70 ? colors.success : 
                                                   evaluationResult.educationMatch.relevanceScore >= 40 ? colors.warning : colors.danger
                                  }}></div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </ScrollArea>
            
            {/* Add proceed button at the bottom */}
            <div className="flex justify-end p-4 border-t border-gray-200 mt-4">
              <Button 
                onClick={handleProceedToInterview}
                className="bg-green-600 hover:bg-green-700 text-white transition-all"
              >
                Tiến hành phỏng vấn
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CVEvaluator;
