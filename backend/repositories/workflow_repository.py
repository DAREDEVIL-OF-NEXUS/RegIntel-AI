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

    def save_workflow_log(self, regulation: str, parsed: str, map_val: str, department: str, validation: str, priority_score: int, status: str = "pending", ai_summary: str = "", ai_recommendation: str = "", regulation_id_str: str = "") -> WorkflowLog:
        log = WorkflowLog(
            regulation=regulation,
            parsed_output=parsed,
            map_output=map_val,
            department_output=department,
            validation_output=validation,
            priority_score=priority_score,
            status=status,
            ai_summary=ai_summary,
            ai_recommendation=ai_recommendation,
            regulation_id_str=regulation_id_str
        )
        self.db.add(log)
        self.db.commit()
        self.db.refresh(log)
        return log

    def get_all_logs(self) -> List[WorkflowLog]:
        return self.db.query(WorkflowLog).all()

    def get_log_by_reg_id(self, reg_id: str) -> WorkflowLog:
        return self.db.query(WorkflowLog).filter(WorkflowLog.regulation_id_str == reg_id).first()

    def get_user_stats(self, username: str):
        from models import UserStats
        stats = self.db.query(UserStats).filter(UserStats.username == username).first()
        if not stats:
            stats = UserStats(username=username)
            self.db.add(stats)
            self.db.commit()
            self.db.refresh(stats)
        return stats
