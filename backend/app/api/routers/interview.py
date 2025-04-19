from fastapi import APIRouter, Depends, HTTPException, Query, File, UploadFile
from sqlalchemy.orm import Session
from app.schemas.interview import RunCVAssessmentRequest, CreateInterviewCVAssessmentResponse, InterviewProcessResponse, InterviewMessageResponse, InterviewMessageRequest, InterviewProcessRequest, InterviewCVAssessmentRequest, InterviewCVAssessmentResponse, InterviewFinalAssessmentRequest, InterviewFinalAssessmentResponse, InterviewResponse, InterviewRequest
from app.database import get_db
from app.models.interview_process import InterviewProcess
from app.models.cv_assessment import InterviewCVAssessment
from app.models.final_assessment import InterviewFinalAssessment
from app.models.interview import Interview
from app.models.interview_message import InterviewMessage
from uuid import UUID
from app.models.job_description import JobDescription
from app.dependencies import verify_jwt
from datetime import datetime
from app.services.interview_service import InterviewService
from app.services.cv_assessment_service import CVAssessmentService
import os
import tempfile
import json

router = APIRouter()



#create interview_process
@router.post("/interview_processes", response_model=InterviewProcessResponse)
async def create_interview_process(request: InterviewProcessRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    job_id = request.job_id
    # Use "cv_review" as the default status or get it from the request
    # The status should match one of the allowed values in your DB constraint
    status = "cv_review" if request.status is None else request.status
    
    new_process = InterviewProcess(
        candidate_id=UUID(user.user.id),
        job_id=request.job_id,
        status=status,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(new_process)
    db.commit()
    db.refresh(new_process)
    
    return new_process


# create cv_assessment
@router.post("/interview_processes/{process_id}/cv_assessment", response_model=CreateInterviewCVAssessmentResponse)
async def create_cv_assessment(process_id: UUID, request: InterviewCVAssessmentRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Check if the interview process exists
    interview_process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not interview_process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if str(interview_process.candidate_id) != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    
    # Create the CV assessment
    new_assessment = InterviewCVAssessment(
        process_id=process_id,
        created_at=datetime.utcnow()
    )
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)

    # Return response according to CreateInterviewCVAssessmentResponse schema
    return CreateInterviewCVAssessmentResponse(
        id=new_assessment.id,
        interview_process_id=process_id,
        created_at=new_assessment.created_at
    )


@router.post("/interview_processes/{process_id}/final_assessment", response_model=InterviewFinalAssessmentResponse)
async def create_final_assessment(process_id: UUID, request: InterviewFinalAssessmentRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Check if the interview process exists
    interview_process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not interview_process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if str(interview_process.candidate_id) != user.user.id:
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
    if str(interview_process.candidate_id) != user.user.id:
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


#Messages-related endpoints
@router.post("/interview_processes/{process_id}/messages", response_model=InterviewMessageResponse)
async def create_interview_message(process_id: UUID, request: InterviewMessageRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
        process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
        if not process:
            raise HTTPException(status_code=404, detail="Interview process not found")
        interview = db.query(Interview).filter(Interview.process_id == process_id).first()
        if not interview:
            raise HTTPException(status_code=404, detail="Interview not found")
        
        # Save candidate's message
        new_message = InterviewMessage(
            interview_id = interview.id,
            role = request.role if request.role else "candidate",
            content = request.content,
            created_at = datetime.utcnow()
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)
        
        # Get AI response
        interview_service = InterviewService()
        # Use interview.id as the session ID
        ai_response = interview_service.get_response(request.content, str(interview.id))
        
        # Save AI's response message
        ai_message = InterviewMessage(
            interview_id = interview.id,
            role = "interviewer",  
            content = ai_response,
            created_at = datetime.utcnow()
        )
        db.add(ai_message)
        db.commit()
        db.refresh(ai_message)

        return ai_message


@router.get("/interview_processes/{process_id}/messages", response_model=list[InterviewMessageResponse])
async def get_interview_messages(process_id: UUID, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if process.candidate_id != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    
    messages = db.query(InterviewMessage).filter(InterviewMessage.interview_id == process.id).all()
    return messages




@router.post("/interview_processes/{process_id}/cv_assessment", response_model=InterviewCVAssessmentResponse)
async def run_cv_assessment(
    process_id: UUID, 
    cv: UploadFile = File(...), 
    user=Depends(verify_jwt), 
    db: Session = Depends(get_db)
):
    process = db.query(InterviewProcess).filter(InterviewProcess.id == process_id).first()
    if not process:
        raise HTTPException(status_code=404, detail="Interview process not found")
    if str(process.candidate_id) != user.user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this interview process")
    # lấy ra job_id từ process
    job_id = process.job_id
    # truy vấn vào bảng job và chuyển thành 1 file string
    job = db.query(JobDescription).filter(JobDescription.id == job_id).first()
    # chuyển sang string
    job_content = f"""Tiêu đề: {job.job_title}
                Công ty: {job.job_company}
                Mức lương: {job.salary}
                Khu vực: {job.region}
                Vị trí: {job.job_level}
                Kinh nghiệm: {job.experience}
                Trình độ học vấn: {job.education_level}
                Công việc liên quan: {job.related_job}
                Kỹ năng yêu cầu: {job.required_skills}
                Mô tả công việc: {job.job_description}
                Yêu cầu công việc: {job.job_requirement}
                Phúc lợi: {job.job_benefit}
                Địa điểm làm việc: {job.work_location}
                Link ứng tuyển: {job.job_link}"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            content = await cv.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        cv_assessment_service = CVAssessmentService()
        assessment_result = cv_assessment_service.cv_assessment(temp_path, job_content)
        new_assessment = InterviewCVAssessment(
            process_id=process_id,
            cv_json=json.dumps(),
            created_at=datetime.utcnow()
        )
        db.add(new_assessment)
        db.commit()
        db.refresh(new_assessment)
        
        os.unlink(temp_path)
        
        # Chuyển đổi JSON string trở lại thành dict để trả về
        cv_data = json.loads(new_assessment.cv_json)
    except Exception as e:
        # Xử lý lỗi và đảm bảo xóa file tạm nếu có
        if 'temp_path' in locals():
            os.unlink(temp_path)
        raise HTTPException(status_code=500, detail=f"Error processing CV: {str(e)}")
