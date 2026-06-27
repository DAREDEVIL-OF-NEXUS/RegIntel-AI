from pydantic import BaseModel

class RegulationRequest(BaseModel):
    text: str

class MAPRequest(BaseModel):
    obligation: str

class DepartmentRequest(BaseModel):
    map_text: str
