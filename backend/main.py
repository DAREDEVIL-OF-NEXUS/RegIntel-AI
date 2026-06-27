from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base
from schemas.api import RegulationRequest, MAPRequest, DepartmentRequest
from services.workflow_service import WorkflowService
from repositories.workflow_repository import WorkflowRepository
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


@app.post("/run-workflow")
def run_workflow(req: RegulationRequest, db: Session = Depends(get_db)):
    service = WorkflowService(db)
    state = service.execute_workflow(req.text)
    
    if state.status == "error":
        return {"error": state.error_message}
        
    return {
        "parsed": state.parsed_output,
        "map": state.map_output,
        "department": state.department_output,
        "validation": state.validation_output
    }


@app.get("/audit-logs")
def audit_logs(db: Session = Depends(get_db)):
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