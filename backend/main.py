from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session
import json

from database import engine
from models import Base, WorkflowLog

from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department
from agents.validator_agent import validate_map

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="RegIntel AI")


# =====================================
# Request Models
# =====================================

class RegulationRequest(BaseModel):
    text: str


class MAPRequest(BaseModel):
    obligation: str


class DepartmentRequest(BaseModel):
    map_text: str


# =====================================
# Health Check
# =====================================

@app.get("/")
def root():
    return {
        "status": "running",
        "project": "RegIntel AI"
    }


# =====================================
# Parser Agent
# =====================================

@app.post("/parse")
def parse(req: RegulationRequest):

    result = parse_regulation(req.text)

    return {
        "result": result
    }


# =====================================
# MAP Generator Agent
# =====================================

@app.post("/generate-map")
def create_map(req: MAPRequest):

    result = generate_map(req.obligation)

    return {
        "result": result
    }


# =====================================
# Department Assignment Agent
# =====================================

@app.post("/assign-department")
def assign(req: DepartmentRequest):

    result = assign_department(req.map_text)

    return {
        "result": result
    }


# =====================================
# Validator Agent
# =====================================

@app.post("/validate-map")
def validate(req: DepartmentRequest):

    result = validate_map(req.map_text)

    return {
        "result": result
    }


# =====================================
# Full Workflow
# =====================================

@app.post("/run-workflow")
def run_workflow(req: RegulationRequest):

    # Step 1: Parse Regulation
    parsed = parse_regulation(req.text)

    parsed_json = json.loads(parsed)

    obligation = parsed_json.get("Obligation", "")

    # Step 2: Generate MAP
    map_result = generate_map(obligation)

    # Step 3: Assign Department
    department = assign_department(map_result)

    # Step 4: Validate MAP
    validation = validate_map(map_result)

    # Step 5: Save Audit Log
    db = Session(bind=engine)

    log = WorkflowLog(
        regulation=req.text,
        parsed_output=str(parsed),
        map_output=str(map_result),
        department_output=str(department),
        validation_output=str(validation)
    )

    db.add(log)
    db.commit()
    db.close()

    return {
        "parsed": parsed,
        "map": map_result,
        "department": department,
        "validation": validation
    }


# =====================================
# Audit Logs
# =====================================

@app.get("/audit-logs")
def audit_logs():

    db = Session(bind=engine)

    logs = db.query(WorkflowLog).all()

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

    db.close()

    return results