from typing import Optional
from pydantic import BaseModel, Field

class WorkflowState(BaseModel):
    """
    The central state object that travels through the graph orchestrator.
    Every agent will read from and update this state instead of passing raw strings.
    """
    regulation_text: str = Field(default="", description="The original regulation text.")
    historical_context: str = Field(default="", description="Relevant historical regulations retrieved from Knowledge Layer.")
    
    parsed_output: str = Field(default="", description="JSON string or dict of parsed obligation, deadline, risk.")
    map_output: str = Field(default="", description="Generated Measurable Action Point (MAP).")
    department_output: str = Field(default="", description="Assigned department.")
    validation_output: str = Field(default="", description="Validation score and result.")
    priority_score: int = Field(default=5, description="Dynamically calculated priority severity (1-10).")
    
    # Metadata for routing and history
    status: str = Field(default="pending", description="Current status of the workflow.")
    error_message: Optional[str] = Field(default=None, description="Any error encountered during execution.")
