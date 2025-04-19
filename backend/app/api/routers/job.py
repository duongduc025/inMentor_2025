from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.job_description import JobDescriptionResponse, JobPaginationResponse
from app.dependencies import verify_jwt
from app.models.job_description import JobDescription
from app.database import get_db
from uuid import UUID
from datetime import datetime
from typing import Optional
from sqlalchemy import or_

router = APIRouter()

@router.get("/jobs/{job_id}", response_model = JobDescriptionResponse)
async def get_job_description(job_id: UUID, db: Session = Depends(get_db)):
    job_description = db.query(JobDescription).filter(JobDescription.id == job_id).first()
    if not job_description:
        raise HTTPException(status_code=404, detail="Job description not found")
    return job_description


@router.get("/jobs", response_model=JobPaginationResponse)
async def get_all_job_descriptions(
    db: Session = Depends(get_db),
    page: int = Query(0, ge=0),
    limit: int = Query(9, ge=1, le=100),
    search: Optional[str] = None,
    location: Optional[str] = None
):
    query = db.query(JobDescription)
    
    # Apply filters if provided
    if search:
        search_term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                JobDescription.job_title.ilike(search_term),
                JobDescription.job_company.ilike(search_term),
                JobDescription.required_skills.ilike(search_term)
            )
        )
    
    if location:
        if location != "Ngẫu Nhiên":  # Skip filter for "Random" option
            location_term = f"%{location}%"
            query = query.filter(
                or_(
                    JobDescription.region == location,
                    JobDescription.work_location.ilike(location_term)
                )
            )
    
    # Get total count for pagination
    total_count = query.count()
    
    # Apply pagination
    jobs = query.offset(page * limit).limit(limit).all()
    
    # Calculate total pages
    total_pages = (total_count + limit - 1) // limit
    
    return {
        "jobs": jobs,
        "total": total_count,
        "page": page,
        "pages": total_pages,
        "limit": limit
    }
