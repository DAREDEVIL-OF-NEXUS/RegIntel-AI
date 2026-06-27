from sqlalchemy import Column, Integer, String, Text
from database import Base


class WorkflowLog(Base):
    __tablename__ = "workflow_logs"

    id = Column(Integer, primary_key=True, index=True)

    regulation = Column(Text)

    parsed_output = Column(Text)

    map_output = Column(Text)

    department_output = Column(Text)

    validation_output = Column(Text)
    
    priority_score = Column(Integer, default=5)
    
    regulation_id_str = Column(String, index=True)
    
    ai_summary = Column(Text, nullable=True)
    
    ai_recommendation = Column(Text, nullable=True)
    
    failed_attempts = Column(Integer, default=0)
    
    is_escalated = Column(Integer, default=0) # 0 False, 1 True
    
    assigned_officer = Column(String, nullable=True)
    
    status = Column(String, default="pending")

class UserStats(Base):
    __tablename__ = "user_stats"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    department = Column(String, nullable=True)
    total_failed_attempts = Column(Integer, default=0)
    is_banned = Column(Integer, default=0)

class Regulation(Base):
    __tablename__ = "regulations"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    content = Column(Text)
    
    priority_score = Column(Integer, default=5)
    
    status = Column(String, default="pending")


class MAP(Base):
    __tablename__ = "maps"

    id = Column(Integer, primary_key=True, index=True)

    regulation_id = Column(Integer)

    description = Column(Text)

    department = Column(String)

    status = Column(String)


class Validation(Base):
    __tablename__ = "validations"

    id = Column(Integer, primary_key=True, index=True)

    map_id = Column(Integer)

    score = Column(Integer)

    result = Column(String)