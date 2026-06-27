# Architectural Justifications (ADR Log)

This document tracks the reasoning behind critical architectural decisions made during the evolution of RegIntel AI.

## 1. Offline-First with Transparent Cloud Fallback (vs. UI Toggle)
**Decision**: We chose to implement Gemini API strictly as an "under-the-hood" automatic fallback, rather than providing an "Online/Offline" toggle switch in the UI.
**Justification**: RegIntel AI is built for the banking sector, where regulatory circulars may contain highly confidential, unreleased market data. The core value proposition is **100% Offline Security**. Exposing an "Online Mode" toggle encourages users to intentionally route data to a public cloud, violating compliance rules. However, local LLMs (Ollama/LLaVA) are hardware-intensive and can crash during live demos. By making Gemini a transparent fail-safe, we guarantee high availability without sacrificing our offline-first brand positioning. 

## 2. PDF Upload as Core, Web Scraping as Augmentation
**Decision**: We built PDF ingestion as the offline core, while RBI Web Scraping is an online-only augmentation.
**Justification**: Real-world compliance teams receive circulars via secure internal email channels (PDFs). Web scraping is inherently fragile (captchas, HTML changes) and requires internet access. Treating offline PDF parsing (`PyMuPDF`) as the primary ingest vector ensures the product remains fully functional in air-gapped environments.

## 3. Custom Graph Orchestrator (vs. LangGraph)
**Decision**: We built a custom state-driven execution graph (`backend/graph/core.py`) instead of importing LangChain/LangGraph.
**Justification**: In a hackathon/MVP setting, relying on heavy, abstracted frameworks hides technical competence. By building a custom graph, we demonstrate deep architectural understanding of finite state machines, routing, and node-based execution while keeping the codebase lightweight and infinitely customizable.

## 4. Priority Queue Engine
**Decision**: The AI parses a `priority_score (1-10)` dynamically, which is stored in PostgreSQL and used to sort the Officer Dashboards.
**Justification**: Chronological sorting is useless in compliance. A minor filing update from yesterday should not preempt a critical Cyber Security breach mandate from last week. Instructing the AI to syntactically evaluate urgency and penalty risks bridges the gap between Artificial Intelligence and genuine Business Logic.

## 5. Vision Auditor Pipeline (Evidence Validation)
**Decision**: Transitioning from human-verified proof to AI Vision-verified proof (LLaVA/Gemini Vision).
**Justification**: This closes the automation loop. If humans have to manually check uploaded photos to ensure a MAP was completed, the system is only a half-measure. Algorithmically grading compliance evidence makes RegIntel AI an end-to-end autonomous auditor.
