from sqlalchemy import Column, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_title = Column(Text, nullable=False)
    job_link = Column(Text, nullable=False)
    salary = Column(Text, nullable=False)
    region = Column(Text, nullable=False)
    job_company = Column(Text, nullable=False)
    experience = Column(Text, nullable=False)
    job_level = Column(Text, nullable=False)
    education_level = Column(Text, nullable=False)
    related_job = Column(Text, nullable=False)
    required_skills = Column(Text, nullable=False)
    job_description = Column(Text, nullable=False)
    job_requirement = Column(Text, nullable=False)
    job_benefit = Column(Text, nullable=False)
    work_location = Column(Text, nullable=False)
