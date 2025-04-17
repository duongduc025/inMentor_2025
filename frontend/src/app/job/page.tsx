'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight, ChevronLeft, X, Briefcase, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building } from "lucide-react";
import { getJobs, type Job, type PaginatedJobsResponse } from "../../lib/api";

export default function JobListings() {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(0);
  const jobsPerPage = 9; 
  const [searchTip, setSearchTip] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobData, setJobData] = useState<PaginatedJobsResponse>({
    jobs: [],
    total: 0,
    page: 0,
    pages: 0,
    limit: jobsPerPage
  });

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJobs(page, jobsPerPage, searchQuery, location === "Ngẫu Nhiên" ? "" : location);
      setJobData(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setError("Failed to load job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, location, searchQuery]);

  const nextPage = () => {
    if (page < jobData.pages - 1) {
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const locations = ["Ngẫu Nhiên", "Hà Nội", "Thành phố Hồ Chí Minh", "Miền Bắc", "Miền Nam"];

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-[#007BFF] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 relative">
          <h1 className="text-4xl font-bold mb-3 text-center">Tìm kiếm việc làm </h1>
          <p className="text-center text-blue-100 mb-8 max-w-2xl mx-auto">Khám phá hàng ngàn cơ hội việc làm</p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Nhập chức danh, vị trí, công ty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-[#343A40] border-0 ring-2 ring-white/30 focus-visible:ring-white shadow-lg rounded-xl"
              />
            </div>
            <Button 
              type="submit" 
              className="h-14 bg-[#343A40] hover:bg-[#343A40]/90 text-white px-8 rounded-xl font-medium text-base shadow-lg transition-all hover:scale-105"
              disabled={loading}
            >
              {loading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <p className="text-blue-100 text-sm mr-2">Xu hướng tìm kiếm:</p>
            {["Frontend Developer", "Marketing", "Kế toán", "Sales"].map((term) => (
              <Button 
                key={term} 
                variant="link" 
                className="text-white hover:text-blue-200 p-0 h-auto text-sm underline-offset-4"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h2 className="text-[#007BFF] text-2xl font-bold mr-2">Việc làm nổi bật</h2>
            <Badge className="bg-blue-100 text-[#007BFF] hover:bg-blue-200 border-none">
              {jobData.total} việc làm
            </Badge>
          </div>
          <Link 
            href="/all-jobs" 
            className="text-[#007BFF] hover:text-[#007BFF]/80 font-medium flex items-center"
          >
            Xem tất cả 
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl p-5 shadow-sm border mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h3 className="text-[#343A40] font-medium flex items-center">
              <svg width="18" height="18" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Bộ lọc tìm kiếm
            </h3>
            
            <div className="flex-grow"></div>
            
            <Button 
              variant="outline" 
              className="text-sm h-9 border-gray-300 text-gray-600 hover:bg-gray-50"
              onClick={() => {
                setLocation("");
                setSearchQuery("");
              }}
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Xóa bộ lọc
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent text-[#343A40] min-w-[160px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Tất cả địa điểm</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 -rotate-90 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc === location ? "" : loc)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    loc === location 
                      ? "bg-[#007BFF] text-white shadow-md" 
                      : "bg-white text-[#343A40] hover:bg-gray-100 border border-gray-300 hover:border-[#007BFF]/30"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center py-8 bg-white rounded-xl border mb-8">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-red-700 mb-2">Đã xảy ra lỗi</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={fetchJobs}
              className="bg-[#007BFF] hover:bg-[#0069d9]"
            >
              Thử lại
            </Button>
          </div>
        )}

        {loading && !error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600">Đang tải danh sách việc làm...</p>
          </div>
        ) : !error && jobData.jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-[#343A40] mb-2">Không tìm thấy việc làm</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">Vui lòng thử lại với các từ khóa hoặc bộ lọc khác để tìm kiếm việc làm phù hợp với bạn.</p>
            <Button 
              variant="outline" 
              className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF]/5"
              onClick={() => {
                setLocation("");
                setSearchQuery("");
              }}
            >
              Xóa bộ lọc và tìm lại
            </Button>
          </div>
        ) : !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jobData.jobs.map((job, index) => (
                <Card 
                  key={job.id} 
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#007BFF]/40 rounded-xl hover:translate-y-[-4px]"
                >
                  <CardContent className="p-6 pb-4">
                    <div className="flex items-start space-x-4">
                      {job.logo ? (
                        <div className="w-16 h-16 rounded-lg border border-gray-100 flex items-center justify-center p-2 bg-white shadow-sm">
                          <img src={job.logo} alt={job.job_company} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg border border-gray-100 flex items-center justify-center bg-blue-50 text-[#007BFF]">
                          <Building className="w-7 h-7" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {job.isTop && (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-200 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                              TOP
                            </span>
                          )}
                          {job.isPro && (
                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 border border-yellow-200 shadow-sm">
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15L8.5 18L9.5 14L6.5 11.5L10.5 11L12 7.5L13.5 11L17.5 11.5L14.5 14L15.5 18L12 15Z" fill="currentColor"/>
                              </svg>
                              Pro
                            </span>
                          )}
                          {job.isUrgent && (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 border border-red-200 animate-pulse shadow-sm">
                              GẤP
                            </span>
                          )}
                        </div>
                        <h3 
                          className="font-semibold text-[#343A40] group-hover:text-[#007BFF] cursor-pointer transition-colors mb-1 text-base line-clamp-2" 
                          title={job.job_title}
                          onClick={() => router.push(`/job/${job.id}`)}
                        >
                          {job.job_title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate font-medium">{job.job_company}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      <div className="flex items-center text-sm text-gray-700 rounded-lg">
                        <div className="w-4 h-4 text-[#007BFF] mr-2">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{job.salary}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700 rounded-lg">
                        <MapPin className="w-4 h-4 text-[#007BFF] mr-2" />
                        <span>{job.region}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <div className="px-6 py-3 border-t border-dashed">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        Đăng tuyển {job.postedDate || "14/05/2024"}
                      </div>
                      <div className="text-xs text-[#007BFF] font-medium">
                        Còn {job.daysLeft || 30} ngày
                      </div>
                    </div>
                  </div>
                  
                  <CardFooter className="flex p-0 border-t bg-gray-50">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/job/${job.id}`)}
                      className="flex-1 rounded-none h-12 hover:bg-white hover:text-[#007BFF] text-[#343A40] font-medium"
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {/* Toggle save job */}}
                      className="w-12 h-12 rounded-none border-l flex items-center justify-center text-gray-500 hover:text-[#007BFF] hover:bg-white"
                      title="Lưu việc làm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="flex items-center shadow-sm rounded-full border bg-white overflow-hidden">
                <Button
                  variant="ghost"
                  onClick={prevPage}
                  disabled={page === 0}
                  className="h-10 px-4 rounded-none border-r text-[#343A40] hover:text-[#007BFF] hover:bg-gray-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Trước
                </Button>
                
                <div className="px-4 text-sm font-medium text-[#343A40]">
                  Trang {page + 1} / {Math.max(1, jobData.pages)}
                </div>
                
                <Button
                  variant="ghost"
                  onClick={nextPage}
                  disabled={page >= jobData.pages - 1}
                  className="h-10 px-4 rounded-none border-l text-[#343A40] hover:text-[#007BFF] hover:bg-gray-50 disabled:opacity-40"
                >
                  Sau
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}