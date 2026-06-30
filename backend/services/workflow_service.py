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
        # Strip potential markdown blocks
        text = re.sub(r'```(?:json)?\s*', '', text)
        text = re.sub(r'```\s*', '', text)
        
        start_brace = text.find('{')
        start_bracket = text.find('[')
        
        start = -1
        is_obj = True
        if start_brace != -1 and start_bracket != -1:
            if start_brace < start_bracket:
                start = start_brace
            else:
                start = start_bracket
                is_obj = False
        elif start_brace != -1:
            start = start_brace
        elif start_bracket != -1:
            start = start_bracket
            is_obj = False
            
        if start != -1:
            end_char = '}' if is_obj else ']'
            end = text.rfind(end_char)
            if end != -1 and end > start:
                json_str = text[start:end+1].strip()
                # Remove any trailing commas that might break json.loads
                json_str = re.sub(r',\s*([\}\]])', r'\1', json_str)
                return json_str
            
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
                parsed_json = json.loads(final_state.parsed_output, strict=False)
                p_score = int(parsed_json.get("Priority_Score_1_to_10", 5))
                # Do NOT overwrite parsed_output here if the UI expects it to be JSON, but let's check.
            except:
                pass
            final_state.priority_score = p_score
            
            ai_summary = ""
            ai_recommendation = ""
            try:
                map_json = json.loads(final_state.map_output, strict=False)
                for k in ["map", "metric", "evidence_required", "ai_summary", "ai_recommendation"]:
                    if k not in map_json:
                        map_json[k] = "Not provided."
                final_state.map_output = json.dumps(map_json)
            except Exception as e:
                print(f"Failed to parse MAP JSON: {e}")
                print(f"Raw map_output was: {repr(final_state.map_output)}")
                
                import re
                fallback_map = {}
                keys = ["map", "metric", "evidence_required", "ai_summary", "ai_recommendation"]
                for key in keys:
                    pattern = f'"{key}"\\s*:\\s*"(.*?)"(?=\\s*,\\s*"|\\s*\\}}\\s*$)'
                    match = re.search(pattern, final_state.map_output, re.DOTALL)
                    if match:
                        val = match.group(1)
                        val = val.replace('\\n', '\n').replace('\\"', '"')
                        fallback_map[key] = val
                    else:
                        pattern_nq = f'"{key}"\\s*:\\s*([^,}}]+)'
                        match_nq = re.search(pattern_nq, final_state.map_output, re.DOTALL)
                        if match_nq:
                            fallback_map[key] = match_nq.group(1).strip().strip('"')
                        else:
                            fallback_map[key] = "Not provided."
                final_state.map_output = json.dumps(fallback_map)
                
            try:
                dept_json = json.loads(final_state.department_output, strict=False)
                if "department" in dept_json:
                    final_state.department_output = str(dept_json.get("department", final_state.department_output))
            except:
                pass

            reg_id = f"REG-{str(uuid.uuid4())[:8].upper()}"
            final_state.regulation_id_str = reg_id

        return final_state
