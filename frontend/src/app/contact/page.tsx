"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail as EnvelopeIcon, Phone as PhoneIcon, MapPin as MapPinIcon } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would implement your actual form submission logic
      // For now, let's just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#343A40]">Liên hệ</h1>
        <p className="text-lg text-[#343A40]/80 mt-4 max-w-2xl mx-auto">
          Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với đội ngũ của chúng tôi và chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <Card className="border-[#007BFF]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#343A40]">Gửi Tin Nhắn Cho Chúng Tôi</CardTitle>
            <CardDescription>
              Điền vào biểu mẫu bên dưới và chúng tôi sẽ phản hồi sớm nhất có thể.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
                  Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại với bạn sớm.
                </div>
                <Button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white"
                >
                  Gửi Tin Nhắn Khác
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#343A40]">
                    Họ Tên
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Họ tên của bạn"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-[#343A40]/20 focus-visible:ring-[#007BFF]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#343A40]">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-[#343A40]/20 focus-visible:ring-[#007BFF]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[#343A40]">
                    Chủ Đề
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Nội dung liên quan đến?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="border-[#343A40]/20 focus-visible:ring-[#007BFF]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#343A40]">
                    Tin Nhắn
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Nội dung tin nhắn của bạn..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="border-[#343A40]/20 focus-visible:ring-[#007BFF] resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi Tin Nhắn"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-[#007BFF]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#343A40]">Thông Tin Liên Hệ</CardTitle>
              <CardDescription>
                Dưới đây là các cách bạn có thể liên hệ với chúng tôi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="h-6 w-6 text-[#007BFF] mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#343A40]">Email</h3>
                  <p className="text-[#343A40]/70">
                    <a 
                      href="mailto:inmentor.ai@gmail.com" 
                      className="hover:text-[#007BFF] transition-colors"
                    >
                      inmentor.ai@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <PhoneIcon className="h-6 w-6 text-[#007BFF] mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#343A40]">Điện Thoại</h3>
                  <p className="text-[#343A40]/70">Cung cấp khi có yêu cầu</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 text-[#007BFF] mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#343A40]">Địa Điểm</h3>
                  <p className="text-[#343A40]/70">Thành phố Hà Nội, Việt Nam</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-[#007BFF]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#343A40]">Giờ Làm Việc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#343A40]/70">Thứ Hai - Thứ Sáu:</span>
                <span className="font-medium text-[#343A40]">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#343A40]/70">Thứ Bảy:</span>
                <span className="font-medium text-[#343A40]">9:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#343A40]/70">Chủ Nhật:</span>
                <span className="font-medium text-[#343A40]">Nghỉ</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
