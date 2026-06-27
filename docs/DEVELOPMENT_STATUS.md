# RegIntel AI - Development Status

This document tracks the current structure and position in development. It serves as an onboarding guide for any new developer or agent joining the project.

## Current Phase: Phase 4 (Enterprise Features & Frontend)

| Phase | Description | Status |
|---|---|---|
| **Phase 0** | Repository hygiene, scaffold directories, `pyproject.toml`, `.gitignore`. | ✅ **Complete** |
| **Phase 1** | Decouple `main.py`, introduce `LLMGateway`, `WorkflowState`, `Repositories`, and `Services`. | ✅ **Complete** |
| **Phase 2** | Custom Graph Orchestrator, Nodes, State transitions. | ✅ **Complete** |
| **Phase 3** | Knowledge Layer, Agent upgrades, Semantic Search. | ✅ **Complete** |
| **Phase 4** | Authentication, Evidence Service, Dashboards (Frontend). | 🚧 **In Progress** |
| **Phase 5** | Production Readiness, PostgreSQL, Docker. | ⏳ Pending |

## System Structure Overview (As of Phase 3)
- `backend/main.py`: Clean API endpoints delegating logic.
- `backend/graph/`: Contains `core.py` (orchestration engine) and `nodes.py` (agent wrappers).
- `backend/services/knowledge_service.py`: **[NEW]** Mocks a Vector Database for Semantic Search and Regulation Versioning.
- `backend/services/workflow_service.py`: Instantiates and executes the custom graph.
- `backend/agents/`: Standalone agent logic. **[UPGRADED]** Parser Agent now accepts historical context for smarter generation.
- `backend/repositories/workflow_repository.py`: Isolates DB writes.
- `backend/services/llm_gateway.py`: Decoupled AI invocation.
- `backend/schemas/state.py`: The `WorkflowState` object, now carrying `historical_context` memory.

## Recent Updates
- Completed Phase 3: Introduced "Memory" into the AI workflow. The Graph Engine now queries the `KnowledgeService` and passes historical context into the `ParserAgent` so it doesn't hallucinate or repeat past mistakes.
