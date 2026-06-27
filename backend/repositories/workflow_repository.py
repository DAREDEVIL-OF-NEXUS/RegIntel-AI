from sqlalchemy.orm import Session
from typing import List

from models import WorkflowLog

class WorkflowRepository:
    """
    Handles all database interactions related to workflows.
    Isolates the ORM from the rest of the application.
    """
    
    def __init__(self, db: Session):
        self.db = db

    def save_workflow_log(self, regulation: str, parsed: str, map_val: str, department: str, validation: str, priority_score: int, status: str = "pending") -> WorkflowLog:
        log = WorkflowLog(
            regulation=regulation,
            parsed_output=parsed,
            map_output=map_val,
            department_output=department,
            validation_output=validation,
            priority_score=priority_score,
            status=status
        )
        self.db.add(log)
        self.db.commit()
        self.db.refresh(log)
        return log

    def get_all_logs(self) -> List[WorkflowLog]:
        return self.db.query(WorkflowLog).all()
