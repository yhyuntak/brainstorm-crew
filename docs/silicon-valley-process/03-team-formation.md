# 3. 팀 구성 (Team Formation)

> Two-Pizza Team으로 시작하기

---

## 3.1 Core Team 정의

### Early Stage (0-3개월)

```
Two-Pizza Team (6-8명)
├── Tech Lead (1)
├── Product Manager (1)
├── Engineers (3-4)
├── Designer (0.5-1, 종종 공유 리소스)
└── QA/SDET (선택적, 초기엔 엔지니어가 겸임)
```

**Two-Pizza Rule** (Jeff Bezos):
- 팀이 피자 2판으로 먹을 수 있는 크기여야 함
- 커뮤니케이션 오버헤드 최소화
- 빠른 의사결정

### 역할별 책임

| 역할 | 책임 | 핵심 질문 |
|------|------|----------|
| **Tech Lead** | 기술 아키텍처, 코드 품질, 기술 표준 | "How to build" |
| **Product Manager** | 제품 비전, 로드맵, 우선순위, Stakeholder 관리 | "What & Why" |
| **Engineers** | 실제 개발, 기술 의사결정 참여, On-call | - |
| **Designer** | UX Research, UI/UX 디자인, Usability Testing | - |

---

## 3.2 팀원 모집 전략

### A. 내부 모집 (대부분의 경우)

**1단계: Ideal Profile 정의**
```markdown
# Senior Backend Engineer - [프로젝트명]

## Must-Have
- 5+ years backend development
- Strong in [기술스택]
- Experience with distributed systems

## Nice-to-Have
- Domain knowledge in [도메인]
- Startup experience

## What We Offer
- Greenfield project (레거시 없음)
- High visibility (executives watching)
- Career growth opportunity
```

**2단계: Active Recruiting**
- **좋은 방법**: Tech Lead가 직접 1:1로 컨택
- **나쁜 방법**: 이메일 blast "누구 관심 있나요?"

**3단계: Manager 협상**
- 팀원의 현재 매니저와 협상 필요
- "언제 옮길 수 있나?" (보통 2-4주 transition)
- Win-win 찾기

### B. 외부 채용 (필요시)

신규 프로젝트에 외부 채용이 필요한 경우:
- 팀에 없는 전문성 (ML, Security, etc.)
- 빠른 확장 필요

**Fast-Track Hiring**:
- 일반 채용: 4-8주
- 긴급 채용: 2-3주 (프로세스 간소화)
- Referral 우선 활용

---

## 3.3 Team Agreement 수립

팀이 구성되면 첫 주에 함께 정의:

### Working Agreement

```markdown
# Team Working Agreement

## Core Hours
- 10am-3pm: 모두 온라인 (Zoom/Slack)
- 나머지: Flexible

## Communication
- Urgent: Slack DM
- FYI: Team Channel
- Deep discussion: Document → Async review → Meeting

## Meetings
- Daily Standup: 15분, 매일 10am
- Sprint Planning: 2시간, 격주 월요일
- Retro: 1시간, 격주 금요일

## Code Review
- <500 LOC: 24시간 내 리뷰
- >500 LOC: 사전에 디자인 리뷰 필요

## Decision Making
- Tech decisions: Tech Lead final say (but consensus 추구)
- Product decisions: PM final say
- Disagreement: Escalate to Sponsor (rare)

## Work-Life Balance
- No expectation of after-hours response (긴급 제외)
```

### Team Culture & Values

실리콘밸리 고성과 팀의 공통 문화:

| 가치 | 설명 |
|------|------|
| **Psychological Safety** | "바보 같은 질문"은 없다, Blameless post-mortems |
| **Bias for Action** | 완벽한 계획보다 빠른 실행 |
| **Customer Obsession** | 모든 결정에 "고객이 원하나?" 질문 |
| **High Bar** | Code quality 타협 없음 |

---

## 체크리스트

- [ ] Core team 역할 정의 완료
- [ ] 팀원 모집/배정 완료
- [ ] Working Agreement 수립
- [ ] Communication channels 설정 (Slack, etc.)
- [ ] 1:1 관계 구축 시작

---

[← 이전: 프로젝트 정의](02-project-definition.md) | [목차](README.md) | [다음: 킥오프 →](04-kickoff.md)
