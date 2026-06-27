import json
from schemas.state import WorkflowState
from agents.parser_agent import parse_regulation
from agents.map_agent import generate_map
from agents.assignment_agent import assign_department
from agents.validator_agent import validate_map
from services.knowledge_service import KnowledgeService

# Initialize the knowledge layer
knowledge_db = KnowledgeService()

def parser_node(state: WorkflowState) -> WorkflowState:
    # 1. Retrieve Historical Context (Memory)
    state.historical_context = knowledge_db.search_similar_regulations(state.regulation_text)
    
    # 2. Parse with context
    state.parsed_output = parse_regulation(state.regulation_text, state.historical_context)
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
