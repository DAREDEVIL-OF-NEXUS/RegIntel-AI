# RegIntel AI - Development Status

This document tracks the current structure and position in development. It serves as an onboarding guide for any new developer or agent joining the project.

## Current Phase: Phase 2 (Graph Orchestrator Implementation)

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | Repository hygiene, scaffold directories, `pyproject.toml`, `.gitignore`. | ✅ **Complete** |
| **Phase 1** | Decouple `main.py`, introduce `LLMGateway`, `WorkflowState`, `Repositories`, and `Services`. | ✅ **Complete** |
| **Phase 2** | Custom Graph Orchestrator, Nodes, State transitions. | 🚧 **In Progress** |
| **Phase 3** | Knowledge Layer, Agent upgrades, Semantic Search. | ⏳ Pending |
| **Phase 4** | Authentication, Evidence Service, Dashboards. | ⏳ Pending |
| **Phase 5** | Production Readiness, PostgreSQL, Docker. | ⏳ Pending |

## System Structure Overview (As of Phase 1)
- `backend/main.py`: Clean API endpoints delegating all logic to Services.
- `backend/database.py` & `backend/models.py`: SQLAlchemy setup and models.
- `backend/agents/`: Agent logic utilizing `LLMGateway` instead of direct API calls.
- `backend/repositories/workflow_repository.py`: Isolates DB writes for audit logs.
- `backend/services/workflow_service.py`: Linear orchestrator using `WorkflowState`.
- `backend/services/llm_gateway.py`: Decoupled AI invocation with fallback design.
- `backend/schemas/`: `api.py` (FastAPI models) and `state.py` (WorkflowState).

## Recent Updates
- Completed Phase 1: Massive decoupling. Extracted business and AI logic from `main.py`.
- Introduced `WorkflowState` to replace raw string passing between components.
