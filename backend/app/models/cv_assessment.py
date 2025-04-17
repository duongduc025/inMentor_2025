
from sqlalchemy import Column, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base

class InterviewCVAssessment(Base):
    __tablename__ = "cv_assessment"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    process_id = Column(UUID(as_uuid=True), ForeignKey("interview_processes.id"), nullable=False)
    content = Column(Text, nullable=False)
    decision = Column(Text, nullable=False)
    reviewer_name = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)