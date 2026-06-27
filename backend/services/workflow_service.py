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

    def execute_workflow(self, text: str) -> WorkflowState:
        # Initialize the state
        initial_state = WorkflowState(regulation_text=text)

        # Execute Graph
        final_state = self.graph.execute(initial_state)

        # Save to DB if completed successfully
        if final_state.status != "error":
            # Attempt to extract priority score if agent output it in JSON, else default 5
            try:
                import json
                parsed_json = json.loads(final_state.parsed_output)
                p_score = int(parsed_json.get("Priority_Score_1_to_10", 5))
                final_state.priority_score = p_score
            except:
                final_state.priority_score = 5

            self.repo.save_workflow_log(
                regulation=final_state.regulation_text,
                parsed=final_state.parsed_output,
                map_val=final_state.map_output,
                department=final_state.department_output,
                validation=final_state.validation_output,
                priority_score=final_state.priority_score
            )

        return final_state
