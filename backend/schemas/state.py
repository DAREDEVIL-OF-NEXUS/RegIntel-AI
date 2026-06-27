from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class WorkflowState(BaseModel):
    """
    The central state object that travels through the graph orchestrator.
    Every agent will read from and update this state instead of passing raw strings.
    """
    regulation_text: str = Field(default="", description="The original regulation text.")
    parsed_output: str = Field(default="", description="JSON string or dict of parsed obligation, deadline, risk.")
    map_output: str = Field(default="", description="Generated Measurable Action Point (MAP).")
    department_output: str = Field(default="", description="Assigned department.")
    validation_output: str = Field(default="", description="Validation score and result.")
    
    # Metadata for routing and history
    status: str = Field(default="pending", description="Current status of the workflow.")
    error_message: Optional[str] = Field(default=None, description="Any error encountered during execution.")
