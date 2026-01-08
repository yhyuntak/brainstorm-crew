# 5. 기획 단계 (Planning Phase)

> Product + Technical Planning 동시 진행

---

## 5.1 Product Planning (PM 주도)

### 5.1.1 User Research (Week 1-2)

**활동**:

1. **User Interviews (10-15명)**
   ```
   질문 예시:
   - 현재 [문제]를 어떻게 해결하고 있나요?
   - 가장 큰 페인 포인트는?
   - 이상적인 솔루션은 어떤 모습인가요?
   - [프로토타입] 보여주며: 이게 도움이 될까요?
   ```

2. **Competitive Analysis**
   - 경쟁사 제품 직접 사용
   - Feature comparison matrix
   - Pricing analysis

3. **Data Analysis**
   - 기존 제품 usage data
   - Funnel analysis

**Output**: User Personas

```markdown
# Persona: "Busy Developer Dave"

## Demographics
- Role: Senior Backend Developer
- Company: Mid-size startup (50-200 people)

## Goals
- Ship features fast
- Minimize operational overhead

## Pain Points
- Debugging distributed systems is time-consuming
- Alert fatigue

## How Our Product Helps
- Unified dashboard reduces tool switching
- Smart alerting reduces noise
```

### 5.1.2 Feature Prioritization

**RICE Framework** (Intercom 방식)
```
Score = (Reach × Impact × Confidence) / Effort

Reach: 얼마나 많은 사용자가 영향받나?
Impact: 각 사용자에게 얼마나 큰 영향? (3/2/1/0.5)
Confidence: 얼마나 확신하나? (1.0/0.8/0.5)
Effort: 얼마나 걸리나? (person-months)
```

### 5.1.3 PRD (Product Requirements Document)

```markdown
# PRD: [Feature Name]

## Problem Statement
## Goals / Non-Goals
## User Stories
## Requirements (Must-Have / Should-Have / Could-Have)
## UI/UX (Mockups, User flows)
## Success Metrics
## Open Questions
## Timeline
```

---

## 5.2 Technical Planning (Tech Lead 주도)

### 5.2.1 Architecture Design

**Design Doc 작성** (Google 스타일)

```markdown
# Design Doc: [System Name]

## Context & Scope
## Goals & Non-Goals
## System Overview (High-level diagram)
## Detailed Design
  - Component 1: Responsibilities, Interfaces
  - Component 2: ...
  - Data Storage: Schema, Indexing
  - Scalability: Scaling strategy, Caching
  - Security: Auth, Encryption
  - Monitoring: Metrics, Logging, Alerting
## Alternatives Considered
## Risks & Mitigations
## Timeline & Milestones
```

**Design Review Process**:
1. Draft (TL 작성, 2-3일)
2. Team Review (비동기, 3-5일)
3. Design Review Meeting (1-2시간)
4. Approval (TL + PM + Sponsor)
5. Published

### 5.2.2 Tech Stack Finalization

**선택 원칙**:
1. **Team expertise first**: 아무리 좋아도 팀이 모르면 X
2. **Community over novelty**: 5년 된 기술 > 6개월 된 hot 기술
3. **Managed services over self-hosting**: 엔지니어는 비즈니스 로직에 집중
4. **Cost-conscious**: 초기엔 싸게, 확장 가능하게

### 5.2.3 Development Environment Setup

**Day 1 Setup Goal**: 모든 엔지니어가 "Hello World"를 로컬에서 실행 가능

**Developer Experience 체크리스트**:
- [ ] One-command setup
- [ ] Local development with hot reload
- [ ] Fast test execution (<30s)
- [ ] Pre-commit hooks (lint, format, test)
- [ ] Clear error messages
- [ ] Debugging setup

---

## 5.3 Sprint 0: Foundation (Week 1-2)

첫 Sprint는 코딩보다 인프라:

```markdown
# Sprint 0: Foundation

## Goals
- [ ] Dev environment: All engineers can run locally
- [ ] CI/CD: Auto-deploy to dev environment
- [ ] Monitoring: Basic metrics & logging
- [ ] Documentation: Architecture & setup docs
- [ ] First endpoint: Health check endpoint deployed

## Tasks
### Infrastructure (3-4 days)
- [ ] Cloud account & permissions
- [ ] Terraform setup
- [ ] Database (dev environment)

### CI/CD (2-3 days)
- [ ] GitHub Actions workflow
- [ ] Build & test automation
- [ ] Deploy on merge to main

### Code Foundation (2-3 days)
- [ ] Repo structure
- [ ] Linting & formatting
- [ ] Testing framework
- [ ] API framework setup
```

> **실제 경험**: 많은 팀이 Sprint 0를 건너뛰고 바로 기능 개발을 시작합니다. 그러면 나중에 기술 부채가 쌓여 속도가 느려집니다.

---

## 5.4 Roadmap & Milestone Planning

### 전형적인 3-6개월 로드맵

```
Month 1: Foundation & Core
├── Week 1-2: Sprint 0 (Infrastructure)
├── Week 3-4: Core functionality
└── Milestone: Internal demo

Month 2: Alpha
├── Week 5-6: Key features complete
├── Week 7-8: Internal dogfooding
└── Milestone: Alpha release

Month 3: Beta
├── Week 9-10: Beta features
├── Week 11-12: External beta testing
└── Milestone: Private beta

Month 4-6: GA Preparation
├── Feedback iteration
├── Production hardening
└── Milestone: General Availability
```

---

## 체크리스트

### Week 2 End
- [ ] Architecture design doc 완성 & 승인
- [ ] PRD v1 완성
- [ ] Sprint 0 완료
- [ ] CI/CD pipeline 동작
- [ ] First deployment to dev environment

### Week 4 End
- [ ] MVP scope 확정 & backlog 생성
- [ ] User research 5+ interviews 완료
- [ ] First demo to stakeholders

---

[← 이전: 킥오프](04-kickoff.md) | [목차](README.md) | [다음: 실행 단계 →](06-execution.md)
