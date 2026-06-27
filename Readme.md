# RegIntel AI - Agentic Regulatory Compliance Platform

> **An Offline AI-Powered Compliance Intelligence Platform for Automated Regulatory Analysis, Control Mapping, Department Assignment, Evidence Validation, and Audit Management.**

---

## Overview

RegIntel AI is an **offline-first Agentic AI platform** designed to automate the lifecycle of regulatory compliance within financial institutions.

Instead of manually interpreting lengthy regulatory circulars, RegIntel AI uses specialized AI agents to:

* Parse regulatory documents
* Generate Measurable Action Points (MAPs)
* Assign responsible departments
* Validate compliance implementation
* Maintain an auditable compliance history

The platform is designed for hackathon demonstration while following production-inspired software architecture principles.

---

## Problem Statement

Financial institutions receive hundreds of regulatory updates from authorities such as RBI, SEBI, and other governing bodies.

Current challenges include:

* Manual interpretation of lengthy regulations
* Time-consuming compliance tracking
* Lack of centralized audit trails
* Poor visibility into implementation status
* High operational overhead

RegIntel AI automates this workflow using AI-driven orchestration.

---

## Current Workflow

```text
Regulation
      │
      ▼
Parser Agent
      │
      ▼
MAP Generator
      │
      ▼
Department Assignment
      │
      ▼
Validator
      │
      ▼
Audit Logging
```

---

## Planned Architecture

```text
Frontend
      │
FastAPI Backend
      │
Agent Orchestrator
      │
┌───────────────┬───────────────┬───────────────┐
│               │               │
Parser      MAP Generator   Validator
│               │               │
└───────────────Workflow State──┘
                │
         Repository Layer
                │
           PostgreSQL
                │
          LLM Gateway
      (Ollama → Gemini → OpenAI)
```

---

## Technology Stack

* Python
* FastAPI
* SQLAlchemy
* SQLite (Current)
* PostgreSQL (Planned)
* Ollama (Local LLM)
* Streamlit (Frontend - Planned)
* JWT Authentication (Planned)

---

## Current Features

* Regulation Parsing
* MAP Generation
* Department Assignment
* Compliance Validation
* Workflow Orchestration
* Audit Logging
* REST APIs
* Swagger Documentation

---

## Planned Features

* Workflow State Management
* Custom Agent Orchestrator
* LLM Gateway with Provider Fallback
* Evidence Validation
* Regulation Versioning
* Semantic Search
* Officer/Admin Authentication
* Dashboard & Analytics
* Priority Queue
* PostgreSQL Migration
* Docker Deployment

---

## Project Structure

```text
backend/
│
├── agents/
├── services/          (planned)
├── tools/             (planned)
├── graph/             (planned)
├── repositories/      (planned)
├── auth/              (planned)
├── database.py
├── models.py
├── main.py
└── requirements.txt
```

---

## Design Principles

* Offline First
* AI-Agent Driven
* State-Based Workflow
* Modular Architecture
* Service-Oriented Design
* Extensible Agent Pipeline
* Production-Oriented Development

---

## Development Roadmap

### Phase 0

Repository setup and project foundation

### Phase 1

Core architecture refactor (WorkflowState, Services, LLM Gateway)

### Phase 2

Custom graph-based agent orchestration

### Phase 3

Agent upgrades and knowledge layer

### Phase 4

Evidence validation and authentication

### Phase 5

Dashboard, analytics, and production deployment

---

## Team

**Hackathon Project**

Developed by:

* Lakshay Bharti
* Madhav Mittal
* Krishna Mittal

---

## Vision

To build an intelligent, explainable, and production-ready AI platform that transforms regulatory compliance from a manual process into an automated, auditable, and agent-driven workflow.

---

## License

This project is licensed under the **MIT License**.
