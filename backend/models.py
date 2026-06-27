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
    
    status = Column(String, default="pending")


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