from sqlalchemy.orm import Session
from schemas.state import WorkflowState
from repositories.workflow_repository import WorkflowRepository
from graph.core import Graph
from graph.nodes import parser_node, map_node, department_node, validator_node

class WorkflowService:
    """
    Manages the execution of the AI workflow using the custom Graph Engine.
    Provides complete visibility, state tracking, and independent node execution.
    """
    def __init__(self, db: Session):
        self.repo = WorkflowRepository(db)
        self.graph = self._build_graph()

    def _build_graph(self) -> Graph:
        g = Graph()
        
        # 1. Register Nodes
        g.add_node("parser", parser_node)
        g.add_node("map_generator", map_node)
        g.add_node("department_assigner", department_node)
        g.add_node("validator", validator_node)
        
        # 2. Set Entry Point
        g.set_entry_point("parser")
        
        # 3. Define Edges (linear for now, but ready for conditional logic)
        g.add_edge("parser", "map_generator")
        g.add_edge("map_generator", "department_assigner")
        g.add_edge("department_assigner", "validator")
        g.add_edge("validator", "END")
        
        # Future conditional example:
        # def validator_router(state: WorkflowState) -> str:
        #     if "PASS" in state.validation_output: return "END"
        #     return "evidence_gap_agent"
        # g.add_conditional_edge("validator", validator_router)
        
        return g

    def _clean_json(self, text: str) -> str:
        if not text: return "{}"
        
        import re
        # Try to find a JSON block between curly braces or brackets
        match = re.search(r'(\{.*?\}|\[.*?\])', text, re.DOTALL)
        if match:
            return match.group(0).strip()
            
        return text.strip()

    def execute_workflow(self, text: str) -> WorkflowState:
        # Initialize the state
        initial_state = WorkflowState(regulation_text=text)

        # Execute Graph
        final_state = self.graph.execute(initial_state)

        # Save to DB if completed successfully
        if final_state.status != "error":
            import json
            import uuid
            
            # Clean all outputs
            final_state.parsed_output = self._clean_json(final_state.parsed_output)
            final_state.map_output = self._clean_json(final_state.map_output)
            final_state.department_output = self._clean_json(final_state.department_output)
            final_state.validation_output = self._clean_json(final_state.validation_output)
            
            p_score = 5
            try:
                parsed_json = json.loads(final_state.parsed_output)
                p_score = int(parsed_json.get("Priority_Score_1_to_10", 5))
            except:
                pass
            final_state.priority_score = p_score
            
            ai_summary = ""
            ai_recommendation = ""
            try:
                map_json = json.loads(final_state.map_output)
                ai_summary = map_json.get("ai_summary", "")
                ai_recommendation = map_json.get("ai_recommendation", "")
            except:
                pass

            reg_id = f"REG-{str(uuid.uuid4())[:8].upper()}"
            final_state.regulation_id_str = reg_id

        return final_state
