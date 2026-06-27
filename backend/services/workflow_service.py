import json
from sqlalchemy.orm import Session
from schemas.state import WorkflowState
from repositories.workflow_repository import WorkflowRepository
from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department
from agents.validator_agent import validate_map

class WorkflowService:
    """
    Manages the linear execution of the AI workflow (pre-graph phase).
    Passes a state object rather than raw strings to prepare for Graph migration.
    """
    def __init__(self, db: Session):
        self.repo = WorkflowRepository(db)

    def execute_workflow(self, text: str) -> WorkflowState:
        # Initialize the state
        state = WorkflowState(regulation_text=text)

        # Step 1: Parse
        try:
            state.parsed_output = parse_regulation(state.regulation_text)
            parsed_json = json.loads(state.parsed_output)
            obligation = parsed_json.get("Obligation", state.regulation_text)
        except Exception as e:
            state.error_message = f"Parsing failed: {str(e)}"
            state.status = "error"
            return state

        # Step 2: Generate MAP
        try:
            state.map_output = generate_map(obligation)
        except Exception as e:
            state.error_message = f"MAP generation failed: {str(e)}"
            state.status = "error"
            return state

        # Step 3: Assign Department
        try:
            state.department_output = assign_department(state.map_output)
        except Exception as e:
            state.error_message = f"Assignment failed: {str(e)}"
            state.status = "error"
            return state

        # Step 4: Validate
        try:
            state.validation_output = validate_map(state.map_output)
        except Exception as e:
            state.error_message = f"Validation failed: {str(e)}"
            state.status = "error"
            return state

        state.status = "completed"

        # Save to DB via Repository
        self.repo.save_workflow_log(
            regulation=state.regulation_text,
            parsed=state.parsed_output,
            map_val=state.map_output,
            department=state.department_output,
            validation=state.validation_output
        )

        return state
