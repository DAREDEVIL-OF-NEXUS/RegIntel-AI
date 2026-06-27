# RegIntel AI - Development Status

This document tracks the current structure and position in development. It serves as an onboarding guide for any new developer or agent joining the project.

## Current Phase: Phase 5 (Production Readiness)

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | Repository hygiene, scaffold directories, `pyproject.toml`, `.gitignore`. | ✅ **Complete** |
| **Phase 1** | Decouple `main.py`, introduce `LLMGateway`, `WorkflowState`, `Repositories`, and `Services`. | ✅ **Complete** |
| **Phase 2** | Custom Graph Orchestrator, Nodes, State transitions. | ✅ **Complete** |
| **Phase 3** | Knowledge Layer, Agent upgrades, Semantic Search. | ✅ **Complete** |
| **Phase 4** | Authentication, Evidence Service, Dashboards (Frontend). | ✅ **Complete** |
| **Phase 5** | Production Readiness, PostgreSQL, Docker. | 🚧 **In Progress** |

## System Structure Overview (As of Phase 4)
- `frontend/app.py`: **[NEW]** Streamlit UI Dashboard connecting to the backend API.
- `backend/main.py`: API endpoints protected by JWT Authentication and RBAC.
- `backend/auth/jwt_handler.py`: **[NEW]** Manages token creation and Admin vs Officer role enforcement.
- `backend/services/evidence_service.py`: **[NEW]** Handles upload and mock validation of compliance proof files.
- `backend/graph/`: Contains `core.py` (orchestration engine) and `nodes.py` (agent wrappers).
- `backend/services/knowledge_service.py`: Simulates a Vector Database for Semantic Search.
- `backend/services/workflow_service.py`: Instantiates and executes the custom graph.
- `backend/agents/`: Standalone agent logic.
- `backend/repositories/workflow_repository.py`: Isolates DB writes.
- `backend/services/llm_gateway.py`: Decoupled AI invocation.
- `backend/schemas/state.py`: The `WorkflowState` object.
- `backend/schemas/api.py`: FastAPI request schemas.

## Recent Updates
- Completed Phase 4: Added Enterprise Features! We built the `frontend/` Streamlit Dashboard. Added JWT-based Role-Based Access Control (RBAC) to distinguish between Officers and Admins. Introduced the `EvidenceService` to validate compliance proofs.
