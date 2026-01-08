# 2. 프로젝트 정의 (Project Definition)

> Go 결정 후 공식적인 프로젝트 문서화

---

## 2.1 문서 스타일 (회사별)

### Amazon: PR/FAQ (Press Release / FAQ)

```markdown
# [제품명] 출시 보도자료

**지역, 날짜** - Amazon이 오늘 [제품명]을 출시했습니다...

## 고객 Quote
"[제품명] 덕분에 우리는 X를 Y% 개선했습니다" - 고객사 대표

## FAQ
Q: 왜 이 제품을 만들었나요?
A: 고객들이 [문제]로 고통받고 있었기 때문입니다...
```

**왜 이 방식인가?**
- 출시를 역으로 상상하며 시작 (Working Backwards)
- 고객 관점에서 가치를 먼저 정의
- 내부 기술에 함몰되지 않음

### Google: Design Doc

```markdown
# Objectives
# Non-Objectives
# Background
# Overview
# Detailed Design
# Alternatives Considered
# Cross-cutting Concerns (Security, Privacy, etc.)
```

### Startup: Lean Canvas

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Problem    │  Solution   │   Unique    │  Unfair     │
│             │             │   Value     │  Advantage  │
│             │             │  Proposition│             │
├─────────────┼─────────────┼─────────────┼─────────────┤
│  Key        │  Channels   │  Customer   │  Revenue    │
│  Metrics    │             │  Segments   │  Streams    │
├─────────────┴─────────────┼─────────────┴─────────────┤
│  Cost Structure           │  User Acquisition         │
└───────────────────────────┴───────────────────────────┘
```

---

## 2.2 Scoping Meeting (범위 정의 회의)

**참석자**:
- Executive Sponsor (예산 승인자)
- Technical Lead 후보
- Product Lead 후보
- Key Stakeholders

**안건**:

### 1. Success Criteria 정의
- OKR 형식으로 정량적 목표 설정
- 예: "3개월 내 100명의 파일럿 고객 확보"

### 2. Scope 협상
- MVP vs Full Product
- Must-have vs Nice-to-have
- **팁**: 첫 버전은 항상 50% 작게 시작

### 3. Timeline & Budget
- T-shirt sizing (S/M/L) 또는 대략적 추정
- "3개월, 5명 엔지니어" 수준

### 4. Go/No-Go Decision
- 이 회의 끝에 명확한 결정
- "보류"는 사실상 "No"와 같음

---

## 2.3 Project Charter 작성

Go 결정이 나면 공식 문서 작성:

```markdown
# Project Charter: [프로젝트명]

## Executive Summary
한 문단으로 프로젝트 요약

## Business Objectives
- Objective 1: 구체적, 측정 가능
- Objective 2: ...

## Scope
### In Scope
- 기능 A
- 기능 B

### Out of Scope (중요!)
- 기능 X는 Phase 2에서
- 기능 Y는 다른 팀이 담당

## Success Metrics
- Metric 1: Baseline X → Target Y
- Metric 2: ...

## Timeline
- Kickoff: Week 1
- MVP: Week 12
- GA: Week 20

## Team Structure
- Executive Sponsor: [이름]
- Project Lead: [이름]
- Tech Lead: TBD
- Team Size: 5-7명 예상

## Budget
- Headcount: X FTE
- Infrastructure: $Y/month
- External Services: $Z

## Risks & Dependencies
- Risk 1: Mitigation plan...
- Dependency 1: Team X의 API 개발 완료

## Approval
- Approved by: [이름], [직책]
- Date: [날짜]
```

---

## 체크리스트

- [ ] PR/FAQ 또는 Design Doc 초안 작성
- [ ] Scoping Meeting 완료
- [ ] Success Criteria 정량적으로 정의
- [ ] In Scope / Out of Scope 명확히 구분
- [ ] Project Charter 승인 완료

---

[← 이전: 아이디어 발굴](01-ideation.md) | [목차](README.md) | [다음: 팀 구성 →](03-team-formation.md)
