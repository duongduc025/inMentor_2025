from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.interview import InterviewProcessResponse, InterviewMessageResponse, InterviewMessageRequest, InterviewProcessRequest, InterviewCVAssessmentRequest, InterviewCVAssessmentResponse, InterviewFinalAssessmentRequest, InterviewFinalAssessmentResponse, InterviewResponse, InterviewRequest
from app.database import get_db
from app.models.interview_process import InterviewProcess
from app.models.cv_assessment import InterviewCVAssessment
from app.models.final_assessment import InterviewFinalAssessment
from app.models.interview import Interview
from app.models.interview_message import InterviewMessage
from uuid import UUID
from app.dependencies import verify_jwt
from datetime import datetime
router = APIRouter()



#create interview_process
@router.post("/interview_processes", response_model=InterviewProcessResponse)
async def create_interview_process(request: InterviewProcessRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    job_id = request.job_id
    new_process = InterviewProcess(
        candidate_id=user.user.id,
        job_id=job_id,
        status=request.status,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(new_process)
    db.commit()
    db.refresh(new_process)
    
    return new_process


# create cv_assessment
@router.post("/interview_processes/{process_id}/cv_assessment", response_model=InterviewCVAssessmentResponse)
async def create_cv_assessment(process_id: UUID, request: InterviewCVAssessmentRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Check if the interview process exists
    interview_process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not interview_process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if interview_process.candidate_id != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    # Create the CV assessment
    new_assessment = InterviewCVAssessment(
        process_id = process_id,
        content = request.content,
        decision = request.decision,
        reviewer_name = request.reviewer_name,
        created_at = datetime.utcnow()
    )
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)

    return new_assessment

@router.post("/interview_processes/{process_id}/final_assessment", response_model=InterviewCVAssessmentResponse)
async def create_final_assessment(process_id: UUID, request: InterviewFinalAssessmentRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Check if the interview process exists
    interview_process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not interview_process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if interview_process.candidate_id != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    # Create the CV assessment
    interview = db.query(Interview).filter(Interview.process_id == process_id).first()
    new_assessment = InterviewFinalAssessment(
        process_id = process_id,
        interview_id = interview,
        content = request.content,
        final_decision = request.final_decision,
        assessor_name = request.assessor_name,
        created_at = datetime.utcnow()
    )
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)

    return new_assessment

@router.post ("/interview_processes/{process_id}/interview", response_model=InterviewResponse)
async def create_interview(process_id: UUID, request: InterviewRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Check if the interview process exists
    interview_process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not interview_process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if interview_process.candidate_id != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    
    # Create the interview
    new_interview = Interview(
        process_id = process_id,
        title = request.title,
        created_at = datetime.utcnow(),
        updated_at = datetime.utcnow()
    )
    db.add(new_interview)
    db.commit()
    db.refresh(new_interview)
    return new_interview

@router.post("/interview_processes/{process_id}/messages", response_model=InterviewMessageResponse)
async def create_interview_message(process_id: UUID, request: InterviewMessageRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
        process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
        if not process:
            raise HTTPException(status_code=404, detail="Interview process not found")
        if process.candidate_id != user.user.id:
            raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
        interview = db.query(Interview).filter(Interview.process_id == process_id).first()
        if not interview:
            raise HTTPException(status_code=404, detail="Interview not found")
        new_message = InterviewMessage(
            interview_id = interview.id,
            role = request.role,
            content = request.content,
            created_at = datetime.utcnow()
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        return new_message


@router.get("/interview_processes/{process_id}/messages", response_model=list[InterviewMessageResponse])
async def get_interview_messages(process_id: UUID, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if process.candidate_id != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    
    messages = db.query(InterviewMessage).filter(InterviewMessage.interview_id == process.id).all()
    return messages

