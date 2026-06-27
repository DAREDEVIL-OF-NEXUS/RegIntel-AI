# ADR-001: Architecture and Phased Evolution Strategy

## Status
Accepted

## Context
The RegIntel AI platform aims to automate the interpretation and compliance workflow of regulatory circulars. It started as a hackathon MVP with a linear, tightly-coupled script in `main.py` directly calling LLMs and databases. To transform this into a production-grade Agentic AI platform, we must refactor it into a scalable, state-driven, layered architecture without disrupting current capabilities.

## Decision
We have decided to adopt a **Service-Oriented Architecture (SOA)** supported by a **Custom Graph-Based Orchestration Engine**. We reject a monolithic API design and also reject adopting heavy frameworks like LangGraph, preferring a lightweight, custom execution graph that demonstrates deep architectural understanding.

### Architecture Layers
1. **API Layer**: Exposes endpoints (FastAPI), completely devoid of business logic.
2. **Graph Engine**: A custom orchestrator managing nodes, edges, and state transitions.
3. **Agents/Nodes**: Pure logic units that take a `WorkflowState`, perform an action using tools/services, and return an updated state.
4. **Tools Layer**: Interfaces for agents to interact with external systems.
5. **Services Layer**: Core business logic (e.g., `LLMGateway`, `EvidenceService`).
6. **Repository Layer**: Abstraction for all database transactions, insulating logic from the ORM.
7. **Database**: SQLite (dev) transitioning to PostgreSQL (prod).

### Phased Delivery Plan
To ensure zero regressions and minimize rewrites, we will execute in strict phases:

- **Phase 0: Repository Hygiene (Complete)**
  - Initialize structure, `.gitignore`, `pyproject.toml`, and empty layer directories.
  
- **Phase 1: Architectural Refactor (Current)**
  - Decouple `main.py` by extracting Pydantic schemas, Repositories, and an `LLMGateway`. Introduce the `WorkflowState` schema.

- **Phase 2: Graph Orchestrator Implementation**
  - Replace sequential API calls with the custom Graph Engine (Nodes and Router). Wraps agents into Graph Nodes.

- **Phase 3: Agent Evolution & Knowledge Layer**
  - Add Vector DB integrations for semantic search and regulation versioning. Improve agent prompts to use history.

- **Phase 4: Enterprise Features**
  - JWT Authentication, RBAC (Officer/Admin roles), Evidence validation, Dashboard endpoints.

- **Phase 5: Production Readiness**
  - Migrate to PostgreSQL, containerize with Docker, implement CI/CD.

## Consequences
- **Positive**: High extensibility, strong separation of concerns, robust error handling via Graph state, seamless fallback via `LLMGateway`.
- **Negative**: Increased complexity and file count initially. Requires strict discipline to avoid leaking business logic into the API layer.
