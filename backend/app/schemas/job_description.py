from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class JobDescriptionResponse(BaseModel):
    id: UUID
    job_title: str
    job_link: str
    salary: str
    region: str
    job_company: str
    experience: str
    job_level: str
    education_level: str
    related_job: str
    required_skills: str
    job_description: str
    job_requirement: str
    job_benefit: str
    work_location: str
    
    # Add additional fields that might be useful for the frontend
    postedDate: Optional[str] = None
    daysLeft: Optional[int] = None
    logo: Optional[str] = None
    isTop: Optional[bool] = False
    isPro: Optional[bool] = False
    isUrgent: Optional[bool] = False
    
    class Config:
        from_atributes = True

class JobPaginationResponse(BaseModel):
    jobs: List[JobDescriptionResponse]
    total: int
    page: int
    pages: int
    limit: int
