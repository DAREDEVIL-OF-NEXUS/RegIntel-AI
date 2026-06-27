from pydantic import BaseModel

class RegulationRequest(BaseModel):
    text: str

class MAPRequest(BaseModel):
    obligation: str

class DepartmentRequest(BaseModel):
    map_text: str

class LoginRequest(BaseModel):
    username: str
    password: str

class EvidenceRequest(BaseModel):
    file_name: str
    map_text: str

class RegisterRequest(BaseModel):
    regulation: str
    parsed: str
    map_val: str
    department: str
    validation: str
    priority_score: int
    regulation_id_str: str
