from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base
from schemas.api import RegulationRequest, MAPRequest, DepartmentRequest, LoginRequest, EvidenceRequest, RegisterRequest
from services.workflow_service import WorkflowService
from repositories.workflow_repository import WorkflowRepository
from services.evidence_service import EvidenceService
from auth.jwt_handler import create_access_token, get_current_user, require_admin

from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department
from agents.validator_agent import validate_map

# Create database tables
Base.metadata.create_all(bind=engine)

def seed_db_if_empty():
    db = SessionLocal()
    repo = WorkflowRepository(db)
    if len(repo.get_all_logs()) < 20:
        import random
        departments = ["IT & Cyber Security", "Risk Management", "HR & Operations", "Legal & Compliance", "Finance"]
        statuses = ["pending", "implemented", "in-progress"]
        for i in range(20):
            dept = random.choice(departments)
            score = random.randint(1, 10)
            status = random.choice(statuses)
            import uuid
            repo.save_workflow_log(
                regulation=f"Dummy Regulation #{i+1} concerning {dept.lower()} requirements.",
                parsed=f"{{\"intent\": \"enforce {dept.lower()} compliance\"}}",
                map_val=f"{{\"action\": \"Audit {dept.lower()} systems within 30 days\"}}",
                department=dept,
                validation=f"{{\"status\": \"{status}\"}}",
                priority_score=score,
                status=status,
                ai_summary="This is a summary for novice users.",
                ai_recommendation="Step 1: Audit. Step 2: Implement. Step 3: Monitor.",
                regulation_id_str=f"REG-{str(uuid.uuid4())[:8].upper()}"
            )
    db.close()

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_db_if_empty()
    yield

app = FastAPI(title="RegIntel AI", lifespan=lifespan)

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "status": "running",
        "project": "RegIntel AI"
    }

# =====================================
# Auth Endpoints
# =====================================
@app.post("/login")
def login(req: LoginRequest):
    if req.username == "admin" and req.password == "admin123":
        token = create_access_token(username=req.username, role="admin")
        return {"access_token": token, "token_type": "bearer"}
    elif req.username == "officer" and req.password == "officer123":
        token = create_access_token(username=req.username, role="officer")
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# =====================================
# Agent Endpoints
# =====================================
@app.post("/parse")
def parse(req: RegulationRequest):
    result = parse_regulation(req.text)
    return {"result": result}

@app.post("/generate-map")
def create_map(req: MAPRequest):
    result = generate_map(req.obligation)
    return {"result": result}

@app.post("/assign-department")
def assign(req: DepartmentRequest):
    result = assign_department(req.map_text)
    return {"result": result}

@app.post("/validate-map")
def validate(req: DepartmentRequest):
    result = validate_map(req.map_text)
    return {"result": result}

from fastapi import UploadFile, File
from utils.pdf_parser import extract_text_from_pdf
from utils.scraper import scrape_rbi_notifications

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    """Extracts text from an uploaded PDF file offline."""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    contents = await file.read()
    try:
        text = extract_text_from_pdf(contents)
        return {"status": "success", "text": text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/scrape")
def scrape_rbi(current_user: dict = Depends(get_current_user)):
    """Online fallback to scrape latest RBI circulars."""
    try:
        links = scrape_rbi_notifications()
        return {"status": "success", "data": links}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# =====================================
# Orchestration & Features
# =====================================
@app.post("/run-workflow")
def run_workflow(req: RegulationRequest, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    service = WorkflowService(db)
    state = service.execute_workflow(req.text)
    
    if state.status == "error":
        return {"error": state.error_message}
        
    return {
        "id": state.regulation_id_str if hasattr(state, "regulation_id_str") else None,
        "regulation": state.regulation_text,
        "parsed": state.parsed_output,
        "map": state.map_output,
        "department": state.department_output,
        "validation": state.validation_output,
        "priority_score": state.priority_score,
        "executed_by": current_user["username"]
    }

@app.post("/register-obligation")
def register_obligation(req: RegisterRequest, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    repo = WorkflowRepository(db)
    
    import json
    ai_summary = ""
    ai_recommendation = ""
    try:
        map_json = json.loads(req.map_val)
        ai_summary = map_json.get("ai_summary", "")
        ai_recommendation = map_json.get("ai_recommendation", "")
    except:
        pass
        
    repo.save_workflow_log(
        regulation=req.regulation,
        parsed=req.parsed,
        map_val=req.map_val,
        department=req.department,
        validation=req.validation,
        priority_score=req.priority_score,
        ai_summary=ai_summary,
        ai_recommendation=ai_recommendation,
        regulation_id_str=req.regulation_id_str
    )
    return {"status": "success"}

@app.post("/upload-evidence")
async def upload_evidence(
    regulation_id_str: str, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Uses LLaVA or Gemini Vision to validate photographic proof of compliance and tracks fraud attempts."""
    repo = WorkflowRepository(db)
    log = repo.get_log_by_reg_id(regulation_id_str)
    
    if not log:
        raise HTTPException(status_code=404, detail="Regulation not found.")
        
    user_stats = repo.get_user_stats(current_user["username"])
    if user_stats.is_banned:
        raise HTTPException(status_code=403, detail="Your account has been banned due to repeated fraudulent evidence uploads.")
        
    if log.failed_attempts >= 3:
        raise HTTPException(status_code=403, detail="Maximum evidence upload attempts (3) exceeded for this regulation.")

    contents = await file.read()
    try:
        result = EvidenceService.validate_evidence(contents, file.content_type, log.map_output)
        
        if result["status"] == "REJECTED":
            log.failed_attempts += 1
            log.is_escalated = 1
            user_stats.total_failed_attempts += 1
            
            if user_stats.total_failed_attempts >= 6:
                user_stats.is_banned = 1
                
            repo.db.commit()
            return {
                "status": "REJECTED",
                "escalated": True,
                "reason": result["reason"],
                "failed_attempts": log.failed_attempts
            }
        else:
            log.status = "implemented"
            repo.db.commit()
            return {
                "status": "APPROVED",
                "reason": result["reason"]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard/admin")
def admin_dashboard(db: Session = Depends(get_db), current_user: dict = Depends(require_admin)):
    """Admin dashboard fetches all logs, sorted by highest priority score."""
    repo = WorkflowRepository(db)
    logs = repo.get_all_logs()
    
    # Sort by priority score (descending)
    sorted_logs = sorted(logs, key=lambda x: x.priority_score, reverse=True)
    
    results = []
    for log in sorted_logs:
        results.append({
            "id": log.id,
            "regulation_id": log.regulation_id_str,
            "regulation": log.regulation[:100] + "...", # Truncate for UI
            "parsed": log.parsed_output,
            "map": log.map_output,
            "ai_summary": log.ai_summary,
            "ai_recommendation": log.ai_recommendation,
            "department": log.department_output,
            "priority_score": log.priority_score,
            "status": log.status,
            "is_escalated": bool(log.is_escalated),
            "failed_attempts": log.failed_attempts
        })
    return results

@app.get("/dashboard/officer")
def officer_dashboard(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """Officer dashboard fetches logs, sorted by priority score."""
    repo = WorkflowRepository(db)
    logs = repo.get_all_logs()
    
    # Simulate filtering by department (In production, current_user would have a department_id)
    # For MVP, we just sort by priority score
    sorted_logs = sorted(logs, key=lambda x: x.priority_score, reverse=True)
    
    results = []
    for log in sorted_logs:
        results.append({
            "id": log.id,
            "regulation_id": log.regulation_id_str,
            "regulation": log.regulation[:100] + "...", 
            "map": log.map_output,
            "ai_summary": log.ai_summary,
            "ai_recommendation": log.ai_recommendation,
            "department": log.department_output,
            "priority_score": log.priority_score,
            "status": log.status,
            "is_escalated": bool(log.is_escalated)
        })
    return results