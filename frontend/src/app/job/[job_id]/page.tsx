'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Joblist } from "@/lib/job-list";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Users, 
  GraduationCap, 
  Clock, 
  Building, 
  Share2,
  BookmarkPlus,
  CheckCircle2,
  Globe,
  Send,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function JobDetail({ params }: { params: { job_id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Fetch job data based on ID
    const foundJob = Joblist.find(j => j.id === params.job_id);
    
    if (foundJob) {
      setJob(foundJob);
    }
    setLoading(false);
  }, [params.job_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#007BFF] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Briefcase className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-[#343A40] mb-2">Không tìm thấy việc làm</h1>
        <p className="text-gray-600 mb-6">Việc làm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button 
          variant="outline" 
          onClick={() => router.push('/job')} 
          className="flex items-center gap-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF]/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Button 
          variant="outline" 
          onClick={() => router.push('/job')} 
          className="flex items-center gap-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF]/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Job Details */}
        
        <div className="md:col-span-2">
          {/* Job Header Card */}
          <div className="bg-white rounded border p-6 mb-6">
            <h1 className="text-xl font-bold text-[#343A40] mb-6">{job.job_title}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Mức lương</div>
                  <div className="font-medium">{job.salary || "Thỏa thuận"}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Địa điểm</div>
                  <div className="font-medium">{job.region}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Kinh nghiệm</div>
                  <div className="font-medium">{job.experience}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6 text-gray-500">
              <Clock size={18} />
              <span>Hạn nộp hồ sơ: 08/05/2025</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#007BFF] hover:bg-[#0069d9] flex items-center gap-2 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
                Ứng tuyển ngay
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setSaved(!saved)}
              >
                {saved ? (
                  <><CheckCircle2 className="w-5 h-5 text-[#007BFF]" /> Đã lưu</>
                ) : (
                  <><BookmarkPlus className="w-5 h-5" /> Lưu tin</>
                )}
              </Button>
            </div>
          </div>
          
          {/* Job Details Card */}
          <div className="bg-white rounded border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#343A40]">Chi tiết tin tuyển dụng</h2>
              <Button variant="outline" size="sm" className="text-[#007BFF] border-[#007BFF]/20 bg-[#007BFF]/5 hover:bg-[#007BFF]/10 flex items-center gap-2">
                <Send size={16} />
                Gửi tôi việc làm tương tự
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-[#343A40] mb-2">{job.related_job}</h3>
            </div>
            
            <div className="mb-6 pb-4 border-b">
              <h3 className="font-medium text-[#343A40] mb-3">Mô tả công việc</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {job.job_description}
              </div>
            </div>
            
            <div className="mb-6 pb-4 border-b">
              <h3 className="font-medium text-[#343A40] mb-3">Yêu cầu ứng viên</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {job.job_requirement}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-[#343A40] mb-3">Quyền lợi</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {job.job_benefit}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Company Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded border p-6 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/images/company-logo.png" alt={job.job_company} className="max-w-full max-h-full" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23007BFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3crect x='2' y='2' width='20' height='20' rx='2' ry='2'%3e%3c/rect%3e%3cpath d='M12 8v8'%3e%3c/path%3e%3cpath d='M8 12h8'%3e%3c/path%3e%3c/svg%3e";
                  }}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#343A40]">{job.job_company}</h2>
                <p className="text-gray-600 text-sm">{job.related_job}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Quy mô:</p>
                  <p className="text-gray-700">100-499 nhân viên</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Lĩnh vực:</p>
                  <p className="text-gray-700">{job.related_job}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-gray-500 text-sm">Địa điểm:</p>
                  <p className="text-gray-700">{job.work_location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 text-[#007BFF] border-[#007BFF] hover:bg-[#007BFF]/10"
                onClick={() => window.open(job.job_link, '_blank')}
              >
                <ExternalLink size={16} />
                Xem trang công ty
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded border p-6 mb-6">
            <h2 className="text-lg font-bold text-[#343A40] mb-4">Thông tin chung</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Cấp bậc</p>
                  <p className="text-gray-700">{job.job_level}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Học vấn</p>
                  <p className="text-gray-700">{job.education_level}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Kỹ năng yêu cầu</p>
                  <p className="text-gray-700">{job.required_skills}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#007BFF]/10 rounded-full flex items-center justify-center text-[#007BFF]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Thời gian làm việc</p>
                  <p className="text-gray-700">Thứ 2 đến hết sáng Thứ 7 (8h00 - 17h15)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded border p-6">
            <h2 className="text-lg font-bold text-[#343A40] mb-4">Chia sẻ tin tuyển dụng</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-[#1877F2] border-[#1877F2]/20 bg-[#1877F2]/5 hover:bg-[#1877F2]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="text-[#1DA1F2] border-[#1DA1F2]/20 bg-[#1DA1F2]/5 hover:bg-[#1DA1F2]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="text-[#0A66C2] border-[#0A66C2]/20 bg-[#0A66C2]/5 hover:bg-[#0A66C2]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="text-[#25D366] border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </Button>
              <Button variant="outline" size="sm" className="text-[#007BFF] border-[#007BFF]/20 bg-[#007BFF]/5 hover:bg-[#007BFF]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    
      
    </div>
  );
}
