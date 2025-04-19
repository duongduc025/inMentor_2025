from sqlalchemy import Column, Text, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from app.database import Base

class InterviewCVAssessment(Base):
    __tablename__ = "cv_assessment"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    process_id = Column(UUID(as_uuid=True), ForeignKey("interview_processes.id"), nullable=False)
    match_percentage = Column(Integer, nullable=True)
    summary = Column(Text, nullable=True)
    strengths = Column(JSONB, nullable=True)
    weaknesses = Column(JSONB, nullable=True)
    skills_match = Column(JSONB, nullable=True)
    experience_match = Column(JSONB, nullable=True)
    education_match = Column(JSONB, nullable=True)
    certifications = Column(JSONB, nullable=True)
    projects = Column(JSONB, nullable=True)
    soft_skills_match = Column(JSONB, nullable=True)
    layout_score = Column(Integer, nullable=True)
    career_objective = Column(JSONB, nullable=True)
    recommendations = Column(JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False)
    updated_at = Column(DateTime(timezone=True), nullable=True)
    cv_json = Column(JSONB, nullable=True)