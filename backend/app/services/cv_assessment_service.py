import os
from dotenv import load_dotenv
import json
import uuid
from datetime import datetime
from typing import Dict, Any, Union, List, Optional
import warnings
from app.services.prompts.example_output import EXAMPLE_OUTPUT 
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from pydantic.json_schema import PydanticJsonSchemaWarning

# Tắt các cảnh báo không cần thiết
warnings.filterwarnings("ignore", category=PydanticJsonSchemaWarning)

load_dotenv()

from zlm import AutoApplyModel

# Updated Pydantic model for output
class Education(BaseModel):
    match: bool
    review: str

class CVAssessment(BaseModel):
    match_percentage: int
    summary: str
    strengths: List[str]
    weaknesses: List[str]
    skills_match: Dict[str, bool]
    experience_match: Dict[str, str]
    education_match: Dict[str, Education]
    certifications: List[str]
    projects: List[str]
    soft_skills_match: Dict[str, bool]
    layout_score: int
    career_objective: Dict[str, str]
    recommendations: List[str]

class CVAssessmentService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.provider = "GPT"
        self.model = "gpt-4o"
        self.llm = ChatOpenAI(
            model_name=self.model,
            temperature=0.1,
            openai_api_key=self.openai_api_key,
        )
        self.result_path = 'backend/mock_data/result'
        self.parser = PydanticOutputParser(pydantic_object=CVAssessment)

    def cv_assessment(self, cv_input: Union[str, Dict[str, Any]], jd: str, process_id: str = None) -> Dict[str, Any]:
        # Xử lý đầu vào CV: nếu là file thì extract
        resume_llm = AutoApplyModel(
                api_key=self.openai_api_key,
                provider=self.provider,
                model=self.model,
                downloads_dir=self.result_path,
            )
        user_data = resume_llm.user_data_extraction(cv_input)

        # Đánh giá CV với JD
        assessment_result = self._evaluate_cv_with_jd(user_data, jd)
        
        # Convert Pydantic model to dict if necessary
        if isinstance(assessment_result, CVAssessment):
            assessment_dict = assessment_result.model_dump()
            return assessment_dict, user_data
        
        # If it's already a dict (from fallback)
        return assessment_result, user_data

    def _evaluate_cv_with_jd(self, user_data: Dict[str, Any], jd: str) -> Union[Dict[str, Any], CVAssessment]:
        # Enhanced prompt with a clear example and format details
        example_output_json = json.dumps(EXAMPLE_OUTPUT, ensure_ascii=False, indent=2)
        template = """
            Bạn là chuyên gia tuyển dụng IT. Hãy đánh giá mức độ phù hợp của ứng viên với mô tả công việc dưới đây.

            # CV ứng viên (dạng JSON):
            ```json
            {cv_json}
            ```

            # JD (Job Description):
            ```
            {jd}
            ```
            YÊU CẦU ĐẦU RA:
            Hãy đánh giá độ phù hợp của ứng viên dựa trên JD theo các tiêu chí sau. Mỗi phần cần phản hồi rõ ràng, khách quan, mạch lạc, bằng tiếng Việt, không tự ý bịa thông tin.

            1. match_percentage:
            Giá trị phần trăm (từ 0–100) thể hiện tổng thể độ phù hợp giữa CV và JD.

            2. summary:
            Tóm tắt chung 3–5 câu về mức độ phù hợp giữa CV và JD.

            3. strengths:
            Liệt kê các điểm mạnh nổi bật liên quan trực tiếp đến JD.

            4. weaknesses:
            Liệt kê các yếu điểm hoặc thiếu sót của CV so với JD.

            5. skills_match:
            Liệt kê từng kỹ năng chính từ JD kèm theo giá trị đúng/sai nếu ứng viên có hoặc không có kỹ năng đó trong CV.

            6. experience_match:
            Phân tích các kinh nghiệm làm việc có liên quan và mức độ phù hợp với yêu cầu trong JD.

            7. education_match:
            Đối chiếu từng cấp học/cử nhân/thạc sĩ/... nếu có trong JD hoặc CV. Không tạo mục mới nếu không xuất hiện trong dữ liệu.

            8. certifications:
            Liệt kê các chứng chỉ chuyên môn có trong CV, đặc biệt những cái liên quan đến JD.

            9. projects:
            Các dự án có mô tả trong CV có liên quan hoặc bổ trợ cho JD.

            10. soft_skills_match:
            Liệt kê kỹ năng mềm chính trong JD, và xác định ứng viên có thể hiện kỹ năng đó trong CV hay không.

            11. layout_score:
            Chấm điểm từ 0–10 cho bố cục, cách trình bày CV.

            12. career_objective:
            Trích mục tiêu nghề nghiệp từ CV và đánh giá mức độ phù hợp với JD.

            13. recommendations:
            Gợi ý chi tiết để cải thiện CV nhằm tăng mức độ phù hợp với JD.

            QUY TẮC BẮT BUỘC:
            - QUAN TRỌNG: Toàn bộ đánh giá và phản hồi PHẢI ĐƯỢC VIẾT BẰNG TIẾNG VIỆT, không dùng tiếng Anh.
            - Đánh giá chi tiết, khách quan, đúng format JSON.
            - Trong trường education_match, chỉ liệt kê các bậc học hoặc cấp học có xuất hiện trong JD hoặc CV, không tự động thêm các bậc học không liên quan.
            - Đánh giá từng yêu cầu trong JD và đối chiếu với thông tin trong CV.
            - Output đúng chuẩn JSON, không giải thích, không ghi chú thêm.
            - Tất cả các giá trị text trong JSON (như summary, strengths, weaknesses, v.v.) PHẢI BẰNG TIẾNG VIỆT.

            Format output mẫu:
            {format_instructions}
            Ví dụ đầu ra mẫu:
            ```json
            {example_output}
            ```
            """
        prompt = ChatPromptTemplate.from_template(template)
        cv_str = json.dumps(user_data, ensure_ascii=False, indent=2)
        formatted_prompt = prompt.format(
            cv_json=cv_str,
            jd=jd,
            format_instructions=self.parser.get_format_instructions(),
            example_output=example_output_json
        )

        response = self.llm.invoke([{"type": "human", "content": formatted_prompt}])
        try:
            result = self.parser.parse(response.content)
        except Exception as e:
            print("Lỗi khi parse kết quả, trả về fallback.")
            result = self._create_fallback_assessment(user_data, jd, str(e))
        return result

    def _create_fallback_assessment(self, user_data: Dict[str, Any], jd: str, error_message: str) -> Dict[str, Any]:
        return {
         
            "match_percentage": 0,
            "summary": "Không thể đánh giá CV do lỗi kỹ thuật.",
            "strengths": [],
            "weaknesses": ["Không thể đánh giá do lỗi xử lý"],
            "skills_match": [],
            "experience_match": {},
            "education_match": {},
            "certifications": [],
            "projects": [],
            "soft_skills_match": [],
            "layout_score": 0,
            "career_objective": {},
            "recommendations": [
                "Vui lòng thử lại sau",
                f"Lỗi gặp phải: {error_message}"
            ],
        }
