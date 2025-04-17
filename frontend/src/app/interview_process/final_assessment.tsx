'use client';
import React, { useState } from 'react';
import { 
  Award, 
  Check, 
  Download, 
  ChevronRight, 
  BarChart2, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Star,
  AlertCircle,
  FileText,
  ArrowLeft,
  X,
  UserCheck,
  Brain
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

// Mock interview assessment data in Vietnamese
const assessmentData = {
  candidateName: "Aaron Wang",
  position: "Thực Tập Sinh Lập Trình",
  interviewDate: "15/05/2023",
  overallScore: 74,
  interviewer: "InMentor AI",
  interviewDuration: "42 phút",
  feedbackSummary: "Aaron thể hiện kiến thức kỹ thuật tốt nhưng cần cải thiện về độ rõ ràng trong giao tiếp và cách tiếp cận giải quyết vấn đề.",
  strengths: [
    "Hiểu biết vững về nền tảng lập trình",
    "Nhanh chóng nắm bắt khái niệm mới",
    "Nắm vững nguyên lý cơ sở dữ liệu"
  ],
  improvements: [
    "Cần cải thiện cách diễn đạt ý tưởng phức tạp",
    "Nên luyện tập nhiều hơn về giải quyết thuật toán",
    "Cần cung cấp giải thích chi tiết hơn"
  ],
  competencyScores: [
    { name: "Kiến thức kỹ thuật", score: 82 },
    { name: "Kỹ năng mềm", score: 68 },
    { name: "Kinh nghiệm & Kiến thức chuyên môn", score: 70 },
    { name: "Phù hợp văn hóa", score: 80 }
  ],
  questionResponses: [
    {
      question: "Bạn có thể giải thích sự khác biệt giữa tuple và list trong Python không?",
      answer: "Vâng, tuple là không thể thay đổi (immutable), trong khi list trong Python có thể thay đổi (mutable).",
      feedback: "Câu trả lời đúng nhưng ngắn gọn. Sẽ tốt hơn nếu giải thích thêm về ý nghĩa thực tế của tính không thay đổi và có thể thay đổi, cùng với các trường hợp sử dụng của mỗi loại.",
      score: 7
    },
    {
      question: "Mô tả cách bạn tiếp cận việc gỡ lỗi một vấn đề phức tạp trong ứng dụng.",
      answer: "Tôi sẽ bắt đầu bằng cách tái tạo vấn đề, sau đó sử dụng logging và debugger để xác định khu vực có vấn đề. Sau khi sửa, tôi sẽ viết test để ngăn chặn lỗi tương tự.",
      feedback: "Cách tiếp cận có cấu trúc tốt thể hiện tư duy có phương pháp. Có thể đề cập đến các công cụ hoặc kỹ thuật cụ thể cho các loại lỗi khác nhau.",
      score: 8
    },
    {
      question: "Bạn sẽ thiết kế cơ sở dữ liệu cho một nền tảng thương mại điện tử như thế nào?",
      answer: "Tôi sẽ tạo các bảng cho người dùng, sản phẩm, đơn hàng và thanh toán với các mối quan hệ phù hợp. Tôi sẽ đảm bảo chuẩn hóa để giảm dư thừa dữ liệu.",
      feedback: "Đã cung cấp cấu trúc cơ bản nhưng thiếu các chi tiết quan trọng như quản lý kho hàng, danh mục sản phẩm và các vấn đề về hiệu suất khi mở rộng.",
      score: 6
    }
  ],
  recommendations: [
    "Hoàn thành khóa học trực tuyến về thuật toán và cấu trúc dữ liệu",
    "Luyện tập câu hỏi phỏng vấn kỹ thuật với đồng nghiệp",
    "Thực hiện dự án cá nhân để chứng minh ứng dụng thực tế của kỹ năng"
  ],
  detailedEvaluation: [
    {
      category: "Kỹ năng kỹ thuật",
      score: 75,
      breakdown: [
        { subCategory: "Kiến thức lập trình", score: 82, maxScore: 100 },
        { subCategory: "Khả năng giải quyết vấn đề", score: 68, maxScore: 100 },
        { subCategory: "Hiểu biết cơ sở dữ liệu", score: 75, maxScore: 100 }
      ],
      comments: "Ứng viên thể hiện nền tảng kiến thức kỹ thuật tốt, đặc biệt trong lập trình. Tuy nhiên, cần phát triển thêm kỹ năng giải quyết vấn đề và tư duy thuật toán để xử lý các tình huống phức tạp hơn. Hiểu biết về cơ sở dữ liệu ở mức khá nhưng cần cải thiện kiến thức về tối ưu hóa và thiết kế schema."
    },
    {
      category: "Kỹ năng mềm",
      score: 70,
      breakdown: [
        { subCategory: "Giao tiếp", score: 70, maxScore: 100 },
        { subCategory: "Làm việc nhóm", score: 78, maxScore: 100 },
        { subCategory: "Khả năng thích nghi", score: 65, maxScore: 100 }
      ],
      comments: "Ứng viên có khả năng giao tiếp ở mức đủ để truyền đạt ý tưởng nhưng đôi khi còn thiếu sự rõ ràng và ngắn gọn. Thể hiện tiềm năng tốt trong làm việc nhóm nhưng cần cải thiện khả năng thích nghi với các tình huống mới. Nên tập trung vào việc diễn đạt chuyên nghiệp hơn và phát triển tư duy linh hoạt."
    },
    {
      category: "Kinh nghiệm & Kiến thức chuyên môn",
      score: 78,
      breakdown: [
        { subCategory: "Kiến thức về công nghệ", score: 85, maxScore: 100 },
        { subCategory: "Kinh nghiệm dự án", score: 65, maxScore: 100 },
        { subCategory: "Học hỏi liên tục", score: 82, maxScore: 100 }
      ],
      comments: "Ứng viên có hiểu biết tốt về các công nghệ hiện đại và thể hiện khả năng học hỏi nhanh. Mặc dù kinh nghiệm dự án còn hạn chế, nhưng đã thể hiện tiềm năng phát triển đáng kể. Tinh thần học hỏi và cập nhật kiến thức mới là điểm mạnh đáng ghi nhận."
    }
  ],
  evaluationSummary: "Aaron là một ứng viên tiềm năng có nền tảng kỹ thuật tốt và khả năng học hỏi nhanh. Mặc dù còn cần cải thiện một số kỹ năng, đặc biệt là trong lĩnh vực giải quyết vấn đề và giao tiếp, nhưng ứng viên thể hiện tiềm năng phát triển tốt trong môi trường công nghệ. Với sự hướng dẫn phù hợp và cơ hội thực hành, Aaron có thể trở thành một nhân viên có giá trị cho tổ chức."
};

// Helper function to get color based on score
const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 70) return "text-blue-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

// Helper function to get background color based on score
const getScoreBgColor = (score: number) => {
  if (score >= 80) return "bg-green-100";
  if (score >= 70) return "bg-blue-100";
  if (score >= 60) return "bg-yellow-100";
  return "bg-red-100";
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface AssessmentPageProps {
  onComplete: () => void;
  processData: any;
}

const AssessmentPage = ({ onComplete, processData }: AssessmentPageProps) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'detailed'>('summary');

  // Function to complete the assessment process
  const handleCompleteAssessment = () => {
    // In a real app, you would save the assessment data to your backend
    console.log("Completing assessment for process:", processData.id);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#007BFF] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center text-white hover:text-blue-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay Lại
            </Link>
            <h1 className="text-xl font-semibold">Đánh Giá Phỏng Vấn</h1>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Xuất Báo Cáo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        {/* Summary Card */}
        <Card className="mb-8 overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-[#007BFF] to-[#0056b3] text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/20 p-1 shadow-lg backdrop-blur-sm">
                  <Avatar className="h-full w-full border-2 border-white">
                    <div className="bg-[#343A40] h-full w-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {assessmentData.candidateName.charAt(0)}
                      </span>
                    </div>
                  </Avatar>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{assessmentData.candidateName}</h2>
                  <div className="flex items-center gap-2 text-blue-100">
                    <span>{assessmentData.position}</span>
                    <span className="h-1 w-1 rounded-full bg-blue-200"></span>
                    <span className="text-sm">{assessmentData.interviewDate}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-white text-[#007BFF] hover:bg-blue-50 px-3 py-1.5 text-sm font-medium shadow-sm">
                {assessmentData.overallScore >= 75 ? "Đề Xuất Phù Hợp" : "Cần Đánh Giá Thêm"}
              </Badge>
            </div>
          </div>
          
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-[#343A40] flex items-center border-b border-gray-200 pb-2">
                  <MessageSquare className="h-4 w-4 mr-2 text-[#007BFF]" />
                  Thông tin phỏng vấn
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phỏng vấn bởi:</span>
                    <span className="font-medium text-[#343A40]">{assessmentData.interviewer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ngày:</span>
                    <span className="font-medium text-[#343A40]">{assessmentData.interviewDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Thời lượng:</span>
                    <span className="font-medium text-[#343A40]">{assessmentData.interviewDuration}</span>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">"{assessmentData.feedbackSummary}"</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-[#343A40] mb-3 self-start flex items-center">
                  <Award className="h-4 w-4 mr-2 text-[#007BFF]" />
                  Điểm tổng thể
                </h3>
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(assessmentData.overallScore)}`}>
                        {assessmentData.overallScore}%
                      </div>
                      <div className="text-xs mt-1 text-gray-500">
                        {assessmentData.overallScore >= 80 ? "Xuất sắc" : 
                         assessmentData.overallScore >= 70 ? "Tốt" :
                         assessmentData.overallScore >= 60 ? "Đạt yêu cầu" : "Cần cải thiện"}
                      </div>
                    </div>
                  </div>
                  <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={assessmentData.overallScore >= 80 ? "#22c55e" : 
                              assessmentData.overallScore >= 70 ? "#007BFF" :
                              assessmentData.overallScore >= 60 ? "#facc15" : "#ef4444"}
                      strokeWidth="8"
                      strokeDasharray={`${assessmentData.overallScore * 2.83} 283`}
                    />
                  </svg>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline" className={`${
                    assessmentData.overallScore >= 80 ? "border-green-500 text-green-700" : 
                    assessmentData.overallScore >= 70 ? "border-blue-500 text-blue-700" :
                    assessmentData.overallScore >= 60 ? "border-yellow-500 text-yellow-700" : 
                    "border-red-500 text-red-700"
                  }`}>
                    {assessmentData.overallScore >= 75 ? "Phù hợp vị trí" : "Cần cải thiện thêm"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-[#343A40] flex items-center border-b border-gray-200 pb-2">
                  <BarChart2 className="h-4 w-4 mr-2 text-[#007BFF]" />
                  Kỹ năng nổi bật
                </h3>
                {assessmentData.competencyScores
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className={`font-medium ${getScoreColor(skill.score)}`}>{skill.score}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full ${
                          skill.score >= 80 ? "bg-green-500" : 
                          skill.score >= 70 ? "bg-blue-500" :
                          skill.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 text-[#007BFF] border-[#007BFF] hover:bg-blue-50"
                  onClick={() => setActiveTab('detailed')}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Xem tất cả kỹ năng
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              className={`pb-2 px-1 ${
                activeTab === 'summary'
                  ? 'border-b-2 border-[#007BFF] text-[#007BFF] font-medium'
                  : 'text-gray-500 hover:text-[#343A40]'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Tóm tắt
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === 'detailed'
                  ? 'border-b-2 border-[#007BFF] text-[#007BFF] font-medium'
                  : 'text-gray-500 hover:text-[#343A40]'
              }`}
              onClick={() => setActiveTab('detailed')}
            >
              Phân tích chi tiết
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'summary' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strengths */}
            <Card className="border-none shadow">
              <div className="p-5 bg-green-50 border-b border-green-100">
                <h3 className="font-medium text-green-800 flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
                  Điểm Mạnh
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {assessmentData.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            
            {/* Areas to Improve */}
            <Card className="border-none shadow">
              <div className="p-5 bg-amber-50 border-b border-amber-100">
                <h3 className="font-medium text-amber-800 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                  Cần Cải Thiện
                </h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {assessmentData.improvements.map((area, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            
            {/* All Skills */}
            <Card className="border-none shadow md:col-span-2">
              <div className="p-5 bg-[#007BFF]/10 border-b border-[#007BFF]/20">
                <h3 className="font-medium text-[#343A40] flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-[#007BFF]" />
                  Đánh Giá Kỹ Năng
                </h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {assessmentData.competencyScores.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className={`font-medium ${getScoreColor(skill.score)}`}>{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-3 rounded-md" />
                      <p className="text-xs text-gray-500">
                        {skill.score >= 80 ? "Xuất Sắc" : 
                         skill.score >= 70 ? "Tốt" :
                         skill.score >= 60 ? "Đạt Yêu Cầu" : "Cần Cải Thiện"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Summary and Recommendations */}
            <Card className="border-none shadow md:col-span-2">
              <div className="p-5 bg-blue-50 border-b border-blue-100">
                <h3 className="font-medium text-[#343A40] flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-[#007BFF]" />
                  Tóm tắt đánh giá
                </h3>
              </div>
              <div className="p-5">
                <p className="text-[#343A40] mb-6">{assessmentData.evaluationSummary}</p>
                
                <h4 className="font-medium text-[#343A40] mb-3">Khuyến nghị</h4>
                <ul className="space-y-2">
                  {assessmentData.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start bg-blue-50 p-3 rounded-lg">
                      <ArrowLeft className="h-5 w-5 text-[#007BFF] mr-2 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Detailed Evaluations */}
            {assessmentData.detailedEvaluation.map((category, index) => (
              <Card key={index} className="border-none shadow">
                <div className="p-5 bg-[#007BFF] text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{category.category}</h3>
                    <Badge className="bg-white text-[#007BFF]">
                      {category.score}%
                    </Badge>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Chi Tiết Đánh Giá:</h4>
                    <div className="space-y-3">
                      {category.breakdown.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                          <span className="text-[#343A40]">{item.subCategory}</span>
                          <div className="flex items-center">
                            <div className="w-40 h-2 bg-gray-200 rounded-full mr-3 overflow-hidden">
                              <div
                                className="h-full bg-[#007BFF]"
                                style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                              {item.score}/{item.maxScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Nhận Xét:</h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      {category.comments}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Question-Answer Assessment */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#343A40] flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-[#007BFF]" /> Phân Tích Câu Trả Lời
                </CardTitle>
                <CardDescription>Đánh giá phản hồi cho các câu hỏi phỏng vấn chính</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                {assessmentData.questionResponses.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md">
                    <div className="bg-[#007BFF]/5 p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-[#343A40]">Câu Hỏi {index + 1}</div>
                        <Badge className={`${item.score >= 7 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-[#007BFF]'}`}>
                          {item.score}/10
                        </Badge>
                      </div>
                      <div className="text-[#343A40] mt-1">{item.question}</div>
                    </div>
                    <div className="p-4 space-y-4 bg-white">
                      <div className="pb-3 border-b border-gray-100">
                        <div className="text-sm text-[#343A40]/70 mb-1">Câu Trả Lời Của Ứng Viên</div>
                        <div className="text-[#343A40] pl-3 border-l-2 border-[#007BFF]">{item.answer}</div>
                      </div>
                      <div>
                        <div className="text-sm text-[#343A40]/70 mb-1">Phản Hồi</div>
                        <div className="text-[#343A40] bg-gray-50 p-3 rounded-lg">{item.feedback}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Final Evaluation */}
            <Card className="border-none shadow bg-gradient-to-r from-[#007BFF]/10 to-white">
              <div className="p-6">
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-[#007BFF] mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-[#343A40]">Kết luận đánh giá</h3>
                    <p className="mt-2">
                      {assessmentData.evaluationSummary}
                    </p>
                    <div className="mt-4">
                      <Button className="bg-[#007BFF] hover:bg-[#0056b3]">
                        Lên Lịch Vòng Tiếp Theo
                      </Button>
                      <Button variant="outline" className="ml-3 text-[#343A40] border-[#343A40]">
                        Gửi Phản Hồi
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Add a completion button at the bottom */}
      <div className="container mx-auto px-4 py-6">
        <Card className="border-none shadow bg-gradient-to-r from-[#007BFF]/10 to-white mb-8">
          <div className="p-6">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-[#007BFF] mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-[#343A40]">Kết thúc quá trình đánh giá</h3>
                <p className="mt-2">
                  Bạn đã hoàn thành việc đánh giá ứng viên. Vui lòng xác nhận để lưu kết quả và hoàn tất quy trình.
                </p>
                <div className="mt-4">
                  <Button 
                    className="bg-[#007BFF] hover:bg-[#0056b3]"
                    onClick={handleCompleteAssessment}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Hoàn thành quá trình
                  </Button>
                  <Button variant="outline" className="ml-3 text-[#343A40] border-[#343A40]">
                    Chỉnh sửa đánh giá
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentPage;
