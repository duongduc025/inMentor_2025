from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime

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
    content: str
    decision: str
    reviewer_name: str
    created_at: Optional[datetime] = None

class InterviewCVAssessmentResponse(BaseModel):
    id: UUID
    interview_process_id: UUID
    content: str
    decision: str
    reviewer_name: str
    created_at: datetime


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
    interview_process_id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

class InterviewRequest(BaseModel):
    title: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None