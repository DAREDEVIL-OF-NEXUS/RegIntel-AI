# RegIntel AI - Development Status

This document tracks the current structure and position in development. It serves as an onboarding guide for any new developer or agent joining the project.

## Current Phase: Phase 3 (Knowledge Layer & Agent Upgrades)

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | Repository hygiene, scaffold directories, `pyproject.toml`, `.gitignore`. | ✅ **Complete** |
| **Phase 1** | Decouple `main.py`, introduce `LLMGateway`, `WorkflowState`, `Repositories`, and `Services`. | ✅ **Complete** |
| **Phase 2** | Custom Graph Orchestrator, Nodes, State transitions. | ✅ **Complete** |
| **Phase 3** | Knowledge Layer, Agent upgrades, Semantic Search. | 🚧 **In Progress** |
| **Phase 4** | Authentication, Evidence Service, Dashboards. | ⏳ Pending |
| **Phase 5** | Production Readiness, PostgreSQL, Docker. | ⏳ Pending |

## System Structure Overview (As of Phase 2)
- `backend/main.py`: Clean API endpoints delegating logic.
- `backend/graph/`: **[NEW]** Contains `core.py` (the custom orchestration engine) and `nodes.py` (agent wrappers).
- `backend/services/workflow_service.py`: Instantiates and executes the custom graph instead of a hardcoded linear script.
- `backend/database.py` & `backend/models.py`: SQLAlchemy setup and models.
- `backend/agents/`: Standalone agent logic (Parser, MAP, Department, Validator) called by graph nodes.
- `backend/repositories/workflow_repository.py`: Isolates DB writes.
- `backend/services/llm_gateway.py`: Decoupled AI invocation.
- `backend/schemas/state.py`: The `WorkflowState` object passed continuously through the graph.

## Recent Updates
- Completed Phase 2: Built a custom, lightweight LangGraph alternative. Agents are now wrapped in Graph Nodes, and the orchestration is explicitly managed by a scalable `Graph` engine with state transitions and error halting.
