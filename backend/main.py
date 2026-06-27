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
    # Mock authentication logic
    if req.username == "admin" and req.password == "admin123":
        token = create_access_token(username="admin", role="admin")
    elif req.username == "officer" and req.password == "officer123":
        token = create_access_token(username="officer", role="officer")
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

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
        "executed_by": current_user["username"]
    }

@app.post("/upload-evidence")
def upload_evidence(req: EvidenceRequest, current_user: dict = Depends(get_current_user)):
    """Simulates an evidence upload and validation."""
    result = EvidenceService.validate_evidence(req.file_name, req.map_text)
    return result

@app.get("/audit-logs")
def audit_logs(db: Session = Depends(get_db), current_user: dict = Depends(require_admin)):
    """Only admins can view full audit logs."""
    repo = WorkflowRepository(db)
    logs = repo.get_all_logs()
    
    results = []
    for log in logs:
        results.append({
            "id": log.id,
            "regulation": log.regulation,
            "parsed": log.parsed_output,
            "map": log.map_output,
            "department": log.department_output,
            "validation": log.validation_output
        })
    return results