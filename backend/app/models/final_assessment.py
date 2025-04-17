
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base

class InterviewFinalAssessment(Base):
    __tablename__ = "final_assessment"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    process_id = Column(UUID(as_uuid=True), ForeignKey("interview_processes.id"), nullable=False)
    interview_id = Column(UUID(as_uuid=True), ForeignKey("interviews.id"), nullable=False)
    content = Column(Text, nullable=False)
    final_decision = Column(Text, nullable=False)
    assessor_name = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)