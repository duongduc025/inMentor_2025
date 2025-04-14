from sqlalchemy import Column, Text, Integer
from app.database import Base

class Job_descriptions(Base):
    __tablename__ = "job_descriptions"
    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(Text)
    job_link = Column(Text)
    salary = Column(Text)
    region = Column(Text)
    job_company = Column(Text)
    experience = Column(Text)
    job_level = Column(Text)
    education_level = Column(Text)
    related_job = Column(Text)
    required_skills = Column(Text)
    job_description = Column(Text)
    job_requirement = Column(Text)
    location = Column(Text)
    job_benefit = Column(Text)
    work_location = Column(Text)