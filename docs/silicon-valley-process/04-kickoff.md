# 4. 킥오프 (Kickoff)

> 팀을 하나로 모으고 방향을 정렬하는 첫 주

---

## 4.1 Kickoff Meeting (Day 1)

**형식**: 2-3시간 전체 팀 회의

**참석자**:
- 전체 팀
- Executive Sponsor
- Key Stakeholders
- (선택) 고객 대표

### Agenda

#### Part 1: Vision & Context (30분)
```
1. Executive Sponsor의 Opening
   - "왜 이 프로젝트가 중요한가"
   - 회사 전략에서의 위치
   - 기대사항

2. Product Vision (PM)
   - 고객의 문제
   - 우리의 솔루션
   - Success looks like...

3. Demo (있다면)
   - Prototype
   - Competitor 제품
   - Inspiration
```

#### Part 2: How We'll Work (45분)
```
4. Technical Approach (Tech Lead)
   - High-level architecture
   - Tech stack rationale
   - Key technical challenges

5. Project Timeline (PM + Tech Lead)
   - Major milestones
   - Dependencies
   - Release plan

6. Team Introduction
   - 각자 소개 (2분씩)
   - 배경, 전문성, 이 프로젝트에서 하고 싶은 것
```

#### Part 3: Alignment & Q&A (45분)
```
7. Success Metrics Review
   - How we'll measure success

8. Risks & Concerns
   - Open discussion
   - "무엇이 우리를 실패하게 만들 수 있나?"

9. Q&A

10. Next Steps
    - 이번 주 계획
    - 첫 Sprint 목표
```

> **팁**: Kickoff은 Inspiration의 자리입니다. 팀원들이 흥분하고 동기부여되어야 합니다. 녹화해서 나중에 합류하는 팀원에게 공유하세요.

---

## 4.2 Kickoff Week Activities

Day 1만이 킥오프가 아닙니다. 첫 주 전체가 준비기간:

### Day 1 (Monday)
- **Morning**: Kickoff Meeting
- **Afternoon**: Dev Environment Setup
  - Repo 생성, 권한 설정
  - CI/CD pipeline 기본 구조
  - Slack channels, Jira/Linear 세팅

### Day 2 (Tuesday)
- **Architecture Deep Dive Session** (3-4시간)
  - Whiteboard session
  - Tech stack 최종 확정
  - Service boundaries 정의
  - Data model 스케치

### Day 3 (Wednesday)
- **First Sprint Planning**
  - Sprint 0 목표: Infrastructure & Foundation
  - Task breakdown
  - Estimation (Planning Poker)

### Day 4 (Thursday)
- **Team Building**
  - Informal: 점심/저녁 함께
  - 1:1 시작: PM ↔ 각 엔지니어, TL ↔ 각 엔지니어

### Day 5 (Friday)
- **First Code Commit Day**
  - Repo structure
  - Build system
  - Hello World deployment
  - 🎉 Small win to end the week

---

## 4.3 Stakeholder Kickoff (선택적)

더 큰 프로젝트의 경우, 별도로:

**참석자**:
- 프로젝트에 영향받는 다른 팀 리더들
- Legal, Security, Privacy (필요시)
- Marketing, Sales (B2B 제품인 경우)

**목적**:
- 프로젝트 인지도 확산
- 의존성 조율
- 조기 피드백

**포맷**:
- 1시간
- 프레젠테이션 + Q&A
- 격주 업데이트 약속

---

## 체크리스트

### Day 1 End
- [ ] 모든 팀원이 kickoff meeting 참여
- [ ] Product vision 공유됨
- [ ] Technical approach 공유됨

### Week 1 End
- [ ] Dev environment 모두 설정 완료
- [ ] First commit to main branch
- [ ] Communication channels 설정
- [ ] Sprint 0 계획 완료
- [ ] Team working agreement 수립

---

[← 이전: 팀 구성](03-team-formation.md) | [목차](README.md) | [다음: 기획 단계 →](05-planning.md)
