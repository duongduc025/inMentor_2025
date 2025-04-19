from zlm import AutoApplyModel
import os
from dotenv import load_dotenv
from typing import Dict, Any
import json

load_dotenv()
provider = "GPT"
model = "gpt-4o"
apikey = os.getenv("OPENAI_API_KEY")
path = '/home/hdd/Documents/inMentor_2025/backend/mock_data/result'
cv_path = '/home/hdd/Documents/inMentor_2025/backend/mock_data/CV_01.pdf'
jd = """
    Job Title: Software Engineer
    Company: Tech Innovations
    Location: Remote
    Job Description:
    We are looking for a Software Engineer to join our team. The ideal candidate will have experience in developing scalable web applications and a strong understanding of software development principles.
    Responsibilities:
    - Design, develop, and maintain web applications
    - Collaborate with cross-functional teams to define, design, and ship new features
    - Ensure the performance, quality, and responsiveness of applications
    - Identify and correct bottlenecks and fix bugs
    - Help maintain code quality, organization, and automatization
    Requirements:
    - Proven experience as a Software Engineer or similar role
    - Familiarity with Agile development methodologies
    - Experience with programming languages such as Java, Python, or JavaScript
    - Knowledge of web frameworks such as React, Angular, or Vue.js
    - Strong problem-solving skills and ability to work in a team
    - Excellent communication skills
    - Bachelor's degree in Computer Science or a related field
    - Experience with cloud platforms such as AWS or Azure is a plus
    """

class CVAssessmentService:
    def cv_assessment(self, cv_path: str, jd: str) -> Dict[str, Any]:
        resume_llm = AutoApplyModel(
            api_key=apikey,
            provider=provider,
            model=model,
            downloads_dir=path,
            )
        
            
        user_data = resume_llm.user_data_extraction(cv_path)
        job_details, jd_path = resume_llm.job_details_extraction(job_site_content = jd)
        resume_path, resume_details = resume_llm.resume_builder(job_details, user_data)

            
        return user_data, resume_path
    
