from typing import Callable, Dict
from schemas.state import WorkflowState

class Node:
    """Represents a single step in the workflow graph."""
    def __init__(self, name: str, func: Callable[[WorkflowState], WorkflowState]):
        self.name = name
        self.func = func
        
    def execute(self, state: WorkflowState) -> WorkflowState:
        return self.func(state)

class Graph:
    """
    Custom Lightweight Graph Orchestrator.
    Manages state execution, node transitions, and conditional routing.
    """
    def __init__(self):
        self.nodes: Dict[str, Node] = {}
        self.edges: Dict[str, Callable[[WorkflowState], str]] = {}
        self.entry_point: str = None
        
    def add_node(self, name: str, func: Callable[[WorkflowState], WorkflowState]):
        self.nodes[name] = Node(name, func)
        
    def set_entry_point(self, name: str):
        self.entry_point = name
        
    def add_edge(self, from_node: str, next_node: str):
        """Adds an unconditional edge between nodes."""
        self.edges[from_node] = lambda state: next_node
        
    def add_conditional_edge(self, from_node: str, condition: Callable[[WorkflowState], str]):
        """Adds a conditional edge based on a routing function."""
        self.edges[from_node] = condition
        
    def execute(self, initial_state: WorkflowState) -> WorkflowState:
        """Executes the graph from the entry point until 'END' or error."""
        current_node_name = self.entry_point
        state = initial_state
        
        while current_node_name != "END":
            node = self.nodes.get(current_node_name)
            if not node:
                state.error_message = f"Node '{current_node_name}' not found."
                state.status = "error"
                break
                
            try:
                state = node.execute(state)
            except Exception as e:
                state.error_message = f"Error executing node '{current_node_name}': {str(e)}"
                state.status = "error"
                break
                
            # If a node sets an error status, halt execution
            if state.status == "error":
                break
                
            # Find next node logic
            edge_logic = self.edges.get(current_node_name)
            if not edge_logic:
                break # No further edges defined, terminate loop
                
            current_node_name = edge_logic(state)
            
        if state.status != "error":
            state.status = "completed"
            
        return state
