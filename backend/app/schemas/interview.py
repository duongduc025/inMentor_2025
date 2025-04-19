from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from typing import Dict, Any

class InterviewMessageResponse(BaseModel):
    id: UUID
    interview_id: UUID
    role: str
    content: str
    created_at: datetime

class InterviewMessageRequest(BaseModel):
    role: str
    content: str
    

class InterviewProcessResponse(BaseModel):
    id: UUID
    job_id: UUID
    candidate_id: UUID
    status: str
    created_at: datetime
    updated_at: datetime


class InterviewProcessRequest(BaseModel):
    job_id: UUID
    status: str = Field(default="pending")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class InterviewCVAssessmentRequest(BaseModel):
    created_at: Optional[datetime] = None

class CreateInterviewCVAssessmentResponse(BaseModel):
    id: UUID
    interview_process_id: UUID
    created_at: datetime

class InterviewCVAssessmentResponse(BaseModel):
    id: UUID
    process_id: UUID
    match_percentage: Optional[int] = None
    summary: Optional[str] = None
    strengths: Optional[Dict[str, Any]] = None
    weaknesses: Optional[Dict[str, Any]] = None
    skills_match: Optional[Dict[str, Any]] = None
    experience_match: Optional[Dict[str, Any]] = None
    education_match: Optional[Dict[str, Any]] = None
    certifications: Optional[Dict[str, Any]] = None
    projects: Optional[Dict[str, Any]] = None
    soft_skills_match: Optional[Dict[str, Any]] = None
    layout_score: Optional[int] = None
    career_objective: Optional[Dict[str, Any]] = None
    recommendations: Optional[Dict[str, Any]] = None
    cv_json: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

class InterviewFinalAssessmentRequest(BaseModel):
    interview_id: UUID
    content: str
    final_decision: str
    assessor_name: str
    created_at: Optional[datetime] = None

class InterviewFinalAssessmentResponse(BaseModel):
    id: UUID
    interview_process_id: UUID
    interview_id: UUID
    content: str
    final_decision: str
    assessor_name: str
    created_at: datetime

class InterviewResponse(BaseModel):
    id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

class InterviewRequest(BaseModel):
    title: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class RunCVAssessmentRequest(BaseModel):
    pass