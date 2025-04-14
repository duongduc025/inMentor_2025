from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class Job_descriptions(BaseModel):
    id = int
    job_title = str
    job_link = str
    salary = str
    region = str
    job_company = str
    experience = str
    job_level = str
    education_level = str
    related_job = str
    required_skills = str
    job_description = str
    job_requirement = str
    location = str
    job_benefit = str
    work_location = str