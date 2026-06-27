import json
from schemas.state import WorkflowState
from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department
from agents.validator_agent import validate_map

# These functions wrap our existing agents into Graph-compatible Nodes.
# They take a WorkflowState, perform an action, and return the modified state.

def parser_node(state: WorkflowState) -> WorkflowState:
    state.parsed_output = parse_regulation(state.regulation_text)
    return state

def map_node(state: WorkflowState) -> WorkflowState:
    try:
        parsed_json = json.loads(state.parsed_output)
        obligation = parsed_json.get("Obligation", state.regulation_text)
    except Exception:
        obligation = state.regulation_text
        
    state.map_output = generate_map(obligation)
    return state

def department_node(state: WorkflowState) -> WorkflowState:
    state.department_output = assign_department(state.map_output)
    return state

def validator_node(state: WorkflowState) -> WorkflowState:
    state.validation_output = validate_map(state.map_output)
    return state
