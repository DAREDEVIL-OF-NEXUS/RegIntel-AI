from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base
from schemas.api import RegulationRequest, MAPRequest, DepartmentRequest, LoginRequest, EvidenceRequest
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

app = FastAPI(title="RegIntel AI")

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
        token = create_access_token({"sub": req.username, "role": "admin"})
        return {"access_token": token, "token_type": "bearer"}
    elif req.username == "officer" and req.password == "officer123":
        token = create_access_token({"sub": req.username, "role": "officer"})
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
        "parsed": state.parsed_output,
        "map": state.map_output,
        "department": state.department_output,
        "validation": state.validation_output,
        "priority_score": state.priority_score,
        "executed_by": current_user["username"]
    }

@app.post("/upload-evidence")
async def upload_evidence(
    map_text: str, 
    file: UploadFile = File(...), 
    current_user: dict = Depends(get_current_user)
):
    """Uses LLaVA or Gemini Vision to validate photographic proof of compliance."""
    contents = await file.read()
    try:
        result = EvidenceService.validate_evidence(contents, file.content_type, map_text)
        return result
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
            "regulation": log.regulation[:100] + "...", # Truncate for UI
            "parsed": log.parsed_output,
            "map": log.map_output,
            "department": log.department_output,
            "priority_score": log.priority_score,
            "status": log.status
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
            "regulation": log.regulation[:100] + "...", 
            "map": log.map_output,
            "department": log.department_output,
            "priority_score": log.priority_score,
            "status": log.status
        })
    return results