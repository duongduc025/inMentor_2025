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
cv_path = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

class CVAssessmentService:
    def cv_assessment(cv_path: str, jd: str) -> Dict[str, Any]:
        resume_llm = AutoApplyModel(
            api_key=apikey,
            provider=provider,
            model=model,
            downloads_dir=path,
            )
            
        user_data = resume_llm.user_data_extraction(cv_path)
        
            
        return user_data
    